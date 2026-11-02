/**
 * Captions — Phụ đề đồng bộ giọng đọc (video Thung Lũng Chết)
 * Timing tính theo frame @ 30fps, RELATIVE to scene start.
 *
 * Thời lượng voice thực tế (đo từ file WAV):
 *   S01 (vo-01): 12.4s = 372f
 *   S02 (vo-02): 17.9s = 537f
 *   S03 (vo-03): 18.4s = 552f
 *   S04 (vo-04): 19.3s = 579f
 *   S05 (vo-05): 20.7s = 621f
 *   S06 (vo-06): 24.5s = 735f
 *   S07 (vo-07): 16.2s = 486f
 *   S08 (vo-08): 12.1s = 363f
 *
 * ⚠️ Caption text là văn bản ĐỌC ĐƯỢC (vd "134°F", "Death Valley", "1913"),
 *    khác với script TTS (phiên âm "Phơ-nít Crík", số viết chữ) để phụ đề
 *    gọn & dễ đọc trên màn hình.
 *
 * ⚠️ Scene 01: 0–120f là đoạn zoom từ vũ trụ. Voice VO-01 phát từ đầu scene
 *    nên caption cũng khởi từ ~frame 4 (chạy đè lên đoạn zoom + flythrough).
 */

export interface CaptionEntry {
  startFrame: number;
  endFrame: number;
  text: string;
}

// ─── Scene 01 — Hook: zoom vũ trụ → Death Valley (voice 372f) ──────────────
export const captionsS01: CaptionEntry[] = [
  { startFrame: 4, endFrame: 81, text: "Ẩn mình ở phía đông\nbang California," },
  { startFrame: 81, endFrame: 155, text: "ngay sát biên giới Nevada,\nnước Mỹ." },
  { startFrame: 155, endFrame: 230, text: "Nơi được xem là\nnóng nhất thế giới," },
  { startFrame: 230, endFrame: 311, text: "với mức nhiệt độ\nkỷ lục từng ghi nhận." },
  { startFrame: 311, endFrame: 372, text: "Đây chính là\nThung Lũng Chết." },
];

// ─── Scene 02 — Nơi nóng nhất Trái Đất (voice 537f) ────────────────────────
export const captionsS02: CaptionEntry[] = [
  { startFrame: 4, endFrame: 63, text: "Ngày 10 tháng 7, 1913," },
  { startFrame: 63, endFrame: 177, text: "nhiệt kế tại Furnace Creek\nchạm mốc 134°F," },
  { startFrame: 177, endFrame: 228, text: "tương đương 56,7°C." },
  { startFrame: 228, endFrame: 355, text: "Đến nay vẫn là nhiệt độ\ncao nhất thế giới." },
  { startFrame: 355, endFrame: 450, text: "Mùa hè, mặt đất nóng\ntới gần 93°C —" },
  { startFrame: 450, endFrame: 537, text: "đủ sức chiên chín\nmột quả trứng." },
];

// ─── Scene 03 — Điểm thấp nhất Bắc Mỹ (voice 552f) ─────────────────────────
export const captionsS03: CaptionEntry[] = [
  { startFrame: 4, endFrame: 106, text: "Không chỉ nóng, đây còn là\nnơi thấp nhất Bắc Mỹ." },
  { startFrame: 106, endFrame: 160, text: "Tại lòng chảo Badwater," },
  { startFrame: 160, endFrame: 268, text: "cánh đồng muối trắng xóa\ntrải dài đến tận chân trời" },
  { startFrame: 268, endFrame: 336, text: "nằm ở 86 mét\ndưới mực nước biển." },
  { startFrame: 336, endFrame: 399, text: "Chỉ cách đó chừng 24 km," },
  { startFrame: 399, endFrame: 494, text: "đỉnh Telescope Peak\nvươn cao hơn 3.300 mét," },
  { startFrame: 494, endFrame: 552, text: "và có tuyết vào mùa đông." },
];

// ─── Scene 04 — Khô hạn nhất, từng là biển & hồ (voice 579f) ───────────────
export const captionsS04: CaptionEntry[] = [
  { startFrame: 4, endFrame: 83, text: "Mỗi năm nơi đây chỉ đón\nchưa đầy 5 cm mưa," },
  { startFrame: 83, endFrame: 142, text: "vùng khô hạn bậc nhất\nBắc Mỹ." },
  { startFrame: 142, endFrame: 207, text: "Nhưng hàng trăm\ntriệu năm trước," },
  { startFrame: 207, endFrame: 294, text: "cả khu vực này từng nằm\ndưới một vùng biển ấm." },
  { startFrame: 294, endFrame: 353, text: "Và chỉ mới\n15.000 năm trước," },
  { startFrame: 353, endFrame: 432, text: "một hồ nước khổng lồ\nmang tên Lake Manly" },
  { startFrame: 432, endFrame: 489, text: "vẫn còn phủ kín thung lũng," },
  { startFrame: 489, endFrame: 579, text: "trước khi bốc hơi, để lại\nnhững cánh đồng muối." },
];

// ─── Scene 05 — Cái tên "Thung lũng Chết" ra đời (voice 621f) ──────────────
export const captionsS05: CaptionEntry[] = [
  { startFrame: 4, endFrame: 85, text: "Nhưng vì sao lại gọi là\nThung Lũng Chết?" },
  { startFrame: 85, endFrame: 149, text: "Cái tên ấy không đến\ntừ cái nóng," },
  { startFrame: 149, endFrame: 194, text: "mà từ một thảm kịch." },
  { startFrame: 194, endFrame: 241, text: "Mùa đông năm 1849," },
  { startFrame: 241, endFrame: 326, text: "một đoàn người tìm vàng\nđã lạc vào đây," },
  { startFrame: 326, endFrame: 424, text: "mắc kẹt suốt nhiều tuần\ngiữa vùng đất khắc nghiệt." },
  { startFrame: 424, endFrame: 498, text: "Số ít người sống sót\nngoảnh lại và nói:" },
  { startFrame: 498, endFrame: 566, text: "“Vĩnh biệt, Thung Lũng Chết.”" },
  { startFrame: 566, endFrame: 621, text: "Và cái tên đó\nở lại mãi mãi." },
];

// ─── Scene 06 — Sự sống kỳ diệu giữa địa ngục (voice 735f) ─────────────────
export const captionsS06: CaptionEntry[] = [
  { startFrame: 4, endFrame: 80, text: "Nghe thì tưởng chẳng có gì\nsống nổi," },
  { startFrame: 80, endFrame: 154, text: "nhưng đây là nhà của\nhơn 50 loài thú," },
  { startFrame: 154, endFrame: 193, text: "gần 400 loài chim," },
  { startFrame: 193, endFrame: 254, text: "và cả những loài cá tí hon." },
  { startFrame: 254, endFrame: 320, text: "Đặc biệt nhất là\ncá pupfish —" },
  { startFrame: 320, endFrame: 400, text: "hậu duệ của loài cá\ntừ thời hồ băng hà," },
  { startFrame: 400, endFrame: 483, text: "sống sót đến nay trong\ndòng suối mặn chát." },
  { startFrame: 483, endFrame: 555, text: "Và sau những\nmùa đông mưa nhiều," },
  { startFrame: 555, endFrame: 647, text: "cả sa mạc bừng nở\nhàng triệu bông hoa dại —" },
  { startFrame: 647, endFrame: 735, text: "hiện tượng kỳ diệu\n“siêu nở hoa”." },
];

// ─── Scene 07 — Con người vẫn sống ở đây (voice 486f) ──────────────────────
export const captionsS07: CaptionEntry[] = [
  { startFrame: 4, endFrame: 61, text: "Và điều tuyệt vời nhất:" },
  { startFrame: 61, endFrame: 137, text: "con người vẫn sinh sống\nngay tại đây." },
  { startFrame: 137, endFrame: 241, text: "Người Timbisha Shoshone\ngắn bó hơn 1.000 năm." },
  { startFrame: 241, endFrame: 335, text: "Ngày nay, khoảng 50 người\nvẫn sống quanh năm" },
  { startFrame: 335, endFrame: 401, text: "tại ốc đảo Furnace Creek," },
  { startFrame: 401, endFrame: 486, text: "giữa lòng nơi khắc nghiệt\nnhất hành tinh." },
];

// ─── Scene 08 — Kết & CTA (voice 363f) ─────────────────────────────────────
export const captionsS08: CaptionEntry[] = [
  { startFrame: 4, endFrame: 60, text: "Nóng nhất, khô nhất,\nthấp nhất —" },
  { startFrame: 60, endFrame: 112, text: "nhưng cũng đẹp\nđến nghẹt thở," },
  { startFrame: 112, endFrame: 172, text: "nhất là khi màn đêm\nbuông xuống" },
  { startFrame: 172, endFrame: 226, text: "và cả dải ngân hà hiện ra." },
  { startFrame: 226, endFrame: 290, text: "Nếu bạn thích những\nvùng đất kỳ lạ," },
  { startFrame: 290, endFrame: 363, text: "hãy theo dõi để cùng\nkhám phá tiếp nhé." },
];

// ─── All captions map ──────────────────────────────────────────────────────
export const allCaptions = {
  s01: captionsS01,
  s02: captionsS02,
  s03: captionsS03,
  s04: captionsS04,
  s05: captionsS05,
  s06: captionsS06,
  s07: captionsS07,
  s08: captionsS08,
};
