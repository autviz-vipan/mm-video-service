import { AbsoluteFill, useCurrentFrame, Img, interpolate, useVideoConfig } from 'remotion';
import React from 'react';
import mmLogo from './MM logo.jpg';
import tiktokLogo from './Tiktok logo.png';

// Watermark
const Watermark = ({ opacity = 1 }) => (
    <div style={{ position: 'absolute', bottom: 60, left: 60, zIndex: 999, display: 'flex', alignItems: 'center', gap: 16, pointerEvents: 'none', opacity }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
            <Img src={mmLogo} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.6)' }} alt="Magic Mirror Logo" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.0 }}>
            <span style={{ fontSize: 28, lineHeight: 1.0, fontWeight: 800, color: '#1A202C', fontFamily: 'Montserrat, sans-serif' }}>MAGIC</span>
            <span style={{ fontSize: 28, lineHeight: 1.0, fontWeight: 800, color: '#10AFCC', fontFamily: 'Montserrat, sans-serif' }}>MIRROR</span>
        </div>
        <div style={{ width: 2, height: 60, backgroundColor: 'rgba(0,0,0,0.12)', marginLeft: 10, marginRight: 10, flexShrink: 0 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
                <Img src={tiktokLogo} style={{ width: '90%', height: '90%', objectFit: 'contain' }} alt="TikTok" />
            </div>
            <span style={{ fontSize: 28, fontWeight: 700, color: '#1A202C', fontFamily: 'Montserrat, sans-serif', lineHeight: 1.2 }}>@officialmagicmirror</span>
        </div>
    </div>
);

export const NewFormatVideo = ({
    product_name = 'Hand Lotion',
    brand_name = 'Niven Morgan',
    brand_name_visible = true,
    category_name = '',
    product_category = '',
    creator_name = '',
    concerns = ['Redness'],
    product_image_url = '',
    platform = 'reels',
    mask_enabled = 'off',
    image_url = '',
    score = 72,
    date = 'JUN 22, 2026',
    mask_url = null,
    metrics = null,
    video_role = 'new_format',
}) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // SEG 0: Product detail (5s) — was SEG 1
    // SEG 1: Scan screen   (5s) — was SEG 0
    // SEG 2: End logo      (5s)
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
        const dur = DURATIONS[idx];
        const end = start + dur;
        if (frame < start) return 0;
        if (frame < start + 12) return (frame - start) / 12;
        if (frame < end) return 1;
        if (frame < end + 12) return 1 - (frame - end) / 12;
        return 0;
    };

    // Concern helpers
    const allConcerns = concerns && concerns.length > 0 ? concerns : ['redness'];
    const isMultiConcern = allConcerns.length >= 2;
    const getConcernName = (c) => c.charAt(0).toUpperCase() + c.slice(1);

    const getScore = (key) => {
        if (!metrics) return score;
        const lk = key.toLowerCase();
        // 1. exact match, 2. lowercase match, 3. partial/alias match ("pores" ↔ "visible pores")
        if (metrics[key] !== undefined) return metrics[key];
        if (metrics[lk] !== undefined) return metrics[lk];
        const found = Object.entries(metrics).find(([k]) => {
            const kl = k.toLowerCase();
            return kl === lk || kl.includes(lk) || lk.includes(kl);
        });
        return found ? found[1] : score;
    };

    const concernData = allConcerns.map(c => ({ key: c, name: getConcernName(c), value: getScore(c) }));
    const highlightMetric = allConcerns[0];
    const concernName = getConcernName(highlightMetric);
    const concernsStr = allConcerns.map(c => getConcernName(c)).join(', ');

    // Mask URL resolver
    const getMaskUrl = (maskProp, concernKey) => {
        if (!maskProp) return null;
        if (typeof maskProp === 'string') return maskProp;
        if (typeof maskProp === 'object') {
            const lk = concernKey.toLowerCase();
            // 1. exact match, 2. lowercase match, 3. partial/alias match ("pores" ↔ "visible pores")
            if (maskProp[concernKey] !== undefined) return maskProp[concernKey];
            if (maskProp[lk] !== undefined) return maskProp[lk];
            const found = Object.entries(maskProp).find(([k]) => {
                const kl = k.toLowerCase();
                return kl === lk || kl.includes(lk) || lk.includes(kl);
            });
            return found ? found[1] : null;
        }
        return null;
    };

    // Multi-concern mask: each concern gets its own scan screen within SEG 1
    const isMultiConcernMask = mask_enabled === 'on' && allConcerns.length > 1;

    const cleanDate = date && date.includes(',') ? date.split(',')[0].trim() : date;
    const cleanCreator = creator_name ? (creator_name.startsWith('@') ? creator_name : `@${creator_name}`) : '@MagicMirror';
    const effectiveCategory = product_category || category_name;

    const getInitials = (brand, product) => {
        if (brand) { const p = brand.trim().split(/\s+/); return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : brand.slice(0, 2).toUpperCase(); }
        if (product) { const p = product.trim().split(/\s+/); return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : product.slice(0, 2).toUpperCase(); }
        return 'MM';
    };
    const initials = getInitials(brand_name, product_name);
    const logoText = brand_name ? brand_name.toUpperCase() : (product_name ? product_name.toUpperCase() : 'MAGIC MIRROR');

    // SEG 0 animations (product detail) fire from frame 0
    const s0f = frame;
    const line1Opacity = interpolate(s0f, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const line1Y = interpolate(s0f, [10, 30], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const line2Opacity = interpolate(s0f, [25, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const line2Y = interpolate(s0f, [25, 45], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const panelOpacity = interpolate(s0f, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
    const panelY = interpolate(s0f, [55, 80], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

    return (
        <AbsoluteFill style={{ backgroundColor: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <style dangerouslySetInnerHTML={{ __html: `
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
          .nf-screenport { width: 1080px; height: 1920px; background: #fff; position: relative; overflow: hidden; font-family: 'Montserrat', sans-serif; }
          .nf-progress-bar { position: absolute; top: 40px; left: 45px; right: 45px; display: flex; gap: 12px; z-index: 100; }
          .nf-pb-seg { flex: 1; height: 10px; border-radius: 10px; background: rgba(0,0,0,0.08); overflow: hidden; }
          .nf-pb-fill { height: 100%; border-radius: 5px; width: 0%; background: #1D9E75; }
          .nf-seg { position: absolute; inset: 0; display: flex; flex-direction: column; }
          .nf-seg-scan { background: #fff; padding: 180px 45px 60px; display: flex; flex-direction: column; justify-content: flex-start; }
          .nf-eyebrow { font-size: 33px; letter-spacing: 0.14em; font-weight: 700; color: #718096; text-transform: uppercase; margin-bottom: 38px; text-align: left; }
          .nf-card { border-radius: 60px; padding: 38px; position: relative; width: 100%; box-sizing: border-box; background: #D6CFC8; border: 3px solid #B4ADA6; }
          .nf-photo-frame { border-radius: 44px; overflow: hidden; width: 100%; height: auto; background: transparent; position: relative; }
          .nf-photo-frame img { width: 100%; height: auto; max-height: 980px; display: block; border-radius: 44px; object-fit: cover; }
          .nf-stat-row { margin-top: 50px; border-radius: 55px; padding: 55px 60px; display: flex; align-items: center; justify-content: space-between; background: #D6CFC8; border: 3px solid #B4ADA6; }
          .nf-stat-label { font-size: 33px; font-weight: 700; letter-spacing: 0.1em; color: #718096; text-transform: uppercase; margin-bottom: 16px; text-align: left; }
          .nf-stat-value { font-size: 104px; font-weight: 800; line-height: 1.0; color: #0c151d; text-align: left; }
          .nf-stat-value span { font-size: 50px; font-weight: 600; color: #718096; }
          .nf-divider { width: 3px; height: 126px; margin: 0 50px; background: #B4ADA6; }
          .nf-date-block { display: flex; align-items: center; gap: 28px; }
          .nf-date-icon { width: 93px; height: 93px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 3px solid #B4ADA6; }
          .nf-date-icon svg { width: 44px; height: 44px; stroke: #718096; }
          .nf-date-value { font-size: 41px; font-weight: 700; color: #0c151d; text-align: left; }
          .nf-seg-end { background: #fff; align-items: center; justify-content: center; text-align: center; padding: 100px 60px; display: flex; flex-direction: column; }
        ` }} />

            <div className="nf-screenport">

                {/* Progress Bar */}
                <div className="nf-progress-bar">
                    {DURATIONS.map((_, idx) => {
                        let w = '0%';
                        if (idx < currentSeg) w = '100%';
                        else if (idx === currentSeg) w = `${segProgress * 100}%`;
                        return <div key={idx} className="nf-pb-seg"><div className="nf-pb-fill" style={{ width: w }} /></div>;
                    })}
                </div>

                {currentSeg !== 2 && <Watermark opacity={1} />}

                {/* ═══════════════════════════════════════
                    SEG 0: PRODUCT DETAIL (was SEG 1)
                ═══════════════════════════════════════ */}
                <div className="nf-seg" style={{
                    background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                    alignItems: 'center', padding: '120px 60px 100px', boxSizing: 'border-box',
                    opacity: getSegOpacity(0), pointerEvents: currentSeg === 0 ? 'auto' : 'none',
                    position: 'absolute', inset: 0,
                }}>
                    {/* Magic Mirror lockup */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 20, opacity: line1Opacity, transform: `translateY(${line1Y}px)` }}>
                        <div style={{ width: 70, height: 70, borderRadius: '50%', backgroundColor: '#fff', boxShadow: '0 8px 24px rgba(0,0,0,0.08)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', flexShrink: 0 }}>
                            <Img src={mmLogo} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.6)' }} alt="Magic Mirror Logo" />
                        </div>
                        <div style={{ fontSize: 44, fontWeight: 800, color: '#1A202C', letterSpacing: '0.03em', fontFamily: 'Montserrat, sans-serif' }}>MAGIC MIRROR</div>
                    </div>

                    <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#888780', textAlign: 'center', marginBottom: 60, fontFamily: 'Montserrat, sans-serif', opacity: line1Opacity, transform: `translateY(${line1Y}px)` }} />

                    {/* Product unit — brand_name_visible controls display */}
                    {brand_name_visible ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 40, margin: '0 0 60px 0', width: '100%', opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}>
                            <div style={{ width: 250, height: 250, borderRadius: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                                {product_image_url ? (
                                    <Img src={product_image_url} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 36 }} alt="Product" />
                                ) : (
                                    <div style={{ width: '100%', height: '100%', backgroundColor: '#fff', border: '4px solid #1A202C', borderRadius: 36, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontSize: 36, fontWeight: 700, color: '#1A202C', textAlign: 'center', lineHeight: 1.2, fontFamily: 'Montserrat, sans-serif' }}>{initials}</span>
                                        <span style={{ fontSize: 18, fontWeight: 500, color: '#1A202C', textAlign: 'center', marginTop: 4, lineHeight: 1.1, fontFamily: 'Montserrat, sans-serif' }}>{logoText}</span>
                                    </div>
                                )}
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: 72, fontWeight: 800, color: '#1A202C', lineHeight: 1.1, fontFamily: 'Montserrat, sans-serif' }}>{product_name || 'Hand Lotion'}</div>
                                {brand_name && <div style={{ fontSize: 44, fontWeight: 600, color: '#10AFCC', marginTop: 10, fontFamily: 'Montserrat, sans-serif' }}>by {brand_name}</div>}
                            </div>
                        </div>
                    ) : effectiveCategory ? (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 0 60px 0', width: '100%', opacity: line2Opacity, transform: `translateY(${line2Y}px)` }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#10AFCC', color: '#fff', fontSize: 54, fontWeight: 700, fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.04em', padding: '22px 60px', borderRadius: 60 }}>
                                {effectiveCategory}
                            </div>
                        </div>
                    ) : (
                        <div style={{ height: 40 }} />
                    )}

                    {/* Info pills */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', opacity: panelOpacity, transform: `translateY(${panelY}px)` }}>
                        <div style={{ backgroundColor: '#10AFCC', borderRadius: 36, padding: '36px 50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box', width: '100%' }}>
                            <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'Montserrat, sans-serif' }}>Concern Tracked</div>
                            <div style={{ fontSize: 44, fontWeight: 700, color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>{concernsStr}</div>
                        </div>
                        <div style={{ backgroundColor: '#1A202C', borderRadius: 36, padding: '36px 50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box', width: '100%' }}>
                            <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'Montserrat, sans-serif' }}>Date</div>
                            <div style={{ fontSize: 44, fontWeight: 700, color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>{date}</div>
                        </div>
                        <div style={{ backgroundColor: '#10AFCC', borderRadius: 36, padding: '36px 50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box', width: '100%' }}>
                            <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'Montserrat, sans-serif' }}>Tracked by</div>
                            <div style={{ fontSize: 44, fontWeight: 700, color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>{cleanCreator}</div>
                        </div>
                        {concernData.map((cd, i) => (
                            <div key={cd.key} style={{ backgroundColor: i % 2 === 0 ? '#1A202C' : '#10AFCC', borderRadius: 36, padding: '36px 50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxSizing: 'border-box', width: '100%' }}>
                                <div style={{ fontSize: 32, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', fontFamily: 'Montserrat, sans-serif' }}>{cd.name} Score</div>
                                <div style={{ fontSize: 44, fontWeight: 700, color: '#fff', fontFamily: 'Montserrat, sans-serif' }}>{cd.value} / 100</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═══════════════════════════════════════
                    SEG 1: SCAN SCREEN (was SEG 0)
                    • Single concern OR multi + mask OFF → one screen
                    • Multi + mask ON → one screen per concern
                ═══════════════════════════════════════ */}

                {!isMultiConcernMask && (
                    <div className="nf-seg nf-seg-scan" style={{ opacity: getSegOpacity(1), pointerEvents: currentSeg === 1 ? 'auto' : 'none' }}>
                        <div className="nf-eyebrow">{concernsStr}</div>
                        <div className="nf-card">
                            <div className="nf-photo-frame">
                                {image_url ? (
                                    <Img src={image_url} style={{ width: '100%', height: 'auto', maxHeight: '980px', display: 'block', borderRadius: '44px', objectFit: 'cover' }} />
                                ) : (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '980px', width: '900px', fontSize: 220, color: 'rgba(0,0,0,0.04)' }}>&#9786;</div>
                                )}
                                {mask_enabled === 'on' && getMaskUrl(mask_url, highlightMetric) && (
                                    <Img src={getMaskUrl(mask_url, highlightMetric)} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', borderRadius: '44px' }} />
                                )}
                            </div>
                        </div>

                        {isMultiConcern ? (
                            /* Side-by-side score boxes + date */
                            <div style={{ display: 'flex', gap: 20, marginTop: 50, width: '100%' }}>
                                {concernData.map((cd) => (
                                    <div key={cd.key} style={{ flex: 1, backgroundColor: '#D6CFC8', border: '3px solid #B4ADA6', borderRadius: 44, padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 8, boxSizing: 'border-box' }}>
                                        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.1em', color: '#718096', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif' }}>{cd.name}</div>
                                        <div style={{ fontSize: 80, fontWeight: 800, color: '#0c151d', lineHeight: 1.0, fontFamily: 'Montserrat, sans-serif' }}>{cd.value}<span style={{ fontSize: 38, fontWeight: 600, color: '#718096' }}>/100</span></div>
                                    </div>
                                ))}
                                <div style={{ backgroundColor: '#D6CFC8', border: '3px solid #B4ADA6', borderRadius: 44, padding: '36px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8, boxSizing: 'border-box', minWidth: 200 }}>
                                    <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.1em', color: '#718096', textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif' }}>Date</div>
                                    <div style={{ fontSize: 42, fontWeight: 700, color: '#0c151d', fontFamily: 'Montserrat, sans-serif' }}>{cleanDate}</div>
                                </div>
                            </div>
                        ) : (
                            <div className="nf-stat-row">
                                <div>
                                    <div className="nf-stat-label">{concernName} Score</div>
                                    <div className="nf-stat-value">{getScore(highlightMetric)}<span>/100</span></div>
                                </div>
                                <div className="nf-divider" />
                                <div className="nf-date-block">
                                    <div className="nf-date-icon">
                                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="nf-stat-label">Date</div>
                                        <div className="nf-date-value">{cleanDate}</div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Multi-concern + mask ON: one scan screen per concern within SEG 1 time */}
                {isMultiConcernMask && allConcerns.map((concern, cIdx) => {
                    const perDur = Math.floor(150 / allConcerns.length);
                    const cStart = 150 + cIdx * perDur;
                    const cEnd = cIdx === allConcerns.length - 1 ? 300 : cStart + perDur;
                    const cName = getConcernName(concern);
                    const cScore = getScore(concern);
                    const cMask = getMaskUrl(mask_url, concern);
                    const cOp = (() => {
                        if (frame < cStart) return 0;
                        if (frame < cStart + 12) return (frame - cStart) / 12;
                        if (frame < cEnd) return 1;
                        if (frame < cEnd + 12) return 1 - (frame - cEnd) / 12;
                        return 0;
                    })();
                    return (
                        <div key={concern} className="nf-seg nf-seg-scan" style={{ opacity: cOp, pointerEvents: cOp > 0 ? 'auto' : 'none' }}>
                            <div className="nf-eyebrow">{cName}</div>
                            <div className="nf-card">
                                <div className="nf-photo-frame">
                                    {image_url ? (
                                        <Img src={image_url} style={{ width: '100%', height: 'auto', maxHeight: '980px', display: 'block', borderRadius: '44px', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '980px', width: '900px', fontSize: 220, color: 'rgba(0,0,0,0.04)' }}>&#9786;</div>
                                    )}
                                    {cMask && <Img src={cMask} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', borderRadius: '44px' }} />}
                                </div>
                            </div>
                            <div className="nf-stat-row">
                                <div>
                                    <div className="nf-stat-label">{cName} Score</div>
                                    <div className="nf-stat-value">{cScore}<span>/100</span></div>
                                </div>
                                <div className="nf-divider" />
                                <div className="nf-date-block">
                                    <div className="nf-date-icon">
                                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="nf-stat-label">Date</div>
                                        <div className="nf-date-value">{cleanDate}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* ═══════════════════════════════════════
                    SEG 2: END LOGO SCREEN
                ═══════════════════════════════════════ */}
                <div className="nf-seg nf-seg-end" style={{ opacity: getSegOpacity(2), pointerEvents: currentSeg === 2 ? 'auto' : 'none', position: 'absolute', inset: 0 }}>
                    <div style={{ marginBottom: 40 }}>
                        <Img src={mmLogo} style={{ width: 320, height: 320, objectFit: 'contain' }} />
                    </div>
                    <h2 style={{ fontSize: 26, letterSpacing: 4.5, color: '#718096', fontWeight: '600', textTransform: 'uppercase', margin: 0 }}>VERIFIED BY</h2>
                    <h1 style={{ fontSize: 60, fontWeight: '900', letterSpacing: 6, color: '#1A202C', marginTop: 15, marginBottom: 0, textTransform: 'uppercase', lineHeight: 1 }}>MAGIC MIRROR</h1>
                    <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,#1D9E75,transparent)', width: '60%', margin: '15px auto' }} />
                    <p style={{ fontSize: 30, color: '#10AFCC', letterSpacing: 2, fontWeight: '600', textTransform: 'uppercase', margin: '30px 0 0 0' }}>OWN YOUR SKIN HEALTH</p>
                    <p style={{ position: 'absolute', bottom: 80, left: 0, right: 0, textAlign: 'center', fontSize: 35, color: '#10AFCC', fontWeight: '500', padding: '0 40px', lineHeight: 1.4 }}>
                        Results reflect my personal experience. Individual outcomes may vary based on skin condition and lifestyle.
                    </p>
                </div>

            </div>
        </AbsoluteFill>
    );
};
