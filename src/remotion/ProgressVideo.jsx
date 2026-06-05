import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig, interpolate, Img } from 'remotion';
import React from 'react';

// Teal SVG Logo Component
const AppLogo = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Main Circle */}
    <circle cx="150" cy="130" r="55"
            fill="none"
            stroke="#10AFCC"
            strokeWidth="8"/>

    {/* Outer Arc */}
    <path d="M 80 130 A 70 70 0 0 0 220 130"
          fill="none"
          stroke="#10AFCC"
          strokeWidth="8"
          strokeLinecap="round"/>

    {/* Inner Arc */}
    <path d="M 95 130 A 55 55 0 0 0 205 130"
          fill="none"
          stroke="#10AFCC"
          strokeWidth="5"
          strokeLinecap="round"/>

    {/* Side Extensions */}
    <line x1="80" y1="130" x2="95" y2="130"
          stroke="#10AFCC"
          strokeWidth="8"
          strokeLinecap="round"/>

    <line x1="205" y1="130" x2="220" y2="130"
          stroke="#10AFCC"
          strokeWidth="8"
          strokeLinecap="round"/>

    {/* Stem */}
    <line x1="150" y1="200" x2="150" y2="235"
          stroke="#10AFCC"
          strokeWidth="8"
          strokeLinecap="round"/>

    {/* Bottom Rounded Shape */}
    <rect x="142" y="235"
          width="16"
          height="35"
          rx="8"
          fill="#10AFCC"/>
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
  const firstScore = firstScan.metrics?.[highlightMetric] || 87;
  const lastScore = lastScan.metrics?.[highlightMetric] || 88;
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

  // ── SCENE BOUNDARIES ──
  // Scene 1: Fullscreen Intro Screen (Frames 0 to 120 = 0s - 3s)
  // Scene 2: Before scan baseline view (Frames 90 to 180 = 3s - 6s)
  // Scene 3: Side-by-side / Wipe Transition (Frames 180 to 280 = 6s - 9.33s)
  // Scene 4: Rising Skincare Journey Chart (Frames 280 to 481 = 9.33s - 16.03s = 6.7s)
  // Scene 5: Verified Brand Outro (Frames 481 to 541 = 16.03s - 18.03s = 2s)

  // ── ANIMATION VALUES ──

  // Slider sweep position driver - starts at 100 (fully Before), sweeps to 0 (fully After), then settles at 50 (50/50 split)
  const sliderPosition = interpolate(frame,
    [240, 290, 310, 370],
    [100, 0, 50, 50],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Score fading drivers - Before score fades in after Intro screen (at frame 90)
  const beforeScoreOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // The after score starts completely hidden and lights up once the slider scene starts at 180
  const afterScoreOpacity = interpolate(frame, [240, 280], [0, 1], { extrapolateLeft: 'clamp' });
  const afterScoreScale = spring({ frame: frame - 280, fps, from: 0.8, to: 1, config: { damping: 12 } });

  // Side-by-side transition spring drivers - starts at 180
  const afterRevealProgress = spring({
    frame: frame - 280,
    fps,
    from: 0,
    to: 1,
    config: { damping: 18, mass: 1.2 }
  });

  const splitProgress = spring({
    frame: frame - 340,
    fps,
    from: 0,
    to: 1,
    config: { damping: 18, mass: 1.2 }
  });

  // Flipbook 3D spring driver - starts at 180
  const flipRotation = spring({
    frame: frame - 280,
    fps,
    from: 0,
    to: 180,
    config: { damping: 18, mass: 1.2 }
  });

  // Cinematic zooms & 3D scale drivers for flipbook style
  const beforeZoom = interpolate(frame, [160, 280], [1.15, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const afterZoom = spring({
    frame: frame - 280,
    fps,
    from: 0.88,
    to: 1.0,
    config: { damping: 18, mass: 1.2 }
  });
  const card3DScale = interpolate(flipRotation, [0, 90, 180], [1.0, 0.90, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Calculate dynamic before score opacity based on style staging (declared after splitProgress and flipRotation to avoid TDZ error)
  let currentBeforeScoreOpacity = beforeScoreOpacity;
  if (style === "side_by_side") {
    if (frame >= 280 && frame < 340) {
      currentBeforeScoreOpacity = 0; // completely hide during Stage 2
    } else if (frame >= 340) {
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

  // Scene 5: Outro scale driver (starts at 481, runs to 541 = 2s)
  const outroScale = spring({ frame: frame - 700, fps, from: 0.6, to: 1, config: { damping: 10 } });
  const outroOpacity = interpolate(frame, [700, 730], [0, 1], { extrapolateLeft: 'clamp' });

  const introFadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff', color: '#1A202C', fontFamily: 'Inter, sans-serif', opacity: introFadeIn }}>

      {/* ── SCENE 1: PREMIUM PRODUCT INTRO SCREEN ── */}
      {frame < 160 && (() => {
        // Simple intro — product logo fades in directly, no gift box
        const logoScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 10, mass: 0.9, stiffness: 100 } });

        // Text fades in line by line
        const line1Opacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const line1Y = interpolate(frame, [10, 30], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const line2Opacity = interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const line2Y = interpolate(frame, [25, 45], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const line3Opacity = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const line3Y = interpolate(frame, [40, 60], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const panelOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const panelY = interpolate(frame, [55, 80], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        // Entire scene fades out at end
        const sceneOpacity = interpolate(frame, [145, 160], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const testerName = tester_by || creator_name || '';

        return (
          <AbsoluteFill style={{
            background: '#ffffff',
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
              transform: `translate(-50%, -50%) scale(${interpolate(frame, [0, 160], [1, 1.15])})`,
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
                EFFICACY TESTING WITH MAGIC MIRROR
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
                  <AppLogo size={260} />
                )}
              </div>
            </div>

            {/* ── BOTTOM: Testing Info Panel ── */}
            <div style={{
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              marginTop: -80,
              opacity: panelOpacity,
              transform: `translateY(${panelY}px)`
            }}>

              {/* TESTING FOR */}
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
                  TESTING FOR
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

              {/* TESTING PERIOD */}
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
                  TESTING PERIOD
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

      {/* ── SCENE 2: BEFORE SCAN BASELINE VIEW (Frames 120 to 180) ── */}
      {frame >= 160 && frame < 240 && (() => {
        const concernsList = concerns && concerns.length > 0 ? concerns : Object.keys(firstScan.metrics || {});

        return (
          <AbsoluteFill style={{
            background: '#ffffff',
            padding: '50px 60px 60px 60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              height: 120,
              padding: '0 10px',
              boxSizing: 'border-box'
            }}>
              {/* Left Side: Date */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontSize: 22,
                  fontWeight: '700',
                  color: '#718096',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginBottom: 6
                }}>
                  DATE
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CalendarIcon size={30} color="#1A202C" />
                  <span style={{
                    fontSize: 34,
                    fontWeight: '700',
                    color: '#1A202C'
                  }}>
                    {firstScan.date.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Right Side: Before badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                background: '#FFFFFF',
                padding: '12px 28px',
                borderRadius: 30,
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}>
                <CalendarIcon size={30} color="#1A202C" />
                <span style={{
                  fontSize: 34,
                  fontWeight: '700',
                  color: '#1A202C',
                  letterSpacing: 1
                }}>
                  BEFORE
                </span>
              </div>
            </div>

            {/* Centered Image Card Container */}
            <div style={{
              position: 'relative',
              width: 960,
              height: 1100,
              margin: '0 auto',
              borderRadius: 48,
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15), 0 0 30px rgba(16, 175, 204, 0.1)',
              border: '3px solid rgba(0, 0, 0, 0.05)',
              backgroundColor: '#FFFFFF',
              boxSizing: 'border-box'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: 32,
                overflow: 'hidden',
                backgroundColor: 'transparent',
                boxSizing: 'border-box'
              }}>
                <Img
                  src={firstScan.imageUrl}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transform: `scale(${before_image_scale}) translate(${before_image_offset_x}px, ${before_image_offset_y}px)`,
                    transformOrigin: 'center center'
                  }}
                  alt="Before Scan"
                />
                {mask_enabled === 'on' && before_mask_url && (
                  <Img src={before_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none', transform: `scale(${before_image_scale}) translate(${before_image_offset_x}px, ${before_image_offset_y}px)`, transformOrigin: 'center center' }} alt="Before Mask" />
                )}
              </div>
            </div>

            {/* Footer containing CONCERNS TESTED + cards */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '0 10px',
              boxSizing: 'border-box'
            }}>
              {/* CONCERNS TESTED Badge */}
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  padding: '10px 24px',
                  borderRadius: 20
                }}>
                  <span style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#718096',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase'
                  }}>
                    CONCERNS TESTED
                  </span>
                </div>
              </div>

              {/* Concerns Cards Grid */}
              <div style={{
                display: 'flex',
                gap: 24,
                justifyContent: 'space-between',
                width: '100%'
              }}>
                {concernsList.map((concernKey, index) => {
                  const scoreVal = getMetricScore(firstScan.metrics, concernKey);
                  let label = concernKey.charAt(0).toUpperCase() + concernKey.slice(1);
                  let IconComponent = DefaultConcernIcon;
                  let underlineColor = 'linear-gradient(90deg, #10AFCC 0%, rgba(16, 175, 204, 0.1) 100%)';
                  let iconBg = 'rgba(16, 175, 204, 0.15)';

                  const lowerKey = concernKey.toLowerCase();
                  if (lowerKey.includes('red')) {
                    label = 'Redness';
                    IconComponent = RednessIcon;
                    underlineColor = 'linear-gradient(90deg, #E29E57 0%, rgba(226, 158, 87, 0.1) 100%)';
                    iconBg = 'rgba(226, 158, 87, 0.15)';
                  } else if (lowerKey.includes('text')) {
                    label = 'Texture';
                    IconComponent = TextureIcon;
                    underlineColor = 'linear-gradient(90deg, #6B8BA4 0%, rgba(107, 139, 164, 0.1) 100%)';
                    iconBg = 'rgba(107, 139, 164, 0.15)';
                  } else if (lowerKey.includes('pigm')) {
                    label = 'Pigmentation';
                    IconComponent = PigmentationIcon;
                    underlineColor = 'linear-gradient(90deg, #4FA492 0%, rgba(79, 164, 146, 0.1) 100%)';
                    iconBg = 'rgba(79, 164, 146, 0.15)';
                  } else if (lowerKey.includes('break')) {
                    label = 'Breakouts';
                    IconComponent = (props) => <RednessIcon {...props} color="#E56B6B" />;
                    underlineColor = 'linear-gradient(90deg, #E56B6B 0%, rgba(229, 107, 107, 0.1) 100%)';
                    iconBg = 'rgba(229, 107, 107, 0.15)';
                  }

                  const cardWidth = concernsList.length === 1
                    ? '100%'
                    : concernsList.length === 2
                      ? 'calc(50% - 12px)'
                      : 'calc(33.33% - 16px)';

                  return (
                    <div
                      key={concernKey}
                      style={{
                        width: cardWidth,
                        background: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        borderRadius: 32,
                        padding: '32px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <>
                        {/* Header Row: Icon + Label */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                          <div style={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            backgroundColor: iconBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <IconComponent size={32} />
                          </div>
                          <span style={{ fontSize: 28, fontWeight: '700', color: '#1A202C' }}>
                            {label}
                          </span>
                        </div>

                        {/* Score Row */}
                        <div>
                          <span style={{ fontSize: 20, fontWeight: '600', color: '#718096', display: 'block', marginBottom: 8 }}>
                            Score
                          </span>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                            <span style={{ fontSize: 84, fontWeight: '800', color: '#1A202C', lineHeight: 1 }}>
                              {scoreVal}
                            </span>
                            <span style={{ fontSize: 24, fontWeight: '600', color: '#718096' }}>
                              /100
                            </span>
                          </div>
                        </div>
                      </>

                      {/* Underline Bar */}
                      <div style={{
                        width: '100%',
                        height: 4,
                        borderRadius: 2,
                        background: underlineColor,
                        marginTop: 20
                      }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </AbsoluteFill>
        );
      })()}

      {/* ── SCENE 3: AFTER SCAN BASELINE VIEW (Frames 180 to 250) ── */}
      {frame >= 240 && frame < 340 && (() => {
        const concernsList = concerns && concerns.length > 0 ? concerns : Object.keys(lastScan.metrics || {});

        return (
          <AbsoluteFill style={{
            background: '#ffffff',
            padding: '50px 60px 60px 60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              height: 120,
              padding: '0 10px',
              boxSizing: 'border-box'
            }}>
              {/* Left Side: Date */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                  fontSize: 22,
                  fontWeight: '700',
                  color: '#718096',
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  marginBottom: 6
                }}>
                  DATE
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <CalendarIcon size={30} color="#1A202C" />
                  <span style={{
                    fontSize: 34,
                    fontWeight: '700',
                    color: '#1A202C'
                  }}>
                    {lastScan.date.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Right Side: After badge */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                border: '1px solid rgba(0, 0, 0, 0.08)',
                background: '#FFFFFF',
                padding: '12px 28px',
                borderRadius: 30,
                boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
              }}>
                <CalendarIcon size={30} color="#1A202C" />
                <span style={{
                  fontSize: 34,
                  fontWeight: '700',
                  color: '#1A202C',
                  letterSpacing: 1
                }}>
                  AFTER
                </span>
              </div>
            </div>

            {/* Centered Image Card Container */}
            <div style={{
              position: 'relative',
              width: 960,
              height: 1100,
              margin: '0 auto',
              borderRadius: 48,
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15), 0 0 30px rgba(16, 175, 204, 0.1)',
              border: '3px solid #10AFCC',
              backgroundColor: '#FFFFFF',
              boxSizing: 'border-box'
            }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                borderRadius: 32,
                overflow: 'hidden',
                backgroundColor: 'transparent',
                boxSizing: 'border-box'
              }}>
                <Img
                  src={lastScan.imageUrl}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transform: `scale(${after_image_scale}) translate(${after_image_offset_x}px, ${after_image_offset_y}px)`,
                    transformOrigin: 'center center'
                  }}
                  alt="After Scan"
                />
                {mask_enabled === 'on' && after_mask_url && (
                  <Img src={after_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none', transform: `scale(${after_image_scale}) translate(${after_image_offset_x}px, ${after_image_offset_y}px)`, transformOrigin: 'center center' }} alt="After Mask" />
                )}
              </div>
            </div>

            {/* Footer containing CONCERNS TESTED + cards */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              padding: '0 10px',
              boxSizing: 'border-box'
            }}>
              {/* CONCERNS TESTED Badge */}
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.03)',
                  border: '1px solid rgba(0, 0, 0, 0.06)',
                  padding: '10px 24px',
                  borderRadius: 20
                }}>
                  <span style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#718096',
                    letterSpacing: 1.5,
                    textTransform: 'uppercase'
                  }}>
                    CONCERNS TESTED
                  </span>
                </div>
              </div>

              {/* Concerns Cards Grid */}
              <div style={{
                display: 'flex',
                gap: 24,
                justifyContent: 'space-between',
                width: '100%'
              }}>
                {concernsList.map((concernKey, index) => {
                  const scoreVal = getMetricScore(lastScan.metrics, concernKey);
                  let label = concernKey.charAt(0).toUpperCase() + concernKey.slice(1);
                  let IconComponent = DefaultConcernIcon;
                  let underlineColor = 'linear-gradient(90deg, #00A2C1 0%, rgba(0, 162, 193, 0.1) 100%)';
                  let iconBg = 'rgba(0, 162, 193, 0.15)';

                  const lowerKey = concernKey.toLowerCase();
                  if (lowerKey.includes('red')) {
                    label = 'Redness';
                    IconComponent = RednessIcon;
                    underlineColor = 'linear-gradient(90deg, #E29E57 0%, rgba(226, 158, 87, 0.1) 100%)';
                    iconBg = 'rgba(226, 158, 87, 0.15)';
                  } else if (lowerKey.includes('text')) {
                    label = 'Texture';
                    IconComponent = TextureIcon;
                    underlineColor = 'linear-gradient(90deg, #6B8BA4 0%, rgba(107, 139, 164, 0.1) 100%)';
                    iconBg = 'rgba(107, 139, 164, 0.15)';
                  } else if (lowerKey.includes('pigm')) {
                    label = 'Pigmentation';
                    IconComponent = PigmentationIcon;
                    underlineColor = 'linear-gradient(90deg, #4FA492 0%, rgba(79, 164, 146, 0.1) 100%)';
                    iconBg = 'rgba(79, 164, 146, 0.15)';
                  } else if (lowerKey.includes('break')) {
                    label = 'Breakouts';
                    IconComponent = (props) => <RednessIcon {...props} color="#E56B6B" />;
                    underlineColor = 'linear-gradient(90deg, #E56B6B 0%, rgba(229, 107, 107, 0.1) 100%)';
                    iconBg = 'rgba(229, 107, 107, 0.15)';
                  }

                  const cardWidth = concernsList.length === 1
                    ? '100%'
                    : concernsList.length === 2
                      ? 'calc(50% - 12px)'
                      : 'calc(33.33% - 16px)';

                  return (
                    <div
                      key={concernKey}
                      style={{
                        width: cardWidth,
                        background: '#FFFFFF',
                        border: '1px solid rgba(0, 0, 0, 0.05)',
                        borderRadius: 32,
                        padding: '32px',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      <>
                        {/* Header Row: Icon + Label */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                          <div style={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            backgroundColor: iconBg,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <IconComponent size={32} />
                          </div>
                          <span style={{ fontSize: 28, fontWeight: '700', color: '#1A202C' }}>
                            {label}
                          </span>
                        </div>

                        {/* Score Row */}
                        <div>
                          <span style={{ fontSize: 20, fontWeight: '600', color: '#718096', display: 'block', marginBottom: 8 }}>
                            Score
                          </span>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                            <span style={{ fontSize: 84, fontWeight: '800', color: '#1A202C', lineHeight: 1 }}>
                              {scoreVal}
                            </span>
                            <span style={{ fontSize: 24, fontWeight: '600', color: '#718096' }}>
                              /100
                            </span>
                          </div>
                        </div>
                      </>

                      {/* Underline Bar */}
                      <div style={{
                        width: '100%',
                        height: 4,
                        borderRadius: 2,
                        background: underlineColor,
                        marginTop: 20
                      }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </AbsoluteFill>
        );
      })()}

      {/* ── SCENE 3b: COMPARISON SLIDE SCREEN (Frames 250 to 370) ── */}
      {frame >= 340 && frame < 500 && (() => {
        const concernsList = concerns && concerns.length > 0 ? concerns : Object.keys(firstScan.metrics || {});

        return (
          <AbsoluteFill style={{
            background: '#ffffff',
            padding: '50px 60px 60px 60px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
          }}>
            {/* Header containing centered title */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: 120,
              width: '100%',
              boxSizing: 'border-box',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: 38, fontWeight: '900', color: '#10AFCC', textTransform: 'uppercase', letterSpacing: 3, display: 'block', marginBottom: 4 }}>
                {metricLabel}
              </span>
              <span style={{ fontSize: 26, fontWeight: '700', color: '#718096', letterSpacing: 1.5 }}>
                / {daysDiff} DAYS
              </span>
            </div>

            {/* Centered Image Card Container */}
            <div style={{
              position: 'relative',
              width: 960,
              height: 1100,
              margin: '0 auto',
              borderRadius: 48,
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15), 0 0 30px rgba(16, 175, 204, 0.1)',
              border: '3px solid rgba(0, 0, 0, 0.05)',
              backgroundColor: '#FFFFFF',
              boxSizing: 'border-box'
            }}>
              {style === "flipbook" ? (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#000000',
                  perspective: 2000,
                  boxSizing: 'border-box'
                }}>
                  <div style={{
                    position: 'relative',
                    width: 820,
                    height: 1000,
                    transform: `scale(${card3DScale}) rotateY(${flipRotation}deg)`,
                    transformStyle: 'preserve-3d',
                    borderRadius: 48,
                    boxShadow: '0 25px 60px rgba(0,0,0,0.8)',
                    border: '24px solid #1C1C1E',
                    backgroundColor: '#1C1C1E',
                    boxSizing: 'border-box'
                  }}>
                    {/* FRONT FACE (BEFORE Image) */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      borderRadius: 24,
                      overflow: 'hidden',
                      backgroundColor: '#000000'
                    }}>
                      <Img
                        src={firstScan.imageUrl}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transform: `scale(${before_image_scale * beforeZoom}) translate(${before_image_offset_x}px, ${before_image_offset_y}px)`,
                          transformOrigin: 'center center'
                        }}
                        alt="Before Scan"
                      />
                      {mask_enabled === 'on' && before_mask_url && (
                        <Img src={before_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', transform: `scale(${before_image_scale * beforeZoom}) translate(${before_image_offset_x}px, ${before_image_offset_y}px)`, transformOrigin: 'center center' }} alt="Before Mask" />
                      )}
                    </div>

                    {/* BACK FACE (AFTER Image) */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      borderRadius: 24,
                      overflow: 'hidden',
                      backgroundColor: '#000000'
                    }}>
                      <Img
                        src={lastScan.imageUrl}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transform: `scale(${after_image_scale * afterZoom}) translate(${after_image_offset_x}px, ${after_image_offset_y}px)`,
                          transformOrigin: 'center center'
                        }}
                        alt="After Scan"
                      />
                      {mask_enabled === 'on' && after_mask_url && (
                        <Img src={after_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', transform: `scale(${after_image_scale * afterZoom}) translate(${after_image_offset_x}px, ${after_image_offset_y}px)`, transformOrigin: 'center center' }} alt="After Mask" />
                      )}
                    </div>
                  </div>
                </div>
              ) : style === "side_by_side" ? (() => {
                const beforeWidth = interpolate(splitProgress, [0, 1], [0, 50]);
                const afterWidth = interpolate(splitProgress, [0, 1], [100, 50]);

                const currentGap = interpolate(splitProgress, [0, 1], [0, 40]);
                const currentPadding = interpolate(splitProgress, [0, 1], [0, 40]);

                return (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    padding: `${currentPadding}px`,
                    gap: `${currentGap}px`,
                    backgroundColor: 'transparent',
                    boxSizing: 'border-box'
                  }}>
                    {/* BEFORE Column */}
                    {beforeWidth > 0.1 && (
                      <div style={{
                        position: 'relative',
                        width: `${beforeWidth}%`,
                        height: '100%',
                        borderRadius: 32,
                        overflow: 'hidden',
                        border: '3px solid rgba(0, 0, 0, 0.05)',
                        backgroundColor: 'transparent',
                        boxSizing: 'border-box'
                      }}>
                        <Img
                          src={firstScan.imageUrl}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            transform: `scale(${before_image_scale}) translate(${before_image_offset_x}px, ${before_image_offset_y}px)`,
                            transformOrigin: 'center center'
                          }}
                          alt="Before Scan"
                        />
                        {/* BEFORE Badge */}
                        <div style={{
                          position: 'absolute',
                          bottom: 24,
                          left: 24,
                          background: 'rgba(0, 0, 0, 0.6)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          padding: '10px 24px',
                          borderRadius: 20,
                          zIndex: 10
                        }}>
                          <span style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                            BEFORE
                          </span>
                        </div>
                        {mask_enabled === 'on' && before_mask_url && (
                          <Img src={before_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none', transform: `scale(${before_image_scale}) translate(${before_image_offset_x}px, ${before_image_offset_y}px)`, transformOrigin: 'center center' }} alt="Before Mask" />
                        )}
                      </div>
                    )}

                    {/* AFTER Column */}
                    {afterWidth > 0.1 && (
                      <div style={{
                        position: 'relative',
                        width: `${afterWidth}%`,
                        height: '100%',
                        borderRadius: 32,
                        overflow: 'hidden',
                        border: '3px solid #10AFCC',
                        backgroundColor: 'transparent',
                        boxSizing: 'border-box'
                      }}>
                        <Img
                          src={lastScan.imageUrl}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            transform: `scale(${after_image_scale}) translate(${after_image_offset_x}px, ${after_image_offset_y}px)`,
                            transformOrigin: 'center center'
                          }}
                          alt="After Scan"
                        />
                        {/* AFTER Badge */}
                        <div style={{
                          position: 'absolute',
                          bottom: 24,
                          left: 24,
                          background: '#10AFCC',
                          padding: '10px 24px',
                          borderRadius: 20,
                          zIndex: 10,
                          boxShadow: '0 4px 12px rgba(16, 175, 204, 0.3)'
                        }}>
                          <span style={{ fontSize: 18, fontWeight: '700', color: '#FFFFFF', letterSpacing: 1.5, textTransform: 'uppercase' }}>
                            AFTER
                          </span>
                        </div>
                        {mask_enabled === 'on' && after_mask_url && (
                          <Img src={after_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none', transform: `scale(${after_image_scale}) translate(${after_image_offset_x}px, ${after_image_offset_y}px)`, transformOrigin: 'center center' }} alt="After Mask" />
                        )}
                      </div>
                    )}
                  </div>
                );
              })() : (
                // CURRENT SLIDER WIPE LAYOUT
                <>
                  <Img
                    src={firstScan.imageUrl}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 960,
                      height: 1100,
                      objectFit: 'cover',
                      transform: `scale(${before_image_scale}) translate(${before_image_offset_x}px, ${before_image_offset_y}px)`,
                      transformOrigin: 'center center'
                    }}
                    alt="Before Scan"
                  />
                  {mask_enabled === 'on' && before_mask_url && (
                    <Img src={before_mask_url} style={{ position: 'absolute', top: 0, left: 0, width: 960, height: 1100, objectFit: 'cover', pointerEvents: 'none', transform: `scale(${before_image_scale}) translate(${before_image_offset_x}px, ${before_image_offset_y}px)`, transformOrigin: 'center center' }} alt="Before Mask" />
                  )}

                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: `${100 - sliderPosition}%`,
                    height: 1100,
                    overflow: 'hidden'
                  }}>
                    <Img
                      src={lastScan.imageUrl}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 960,
                        height: 1100,
                        objectFit: 'cover',
                        maxWidth: 'none',
                        transform: `scale(${after_image_scale}) translate(${after_image_offset_x}px, ${after_image_offset_y}px)`,
                        transformOrigin: 'center center'
                      }}
                      alt="After Scan"
                    />
                    {mask_enabled === 'on' && after_mask_url && (
                      <Img src={after_mask_url} style={{ position: 'absolute', top: 0, right: 0, width: 960, height: 1100, objectFit: 'cover', maxWidth: 'none', pointerEvents: 'none', transform: `scale(${after_image_scale}) translate(${after_image_offset_x}px, ${after_image_offset_y}px)`, transformOrigin: 'center center' }} alt="After Mask" />
                    )}
                  </div>

                  <div style={{
                    position: 'absolute',
                    left: `${sliderPosition}%`,
                    top: 0,
                    bottom: 0,
                    width: 6,
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0 0 16px rgba(0,0,0,0.5)',
                    transform: 'translateX(-50%)',
                    zIndex: 5
                  }} />

                  <div style={{
                    position: 'absolute',
                    left: `${sliderPosition}%`,
                    top: '50%',
                    width: 80,
                    height: 80,
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    transform: 'translate(-50%, -50%)',
                    color: '#10AFCC',
                    fontSize: 34,
                    fontWeight: '900',
                    zIndex: 6
                  }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 17L3 12L8 7" stroke="#10AFCC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M16 7L21 12L16 17" stroke="#10AFCC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="2.5" fill="#10AFCC" />
                    </svg>
                  </div>
                </>
              )}
            </div>

            {/* Footer containing COMPARISON results */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 24,
              justifyContent: 'space-between',
              width: '100%',
              padding: '0 10px',
              boxSizing: 'border-box'
            }}>
              {concernsList.map((concernKey) => {
                const beforeScoreVal = getMetricScore(firstScan.metrics, concernKey);
                const afterScoreVal = getMetricScore(lastScan.metrics, concernKey);
                const scoreDiffVal = afterScoreVal - beforeScoreVal;

                const isScoreDown = scoreDiffVal < 0;
                const isScoreUp = scoreDiffVal > 0;
                const statColor = isScoreDown ? '#FF453A' : isScoreUp ? '#34C759' : '#10AFCC';
                const arrowSymbol = isScoreDown ? '↓' : isScoreUp ? '↑' : '';
                const diffText = scoreDiffVal !== 0 ? `${arrowSymbol}${Math.abs(scoreDiffVal)}` : '0';

                const cardWidth = concernsList.length === 1
                  ? '100%'
                  : concernsList.length === 2
                    ? 'calc(50% - 12px)'
                    : 'calc(33.33% - 16px)';

                return (
                  <div
                    key={concernKey}
                    style={{
                      width: cardWidth,
                      background: '#FFFFFF',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      borderRadius: 36,
                      padding: '40px 48px',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      boxSizing: 'border-box'
                    }}
                  >
                    {/* Dates & Scores Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: '100%', marginBottom: 30 }}>
                      {/* BEFORE column */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: 24, fontWeight: '700', color: '#718096', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
                          {firstScan.date}
                        </span>
                        <span style={{ fontSize: 96, fontWeight: '900', color: '#1A202C', lineHeight: 1 }}>
                          {beforeScoreVal}
                        </span>
                      </div>

                      {/* AFTER column */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontSize: 24, fontWeight: '700', color: '#718096', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>
                          {lastScan.date}
                        </span>
                        <span style={{ fontSize: 96, fontWeight: '900', color: '#1A202C', lineHeight: 1 }}>
                          {afterScoreVal}
                        </span>
                      </div>
                    </div>

                    {/* Centered Arrow Difference */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', borderTop: '2px solid rgba(0, 0, 0, 0.06)', paddingTop: 28 }}>
                      <span style={{ fontSize: 80, fontWeight: '900', color: statColor, textShadow: `0 0 30px ${statColor}40`, display: 'flex', alignItems: 'center', gap: 10 }}>
                        {diffText}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </AbsoluteFill>
        );
      })()}


      {/* ── SCENE 4: THE EFFECTIVENESS CHART (Frames 340 - 481 = 4.7s) ── */}
      {frame >= 500 && frame < 700 && (() => {
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
          beforePoints = beforeScans.map((s, idx) => ({
            day: idx + 1,
            score: s.metrics?.[highlightMetric] || 60
          }));

          duringPoints = afterScans.map((s, idx) => ({
            day: idx + 1,
            score: s.metrics?.[highlightMetric] || 75
          }));
        } else {
          // Fallback to Simulation Mode (Case 1: Only 2 selected scans)
          const getDeterministicNoise = (day, seed) => {
            const x = Math.sin(day * 12.9898 + seed * 78.233) * 43758.5453123;
            return (x - Math.floor(x)) * 2 - 1; // Float between -1.0 and 1.0
          };

          const beforePointsRaw = Array.from({ length: 14 }).map((_, idx) => {
            const day = idx + 1;
            const noise = getDeterministicNoise(day, avBT * 3.1);
            return noise;
          });

          const beforeMean = beforePointsRaw.reduce((sum, v) => sum + v, 0) / 14;
          const beforeNoiseNorm = beforePointsRaw.map(v => v - beforeMean);

          const beforeScores = beforeNoiseNorm.map((noise) => {
            const rawScore = avBT + noise * 6.5;
            return Math.max(5, Math.min(95, Math.round(rawScore)));
          });

          beforePoints = beforeScores.map((score, idx) => ({
            day: idx + 1,
            score
          }));

          const duringPointsRaw = Array.from({ length: 14 }).map((_, idx) => {
            const day = idx + 1;
            const noise = getDeterministicNoise(day, avPT * 5.7);
            return noise;
          });

          const duringMean = duringPointsRaw.reduce((sum, v) => sum + v, 0) / 14;
          const duringNoiseNorm = duringPointsRaw.map(v => v - duringMean);

          const duringScores = duringNoiseNorm.map((noise) => {
            const rawScore = avPT + noise * 7.5;
            return Math.max(5, Math.min(95, Math.round(rawScore)));
          });

          duringPoints = duringScores.map((score, idx) => ({
            day: idx + 1,
            score
          }));
        }

        // SVG Layout Coordinates Mapping
        const svgWidth = 940;
        const svgHeight = 750;

        const marginLeft = 80;
        const marginRight = 40;
        const marginTop = 110;
        const marginBottom = 80;

        const maxDays = Math.max(beforePoints.length, duringPoints.length, 5);

        const getX = (d) => {
          if (maxDays <= 1) return marginLeft + (svgWidth - marginRight - marginLeft) / 2;
          return marginLeft + ((d - 1) / (maxDays - 1)) * (svgWidth - marginRight - marginLeft);
        };

        const getY = (s) => (svgHeight - marginBottom) - (s / 100) * (svgHeight - marginTop - marginBottom);

        const getBeforeLinePath = () => {
          if (beforePoints.length === 0) return '';
          return beforePoints.map((pt, idx) => {
            const dotX = getX(pt.day);
            const dotY = getY(pt.score);
            return `${idx === 0 ? 'M' : 'L'} ${dotX} ${dotY}`;
          }).join(' ');
        };

        const getDuringLinePath = () => {
          if (duringPoints.length === 0) return '';
          return duringPoints.map((pt, idx) => {
            const dotX = getX(pt.day);
            const dotY = getY(pt.score);
            return `${idx === 0 ? 'M' : 'L'} ${dotX} ${dotY}`;
          }).join(' ');
        };

        // Staged transitions for our slowed down chart animation
        const beforeDotsScale = spring({ frame: localFrame - 10, fps, from: 0, to: 1, config: { damping: 12, mass: 0.8 } });
        const beforeLineProgress = interpolate(localFrame, [25, 55], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const stage1TextY = interpolate(localFrame, [12, 30], [750, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const stage1TextOpacity = interpolate(localFrame, [0, 10, 60, 68], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const stage1TextScale = interpolate(localFrame, [12, 30], [0.85, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const stage1ElementsOpacity = interpolate(localFrame, [15, 32], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const duringDotsScale = spring({ frame: localFrame - 80, fps, from: 0, to: 1, config: { damping: 12, mass: 0.8 } });
        const duringLineProgress = interpolate(localFrame, [90, 120], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const stage2TextY = interpolate(localFrame, [78, 95], [750, 60], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const stage2TextOpacity = interpolate(localFrame, [70, 80, 120, 128], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const stage2TextScale = interpolate(localFrame, [78, 95], [0.85, 1.0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        const stage2ElementsOpacity = interpolate(localFrame, [80, 98], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const stage3Opacity = interpolate(localFrame, [130, 150], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

        const renderChartSVG = (
          showBlue,
          showRed,
          showBeforeBanner,
          showDuringBanner,
          showSeparator,
          bLineProgress = 1,
          dLineProgress = 1,
          bDotScale = 1,
          dDotScale = 1,
          showBeforeAvgLine = false,
          showDuringAvgLine = false
        ) => {
          return (
            <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ overflow: 'visible' }}>
              {/* 1. Grid Lines and Left Labels */}
              {Array.from({ length: 11 }).map((_, idx) => {
                const s = idx * 10;
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
                y={marginTop - 45}
                textAnchor="middle"
                fill="#1A202C"
                fontSize={20}
                fontWeight="700"
              >
                Scores
              </text>

              {/* 2. X-Axis Ticks and Day Labels */}
              {Array.from({ length: maxDays }).map((_, idx) => {
                const day = idx + 1;
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
                      fontSize={18}
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
                fontSize={22}
                fontWeight="700"
                letterSpacing={2}
              >
                Test Period (Days)
              </text>

              {/* 3. Base Period Banners at the top */}
              {/* BEFORE TEST Banner */}
              {showBeforeBanner && (
                <g>
                  <rect
                    x={marginLeft}
                    y={15}
                    width={(svgWidth - marginLeft - marginRight) / 2 - 10}
                    height={72}
                    rx={18}
                    fill="rgba(16, 175, 204, 0.08)"
                    stroke="rgba(16, 175, 204, 0.25)"
                    strokeWidth={2}
                  />
                  <text x={marginLeft + (svgWidth - marginLeft - marginRight) / 4 - 5} y={43} textAnchor="middle" fill="#10AFCC" fontSize={17} fontWeight="800" letterSpacing={1.2}>BEFORE TEST</text>
                </g>
              )}

              {/* DURING TEST Banner */}
              {showDuringBanner && (
                <g>
                  <rect
                    x={marginLeft + (svgWidth - marginLeft - marginRight) / 2 + 10}
                    y={15}
                    width={(svgWidth - marginLeft - marginRight) / 2 - 10}
                    height={72}
                    rx={18}
                    fill="rgba(255, 69, 58, 0.08)"
                    stroke="rgba(255, 69, 58, 0.25)"
                    strokeWidth={2}
                  />
                  <text x={svgWidth - marginRight - (svgWidth - marginLeft - marginRight) / 4 + 5} y={43} textAnchor="middle" fill="#FF453A" fontSize={17} fontWeight="800" letterSpacing={1.2}>DURING TEST</text>
                </g>
              )}

              {/* 5. Main Axes lines */}
              <g>
                {/* Y Axis */}
                <line x1={marginLeft} y1={marginTop - 15} x2={marginLeft} y2={svgHeight - marginBottom} stroke="#718096" strokeWidth={3} />
                <path d={`M ${marginLeft - 6} ${marginTop - 5} L ${marginLeft} ${marginTop - 17} L ${marginLeft + 6} ${marginTop - 5}`} stroke="#718096" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />

                {/* X Axis */}
                <line x1={marginLeft} y1={svgHeight - marginBottom} x2={svgWidth - marginRight + 15} y2={svgHeight - marginBottom} stroke="#718096" strokeWidth={3} />
                <path d={`M ${svgWidth - marginRight + 5} ${svgHeight - marginBottom - 6} L ${svgWidth - marginRight + 17} ${svgHeight - marginBottom} L ${svgWidth - marginRight + 5} ${svgHeight - marginBottom + 6}`} stroke="#718096" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>

              {/* 6. BEFORE TEST Data Dots & Path */}
              {showBlue && (
                <>
                  <path
                    d={getBeforeLinePath()}
                    fill="none"
                    stroke="#10AFCC"
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="2000"
                    strokeDashoffset={2000 * (1 - bLineProgress)}
                  />
                </>
              )}

              {/* 7. DURING TEST Data Dots & Path */}
              {showRed && (
                <>
                  <path
                    d={getDuringLinePath()}
                    fill="none"
                    stroke="#FF453A"
                    strokeWidth={5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="2000"
                    strokeDashoffset={2000 * (1 - dLineProgress)}
                  />
                  {duringPoints.map((pt, idx) => {
                    const dotX = getX(pt.day);
                    const dotY = getY(pt.score);
                    return (
                      <circle
                        key={`during-dot-${idx}`}
                        cx={dotX}
                        cy={dotY}
                        r={8}
                        fill="#FF453A"
                        stroke="#FFFFFF"
                        strokeWidth={3.5}
                        style={{
                          transform: `scale(${dDotScale})`,
                          transformOrigin: `${dotX}px ${dotY}px`,
                        }}
                      />
                    );
                  })}
                </>
              )}

              {/* 8. BEFORE Average Reference Line (Dashed) */}
              {showBeforeAvgLine && (
                <g>
                  <line
                    x1={marginLeft}
                    y1={getY(avBT)}
                    x2={svgWidth - marginRight}
                    y2={getY(avBT)}
                    stroke="#10AFCC"
                    strokeWidth={3}
                    strokeDasharray="8 6"
                    opacity={0.8}
                  />
                  <rect
                    x={marginLeft + 15}
                    y={getY(avBT) - 18}
                    width={110}
                    height={36}
                    rx={8}
                    fill="rgba(16, 175, 204, 0.9)"
                  />
                  <text
                    x={marginLeft + 70}
                    y={getY(avBT) + 6}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={14}
                    fontWeight="800"
                  >
                    Avg: {avBT}
                  </text>
                </g>
              )}

              {/* 9. DURING Average Reference Line (Dashed) */}
              {showDuringAvgLine && (
                <g>
                  <line
                    x1={marginLeft}
                    y1={getY(avPT)}
                    x2={svgWidth - marginRight}
                    y2={getY(avPT)}
                    stroke="#FF453A"
                    strokeWidth={3}
                    strokeDasharray="8 6"
                    opacity={0.8}
                  />
                  <rect
                    x={svgWidth - marginRight - 125}
                    y={getY(avPT) - 18}
                    width={110}
                    height={36}
                    rx={8}
                    fill="rgba(255, 69, 58, 0.9)"
                  />
                  <text
                    x={svgWidth - marginRight - 70}
                    y={getY(avPT) + 6}
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize={14}
                    fontWeight="800"
                  >
                    Avg: {avPT}
                  </text>
                </g>
              )}
            </svg>
          );
        };

        return (
          <AbsoluteFill style={{
            transform: `translateY(${chartRiseProgress}px)`,
            backgroundColor: '#ffffff',
            backdropFilter: 'blur(20px)',
            padding: '80px 70px 180px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
          }}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>

              {/* STAGE 1: Oh my skin before using the product */}
              {localFrame < 70 && (
                <>
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: stage1TextY,
                    textAlign: 'center',
                    opacity: stage1TextOpacity,
                    transform: `scale(${stage1TextScale})`,
                    transformOrigin: 'center center',
                    zIndex: 10,
                    padding: '0 40px',
                    boxSizing: 'border-box'
                  }}>
                    <h1 style={{ fontSize: 44, fontWeight: '800', color: '#1A202C', letterSpacing: 1.5, margin: 0, lineHeight: '1.3' }}>
                      My {concernLower} status before I started using {product_name}
                    </h1>
                    <p style={{ fontSize: 26, color: '#718096', marginTop: 16, fontWeight: '600', letterSpacing: 1.2 }}>
                      My average {concernLower} score was {avBT}
                    </p>
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: 455,
                    left: 0,
                    right: 0,
                    height: 750,
                    opacity: stage1ElementsOpacity
                  }}>
                    {renderChartSVG(false, false, true, false, false, beforeLineProgress, 0, beforeDotsScale, 0, true, false)}
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: 80,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: stage1ElementsOpacity,
                    background: '#FFFFFF',
                    border: '1px solid rgba(16, 175, 204, 0.25)',
                    boxShadow: '0 8px 32px rgba(16, 175, 204, 0.08)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: 24,
                    padding: '24px 48px',
                    textAlign: 'center',
                    minWidth: 400
                  }}>
                    <span style={{ fontSize: 20, color: '#718096', fontWeight: '700', letterSpacing: 2, display: 'block', marginBottom: 6 }}>
                      BEFORE AVERAGE SCORE
                    </span>
                    <span style={{ fontSize: 72, fontWeight: '900', color: '#10AFCC', textShadow: '0 0 15px rgba(16, 175, 204, 0.15)' }}>
                      {avBT}
                    </span>
                  </div>
                </>
              )}

              {/* STAGE 2: My skin health after using the product */}
              {localFrame >= 70 && localFrame < 130 && (
                <>
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: stage2TextY,
                    textAlign: 'center',
                    opacity: stage2TextOpacity,
                    transform: `scale(${stage2TextScale})`,
                    transformOrigin: 'center center',
                    zIndex: 10,
                    padding: '0 40px',
                    boxSizing: 'border-box'
                  }}>
                    <h1 style={{ fontSize: 44, fontWeight: '800', color: '#1A202C', letterSpacing: 1.5, margin: 0, lineHeight: '1.3' }}>
                      My {concernLower} score average for the {daysDiff} days of this testing period {avPT >= avBT ? 'increased' : 'decreased'} to {avPT}
                    </h1>
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: 455,
                    left: 0,
                    right: 0,
                    height: 750,
                    opacity: stage2ElementsOpacity
                  }}>
                    {renderChartSVG(false, true, false, true, false, 0, duringLineProgress, 0, duringDotsScale, false, true)}
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: 80,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    opacity: stage2ElementsOpacity,
                    background: '#FFFFFF',
                    border: '1px solid rgba(255, 69, 58, 0.25)',
                    boxShadow: '0 8px 32px rgba(255, 69, 58, 0.08)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: 24,
                    padding: '24px 48px',
                    textAlign: 'center',
                    minWidth: 400
                  }}>
                    <span style={{ fontSize: 20, color: '#718096', fontWeight: '700', letterSpacing: 2, display: 'block', marginBottom: 6 }}>
                      AFTER AVERAGE SCORE
                    </span>
                    <span style={{ fontSize: 72, fontWeight: '900', color: '#FF453A', textShadow: '0 0 15px rgba(255, 69, 58, 0.15)' }}>
                      {avPT}
                    </span>
                  </div>
                </>
              )}

              {/* STAGE 3: Final Combined effectiveness recap review */}
              {localFrame >= 130 && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  opacity: stage3Opacity
                }}>
                  <div>
                    <h1 style={{ fontSize: 48, fontWeight: '800', color: '#1A202C', letterSpacing: 1.5, margin: 0 }}>
                      Effectiveness Review
                    </h1>
                    <p style={{ fontSize: 22, color: '#718096', marginTop: 10, marginBottom: 0 }}>
                      Comparing average scores before and during the product usage period.
                    </p>
                  </div>

                  {/* Feedback Card — positioned ABOVE the chart */}
                  <div style={{
                    background: '#FFFFFF',
                    border: avPT >= avBT
                      ? '2px solid rgba(52, 199, 89, 0.4)'
                      : '2px solid rgba(255, 69, 58, 0.4)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: 24,
                    padding: '30px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 30,
                    marginTop: 45,
                    transform: `translateY(${(1 - stage3Opacity) * 20}px)`,
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}>
                    {/* Status Circle Icon */}
                    <div style={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: avPT >= avBT ? '#34C759' : '#FF453A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: avPT >= avBT ? '0 0 20px rgba(52, 199, 89, 0.4)' : '0 0 20px rgba(255, 69, 58, 0.4)',
                      flexShrink: 0
                    }}>
                      {avPT >= avBT ? (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12L10 17L20 7" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6l12 12" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>

                    {/* Dynamic Text */}
                    <div>
                      {avPT >= avBT ? (
                        <>
                          <h2 style={{ fontSize: 42, fontWeight: '800', color: '#1A202C', margin: '0 0 8px 0' }}>
                            Wow, Amazing Results ✨
                          </h2>
                          <p style={{ fontSize: 34, color: '#718096', margin: 0, fontWeight: '500' }}>
                            Your skin score improved a lot , keep following the routine 🌿
                          </p>
                        </>
                      ) : (
                        <>
                          <h2 style={{ fontSize: 42, fontWeight: '800', color: '#1A202C', margin: '0 0 8px 0' }}>
                            Opps 📉 your skin score went a little down, but don't worry ✨
                          </h2>
                          <p style={{ fontSize: 34, color: '#718096', margin: 0, fontWeight: '500' }}>
                            Looks like it's time to switch the products a bit 🌿
                          </p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Chart — below the feedback card, fills remaining space */}
                  <div style={{ position: 'relative', width: '100%', flex: 1, marginTop: 65 }}>
                    {renderChartSVG(false, true, true, true, false, 1, 1, 1, 1, true, true)}
                  </div>
                </div>
              )}

            </div>
          </AbsoluteFill>
        );
      })()}

      {/* ── SCENE 5: BRAND OUTRO & VERIFICATION (Frames 481 - 541 = 2s) ── */}
      {frame >= 700 && (
        <AbsoluteFill style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          opacity: outroOpacity,
          transform: `scale(${outroScale})`
        }}>
          <div style={{ marginBottom: 50 }}>
            <AppLogo size={280} />
          </div>
          <h2 style={{ fontSize: 28, letterSpacing: 5, color: '#718096', fontWeight: '600' }}>
            VERIFIED BY
          </h2>
          <h1 style={{ fontSize: 68, fontWeight: '900', letterSpacing: 8, color: '#1A202C', marginTop: 15 }}>
            MAGIC MIRROR
          </h1>
          <p style={{ fontSize: 24, color: '#10AFCC', letterSpacing: 2, marginTop: 70, fontWeight: '600' }}>
            OWN YOUR SKIN HEALTH
          </p>
        </AbsoluteFill>
      )}

    </AbsoluteFill>
  );
};
