/**
 * Scene 04 — Vùng chạng vạng · voice vo-04 (~432f)
 * Cột nước biển phân tầng độ sâu + label vùng phân bố + size ruler.
 */
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import {
  COLORS,
  SceneBg,
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
import whisperxS04 from "../../research/barreleye-fish/captions/vo-04.json";
import type { Caption as RemotionCaption } from "@remotion/captions";
import { SceneSfx } from "../../lib/SceneSfx";
import script from "../../research/barreleye-fish/script.json";

const sceneData = script.scenes.find((s) => s.id === "vo-04")!;

// Layers of ocean depth (từ mặt biển xuống 800m)
const ZONES = [
  { top: 0, label: "0 m", zone: "Mặt biển", color: "#87CEEB" },
  { top: 200, label: "200 m", zone: "Tầng sáng (Epipelagic)", color: "#4A90C7" },
  { top: 600, label: "600 m", zone: "Vùng chạng vạng", color: "#1E4B6E" },
  { top: 800, label: "800 m", zone: "(Mesopelagic)", color: "#0A2540" },
  { top: 1000, label: "1000 m", zone: "Vùng nửa đêm", color: "#020B18" },
];

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Highlight vùng 600-800m — pulse
  const highlightAlpha = 0.5 + Math.sin(frame * 0.15) * 0.3;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.darkBg }}>
      {/* Marine snow video làm nền */}
      {/* v01 marine-snow 291f — loop cho scene 452f */}
      <SceneBg
        src="assets/video/barreleye-fish/v01-marine-snow.mp4"
        colorOverlay="rgba(2,11,24,0.65)"
        videoDurationInFrames={291}
      />
      <MarineSnow opacity={0.4} />

      {/* Cột nước phân tầng (bên trái) — hiện ở phase đầu */}
      <div
        style={{
          position: "absolute",
          top: 400,
          left: 60,
          width: 220,
          height: 1100,
          borderRadius: 16,
          background: `linear-gradient(to bottom,
            #87CEEB 0%,
            #4A90C7 15%,
            #1E4B6E 50%,
            #0A2540 75%,
            #020B18 100%)`,
          border: `2px solid ${COLORS.cyan}55`,
          opacity: fadeIn(frame, 15, 15),
          boxShadow: `0 0 24px ${COLORS.cyan}33`,
        }}
      >
        {/* Highlight vùng 600-800m */}
        <div
          style={{
            position: "absolute",
            top: `${(600 / 1000) * 100}%`,
            left: -8,
            right: -8,
            height: `${(200 / 1000) * 100}%`,
            border: `4px solid ${COLORS.glow}`,
            borderRadius: 12,
            boxShadow: `0 0 30px ${COLORS.glow}, inset 0 0 20px ${COLORS.glow}55`,
            opacity: highlightAlpha,
          }}
        />
        {/* Fish icon ở đúng vị trí */}
        <div
          style={{
            position: "absolute",
            top: `${(700 / 1000) * 100 - 4}%`,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 44,
            filter: `drop-shadow(0 0 12px ${COLORS.glow})`,
          }}
        >
          🐟
        </div>
        {/* Depth labels */}
        {ZONES.map((z) => (
          <div
            key={z.top}
            style={{
              position: "absolute",
              top: `${(z.top / 1000) * 100}%`,
              left: 232,
              transform: "translateY(-50%)",
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 700,
              color: COLORS.cream,
              whiteSpace: "nowrap",
              textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            }}
          >
            <span style={{ color: COLORS.cyan, fontWeight: 900 }}>
              {z.label}
            </span>
          </div>
        ))}
      </div>

      {/* Nhãn chính bên phải */}
      <div
        style={{
          position: "absolute",
          top: 260,
          right: 60,
          width: 620,
          textAlign: "right",
        }}
      >
        <StatText
          text="600 – 800 m"
          frame={frame}
          appearAt={20}
          color={COLORS.glow}
          size={100}
          glow
        />
        <div style={{ height: 12 }} />
        <div
          style={{
            fontFamily: FONT,
            fontSize: 38,
            fontWeight: 700,
            color: COLORS.cyan,
            letterSpacing: 3,
            textTransform: "uppercase",
            opacity: fadeIn(frame, 60, 15),
            textAlign: "right",
            textShadow: "0 2px 10px rgba(0,0,0,0.9)",
          }}
        >
          Vùng chạng vạng
        </div>
      </div>

      {/* Bottom section — bản đồ + size ruler */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 340,
          gap: 24,
        }}
      >
        {/* Bản đồ đơn giản — SVG shape Bắc Thái Bình Dương */}
        <div
          style={{
            opacity: fadeIn(frame, 220, 20),
            transform: `scale(${scaleIn(frame, 220, 20)})`,
          }}
        >
          <div
            style={{
              width: 620,
              padding: "18px 24px",
              backgroundColor: "rgba(2,11,24,0.72)",
              borderRadius: 16,
              border: `1.5px solid ${COLORS.glow}55`,
              boxShadow: `0 0 20px ${COLORS.glow}22`,
            }}
          >
            <div
              style={{
                fontFamily: FONT,
                fontSize: 20,
                fontWeight: 700,
                color: COLORS.cyan,
                letterSpacing: 3,
                textTransform: "uppercase",
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Phân bố
            </div>
            <div
              style={{
                fontFamily: FONT,
                fontSize: 30,
                fontWeight: 800,
                color: COLORS.cream,
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              🇷🇺 Biển Bering → 🇯🇵 Nhật Bản
              <br />
              → 🇲🇽 Baja California
            </div>
          </div>
        </div>

        {/* Size ruler — 15cm */}
        <Pill
          text="🐟 Kích thước: 15 cm (6 inch)"
          frame={frame}
          appearAt={350}
          bg="rgba(10,37,64,0.9)"
          color={COLORS.glow}
          size={36}
        />
      </AbsoluteFill>

      <VoiceTrack src="voice/barreleye-fish/vo-04.wav" />
      <WhisperxCaption captions={whisperxS04 as RemotionCaption[]} />

      <SceneSfx scene={sceneData} fromFrame={20} volume={0.14} />

      <FadeBlack
        frame={frame}
        totalFrames={durationInFrames}
        fadeInDuration={6}
        fadeOutDuration={8}
      />
    </AbsoluteFill>
  );
};
