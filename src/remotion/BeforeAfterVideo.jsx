import { AbsoluteFill, useCurrentFrame, Img } from 'remotion';
import React from 'react';
import mmLogo from './MM logo.jpg';

const Watermark = ({ opacity = 1, currentSeg = 0 }) => {
  const magicTextColor = currentSeg < 2 ? '#FFFFFF' : '#1A202C';
  return (
    <div style={{
      position: 'absolute',
      bottom: 28,
      left: 25,
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      pointerEvents: 'none',
      opacity: opacity,
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        flexShrink: 0
      }}>
        <Img src={mmLogo} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="Magic Mirror Logo" />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.0 }}>
        <span style={{
          fontSize: 12,
          lineHeight: 1.0,
          fontWeight: 800,
          color: magicTextColor,
          fontFamily: 'Montserrat, sans-serif'
        }}>
          MAGIC
        </span>
        <span style={{
          fontSize: 12,
          lineHeight: 1.0,
          fontWeight: 800,
          color: '#10AFCC',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          MIRROR
        </span>
      </div>
    </div>
  );
};

export const BeforeAfterVideo = ({
  product_name = "O2 Peptide Firm Perfect Cream",
  brand_name = "Element Eight",
  creator_name = "",
  concerns = ["Redness"],
  product_image_url = "",
  platform = "reels",
  style = "",
  mask_enabled = "off",
  before_image_url = "",
  after_image_url = "",
  before_mask_url = null,
  after_mask_url = null,
  before_date = "Apr 16, 2026",
  after_date = "Jun 10, 2026",
  before_metrics = { redness: 49 },
  after_metrics = { redness: 71 },
  video_role = "before_after"
}) => {
  const frame = useCurrentFrame();

  const highlightMetric = concerns && concerns.length > 0 ? concerns[0] : 'redness';
  // Capitalize concern name
  const concernName = highlightMetric
    ? highlightMetric.charAt(0).toUpperCase() + highlightMetric.slice(1)
    : 'Redness';

  // Get before & after scores dynamically
  const beforeScore = before_metrics?.[highlightMetric] || before_metrics?.[highlightMetric.toLowerCase()] || 49;
  const afterScore = after_metrics?.[highlightMetric] || after_metrics?.[highlightMetric.toLowerCase()] || 71;

  // Calculate score change/improvement
  const diff = afterScore - beforeScore;
  const diffSign = diff > 0 ? '+' : '';
  const diffText = `${diffSign}${diff}`;
  const improvementLabel = diff >= 0 ? 'improvement' : 'decline';

  // Durations in frames: [3.2s, 3.2s, 4s, 4.5s, 3.6s] at 30 fps
  const DURATIONS = [96, 96, 120, 135, 108];
  const SEG_START_FRAMES = [0, 96, 192, 312, 447];

  // Determine current active segment & progress inside it
  let currentSeg = 0;
  let segProgress = 0;
  if (frame < 96) {
    currentSeg = 0;
    segProgress = frame / 96;
  } else if (frame < 192) {
    currentSeg = 1;
    segProgress = (frame - 96) / 96;
  } else if (frame < 312) {
    currentSeg = 2;
    segProgress = (frame - 192) / 120;
  } else if (frame < 447) {
    currentSeg = 3;
    segProgress = (frame - 312) / 135;
  } else {
    currentSeg = 4;
    segProgress = Math.min(1, (frame - 447) / 108);
  }

  // Calculate segment opacity for cross-fade simulation matching the CSS 0.4s ease transition
  const getSegOpacity = (idx) => {
    const start = SEG_START_FRAMES[idx];
    const duration = DURATIONS[idx];
    const end = start + duration;

    if (frame < start) {
      return 0;
    }
    if (frame >= start && frame < start + 12) {
      return (frame - start) / 12;
    }
    if (frame >= start + 12 && frame < end) {
      return 1;
    }
    if (frame >= end && frame < end + 12) {
      return 1 - (frame - end) / 12;
    }
    return 0;
  };

  const DARK_SEGS = [0, 1];

  return (
    <AbsoluteFill style={{
      backgroundColor: '#000',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap');
          
          .screenport {
            width: 390px;
            height: 844px;
            background: #000;
            position: relative;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          }

          .progress-bar { position: absolute; top: 16px; left: 14px; right: 14px; display: flex; gap: 5px; z-index: 90; padding-left: 52px; }
          .pb-seg { flex: 1; height: 2.5px; border-radius: 2px; background: rgba(255,255,255,0.22); overflow: hidden; }
          .pb-fill { height: 100%; width: 0%; border-radius: 2px; }
          .pb-light { background: #fff; }
          .pb-dark { background: #1D9E75; }

          .seg { position: absolute; inset: 0; display: flex; flex-direction: column; }

          /* heat blobs */
          .heat { position: absolute; inset: 0; pointer-events: none; }
          .h-forehead { position: absolute; left: 12%; right: 12%; top: 8%; height: 26%; background: radial-gradient(ellipse at 50% 50%, rgba(218,72,48,0.82) 0%, transparent 70%); border-radius: 50%; filter: blur(8px); }
          .h-lcheek { position: absolute; left: 4%; top: 44%; width: 36%; height: 28%; background: radial-gradient(ellipse at 50% 50%, rgba(224,80,52,0.88) 0%, transparent 70%); border-radius: 50%; filter: blur(7px); }
          .h-rcheek { position: absolute; right: 4%; top: 44%; width: 36%; height: 28%; background: radial-gradient(ellipse at 50% 50%, rgba(224,80,52,0.88) 0%, transparent 70%); border-radius: 50%; filter: blur(7px); }
          .h-nose { position: absolute; left: 36%; right: 36%; top: 42%; height: 22%; background: radial-gradient(ellipse at 50% 50%, rgba(228,96,60,0.75) 0%, transparent 70%); border-radius: 50%; filter: blur(6px); }
          .h-chin { position: absolute; left: 28%; right: 28%; bottom: 8%; height: 18%; background: radial-gradient(ellipse at 50% 50%, rgba(218,72,48,0.65) 0%, transparent 70%); border-radius: 50%; filter: blur(8px); }
          .h-forehead.dim { opacity: 0.20; } .h-lcheek.dim { opacity: 0.16; } .h-rcheek.dim { opacity: 0.16; } .h-nose.dim { opacity: 0.14; } .h-chin.dim { opacity: 0.12; }

          /* ── SEG 1: BEFORE ── */
          .seg-dark { background: #0c1417; align-items: center; justify-content: center; }
          .seg-after-dark { background: radial-gradient(120% 90% at 50% 30%, #1b2e28 0%, #0c1710 70%, #060c09 100%); align-items: center; justify-content: center; }
          .scan-face { width: 340px; height: 450px; border-radius: 24px; position: relative; overflow: hidden; background: #c8b5a5; }
          .scan-face.after-face { background: #b5cdc0; }
          .scan-oval-ring { position: absolute; inset: 0; border: 1.5px dashed rgba(29,158,117,0.55); border-radius: 24px; }
          .scan-icon-face { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 78px; color: rgba(255,255,255,0.1); }
          .scan-overlay-left { position: absolute; bottom: 0; left: 0; right: 0; padding: 0 0 36px 22px; display: flex; flex-direction: column; gap: 5px; z-index: 10; align-items: flex-start; }
          .scan-overlay-right { position: absolute; bottom: 0; left: 0; right: 0; padding: 0 22px 36px 0; display: flex; flex-direction: column; gap: 5px; z-index: 10; align-items: flex-end; text-align: right; }
          .concern-label { font-size: 10px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: rgba(29,158,117,0.9); }
          .scan-date-lbl { font-size: 13px; color: rgba(255,255,255,0.55); }
          .scan-score-big { font-size: 52px; font-weight: 700; letter-spacing: -1px; line-height: 1; color: #fff; }
          .scan-score-big .unit { font-size: 17px; font-weight: 400; color: rgba(255,255,255,0.45); margin-left: 3px; }
          .ba-tag { display: inline-flex; font-size: 10px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; color: #fff; }
          .tag-before { background: rgba(136,135,128,0.75); }
          .tag-after { background: rgba(29,158,117,0.8); }

          /* ── SEG 3: SIDE BY SIDE ── */
          .seg-compare { background: #FAFAF9; justify-content: center; padding: 56px 18px 24px; }
          .compare-concern { font-size: 10px; font-weight: 700; letter-spacing: 1.4px; text-transform: uppercase; color: #1D9E75; margin-bottom: 14px; }
          .compare-photos { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
          .cmp-wrap { display: flex; flex-direction: column; }
          .cmp-photo { position: relative; border-radius: 14px 14px 0 0; aspect-ratio: 3/4; overflow: hidden; }
          .cmp-bg { position: absolute; inset: 0; }
          .cmp-bg.before { background: #c8b5a5; } .cmp-bg.after { background: #b5cdc0; }
          .cmp-face { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 42px; color: rgba(255,255,255,0.1); }
          .cmp-date { position: absolute; bottom: 6px; left: 6px; background: rgba(0,0,0,0.55); border-radius: 4px; padding: 2px 6px; font-size: 9px; color: #fff; }
          .cmp-lbl { padding: 6px; font-size: 10px; font-weight: 700; letter-spacing: 0.7px; text-transform: uppercase; text-align: center; color: #fff; }
          .cmp-lbl.before { background: #888780; border-radius: 0 0 14px 14px; }
          .cmp-lbl.after { background: #1D9E75; border-radius: 0 0 14px 14px; }
          .delta-hero { margin-top: 22px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 10px; }
          .dh-score { text-align: center; }
          .dh-num { font-size: 26px; font-weight: 700; line-height: 1; }
          .dh-num.b { color: #888780; } .dh-num.a { color: #1D9E75; }
          .dh-lbl { font-size: 9px; color: #bbb; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 3px; }
          .dh-center { display: flex; flex-direction: column; align-items: center; }
          .dh-big { font-size: 46px; font-weight: 700; color: #085041; line-height: 1; }
          .dh-sub { font-size: 9px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #1D9E75; margin-top: 4px; }

          /* ── SEG 4: STATEMENT ── */
          .seg-statement {
            background: radial-gradient(ellipse 160% 80% at 50% -10%, #c8e8e2 0%, #e8f4f2 30%, #f5faf9 60%, #ffffff 100%);
            padding: 0; justify-content: flex-start;
          }
          .stmt-inner { display: flex; flex-direction: column; height: 100%; padding: 48px 20px 20px; }
          .stmt-eyebrow { font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #888; margin-bottom: 4px; }
          .stmt-product-name { font-size: 16px; font-weight: 700; color: #111; line-height: 1.2; margin-bottom: 2px; }
          .stmt-brand-name { font-size: 11px; font-weight: 500; color: #1D9E75; margin-bottom: 16px; }

          .stmt-img-card {
            background: #fff; border-radius: 16px;
            padding: 20px; display: flex; align-items: center; justify-content: center;
            margin-bottom: 16px; height: 130px;
            box-shadow: 0 1px 8px rgba(0,0,0,0.06);
          }
          .stmt-img-placeholder { width: 70px; height: 70px; border-radius: 50%; background: #E1F5EE; display: flex; align-items: center; justify-content: center; font-size: 30px; color: #1D9E75; }

          .stmt-rows { display: flex; flex-direction: column; gap: 8px; flex: 1; }
          .stmt-row {
            background: #fff; border-radius: 12px;
            padding: 10px 14px; display: flex; align-items: center; gap: 12px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.04);
          }
          .stmt-row-label { font-size: 9px; font-weight: 700; letter-spacing: 1.2px; text-transform: uppercase; color: #bbb; min-width: 72px; line-height: 1.3; }
          .stmt-row-value { font-size: 13px; font-weight: 600; color: #111; display: flex; align-items: center; gap: 6px; }
          .stmt-row-dot { width: 7px; height: 7px; border-radius: 50%; background: #1D9E75; flex-shrink: 0; }
          .stmt-row-value .arrow { color: #bbb; font-size: 11px; margin: 0 2px; }
          .stmt-row-value .improvement { color: #085041; font-weight: 700; font-size: 14px; }
          .stmt-row-value .scores { color: #888; font-size: 11px; font-weight: 500; }

          .stmt-logo-row { display: flex; align-items: center; gap: 8px; margin-top: 14px; }
          .stmt-logo-circle { width: 28px; height: 28px; border-radius: 50%; background: #E1F5EE; display: flex; align-items: center; justify-content: center; }
          .stmt-logo-circle svg { width: 16px; height: 16px; }
          .stmt-logo-text { display: flex; flex-direction: column; line-height: 1; }
          .stmt-logo-text .l1 { font-size: 8px; font-weight: 700; letter-spacing: 0.5px; color: #333; }
          .stmt-logo-text .l2 { font-size: 8px; font-weight: 700; letter-spacing: 0.5px; color: #1D9E75; }

          /* ── SEG 5: END CARD ── */
          .seg-end {
            background: linear-gradient(180deg, rgba(16, 175, 204, 0.08) 0%, #ffffff 35%, #ffffff 65%, rgba(16, 175, 204, 0.08) 100%);
            align-items: center; justify-content: center; text-align: center; padding: 40px 24px;
            display: flex;
            flex-direction: column;
          }
        `
      }} />

      <div className="screenport">
        {/* Progress Bar */}
        <div className="progress-bar">
          {DURATIONS.map((_, idx) => {
            let widthPct = '0%';
            if (idx < currentSeg) widthPct = '100%';
            else if (idx === currentSeg) widthPct = `${segProgress * 100}%`;

            const fillClass = DARK_SEGS.includes(idx) ? 'pb-light' : 'pb-dark';
            return (
              <div key={idx} className="pb-seg">
                <div className={`pb-fill ${fillClass}`} style={{ width: widthPct }} />
              </div>
            );
          })}
        </div>

        {/* Watermark (Every page except the last one) */}
        {currentSeg < 4 && (
          <Watermark currentSeg={currentSeg} />
        )}

        {/* SEG 1: BEFORE */}
        <div className="seg seg-dark" style={{ opacity: getSegOpacity(0), pointerEvents: currentSeg === 0 ? 'auto' : 'none' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="scan-face">
              {before_image_url ? (
                <Img src={before_image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div className="scan-icon-face">&#9786;</div>
              )}
              {mask_enabled === 'on' && before_mask_url && (
                <Img src={before_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
              )}

              <div className="scan-oval-ring"></div>
            </div>
          </div>
          <div className="scan-overlay-left">
            <div className="concern-label">{concernName}</div>
            <div className="scan-date-lbl">{before_date}</div>
            <div className="scan-score-big">{beforeScore}<span className="unit">/ 100</span></div>
            <div className="ba-tag tag-before">Before</div>
          </div>
        </div>

        {/* SEG 2: AFTER */}
        <div className="seg seg-after-dark" style={{ opacity: getSegOpacity(1), pointerEvents: currentSeg === 1 ? 'auto' : 'none' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="scan-face after-face">
              {after_image_url ? (
                <Img src={after_image_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div className="scan-icon-face">&#9786;</div>
              )}
              {mask_enabled === 'on' && after_mask_url && (
                <Img src={after_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
              )}

              <div className="scan-oval-ring"></div>
            </div>
          </div>
          <div className="scan-overlay-right">
            <div className="concern-label">{concernName}</div>
            <div className="scan-date-lbl">{after_date}</div>
            <div className="scan-score-big">{afterScore}<span className="unit">/ 100</span></div>
            <div className="ba-tag tag-after">After</div>
          </div>
        </div>

        {/* SEG 3: SIDE BY SIDE */}
        <div className="seg seg-compare" style={{ opacity: getSegOpacity(2), pointerEvents: currentSeg === 2 ? 'auto' : 'none' }}>
          <div className="compare-concern">{concernName}</div>
          <div className="compare-photos">
            <div className="cmp-wrap">
              <div className="cmp-photo">
                {before_image_url ? (
                  <Img src={before_image_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="cmp-bg before"></div>
                )}
                {mask_enabled === 'on' && before_mask_url && (
                  <Img src={before_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                )}

                {!before_image_url && <div className="cmp-face">&#9786;</div>}
                <div className="cmp-date">{before_date}</div>
              </div>
              <div className="cmp-lbl before">Before</div>
            </div>
            <div className="cmp-wrap">
              <div className="cmp-photo">
                {after_image_url ? (
                  <Img src={after_image_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="cmp-bg after"></div>
                )}
                {mask_enabled === 'on' && after_mask_url && (
                  <Img src={after_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                )}

                {!after_image_url && <div className="cmp-face">&#9786;</div>}
                <div className="cmp-date">{after_date}</div>
              </div>
              <div className="cmp-lbl after">After</div>
            </div>
          </div>
          <div className="delta-hero">
            <div className="dh-score">
              <div className="dh-num b">{beforeScore}</div>
              <div className="dh-lbl">Before</div>
            </div>
            <div className="dh-center">
              <div className="dh-big">{diffText}</div>
              <div className="dh-sub">{improvementLabel}</div>
            </div>
            <div className="dh-score">
              <div className="dh-num a">{afterScore}</div>
              <div className="dh-lbl">After</div>
            </div>
          </div>
        </div>

        {/* SEG 4: STATEMENT */}
        <div className="seg seg-statement" style={{ opacity: getSegOpacity(3), pointerEvents: currentSeg === 3 ? 'auto' : 'none' }}>
          <div className="stmt-inner">
            <div className="stmt-eyebrow">Before &amp; After · {concernName}</div>
            <div className="stmt-product-name">{product_name}</div>
            {brand_name && <div className="stmt-brand-name">by {brand_name}</div>}

            <div className="stmt-img-card">
              {product_image_url ? (
                <Img src={product_image_url} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              ) : (
                <div className="stmt-img-placeholder">&#10022;</div>
              )}
            </div>

            <div className="stmt-rows">
              <div className="stmt-row">
                <div className="stmt-row-label">Testing for</div>
                <div className="stmt-row-value"><span className="stmt-row-dot"></span>{concernName}</div>
              </div>
              <div className="stmt-row">
                <div className="stmt-row-label">Testing period</div>
                <div className="stmt-row-value">{before_date} <span className="arrow">→</span> {after_date}</div>
              </div>
              <div className="stmt-row">
                <div className="stmt-row-label">Score change</div>
                <div className="stmt-row-value">
                  <span className="improvement">{diffText} pts</span>
                  <span className="scores">&nbsp;({beforeScore} → {afterScore})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SEG 5: END CARD */}
        <div className="seg seg-end" style={{
          opacity: getSegOpacity(4),
          pointerEvents: currentSeg === 4 ? 'auto' : 'none',
          position: 'absolute',
          inset: 0
        }}>
          <div style={{ marginBottom: 18 }}>
            <Img src={mmLogo} style={{ width: 130, height: 130, objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: 10, letterSpacing: 1.8, color: '#718096', fontWeight: '600', textTransform: 'uppercase', margin: 0 }}>
            VERIFIED BY
          </h2>
          <h1 style={{ fontSize: 24, fontWeight: '900', letterSpacing: 2.8, color: '#1A202C', marginTop: 5, marginBottom: 0, textTransform: 'uppercase', lineHeight: 1 }}>
            MAGIC MIRROR
          </h1>
          <p style={{ fontSize: 12, color: '#10AFCC', letterSpacing: 0.7, marginTop: 25, fontWeight: '600', textTransform: 'uppercase', margin: '25px 0 0 0' }}>
            OWN YOUR SKIN HEALTH
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
