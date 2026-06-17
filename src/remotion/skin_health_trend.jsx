import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Img,
} from 'remotion';
import React from 'react';
import mmLogo from './MM logo.jpg';

// ─── SHARED COMPONENTS (mirrored from ProgressVideo) ────────────────────────

const AppLogo = ({ size = 120 }) => (
  <svg width={size} height={size} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="appLogoShadow2" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="10" floodOpacity="0.15" />
      </filter>
    </defs>
    <circle cx="150" cy="150" r="115" fill="white" filter="url(#appLogoShadow2)" />
    <circle cx="150" cy="130" r="55" fill="none" stroke="#10AFCC" strokeWidth="8" />
    <path d="M 80 130 A 70 70 0 0 0 220 130" fill="none" stroke="#10AFCC" strokeWidth="8" strokeLinecap="round" />
    <path d="M 95 130 A 55 55 0 0 0 205 130" fill="none" stroke="#10AFCC" strokeWidth="5" strokeLinecap="round" />
    <line x1="80" y1="130" x2="95" y2="130" stroke="#10AFCC" strokeWidth="8" strokeLinecap="round" />
    <line x1="205" y1="130" x2="220" y2="130" stroke="#10AFCC" strokeWidth="8" strokeLinecap="round" />
    <line x1="150" y1="200" x2="150" y2="235" stroke="#10AFCC" strokeWidth="8" strokeLinecap="round" />
    <rect x="142" y="235" width="16" height="35" rx="8" fill="#10AFCC" />
  </svg>
);

const Watermark = ({ opacity = 1 }) => (
  <div style={{
    position: 'absolute',
    bottom: 30,
    left: 30,
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    pointerEvents: 'none',
    opacity,
  }}>
    <div style={{
      width: 100,
      height: 100,
      borderRadius: '50%',
      backgroundColor: '#FFFFFF',
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <Img src={mmLogo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Magic Mirror Logo" />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <span style={{ fontSize: 34, lineHeight: 1.0, fontWeight: 800, color: '#1A202C', fontFamily: 'Montserrat, sans-serif' }}>
        MAGIC
      </span>
      <span style={{ fontSize: 34, lineHeight: 1.0, fontWeight: 800, color: '#10AFCC', fontFamily: 'Montserrat, sans-serif' }}>
        MIRROR
      </span>
    </div>
  </div>
);

const BG = '#ffffff';

// ─── SCENE 1: PRODUCT INFO ───────────────────────────────────────────────────
// Frames 0 – 179 (6 s @ 30 fps)
const SceneProductInfo = ({
  product_name = '',
  brand_name = '',
  creator_name = '',
  concerns = [],
  product_image_url = '',
  product_start_date = '',
  before_timeperiod = '',
  after_timeperiod = '',
  fps,
}) => {
  const frame = useCurrentFrame();
  const logoScale = spring({ frame, fps, from: 0, to: 1, config: { damping: 10, mass: 0.9, stiffness: 100 } });

  const line1Opacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line1Y      = interpolate(frame, [10, 30], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Opacity = interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Y      = interpolate(frame, [25, 45], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line3Opacity = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line3Y      = interpolate(frame, [40, 60], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const panelOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const panelY      = interpolate(frame, [55, 80], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const sceneOpacity = interpolate(frame, [155, 179], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const testerName = creator_name || '';

  // Format product_start_date for display
  let startDateDisplay = '';
  if (product_start_date) {
    try {
      const d = new Date(product_start_date);
      startDateDisplay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (_) {
      startDateDisplay = product_start_date;
    }
  }

  // Prefer before_timeperiod/after_timeperiod over product_start_date
  const hasPeriodRange = before_timeperiod || after_timeperiod;

  return (
    <AbsoluteFill style={{
      background: BG,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      padding: '220px 80px 220px',
      boxSizing: 'border-box',
      opacity: sceneOpacity,
    }}>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap');` }} />

      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        width: 1400,
        height: 1400,
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) scale(${interpolate(frame, [0, 179], [1, 1.15])})`,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,175,204,0.10) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* TOP TEXT */}
      <div style={{ zIndex: 1, textAlign: 'center' }}>
        <span style={{
          fontSize: 50, fontWeight: 900, color: '#4A5568', letterSpacing: 6,
          fontStyle: 'italic', display: 'block', marginBottom: 32,
          opacity: line1Opacity, transform: `translateY(${line1Y}px)`,
        }}>
          EFFICACY TESTING WITH MAGIC MIRROR
        </span>

        <h1 style={{
          fontSize: 48, fontWeight: 600, color: '#10AFCC', letterSpacing: 2,
          margin: '0 0 28px 0', fontStyle: 'italic', lineHeight: 1.05,
          opacity: line2Opacity, transform: `translateY(${line2Y}px)`,
        }}>
          {product_name.toUpperCase()}
        </h1>

        {brand_name ? (
          <h2 style={{
            fontSize: 48, fontWeight: 800, color: '#10AFCC', fontStyle: 'italic',
            margin: 0, letterSpacing: 3,
            opacity: line3Opacity, transform: `translateY(${line3Y}px)`,
          }}>
            by {brand_name.toUpperCase()}
          </h2>
        ) : null}
      </div>

      {/* MIDDLE LOGO */}
      <div style={{ zIndex: 1, flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', transform: `scale(${logoScale})` }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid rgba(0,0,0,0.06)',
          padding: '80px 55px 55px 55px',
          borderRadius: 56,
          boxShadow: '0 20px 50px rgba(16,175,204,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 420,
          height: 420,
          boxSizing: 'border-box',
        }}>
          {product_image_url ? (
            <Img src={product_image_url} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt="Product" />
          ) : (
            <AppLogo size={320} />
          )}
        </div>
      </div>

      {/* BOTTOM INFO PANEL */}
      <div style={{
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        marginTop: -80,
        opacity: panelOpacity,
        transform: `translateY(${panelY}px)`,
      }}>
        {/* TESTING FOR */}
        <div style={{
          background: '#FFFFFF',
          border: '1px solid rgba(0,0,0,0.05)',
          borderRadius: 24,
          padding: '28px 40px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 40,
          boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
        }}>
          <span style={{ fontSize: 25, fontWeight: 700, color: '#718096', letterSpacing: 3, flexShrink: 0, width: 220 }}>
            TESTING FOR
          </span>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10px 36px', alignItems: 'center' }}>
            {(concerns.length > 0 ? concerns : ['—']).map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#00A2C1', flexShrink: 0 }} />
                <span style={{ fontSize: 35, color: '#1A202C', fontWeight: 500 }}>
                  {c.charAt(0).toUpperCase() + c.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* TESTING PERIOD — prefer before/after timeperiod range; fallback to start date */}
        {(hasPeriodRange || startDateDisplay) ? (
          <div style={{
            background: '#FFFFFF',
            border: '1px solid rgba(0,0,0,0.05)',
            borderRadius: 24,
            padding: '28px 40px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 40,
            boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
          }}>
            <span style={{ fontSize: 25, fontWeight: 700, color: '#718096', letterSpacing: 3, flexShrink: 0, width: 220 }}>
              TESTING PERIOD
            </span>
            {hasPeriodRange ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                {before_timeperiod ? (
                  <span style={{ fontSize: 28, color: '#1A202C', fontWeight: 600 }}>{before_timeperiod}</span>
                ) : null}
                {before_timeperiod && after_timeperiod ? (
                  <span style={{ fontSize: 26, color: '#718096', fontWeight: 400 }}>→</span>
                ) : null}
                {after_timeperiod ? (
                  <span style={{ fontSize: 28, color: '#10AFCC', fontWeight: 700 }}>{after_timeperiod}</span>
                ) : null}
              </div>
            ) : (
              <span style={{ fontSize: 28, color: '#1A202C', fontWeight: 600 }}>{startDateDisplay}</span>
            )}
          </div>
        ) : null}

        {/* TESTED BY */}
        {testerName ? (
          <div style={{
            background: '#FFFFFF',
            border: '1px solid rgba(0,0,0,0.05)',
            borderRadius: 24,
            padding: '28px 40px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 40,
            boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
          }}>
            <span style={{ fontSize: 25, fontWeight: 700, color: '#718096', letterSpacing: 3, flexShrink: 0, width: 220 }}>
              TESTED BY
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <svg width="68" height="68" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                <circle cx="40" cy="40" r="37" stroke="#00A2C1" strokeWidth="4.5" />
                <circle cx="40" cy="31" r="11" stroke="#00A2C1" strokeWidth="3.5" />
                <path d="M16 65c0-13.255 10.745-24 24-24s24 10.745 24 24" stroke="#00A2C1" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
              <div style={{ width: 2, height: 60, backgroundColor: 'rgba(0,0,0,0.1)', margin: '0 28px', flexShrink: 0 }} />
              <span style={{ fontSize: 34, color: '#1A202C', fontWeight: 700 }}>
                {testerName.startsWith('@') ? testerName : `@${testerName}`}
              </span>
            </div>
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 2: LINE CHART & PROGRESS ──────────────────────────────────────────
// Frames 180 – 539 (12 s @ 30 fps)
const SceneChart = ({
  before_avg = {},
  after_avg = {},
  concerns = [],
  product_name = '',
  before_timeperiod = '',
  after_timeperiod = '',
  fps,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - 180;

  // Pick the primary concern
  const primaryConcern = concerns.length > 0 ? concerns[0].toLowerCase() : Object.keys(before_avg)[0] || 'redness';
  const concernLabel = primaryConcern.charAt(0).toUpperCase() + primaryConcern.slice(1);

  const avBT = before_avg[primaryConcern] ?? before_avg[Object.keys(before_avg)[0]] ?? 34.2;
  const avPT = after_avg[primaryConcern] ?? after_avg[Object.keys(after_avg)[0]] ?? 56.8;

  // Format: show 1 decimal only when value is not a whole number
  const fmtScore = (v) => Number.isInteger(v) ? String(v) : v.toFixed(1);
  const formatDelta = (val) => {
    const absVal = Math.abs(val);
    const formatted = Number.isInteger(absVal) ? String(absVal) : absVal.toFixed(1);
    return val > 0 ? `+${formatted}` : val < 0 ? `−${formatted}` : `0`;
  };

  const isImproved = avPT >= avBT;
  const diffVal = avPT - avBT;

  // Parse before/after timeperiod to calculate nDays
  const parsePeriodDate = (dateStr) => {
    if (!dateStr) return null;
    const parsed = Date.parse(dateStr);
    if (!isNaN(parsed)) {
      return new Date(parsed);
    }
    return null;
  };

  const startD = parsePeriodDate(before_timeperiod);
  const endD = parsePeriodDate(after_timeperiod);
  const nDays = (startD && endD)
    ? Math.max(1, Math.round((endD - startD) / (1000 * 60 * 60 * 24)))
    : 30; // fallback to 30 days

  // Deterministic point simulation logic matching ProgressVideo fallback
  const getDeterministicNoise = (day, seed) => {
    const x = Math.sin(day * 12.9898 + seed * 78.233) * 43758.5453123;
    return (x - Math.floor(x)) * 2 - 1; // Float between -1.0 and 1.0
  };

  const numBefore = 6;
  const numAfter = 7;
  const midDay = Math.floor(nDays / 2);

  let beforePoints = Array.from({ length: numBefore }).map((_, idx) => {
    const fraction = idx / (numBefore - 1 || 1);
    const day = Math.max(1, Math.round(1 + fraction * (midDay - 1)));
    const noise = getDeterministicNoise(day, avBT * 3.1);
    const rawScore = avBT + noise * 5.0;
    return {
      day,
      score: Math.max(5, Math.min(95, Math.round(rawScore * 10) / 10))
    };
  });

  let duringPoints = Array.from({ length: numAfter }).map((_, idx) => {
    const fraction = idx / (numAfter - 1 || 1);
    const day = Math.min(nDays, Math.round((midDay + 1) + fraction * (nDays - midDay - 1)));
    const noise = getDeterministicNoise(day, avPT * 5.7);
    const rawScore = avPT + noise * 6.0;
    return {
      day,
      score: Math.max(5, Math.min(95, Math.round(rawScore * 10) / 10))
    };
  });

  const totalPointsCount = beforePoints.length + duringPoints.length;
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

  const allScoresList = allPoints.map(p => p.score);
  const minScoreVal = Math.max(0, Math.min(...allScoresList, avBT, avPT) - 8);
  const maxScoreVal = Math.min(100, Math.max(...allScoresList, avBT, avPT) + 8);
  const scoreRangeVal = maxScoreVal - minScoreVal;

  const stepSize = scoreRangeVal <= 25 ? 5 : 10;
  const minGridValue = Math.ceil(minScoreVal / stepSize) * stepSize;
  const maxGridValue = Math.floor(maxScoreVal / stepSize) * stepSize;
  const gridSteps = [];
  for (let s = minGridValue; s <= maxGridValue; s += stepSize) {
    gridSteps.push(s);
  }

  // SVG coordinates and sizes (Expanded for full-screen layout)
  const svgWidth = 940;
  const svgHeight = 600;

  const marginLeft = 80;
  const marginRight = 40;
  const marginTop = 50;
  const marginBottom = 100;

  const getX = (d) => {
    if (nDays <= 1) return marginLeft + (svgWidth - marginRight - marginLeft) / 2;
    return marginLeft + ((d - 1) / (nDays - 1)) * (svgWidth - marginRight - marginLeft);
  };

  const getY = (s) => {
    const pct = (s - minScoreVal) / scoreRangeVal;
    return (svgHeight - marginBottom) - pct * (svgHeight - marginTop - marginBottom);
  };

  // ── Timings & animations scaled for 360-frame scene ──
  const chartRiseProgress = spring({ frame: localFrame, fps, from: 1200, to: 0, config: { damping: 16, mass: 1.1 } });

  const beforeLineOpacity = interpolate(localFrame, [10, 45], [0, 0.8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const afterLineProgress = interpolate(localFrame, [160, 240], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const afterLineOpacity = interpolate(localFrame, [160, 175], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const afterLineX2 = getX(1) + afterLineProgress * (getX(nDays) - getX(1));

  const fillOpacity = interpolate(localFrame, [240, 280], [0, 0.20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const pillOpacity = interpolate(localFrame, [260, 280], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const textOpacity = interpolate(localFrame, [280, 300], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const progress = interpolate(localFrame, [260, 310], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const easedProgress = Math.sin((progress * Math.PI) / 2);
  const currentDiff = easedProgress * diffVal;
  const diffText = formatDelta(currentDiff);

  const deltaColor = isImproved ? '#1D9E75' : '#D24B76';
  const afterColor = isImproved ? '#1D9E75' : '#D24B76';
  const deltaLabel = isImproved ? 'Point Improvement' : 'Point Decline';

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
                y={lineY + 8}
                textAnchor="end"
                fill="#718096"
                fontSize={26}
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
          y={marginTop - 25}
          textAnchor="middle"
          fill="#1A202C"
          fontSize={24}
          fontWeight="700"
        >
          Scores
        </text>

        {/* 2. X-Axis Ticks and Day Labels */}
        {(() => {
          const maxDaysVal = nDays;
          return Array.from({ length: maxDaysVal }).map((_, idx) => {
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
                  y2={tickY + 12}
                  stroke="#718096"
                  strokeWidth={3}
                />
                <text
                  x={tickX}
                  y={tickY + 44}
                  textAnchor="middle"
                  fill="#718096"
                  fontSize={22}
                  fontWeight="600"
                >
                  Day {day}
                </text>
              </g>
            );
          });
        })()}

        {/* X-Axis Title */}
        <text
          x={(marginLeft + svgWidth - marginRight) / 2}
          y={svgHeight - 15}
          textAnchor="middle"
          fill="#718096"
          fontSize={24}
          fontWeight="700"
          letterSpacing={1}
        >
          Test period (days)
        </text>

        {/* 3. Main Axes lines (Thicker axes) */}
        <g>
          {/* Y Axis */}
          <line x1={marginLeft} y1={marginTop - 10} x2={marginLeft} y2={svgHeight - marginBottom} stroke="#718096" strokeWidth={5} />
          <path d={`M ${marginLeft - 8} ${marginTop + 2} L ${marginLeft} ${marginTop - 15} L ${marginLeft + 8} ${marginTop + 2}`} stroke="#718096" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* X Axis */}
          <line x1={marginLeft} y1={svgHeight - marginBottom} x2={svgWidth - marginRight + 15} y2={svgHeight - marginBottom} stroke="#718096" strokeWidth={5} />
          <path d={`M ${svgWidth - marginRight + 5} ${svgHeight - marginBottom - 8} L ${svgWidth - marginRight + 18} ${svgHeight - marginBottom} L ${svgWidth - marginRight + 5} ${svgHeight - marginBottom + 8}`} stroke="#718096" strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* 4. Gap Fill (floods in during Beat 4) */}
        {fillOpacity > 0.001 && (
          <rect
            x={getX(1)}
            y={Math.min(getY(avBT), getY(avPT))}
            width={getX(nDays) - getX(1)}
            height={Math.abs(getY(avBT) - getY(avPT))}
            fill={afterColor}
            opacity={fillOpacity}
          />
        )}

        {/* 5. BEFORE Average Reference Line (Thick, Dashed, gray) */}
        <line
          x1={getX(1)}
          y1={getY(avBT)}
          x2={getX(nDays)}
          y2={getY(avBT)}
          stroke="#888780"
          strokeWidth={6}
          strokeDasharray="10 8"
          opacity={beforeLineOpacity}
        />

        {/* 6. Dynamic Daily Data Score Dots */}
        {allPoints.map((pt, idx) => {
          const dotX = getX(pt.day);
          const dotY = getY(pt.score);

          let startFrame;
          if (pt.period === 'before') {
            startFrame = 40 + (pt.indexInPeriod / Math.max(1, beforePoints.length)) * 80;
          } else {
            startFrame = 160 + (pt.indexInPeriod / Math.max(1, duringPoints.length)) * 80;
          }
          const dotScale = interpolate(localFrame, [startFrame, startFrame + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

          if (dotScale <= 0.001) return null;

          return (
            <circle
              key={`dot-${idx}`}
              cx={dotX}
              cy={dotY}
              r={9.5}
              fill={pt.period === 'before' ? '#888780' : afterColor}
              stroke="#FFFFFF"
              strokeWidth={2.5}
              style={{
                transform: `scale(${dotScale})`,
                transformOrigin: `${dotX}px ${dotY}px`,
                opacity: interpolate(localFrame, [240, 260], [1, 0.45], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
              }}
            />
          );
        })}

        {/* 7. AFTER Average Reference Line (Thick, Solid, green/pink) */}
        {afterLineOpacity > 0.001 && (
          <line
            x1={getX(1)}
            y1={getY(avPT)}
            x2={afterLineX2}
            y2={getY(avPT)}
            stroke={afterColor}
            strokeWidth={8}
            opacity={afterLineOpacity}
          />
        )}
      </svg>
    );
  };

  return (
    <AbsoluteFill style={{
      background: BG,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: '140px 80px 100px',
      boxSizing: 'border-box',
      transform: `translateY(${chartRiseProgress}px)`,
    }}>
      {/* Header with category label and larger test result title */}
      <div style={{ width: '100%', marginBottom: 40, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{
          fontSize: 22,
          fontWeight: '700',
          color: '#718096',
          letterSpacing: 4,
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: 6,
          fontFamily: 'Montserrat, sans-serif'
        }}>
          {concernLabel.toUpperCase()} EFFECTIVENESS
        </span>
        <h1 style={{
          fontSize: 48,
          fontWeight: '900',
          color: '#1A202C',
          margin: 0,
          lineHeight: 1.1,
          fontFamily: 'Montserrat, sans-serif'
        }}>
          {nDays}-Day Test Results
        </h1>
      </div>

      {/* Card 1: SVG Line Chart Container */}
      <div style={{
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 32,
        border: '2px solid rgba(0,0,0,0.04)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
        padding: '30px 24px 20px 24px',
        boxSizing: 'border-box',
        height: 680,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div style={{ width: '100%', height: 600 }}>
          {renderChartSVG()}
        </div>
      </div>

      {/* Card 2: Stats Container (Average Cards & Centered Result Area) */}
      <div style={{
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 32,
        border: '2px solid rgba(0,0,0,0.04)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
        padding: '50px 50px 40px 50px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 40,
        height: 520,
        justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          {/* Average Before Card (Independent rounded card background) */}
          <div style={{
            width: 'calc(50% - 15px)',
            height: 220,
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
            opacity: interpolate(localFrame, [40, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(localFrame, [40, 60], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
          }}>
            <div style={{ width: 80, height: 6, borderRadius: 20, backgroundColor: '#888780', marginBottom: 16 }} />
            <span style={{ fontSize: 26, fontWeight: '600', color: '#2f3b4a', fontFamily: 'Montserrat, sans-serif', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
              Average Before
            </span>
            <span style={{ fontSize: 72, fontWeight: '800', color: '#888780', fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>
              {fmtScore(avBT)}
            </span>
          </div>

          {/* Average After Card (Independent rounded card background) */}
          <div style={{
            width: 'calc(50% - 15px)',
            height: 220,
            backgroundColor: isImproved ? '#eef8f6' : '#fdf2f4',
            borderRadius: 24,
            padding: '20px 15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: isImproved ? '0 4px 12px rgba(29, 158, 117, 0.03)' : '0 4px 12px rgba(210, 75, 118, 0.03)',
            border: isImproved ? '1px solid rgba(29, 158, 117, 0.08)' : '1px solid rgba(210, 75, 118, 0.08)',
            boxSizing: 'border-box',
            opacity: interpolate(localFrame, [160, 180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
            transform: `translateY(${interpolate(localFrame, [160, 180], [15, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
          }}>
            <div style={{ width: 80, height: 6, borderRadius: 20, backgroundColor: afterColor, marginBottom: 16 }} />
            <span style={{ fontSize: 26, fontWeight: '600', color: '#2f3b4a', fontFamily: 'Montserrat, sans-serif', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1 }}>
              Average After
            </span>
            <span style={{ fontSize: 72, fontWeight: '800', color: afterColor, fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>
              {fmtScore(avPT)}
            </span>
          </div>
        </div>

        <div style={{
          width: '100%',
          height: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.05)',
          margin: '20px 0',
        }} />

        {/* Centered Delta Change Result Area */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          opacity: pillOpacity,
          transform: `scale(${interpolate(localFrame, [260, 280], [0.85, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
        }}>
          <span style={{ fontSize: 110, fontWeight: '800', color: deltaColor, fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>
            {diffText}
          </span>
          <span style={{ fontSize: 26, fontWeight: '800', color: deltaColor, fontFamily: 'Montserrat, sans-serif', letterSpacing: 2, marginTop: 8, textTransform: 'uppercase' }}>
            {deltaLabel}
          </span>
        </div>
      </div>

      {/* Summary Text Descriptive Paragraph & Disclaimer */}
      <div style={{
        marginTop: 50,
        opacity: textOpacity,
        transform: `translateY(${interpolate(localFrame, [280, 300], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
        textAlign: 'left',
        width: '100%',
        boxSizing: 'border-box',
        padding: '0 10px',
      }}>
        {isImproved ? (
          <p style={{
            fontSize: 34,
            fontWeight: '700',
            color: '#1A202C',
            lineHeight: '1.4',
            margin: '0 0 16px 0'
          }}>
            After testing {product_name}, my {concernLabel} score improved by{' '}
            <span style={{ color: deltaColor }}>{formatDelta(diffVal)}</span> — from {fmtScore(avBT)} to {fmtScore(avPT)}.
          </p>
        ) : (
          <p style={{
            fontSize: 34,
            fontWeight: '700',
            color: '#1A202C',
            lineHeight: '1.4',
            margin: '0 0 16px 0'
          }}>
            After testing {product_name}, my {concernLabel} score changed by{' '}
            <span style={{ color: deltaColor }}>{formatDelta(diffVal)} points</span> — from {fmtScore(avBT)} to {fmtScore(avPT)}.
          </p>
        )}
        <p style={{
          fontSize: 26,
          color: '#A0AEC0',
          fontWeight: '500',
          lineHeight: '1.3',
          margin: 0
        }}>
          Results reflect my personal experience. Individual outcomes may vary based on skin condition and lifestyle.
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 3: BEST vs WORST side by side ─────────────────────────────────────
// Frames 540 – 839 (10 s @ 30 fps)
const SceneSideBySide = ({
  best_image_url = '',
  best_image_score = 0,
  worst_image_url = '',
  worst_image_score = 0,
  concerns = [],
  before_timeperiod = '',
  after_timeperiod = '',
  mask_enabled = 'off',
  best_mask_url = null,
  worst_mask_url = null,
  fps,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - 540;

  // Format scores — show 1 decimal only when not a whole number
  const fmtScore = (v) => Number.isInteger(Number(v)) ? String(Math.round(v)) : Number(v).toFixed(1);

  const primaryConcern = concerns.length > 0 ? concerns[0] : 'skin';
  const concernLabel = primaryConcern.charAt(0).toUpperCase() + primaryConcern.slice(1);

  const headerOpacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const headerY = interpolate(localFrame, [0, 20], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const leftCardScale = spring({ frame: localFrame - 10, fps, from: 0.85, to: 1, config: { damping: 14 } });
  const rightCardScale = spring({ frame: localFrame - 30, fps, from: 0.85, to: 1, config: { damping: 14 } });
  const leftOpacity = interpolate(localFrame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const rightOpacity = interpolate(localFrame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const scoreOpacity = interpolate(localFrame, [80, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: BG, overflow: 'hidden' }}>
      {/* Header */}
      <div style={{
        position: 'absolute',
        top: 120,
        left: '50%',
        transform: `translateX(-50%) translateY(${headerY}px)`,
        opacity: headerOpacity,
        zIndex: 20,
        textAlign: 'center',
        pointerEvents: 'none',
        width: 900,
      }}>
        <span style={{
          fontSize: 46, fontWeight: 800, color: '#10AFCC', letterSpacing: 3,
          textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif',
        }}>
          {concernLabel} — Scan Highlights
        </span>
      </div>

      {/* Side by side photo area */}
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
        {/* WORST (Before) Column */}
        <div style={{
          width: 'calc(50% - 12px)',
          height: '100%',
          border: '3px solid rgba(0,0,0,0.20)',
          borderRadius: 32,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px 20px',
          boxSizing: 'border-box',
          opacity: leftOpacity,
          transform: `scale(${leftCardScale})`,
        }}>
          <div style={{
            width: '100%',
            height: 680,
            borderRadius: 24,
            overflow: 'hidden',
            position: 'relative',
          }}>
            {worst_image_url ? (
              <Img src={worst_image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Worst Scan" />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#718096', fontSize: 28 }}>No Image</span>
              </div>
            )}
            {mask_enabled === 'on' && worst_mask_url && (
              <Img
                src={worst_mask_url}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                }}
                alt="Worst Mask"
              />
            )}
          </div>
          {/* WORST badge */}
          <div style={{
            marginTop: 40,
            backgroundColor: 'rgba(0,0,0,0.35)',
            borderRadius: 16,
            padding: '10px 30px',
            display: 'inline-block',
          }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', letterSpacing: 1, fontFamily: 'Montserrat, sans-serif' }}>
              LOWEST SCAN
            </span>
          </div>
        </div>

        {/* BEST (After) Column */}
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
          opacity: rightOpacity,
          transform: `scale(${rightCardScale})`,
        }}>
          <div style={{
            width: '100%',
            height: 680,
            borderRadius: 24,
            overflow: 'hidden',
            position: 'relative',
          }}>
            {best_image_url ? (
              <Img src={best_image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Best Scan" />
            ) : (
              <div style={{ width: '100%', height: '100%', backgroundColor: '#e6f7fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#10AFCC', fontSize: 28 }}>No Image</span>
              </div>
            )}
            {mask_enabled === 'on' && best_mask_url && (
              <Img
                src={best_mask_url}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  pointerEvents: 'none',
                }}
                alt="Best Mask"
              />
            )}
          </div>
          {/* BEST badge */}
          <div style={{
            marginTop: 40,
            backgroundColor: '#10AFCC',
            borderRadius: 16,
            padding: '10px 30px',
            display: 'inline-block',
          }}>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', letterSpacing: 1, fontFamily: 'Montserrat, sans-serif' }}>
              BEST SCAN
            </span>
          </div>
        </div>
      </div>

      {/* Worst Score + date - below left column */}
      <div style={{
        position: 'absolute',
        bottom: 180,
        left: 310,
        transform: 'translateX(-50%)',
        zIndex: 20,
        textAlign: 'center',
        opacity: scoreOpacity,
        pointerEvents: 'none',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 22, fontWeight: 600, color: '#718096', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', letterSpacing: 2 }}>
            Score
          </span>
          <span style={{ fontSize: 84, fontWeight: 800, color: '#888780', fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>
            {fmtScore(worst_image_score)}
          </span>
          {before_timeperiod ? (
            <span style={{ fontSize: 22, fontWeight: 600, color: '#A0AEC0', fontFamily: 'Montserrat, sans-serif', letterSpacing: 1, marginTop: 6 }}>
              {before_timeperiod}
            </span>
          ) : null}
        </div>
      </div>

      {/* Best Score + date - below right column */}
      <div style={{
        position: 'absolute',
        bottom: 180,
        right: 310,
        transform: 'translateX(50%)',
        zIndex: 20,
        textAlign: 'center',
        opacity: scoreOpacity,
        pointerEvents: 'none',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 22, fontWeight: 600, color: '#10AFCC', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', letterSpacing: 2 }}>
            Score
          </span>
          <span style={{ fontSize: 84, fontWeight: 800, color: '#1D9E75', fontFamily: 'Montserrat, sans-serif', lineHeight: 1 }}>
            {fmtScore(best_image_score)}
          </span>
          {after_timeperiod ? (
            <span style={{ fontSize: 22, fontWeight: 600, color: '#10AFCC', fontFamily: 'Montserrat, sans-serif', letterSpacing: 1, marginTop: 6 }}>
              {after_timeperiod}
            </span>
          ) : null}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── SCENE 4: LOGO OUTRO ─────────────────────────────────────────────────────
// Frames 840 – 959
const SceneOutro = ({ fps }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - 840;

  const outroScale = spring({ frame: localFrame, fps, from: 0.6, to: 1, config: { damping: 10 } });
  const outroOpacity = interpolate(frame, [840, 870], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{
      justifyContent: 'center',
      alignItems: 'center',
      background: BG,
      opacity: outroOpacity,
      transform: `scale(${outroScale})`,
    }}>
      <div style={{ marginBottom: 50 }}>
        <Img src={mmLogo} style={{ width: 360, height: 360, objectFit: 'contain' }} />
      </div>
      <h2 style={{ fontSize: 28, letterSpacing: 5, color: '#718096', fontWeight: 600 }}>
        VERIFIED BY
      </h2>
      <h1 style={{ fontSize: 68, fontWeight: 900, letterSpacing: 8, color: '#1A202C', marginTop: 15 }}>
        MAGIC MIRROR
      </h1>
      <p style={{ fontSize: 34, color: '#10AFCC', letterSpacing: 2, marginTop: 70, fontWeight: 600 }}>
        OWN YOUR SKIN HEALTH
      </p>
    </AbsoluteFill>
  );
};

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

export const SkinHealthTrendVideo = ({
  product_name = 'Nivyaa',
  brand_name = 'Nivya',
  creator_name = '',
  concerns = [],
  product_start_date = '',
  product_image_url = '',
  platform = 'reels',
  style = 'side_by_side',
  mask_enabled = 'off',
  before_avg = {},
  after_avg = {},
  best_image_url = '',
  best_image_score = 0,
  worst_image_url = '',
  worst_image_score = 0,
  before_timeperiod = '',
  after_timeperiod = '',
  best_mask_url = null,
  worst_mask_url = null,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const introFadeIn = interpolate(frame, [0, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // Scene boundaries:
  // Scene 1: Product Info    — frames   0 – 179  (6 s)
  // Scene 2: Chart           — frames 180 – 539  (12 s)
  // Scene 3: Side by Side    — frames 540 – 839  (10 s)
  // Scene 4: Outro           — frames 840 – 959  (4 s)
  // Total = 960 frames = 32 s

  return (
    <AbsoluteFill style={{
      background: BG,
      color: '#1A202C',
      fontFamily: 'Inter, sans-serif',
      opacity: introFadeIn,
    }}>
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap');` }} />

      {/* ── SCENE 1: PRODUCT INFO ── */}
      {frame < 180 && (
        <SceneProductInfo
          product_name={product_name}
          brand_name={brand_name}
          creator_name={creator_name}
          concerns={concerns}
          product_image_url={product_image_url}
          product_start_date={product_start_date}
          before_timeperiod={before_timeperiod}
          after_timeperiod={after_timeperiod}
          fps={fps}
        />
      )}

      {/* ── SCENE 2: CHART ── */}
      {frame >= 180 && frame < 540 && (
        <SceneChart
          before_avg={before_avg}
          after_avg={after_avg}
          concerns={concerns}
          product_name={product_name}
          before_timeperiod={before_timeperiod}
          after_timeperiod={after_timeperiod}
          fps={fps}
        />
      )}

      {/* ── SCENE 3: BEST vs WORST ── */}
      {frame >= 540 && frame < 840 && (
        <SceneSideBySide
          best_image_url={best_image_url}
          best_image_score={best_image_score}
          worst_image_url={worst_image_url}
          worst_image_score={worst_image_score}
          concerns={concerns}
          before_timeperiod={before_timeperiod}
          after_timeperiod={after_timeperiod}
          mask_enabled={mask_enabled}
          best_mask_url={best_mask_url}
          worst_mask_url={worst_mask_url}
          fps={fps}
        />
      )}

      {/* ── SCENE 4: OUTRO ── */}
      {frame >= 840 && (
        <SceneOutro fps={fps} />
      )}

      {/* ── WATERMARK (all screens except last) ── */}
      {frame < 855 && (() => {
        const watermarkOpacity = interpolate(frame, [840, 855], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        return <Watermark opacity={watermarkOpacity} />;
      })()}
    </AbsoluteFill>
  );
};
