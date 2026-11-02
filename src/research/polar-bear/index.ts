/**
 * Polar Bear Research — Index
 * Entry point xuất tất cả dữ liệu nghiên cứu về gấu bắc cực
 *
 * Cấu trúc:
 *   overview.ts       — Tổng quan: phân loại, phân bố, tiến hóa
 *   biology.ts        — Sinh học & thể chất: kích thước, lông, da, di chuyển
 *   behavior.ts       — Hành vi & săn mồi: kỹ thuật săn, chế độ ăn, bơi lội
 *   reproduction.ts   — Sinh sản & nuôi con: giao phối, thai kỳ, phát triển con non
 *   conservation.ts   — Bảo tồn & mối đe dọa: biến đổi khí hậu, nỗ lực bảo tồn
 *   culture.ts        — Văn hóa & lịch sử: Inuit, Nanook, pop culture
 */

export { polarBearOverview } from "./overview";
export { polarBearBiology } from "./biology";
export { polarBearBehavior } from "./behavior";
export { polarBearReproduction } from "./reproduction";
export { polarBearConservation } from "./conservation";
export { polarBearCulture } from "./culture";

// Convenience: tất cả trong một object
export { polarBearOverview as overview } from "./overview";
export { polarBearBiology as biology } from "./biology";
export { polarBearBehavior as behavior } from "./behavior";
export { polarBearReproduction as reproduction } from "./reproduction";
export { polarBearConservation as conservation } from "./conservation";
export { polarBearCulture as culture } from "./culture";
