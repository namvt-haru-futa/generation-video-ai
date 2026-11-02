/**
 * Scene 06 — Sự sống kỳ diệu giữa địa ngục · voice vo-06 (~735f)
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  ImageBg,
  SubText,
  TopLabel,
  StatText,
  Pill,
  VoiceTrack,
  FadeBlack,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS06 } from "./captions";

const P2 = 254; // cá pupfish
const P3 = 483; // superbloom

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {frame < P2 && (
        <ImageBg
          src="assets/images/death-valley/i16-superbloom-redhills.jpg"
          frame={frame}
          colorOverlay="rgba(26,18,6,0.5)"
          from={1.04}
          to={1.15}
          duration={P2}
        />
      )}
      {frame >= P2 && frame < P3 && (
        <ImageBg
          src="assets/images/death-valley/i17-pupfish-pair.jpg"
          frame={frame - P2}
          colorOverlay="rgba(12,26,34,0.4)"
          from={1.03}
          to={1.14}
          duration={P3 - P2}
        />
      )}
      {frame >= P3 && (
        <ImageBg
          src="assets/images/death-valley/i15-superbloom-field.jpg"
          frame={frame - P3}
          colorOverlay="rgba(26,18,6,0.34)"
          from={1.03}
          to={1.14}
          duration={durationInFrames - P3}
        />
      )}

      {frame < P2 && (
        <>
          <TopLabel text="Sự sống vẫn tồn tại" frame={frame} appearAt={10} color={COLORS.sand} />
          <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 16 }}>
            <Pill text="56 loài thú" frame={frame} appearAt={40} bg={COLORS.heat} />
            <Pill text="~400 loài chim" frame={frame} appearAt={70} bg={COLORS.sand} />
            <Pill text="6 loài cá" frame={frame} appearAt={100} bg={COLORS.salt} />
          </AbsoluteFill>
        </>
      )}
      {frame >= P2 && frame < P3 && (
        <AbsoluteFill style={{ justifyContent: "flex-start", alignItems: "center", paddingTop: 380 }}>
          <SubText
            text={"Cá Pupfish — hậu duệ từ kỷ băng hà,\nsống trong dòng suối mặn chát"}
            frame={frame}
            appearAt={P2 + 20}
            color={COLORS.cream}
            size={48}
          />
        </AbsoluteFill>
      )}
      {frame >= P3 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 10 }}>
          <StatText text="SIÊU NỞ HOA" frame={frame} appearAt={P3 + 20} color={COLORS.sand} size={110} />
          <SubText text="Hàng triệu bông hoa dại phủ kín sa mạc" frame={frame} appearAt={P3 + 50} color={COLORS.cream} size={44} />
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/death-valley/vo-06.wav" />
      <Caption captions={captionsS06} />
      <FadeBlack frame={frame} totalFrames={durationInFrames} fadeInDuration={6} fadeOutDuration={6} />
    </AbsoluteFill>
  );
};
