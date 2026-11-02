/**
 * Scene01Cesium — CHỈ phần nền Cesium (zoom vũ trụ → flythrough), KHÔNG overlay.
 * Dùng để pre-render ra mp4 một lần (cần --gl=angle), sau đó Scene01 phát lại
 * video này qua <OffthreadVideo> → render video chính không còn phụ thuộc Cesium.
 */
import React from "react";
import { AbsoluteFill } from "remotion";
import {
  CesiumIntroFlythrough,
  type LngLat,
} from "./cesium/CesiumIntroFlythrough";
import deathValleyPath from "./cesium/deathvalley-path.json";

export const INTRO_FRAMES = 120;

export const Scene01Cesium: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <CesiumIntroFlythrough
        path={deathValleyPath as LngLat[]}
        introDurationInFrames={INTRO_FRAMES}
        spaceAltitude={12_000_000}
        altitudeStart={2400}
        altitudeEnd={1600}
        lookAheadKm={1.5}
        travelKm={13}
        pitchFromNadir={72}
        verticalExaggeration={1.4}
      />
    </AbsoluteFill>
  );
};
