/**
 * Scene 04 — Nọc độc + tiết sữa qua da (~486f @30fps)
 * Voice: voice-04-venom-milk.wav
 * Ảnh: i05 (xương → cựa), i01 (thú mỏ vịt hoang dã)
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  ImageBg,
  SubText,
  Pill,
  StatText,
  VoiceTrack,
  FadeBlack,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS04 } from "./captions";

const MILK = 230; // chuyển sang phần tiết sữa

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Phần nọc độc — tone lạnh/đỏ, nền bộ xương */}
      {frame < MILK && (
        <>
          <ImageBg
            src="assets/images/platypus/i05-platypus-skeleton.jpg"
            frame={frame}
            colorOverlay="rgba(40,10,14,0.55)"
            from={1.04}
            to={1.16}
            duration={MILK}
          />
          <AbsoluteFill
            style={{ justifyContent: "center", alignItems: "center", gap: 20 }}
          >
            <Pill
              text="CỰA ĐỘC Ở CHÂN SAU"
              frame={frame}
              appearAt={14}
              bg={COLORS.red}
              color={COLORS.white}
            />
            <StatText
              text={"THÚ CÓ VÚ\nCÓ NỌC ĐỘC"}
              frame={frame}
              appearAt={55}
              color={COLORS.white}
              size={76}
            />
            <SubText
              text="Đau đến mức không thuốc giảm đau nào dập nổi"
              frame={frame}
              appearAt={150}
              color={COLORS.gold}
              size={38}
            />
          </AbsoluteFill>
        </>
      )}

      {/* Phần tiết sữa — tone ấm, nền thú mỏ vịt hoang dã */}
      {frame >= MILK && (
        <>
          <ImageBg
            src="assets/images/platypus/i01-wild-platypus-creek.jpg"
            frame={frame - MILK}
            colorOverlay="rgba(40,26,10,0.4)"
            duration={durationInFrames - MILK}
          />
          <AbsoluteFill
            style={{ justifyContent: "center", alignItems: "center", gap: 18 }}
          >
            <SubText
              text="Con cái nuôi con bằng sữa —"
              frame={frame}
              appearAt={MILK + 10}
              color={COLORS.cream}
              size={46}
            />
            <StatText
              text="KHÔNG CÓ NÚM VÚ"
              frame={frame}
              appearAt={MILK + 55}
              color={COLORS.white}
              size={64}
            />
            <Pill
              text="SỮA RỈ THẲNG QUA DA"
              frame={frame}
              appearAt={MILK + 120}
              bg={COLORS.cream}
              color={COLORS.brown}
            />
          </AbsoluteFill>
        </>
      )}

      <VoiceTrack src="voice/platypus/voice-04-venom-milk.wav" />
      <Caption captions={captionsS04} />
      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={6}
        fadeOutDuration={6}
      />
    </AbsoluteFill>
  );
};
