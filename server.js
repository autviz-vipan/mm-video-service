const express = require('express');
const { bundle } = require('@remotion/bundler');
const { renderMedia, selectComposition } = require('@remotion/renderer');
const { uploadVideoToS3 } = require('./src/upload');
const fs = require('fs');
const path = require('path');
const http = require('http');

require('dotenv').config({ path: path.resolve(__dirname, '.env') }); // Load root .env file

const app = express();
app.use(express.json());

const PORT = 3000;
// Default callback falls back to Port 7000 to match the user's active API server
const FASTAPI_CALLBACK_URL = process.env.FASTAPI_CALLBACK_URL || 'http://127.0.0.1:8000';

let cachedBundleLocation = null;
let isBundling = false;

// Pre-compile React bundle at startup to save 2-4 seconds on the first render request!
(async () => {
  try {
    isBundling = true;
    console.log(`[Express] Pre-compiling Remotion React bundle in background...`);
    const start = Date.now();
    cachedBundleLocation = await bundle({
      entryPoint: path.resolve('./src/remotion/index.js'),
      webpackOverride: (config) => config,
      ignoreRegisterRootWarning: true
    });
    console.log(`[Express] Remotion React bundle pre-compiled successfully in ${((Date.now() - start) / 1000).toFixed(2)}s! Bundle location: ${cachedBundleLocation}`);
  } catch (err) {
    console.error(`[Express] Failed to pre-compile Remotion bundle at startup:`, err);
  } finally {
    isBundling = false;
  }
})();

app.post('/render-video', (req, res) => {
  const payload = req.body;
  const { jobId } = payload;

  if (!jobId) {
    return res.status(400).json({ error: "Missing required field: jobId" });
  }

  console.log(`[Express] Received render request for Job ID: ${jobId}`);

  // Return HTTP 202 Accepted immediately so FastAPI doesn't block
  res.status(202).json({
    status: "processing",
    message: "Video rendering task has been queued and is processing asynchronously.",
    jobId
  });

  // Spawn the background rendering process
  (async () => {
    const jobStartTime = Date.now();
    const outputFilePath = path.join(__dirname, `output_${jobId}.mp4`);

    try {
      let bundleLocation = cachedBundleLocation;
      const bundleStartTime = Date.now();

      if (!bundleLocation) {
        if (isBundling) {
          console.log(`[Job ID: ${jobId}] [Remotion] Startup bundle compilation is in progress. Waiting for it to finish...`);
          while (isBundling && !cachedBundleLocation) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
          bundleLocation = cachedBundleLocation;
        }

        if (!bundleLocation) {
          console.log(`[Job ID: ${jobId}] [Remotion] React bundle not ready. Compiling Webpack bundle dynamically now...`);
          bundleLocation = await bundle({
            entryPoint: path.resolve('./src/remotion/index.js'),
            webpackOverride: (config) => config,
            ignoreRegisterRootWarning: true
          });
          const bundleDuration = (Date.now() - bundleStartTime) / 1000;
          console.log(`[Job ID: ${jobId}] [Remotion] React bundle compiled dynamically in ${bundleDuration.toFixed(2)}s`);
          cachedBundleLocation = bundleLocation; // Cache for subsequent renders
        } else {
          console.log(`[Job ID: ${jobId}] [Remotion] React bundle compilation finished while waiting. Reusing bundle.`);
        }
      } else {
        console.log(`[Job ID: ${jobId}] [Remotion] Reusing pre-compiled React bundle (saved ~2-4 seconds of bundling time!).`);
      }

      console.log(`[Job ID: ${jobId}] [Remotion] Selecting composition ProgressVideo...`);
      const compositionStartTime = Date.now();
      // 2. Load the registered composition (using serveUrl parameter)
      const composition = await selectComposition({
        serveUrl: bundleLocation,
        id: 'ProgressVideo',
        inputProps: payload,
      });
      const compositionDuration = (Date.now() - compositionStartTime) / 1000;
      console.log(`[Job ID: ${jobId}] [Remotion] Composition selected in ${compositionDuration.toFixed(2)}s. Frame count: ${composition.durationInFrames}, Dimensions: ${composition.width}x${composition.height}, FPS: ${composition.fps}`);

      console.log(`[Job ID: ${jobId}] [Remotion] Headless rendering starting. Saving to ${outputFilePath}...`);

      let renderStartTime = Date.now();
      let lastProgressPercent = -1;
      let lastLogTime = 0;

      const renderOptions = {
        composition,
        serveUrl: bundleLocation,
        outputLocation: outputFilePath,
        codec: 'h264',
        inputProps: payload,
        // Use all available CPU cores (up to 16) for parallel frame rendering
        concurrency: Math.min(16, require('os').cpus().length),
        // FFmpeg x264 encoding speed preset — 'veryfast' cuts encode time by ~60%
        // Quality difference vs 'medium' is invisible at normal playback speed
        x264Preset: 'veryfast',
        // Use yuv420p for maximum compatibility (phones, web, iOS)
        pixelFormat: 'yuv420p',
        onStart: ({ frameCount, resolvedConcurrency }) => {
          renderStartTime = Date.now();
          console.log(`[Job ID: ${jobId}] [Render Start] Commencing rendering of ${frameCount} frames using concurrency ${resolvedConcurrency} threads.`);
        },
        onProgress: ({ progress }) => {
          const percent = Math.round(progress * 100);
          const now = Date.now();
          // Log if percentage changed by at least 5%, or if 1.5 seconds have elapsed since last log
          if (percent === 100 || percent - lastProgressPercent >= 5 || (now - lastLogTime >= 1500 && percent !== lastProgressPercent)) {
            const elapsed = (now - renderStartTime) / 1000;
            const estTotal = progress > 0 ? elapsed / progress : 0;
            const estRemaining = Math.max(0, estTotal - elapsed);
            console.log(`[Job ID: ${jobId}] [Render Progress] ${percent}% complete | Elapsed: ${elapsed.toFixed(1)}s | Est. remaining: ${estRemaining.toFixed(1)}s`);
            lastProgressPercent = percent;
            lastLogTime = now;
          }
        },
        onDownload: (url) => {
          console.log(`[Job ID: ${jobId}] [Download] Asset fetch requested: ${url}`);
        }
      };

      // 1. Constant Rate Factor (CRF) — lower = better quality, slower encode
      // CRF 23 is the x264 default: visually identical to 16 at normal playback, ~40% faster encode
      if (typeof payload.crf !== 'undefined') {
        renderOptions.crf = Number(payload.crf);
      } else if (!payload.videoBitrate) {
        renderOptions.crf = 23;
      }

      // 2. Scale factor (e.g. 1.5 or 2 for high density rendering)
      if (typeof payload.scale !== 'undefined') {
        renderOptions.scale = Number(payload.scale);
      }

      // 3. Video Bitrate (e.g. "5M", "10M") - mutually exclusive with CRF
      if (payload.videoBitrate) {
        renderOptions.videoBitrate = String(payload.videoBitrate);
        delete renderOptions.crf; // Ensure mutual exclusivity
      }

      // 4. JPEG Quality for intermediate frame rendering
      // 80 is visually lossless for video — saves ~20% capture time vs 95
      if (typeof payload.jpegQuality !== 'undefined') {
        renderOptions.jpegQuality = Number(payload.jpegQuality);
      } else {
        renderOptions.jpegQuality = 80;
      }

      console.log(`[Job ID: ${jobId}] [Remotion] Rendering options applied:`, {
        crf: renderOptions.crf,
        scale: renderOptions.scale,
        videoBitrate: renderOptions.videoBitrate,
        jpegQuality: renderOptions.jpegQuality
      });

      // 3. Render the video frame-by-frame using Chrome headlessly and FFmpeg (using serveUrl parameter)
      await renderMedia(renderOptions);

      const renderDuration = (Date.now() - renderStartTime) / 1000;
      console.log(`[Job ID: ${jobId}] [Render End] Headless rendering and encoding completed in ${renderDuration.toFixed(2)}s`);

      console.log(`[Job ID: ${jobId}] [S3] Starting local file upload to S3...`);
      const uploadStartTime = Date.now();
      // 4. Upload MP4 file directly to S3
      const cdnUrl = await uploadVideoToS3(outputFilePath, jobId);
      const uploadDuration = (Date.now() - uploadStartTime) / 1000;
      console.log(`[Job ID: ${jobId}] [S3] Video uploaded successfully to S3 in ${uploadDuration.toFixed(2)}s. CDN URL: ${cdnUrl}`);

      const totalJobDuration = (Date.now() - jobStartTime) / 1000;
      console.log(`[Job ID: ${jobId}] [Express] Total processing time: ${totalJobDuration.toFixed(2)}s`);

      // 5. Notify FastAPI server of success
      await sendCallback({
        jobId,
        success: true,
        videoUrl: cdnUrl
      });

    } catch (err) {
      console.error(`[Error] Rendering failed for Job: ${jobId}:`, err);

      // Notify FastAPI server of failure
      await sendCallback({
        jobId,
        success: false,
        errorMessage: err.message || "An unexpected error occurred during video compilation."
      });

    } finally {
      // Clean up temporary local video file
      if (fs.existsSync(outputFilePath)) {
        try {
          fs.unlinkSync(outputFilePath);
          console.log(`[Cleanup] Deleted local temporary video file: ${outputFilePath}`);
        } catch (cleanupErr) {
          console.error(`[Cleanup] Failed to delete temp file ${outputFilePath}:`, cleanupErr);
        }
      }
    }
  })();
});

// Helper function to send callback requests to FastAPI
async function sendCallback(data) {
  const urlString = `${FASTAPI_CALLBACK_URL}/api/v1/video/callback`;
  console.log(`[Callback] Sending status callback report to: ${urlString}`);

  const postData = JSON.stringify(data);
  const parsedUrl = new URL(urlString);

  const options = {
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || 80,
    path: parsedUrl.pathname,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  return new Promise((resolve) => {
    const req = http.request(options, (res) => {
      console.log(`[Callback] FastAPI callback response status: ${res.statusCode}`);
      resolve();
    });

    req.on('error', (e) => {
      console.error(`[Callback] Failed to reach FastAPI callback server:`, e);
      resolve();
    });

    req.write(postData);
    req.end();
  });
}

app.listen(PORT, () => {
  console.log(`[Express] Magic Mirror Video Renderer microserver listening on Port ${PORT} 🚀`);
});
