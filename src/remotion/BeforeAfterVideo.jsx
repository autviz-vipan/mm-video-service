import { AbsoluteFill, useCurrentFrame, Img, interpolate } from 'remotion';
import React from 'react';
import mmLogo from './MM logo.jpg';

const Watermark = ({ opacity = 1, currentSeg = 0 }) => {
  const magicTextColor = '#1A202C';
  return (
    <div style={{
      position: 'absolute',
      bottom: 60,
      left: 60,
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      pointerEvents: 'none',
      opacity: opacity,
    }}>
      <div style={{
        width: 80,
        height: 80,
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
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', lineHeight: 1.0 }}>
        <span style={{
          fontSize: 28,
          lineHeight: 1.0,
          fontWeight: 800,
          color: magicTextColor,
          fontFamily: 'Montserrat, sans-serif'
        }}>
          MAGIC
        </span>
        <span style={{
          fontSize: 28,
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

  const DARK_SEGS = [];

  const cleanBeforeDate = before_date.includes(',') ? before_date.split(',')[0].trim() : before_date;
  const cleanAfterDate = after_date.includes(',') ? after_date.split(',')[0].trim() : after_date;
  const cleanCreator = creator_name ? (creator_name.startsWith('@') ? creator_name : `@${creator_name}`) : '@MagicMirror';

  // Statement Segment animations and formatting
  const seg3Frame = frame - 312;
  const line1Opacity = interpolate(seg3Frame, [10, 30], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line1Y = interpolate(seg3Frame, [10, 30], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Opacity = interpolate(seg3Frame, [25, 45], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const line2Y = interpolate(seg3Frame, [25, 45], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const panelOpacity = interpolate(seg3Frame, [55, 80], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const panelY = interpolate(seg3Frame, [55, 80], [30, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const testerName = cleanCreator;

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
  const trackingPeriodStr = `${before_date} → ${after_date}`;
  const concernsStr = concerns && concerns.length > 0
    ? concerns.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(', ')
    : 'Redness';

  return (
    <AbsoluteFill style={{
      backgroundColor: '#ffffff',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
          
          .screenport {
            width: 1080px;
            height: 1920px;
            background: #ffffff;
            position: relative;
            overflow: hidden;
            font-family: 'Montserrat', sans-serif;
          }

          /* ── PROGRESS BAR ── */
          .progress-bar {
            position: absolute;
            top: 40px;
            left: 45px;
            right: 45px;
            display: flex;
            gap: 12px;
            z-index: 100;
          }
          .pb-seg {
            flex: 1;
            height: 10px;
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.08);
            overflow: hidden;
          }
          .pb-seg.pb-light {
            background: rgba(255, 255, 255, 0.22);
          }
          .pb-fill {
            height: 100%;
            border-radius: 5px;
            width: 0%;
          }
          .pb-light .pb-fill { background: #fff; }
          .pb-dark .pb-fill  { background: #1D9E75; }

          .seg {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
          }

          /* ── SEG 1: BEFORE ── */
          .seg-before {
            background: #ffffff;
          }
          .photo-block {
            position: relative;
            width: calc(100% - 90px);
            height: 1150px;
            margin: 100px auto 0;
            border-radius: 36px;
            overflow: hidden;
            background: #ffffff;
          }
          .photo-block img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .badge-pill {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 10px 24px;
            border-radius: 40px;
            font-size: 22px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            border: 1px solid;
            width: fit-content;
          }
          .badge-before {
            background: rgba(255,255,255,0.07);
            border-color: rgba(255,255,255,0.15);
            color: rgba(255,255,255,0.75);
          }
          .badge-after {
            background: rgba(29,158,117,0.2);
            border-color: rgba(29,158,117,0.4);
            color: #4ecca3;
          }
          
          .score-block {
            background: #ffffff;
            height: 670px;
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: flex-start;
            padding: 40px 80px 50px;
            gap: 12px;
            box-sizing: border-box;
          }
          .score-block-title {
            font-size: 30px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: #10AFCC;
            margin-bottom: 4px;
            text-align: right;
          }
          .score-block-value {
            font-size: 160px;
            font-weight: 800;
            line-height: 1;
            color: #1A202C;
            font-family: 'Montserrat', sans-serif;
            letter-spacing: -4px;
            text-align: right;
            display: flex;
            align-items: baseline;
          }
          .score-block-value.teal {
            color: #1D9E75;
          }
          .score-block-max {
            font-size: 70px;
            font-weight: 500;
            color: #a0aec0;
            margin-left: 10px;
            letter-spacing: 0;
          }
          .score-block-date {
            font-size: 30px;
            font-weight: 500;
            color: #718096;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-top: 0px;
            text-align: right;
          }

          /* ── SEG 2: AFTER ── */
          .seg-after {
            background: #ffffff;
          }
          .seg-after .photo-block {
            background: #ffffff;
          }

          /* ── SEG 3: COMPARE ── */
          .seg-compare {
            background: #f7f4f0;
            padding: 120px 40px 60px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
          .compare-eyebrow {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            color: #9a9490;
            margin-bottom: 50px;
            text-align: left;
            width: 100%;
          }
          .compare-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
            width: 100%;
          }
          .cmp-col {
            display: flex;
            flex-direction: column;
            border-radius: 40px;
            overflow: hidden;
            background: #0c151d;
          }
          .cmp-photo {
            position: relative;
            width: 100%;
            aspect-ratio: 3/4;
            background: #0c151d;
            overflow: hidden;
          }
          .cmp-photo img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          .cmp-photo.after-ph {
            background: #0c151d;
          }
          .cmp-score-block {
            background: #0c151d;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
          }
          .cmp-score-lbl {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.4);
          }
          .cmp-score-val {
            font-size: 120px;
            font-weight: 800;
            line-height: 1;
            color: #fff;
            letter-spacing: -2px;
          }
          .cmp-score-val.teal {
            color: #1D9E75;
          }
          .cmp-score-date {
            font-size: 30px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.35);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 2px;
          }

          /* ── SEG 4: STATEMENT ── */
          .seg-statement {
            background: #fff;
            padding: 150px 60px 60px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
          }
          .stmt-header {
            display: flex;
            align-items: center;
            gap: 40px;
            margin-bottom: 80px;
            width: 100%;
          }
          .stmt-logo-card {
            width: 200px;
            height: 200px;
            background: #0c151d;
            border-radius: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            box-sizing: border-box;
            flex-shrink: 0;
          }
          .stmt-logo-card img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
          .stmt-title-box {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .stmt-product {
            font-size: 60px;
            font-weight: 800;
            color: #0c151d;
            line-height: 1.15;
            text-align: left;
          }
          .stmt-brand {
            font-size: 34px;
            font-weight: 600;
            color: #10AFCC;
            text-align: left;
            margin-top: 10px;
          }
          .stmt-rows {
            display: flex;
            flex-direction: column;
            gap: 28px;
            width: 100%;
          }
          .stmt-pill-row {
            border-radius: 40px;
            padding: 40px 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-height: 130px;
            box-sizing: border-box;
            color: #fff;
            width: 100%;
          }
          .stmt-pill-row.blue {
            background: #10AFCC;
          }
          .stmt-pill-row.dark {
            background: #0c151d;
          }
          .stmt-pill-label {
            font-size: 26px;
            font-weight: 700;
            letter-spacing: 3px;
            text-transform: uppercase;
            opacity: 0.85;
          }
          .stmt-pill-value {
            font-size: 38px;
            font-weight: 800;
            text-align: right;
          }
          .stmt-pill-value.small {
            font-size: 30px;
          }

          /* ── SEG 5: END CARD ── */
          .seg-end {
            background: #ffffff;
            align-items: center; justify-content: center; text-align: center; padding: 100px 60px;
            display: flex;
            flex-direction: column;
          }
          
          .tag-before { background: #8a8278; }
        `
      }} />

      <div className="screenport">
        {/* Progress Bar */}
        <div className="progress-bar">
          {DURATIONS.map((_, idx) => {
            let widthPct = '0%';
            if (idx < currentSeg) widthPct = '100%';
            else if (idx === currentSeg) widthPct = `${segProgress * 100}%`;

            const segClass = DARK_SEGS.includes(idx) ? 'pb-light' : 'pb-dark';
            return (
              <div key={idx} className={`pb-seg ${segClass}`}>
                <div className="pb-fill" style={{ width: widthPct }} />
              </div>
            );
          })}
        </div>

        {/* Watermark (Every page except the last one) */}
        {currentSeg < 4 && (
          <Watermark currentSeg={currentSeg} />
        )}

        {/* SEG 1: BEFORE */}
        <div className="seg seg-before" style={{ opacity: getSegOpacity(0), pointerEvents: currentSeg === 0 ? 'auto' : 'none' }}>
          <div className="photo-block">
            {before_image_url ? (
              <Img src={before_image_url} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 220, color: 'rgba(0,0,0,0.04)' }}>&#9786;</div>
            )}
            {mask_enabled === 'on' && before_mask_url && (
              <Img src={before_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
            )}
            <div className="badge-pill badge-before" style={{ position: 'absolute', top: 100, left: 60 }}>Before</div>
          </div>

          <div className="score-block">
            <div className="score-block-title">{concernName.toUpperCase()}</div>
            <div className="score-block-date">{before_date}</div>
            <div className="score-block-value">
              {beforeScore}
              <span className="score-block-max">/ 100</span>
            </div>
          </div>
        </div>

        {/* SEG 2: AFTER */}
        <div className="seg seg-after" style={{ opacity: getSegOpacity(1), pointerEvents: currentSeg === 1 ? 'auto' : 'none' }}>
          <div className="photo-block">
            {after_image_url ? (
              <Img src={after_image_url} />
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 220, color: 'rgba(0,0,0,0.04)' }}>&#9786;</div>
            )}
            {mask_enabled === 'on' && after_mask_url && (
              <Img src={after_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
            )}
            <div className="badge-pill badge-after" style={{ position: 'absolute', top: 100, right: 60 }}>After</div>
          </div>

          <div className="score-block">
            <div className="score-block-title">{concernName.toUpperCase()}</div>
            <div className="score-block-date">{after_date}</div>
            <div className="score-block-value teal">
              {afterScore}
              <span className="score-block-max">/ 100</span>
            </div>
          </div>
        </div>

        {/* SEG 3: COMPARE */}
        <div className="seg seg-compare" style={{ opacity: getSegOpacity(2), pointerEvents: currentSeg === 2 ? 'auto' : 'none' }}>
          <div className="compare-eyebrow">{concernName} &nbsp;·&nbsp; Side by side</div>
          <div className="compare-grid">
            <div className="cmp-col">
              <div className="cmp-photo">
                {before_image_url ? (
                  <Img src={before_image_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 140, color: 'rgba(0,0,0,0.06)' }}>&#9786;</div>
                )}
                {mask_enabled === 'on' && before_mask_url && (
                  <Img src={before_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                )}
              </div>
              <div className="cmp-score-block">
                <div className="cmp-score-lbl">SCORE</div>
                <div className="cmp-score-val">{beforeScore}</div>
                <div className="cmp-score-date">{before_date}</div>
              </div>
            </div>

            <div className="cmp-col">
              <div className="cmp-photo after-ph">
                {after_image_url ? (
                  <Img src={after_image_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: 140, color: 'rgba(0,0,0,0.06)' }}>&#9786;</div>
                )}
                {mask_enabled === 'on' && after_mask_url && (
                  <Img src={after_mask_url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }} />
                )}
              </div>
              <div className="cmp-score-block">
                <div className="cmp-score-lbl">SCORE</div>
                <div className="cmp-score-val teal">{afterScore}</div>
                <div className="cmp-score-date">{after_date}</div>
              </div>
            </div>
          </div>
        </div>

        {/* SEG 4: STATEMENT */}
        <div className="seg seg-statement" style={{
          background: '#FFF0F2',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '120px 60px 100px',
          boxSizing: 'border-box',
          opacity: getSegOpacity(3),
          pointerEvents: currentSeg === 3 ? 'auto' : 'none',
          position: 'absolute',
          inset: 0,
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
            {/* Tested For */}
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
                Tested for
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

            {/* Score Change */}
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
                Score change
              </div>
              <div style={{ fontSize: 44, fontWeight: 700, color: '#ffffff', fontFamily: 'Montserrat, sans-serif' }}>
                {diffText} pts ({beforeScore}→{afterScore})
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
