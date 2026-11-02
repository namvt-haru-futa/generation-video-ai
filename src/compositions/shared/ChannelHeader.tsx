/**
 * ChannelHeader — Overlay xuất hiện ở đầu mỗi video
 * Hiển thị icon paw + tên kênh "Hồ Sơ Tự Nhiên"
 *
 * Cách dùng:
 *   <ChannelHeader frame={frame} appearAt={0} />
 *
 * Props:
 *   frame     — useCurrentFrame() từ scene cha
 *   appearAt  — frame bắt đầu hiện (default: 0)
 *   position  — "top-left" | "top-right" | "top-center" (default: "top-left")
 *   size      — "sm" | "md" | "lg" (default: "md")
 */

import React from "react";
import { interpolate, Easing, Img, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/BeVietnamPro";

const { fontFamily: HEADER_FONT } = loadFont("normal", {
  weights: ["500", "800"],
  subsets: ["vietnamese", "latin"],
});

// ─── Types ────────────────────────────────────────────────────────────────
type Position = "top-left" | "top-right" | "top-center";
type Size = "sm" | "md" | "lg";

interface ChannelHeaderProps {
  frame: number;
  appearAt?: number;
  position?: Position;
  size?: Size;
  /** Nếu truyền, hiển thị logo ảnh thật thay cho icon paw SVG.
   *  Đường dẫn tương đối trong public/, vd "assets/images/header/icon-header.webp" */
  logoSrc?: string;
  /** Ẩn phần chữ (dùng khi logo đã chứa sẵn tên kênh) */
  hideText?: boolean;
  /** Tên kênh hiển thị (mặc định "Hồ Sơ Tự Nhiên") */
  channelName?: string;
}

// ─── Size presets ─────────────────────────────────────────────────────────
const SIZE_CONFIG: Record<Size, { icon: number; text: number; gap: number; padding: string }> = {
  sm: { icon: 36, text: 24, gap: 10, padding: "10px 20px" },
  md: { icon: 48, text: 30, gap: 14, padding: "14px 28px" },
  lg: { icon: 60, text: 38, gap: 18, padding: "18px 36px" },
};

// ─── Position presets ─────────────────────────────────────────────────────
const POSITION_STYLE: Record<Position, React.CSSProperties> = {
  "top-left": { top: 60, left: 40, right: "auto", transform: "none" },
  "top-right": { top: 60, right: 40, left: "auto", transform: "none" },
  "top-center": { top: 60, left: "50%", right: "auto", transform: "translateX(-50%)" },
};

// ─── PawIcon SVG ──────────────────────────────────────────────────────────
const PawIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Bốn ngón */}
    <ellipse cx="14" cy="16" rx="7" ry="9" fill={color} />
    <ellipse cx="30" cy="10" rx="7" ry="9" fill={color} />
    <ellipse cx="46" cy="16" rx="7" ry="9" fill={color} />
    <ellipse cx="56" cy="30" rx="6" ry="8" fill={color} />
    {/* Lòng bàn chân */}
    <path
      d="M10 38 C8 28 20 22 32 26 C44 22 56 28 54 38 C52 50 44 58 32 58 C20 58 12 50 10 38Z"
      fill={color}
    />
  </svg>
);

// ─── LeafIcon SVG (thay thế nếu muốn dùng icon lá thay paw) ───────────────
// const LeafIcon: React.FC<{ size: number; color: string }> = ({ size, color }) => ( ... )

// ─── Main Component ───────────────────────────────────────────────────────
export const ChannelHeader: React.FC<ChannelHeaderProps> = ({
  frame,
  appearAt = 0,
  position = "top-left",
  size = "md",
  logoSrc,
  hideText = false,
  channelName = "Hồ Sơ Tự Nhiên",
}) => {
  const cfg = SIZE_CONFIG[size];
  const pos = POSITION_STYLE[position];

  // Slide down từ trên + fade in
  const opacity = interpolate(frame, [appearAt, appearAt + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.ease),
  });

  const translateY = interpolate(frame, [appearAt, appearAt + 14], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Icon pulse nhẹ sau khi hiện
  const iconScale = interpolate(
    frame,
    [appearAt + 14, appearAt + 20, appearAt + 26],
    [1, 1.15, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.inOut(Easing.ease),
    }
  );

  return (
    <div
      style={{
        position: "absolute",
        ...pos,
        opacity,
        transform: `${pos.transform ?? ""} translateY(${translateY}px)`,
        display: "flex",
        alignItems: "center",
        gap: cfg.gap,
        // Pill background bán trong suốt
        background: "rgba(10, 22, 40, 0.72)",
        backdropFilter: "blur(8px)",
        borderRadius: 999,
        padding: cfg.padding,
        border: "1.5px solid rgba(168, 216, 234, 0.35)",
        // Shadow xanh nhạt
        boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 12px rgba(168,216,234,0.15)",
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      {/* Icon / Logo */}
      <div
        style={{
          transform: `scale(${iconScale})`,
          display: "flex",
          alignItems: "center",
          flexShrink: 0,
          filter: "drop-shadow(0 2px 6px rgba(168,216,234,0.5))",
        }}
      >
        {logoSrc ? (
          <Img
            src={staticFile(logoSrc)}
            style={{
              height: cfg.icon,
              width: "auto",
              objectFit: "contain",
              display: "block",
            }}
          />
        ) : (
          <PawIcon size={cfg.icon} color="#A8D8EA" />
        )}
      </div>

      {!hideText && (
        <>
          {/* Divider dọc */}
          <div
            style={{
              width: 1.5,
              height: cfg.icon * 0.75,
              background: "rgba(168,216,234,0.4)",
              borderRadius: 2,
              flexShrink: 0,
            }}
          />

          {/* Text */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              lineHeight: 1,
            }}
          >
            {/* Nhãn nhỏ */}
            <span
              style={{
                color: "#A8D8EA",
                fontSize: cfg.text * 0.52,
                fontWeight: 500,
                fontFamily: HEADER_FONT,
                letterSpacing: 2.5,
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              KÊNH
            </span>
            {/* Tên kênh */}
            <span
              style={{
                color: "#F5F5F5",
                fontSize: cfg.text,
                fontWeight: 800,
                fontFamily: HEADER_FONT,
                letterSpacing: 0.5,
                textShadow: "0 1px 6px rgba(0,0,0,0.7)",
                whiteSpace: "nowrap",
              }}
            >
              {channelName}
            </span>
          </div>
        </>
      )}
    </div>
  );
};
