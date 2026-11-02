/**
 * Captions — Phụ đề đồng bộ giọng đọc (video Thú Mỏ Vịt)
 * Timing tính theo frame @ 30fps, RELATIVE to scene start.
 *
 * Thời lượng voice thực tế (đo từ WAV bằng ffprobe):
 *   S01 (voice-01-intro-perry):        10.88s = 326f   (+ meme 3s = 90f mở đầu, KHÔNG có caption)
 *   S02 (voice-02-hoax-eggs):          15.41s = 462f
 *   S03 (voice-03-electroreception):   13.12s = 394f
 *   S04 (voice-04-venom-milk):         16.00s = 480f
 *   S05 (voice-05-uv-genome):          14.43s = 433f
 *   S06 (voice-06-conservation-outro): 14.64s = 439f
 *
 * ⚠️ Scene 01: 0–90f là nhịp meme "Perry the Platypus" (audio gốc, không phụ đề tiếng Việt).
 *    Voiceover bắt đầu từ frame 90 → caption S01 khởi từ frame 90.
 *    Tổng thời lượng Scene 01 ≈ 90 + 326 = 416f.
 *
 * Caption text là văn bản ĐỌC ĐƯỢC (vd "Năm 2020"), khác với script TTS
 * (đọc "hai nghìn không trăm hai mươi") để phụ đề gọn, dễ đọc.
 */

export interface CaptionEntry {
  startFrame: number;
  endFrame: number;
  text: string;
}

// ─── Scene 01 — Hook: meme + lời dẫn (tổng ~416f; caption từ 90f) ──────────
export const captionsS01: CaptionEntry[] = [
  { startFrame: 90,  endFrame: 155, text: "Chắc nhiều bạn từng xem\nPhineas and Ferb," },
  { startFrame: 155, endFrame: 228, text: "ấn tượng ngay với\nchú thú mỏ vịt Perry." },
  { startFrame: 228, endFrame: 334, text: "Nhưng thú mỏ vịt ngoài đời\nlà con vật như thế nào?" },
  { startFrame: 334, endFrame: 416, text: "Sau đây là vài sự thật\nkhó tin về chúng." },
];

// ─── Scene 02 — Bị nghi là trò lừa + đẻ trứng (462f) ──────────────────────
export const captionsS02: CaptionEntry[] = [
  { startFrame: 5,   endFrame: 72,  text: "Nó có mỏ như vịt,\nđuôi như hải ly," },
  { startFrame: 72,  endFrame: 102, text: "chân như rái cá." },
  { startFrame: 102, endFrame: 192, text: "Khi các nhà khoa học châu Âu\nlần đầu nhìn thấy nó," },
  { startFrame: 192, endFrame: 244, text: "họ còn tưởng đây là trò lừa —" },
  { startFrame: 244, endFrame: 319, text: "ai đó khâu mỏ vịt\nvào một con vật khác." },
  { startFrame: 319, endFrame: 356, text: "Nhưng nó hoàn toàn có thật." },
  { startFrame: 356, endFrame: 462, text: "Và là một trong số ít thú có vú\nlại đẻ trứng." },
];

// ─── Scene 03 — Săn mồi bằng điện (394f) ──────────────────────────────────
export const captionsS03: CaptionEntry[] = [
  { startFrame: 5,   endFrame: 55,  text: "Khi lặn, nó nhắm mắt, bịt tai," },
  { startFrame: 55,  endFrame: 91,  text: "bịt luôn cả mũi." },
  { startFrame: 91,  endFrame: 139, text: "Vậy làm sao nó săn mồi?" },
  { startFrame: 139, endFrame: 163, text: "Bằng điện." },
  { startFrame: 163, endFrame: 235, text: "Cái mỏ dò được những tín hiệu\nđiện cực nhỏ," },
  { startFrame: 235, endFrame: 286, text: "phát ra từ cơ bắp con mồi —" },
  { startFrame: 286, endFrame: 352, text: "y hệt cách một con cá mập\nsăn mồi." },
  { startFrame: 352, endFrame: 394, text: "Cực hiếm ở loài thú." },
];

// ─── Scene 04 — Nọc độc + tiết sữa qua da (480f) ──────────────────────────
export const captionsS04: CaptionEntry[] = [
  { startFrame: 5,   endFrame: 21,  text: "Chưa hết." },
  { startFrame: 21,  endFrame: 85,  text: "Con đực có cựa độc ở chân sau —" },
  { startFrame: 85,  endFrame: 166, text: "một loài thú có vú\nlại có nọc độc." },
  { startFrame: 166, endFrame: 206, text: "Nọc không giết được người," },
  { startFrame: 206, endFrame: 295, text: "nhưng đau đến mức không thuốc\ngiảm đau nào dập nổi." },
  { startFrame: 295, endFrame: 319, text: "Còn con cái?" },
  { startFrame: 319, endFrame: 408, text: "Nuôi con bằng sữa —\nnhưng không hề có núm vú." },
  { startFrame: 408, endFrame: 480, text: "Sữa rỉ thẳng qua da\ncho con liếm." },
];

// ─── Scene 05 — Phát sáng UV + bộ gen (433f) ──────────────────────────────
export const captionsS05: CaptionEntry[] = [
  { startFrame: 5,   endFrame: 23,  text: "Năm 2020," },
  { startFrame: 23,  endFrame: 103, text: "các nhà khoa học phát hiện\nthêm một điều điên rồ:" },
  { startFrame: 103, endFrame: 210, text: "dưới tia cực tím, bộ lông nâu\nphát sáng màu xanh lục." },
  { startFrame: 210, endFrame: 290, text: "Đến giờ vẫn chưa ai\nlý giải được tại sao." },
  { startFrame: 290, endFrame: 370, text: "Con người chỉ có hai\nnhiễm sắc thể giới tính." },
  { startFrame: 370, endFrame: 433, text: "Còn thú mỏ vịt có tới… mười." },
];

// ─── Scene 06 — Kết: bảo tồn + callback meme (439f) ───────────────────────
export const captionsS06: CaptionEntry[] = [
  { startFrame: 5,   endFrame: 48,  text: "Sinh vật kỳ lạ này\nchỉ còn sống" },
  { startFrame: 48,  endFrame: 111, text: "ở các dòng nước ngọt\nmiền đông nước Úc," },
  { startFrame: 111, endFrame: 188, text: "và đang bị xếp vào nhóm\nsắp bị đe dọa." },
  { startFrame: 188, endFrame: 251, text: "Nên lần tới nghe tới thú mỏ vịt —" },
  { startFrame: 251, endFrame: 303, text: "đừng chỉ nghĩ \"à, con Perry\"." },
  { startFrame: 303, endFrame: 392, text: "Nó là một trong những sinh vật\nkhó tin nhất hành tinh." },
  { startFrame: 392, endFrame: 439, text: "Theo dõi để xem thêm nhé." },
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
