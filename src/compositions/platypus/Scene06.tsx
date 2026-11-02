/**
 * Scene 06 — Kết: Bảo tồn + callback meme + CTA (~446f @30fps)
 * Voice: voice-06-conservation-outro.wav (439f)
 * Ảnh: i04 (Broken River), i01 (wild) ; Video: v00-perry-meme (callback muted)
 *
 * Mốc timing bám nhịp đọc thực của voice:
 *   0–111   : "chỉ còn sống ở nước ngọt miền đông Úc"
 *   111–188 : "sắp bị đe dọa"  → pill cảnh báo
 *   188–251 : "Nên lần tới nghe tới thú mỏ vịt —"
 *   251–303 : "đừng chỉ nghĩ à, con Perry" → callback meme
 *   303–392 : "khó tin nhất hành tinh"
 *   392+    : "Theo dõi để xem thêm" → CTA
 */

import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  ImageBg,
  MemeBand,
  SubText,
  Pill,
  StatText,
  VoiceTrack,
  FadeBlack,
  fadeIn,
} from "./shared";
import { Caption } from "./Caption";
import { captionsS06 } from "./captions";

const THREAT = 111;   // "sắp bị đe dọa"
const AFTER_THREAT = 188; // "Nên lần tới..."
const MEME_IN = 251;  // callback meme — "đừng chỉ nghĩ à con Perry"
const MEME_OUT = 303;
const CLOSER = 303;   // "khó tin nhất hành tinh"
const CTA = 392;      // nút theo dõi

export const Scene06: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Nền môi trường sống (0–111) */}
      {frame < THREAT && (
        <ImageBg
          src="assets/images/platypus/i04-platypus-broken-river.jpg"
          frame={frame}
          colorOverlay="rgba(9,20,34,0.45)"
          duration={THREAT}
        />
      )}
      {/* "sắp bị đe dọa" + "Nên lần tới..." (111–251) */}
      {frame >= THREAT && frame < MEME_IN && (
        <ImageBg
          src="assets/images/platypus/i01-wild-platypus-creek.jpg"
          frame={frame - THREAT}
          colorOverlay="rgba(9,20,34,0.5)"
          duration={MEME_IN - THREAT}
        />
      )}

      {/* Callback meme (muted — nháy hình đúng lúc "à con Perry") */}
      {frame >= MEME_IN && frame < MEME_OUT && (
        <MemeBand src="assets/video/platypus/v00-perry-meme.mp4" muted />
      )}

      {/* Nền tối cho phần chốt + CTA */}
      {frame >= MEME_OUT && (
        <ImageBg
          src="assets/images/platypus/i01-wild-platypus-creek.jpg"
          frame={frame - MEME_OUT}
          colorOverlay="rgba(9,20,34,0.74)"
          duration={durationInFrames - MEME_OUT}
        />
      )}

      {/* Phase 1 — môi trường sống (voice 0–111) */}
      {frame < THREAT && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <SubText
            text={"Chỉ sống ở nước ngọt\nmiền đông nước Úc"}
            frame={frame}
            appearAt={12}
            color={COLORS.white}
            size={52}
          />
        </AbsoluteFill>
      )}

      {/* Phase 2 — sắp bị đe dọa (voice 111–188) */}
      {frame >= THREAT && frame < AFTER_THREAT && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 20 }}>
          <Pill
            text="⚠ SẮP BỊ ĐE DỌA"
            frame={frame}
            appearAt={THREAT + 6}
            bg={COLORS.red}
            color={COLORS.white}
            size={46}
          />
          <SubText
            text="Near Threatened — IUCN"
            frame={frame}
            appearAt={THREAT + 30}
            color={COLORS.cream}
            size={34}
          />
        </AbsoluteFill>
      )}

      {/* Phase 3 — "Nên lần tới nghe tới thú mỏ vịt" (voice 188–251) */}
      {frame >= AFTER_THREAT && frame < MEME_IN && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <SubText
            text={"Nên lần tới nghe tới\nthú mỏ vịt…"}
            frame={frame}
            appearAt={AFTER_THREAT + 6}
            color={COLORS.white}
            size={50}
          />
        </AbsoluteFill>
      )}

      {/* Phase 4 — chốt "khó tin nhất hành tinh" (voice 303–392) */}
      {frame >= CLOSER && frame < CTA && (
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center", padding: "0 30px" }}
        >
          <StatText
            text={"Một trong những sinh vật\nkhó tin nhất hành tinh"}
            frame={frame}
            appearAt={CLOSER + 6}
            color={COLORS.white}
            size={56}
          />
        </AbsoluteFill>
      )}

      {/* Phase 5 — CTA (voice 392+) */}
      {frame >= CTA && (
        <AbsoluteFill
          style={{ justifyContent: "center", alignItems: "center", gap: 24, padding: "0 40px" }}
        >
          <div style={{ opacity: fadeIn(frame, CTA + 2, 12) }}>
            <Pill
              text="Theo dõi để xem thêm sinh vật kỳ lạ 🐾"
              frame={frame}
              appearAt={CTA + 2}
              bg={COLORS.cyan}
              color={COLORS.darkBg}
              size={38}
            />
          </div>
        </AbsoluteFill>
      )}

      <VoiceTrack src="voice/platypus/voice-06-conservation-outro.wav" />
      <Caption captions={captionsS06} />
      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={6}
        fadeOutDuration={14}
      />
    </AbsoluteFill>
  );
};
