/**
 * Scene 08 — Kết & CTA (ngân hà) · voice vo-08 (~363f)
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  ImageBg,
  StatText,
  SubText,
  Pill,
  VoiceTrack,
  FadeBlack,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS08 } from "./captions";

const P2 = 172; // sang ngân hà

export const Scene08: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: "#05060f" }}>
      {frame < P2 && (
        <ImageBg
          src="assets/images/death-valley/i22-mesquite-dunes.jpg"
          frame={frame}
          colorOverlay="rgba(26,18,6,0.42)"
          from={1.04}
          to={1.14}
          duration={P2}
        />
      )}
      {frame >= P2 && (
        <ImageBg
          src="assets/images/death-valley/i21-milkyway-stars.jpg"
          frame={frame - P2}
          colorOverlay="rgba(5,6,20,0.5)"
          from={1.02}
          to={1.12}
          duration={durationInFrames - P2}
        />
      )}

      {frame < P2 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <SubText text={"Nóng nhất • Khô nhất • Thấp nhất"} frame={frame} appearAt={20} color={COLORS.sand} size={54} />
        </AbsoluteFill>
      )}
      {frame >= P2 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 18 }}>
          <StatText text="DEATH VALLEY" frame={frame} appearAt={P2 + 20} color={COLORS.cream} size={112} />
          <SubText text="…đẹp đến nghẹt thở khi màn đêm buông xuống" frame={frame} appearAt={P2 + 55} color={COLORS.salt} size={42} />
          <div style={{ height: 10 }} />
          <Pill text="Theo dõi để khám phá tiếp 🌍" frame={frame} appearAt={P2 + 95} bg={COLORS.heat} size={44} />
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/death-valley/vo-08.wav" />
      <Caption captions={captionsS08} />
      <FadeBlack frame={frame} totalFrames={durationInFrames} fadeInDuration={6} fadeOutDuration={8} />
    </AbsoluteFill>
  );
};
