/**
 * Scene 02 — Cỗ máy săn mồi
 * 0:12–0:35 (~690 frames)
 * Voice: voice-s02.wav
 * Video: v01-polar-bear-walking.mp4, v03-polar-bears-playful.mp4
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  SceneBg,
  StatText,
  SubText,
  TopLabel,
  VoiceTrack,
  FadeBlack,
  fadeIn,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS02 } from "./captions";

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* Bg: gấu bất động rồi chuyển sang gấu di chuyển */}
      <SceneBg src="assets/video/v01-polar-bear-walking.mp4" startFrom={30} colorOverlay="rgba(0,0,0,0.5)" />
      {frame >= 120 && (
        <SceneBg src="assets/video/v03-polar-bears-playful.mp4" colorOverlay="rgba(0,0,0,0.48)" />
      )}

      <TopLabel text="SĂN MỒI" frame={frame} appearAt={5} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        {/* Khứu giác */}
        <SubText
          text="KHỨU GIÁC"
          frame={frame}
          appearAt={10}
          color={COLORS.iceBlue}
          size={38}
        />
        <StatText
          text="16 KM"
          frame={frame}
          appearAt={20}
          color={COLORS.orange}
          size={140}
        />
        <SubText
          text="ngửi được con mồi từ xa"
          frame={frame}
          appearAt={50}
          color={COLORS.white}
          size={36}
        />

        {/* Divider */}
        {frame >= 100 && (
          <div
            style={{
              width: 250,
              height: 2,
              backgroundColor: COLORS.iceBlue,
              opacity: fadeIn(frame, 100, 15),
              margin: "8px 0",
            }}
          />
        )}

        {/* Kỹ thuật still-hunting */}
        {frame >= 110 && (
          <SubText
            text={"Đứng im hàng giờ bên lỗ thở hải cẩu.\nChờ. Không nhúc nhích."}
            frame={frame}
            appearAt={110}
            color={COLORS.white}
            size={36}
          />
        )}

        {/* Tốc độ chạy */}
        {frame >= 200 && (
          <>
            <SubText
              text="KHI CON MỒI LÓ RA —"
              frame={frame}
              appearAt={200}
              color={COLORS.iceBlue}
              size={36}
            />
            <StatText
              text="40 KM/H"
              frame={frame}
              appearAt={215}
              color={COLORS.red}
              size={120}
            />
            <SubText
              text="Không kịp phản ứng."
              frame={frame}
              appearAt={250}
              color={COLORS.white}
              size={36}
            />
          </>
        )}
      </AbsoluteFill>

      <VoiceTrack src="voice-s02.wav" />
      <Caption captions={captionsS02} />
      <FadeBlack frame={frame} totalFrames={durationInFrames} fadeInDuration={6} fadeOutDuration={6} />
    </AbsoluteFill>
  );
};
