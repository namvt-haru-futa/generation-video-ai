/**
 * Captions — Phụ đề đồng bộ giọng đọc
 * Timing tính theo frame @ 30fps, relative to scene start
 *
 * Thời lượng voice thực tế (đo từ WAV):
 *   S01: 6.56s  = 196f
 *   S02: 14.00s = 420f
 *   S03: 12.16s = 364f
 *   S04: 13.92s = 417f
 *   S05: 8.08s  = 242f
 *   S06: 5.20s  = 156f
 */

export interface CaptionEntry {
  startFrame: number;
  endFrame: number;
  text: string;
}

// ─── Scene 01 — Hook (196f total) ─────────────────────────────────────────
export const captionsS01: CaptionEntry[] = [
  { startFrame: 5,   endFrame: 55,  text: "Nặng 800 kí. Cao 3 mét." },
  { startFrame: 55,  endFrame: 115, text: "Không có kẻ thù tự nhiên nào." },
  { startFrame: 115, endFrame: 196, text: "Đây là loài thú ăn thịt\nlớn nhất hành tinh." },
];

// ─── Scene 02 — Cỗ máy săn mồi (420f total) ──────────────────────────────
export const captionsS02: CaptionEntry[] = [
  { startFrame: 5,   endFrame: 90,  text: "Khứu giác ngửi được con mồi\ntừ 16 kilômet." },
  { startFrame: 90,  endFrame: 160, text: "Xa hơn cả sân bay Nội Bài\ntới trung tâm Hà Nội." },
  { startFrame: 160, endFrame: 230, text: "Kỹ thuật săn: đứng im hàng giờ\nbên lỗ thở của hải cẩu." },
  { startFrame: 230, endFrame: 285, text: "Chờ. Không nhúc nhích." },
  { startFrame: 285, endFrame: 355, text: "Khi con mồi ló ra —\n40 kilômet một giờ." },
  { startFrame: 355, endFrame: 420, text: "Không kịp phản ứng." },
];

// ─── Scene 03 — Bí mật lông trắng (364f total) ───────────────────────────
export const captionsS03: CaptionEntry[] = [
  { startFrame: 5,   endFrame: 80,  text: "Lông gấu bắc cực\nthực ra không trắng." },
  { startFrame: 80,  endFrame: 170, text: "Từng sợi lông rỗng và trong suốt —\nphản chiếu ánh sáng mới ra màu trắng." },
  { startFrame: 170, endFrame: 240, text: "Bên dưới: da đen\nhấp thụ nhiệt mặt trời." },
  { startFrame: 240, endFrame: 305, text: "Mỡ dày 10 centimet." },
  { startFrame: 305, endFrame: 364, text: "Sau khi bơi lên —\nrũ một cái, khô ngay." },
];

// ─── Scene 04 — Người mẹ phi thường (417f total) ─────────────────────────
export const captionsS04: CaptionEntry[] = [
  { startFrame: 5,   endFrame: 75,  text: "Tháng Mười, gấu mẹ đào hang tuyết —" },
  { startFrame: 75,  endFrame: 135, text: "rồi không bước ra 8 tháng." },
  { startFrame: 135, endFrame: 185, text: "Không ăn. Không uống." },
  { startFrame: 185, endFrame: 255, text: "Trong bóng tối đó,\ngấu con chào đời." },
  { startFrame: 255, endFrame: 315, text: "Chỉ 500 gram —\nbằng con chuột lang." },
  { startFrame: 315, endFrame: 375, text: "Đến tháng Ba, cả nhà bước ra." },
  { startFrame: 375, endFrame: 417, text: "Và mẹ lập tức đi săn —\nvì đã nhịn 8 tháng rồi." },
];

// ─── Scene 05 — Thế giới đang tan (242f total) ───────────────────────────
export const captionsS05: CaptionEntry[] = [
  { startFrame: 5,   endFrame: 65,  text: "Nhưng mỗi năm băng tan sớm hơn." },
  { startFrame: 65,  endFrame: 115, text: "Không có băng — không săn được." },
  { startFrame: 115, endFrame: 160, text: "Không săn được — chết đói." },
  { startFrame: 160, endFrame: 210, text: "Toàn thế giới còn 26.000 con." },
  { startFrame: 210, endFrame: 242, text: "Và đang giảm." },
];

// ─── Scene 06 — Kết (156f total) ─────────────────────────────────────────
export const captionsS06: CaptionEntry[] = [
  { startFrame: 5,   endFrame: 75,  text: "150.000 năm tồn tại." },
  { startFrame: 75,  endFrame: 130, text: "Chúng không cần chúng ta cứu —" },
  { startFrame: 130, endFrame: 156, text: "chúng chỉ cần chúng ta dừng phá." },
];

// ─── All captions map ─────────────────────────────────────────────────────
export const allCaptions = {
  s01: captionsS01,
  s02: captionsS02,
  s03: captionsS03,
  s04: captionsS04,
  s05: captionsS05,
  s06: captionsS06,
};
