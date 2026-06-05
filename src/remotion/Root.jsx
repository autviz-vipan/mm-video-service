import React from 'react';
import { Composition } from 'remotion';
import { ProgressVideo } from './ProgressVideo';

export const RemotionRoot = () => {
  return (
    <Composition
      id="ProgressVideo"
      component={ProgressVideo}
      durationInFrames={780} // 26s composition
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
  );
};
