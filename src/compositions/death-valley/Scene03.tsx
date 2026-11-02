/**
 * Scene 03 — Điểm thấp nhất Bắc Mỹ (Badwater) · voice vo-03 (~552f)
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  ImageBg,
  StatText,
  SubText,
  TopLabel,
  VoiceTrack,
  FadeBlack,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS03 } from "./captions";

const P2 = 160; // sang cánh đồng muối
const P3 = 399; // sang Telescope Peak

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {frame < P2 && (
        <ImageBg
          src="assets/images/death-valley/i04-badwater-sign.jpg"
          frame={frame}
          colorOverlay="rgba(26,18,6,0.42)"
          from={1.05}
          to={1.15}
          duration={P2}
        />
      )}
      {frame >= P2 && frame < P3 && (
        <ImageBg
          src="assets/images/death-valley/i05-badwater-hexagon.jpg"
          frame={frame - P2}
          colorOverlay="rgba(26,18,6,0.45)"
          from={1.03}
          to={1.14}
          duration={P3 - P2}
        />
      )}
      {frame >= P3 && (
        <ImageBg
          src="assets/images/death-valley/i07-panamint-dantes.jpg"
          frame={frame - P3}
          colorOverlay="rgba(20,26,34,0.4)"
          from={1.03}
          to={1.13}
          duration={durationInFrames - P3}
        />
      )}

      {frame < P3 && (
        <>
          <TopLabel text="Điểm thấp nhất Bắc Mỹ" frame={frame} appearAt={10} color={COLORS.salt} />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 8 }}>
            <StatText text="−86 m" frame={frame} appearAt={175} color={COLORS.salt} size={200} />
            <StatText text="(−282 ft) dưới mực nước biển" frame={frame} appearAt={205} color={COLORS.cream} size={52} />
          </AbsoluteFill>
        </>
      )}
      {frame >= P3 && (
        <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 360, gap: 6 }}>
          <SubText text="Nhưng chỉ cách 24 km…" frame={frame} appearAt={P3 + 15} color={COLORS.cream} size={46} />
          <StatText text="3.368 m" frame={frame} appearAt={P3 + 45} color={COLORS.salt} size={150} />
          <SubText text={"Đỉnh Telescope Peak — có tuyết mùa đông"} frame={frame} appearAt={P3 + 70} color={COLORS.cream} size={42} />
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/death-valley/vo-03.wav" />
      <Caption captions={captionsS03} />
      <FadeBlack frame={frame} totalFrames={durationInFrames} fadeInDuration={6} fadeOutDuration={6} />
    </AbsoluteFill>
  );
};
