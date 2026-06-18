import React from 'react';
import { Composition } from 'remotion';
import { ProgressVideo } from './ProgressVideo';
import { BeforeAfterVideo } from './BeforeAfterVideo';
import { SkinHealthTrendVideo } from './skin_health_trend';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ProgressVideo"
        component={ProgressVideo}
        durationInFrames={1030} // 34.33s composition
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          product_name: "Nivya",
          platform: "reels",
          style: "slider_wipe",
          mask_enabled: "off",
          timeline: [
            {
              sequenceIndex: 0,
              date: "MAY 04",
              imageUrl: "https://magic-mirror-prototype.s3.amazonaws.com/images/default_before.jpg",
              metrics: { redness: 87, pigmentation: 52 },
              improvementFromStart: "0.0%"
            },
            {
              sequenceIndex: 1,
              date: "MAY 05",
              imageUrl: "https://magic-mirror-prototype.s3.amazonaws.com/images/default_after.jpg",
              metrics: { redness: 88, pigmentation: 18 },
              improvementFromStart: "+1.1%"
            }
          ],
          overallHighlight: {
            metric: "redness",
            label: "Redness reduction",
            totalImprovement: "↑1"
          }
        }}
      />
      <Composition
        id="BeforeAfterVideo"
        component={BeforeAfterVideo}
        durationInFrames={555}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          product_name: "O2 Peptide Firm Perfect Cream",
          brand_name: "Element Eight",
          creator_name: "",
          concerns: ["Redness"],
          product_image_url: "",
          platform: "reels",
          style: "",
          mask_enabled: "off",
          before_image_url: "https://d34auvch2x824m.cloudfront.net/images/000a7152933843649efe1524dbe1e581.f4b0c5b13c6b4e0aacbf89f66fe49ddc.jpg",
          after_image_url: "https://d34auvch2x824m.cloudfront.net/images/9524bd6457934307ac4007decb3a0e27.84ce1c80c28e43f3940ffb9f72a8812b.jpg",
          before_mask_url: null,
          after_mask_url: null,
          before_date: "Apr 16, 2026",
          after_date: "Jun 10, 2026",
          before_metrics: { redness: 49 },
          after_metrics: { redness: 71 },
          video_role: "before_after"
        }}
      />
      <Composition
        id="SkinHealthTrendVideo"
        component={SkinHealthTrendVideo}
        durationInFrames={810}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          product_name: "Nivyaa",
          brand_name: "Nivya",
          creator_name: "anamika",
          concerns: ["redness"],
          product_start_date: "2026-05-15 00:00:00",
          product_image_url: "",
          platform: "reels",
          style: "side_by_side",
          mask_enabled: "off",
          before_avg: { redness: 48 },
          after_avg: { redness: 71 },
          best_image_url: "",
          best_image_score: 87,
          worst_image_url: "",
          worst_image_score: 42,
          before_timeperiod: "MAY 15, 2026",
          after_timeperiod: "JUN 15, 2026",
        }}
      />
    </>
  );
};
