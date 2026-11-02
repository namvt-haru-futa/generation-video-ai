/**
 * Scene 04 — Khô hạn nhất, từng là biển & hồ · voice vo-04 (~579f)
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
import { captionsS04 } from "./captions";

const P2 = 207; // sang badlands (đáy hồ cổ)
const P3 = 489; // sang cánh đồng muối

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {frame < P2 && (
        <ImageBg
          src="assets/images/death-valley/i10-panorama.jpg"
          frame={frame}
          colorOverlay="rgba(26,18,6,0.48)"
          from={1.04}
          to={1.15}
          duration={P2}
        />
      )}
      {frame >= P2 && frame < P3 && (
        <ImageBg
          src="assets/images/death-valley/i08-zabriskie-badlands.jpg"
          frame={frame - P2}
          colorOverlay="rgba(18,26,40,0.42)"
          from={1.03}
          to={1.13}
          duration={P3 - P2}
        />
      )}
      {frame >= P3 && (
        <ImageBg
          src="assets/images/death-valley/i05-badwater-hexagon.jpg"
          frame={frame - P3}
          colorOverlay="rgba(26,18,6,0.45)"
          from={1.03}
          to={1.12}
          duration={durationInFrames - P3}
        />
      )}

      {frame < P2 && (
        <>
          <TopLabel text="Khô hạn nhất Bắc Mỹ" frame={frame} appearAt={10} color={COLORS.sand} />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 8 }}>
            <StatText text="1,9 inch" frame={frame} appearAt={40} color={COLORS.sand} size={180} />
            <StatText text="mưa mỗi năm" frame={frame} appearAt={70} color={COLORS.cream} size={56} />
          </AbsoluteFill>
        </>
      )}
      {frame >= P2 && frame < P3 && (
        <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 360 }}>
          <SubText
            text={"Nhưng từng là… đáy biển ấm\nrồi một hồ nước khổng lồ — Lake Manly"}
            frame={frame}
            appearAt={P2 + 20}
            color={COLORS.salt}
            size={48}
          />
        </AbsoluteFill>
      )}
      {frame >= P3 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 20 }}>
          <SubText text="…trước khi bốc hơi, để lại muối" frame={frame} appearAt={P3 + 15} color={COLORS.cream} size={46} />
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <Pill text="Biển" frame={frame} appearAt={P3 + 40} bg={COLORS.salt} />
            <Pill text="→ Hồ" frame={frame} appearAt={P3 + 60} bg={COLORS.sand} />
            <Pill text="→ Sa mạc" frame={frame} appearAt={P3 + 80} bg={COLORS.heat} />
          </div>
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/death-valley/vo-04.wav" />
      <Caption captions={captionsS04} />
      <FadeBlack frame={frame} totalFrames={durationInFrames} fadeInDuration={6} fadeOutDuration={6} />
    </AbsoluteFill>
  );
};
