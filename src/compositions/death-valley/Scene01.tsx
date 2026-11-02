import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  OffthreadVideo,
  staticFile,
} from "remotion";
import { VoiceTrack } from "./shared";
import { Caption } from "./Caption";
import { captionsS01 } from "./captions";
import { SceneSfx } from "../../lib/SceneSfx";
import script from "../../research/death-valley/script.json";

const sceneData = script.scenes.find((s) => s.id === "vo-01")!;

// Số frame cho đoạn zoom từ vũ trụ (4s @30fps)
const INTRO_FRAMES = 120;

// Scene 1 — Hook: zoom từ vũ trụ → lướt trên Thung lũng Chết + tiêu đề
export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Tiêu đề xuất hiện ngay khi zoom gần hoàn tất (~3.4s)
  const titleIn = spring({
    frame: frame - fps * 3.4,
    fps,
    config: { damping: 200 },
  });
  const titleY = interpolate(titleIn, [0, 1], [60, 0]);

  const subtitleOpacity = interpolate(
    frame,
    [fps * 4.4, fps * 5.2],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Vignette đậm dần theo lúc hạ xuống mặt đất
  const vignetteOpacity = interpolate(
    frame,
    [INTRO_FRAMES - 30, INTRO_FRAMES + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Nền: video Cesium đã pre-render (zoom vũ trụ → flythrough).
          Render 1 lần bằng composition DV-S01-CesiumBG (cần --gl=angle),
          giờ chỉ phát lại nên render video chính không còn phụ thuộc Cesium. */}
      <OffthreadVideo
        src={staticFile("assets/video/death-valley/scene01-flythrough.mp4")}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      {/* Vignette tối để text nổi bật (chỉ hiện khi đã xuống mặt đất) */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(0,0,0,0) 38%, rgba(26,18,6,0.85) 100%)",
          opacity: vignetteOpacity,
        }}
      />

      {/* Marker vị trí */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 500,
          opacity: titleIn,
        }}
      >
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 44,
            fontWeight: 700,
            color: "#FFF8EC",
            letterSpacing: 2,
            textShadow: "0 2px 12px rgba(0,0,0,0.9)",
          }}
        >
          📍 California, Hoa Kỳ
        </div>
      </AbsoluteFill>

      {/* Tiêu đề chính */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `translateY(${titleY}px)`,
          opacity: titleIn,
        }}
      >
        <h1
          style={{
            fontFamily: "sans-serif",
            fontSize: 150,
            fontWeight: 900,
            color: "#FFF8EC",
            textAlign: "center",
            lineHeight: 1.0,
            margin: 0,
            textShadow: "0 4px 24px rgba(0,0,0,0.95)",
            WebkitTextStroke: "2px rgba(0,0,0,0.35)",
          }}
        >
          THUNG LŨNG
          <br />
          <span style={{ color: "#FF6B1A" }}>CHẾT</span>
        </h1>
      </AbsoluteFill>

      {/* Subtitle hook */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 380,
          opacity: subtitleOpacity,
        }}
      >
        <div
          style={{
            fontFamily: "sans-serif",
            fontSize: 44,
            fontWeight: 700,
            color: "#E8B84B",
            textAlign: "center",
            textShadow: "0 2px 12px rgba(0,0,0,0.9)",
            maxWidth: 820,
            lineHeight: 1.25,
          }}
        >
          Nơi nóng nhất từng ghi nhận trên Trái Đất
        </div>
      </AbsoluteFill>

      {/* Giọng đọc + phụ đề */}
      <VoiceTrack src="voice/death-valley/vo-01.wav" />
      <Caption captions={captionsS01} />

      {/* SFX — hook chime khi tiêu đề landing (~3.4s = frame 102) */}
      <SceneSfx scene={sceneData} fromFrame={102} volume={0.22} />
    </AbsoluteFill>
  );
};
