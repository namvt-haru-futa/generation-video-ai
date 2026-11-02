/**
 * Scene 06 — Kết: Punchline
 * 1:22–1:30 (~240 frames)
 * Voice: voice-s06.wav
 * Image: i02-bear-walking-ice.jpg (reuse từ Scene01 — vòng tròn visual)
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import {
  COLORS,
  ImageBg,
  VoiceTrack,
  FadeBlack,
  fadeIn,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS06 } from "./captions";

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Fade in từ đen rất chậm — tạo cảm giác trọng lượng
  const bgOpacity = fadeIn(frame, 0, 30);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Background mờ — gấu nhìn thẳng */}
      <div style={{ opacity: bgOpacity * 0.6 }}>
        <ImageBg
          src="assets/images/i02-bear-walking-ice.jpg"
          colorOverlay="rgba(0,0,0,0.75)"
          scale={1.02}
        />
      </div>

      {/* Center text block */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 32,
          padding: "0 60px",
        }}
      >
        {/* 150.000 năm */}
        {frame >= 15 && (
          <div
            style={{
              color: COLORS.white,
              fontSize: 52,
              fontWeight: 700,
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              lineHeight: 1.4,
              opacity: fadeIn(frame, 15, 20),
              textShadow: "0 2px 16px rgba(0,0,0,1)",
            }}
          >
            150.000 năm sinh tồn.
          </div>
        )}

        {/* Divider */}
        {frame >= 50 && (
          <div
            style={{
              width: interpolate(frame, [50, 80], [0, 260], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              height: 2,
              backgroundColor: COLORS.iceBlue,
              opacity: fadeIn(frame, 50, 15),
            }}
          />
        )}

        {/* Punchline */}
        {frame >= 60 && (
          <div
            style={{
              color: COLORS.iceBlue,
              fontSize: 42,
              fontWeight: 600,
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              lineHeight: 1.5,
              opacity: fadeIn(frame, 60, 25),
              textShadow: "0 2px 12px rgba(0,0,0,1)",
            }}
          >
            Chúng không cần chúng ta cứu —
          </div>
        )}

        {frame >= 110 && (
          <div
            style={{
              color: COLORS.orange,
              fontSize: 50,
              fontWeight: 900,
              fontFamily: "'Arial Black', sans-serif",
              textAlign: "center",
              lineHeight: 1.3,
              opacity: fadeIn(frame, 110, 20),
              textShadow: "0 2px 16px rgba(0,0,0,1)",
              letterSpacing: -1,
            }}
          >
            chúng chỉ cần chúng ta
            <br />
            DỪNG PHÁ.
          </div>
        )}
      </AbsoluteFill>

      <VoiceTrack src="voice-s06.wav" />
      <Caption captions={captionsS06} />

      {/* Fade to black ở cuối — kết thúc mạnh */}
      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={20}
        fadeOutDuration={30}
      />
    </AbsoluteFill>
  );
};
