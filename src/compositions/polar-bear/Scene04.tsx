/**
 * Scene 04 — Người mẹ phi thường
 * 0:52–1:10 (~540 frames)
 * Voice: voice-s04.wav
 * Video: v04-polar-bear-cub.mp4
 * Image: i01-mother-cub.jpg
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  SceneBg,
  ImageBg,
  StatText,
  SubText,
  TopLabel,
  VoiceTrack,
  FadeBlack,
  fadeIn,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS04 } from "./captions";

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A14" }}>
      {/* Phase 1: Ảnh mẹ + con */}
      <ImageBg
        src="assets/images/i01-mother-cub.jpg"
        colorOverlay="rgba(0,0,0,0.55)"
        scale={1.08}
      />

      {/* Phase 2: Video gấu con sau 8s */}
      {frame >= 240 && (
        <SceneBg
          src="assets/video/v04-polar-bear-cub.mp4"
          colorOverlay="rgba(0,0,0,0.4)"
        />
      )}

      <TopLabel text="NGƯỜI MẸ" frame={frame} appearAt={5} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {/* "Tháng Mười" */}
        <SubText
          text="Tháng Mười — gấu mẹ đào hang tuyết."
          frame={frame}
          appearAt={10}
          color={COLORS.white}
          size={38}
        />

        {/* 8 THÁNG */}
        <StatText
          text="8 THÁNG"
          frame={frame}
          appearAt={40}
          color={COLORS.orange}
          size={140}
        />

        {/* Không ăn không uống */}
        {frame >= 70 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              opacity: fadeIn(frame, 70, 12),
            }}
          >
            <div
              style={{
                color: COLORS.red,
                fontSize: 52,
                fontWeight: 900,
                fontFamily: "'Arial Black', sans-serif",
                textAlign: "center",
                letterSpacing: 1,
                textShadow: "0 2px 12px rgba(0,0,0,0.9)",
              }}
            >
              KHÔNG ĂN. KHÔNG UỐNG.
            </div>
          </div>
        )}

        {/* Gấu con 500 gram */}
        {frame >= 140 && (
          <>
            <SubText
              text="Trong bóng tối đó, gấu con chào đời."
              frame={frame}
              appearAt={140}
              color={COLORS.white}
              size={36}
            />
            <StatText
              text="500 GRAM"
              frame={frame}
              appearAt={165}
              color={COLORS.iceBlue}
              size={100}
            />
            <SubText
              text="Bằng con chuột lang."
              frame={frame}
              appearAt={195}
              color={COLORS.white}
              size={34}
            />
          </>
        )}

        {/* Tháng 3 ra ngoài */}
        {frame >= 310 && (
          <SubText
            text={"Đến tháng Ba, cả nhà bước ra.\nVà mẹ lập tức đi săn."}
            frame={frame}
            appearAt={310}
            color={COLORS.iceBlue}
            size={36}
          />
        )}
      </AbsoluteFill>

      <VoiceTrack src="voice-s04.wav" />
      <Caption captions={captionsS04} />
      <FadeBlack frame={frame} totalFrames={durationInFrames} fadeInDuration={6} fadeOutDuration={6} />
    </AbsoluteFill>
  );
};
