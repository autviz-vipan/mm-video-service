import { AbsoluteFill, useCurrentFrame, Img, interpolate, useVideoConfig } from 'remotion';
import React from 'react';
import mmLogo from './MM logo.jpg';
import tiktokLogo from './Tiktok logo.png';

// ── Watermark (identical to BeforeAfterVideo) ─────────────────────────────────
const Watermark = ({ opacity = 1 }) => (
    <div style={{
        position: 'absolute',
        bottom: 60,
        left: 60,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        pointerEvents: 'none',
        opacity,
    }}>
        <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: '#fff',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            flexShrink: 0,
        }}>
            <Img src={mmLogo} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.6)' }} alt="Magic Mirror Logo" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.0 }}>
            <span style={{ fontSize: 28, lineHeight: 1.0, fontWeight: 800, color: '#1A202C', fontFamily: 'Montserrat, sans-serif' }}>MAGIC</span>
            <span style={{ fontSize: 28, lineHeight: 1.0, fontWeight: 800, color: '#10AFCC', fontFamily: 'Montserrat, sans-serif' }}>MIRROR</span>
        </div>
        {/* 10px gap divider */}
        <div style={{ width: 2, height: 60, backgroundColor: 'rgba(0,0,0,0.12)', marginLeft: 10, marginRight: 10, flexShrink: 0 }} />
        {/* TikTok block */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: '#fff',
                boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                flexShrink: 0,
            }}>
                <Img src={tiktokLogo} style={{ width: '90%', height: '90%', objectFit: 'contain' }} alt="TikTok" />
            </div>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#1A202C', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.2 }}>@officialmagicmirror</span>
        </div>
    </div>
);


// ── Main Component ─────────────────────────────────────────────────────────────
export const NewFormatVideo = ({
    product_name = 'Hand Lotion',
    brand_name = 'Niven Morgan',
    creator_name = '',
    concerns = ['Redness'],
    product_image_url = '',
    platform = 'reels',
    mask_enabled = 'off',
    image_url = '',
    score = 72,
    date = 'JUN 22, 2026',
    mask_url = null,
    video_role = 'new_format',
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Segment durations at 30fps:
    // SEG 0: Scan screen    — 150 frames (5s)
    // SEG 1: Product detail — 150 frames (5s)
    // SEG 2: End logo       — 150 frames (5s)
    const DURATIONS = [150, 150, 150];
    const SEG_START_FRAMES = [0, 150, 300];

    let currentSeg = 0;
    let segProgress = 0;
    if (frame < 150) {
        currentSeg = 0;
        segProgress = frame / 150;
    } else if (frame < 300) {
        currentSeg = 1;
        segProgress = (frame - 150) / 150;
    } else {
        currentSeg = 2;
        segProgress = Math.min(1, (frame - 300) / 150);
    }

    const getSegOpacity = (idx) => {
        const start = SEG_START_FRAMES[idx];
        const duration = DURATIONS[idx];
        const end = start + duration;
        if (frame < start) return 0;
        if (frame >= start && frame < start + 12) return (frame - start) / 12;
        if (frame >= start + 12 && frame < end) return 1;
        if (frame >= end && frame < end + 12) return 1 - (frame - end) / 12;
        return 0;
    };

    // Concern info
    const highlightMetric = concerns && concerns.length > 0 ? concerns[0] : 'redness';
    const concernName = highlightMetric
        ? highlightMetric.charAt(0).toUpperCase() + highlightMetric.slice(1)
        : 'Redness';
    const concernsStr = concerns && concerns.length > 0
        ? concerns.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')
        : 'Redness';

    // Date: strip year for stat row display (e.g. "JUN 22, 2026" → "JUN 22")
    const cleanDate = date && date.includes(',') ? date.split(',')[0].trim() : date;

    // Creator
    const cleanCreator = creator_name
        ? (creator_name.startsWith('@') ? creator_name : `@${creator_name}`)
        : '@MagicMirror';

    // Product logo fallback initials
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

    // Product detail (SEG 1) entry animations
    const seg1Frame = frame - 150;
    const line1Opacity = interpolate(seg1Frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const line1Y = interpolate(seg1Frame, [10, 30], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const line2Opacity = interpolate(seg1Frame, [25, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const line2Y = interpolate(seg1Frame, [25, 45], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const panelOpacity = interpolate(seg1Frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const panelY = interpolate(seg1Frame, [55, 80], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <style dangerouslySetInnerHTML={{
                __html: `
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');

          .nf-screenport {
            width: 1080px;
            height: 1920px;
            background: #fff;
            position: relative;
            overflow: hidden;
            font-family: 'Montserrat', sans-serif;
          }

          /* ── PROGRESS BAR ── */
          .nf-progress-bar {
            position: absolute;
            top: 40px;
            left: 45px;
            right: 45px;
            display: flex;
            gap: 12px;
            z-index: 100;
          }
          .nf-pb-seg {
            flex: 1;
            height: 10px;
            border-radius: 10px;
            background: rgba(0,0,0,0.08);
            overflow: hidden;
          }
          .nf-pb-fill {
            height: 100%;
            border-radius: 5px;
            width: 0%;
            background: #1D9E75;
          }

          .nf-seg {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
          }

          /* ── SEG 0: SCAN ── (same as BeforeAfterVideo BEFORE screen) */
          .nf-seg-scan {
            background: #fff;
            padding: 180px 45px 60px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
          .nf-eyebrow {
            font-size: 33px;
            letter-spacing: 0.14em;
            font-weight: 700;
            color: #718096;
            text-transform: uppercase;
            margin-bottom: 38px;
            text-align: left;
          }
          .nf-card {
            border-radius: 60px;
            padding: 38px;
            position: relative;
            width: 100%;
            box-sizing: border-box;
            background: #D6CFC8;
            border: 3px solid #B4ADA6;
          }
          .nf-tag {
            position: absolute;
            top: 10px;
            right: 10px;
            background: #0c151d;
            color: #fff;
            font-size: 33px;
            font-weight: 700;
            letter-spacing: 0.08em;
            padding: 16px 38px;
            border-radius: 55px;
            z-index: 2;
          }
          .nf-photo-frame {
            border-radius: 44px;
            overflow: hidden;
            width: 100%;
            height: auto;
            background: transparent;
            position: relative;
          }
          .nf-photo-frame img {
            width: 100%;
            height: auto;
            max-height: 980px;
            display: block;
            border-radius: 44px;
            object-fit: cover;
          }
          .nf-stat-row {
            margin-top: 50px;
            border-radius: 55px;
            padding: 55px 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: #D6CFC8;
            border: 3px solid #B4ADA6;
          }
          .nf-stat-label {
            font-size: 33px;
            font-weight: 700;
            letter-spacing: 0.1em;
            color: #718096;
            text-transform: uppercase;
            margin-bottom: 16px;
            text-align: left;
          }
          .nf-stat-value {
            font-size: 104px;
            font-weight: 800;
            line-height: 1.0;
            color: #0c151d;
            text-align: left;
          }
          .nf-stat-value span {
            font-size: 50px;
            font-weight: 600;
            color: #718096;
          }
          .nf-divider {
            width: 3px;
            height: 126px;
            margin: 0 50px;
            background: #B4ADA6;
          }
          .nf-date-block {
            display: flex;
            align-items: center;
            gap: 28px;
          }
          .nf-date-icon {
            width: 93px;
            height: 93px;
            border-radius: 50%;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            border: 3px solid #B4ADA6;
          }
          .nf-date-icon svg {
            width: 44px;
            height: 44px;
            stroke: #718096;
          }
          .nf-date-value {
            font-size: 41px;
            font-weight: 700;
            color: #0c151d;
            text-align: left;
          }

          /* ── SEG 2: END CARD ── (same as BeforeAfterVideo seg-end) */
          .nf-seg-end {
            background: #fff;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 100px 60px;
            display: flex;
            flex-direction: column;
          }
        `
            }} />

            <div className="nf-screenport">

                {/* Progress Bar */}
                <div className="nf-progress-bar">
                    {DURATIONS.map((_, idx) => {
                        let widthPct = '0%';
                        if (idx < currentSeg) widthPct = '100%';
                        else if (idx === currentSeg) widthPct = `${segProgress * 100}%`;
                        return (
                            <div key={idx} className="nf-pb-seg">
                                <div className="nf-pb-fill" style={{ width: widthPct }} />
                            </div>
                        );
                    })}
                </div>

                {/* Watermark on all screens */}
                <Watermark opacity={1} />

                {/* ══════════════════════════════════════════════════
            SEG 0: SCAN SCREEN  (same as BeforeAfterVideo BEFORE)
        ══════════════════════════════════════════════════ */}
                <div className="nf-seg nf-seg-scan" style={{ opacity: getSegOpacity(0), pointerEvents: currentSeg === 0 ? 'auto' : 'none' }}>
                    <div className="nf-eyebrow">{concernName}</div>

                    <div className="nf-card">
                        <div className="nf-photo-frame">
                            {image_url ? (
                                <Img src={image_url} style={{ width: '100%', height: 'auto', maxHeight: '980px', display: 'block', borderRadius: '44px', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '980px', width: '900px', fontSize: 220, color: 'rgba(0,0,0,0.04)' }}>&#9786;</div>
                            )}
                            {mask_enabled === 'on' && mask_url && (
                                <Img src={mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', borderRadius: '44px' }} />
                            )}
                        </div>
                    </div>

                    <div className="nf-stat-row">
                        <div>
                            <div className="nf-stat-label">{concernName} Score</div>
                            <div className="nf-stat-value">{score}<span>/100</span></div>
                        </div>
                        <div className="nf-divider" />
                        <div className="nf-date-block">
                            <div className="nf-date-icon">
                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            </div>
                            <div>
                                <div className="nf-stat-label">Date</div>
                                <div className="nf-date-value">{cleanDate}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════
            SEG 1: PRODUCT DETAIL  (same as BeforeAfterVideo SEG 4 Statement)
        ══════════════════════════════════════════════════ */}
                <div className="nf-seg" style={{
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: '120px 60px 100px',
                    boxSizing: 'border-box',
                    opacity: getSegOpacity(1),
                    pointerEvents: currentSeg === 1 ? 'auto' : 'none',
                    position: 'absolute',
                    inset: 0,
                }}>

                    {/* Brand lockup: AppLogo SVG + MAGIC MIRROR text */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 20,
                        marginBottom: 20,
                        opacity: line1Opacity,
                        transform: `translateY(${line1Y}px)`,
                    }}>
                        <div style={{
                            width: 70,
                            height: 70,
                            borderRadius: '50%',
                            backgroundColor: '#fff',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            overflow: 'hidden',
                            flexShrink: 0,
                        }}>
                            <Img src={mmLogo} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.6)' }} alt="Magic Mirror Logo" />
                        </div>
                        <div style={{ fontSize: 44, fontWeight: 800, color: '#1A202C', letterSpacing: '0.03em', fontFamily: 'Montserrat, sans-serif' }}>
                            MAGIC MIRROR
                        </div>
                    </div>

                    {/* Subtitle label */}
                    <div style={{
                        fontSize: 30,
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#888780',
                        textAlign: 'center',
                        marginBottom: 60,
                        fontFamily: 'Montserrat, sans-serif',
                        opacity: line1Opacity,
                        transform: `translateY(${line1Y}px)`,
                    }}>
                        {/* Effectiveness Tracking */}
                    </div>

                    {/* Product Unit: logo card + name */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 40,
                        margin: '0 0 60px 0',
                        width: '100%',
                        opacity: line2Opacity,
                        transform: `translateY(${line2Y}px)`,
                    }}>
                        {/* Product image box */}
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
                                backgroundColor: '#fff',
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
                                        <span style={{ fontSize: 36, fontWeight: 700, color: '#1A202C', textAlign: 'center', lineHeight: 1.2, fontFamily: 'Montserrat, sans-serif' }}>{initials}</span>
                                        <span style={{ fontSize: 18, fontWeight: 500, color: '#1A202C', textAlign: 'center', marginTop: 4, lineHeight: 1.1, fontFamily: 'Montserrat, sans-serif' }}>{logoText}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Product name + brand */}
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: 72, fontWeight: 800, color: '#1A202C', lineHeight: 1.1, fontFamily: 'Montserrat, sans-serif' }}>
                                {product_name || 'Hand Lotion'}
                            </div>
                            <div style={{ fontSize: 44, fontWeight: 600, color: '#10AFCC', marginTop: 10, fontFamily: 'Montserrat, sans-serif' }}>
                                by {brand_name || 'Niven Morgan'}
                            </div>
                        </div>
                    </div>

                    {/* Info Pill Rows */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 24,
                        width: '100%',
                        opacity: panelOpacity,
                        transform: `translateY(${panelY}px)`,
                    }}>
                        {/* Concern Tracked */}
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
                                Concern Tracked
                            </div>
                            <div style={{ fontSize: 44, fontWeight: 700, color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
                                {concernsStr}
                            </div>
                        </div>

                        {/* Scan Date */}
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
                                Date
                            </div>
                            <div style={{ fontSize: 44, fontWeight: 700, color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
                                {date}
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
                            <div style={{ fontSize: 44, fontWeight: 700, color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
                                {cleanCreator}
                            </div>
                        </div>

                        {/* Latest Score */}
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
                                Score
                            </div>
                            <div style={{ fontSize: 44, fontWeight: 700, color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>
                                {score} / 100
                            </div>
                        </div>
                    </div>
                </div>

                {/* ══════════════════════════════════════════════════
            SEG 2: END LOGO SCREEN  (same as BeforeAfterVideo seg-end)
        ══════════════════════════════════════════════════ */}
                <div className="nf-seg nf-seg-end" style={{
                    opacity: getSegOpacity(2),
                    pointerEvents: currentSeg === 2 ? 'auto' : 'none',
                    position: 'absolute',
                    inset: 0,
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
                </div>

            </div>
        </AbsoluteFill>
    );
};
