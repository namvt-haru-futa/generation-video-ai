/**
 * Scene 02 — Nơi nóng nhất Trái Đất (134°F) · voice vo-02 (~537f)
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  ImageBg,
  StatText,
  SubText,
  TopLabel,
  Pill,
  VoiceTrack,
  FadeBlack,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS02 } from "./captions";

const P2 = 355; // sang cảnh Devil's Golf Course

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Phase 1 — thung lũng khô nóng + số liệu kỷ lục */}
      {frame < P2 && (
        <ImageBg
          src="assets/images/death-valley/i02-valley-dry.jpg"
          frame={frame}
          colorOverlay="rgba(26,18,6,0.5)"
          from={1.04}
          to={1.16}
          duration={P2}
        />
      )}
      {/* Phase 2 — Devil's Golf Course, muối cháy */}
      {frame >= P2 && (
        <ImageBg
          src="assets/images/death-valley/i01-devils-golf.jpg"
          frame={frame - P2}
          colorOverlay="rgba(40,20,6,0.5)"
          from={1.02}
          to={1.14}
          duration={durationInFrames - P2}
        />
      )}

      {frame < P2 && (
        <>
          <TopLabel text="Kỷ lục nhiệt độ hành tinh" frame={frame} appearAt={10} color={COLORS.hot} />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 10 }}>
            <StatText text="56,7°C" frame={frame} appearAt={175} color={COLORS.hot} size={210} />
            <StatText text="(134°F)" frame={frame} appearAt={200} color={COLORS.cream} size={70} />
            <div style={{ height: 16 }} />
            <Pill text="10 · 7 · 1913 — Furnace Creek" frame={frame} appearAt={70} bg={COLORS.heat} />
          </AbsoluteFill>
        </>
      )}
      {frame >= P2 && (
        <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 420 }}>
          <SubText
            text={"Mùa hè, mặt đất nóng tới ~93°C —\nđủ sức chiên chín một quả trứng"}
            frame={frame}
            appearAt={P2 + 20}
            color={COLORS.cream}
            size={48}
          />
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/death-valley/vo-02.wav" />
      <Caption captions={captionsS02} />
      <FadeBlack frame={frame} totalFrames={durationInFrames} fadeInDuration={6} fadeOutDuration={6} />
    </AbsoluteFill>
  );
};
