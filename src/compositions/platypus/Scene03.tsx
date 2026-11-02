/**
 * Scene 03 — Săn mồi bằng "giác quan điện" (~400f @30fps)
 * Voice: voice-03-electroreception.wav (394f)
 * Video: v01-platypus-swimming.webm ; Ảnh: i03 (mỏ)
 *
 * Mốc timing bám theo nhịp đọc thực của voice:
 *   5–139   : giác quan "tắt" + câu hỏi "Vậy làm sao nó săn mồi?"
 *   139     : "Bằng điện" → cắt sang cận mỏ + sóng điện
 *   286     : "y hệt cá mập" + chốt "cực hiếm"
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  SceneBg,
  ImageBg,
  SubText,
  Pill,
  StatText,
  VoiceTrack,
  FadeBlack,
  ElectricWaves,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS03 } from "./captions";

const ASK = 91;       // câu hỏi "Vậy làm sao nó săn mồi?"
const ELECTRIC = 139; // "Bằng điện" → cắt cảnh + sóng điện
const SHARK = 286;    // "y hệt cá mập"

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Nền: video bơi thật (muted) cho tới khi "Bằng điện" */}
      {frame < ELECTRIC && (
        <SceneBg
          src="assets/video/platypus/v01-platypus-swimming.webm"
          colorOverlay="rgba(9,20,34,0.5)"
        />
      )}

      {/* Từ "Bằng điện": cận mỏ + sóng điện */}
      {frame >= ELECTRIC && (
        <ImageBg
          src="assets/images/platypus/i03-platypus-bill-closeup.jpg"
          frame={frame - ELECTRIC}
          colorOverlay="rgba(9,20,34,0.55)"
          duration={durationInFrames - ELECTRIC}
        />
      )}
      {frame >= ELECTRIC && <ElectricWaves frame={frame} appearAt={ELECTRIC} />}

      {/* Giai đoạn 1 — giác quan bị "tắt" (voice 5–55) */}
      {frame < ASK && (
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center", gap: 20 }}
        >
          <Pill text="NHẮM MẮT" frame={frame} appearAt={8} bg={COLORS.cream} />
          <Pill text="BỊT TAI" frame={frame} appearAt={30} bg={COLORS.cream} />
          <Pill text="BỊT LUÔN CẢ MŨI" frame={frame} appearAt={55} bg={COLORS.cream} />
        </AbsoluteFill>
      )}

      {/* Câu hỏi (voice 91–139) */}
      {frame >= ASK && frame < ELECTRIC && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <SubText
            text="Vậy làm sao nó săn mồi?"
            frame={frame}
            appearAt={ASK + 2}
            color={COLORS.white}
            size={52}
          />
        </AbsoluteFill>
      )}

      {/* "Bằng điện" + dò tín hiệu (voice 139–286) */}
      {frame >= ELECTRIC && frame < SHARK && (
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center", gap: 18 }}
        >
          <StatText
            text="BẰNG ĐIỆN"
            frame={frame}
            appearAt={ELECTRIC + 3}
            color={COLORS.cyan}
            size={96}
          />
          <SubText
            text="Dò tín hiệu điện cực nhỏ từ con mồi"
            frame={frame}
            appearAt={ELECTRIC + 30}
            color={COLORS.white}
            size={40}
          />
        </AbsoluteFill>
      )}

      {/* Chốt — như cá mập (voice 286–394) */}
      {frame >= SHARK && (
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center", gap: 18 }}
        >
          <SubText
            text={"Y hệt cách một con cá mập\nsăn mồi"}
            frame={frame}
            appearAt={SHARK + 4}
            color={COLORS.white}
            size={48}
          />
          <Pill
            text="🦈 CỰC HIẾM Ở LOÀI THÚ"
            frame={frame}
            appearAt={SHARK + 66}
            bg={COLORS.cyan}
          />
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/platypus/voice-03-electroreception.wav" />
      <Caption captions={captionsS03} />
      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={6}
        fadeOutDuration={6}
      />
    </AbsoluteFill>
  );
};
