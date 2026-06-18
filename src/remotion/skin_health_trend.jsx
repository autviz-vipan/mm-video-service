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
            <Img src={mmLogo} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.6)' }} alt="Magic Mirror Logo" />
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

const BG = '#FFF0F2';

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
    const sceneOpacity = interpolate(frame, [155, 179], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const line1Opacity = interpolate(frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const line1Y = interpolate(frame, [10, 30], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const line2Opacity = interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const line2Y = interpolate(frame, [25, 45], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const panelOpacity = interpolate(frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const panelY = interpolate(frame, [55, 80], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const testerName = creator_name ? (creator_name.startsWith('@') ? creator_name : `@${creator_name}`) : '@Anamika';

    let startDateDisplay = '';
    if (product_start_date) {
        try {
            const d = new Date(product_start_date);
            startDateDisplay = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        } catch (_) {
            startDateDisplay = product_start_date;
        }
    }

    const getInitials = (brand, product) => {
        if (brand) {
            const parts = brand.trim().split(/\s+/);
            if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
            return brand.slice(0, 2).toUpperCase();
        }
        if (product) {
            const parts = product.trim().split(/\s+/);
            if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
            return product.slice(0, 2).toUpperCase();
        }
        return 'MM';
    };

    const initials = getInitials(brand_name, product_name);
    const logoText = brand_name ? brand_name.toUpperCase() : (product_name ? product_name.toUpperCase() : 'MAGIC MIRROR');

    const trackingPeriodStr = before_timeperiod && after_timeperiod
        ? `${before_timeperiod} → ${after_timeperiod}`
        : (startDateDisplay || 'May 4 → May 26');

    const concernsStr = concerns.length > 0
        ? concerns.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')
        : 'Breakouts';

    return (
        <AbsoluteFill style={{
            background: '#FFF0F2',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '120px 60px 100px',
            boxSizing: 'border-box',
            opacity: sceneOpacity,
        }}>
            <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');` }} />

            {/* Brand Lockup */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                marginBottom: 40,
                opacity: line1Opacity,
                transform: `translateY(${line1Y}px)`,
            }}>
                <div style={{
                    width: 54,
                    height: 54,
                    borderRadius: '50%',
                    backgroundColor: '#ffffff',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                }}>
                    <Img src={mmLogo} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.6)' }} alt="Magic Mirror Logo" />
                </div>
                <div style={{
                    fontSize: 44,
                    fontWeight: 800,
                    color: '#1A202C',
                    letterSpacing: '0.03em',
                    fontFamily: 'Montserrat, sans-serif',
                }}>
                    MAGIC MIRROR
                </div>
            </div>

            {/* Review Label */}
            <div style={{
                fontSize: 38,
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: '#888780',
                textAlign: 'center',
                marginBottom: 50,
                fontFamily: 'Montserrat, sans-serif',
                opacity: line1Opacity,
                transform: `translateY(${line1Y}px)`,
            }}>
                Effectiveness tracking
            </div>

            {/* Product Unit */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 40,
                margin: '60px 0',
                width: '100%',
                opacity: line2Opacity,
                transform: `translateY(${line2Y}px)`,
            }}>
                <div style={{
                    width: 250,
                    height: 250,
                    borderRadius: 50,
                    backgroundColor: '#1A202C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    <div style={{
                        width: 180,
                        height: 180,
                        borderRadius: 36,
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '10px',
                        boxSizing: 'border-box',
                    }}>
                        {product_image_url ? (
                            <Img src={product_image_url} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt="Product" />
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: 36, fontWeight: 700, color: '#1A202C', textAlign: 'center', lineHeight: 1.2, fontFamily: 'Montserrat, sans-serif' }}>
                                    {initials}
                                </span>
                                <span style={{ fontSize: 18, fontWeight: 500, color: '#1A202C', textAlign: 'center', marginTop: 4, lineHeight: 1.1, fontFamily: 'Montserrat, sans-serif' }}>
                                    {logoText}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
                <div style={{ textAlign: 'left' }}>
                    <div style={{
                        fontSize: 72,
                        fontWeight: 800,
                        color: '#1A202C',
                        lineHeight: 1.1,
                        fontFamily: 'Montserrat, sans-serif',
                    }}>
                        {product_name || 'Hand Lotion'}
                    </div>
                    <div style={{
                        fontSize: 44,
                        fontWeight: 600,
                        color: '#10AFCC',
                        marginTop: 10,
                        fontFamily: 'Montserrat, sans-serif',
                    }}>
                        by {brand_name || 'Niven Morgan'}
                    </div>
                </div>
            </div>

            {/* Setup Rows */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
                marginTop: 40,
                width: '100%',
                opacity: panelOpacity,
                transform: `translateY(${panelY}px)`,
            }}>
                {/* Tracking For */}
                <div style={{
                    backgroundColor: '#10AFCC',
                    borderRadius: 36,
                    padding: '36px 50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                    width: '100%',
                }}>
                    <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'Montserrat, sans-serif' }}>
                        Tracking for
                    </div>
                    <div style={{ fontSize: 44, fontWeight: 700, color: '#ffffff', fontFamily: 'Montserrat, sans-serif' }}>
                        {concernsStr}
                    </div>
                </div>

                {/* Tracking Period */}
                <div style={{
                    backgroundColor: '#1A202C',
                    borderRadius: 36,
                    padding: '36px 50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                    width: '100%',
                }}>
                    <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'Montserrat, sans-serif' }}>
                        Tracking period
                    </div>
                    <div style={{ fontSize: 44, fontWeight: 700, color: '#ffffff', fontFamily: 'Montserrat, sans-serif' }}>
                        {trackingPeriodStr}
                    </div>
                </div>

                {/* Tracked By */}
                <div style={{
                    backgroundColor: '#10AFCC',
                    borderRadius: 36,
                    padding: '36px 50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                    width: '100%',
                }}>
                    <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'Montserrat, sans-serif' }}>
                        Tracked by
                    </div>
                    <div style={{ fontSize: 44, fontWeight: 700, color: '#ffffff', fontFamily: 'Montserrat, sans-serif' }}>
                        {testerName}
                    </div>
                </div>
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
        const absVal = Math.round(Math.abs(val));
        return val > 0 ? `+${absVal}` : val < 0 ? `−${absVal}` : `0`;
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

    const numAfter = 12; // 12 points across the entire timeline

    let duringPoints = Array.from({ length: numAfter }).map((_, idx) => {
        const fraction = idx / (numAfter - 1 || 1);
        const day = Math.max(1, Math.min(nDays, Math.round(1 + fraction * (nDays - 1))));
        const noise = getDeterministicNoise(day, avPT * 5.7);
        const rawScore = avPT + noise * 6.0;
        return {
            day,
            score: Math.max(5, Math.min(95, Math.round(rawScore * 10) / 10))
        };
    });

    const rawPoints = duringPoints.map((p, idx) => ({ ...p, period: 'after', index: idx }));

    const allPoints = rawPoints.map((pt) => {
        return {
            ...pt,
            indexInPeriod: pt.index
        };
    });

    const beforePoints = [];
    duringPoints = allPoints;

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

    const afterLineProgress = interpolate(localFrame, [20, 100], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const afterLineOpacity = interpolate(localFrame, [20, 35], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const afterLineX2 = getX(1) + afterLineProgress * (getX(nDays) - getX(1));

    const fillOpacity = interpolate(localFrame, [100, 140], [0, 0.20], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const pillOpacity = interpolate(localFrame, [120, 140], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const textOpacity = interpolate(localFrame, [140, 160], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const progress = interpolate(localFrame, [120, 170], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const easedProgress = Math.sin((progress * Math.PI) / 2);
    const currentDiff = easedProgress * diffVal;
    const diffText = formatDelta(currentDiff);

    const deltaColor = '#ffffff';
    const afterColor = isImproved ? '#1D9E75' : '#8E8E93';
    const gapFillColor = isImproved ? '#1D9E75' : '#708E9B';
    const deltaLabel = isImproved ? 'Score Improvement' : 'Score Decline';

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
                                stroke="rgba(26, 32, 44, 0.12)"
                                strokeWidth={3}
                                strokeDasharray="6 6"
                            />
                            <text
                                x={marginLeft - 20}
                                y={lineY + 10}
                                textAnchor="end"
                                fill="rgba(26, 32, 44, 0.6)"
                                fontSize={34}
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
                    fill="rgba(26, 32, 44, 0.85)"
                    fontSize={32}
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
                                    y2={tickY + 15}
                                    stroke="rgba(26, 32, 44, 0.3)"
                                    strokeWidth={4}
                                />
                                <text
                                    x={tickX}
                                    y={tickY + 48}
                                    textAnchor="middle"
                                    fill="rgba(26, 32, 44, 0.6)"
                                    fontSize={30}
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
                    fill="rgba(26, 32, 44, 0.6)"
                    fontSize={32}
                    fontWeight="700"
                    letterSpacing={1}
                >
                    Tracking period (days)
                </text>

                {/* 3. Main Axes lines */}
                <g>
                    {/* Y Axis */}
                    <line x1={marginLeft} y1={marginTop - 10} x2={marginLeft} y2={svgHeight - marginBottom} stroke="rgba(26, 32, 44, 0.3)" strokeWidth={7} />
                    <path d={`M ${marginLeft - 8} ${marginTop + 2} L ${marginLeft} ${marginTop - 15} L ${marginLeft + 8} ${marginTop + 2}`} stroke="rgba(26, 32, 44, 0.3)" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />

                    {/* X Axis */}
                    <line x1={marginLeft} y1={svgHeight - marginBottom} x2={svgWidth - marginRight + 15} y2={svgHeight - marginBottom} stroke="rgba(26, 32, 44, 0.3)" strokeWidth={7} />
                    <path d={`M ${svgWidth - marginRight + 5} ${svgHeight - marginBottom - 8} L ${svgWidth - marginRight + 18} ${svgHeight - marginBottom} L ${svgWidth - marginRight + 5} ${svgHeight - marginBottom + 8}`} stroke="rgba(26, 32, 44, 0.3)" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>

                {/* 4. Gap Fill */}
                {fillOpacity > 0.001 && (
                    <rect
                        x={getX(1)}
                        y={Math.min(getY(avBT), getY(avPT))}
                        width={getX(nDays) - getX(1)}
                        height={Math.abs(getY(avBT) - getY(avPT))}
                        fill={gapFillColor}
                        opacity={fillOpacity}
                    />
                )}

                {/* 5. BEFORE Average Reference Line */}
                <line
                    x1={getX(1)}
                    y1={getY(avBT)}
                    x2={getX(nDays)}
                    y2={getY(avBT)}
                    stroke="rgba(26, 32, 44, 0.45)"
                    strokeWidth={8}
                    strokeDasharray="10 8"
                    opacity={beforeLineOpacity}
                />

                {/* 6. Dynamic Daily Data Score Dots */}
                {allPoints.map((pt, idx) => {
                    const dotX = getX(pt.day);
                    const dotY = getY(pt.score);

                    const startFrame = 10 + (pt.index / Math.max(1, allPoints.length)) * 90;
                    const dotScale = interpolate(localFrame, [startFrame, startFrame + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

                    if (dotScale <= 0.001) return null;

                    return (
                        <circle
                            key={`dot-${idx}`}
                            cx={dotX}
                            cy={dotY}
                            r={13}
                            fill={pt.period === 'before' ? '#888780' : afterColor}
                            stroke="#FFFFFF"
                            strokeWidth={3.5}
                            style={{
                                transform: `scale(${dotScale})`,
                                transformOrigin: `${dotX}px ${dotY}px`,
                                opacity: interpolate(localFrame, [110, 130], [1, 0.45], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
                            }}
                        />
                    );
                })}

                {/* 7. AFTER Average Reference Line */}
                {afterLineOpacity > 0.001 && (
                    <line
                        x1={getX(1)}
                        y1={getY(avPT)}
                        x2={afterLineX2}
                        y2={getY(avPT)}
                        stroke={afterColor}
                        strokeWidth={10}
                        opacity={afterLineOpacity}
                    />
                )}
            </svg>
        );
    };

    return (
        <AbsoluteFill style={{
            background: '#FFF0F2',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '120px 60px 80px',
            boxSizing: 'border-box',
            transform: `translateY(${chartRiseProgress}px)`,
        }}>
            <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');` }} />

            {/* Header */}
            <div style={{ width: '100%', marginBottom: 40, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{
                    fontSize: 38,
                    fontWeight: '600',
                    color: '#888780',
                    letterSpacing: 4,
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: 10,
                    fontFamily: 'Montserrat, sans-serif'
                }}>
                    {concernLabel}
                </span>
                <h1 style={{
                    fontSize: 60,
                    fontWeight: '700',
                    color: '#1A202C',
                    margin: 0,
                    lineHeight: 1.1,
                    fontFamily: 'Montserrat, sans-serif'
                }}>
                    Effectiveness Review — {nDays} days
                </h1>
            </div>

            {/* Card 1: SVG Line Chart Container (Pink/Light) */}
            <div style={{
                width: '100%',
                backgroundColor: '#FFEBEF',
                borderRadius: 36,
                padding: '40px 30px 30px 30px',
                boxSizing: 'border-box',
                height: 720,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginBottom: 40,
                boxShadow: '0 8px 30px rgba(228, 96, 120, 0.06)',
            }}>
                <div style={{ width: '100%', height: 600 }}>
                    {renderChartSVG()}
                </div>
            </div>

            {/* Card 2: Hero Wrap Horizontal Card (Primary theme color bg) */}
            <div style={{
                width: '100%',
                backgroundColor: '#10AFCC',
                borderRadius: 36,
                padding: '40px 50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 30,
                boxSizing: 'border-box',
                marginBottom: 40,
                opacity: pillOpacity,
                transform: `scale(${interpolate(localFrame, [260, 280], [0.85, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })})`,
            }}>
                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                    <div style={{
                        fontSize: 100,
                        fontWeight: '800',
                        color: deltaColor,
                        lineHeight: 1,
                        fontFamily: 'Montserrat, sans-serif'
                    }}>
                        {diffText}
                    </div>
                    <div style={{
                        fontSize: 34,
                        fontWeight: '600',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.85)',
                        marginTop: 8,
                        fontFamily: 'Montserrat, sans-serif'
                    }}>
                        {deltaLabel}
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 20 }}>
                    {/* Average Before */}
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.16)',
                        borderRadius: 20,
                        padding: '24px 34px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                        minWidth: 260,
                        boxSizing: 'border-box'
                    }}>
                        <div style={{
                            fontSize: 34,
                            fontWeight: '600',
                            letterSpacing: '0.03em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.7)',
                            textAlign: 'center',
                            lineHeight: 1.2,
                            fontFamily: 'Montserrat, sans-serif'
                        }}>
                            Average<br />before
                        </div>
                        <div style={{
                            fontSize: 70,
                            fontWeight: '700',
                            color: '#ffffff',
                            fontFamily: 'Montserrat, sans-serif'
                        }}>
                            {fmtScore(avBT)}
                        </div>
                    </div>
                    {/* Average After */}
                    <div style={{
                        backgroundColor: 'rgba(255,255,255,0.16)',
                        borderRadius: 20,
                        padding: '24px 34px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 8,
                        minWidth: 260,
                        boxSizing: 'border-box'
                    }}>
                        <div style={{
                            fontSize: 34,
                            fontWeight: '600',
                            letterSpacing: '0.03em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.7)',
                            textAlign: 'center',
                            lineHeight: 1.2,
                            fontFamily: 'Montserrat, sans-serif'
                        }}>
                            Average<br />after
                        </div>
                        <div style={{
                            fontSize: 70,
                            fontWeight: '700',
                            color: '#ffffff',
                            fontFamily: 'Montserrat, sans-serif'
                        }}>
                            {fmtScore(avPT)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Caption & Disclaimer */}
            <div style={{
                opacity: textOpacity,
                transform: `translateY(${interpolate(localFrame, [280, 300], [20, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px)`,
                textAlign: 'left',
                width: '100%',
                boxSizing: 'border-box',
                padding: '0 10px',
            }}>
                <p style={{
                    fontSize: 38,
                    lineHeight: 1.5,
                    color: '#2C2C2A',
                    fontWeight: 500,
                    fontFamily: 'Montserrat, sans-serif',
                    margin: '0 0 24px 0',
                }}>
                    After tracking <span style={{ color: '#10AFCC', fontWeight: 700 }}>{product_name}</span> for <span style={{ color: '#10AFCC', fontWeight: 700 }}>{nDays} days</span>, my {concernLabel} score {isImproved ? 'improved' : 'changed'} by <span style={{ color: '#10AFCC', fontWeight: 700 }}>{formatDelta(diffVal)}</span> — from {fmtScore(avBT)} to {fmtScore(avPT)}.
                </p>
                <p style={{
                    fontSize: 26,
                    color: '#8a8e94ff',
                    fontWeight: '500',
                    lineHeight: '1.3',
                    margin: 0,
                    fontFamily: 'Montserrat, sans-serif'
                }}>
                    Results reflect my personal experience. Individual outcomes may vary based on skin condition and lifestyle.
                </p>
            </div>
        </AbsoluteFill>
    );
};

const DownTrendIcon = ({ color = '#8E8E93' }) => (
    <div style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        flexShrink: 0,
    }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 17L13.5 8.5L8.5 13.5L2 7" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 17H22V11" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

const UpTrendIcon = ({ color = '#10AFCC' }) => (
    <div style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        flexShrink: 0,
    }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 7L13.5 15.5L8.5 10.5L2 17" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16 7H22V13" stroke={color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

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

    // Calculate days elapsed between scans
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

    const headerOpacity = interpolate(localFrame, [0, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const headerY = interpolate(localFrame, [0, 20], [-30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const leftCardScale = spring({ frame: localFrame - 10, fps, from: 0.85, to: 1, config: { damping: 14 } });
    const rightCardScale = spring({ frame: localFrame - 30, fps, from: 0.85, to: 1, config: { damping: 14 } });
    const leftOpacity = interpolate(localFrame, [10, 40], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const rightOpacity = interpolate(localFrame, [30, 60], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    const worstDateDisplay = before_timeperiod || 'May 4, 2026';
    const bestDateDisplay = after_timeperiod || 'May 26, 2026';

    return (
        <AbsoluteFill style={{
            background: '#FFF0F2',
            display: 'flex',
            flexDirection: 'column',
            padding: '120px 60px 80px',
            boxSizing: 'border-box',
        }}>
            <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');` }} />

            {/* Header */}
            <div style={{
                opacity: headerOpacity,
                transform: `translateY(${headerY}px)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginBottom: 40,
                width: '100%',
            }}>
                <div style={{
                    fontSize: 38,
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: '#888780',
                    fontFamily: 'Montserrat, sans-serif',
                    marginBottom: 10,
                }}>
                    {concernLabel}
                </div>
                <div style={{
                    fontSize: 60,
                    fontWeight: 700,
                    color: '#1A202C',
                    fontFamily: 'Montserrat, sans-serif',
                }}>
                    Effectiveness Review — Scan Highlights
                </div>
            </div>

            {/* Side by side photos row */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 32,
                width: '100%',
                marginBottom: 40,
            }}>
                {/* WORST Column */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                    opacity: leftOpacity,
                    transform: `scale(${leftCardScale})`,
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 24 }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: '#97958dff',
                            padding: '8px 24px 8px 8px',
                            borderRadius: 9999,
                            boxSizing: 'border-box',
                        }}>
                            <DownTrendIcon color="#1A202C" />
                            <span style={{
                                fontSize: 26,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                color: '#1A202C',
                                fontFamily: 'Montserrat, sans-serif',
                                letterSpacing: 1,
                            }}>
                                Lowest score
                            </span>
                        </div>
                    </div>
                    <div style={{
                        position: 'relative',
                        borderRadius: '40px 40px 0 0',
                        overflow: 'hidden',
                        width: '100%',
                        aspectRatio: 3 / 4,
                        backgroundColor: '#e2e8f0',
                    }}>
                        {worst_image_url ? (
                            <Img src={worst_image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Worst Scan" />
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

                    {/* Score Block */}
                    <div style={{
                        borderRadius: '0 0 40px 40px',
                        padding: '30px 24px',
                        textAlign: 'center',
                        backgroundColor: '#1A202C',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}>
                        <div style={{
                            fontSize: 24,
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontFamily: 'Montserrat, sans-serif',
                            marginBottom: 8,
                        }}>
                            Score
                        </div>
                        <div style={{
                            fontSize: 84,
                            fontWeight: 800,
                            color: '#ffffff',
                            fontFamily: 'Montserrat, sans-serif',
                            lineHeight: 1.1,
                        }}>
                            {fmtScore(worst_image_score)}
                        </div>
                        <div style={{
                            fontSize: 24,
                            color: 'rgba(255, 255, 255, 0.5)',
                            marginTop: 8,
                            fontFamily: 'Montserrat, sans-serif',
                        }}>
                            {worstDateDisplay}
                        </div>
                    </div>
                </div>

                {/* BEST Column */}
                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    boxSizing: 'border-box',
                    opacity: rightOpacity,
                    transform: `scale(${rightCardScale})`,
                }}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: 24 }}>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            backgroundColor: '#10AFCC',
                            padding: '8px 24px 8px 8px',
                            borderRadius: 9999,
                            boxSizing: 'border-box',
                        }}>
                            <UpTrendIcon color="#10AFCC" />
                            <span style={{
                                fontSize: 26,
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                color: '#ffffff',
                                fontFamily: 'Montserrat, sans-serif',
                                letterSpacing: 1,
                            }}>
                                Best score
                            </span>
                        </div>
                    </div>
                    <div style={{
                        position: 'relative',
                        borderRadius: '40px 40px 0 0',
                        overflow: 'hidden',
                        width: '100%',
                        aspectRatio: 3 / 4,
                        backgroundColor: '#e2e8f0',
                    }}>
                        {best_image_url ? (
                            <Img src={best_image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Best Scan" />
                        ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ color: '#718096', fontSize: 28 }}>No Image</span>
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

                    {/* Score Block */}
                    <div style={{
                        borderRadius: '0 0 40px 40px',
                        padding: '30px 24px',
                        textAlign: 'center',
                        backgroundColor: '#1A202C',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}>
                        <div style={{
                            fontSize: 24,
                            fontWeight: 600,
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontFamily: 'Montserrat, sans-serif',
                            marginBottom: 8,
                        }}>
                            Score
                        </div>
                        <div style={{
                            fontSize: 84,
                            fontWeight: 800,
                            color: '#1D9E75',
                            fontFamily: 'Montserrat, sans-serif',
                            lineHeight: 1.1,
                        }}>
                            {fmtScore(best_image_score)}
                        </div>
                        <div style={{
                            fontSize: 24,
                            color: 'rgba(255, 255, 255, 0.5)',
                            marginTop: 8,
                            fontFamily: 'Montserrat, sans-serif',
                        }}>
                            {bestDateDisplay}
                        </div>
                    </div>
                </div>
            </div>

            {/* Days between scans info */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                width: '100%',
            }}>
                <span style={{
                    fontSize: 46,
                    fontWeight: 700,
                    color: '#888780',
                    fontFamily: 'Montserrat, sans-serif',
                }}>
                    Scans captured <span style={{ color: '#10AFCC', fontWeight: 800 }}>{nDays} days</span> apart
                </span>
            </div>
        </AbsoluteFill>
    );
};

// ─── SCENE 4: LOGO OUTRO ─────────────────────────────────────────────────────
// Frames 840 – 959
const SceneOutro = ({ fps }) => {
    const frame = useCurrentFrame();
    const localFrame = frame - 690;

    const outroScale = spring({ frame: localFrame, fps, from: 0.6, to: 1, config: { damping: 10 } });
    const outroOpacity = interpolate(frame, [690, 720], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{
            justifyContent: 'center',
            alignItems: 'center',
            background: BG,
            opacity: outroOpacity,
            transform: `scale(${outroScale})`,
            display: 'flex',
            flexDirection: 'column',
        }}>
            <div style={{ marginBottom: 40 }}>
                <Img src={mmLogo} style={{ width: 320, height: 320, objectFit: 'contain' }} />
            </div>
            <h2 style={{ fontSize: 26, letterSpacing: 4.5, color: '#718096', fontWeight: '600', textTransform: 'uppercase', margin: 0 }}>
                VERIFIED BY
            </h2>
            <h1 style={{ fontSize: 60, fontWeight: '900', letterSpacing: 6, color: '#1A202C', marginTop: 15, marginBottom: 0, textTransform: 'uppercase', lineHeight: 1 }}>
                MAGIC MIRROR
            </h1>
            <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,#1D9E75,transparent)', width: '60%', margin: '15px auto' }} />
            <p style={{ fontSize: 30, color: '#10AFCC', letterSpacing: 2, fontWeight: '600', textTransform: 'uppercase', margin: '30px 0 0 0' }}>
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
    // Scene 3: Side by Side    — frames 540 – 689  (5 s)
    // Scene 4: Outro           — frames 690 – 809  (4 s)
    // Total = 810 frames = 27 s

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
            {frame >= 540 && frame < 690 && (
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
            {frame >= 690 && (
                <SceneOutro fps={fps} />
            )}

            {/* ── WATERMARK (all screens except last) ── */}
            {frame < 705 && (() => {
                const watermarkOpacity = interpolate(frame, [690, 705], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
                return <Watermark opacity={watermarkOpacity} />;
            })()}
        </AbsoluteFill>
    );
};
