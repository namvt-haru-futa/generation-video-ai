/**
 * SFX Selector — chọn 1 file SFX cho scene theo 3 tầng ưu tiên:
 *
 *   1. Override:      scene.sfx = "callout/pluck_001.ogg"  → dùng file này
 *                     scene.sfx = "none"                    → tắt SFX
 *   2. Semantic:      Quét voiceText tìm keyword tiếng Việt
 *                     ("kỷ lục" → success, "thảm kịch" → alert…)
 *   3. Scene default: hook / outro theo vị trí, còn lại → callout
 *
 * Trong 1 category, hash sceneId để pick file deterministic — cùng script,
 * cùng scene id luôn cho cùng file, nhưng scene khác trong cùng category
 * sẽ nhận file khác.
 *
 * Manifest sinh bởi `sfx-download.py` (hoặc `sfx-download.py --scan-only`
 * khi thêm/bớt file thủ công).
 */

import { staticFile } from "remotion";
import manifestJson from "../../public/assets/sfx/manifest.json";

// ─────────────────────────────── Types ───────────────────────────────

export type SfxCategory =
  | "hook"
  | "callout"
  | "success"
  | "alert"
  | "reveal"
  | "drone"
  | "outro";

export type SfxScene = {
  /** Scene id — cần ổn định để hash cho deterministic pick */
  id: string;
  /** Voice-over text — để match keyword */
  voiceText: string;
  /**
   * Override:
   *   - `null` / undefined → tự chọn theo tầng 2 + 3
   *   - `"none"`           → tắt SFX cho scene này
   *   - `"category/file.ogg"` → chỉ định file cụ thể (relative to public/assets/sfx/)
   *   - `"category"` (không có `/`) → ép chọn category, hash pick file trong đó
   */
  sfx?: string | null;
  /** Optional — override tầng 3 nếu muốn ép hook/outro/body */
  sceneType?: "hook" | "body" | "outro";
};

type Manifest = {
  categories: Partial<Record<SfxCategory, string[]>>;
};

const manifest = manifestJson as Manifest;

// ─────────────────────────────── Keyword map ───────────────────────────────
//
// Tiếng Việt (không dấu tiếng lower để đơn giản; giữ nguyên dấu vì
// voice-text người viết luôn có dấu). Order matters — match đầu tiên
// wins, nên bỏ keyword đặc thù trước, chung chung sau.

const KEYWORDS: ReadonlyArray<{ words: readonly string[]; category: SfxCategory }> = [
  {
    category: "alert",
    words: [
      "cảnh báo",
      "nguy hiểm",
      "chết chóc",
      "thảm kịch",
      "thảm hoạ",
      "thảm họa",
      "mắc kẹt",
      "lạc",
      "mất tích",
      "vĩnh biệt",
      "cái chết",
    ],
  },
  {
    category: "success",
    words: [
      "kỷ lục",
      "cao nhất",
      "thấp nhất",
      "khô hạn nhất",
      "nóng nhất",
      "lớn nhất",
      "đạt mức",
      "chinh phục",
      "kỳ tích",
      "vô địch",
    ],
  },
  {
    category: "reveal",
    words: [
      "bạn có biết",
      "kỳ diệu",
      "đặc biệt",
      "tuyệt vời",
      "khám phá",
      "bí ẩn",
      "hoá ra",
      "hóa ra",
      "hiện ra",
      "bừng nở",
      "sống sót",
    ],
  },
  {
    category: "drone",
    words: [
      "khắc nghiệt",
      "sa mạc",
      "hoang mạc",
      "hàng triệu năm",
      "hàng trăm triệu",
      "ngàn năm",
      "nghìn năm",
      "mãi mãi",
      "màn đêm",
    ],
  },
];

// ─────────────────────────────── Helpers ───────────────────────────────

/** djb2 hash — deterministic + fast. */
function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (h * 33 + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

function pickFromCategory(category: SfxCategory, sceneId: string): string | null {
  const files = manifest.categories[category];
  if (!files || files.length === 0) return null;
  const idx = hashString(sceneId) % files.length;
  return `${category}/${files[idx]}`;
}

function matchByKeyword(voiceText: string): SfxCategory | null {
  const lower = voiceText.toLowerCase();
  for (const rule of KEYWORDS) {
    for (const word of rule.words) {
      if (lower.includes(word)) return rule.category;
    }
  }
  return null;
}

// ─────────────────────────────── Public API ───────────────────────────────

export type SfxResolution = {
  /** staticFile URL sẵn sàng cho <Audio src={...}/> — null nếu tắt/không có */
  src: string | null;
  /** Đường dẫn tương đối trong assets/sfx/ (để debug/log) */
  relativePath: string | null;
  /** Cách được chọn: "override" | "semantic" | "default" | "muted" | "missing" */
  reason: "override" | "semantic" | "default" | "muted" | "missing";
  category: SfxCategory | null;
};

/**
 * Resolve SFX cho 1 scene.
 *
 * Ví dụ:
 *   const { src } = resolveSfx({ id: "vo-02", voiceText: "...", sceneType: "body" });
 *   {src && <Audio src={src} volume={0.18} />}
 */
export function resolveSfx(scene: SfxScene): SfxResolution {
  // Tầng 1 — override
  if (scene.sfx === "none") {
    return { src: null, relativePath: null, reason: "muted", category: null };
  }
  if (scene.sfx) {
    // Có "/" → file cụ thể ("category/file.ogg")
    if (scene.sfx.includes("/")) {
      return {
        src: staticFile(`assets/sfx/${scene.sfx}`),
        relativePath: scene.sfx,
        reason: "override",
        category: scene.sfx.split("/")[0] as SfxCategory,
      };
    }
    // Không có "/" → treat như category name → hash pick
    const cat = scene.sfx as SfxCategory;
    const rel = pickFromCategory(cat, scene.id);
    if (rel) {
      return {
        src: staticFile(`assets/sfx/${rel}`),
        relativePath: rel,
        reason: "override",
        category: cat,
      };
    }
    return { src: null, relativePath: null, reason: "missing", category: cat };
  }

  // Tầng 2 — semantic keyword
  const kwCat = matchByKeyword(scene.voiceText);
  if (kwCat) {
    const rel = pickFromCategory(kwCat, scene.id);
    if (rel) {
      return {
        src: staticFile(`assets/sfx/${rel}`),
        relativePath: rel,
        reason: "semantic",
        category: kwCat,
      };
    }
  }

  // Tầng 3 — scene type default
  const defaultCat: SfxCategory =
    scene.sceneType === "hook" ? "hook"
    : scene.sceneType === "outro" ? "outro"
    : "callout";

  const rel = pickFromCategory(defaultCat, scene.id);
  if (rel) {
    return {
      src: staticFile(`assets/sfx/${rel}`),
      relativePath: rel,
      reason: "default",
      category: defaultCat,
    };
  }
  return { src: null, relativePath: null, reason: "missing", category: defaultCat };
}

/**
 * Danh sách category available trong manifest hiện tại.
 * Handy cho tool audit / debug.
 */
export function availableCategories(): SfxCategory[] {
  return Object.keys(manifest.categories) as SfxCategory[];
}
