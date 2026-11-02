/**
 * Scene 07 — Con người vẫn sống ở đây · voice vo-07 (~486f)
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  ImageBg,
  SubText,
  TopLabel,
  Pill,
  VoiceTrack,
  FadeBlack,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS07 } from "./captions";

const P2 = 241; // sang cảnh oasis thứ 2

export const Scene07: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {frame < P2 && (
        <ImageBg
          src="assets/images/death-valley/i19-furnace-oasis.jpg"
          frame={frame}
          colorOverlay="rgba(20,26,18,0.42)"
          from={1.04}
          to={1.14}
          duration={P2}
        />
      )}
      {frame >= P2 && (
        <ImageBg
          src="assets/images/death-valley/i20-furnace-unsplash.jpg"
          frame={frame - P2}
          colorOverlay="rgba(26,18,6,0.44)"
          from={1.03}
          to={1.13}
          duration={durationInFrames - P2}
        />
      )}

      {frame < P2 && (
        <>
          <TopLabel text="Con người vẫn sống ở đây" frame={frame} appearAt={10} color={COLORS.sand} />
          <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 400 }}>
            <SubText text="Một ốc đảo xanh giữa lòng sa mạc" frame={frame} appearAt={40} color={COLORS.cream} size={48} />
          </AbsoluteFill>
        </>
      )}
      {frame >= P2 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 18 }}>
          <SubText text={"Người Timbisha Shoshone\ngắn bó hơn 1.000 năm"} frame={frame} appearAt={P2 + 20} color={COLORS.cream} size={52} />
          <Pill text="~50 người sống quanh năm" frame={frame} appearAt={P2 + 70} bg={COLORS.heat} />
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/death-valley/vo-07.wav" />
      <Caption captions={captionsS07} />
      <FadeBlack frame={frame} totalFrames={durationInFrames} fadeInDuration={6} fadeOutDuration={6} />
    </AbsoluteFill>
  );
};
