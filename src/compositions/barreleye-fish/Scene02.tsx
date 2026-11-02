/**
 * Scene 02 — Đầu trong suốt như buồng lái · voice vo-02 (~430f)
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";
import {
  COLORS,
  ImageBg,
  MarineSnow,
  StatText,
  Pill,
  VoiceTrack,
  FadeBlack,
  fadeIn,
  scaleIn,
} from "./shared";
import { FONT } from "./fonts";
import { WhisperxCaption } from "./WhisperxCaption";
import whisperxS02 from "../../research/barreleye-fish/captions/vo-02.json";
import type { Caption as RemotionCaption } from "@remotion/captions";
import { SceneSfx } from "../../lib/SceneSfx";
import script from "../../research/barreleye-fish/script.json";

const sceneData = script.scenes.find((s) => s.id === "vo-02")!;

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Vòng highlight quét quanh đầu cá — rotate liên tục
  const rotate = (frame * 1.2) % 360;

  // Illustration nổi lên sau ~200f để so sánh cấu tạo
  const illustrationOpacity = fadeIn(frame, 220, 20);
  const illustrationScale = scaleIn(frame, 220, 18);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Nền: ảnh barreleye thật, Ken Burns zoom vào đầu */}
      <ImageBg
        src="assets/images/barreleye-fish/i01-barreleye-noaa.jpg"
        frame={frame}
        colorOverlay="rgba(2,11,24,0.55)"
        from={1.15}
        to={1.35}
        duration={durationInFrames}
        objectPosition="center 40%"
      />

      <MarineSnow opacity={0.35} />

      {/* Vòng highlight quét — glow xanh cyan quanh mái vòm */}
      <div
        style={{
          position: "absolute",
          top: 620,
          left: "50%",
          transform: `translateX(-50%) rotate(${rotate}deg)`,
          width: 460,
          height: 300,
          border: `4px solid ${COLORS.cyan}`,
          borderRadius: "50%",
          borderColor: `${COLORS.cyan} transparent ${COLORS.cyan} transparent`,
          opacity: fadeIn(frame, 30, 20) * 0.7,
          boxShadow: `0 0 30px ${COLORS.cyan}88`,
          pointerEvents: "none",
        }}
      />

      {/* Title trên */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          textAlign: "center",
          padding: "0 40px",
          opacity: fadeIn(frame, 20, 12),
        }}
      >
        <StatText
          text="CHIẾC ĐẦU"
          frame={frame}
          appearAt={20}
          color={COLORS.cream}
          size={82}
        />
        <div style={{ height: 8 }} />
        <StatText
          text="NHƯ BUỒNG LÁI"
          frame={frame}
          appearAt={50}
          color={COLORS.glow}
          size={82}
          glow
        />
      </div>

      {/* Illustration + so sánh cockpit ở dưới */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 380,
          opacity: illustrationOpacity,
          transform: `scale(${illustrationScale})`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            fontFamily: FONT,
            marginBottom: 20,
          }}
        >
          {/* Fish illustration */}
          <div
            style={{
              padding: "12px 20px",
              borderRadius: 16,
              backgroundColor: "rgba(2,11,24,0.65)",
              border: `1.5px solid ${COLORS.glow}66`,
              boxShadow: `0 0 24px ${COLORS.glow}33`,
            }}
          >
            <Img
              src={staticFile(
                "assets/images/barreleye-fish/i02-macropinna-illustration.png",
              )}
              style={{
                width: 320,
                height: "auto",
                display: "block",
                filter: `drop-shadow(0 0 12px ${COLORS.glow}66)`,
              }}
            />
          </div>

          {/* vs — dấu bằng */}
          <div
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: COLORS.cyan,
              textShadow: `0 0 20px ${COLORS.cyan}`,
            }}
          >
            ≈
          </div>

          {/* Cockpit emoji */}
          <div
            style={{
              fontSize: 130,
              filter: `drop-shadow(0 0 16px ${COLORS.cyan}88)`,
            }}
          >
            ✈️
          </div>
        </div>

        <Pill
          text="Vòm chứa dịch — bảo vệ đôi mắt"
          frame={frame}
          appearAt={280}
          bg="rgba(10,37,64,0.85)"
          color={COLORS.glow}
          size={34}
        />
      </AbsoluteFill>

      <VoiceTrack src="voice/barreleye-fish/vo-02.wav" />
      <WhisperxCaption captions={whisperxS02 as RemotionCaption[]} />

      <SceneSfx scene={sceneData} fromFrame={220} volume={0.16} />

      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={6}
        fadeOutDuration={8}
      />
    </AbsoluteFill>
  );
};
