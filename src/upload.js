const path = require('path');
const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') }); // Load root .env

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  // Increase socket/connection timeouts for large video uploads
  httpOptions: {
    timeout: 600000,        // 10 minutes socket timeout
    connectTimeout: 30000,  // 30 seconds connection timeout
  },
  maxRetries: 5,            // Auto-retry up to 5 times on transient errors
  retryDelayOptions: {
    base: 2000,             // Start retry after 2s, then exponential backoff
  },
});

async function uploadVideoToS3(filePath, jobId) {
  const fileSize = fs.statSync(filePath).size;
  const s3Key = `videos/${jobId}.mp4`;
  const bucket = process.env.S3_BUCKET_NAME || 'magic-mirror-prototype';
  const cloudfrontDomain = process.env.CLOUDFRONT_DOMAIN || 'https://d34auvch2x824m.cloudfront.net';

  console.log(`Uploading file ${filePath} (${(fileSize / 1024 / 1024).toFixed(1)} MB) to S3 bucket ${bucket}...`);

  const fileStream = fs.createReadStream(filePath);

  const params = {
    Bucket: bucket,
    Key: s3Key,
    Body: fileStream,
    ContentType: 'video/mp4',
    ContentLength: fileSize,
  };

  try {
    // Use managed upload — automatically splits into multipart for large files
    // queueSize: parallel upload threads, partSize: 10 MB chunks
    const upload = s3.upload(params, {
      queueSize: 4,
      partSize: 10 * 1024 * 1024, // 10 MB per part
    });

    // Log real-time upload progress
    upload.on('httpUploadProgress', (progress) => {
      const pct = ((progress.loaded / progress.total) * 100).toFixed(1);
      console.log(`[S3 Upload] ${pct}% — ${(progress.loaded / 1024 / 1024).toFixed(1)} MB / ${(progress.total / 1024 / 1024).toFixed(1)} MB`);
    });

    await upload.promise();

    const cdnUrl = `${cloudfrontDomain}/${s3Key}`;
    console.log(`Successfully uploaded video! CDN URL: ${cdnUrl}`);
    return cdnUrl;

  } catch (error) {
    console.error('Error uploading video file to S3:', error.message);
    throw error;
  }
}

module.exports = { uploadVideoToS3 };
