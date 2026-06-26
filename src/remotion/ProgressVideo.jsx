import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Img } from 'remotion';
import React from 'react';
import mmLogo from './MM logo.jpg';

// Teal SVG Logo Component
const AppLogo = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="appLogoShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="10" floodOpacity="0.15" />
      </filter>
    </defs>

    {/* White Circle Background with Shadow */}
    <circle cx="150" cy="150" r="115" fill="white" filter="url(#appLogoShadow)" />

    {/* Main Circle */}
    <circle cx="150" cy="130" r="55"
      fill="none"
      stroke="#10AFCC"
      strokeWidth="8" />

    {/* Outer Arc */}
    <path d="M 80 130 A 70 70 0 0 0 220 130"
      fill="none"
      stroke="#10AFCC"
      strokeWidth="8"
      strokeLinecap="round" />

    {/* Inner Arc */}
    <path d="M 95 130 A 55 55 0 0 0 205 130"
      fill="none"
      stroke="#10AFCC"
      strokeWidth="5"
      strokeLinecap="round" />

    {/* Side Extensions */}
    <line x1="80" y1="130" x2="95" y2="130"
      stroke="#10AFCC"
      strokeWidth="8"
      strokeLinecap="round" />

    <line x1="205" y1="130" x2="220" y2="130"
      stroke="#10AFCC"
      strokeWidth="8"
      strokeLinecap="round" />

    {/* Stem */}
    <line x1="150" y1="200" x2="150" y2="235"
      stroke="#10AFCC"
      strokeWidth="8"
      strokeLinecap="round" />

    {/* Bottom Rounded Shape */}
    <rect x="142" y="235"
      width="16"
      height="35"
      rx="8"
      fill="#10AFCC" />
  </svg>
);

// --- SLEEK CUSTOM SVG ICONS FOR CONCERNS & CALENDAR ---
const CalendarIcon = ({ size = 28, color = "#FFFFFF" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="4" stroke={color} strokeWidth="2.5" />
    <path d="M16 2V6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M8 2V6" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M3 10H21" stroke={color} strokeWidth="2.5" />
  </svg>
);

const RednessIcon = ({ size = 32, color = "#E29E57" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <circle cx="8" cy="8" r="1.5" fill={color} />
    <circle cx="15" cy="9" r="1" fill={color} />
    <circle cx="9" cy="14" r="2" fill={color} />
    <circle cx="15" cy="15" r="1.2" fill={color} />
    <circle cx="12" cy="11" r="1.2" fill={color} />
  </svg>
);

const TextureIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8C7 5, 11 5, 14 8C17 11, 20 11, 23 8" stroke="#6B8BA4" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M4 14C7 11, 11 11, 14 14C17 17, 20 17, 23 14" stroke="#6B8BA4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 2" />
    <path d="M4 20C7 17, 11 17, 14 20C17 23, 20 23, 23 20" stroke="#6B8BA4" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const PigmentationIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.8 6.2L18 8L13.8 9.8L12 14L10.2 9.8L6 8L10.2 6.2L12 2Z" fill="#4FA492" />
    <path d="M19 13L19.9 15.1L22 16L19.9 16.9L19 19L18.1 16.9L16 16L18.1 15.1L19 13Z" fill="#4FA492" />
    <circle cx="8" cy="17" r="1.5" fill="#4FA492" />
  </svg>
);

const DefaultConcernIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3V21M3 12H21" stroke="#10AFCC" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="5" fill="#10AFCC" />
  </svg>
);

const Watermark = ({ opacity = 1 }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: 30,
      left: 30,
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      pointerEvents: 'none',
      opacity: opacity,
    }}>
      <div style={{
        width: 100,
        height: 100,
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <Img src={mmLogo} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.6)' }} alt="Magic Mirror Logo" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span style={{
          fontSize: 34,
          lineHeight: 1.0,
          fontWeight: 800,
          color: '#1A202C',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          MAGIC
        </span>
        <span style={{
          fontSize: 34,
          lineHeight: 1.0,
          fontWeight: 800,
          color: '#10AFCC',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          MIRROR
        </span>
        {/* <span style={{
          marginTop: 6,
          fontSize: 12,
          letterSpacing: '2px',
          color: '#718096',
          fontWeight: 700,
          textTransform: 'uppercase',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          SEE YOUR BEST.
        </span> */}
      </div>
    </div>
  );
};

// Robust case-insensitive metrics score lookup helper
const getMetricScore = (metrics, key) => {
  if (!metrics || !key) return 0;
  if (typeof metrics[key] !== 'undefined') return metrics[key];
  const lowerKey = key.toLowerCase();
  if (typeof metrics[lowerKey] !== 'undefined') return metrics[lowerKey];
  const foundKey = Object.keys(metrics).find(k => k.toLowerCase() === lowerKey);
  if (foundKey) return metrics[foundKey];
  return 0;
};

// --- INTRO ANIMATION COMPONENTS ---
const GiftBox = ({ size = 200 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="40" width="70" height="50" fill="#1A939E" rx="4" />
    <rect x="42" y="40" width="16" height="50" fill="#F4B929" />
    <rect x="10" y="25" width="80" height="20" fill="#24AAB5" rx="4" />
    <rect x="42" y="25" width="16" height="20" fill="#F4B929" />
    <path d="M50 25 C25 0, 5 20, 35 25 Z" fill="#F4B929" />
    <path d="M50 25 C75 0, 95 20, 65 25 Z" fill="#F4B929" />
    <circle cx="50" cy="25" r="6" fill="#E0A31D" />
  </svg>
);

const SparkleStar = ({ size = 20, color = "#F4B929" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

const INTRO_PARTICLES = Array.from({ length: 16 }).map((_, i) => ({
  angle: (i * 22.5) * (Math.PI / 180),
  distance: 180 + (i % 2 === 0 ? 120 : 0),
  size: i % 3 === 0 ? 35 : 18,
  delay: i % 2 === 0 ? 0 : 2,
}));

export const ProgressVideo = ({
  product_name = "Nivya",
  brand_name = "",
  product_image_url = "",
  platform = "reels",
  style = "slider_wipe",
  mask_enabled = "off",
  timeline = [],
  overallHighlight = {},
  before_image_url = "",
  after_image_url = "",
  before_date = "",
  after_date = "",
  before_metrics = null,
  after_metrics = null,
  concerns = [],
  creator_name = "",
  tester_by = "",
  // Mask overlay URLs — passed only when mask_enabled="on"
  before_mask_url = "",
  after_mask_url = "",
  // Optional fine-grained visual alignment variables
  before_image_offset_x = 0,
  before_image_offset_y = 0,
  before_image_scale = 1,
  after_image_offset_x = 0,
  after_image_offset_y = 0,
  after_image_scale = 1
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Resolve firstScan and lastScan with fallback timeline data
  const scans = timeline && timeline.length >= 2 ? timeline : [
    {
      sequenceIndex: 0,
      date: "MAY 04",
      imageUrl: "https://d34auvch2x824m.cloudfront.net/images/000a7152933843649efe1524dbe1e581.f4b0c5b13c6b4e0aacbf89f66fe49ddc.jpg",
      metrics: { redness: 87 }
    },
    {
      sequenceIndex: 1,
      date: "MAY 05",
      imageUrl: "https://d34auvch2x824m.cloudfront.net/images/9524bd6457934307ac4007decb3a0e27.84ce1c80c28e43f3940ffb9f72a8812b.jpg",
      metrics: { redness: 88 }
    }
  ];

  const firstScan = {
    date: before_date || (timeline && timeline[0]?.date) || "MAY 04",
    imageUrl: before_image_url || (timeline && timeline[0]?.imageUrl) || "https://d34auvch2x824m.cloudfront.net/images/000a7152933843649efe1524dbe1e581.f4b0c5b13c6b4e0aacbf89f66fe49ddc.jpg",
    metrics: before_metrics || (timeline && timeline[0]?.metrics) || { redness: 87 }
  };

  const lastScan = {
    date: after_date || (timeline && timeline[timeline.length - 1]?.date) || "MAY 05",
    imageUrl: after_image_url || (timeline && timeline[timeline.length - 1]?.imageUrl) || "https://d34auvch2x824m.cloudfront.net/images/9524bd6457934307ac4007decb3a0e27.84ce1c80c28e43f3940ffb9f72a8812b.jpg",
    metrics: after_metrics || (timeline && timeline[timeline.length - 1]?.metrics) || { redness: 88 }
  };

  const highlightMetric = overallHighlight?.metric || "redness";
  const firstScore = Math.round(firstScan.metrics?.[highlightMetric] || 87);
  const lastScore = Math.round(lastScan.metrics?.[highlightMetric] || 88);
  const metricLabel = overallHighlight?.label || "REDNESS REDUCTION";
  const scoreDiff = lastScore - firstScore;
  const improvementStat = scoreDiff > 0 ? `↑${scoreDiff}` : scoreDiff < 0 ? `↓${Math.abs(scoreDiff)}` : `0`;
  const concernLower = highlightMetric ? highlightMetric.toLowerCase() : "skin";

  // Compute dynamic day gap between first and last scan dates (e.g. "MAY 13" → "MAY 18" = 5 days)
  const parseScanDate = (dateStr) => {
    if (!dateStr) return null;
    // dateStr format: "MAY 13" or "MAY 4"
    const parts = dateStr.trim().split(/\s+/);
    if (parts.length < 2) return null;
    const [monthStr, dayStr] = parts;
    const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const monthIndex = monthNames.indexOf(monthStr.toUpperCase());
    if (monthIndex === -1) return null;
    const day = parseInt(dayStr, 10);
    const year = new Date().getFullYear(); // assume current year
    return new Date(year, monthIndex, day);
  };
  const firstDate = parseScanDate(firstScan.date);
  const lastDate = parseScanDate(lastScan.date);
  const daysDiff = (firstDate && lastDate)
    ? Math.max(1, Math.round((lastDate - firstDate) / (1000 * 60 * 60 * 24)))
    : 30;
  const nDays = daysDiff || 28;

  // ── SCENE BOUNDARIES ──
  // Scene 1: Fullscreen Intro Screen (Frames 0 to 120 = 0s - 3s)
  // Scene 2: Before scan baseline view (Frames 90 to 180 = 3s - 6s)
  // Scene 3: Side-by-side / Wipe Transition (Frames 180 to 280 = 6s - 9.33s)
  // Scene 4: Rising Skincare Journey Chart (Frames 280 to 481 = 9.33s - 16.03s = 6.7s)
  // Scene 5: Verified Brand Outro (Frames 481 to 541 = 16.03s - 18.03s = 2s)

  // ── ANIMATION VALUES ──

  // Slider sweep position driver - starts at 100 (fully Before), sweeps to 0 (fully After), then settles at 50 (50/50 split)
  const sliderPosition = interpolate(frame,
    [80, 130, 150, 210],
    [100, 0, 50, 50],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Score fading drivers - Before score fades in after Intro screen (at frame 90)
  const beforeScoreOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // The after score starts completely hidden and lights up once the slider scene starts at 180
  const afterScoreOpacity = interpolate(frame, [80, 120], [0, 1], { extrapolateLeft: 'clamp' });
  const afterScoreScale = spring({ frame: frame - 120, fps, from: 0.8, to: 1, config: { damping: 12 } });

  // Side-by-side transition spring drivers - starts at 180
  const afterRevealProgress = spring({
    frame: frame - 120,
    fps,
    from: 0,
    to: 1,
    config: { damping: 18, mass: 1.2 }
  });

  const splitProgress = spring({
    frame: frame - 180,
    fps,
    from: 0,
    to: 1,
    config: { damping: 18, mass: 1.2 }
  });

  // Flipbook 3D spring driver - starts at 180
  const flipRotation = spring({
    frame: frame - 120,
    fps,
    from: 0,
    to: 180,
    config: { damping: 18, mass: 1.2 }
  });

  // Cinematic zooms & 3D scale drivers for flipbook style
  const beforeZoom = interpolate(frame, [0, 120], [1.15, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const afterZoom = spring({
    frame: frame - 120,
    fps,
    from: 0.88,
    to: 1.0,
    config: { damping: 18, mass: 1.2 }
  });
  const card3DScale = interpolate(flipRotation, [0, 90, 180], [1.0, 0.90, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Calculate dynamic before score opacity based on style staging (declared after splitProgress and flipRotation to avoid TDZ error)
  let currentBeforeScoreOpacity = beforeScoreOpacity;
  if (style === "side_by_side") {
    if (frame >= 120 && frame < 180) {
      currentBeforeScoreOpacity = 0; // completely hide during Stage 2
    } else if (frame >= 180) {
      currentBeforeScoreOpacity = splitProgress; // fade back in Stage 3
    }
  } else if (style === "flipbook") {
    // Fade out BEFORE score during the first half of the card flip rotation (0 to 90 degrees)
    currentBeforeScoreOpacity = interpolate(flipRotation, [0, 90], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) * beforeScoreOpacity;
  }

  // Calculate dynamic after score opacity based on style staging
  let currentAfterScoreOpacity = afterScoreOpacity;
  if (style === "flipbook") {
    // Fade in AFTER score during the second half of the card flip rotation (90 to 180 degrees)
    currentAfterScoreOpacity = interpolate(flipRotation, [120, 210], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  }

  // Scene 4: Chart slide-up driver (starts at 340)
  const chartRiseProgress = spring({ frame: frame - 500, fps, from: 1920, to: 0, config: { damping: 16, mass: 1.1 } });

  // Scene 5: Outro scale driver (starts at 950)
  const outroScale = spring({ frame: frame - 950, fps, from: 0.6, to: 1, config: { damping: 10 } });
  const outroOpacity = interpolate(frame, [950, 980], [0, 1], { extrapolateLeft: 'clamp' });

  const introFadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(16, 175, 204, 0.08) 0%, #ffffff 35%, #ffffff 65%, rgba(16, 175, 204, 0.08) 100%)', color: '#1A202C', fontFamily: 'Inter, sans-serif', opacity: introFadeIn }}>
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap');
      `}} />

      {/* ── SCENE 2: BEFORE SCAN BASELINE VIEW (Frames 0 to 80) ── */}
      {frame < 80 && (() => {
        const concernsList = concerns && concerns.length > 0 ? concerns : Object.keys(firstScan.metrics || {});

        // Phase 1 → slow zoom from 1.0 to 1.06 across entire scene
        const zoomProgress = interpolate(frame, [0, 80], [1.0, 1.06], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const combinedScale = before_image_scale * zoomProgress;

        // Phase 2 → BEFORE badge + date slide in from top (frames 8–22)
        const dateOpacity = interpolate(frame, [8, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const dateY = interpolate(frame, [8, 22], [-40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        // Phase 3 → bottom panel slides up (frames 40–56)
        const panelOpacity = interpolate(frame, [40, 56], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const panelY = interpolate(frame, [40, 56], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        return (
          <AbsoluteFill style={{
            background: 'linear-gradient(180deg, rgba(16, 175, 204, 0.08) 0%, #ffffff 35%, #ffffff 65%, rgba(16, 175, 204, 0.08) 100%)',
            overflow: 'hidden'
          }}>

            {/* Card box with gaps from all directions (80px margin equivalent to 2 inches) */}
            <div style={{
              position: 'absolute',
              top: 240,
              bottom: 340,
              left: 80,
              right: 80,
              borderRadius: 32,
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              border: '3px solid #10AFCC',
              boxShadow: '0 20px 50px rgba(16, 175, 204, 0.15)',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Img
                src={firstScan.imageUrl}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: `scale(${combinedScale}) translate(${before_image_offset_x}px, ${before_image_offset_y}px)`,
                  transformOrigin: 'center center',
                }}
                alt="Before Scan"
              />
              {mask_enabled === 'on' && before_mask_url && (
                <Img
                  src={before_mask_url}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                    transform: `scale(${combinedScale}) translate(${before_image_offset_x}px, ${before_image_offset_y}px)`,
                    transformOrigin: 'center center'
                  }}
                  alt="Before Mask"
                />
              )}
            </div>

            {/* BEFORE badge — top right of Photo Card */}
            <div style={{
              position: 'absolute',
              top: 150,
              right: 80,
              opacity: dateOpacity,
              zIndex: 10,
            }}>
              <div style={{
                background: 'rgba(0, 0, 0, 0.45)',
                padding: '6px 14px',
                borderRadius: 6,
              }}>
                <span style={{
                  fontSize: 34,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  letterSpacing: 1,
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  BEFORE
                </span>
              </div>
            </div>

            {/* Date — top left of Photo Card */}
            <div style={{
              position: 'absolute',
              top: 150,
              left: 80,
              opacity: dateOpacity,
              transform: `translateY(${dateY}px)`,
              backgroundColor: 'rgba(0,0,0,0.45)',
              borderRadius: 6,
              padding: '6px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              boxSizing: 'border-box',
              zIndex: 10,
            }}>
              <span style={{
                fontSize: 34,
                fontWeight: 'bold',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                {firstScan.date.toUpperCase()}
              </span>
            </div>

            {/* Concern & Score Overlay — Bottom Left of Photo Card */}
            {(() => {
              let concernName = highlightMetric.charAt(0).toUpperCase() + highlightMetric.slice(1);
              const lowerKey = highlightMetric.toLowerCase();
              if (lowerKey.includes('red')) concernName = 'Redness';
              else if (lowerKey.includes('text')) concernName = 'Texture';
              else if (lowerKey.includes('pigm')) concernName = 'Pigmentation';
              else if (lowerKey.includes('break')) concernName = 'Breakouts';

              return (
                <div style={{
                  position: 'absolute',
                  bottom: 240,
                  left: 80,
                  opacity: panelOpacity,
                  transform: `translateY(${panelY}px)`,
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  borderRadius: 6,
                  padding: '6px 14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  zIndex: 10,
                }}>
                  <span style={{
                    fontSize: 28,
                    color: '#FFFFFF',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'normal',
                  }}>
                    {concernName}
                  </span>
                  <span style={{
                    fontSize: 28,
                    color: '#FFFFFF',
                    fontFamily: 'Montserrat, sans-serif',
                    margin: '0 10px',
                    fontWeight: 'normal',
                  }}>
                    ·
                  </span>
                  <span style={{
                    fontSize: 28,
                    color: '#FFFFFF',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold',
                  }}>
                    {firstScore}
                  </span>
                </div>
              );
            })()}

          </AbsoluteFill>
        );
      })()}

      {/* ── SCENE 3: AFTER SCAN BASELINE VIEW (Frames 80 to 180) ── */}
      {frame >= 80 && frame < 180 && (() => {
        const concernsList = concerns && concerns.length > 0 ? concerns : Object.keys(lastScan.metrics || {});
        const f = frame - 80; // local frame (0–100)

        // Phase 1 → slow zoom from 1.0 to 1.06 across entire scene
        const zoomProgress = interpolate(f, [0, 100], [1.0, 1.06], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const combinedScale = after_image_scale * zoomProgress;

        // Phase 2 → AFTER badge + date slide in from top (frames 8–22)
        const dateOpacity = interpolate(f, [8, 22], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const dateY = interpolate(f, [8, 22], [-40, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        // Phase 3 → bottom panel slides up (frames 40–56)
        const panelOpacity = interpolate(f, [40, 56], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const panelY = interpolate(f, [40, 56], [100, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        return (
          <AbsoluteFill style={{
            background: 'linear-gradient(180deg, rgba(16, 175, 204, 0.08) 0%, #ffffff 35%, #ffffff 65%, rgba(16, 175, 204, 0.08) 100%)',
            overflow: 'hidden'
          }}>

            {/* Card box with gaps from all directions (80px margin equivalent to 2 inches) */}
            <div style={{
              position: 'absolute',
              top: 240,
              bottom: 340,
              left: 80,
              right: 80,
              borderRadius: 32,
              overflow: 'hidden',
              backgroundColor: '#ffffff',
              border: '3px solid #10AFCC',
              boxShadow: '0 20px 50px rgba(16, 175, 204, 0.15)',
              boxSizing: 'border-box',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Img
                src={lastScan.imageUrl}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: `scale(${combinedScale}) translate(${after_image_offset_x}px, ${after_image_offset_y}px)`,
                  transformOrigin: 'center center',
                }}
                alt="After Scan"
              />
              {mask_enabled === 'on' && after_mask_url && (
                <Img
                  src={after_mask_url}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                    transform: `scale(${combinedScale}) translate(${after_image_offset_x}px, ${after_image_offset_y}px)`,
                    transformOrigin: 'center center'
                  }}
                  alt="After Mask"
                />
              )}
            </div>

            {/* AFTER badge — top right of Photo Card */}
            <div style={{
              position: 'absolute',
              top: 150,
              right: 80,
              opacity: dateOpacity,
              zIndex: 10,
            }}>
              <div style={{
                background: 'rgba(0, 0, 0, 0.45)',
                padding: '6px 14px',
                borderRadius: 6,
              }}>
                <span style={{
                  fontSize: 34,
                  fontWeight: 'bold',
                  color: '#FFFFFF',
                  letterSpacing: 1,
                  fontFamily: 'Montserrat, sans-serif'
                }}>
                  AFTER
                </span>
              </div>
            </div>

            {/* Date — top left of Photo Card */}
            <div style={{
              position: 'absolute',
              top: 150,
              left: 80,
              opacity: dateOpacity,
              transform: `translateY(${dateY}px)`,
              backgroundColor: 'rgba(0,0,0,0.45)',
              borderRadius: 6,
              padding: '6px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              boxSizing: 'border-box',
              zIndex: 10,
            }}>
              <span style={{
                fontSize: 34,
                fontWeight: 'bold',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                {lastScan.date.toUpperCase()}
              </span>
            </div>

            {/* Concern & Score Overlay — Bottom Left of Photo Card */}
            {(() => {
              let concernName = highlightMetric.charAt(0).toUpperCase() + highlightMetric.slice(1);
              const lowerKey = highlightMetric.toLowerCase();
              if (lowerKey.includes('red')) concernName = 'Redness';
              else if (lowerKey.includes('text')) concernName = 'Texture';
              else if (lowerKey.includes('pigm')) concernName = 'Pigmentation';
              else if (lowerKey.includes('break')) concernName = 'Breakouts';

              return (
                <div style={{
                  position: 'absolute',
                  bottom: 240,
                  left: 80,
                  opacity: panelOpacity,
                  transform: `translateY(${panelY}px)`,
                  backgroundColor: 'rgba(0,0,0,0.45)',
                  borderRadius: 6,
                  padding: '6px 14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  boxSizing: 'border-box',
                  zIndex: 10,
                }}>
                  <span style={{
                    fontSize: 28,
                    color: '#FFFFFF',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'normal',
                  }}>
                    {concernName}
                  </span>
                  <span style={{
                    fontSize: 28,
                    color: '#FFFFFF',
                    fontFamily: 'Montserrat, sans-serif',
                    margin: '0 10px',
                    fontWeight: 'normal',
                  }}>
                    ·
                  </span>
                  <span style={{
                    fontSize: 28,
                    color: '#FFFFFF',
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold',
                  }}>
                    {lastScore}
                  </span>
                </div>
              );
            })()}

          </AbsoluteFill>
        );
      })()}



      {/* ── SCENE 3b: COMPARISON SLIDE SCREEN (Frames 180 to 340) ── */}
      {frame >= 180 && frame < 340 && (() => {
        let concernName = highlightMetric.charAt(0).toUpperCase() + highlightMetric.slice(1);
        const lowerKey = highlightMetric.toLowerCase();
        if (lowerKey.includes('red')) concernName = 'Redness';
        else if (lowerKey.includes('text')) concernName = 'Texture';
        else if (lowerKey.includes('pigm')) concernName = 'Pigmentation';
        else if (lowerKey.includes('break')) concernName = 'Breakouts';

        const scoreDiffVal = lastScore - firstScore;
        const isPositive = scoreDiffVal > 0;
        const deltaArrow = scoreDiffVal > 0 ? '↑' : scoreDiffVal < 0 ? '↓' : '';
        const deltaText = scoreDiffVal !== 0 ? `${deltaArrow} ${Math.abs(scoreDiffVal)}` : '0';
        const deltaColor = isPositive ? '#1D9E75' : '#718096';

        return (
          <AbsoluteFill style={{
            background: 'linear-gradient(180deg, rgba(16, 175, 204, 0.08) 0%, #ffffff 35%, #ffffff 65%, rgba(16, 175, 204, 0.08) 100%)',
            overflow: 'hidden'
          }}>

            {/* Header: concernName */}
            <div style={{
              position: 'absolute',
              top: 120,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 20,
              pointerEvents: 'none',
            }}>
              <span style={{
                fontSize: 46,
                fontWeight: '800',
                color: '#10AFCC',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                {concernName}
              </span>
            </div>

            {/* Side-by-side Photo area */}
            <div style={{
              position: 'absolute',
              top: 280,
              bottom: 420,
              left: 80,
              right: 80,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              gap: 24,
            }}>
              {/* BEFORE Photo Column Wrapper */}
              <div style={{
                width: 'calc(50% - 12px)',
                height: '100%',
                border: '3px solid rgba(0, 0, 0, 0.45)',
                borderRadius: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px 20px',
                boxSizing: 'border-box',
              }}>
                {/* Image Box */}
                <div style={{
                  width: '100%',
                  height: 680,
                  borderRadius: 24,
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <Img
                    src={firstScan.imageUrl}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: `scale(${before_image_scale}) translate(${before_image_offset_x}px, ${before_image_offset_y}px)`,
                      transformOrigin: 'center center'
                    }}
                    alt="Before Scan"
                  />
                  {mask_enabled === 'on' && before_mask_url && (
                    <Img src={before_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', transform: `scale(${before_image_scale}) translate(${before_image_offset_x}px, ${before_image_offset_y}px)`, transformOrigin: 'center center' }} alt="Before Mask" />
                  )}
                </div>

                {/* BEFORE badge below image */}
                <div style={{
                  marginTop: 40,
                  backgroundColor: 'rgba(0, 0, 0, 0.45)',
                  borderRadius: 16,
                  padding: '10px 30px',
                  display: 'inline-block',
                }}>
                  <span style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    letterSpacing: '1px',
                    fontFamily: 'Montserrat, sans-serif'
                  }}>
                    BEFORE
                  </span>
                </div>
              </div>

              {/* AFTER Photo Column Wrapper (Cyan Border Card) */}
              <div style={{
                width: 'calc(50% - 12px)',
                height: '100%',
                border: '3px solid #10AFCC',
                borderRadius: 32,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '40px 20px',
                boxSizing: 'border-box',
              }}>
                {/* Image Box */}
                <div style={{
                  width: '100%',
                  height: 680,
                  borderRadius: 24,
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <Img
                    src={lastScan.imageUrl}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: `scale(${after_image_scale}) translate(${after_image_offset_x}px, ${after_image_offset_y}px)`,
                      transformOrigin: 'center center'
                    }}
                    alt="After Scan"
                  />
                  {mask_enabled === 'on' && after_mask_url && (
                    <Img src={after_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', transform: `scale(${after_image_scale}) translate(${after_image_offset_x}px, ${after_image_offset_y}px)`, transformOrigin: 'center center' }} alt="After Mask" />
                  )}
                </div>

                {/* AFTER badge below image */}
                <div style={{
                  marginTop: 40,
                  backgroundColor: '#10AFCC',
                  borderRadius: 16,
                  padding: '10px 30px',
                  display: 'inline-block',
                }}>
                  <span style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#FFFFFF',
                    letterSpacing: '1px',
                    fontFamily: 'Montserrat, sans-serif'
                  }}>
                    AFTER
                  </span>
                </div>
              </div>
            </div>

            {/* Before Date Overlay under left column */}
            <div style={{
              position: 'absolute',
              bottom: 275,
              left: 310,
              transform: 'translateX(-50%)',
              zIndex: 20,
              pointerEvents: 'none',
              textAlign: 'center',
            }}>
              <span style={{
                fontSize: 22,
                fontWeight: '600',
                color: '#718096',
                textTransform: 'uppercase',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                {firstScan.date.toUpperCase()}
              </span>
            </div>

            {/* Before Score under left column */}
            <div style={{
              position: 'absolute',
              bottom: 165,
              left: 310,
              transform: 'translateX(-50%)',
              zIndex: 20,
              pointerEvents: 'none',
              textAlign: 'center',
            }}>
              <span style={{
                fontSize: 90,
                fontWeight: '800',
                color: '#1A202C',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                {firstScore}
              </span>
            </div>

            {/* After Date Overlay under right column */}
            <div style={{
              position: 'absolute',
              bottom: 275,
              right: 310,
              transform: 'translateX(50%)',
              zIndex: 20,
              pointerEvents: 'none',
              textAlign: 'center',
            }}>
              <span style={{
                fontSize: 22,
                fontWeight: '600',
                color: '#718096',
                textTransform: 'uppercase',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                {lastScan.date.toUpperCase()}
              </span>
            </div>

            {/* After Score under right column */}
            <div style={{
              position: 'absolute',
              bottom: 165,
              right: 310,
              transform: 'translateX(50%)',
              zIndex: 20,
              pointerEvents: 'none',
              textAlign: 'center',
            }}>
              <span style={{
                fontSize: 90,
                fontWeight: '800',
                color: '#1A202C',
                fontFamily: 'Montserrat, sans-serif'
              }}>
                {lastScore}
              </span>
            </div>

            {/* Delta Change Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 165,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 20,
              pointerEvents: 'none',
              textAlign: 'center',
            }}>
              <span style={{
                fontSize: 96,
                fontWeight: '800',
                color: deltaColor,
                fontFamily: 'Montserrat, sans-serif'
              }}>
                {deltaText}
              </span>
            </div>



          </AbsoluteFill>
        );
      })()}

      {/* ── SCENE 1: PREMIUM PRODUCT INTRO SCREEN ── */}
      {frame >= 340 && frame < 500 && (() => {
        // Simple intro — product logo fades in directly, no gift box
        const localIntroFrame = frame - 340;
        const logoScale = spring({ frame: localIntroFrame, fps, from: 0, to: 1, config: { damping: 10, mass: 0.9, stiffness: 100 } });

        // Text fades in line by line
        const line1Opacity = interpolate(localIntroFrame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const line1Y = interpolate(localIntroFrame, [10, 30], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const line2Opacity = interpolate(localIntroFrame, [25, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const line2Y = interpolate(localIntroFrame, [25, 45], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const line3Opacity = interpolate(localIntroFrame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const line3Y = interpolate(localIntroFrame, [40, 60], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const panelOpacity = interpolate(localIntroFrame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const panelY = interpolate(localIntroFrame, [55, 80], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        // Entire scene fades out at end
        const sceneOpacity = interpolate(localIntroFrame, [145, 160], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const testerName = tester_by || creator_name || '';

        return (
          <AbsoluteFill style={{
            background: 'linear-gradient(180deg, rgba(16, 175, 204, 0.08) 0%, #ffffff 35%, #ffffff 65%, rgba(16, 175, 204, 0.08) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            padding: '220px 80px 220px',
            boxSizing: 'border-box',
            opacity: sceneOpacity
          }}>
            {/* Background Glow */}
            <div style={{
              position: 'absolute',
              width: 1400,
              height: 1400,
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) scale(${interpolate(localIntroFrame, [0, 160], [1, 1.15])})`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16, 175, 204, 0.10) 0%, rgba(0, 0, 0, 0) 70%)',
              zIndex: 0,
              pointerEvents: 'none'
            }} />

            {/* ── TOP: Text Header ── */}
            <div style={{ zIndex: 1, textAlign: 'center' }}>
              <span style={{
                fontSize: 50,
                fontWeight: '900',
                color: '#4A5568',
                letterSpacing: 6,
                fontStyle: 'italic',
                display: 'block',
                marginBottom: 32,
                opacity: line1Opacity,
                transform: `translateY(${line1Y}px)`
              }}>
                EFFECTIVENESS TRACKING WITH MAGIC MIRROR
              </span>

              <h1 style={{
                fontSize: 48,
                fontWeight: '600',
                color: '#10AFCC',
                letterSpacing: 2,
                margin: '0 0 28px 0',
                fontStyle: 'italic',
                lineHeight: 1.05,
                opacity: line2Opacity,
                transform: `translateY(${line2Y}px)`
              }}>
                {product_name.toUpperCase()}
              </h1>

              {brand_name ? (
                <h2 style={{
                  fontSize: 48,
                  fontWeight: '800',
                  color: '#10AFCC',
                  fontStyle: 'italic',
                  margin: 0,
                  letterSpacing: 3,
                  opacity: line3Opacity,
                  transform: `translateY(${line3Y}px)`
                }}>
                  by {brand_name.toUpperCase()}
                </h2>
              ) : null}
            </div>

            {/* ── MIDDLE: Logo ── */}
            <div style={{
              zIndex: 1,
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: `scale(${logoScale})`,
            }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.06)',
                padding: '80px 55px 55px 55px',
                borderRadius: 56,
                boxShadow: '0 20px 50px rgba(16, 175, 204, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 420,
                height: 420,
                boxSizing: 'border-box',
              }}>
                {product_image_url ? (
                  <Img src={product_image_url} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt="Brand Logo" />
                ) : (
                  <AppLogo size={320} />
                )}
              </div>
            </div>

            {/* ── BOTTOM: Tracking Info Panel ── */}
            <div style={{
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              marginTop: -80,
              opacity: panelOpacity,
              transform: `translateY(${panelY}px)`
            }}>

              {/* TRACKING FOR */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                borderRadius: 24,
                padding: '28px 40px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 40,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)'
              }}>
                <span style={{ fontSize: 25, fontWeight: '700', color: '#718096', letterSpacing: 3, flexShrink: 0, width: 220 }}>
                  TRACKING FOR
                </span>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px 36px', alignItems: 'center' }}>
                  {(concerns.length > 0 ? concerns : ['—']).map((c, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#00A2C1', flexShrink: 0 }} />
                      <span style={{ fontSize: 35, color: '#1A202C', fontWeight: '500' }}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* TRACKING PERIOD */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                borderRadius: 24,
                padding: '28px 40px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 40,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)'
              }}>
                <span style={{ fontSize: 25, fontWeight: '700', color: '#718096', letterSpacing: 3, flexShrink: 0, width: 220 }}>
                  TRACKING PERIOD
                </span>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                  {before_date && (
                    <span style={{ fontSize: 30, color: '#1A202C', fontWeight: '600' }}>{before_date}</span>
                  )}
                  {before_date && after_date && (
                    <span style={{ fontSize: 24, color: '#718096', fontWeight: '400' }}>→</span>
                  )}
                  {after_date && (
                    <span style={{ fontSize: 30, color: '#1A202C', fontWeight: '600' }}>{after_date}</span>
                  )}
                </div>
              </div>

              {/* TESTED BY */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                borderRadius: 24,
                padding: '28px 40px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 40,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.03)'
              }}>
                <span style={{ fontSize: 25, fontWeight: '700', color: '#718096', letterSpacing: 3, flexShrink: 0, width: 220 }}>
                  TESTED BY
                </span>
                {testerName ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                      <circle cx="40" cy="40" r="37" stroke="#00A2C1" strokeWidth="4.5" />
                      <circle cx="40" cy="31" r="11" stroke="#00A2C1" strokeWidth="3.5" />
                      <path d="M16 65c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="#00A2C1" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                    <div style={{ width: 2, height: 60, backgroundColor: 'rgba(0,0,0,0.1)', margin: '0 28px', flexShrink: 0 }} />
                    <span style={{ fontSize: 34, color: '#1A202C', fontWeight: '700' }}>
                      {testerName.startsWith('@') ? testerName : `@${testerName}`}
                    </span>
                  </div>
                ) : (
                  <span style={{ fontSize: 28, color: '#718096', fontWeight: '500' }}>—</span>
                )}
              </div>

            </div>
          </AbsoluteFill>
        );
      })()}


      {/* ── SCENE 4: THE EFFECTIVENESS CHART (Frames 500 - 950 = 15s) ── */}
      {frame >= 500 && frame < 950 && (() => {
        const localFrame = frame - 500;

        // 1. Identify if we are in dynamic actual scans mode vs simulated mode
        const hasPeriodData = timeline && timeline.some(s => s.period);

        let avBT = firstScore;
        let avPT = lastScore;
        let beforePoints = [];
        let duringPoints = [];

        const getDayFromDate = (dateStr) => {
          if (!dateStr) return 1;
          const match = dateStr.match(/\d+/);
          return match ? parseInt(match[0], 10) : 1;
        };

        if (hasPeriodData) {
          const beforeScans = timeline.filter(s => s.period === 'before');
          const afterScans = timeline.filter(s => s.period === 'after');

          // Calculate real average of actual metrics
          if (beforeScans.length > 0) {
            const sum = beforeScans.reduce((acc, s) => acc + (s.metrics?.[highlightMetric] || 0), 0);
            avBT = Math.round(sum / beforeScans.length);
          }
          if (afterScans.length > 0) {
            const sum = afterScans.reduce((acc, s) => acc + (s.metrics?.[highlightMetric] || 0), 0);
            avPT = Math.round(sum / afterScans.length);
          }

          // Map actual scores and dates (day of the month from 1 to 28)
          // Map actual scores and dates (Day-wise indices starting from 1)
          // Helper to calculate exact day offset based on scan date vs first Date
          const getDayOffset = (dateStr) => {
            const dateObj = parseScanDate(dateStr);
            if (!dateObj || !firstDate) return 1;
            const diffMs = dateObj - firstDate;
            const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
            return Math.max(0, diffDays) + 1;
          };

          // Map actual scores and dates using real day gap
          beforePoints = beforeScans.map((s) => ({
            day: getDayOffset(s.date),
            score: s.metrics?.[highlightMetric] || 60
          }));

          duringPoints = afterScans.map((s) => ({
            day: getDayOffset(s.date),
            score: s.metrics?.[highlightMetric] || 75
          }));
        } else {
          // Fallback to Simulation Mode (Case 1: Only 2 selected scans)
          const getDeterministicNoise = (day, seed) => {
            const x = Math.sin(day * 12.9898 + seed * 78.233) * 43758.5453123;
            return (x - Math.floor(x)) * 2 - 1; // Float between -1.0 and 1.0
          };

          // Distribute simulated points across the total test period duration
          const numBefore = 6;
          const numAfter = 7;
          const midDay = Math.floor(nDays / 2);

          beforePoints = Array.from({ length: numBefore }).map((_, idx) => {
            const fraction = idx / (numBefore - 1 || 1);
            const day = Math.max(1, Math.round(1 + fraction * (midDay - 1)));
            const noise = getDeterministicNoise(day, avBT * 3.1);
            const rawScore = avBT + noise * 6.5;
            return {
              day,
              score: Math.max(5, Math.min(95, Math.round(rawScore)))
            };
          });

          duringPoints = Array.from({ length: numAfter }).map((_, idx) => {
            const fraction = idx / (numAfter - 1 || 1);
            const day = Math.min(nDays, Math.round((midDay + 1) + fraction * (nDays - midDay - 1)));
            const noise = getDeterministicNoise(day, avPT * 5.7);
            const rawScore = avPT + noise * 7.5;
            return {
              day,
              score: Math.max(5, Math.min(95, Math.round(rawScore)))
            };
          });
        }

        // Distribute simulated or actual points across the total test period duration
        const totalPointsCount = (beforePoints.length + duringPoints.length) || 2;
        const rawPoints = [
          ...beforePoints.map((p, idx) => ({ ...p, period: 'before', index: idx })),
          ...duringPoints.map((p, idx) => ({ ...p, period: 'after', index: beforePoints.length + idx }))
        ];

        const allPoints = rawPoints.map((pt) => {
          const fraction = pt.index / (totalPointsCount - 1 || 1);
          const day = Math.max(1, Math.min(nDays, Math.round(1 + fraction * (nDays - 1))));
          return {
            ...pt,
            day,
            indexInPeriod: pt.period === 'before' ? pt.index : pt.index - beforePoints.length
          };
        });

        beforePoints = allPoints.filter(p => p.period === 'before');
        duringPoints = allPoints.filter(p => p.period === 'after');
        const maxDaysVal = nDays;

        // Dynamic Y-axis limits scaling to fit and expand scores visually (tightened padding to increase gap)
        const allScoresList = allPoints.map(p => p.score);
        const minScoreVal = Math.max(0, Math.min(...allScoresList, avBT, avPT) - 8);
        const maxScoreVal = Math.min(100, Math.max(...allScoresList, avBT, avPT) + 8);
        const scoreRangeVal = maxScoreVal - minScoreVal;

        // Generate grid values dynamically (every 5 or 10 units depending on range)
        const stepSize = scoreRangeVal <= 25 ? 5 : 10;
        const minGridValue = Math.ceil(minScoreVal / stepSize) * stepSize;
        const maxGridValue = Math.floor(maxScoreVal / stepSize) * stepSize;
        const gridSteps = [];
        for (let s = minGridValue; s <= maxGridValue; s += stepSize) {
          gridSteps.push(s);
        }

        // SVG Layout Coordinates Mapping
        const svgWidth = 940;
        const svgHeight = 580; // Adjusted height

        const marginLeft = 80;
        const marginRight = 40;
        const marginTop = 50;
        const marginBottom = 90;

        const getX = (d) => {
          if (maxDaysVal <= 1) return marginLeft + (svgWidth - marginRight - marginLeft) / 2;
          return marginLeft + ((d - 1) / (maxDaysVal - 1)) * (svgWidth - marginRight - marginLeft);
        };

        const getY = (s) => {
          const pct = (s - minScoreVal) / scoreRangeVal;
          return (svgHeight - marginBottom) - pct * (svgHeight - marginTop - marginBottom);
        };

        // Timings and Opacities for the 5 beats
        const beforeLineOpacity = interpolate(localFrame, [10, 50], [0, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const afterLineProgress = interpolate(localFrame, [220, 300], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const afterLineOpacity = interpolate(localFrame, [220, 235], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const afterLineX2 = getX(1) + afterLineProgress * (getX(maxDaysVal) - getX(1));

        const fillOpacity = interpolate(localFrame, [300, 350], [0, 0.20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const pillOpacity = interpolate(localFrame, [350, 370], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const textOpacity = interpolate(localFrame, [360, 390], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const diffVal = avPT - avBT;
        const progress = interpolate(localFrame, [350, 410], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const easedProgress = Math.sin((progress * Math.PI) / 2);
        const currentDiff = Math.round(easedProgress * diffVal);
        const diffText = currentDiff > 0 ? `+${currentDiff} points` : currentDiff < 0 ? `−${Math.abs(currentDiff)} points` : `0 points`;

        const absDiff = Math.round(Math.abs(diffVal));
        const summarySentence = avPT >= avBT
          ? `After tracking ${product_name} for ${nDays} days, my average ${concernLower} score changed from ${avBT} to ${avPT} — a shift of +${absDiff} points.`
          : `After tracking ${product_name} for ${nDays} days, my average ${concernLower} score changed from ${avBT} to ${avPT} — a shift of −${absDiff} points.`;

        const renderChartSVG = () => {
          return (
            <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ overflow: 'visible' }}>
              {/* 1. Dynamic Grid Lines and Left Labels */}
              {gridSteps.map((s) => {
                const lineY = getY(s);
                return (
                  <g key={`grid-${s}`}>
                    <line
                      x1={marginLeft}
                      y1={lineY}
                      x2={svgWidth - marginRight}
                      y2={lineY}
                      stroke="rgba(0, 0, 0, 0.08)"
                      strokeWidth={2}
                      strokeDasharray="6 6"
                    />
                    <text
                      x={marginLeft - 20}
                      y={lineY + 6}
                      textAnchor="end"
                      fill="#718096"
                      fontSize={18}
                      fontWeight="600"
                    >
                      {s}
                    </text>
                  </g>
                );
              })}

              {/* Y-Axis Title */}
              <text
                x={marginLeft}
                y={marginTop - 35}
                textAnchor="middle"
                fill="#1A202C"
                fontSize={20}
                fontWeight="700"
              >
                Scores
              </text>

              {/* 2. X-Axis Ticks and Day Labels */}
              {Array.from({ length: maxDaysVal }).map((_, idx) => {
                const day = idx + 1;
                const shouldShowLabel = maxDaysVal <= 10 || day === 1 || day === maxDaysVal || day % Math.ceil(maxDaysVal / 5) === 0;
                if (!shouldShowLabel) return null;

                const tickX = getX(day);
                const tickY = svgHeight - marginBottom;
                return (
                  <g key={`tick-${day}`}>
                    <line
                      x1={tickX}
                      y1={tickY}
                      x2={tickX}
                      y2={tickY + 10}
                      stroke="#718096"
                      strokeWidth={2}
                    />
                    <text
                      x={tickX}
                      y={tickY + 36}
                      textAnchor="middle"
                      fill="#718096"
                      fontSize={16}
                      fontWeight="600"
                    >
                      Day {day}
                    </text>
                  </g>
                );
              })}

              {/* X-Axis Title */}
              <text
                x={(marginLeft + svgWidth - marginRight) / 2}
                y={svgHeight - 15}
                textAnchor="middle"
                fill="#1A202C"
                fontSize={20}
                fontWeight="700"
                letterSpacing={2}
              >
                Test Period (Days)
              </text>

              {/* 3. Main Axes lines */}
              <g>
                {/* Y Axis */}
                <line x1={marginLeft} y1={marginTop - 15} x2={marginLeft} y2={svgHeight - marginBottom} stroke="#718096" strokeWidth={3} />
                <path d={`M ${marginLeft - 6} ${marginTop - 5} L ${marginLeft} ${marginTop - 17} L ${marginLeft + 6} ${marginTop - 5}`} stroke="#718096" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />

                {/* X Axis */}
                <line x1={marginLeft} y1={svgHeight - marginBottom} x2={svgWidth - marginRight + 15} y2={svgHeight - marginBottom} stroke="#718096" strokeWidth={3} />
                <path d={`M ${svgWidth - marginRight + 5} ${svgHeight - marginBottom - 6} L ${svgWidth - marginRight + 17} ${svgHeight - marginBottom} L ${svgWidth - marginRight + 5} ${svgHeight - marginBottom + 6}`} stroke="#718096" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* 4. Gap Fill (floods in during Beat 4) */}
              {fillOpacity > 0.001 && (
                <rect
                  x={getX(1)}
                  y={Math.min(getY(avBT), getY(avPT))}
                  width={getX(maxDaysVal) - getX(1)}
                  height={Math.abs(getY(avBT) - getY(avPT))}
                  fill={avPT >= avBT ? '#1D9E75' : '#888780'}
                  opacity={fillOpacity}
                />
              )}

              {/* 5. BEFORE Average Reference Line (Dashed, gray) */}
              <line
                x1={getX(1)}
                y1={getY(avBT)}
                x2={getX(maxDaysVal)}
                y2={getY(avBT)}
                stroke="#888780"
                strokeWidth={3}
                strokeDasharray="8 6"
                opacity={beforeLineOpacity}
              />

              {/* 6. Dynamic Daily Data Score Dots (Beat 2: wave from left to right) */}
              {allPoints.map((pt, idx) => {
                const dotX = getX(pt.day);
                const dotY = getY(pt.score);

                // Animation logic for each dot popping up in wave (only grey/before dots first, green/after dots later with green line)
                let startFrame;
                if (pt.period === 'before') {
                  startFrame = 60 + (pt.indexInPeriod / Math.max(1, beforePoints.length)) * 80;
                } else {
                  startFrame = 220 + (pt.indexInPeriod / Math.max(1, duringPoints.length)) * 80;
                }
                const dotScale = interpolate(localFrame, [startFrame, startFrame + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                if (dotScale <= 0.001) return null;

                return (
                  <circle
                    key={`dot-${idx}`}
                    cx={dotX}
                    cy={dotY}
                    r={8.5} // slightly larger score dots
                    fill={pt.period === 'before' ? '#888780' : avPT >= avBT ? '#1D9E75' : '#888780'}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    style={{
                      transform: `scale(${dotScale})`,
                      transformOrigin: `${dotX}px ${dotY}px`,
                      opacity: interpolate(localFrame, [300, 320], [1, 0.45], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                    }}
                  />
                );
              })}

              {/* 7. AFTER Average Reference Line (Solid, teal/gray) */}
              {afterLineOpacity > 0.001 && (
                <line
                  x1={getX(1)}
                  y1={getY(avPT)}
                  x2={afterLineX2}
                  y2={getY(avPT)}
                  stroke={avPT >= avBT ? '#1D9E75' : '#888780'}
                  strokeWidth={4.5}
                  opacity={afterLineOpacity}
                />
              )}
            </svg>
          );
        };

        return (
          <AbsoluteFill style={{
            transform: `translateY(${chartRiseProgress}px)`,
            background: 'linear-gradient(180deg, rgba(16, 175, 204, 0.08) 0%, #ffffff 35%, #ffffff 65%, rgba(16, 175, 204, 0.08) 100%)',
            padding: '80px 80px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            boxSizing: 'border-box'
          }}>
            {/* Header section */}
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginBottom: 40 // pushed down by 40px from {nDays}-Day Test Results
            }}>
              <span style={{
                fontSize: 22,
                fontWeight: '700',
                color: '#718096',
                letterSpacing: 4,
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: 6
              }}>
                {concernLower.toUpperCase()} EFFECTIVENESS
              </span>
              <h1 style={{
                fontSize: 48,
                fontWeight: '900',
                color: '#1A202C',
                margin: 0,
                lineHeight: 1.1
              }}>
                {nDays}-Day Test Results
              </h1>
            </div>

            {/* SVG Chart Container - height set to 960px, flexShrink: 0 to prevent shrinking */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: 960,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#ffffff',
              borderRadius: 32,
              border: '2px solid rgba(0, 0, 0, 0.04)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
              padding: '24px 20px 30px 20px',
              boxSizing: 'border-box'
            }}>
              {/* SVG Chart */}
              <div style={{ width: '100%', height: 580 }}>
                {renderChartSVG()}
              </div>

              {/* Average Boxes Container */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 20,
                width: '100%',
                boxSizing: 'border-box',
                padding: '0 10px',
                marginTop: 40
              }}>
                {/* Average Before Box */}
                <div style={{
                  width: 'calc(50% - 10px)',
                  height: 250,
                  backgroundColor: '#f3f3f3',
                  borderRadius: 24,
                  padding: '20px 15px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
                  border: '1px solid rgba(0, 0, 0, 0.03)',
                  boxSizing: 'border-box',
                  opacity: interpolate(localFrame, [50, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                  transform: `translateY(${interpolate(localFrame, [50, 70], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                }}>
                  <div style={{ width: 100, height: 8, borderRadius: 20, backgroundColor: '#a7a7a7', marginBottom: 16 }} />
                  <span style={{ fontSize: 28, fontWeight: '600', color: '#2f3b4a', fontFamily: 'Montserrat, sans-serif', marginBottom: 12 }}>
                    Average Before
                  </span>
                  <span style={{ fontSize: 80, fontWeight: '700', color: '#8d8d8d', fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>
                    {avBT}
                  </span>
                </div>

                {/* Average After Box */}
                <div style={{
                  width: 'calc(50% - 10px)',
                  height: 250,
                  backgroundColor: '#eef8f6',
                  borderRadius: 24,
                  padding: '20px 15px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(29, 158, 117, 0.03)',
                  border: '1px solid rgba(29, 158, 117, 0.08)',
                  boxSizing: 'border-box',
                  opacity: interpolate(localFrame, [220, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
                  transform: `translateY(${interpolate(localFrame, [220, 240], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                }}>
                  <div style={{ width: 100, height: 8, borderRadius: 20, backgroundColor: '#10B392', marginBottom: 16 }} />
                  <span style={{ fontSize: 28, fontWeight: '600', color: '#2f3b4a', fontFamily: 'Montserrat, sans-serif', marginBottom: 12 }}>
                    Average After
                  </span>
                  <span style={{ fontSize: 80, fontWeight: '700', color: '#10B392', fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>
                    {avPT}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Payoff Section - positioned exactly 30px below the graph */}
            <div style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
              marginTop: 50 // 30px margin as requested
            }}>
              {/* Delta Pill */}
              <div style={{
                opacity: pillOpacity,
                transform: `scale(${interpolate(localFrame, [350, 370], [0.8, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
                padding: '16px 48px',
                borderRadius: 40,
                fontSize: 42,
                fontWeight: '800',
                background: avPT >= avBT ? 'rgba(29, 158, 117, 0.15)' : 'rgba(113, 128, 150, 0.12)',
                color: avPT >= avBT ? '#1D9E75' : '#718096',
                border: avPT >= avBT ? '2px solid rgba(29, 158, 117, 0.3)' : '2px solid rgba(113, 128, 150, 0.25)',
                boxShadow: avPT >= avBT ? '0 10px 25px rgba(29, 158, 117, 0.15)' : 'none',
                boxSizing: 'border-box',
                textAlign: 'center',
              }}>
                {diffText}
              </div>

              {/* Summary Sentence & Disclaimer */}
              <div style={{
                opacity: textOpacity,
                transform: `translateY(${interpolate(localFrame, [360, 390], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                textAlign: 'center',
                padding: '70px 40px',
                boxSizing: 'border-box',
                minHeight: 140
              }}>
                <p style={{
                  fontSize: 35,
                  fontWeight: '700',
                  color: '#1A202C',
                  lineHeight: '1.4',
                  margin: '0 0 14px 0'
                }}>
                  {summarySentence}
                </p>
                <p style={{
                  fontSize: 28,
                  color: '#77818eff',
                  fontWeight: '500',
                  lineHeight: '1.3',
                  margin: 0
                }}>
                  Results reflect my personal experience. Individual outcomes may vary based on skin condition and lifestyle.
                </p>
              </div>
            </div>

          </AbsoluteFill>
        );
      })()}
      {/* ── SCENE 5: BRAND OUTRO & VERIFICATION (Frames 950 - 1010 = 2s) ── */}
      {frame >= 950 && (
        <AbsoluteFill style={{
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(180deg, rgba(16, 175, 204, 0.08) 0%, #ffffff 35%, #ffffff 65%, rgba(16, 175, 204, 0.08) 100%)',
          opacity: outroOpacity,
          transform: `scale(${outroScale})`
        }}>
          <div style={{ marginBottom: 50 }}>
            <Img src={mmLogo} style={{ width: 360, height: 360, objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: 28, letterSpacing: 5, color: '#718096', fontWeight: '600' }}>
            VERIFIED BY
          </h2>
          <h1 style={{ fontSize: 68, fontWeight: '900', letterSpacing: 8, color: '#1A202C', marginTop: 15 }}>
            MAGIC MIRROR
          </h1>
          <p style={{ fontSize: 34, color: '#10AFCC', letterSpacing: 2, marginTop: 70, fontWeight: '600' }}>
            OWN YOUR SKIN HEALTH
          </p>
        </AbsoluteFill>
      )}

      {/* ── WATERMARK BRANDING (Every page except the last one) ── */}
      {frame < 965 && (() => {
        const watermarkOpacity = interpolate(frame, [950, 965], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return <Watermark opacity={watermarkOpacity} />;
      })()}

    </AbsoluteFill>
  );
};
