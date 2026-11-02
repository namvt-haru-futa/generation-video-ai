/**
 * Scene 05 — Cái tên "Thung lũng Chết" ra đời (1849) · voice vo-05 (~621f)
 * Tông sepia/vintage cho ảnh lịch sử.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  ImageBg,
  SubText,
  TopLabel,
  StatText,
  VoiceTrack,
  FadeBlack,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS05 } from "./captions";

const P2 = 241; // đoàn người lạc
const P3 = 498; // câu "Goodbye"

const SEPIA = "rgba(60,38,14,0.5)";

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#150d04" }}>
      {frame < P2 && (
        <ImageBg
          src="assets/images/death-valley/i11-mule-team-1900.jpg"
          frame={frame}
          colorOverlay={SEPIA}
          from={1.05}
          to={1.16}
          duration={P2}
        />
      )}
      {frame >= P2 && frame < P3 && (
        <ImageBg
          src="assets/images/death-valley/i12-mule-team-1880s.jpg"
          frame={frame - P2}
          colorOverlay={SEPIA}
          from={1.03}
          to={1.13}
          duration={P3 - P2}
        />
      )}
      {frame >= P3 && (
        <ImageBg
          src="assets/images/death-valley/i11-mule-team-1900.jpg"
          frame={frame - P3}
          colorOverlay="rgba(30,18,6,0.68)"
          from={1.1}
          to={1.02}
          pan="out"
          duration={durationInFrames - P3}
        />
      )}

      {frame < P2 && (
        <>
          <TopLabel text="Vì sao gọi là Thung Lũng Chết?" frame={frame} appearAt={10} color={COLORS.sand} />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
            <StatText text="MÙA ĐÔNG 1849" frame={frame} appearAt={90} color={COLORS.cream} size={100} />
          </AbsoluteFill>
        </>
      )}
      {frame >= P2 && frame < P3 && (
        <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 380 }}>
          <SubText
            text={"Một đoàn người tìm vàng lạc vào đây,\nmắc kẹt suốt nhiều tuần"}
            frame={frame}
            appearAt={P2 + 20}
            color={COLORS.cream}
            size={48}
          />
        </AbsoluteFill>
      )}
      {frame >= P3 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <SubText
            text={"“Vĩnh biệt,\nThung Lũng Chết.”"}
            frame={frame}
            appearAt={P3 + 15}
            color={COLORS.sand}
            size={76}
          />
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/death-valley/vo-05.wav" />
      <Caption captions={captionsS05} />
      <FadeBlack frame={frame} totalFrames={durationInFrames} fadeInDuration={6} fadeOutDuration={6} />
    </AbsoluteFill>
  );
};
