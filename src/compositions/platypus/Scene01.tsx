/**
 * Scene 01 — Hook: Meme "Perry the Platypus" + lời dẫn
 * ~420f @30fps (14s). Meme 0–150f (audio gốc, duck sau 90f), lời dẫn từ 90f.
 * Voice: voice/platypus/voice-01-intro-perry.wav (bắt đầu ở frame 90)
 * Video: assets/video/platypus/v00-perry-meme.mp4
 * Ảnh:  assets/images/platypus/i01-wild-platypus-creek.jpg (teaser)
 */

import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";
import {
  COLORS,
  MemeBand,
  ImageBg,
  SubText,
  VoiceTrack,
  FadeBlack,
  fadeIn,
} from "./shared";
import { FONT } from "./fonts";
import { Caption } from "./Caption";
import { captionsS01 } from "./captions";

const MEME_END = 150;

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Meme "Perry" — dải ngang giữa khung; duck audio sau khi lời dẫn vào */}
      {frame < MEME_END && (
        <MemeBand
          src="assets/video/platypus/v00-perry-meme.mp4"
          volume={(f) => (f < 90 ? 1 : 0.12)}
        />
      )}

      {/* Sau meme: teaser thú mỏ vịt thật */}
      {frame >= MEME_END && (
        <ImageBg
          src="assets/images/platypus/i01-wild-platypus-creek.jpg"
          frame={frame - MEME_END}
          colorOverlay="rgba(9,20,34,0.35)"
          duration={durationInFrames - MEME_END}
        />
      )}

      {/* Text overlay giai đoạn meme */}
      {frame < 90 && (
        <div
          style={{
            position: "absolute",
            top: 210,
            left: 0,
            right: 0,
            textAlign: "center",
            color: COLORS.white,
            fontSize: 52,
            fontWeight: 800,
            fontFamily: FONT,
            opacity: fadeIn(frame, 6, 10),
            textShadow: "0 3px 14px rgba(0,0,0,0.9)",
          }}
        >
          Nhớ Perry không?
        </div>
      )}

      {/* Câu hỏi dẫn dắt — hiện SAU khi meme cắt sang ảnh thật (khớp lời dẫn ~228f) */}
      {frame >= MEME_END && (
        <AbsoluteFill
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <SubText
            text={"Nhưng thú mỏ vịt THẬT\nlà con vật như thế nào?"}
            frame={frame}
            appearAt={228}
            color={COLORS.white}
            size={56}
          />
        </AbsoluteFill>
      )}

      {/* Voice bắt đầu ở frame 90 (sau nhịp meme) */}
      <Sequence from={90}>
        <VoiceTrack src="voice/platypus/voice-01-intro-perry.wav" />
      </Sequence>

      {/* Captions (đã timing từ frame 90) */}
      <Caption captions={captionsS01} />

      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={8}
        fadeOutDuration={6}
      />
    </AbsoluteFill>
  );
};
