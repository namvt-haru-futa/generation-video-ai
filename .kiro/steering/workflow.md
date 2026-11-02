# Video Production Workflow

Quy trình làm video gồm các bước theo thứ tự:

## Bước 1 — Kiếm fact (Research)
- Thu thập thông tin, dữ liệu, sự kiện cho chủ đề video.
- Dùng agent **`/tavily-cli`** để tìm kiếm thông tin (web search, extract nội dung trang, research chuyên sâu).
- Kết quả lưu trong `src/research/<topic>/`.

## Bước 2 — Viết script video
- Dựa trên facts đã thu thập, lên kịch bản hoàn chỉnh cho video.
- File lưu tại `src/research/<topic>/video-script.md`.
- Script bao gồm:
  - **Cấu trúc scene** (tên, thời lượng từng scene)
  - **Visual** — mô tả hình ảnh, animation, text on screen cho từng scene
  - **Script giọng đọc** — lời thoại đọc cho từng scene
  - **Style guide** — màu sắc, typography, transition
- Format video cần xác định rõ trước khi viết script (TikTok 9:16, YouTube 16:9, v.v.)
- Script giọng đọc cần tách sẵn theo từng scene để dễ chạy TTS ở bước tiếp theo.

### ⚠️ BẮT BUỘC — Review script trước khi làm video
- Viết script xong **PHẢI dừng lại và đưa cho user review**, KHÔNG tự động chạy sang Bước 3.
- Chờ user xác nhận / chỉnh sửa. User có thể sửa trực tiếp trong `video-script.md`.
- Sau khi user chỉnh, **đọc lại script và áp dụng ĐÚNG NGUYÊN VĂN những gì user đã sửa** vào các bước sau:
  - **Voice-over** → dùng đúng text để chạy TTS (Bước 3).
  - **Text on screen** → chèn đúng chữ đó vào overlay của scene component (Bước 7), KHÔNG tự diễn giải/paraphrase lại.
  - **Caption** → bám sát nội dung Voice-over.
- **Script là nguồn chân lý (source of truth).** Trước khi dựng mỗi scene ở Bước 7, đối chiếu lại với script để đảm bảo lời đọc + text on screen khớp đúng bản mới nhất user đã duyệt.
- Nếu user báo đã sửa script, đọc lại toàn bộ script và đồng bộ lại voice/caption/overlay cho khớp.

### Companion file — `script.json` (cho tool automation)
Sau khi user duyệt `video-script.md`, tạo thêm file structured `src/research/<topic>/script.json` để pipeline tự chạy Bước 3 + 4. Đây là bản index máy đọc được của script — `video-script.md` vẫn là bản người đọc và là source of truth.

**Schema:**
```json
{
  "topic": "death-valley",
  "title": "Thung lũng Chết — ...",
  "aspect": "9:16",
  "fps": 30,
  "voice": {
    "provider": "zerotts",
    "voice": "giahuy",
    "gapMs": 300
  },
  "scenes": [
    {
      "id": "vo-01",
      "name": "Hook — Zoom vũ trụ → Death Valley",
      "component": "Scene01",
      "voiceText": "Ẩn mình ở phía đông bang Ca-li-pho-ni-a...",
      "overlayText": ["📍 DEATH VALLEY", "THUNG LŨNG CHẾT", "California, Hoa Kỳ"],
      "durationHint": 13.0,
      "sfx": null,
      "notes": "Cesium flythrough..."
    }
  ]
}
```

Rule:
- `id` phải khớp tên file voice: `vo-01` → `public/voice/<topic>/vo-01.wav` → `src/research/<topic>/captions/vo-01.json`.
- `voiceText` **copy nguyên văn** từ Voice-over trong markdown (đã dùng phiên âm nếu có).
- `overlayText` là mảng các dòng text on screen — Bước 7 chèn thẳng vào scene component, KHÔNG paraphrase.
- `durationHint` chỉ để so sánh với thời lượng thực đo từ WAV — không dùng để cắt clip. Có thể để null.
- `sfx` là override cho SFX selector (Bước 4.5). Values: `null` (auto), `"hook"` / `"outro"` / `"callout"` / … (ép category), `"category/file.ogg"` (file cụ thể), `"none"` (tắt SFX). Mặc định để `null` cho scene giữa để semantic match tự lo, override chỉ khi cần ép — điển hình là scene đầu (`"hook"`) và scene cuối (`"outro"`).
- Xem `src/research/death-valley/script.json` làm mẫu.

Khi user sửa `video-script.md`, **đồng bộ luôn `script.json`** cho khớp trước khi chạy pipeline lại.

## Bước 3 — Tạo voice (TTS)

### 🚀 Cách nhanh — chạy pipeline.py orchestrate cả Bước 3 + 4
Sau khi có `script.json`, dùng `pipeline.py` để tự động chạy TTS + WhisperX align cho toàn bộ scene + audit độ dài thực tế:

```powershell
$env:PYTHONUTF8="1"; $env:PYTHONIOENCODING="utf-8"
uv run pipeline.py <topic>              # full pipeline: TTS → align → audit
uv run pipeline.py <topic> --dry-run    # chỉ audit (không chạy TTS/align)
uv run pipeline.py <topic> --only vo-03 # chỉ 1 scene (lặp được: --only vo-01 --only vo-03)
uv run pipeline.py <topic> --skip-align # chỉ TTS + audit
uv run pipeline.py <topic> --force-tts  # ép re-TTS toàn bộ (dù wav đã có)
uv run pipeline.py <topic> --phrase     # align ra phrase-level thay vì word-level
uv run pipeline.py --help               # xem toàn bộ option
```

- **Idempotent** — file đã tồn tại thì bỏ qua. Xoá `public/voice/<topic>/vo-XX.wav` hoặc `src/research/<topic>/captions/vo-XX.json` để re-generate scene đó, rồi chạy lại pipeline.
- **Audit table** cuối output báo: từng scene có voice/captions chưa, real duration (giây + frame @ fps), so với `durationHint`, và Δ giữa captions.endMs cuối và độ dài WAV. Dùng để phát hiện scene bị hụt/thừa.
- Vẫn có thể gọi tay `tts.py` / `whisperx-align.py` (mô tả bên dưới) khi muốn debug 1 scene cụ thể.

### Cách gọi tay từng script (khi debug 1 scene)
- Dùng **Zero TTS** (`zerotts`) để tổng hợp giọng đọc tiếng Việt từ script.
- Giọng mặc định: **giahuy**.
- **QUY ƯỚC THƯ MỤC (bắt buộc):** Mỗi topic có thư mục con riêng trong `public/voice/`.
  File voice phải bỏ vào `public/voice/<topic>/`, **KHÔNG** để trực tiếp ngoài `public/voice/`.
  - Đúng: `public/voice/death-valley/vo-01.wav`
  - Sai:  `public/voice/vo-01.wav`
- Lệnh:
  ```powershell
  uv run tts.py "Nội dung cần đọc." -o public/voice/<topic>/vo-01.wav
  uv run tts.py "Nội dung cần đọc." -o public/voice/<topic>/vo-01.wav --voice "giahuy"
  ```
- Remotion dùng qua `staticFile("voice/<topic>/vo-01.wav")`.
- Trên Windows, ép UTF-8 trước khi chạy để tránh lỗi in console:
  ```powershell
  $env:PYTHONUTF8="1"; $env:PYTHONIOENCODING="utf-8"
  ```
- Xem danh sách giọng: `uv run tts.py --list-voices`
- Cài package nếu chưa có: `uv pip install zerotts`
- Giọng có sẵn: `baotrang`, `giahuy`, `hamy`, `huuduc`, `kimoanh`, `maichi`, `quangminh`, `tiendat`
- Lần đầu chạy sẽ tải model (~911 MB) về Hugging Face cache.

## Bước 4 — Tạo caption (WhisperX word-level alignment)

> 💡 **Nếu đã chạy `pipeline.py <topic>` ở Bước 3, caption đã được sinh sẵn** — nhảy xuống mục "Post-edit" bên dưới để đối chiếu chính tả. Phần dưới đây mô tả cách gọi tay `whisperx-align.py` khi cần debug 1 file voice cụ thể.

### Cách chính — WhisperX transcribe + align từ file voice

Dùng script **`whisperx-align.py`** ở root project để transcribe file WAV thành caption JSON theo đúng **Remotion `Caption` type** (import từ `@remotion/captions`).

**Schema output (mỗi entry):**
```ts
type Caption = {
  text: string;
  startMs: number;    // ms từ đầu voice
  endMs: number;      // ms từ đầu voice
  timestampMs: number | null;
  confidence: number | null;
};
```

**Lệnh cho 1 file voice (word-level, mặc định):**
```powershell
$env:PYTHONUTF8="1"; $env:PYTHONIOENCODING="utf-8"
uv run whisperx-align.py public/voice/<topic>/vo-01.wav `
  -o src/research/<topic>/captions/vo-01.json
```

**Batch cả folder voice của topic:**
```powershell
uv run whisperx-align.py public/voice/<topic>/ `
  -o src/research/<topic>/captions/
```

**Phrase-level** (gộp thành cụm 4-6 từ, dễ đọc hơn cho phụ đề short-form):
```powershell
uv run whisperx-align.py public/voice/<topic>/vo-01.wav `
  -o src/research/<topic>/captions/vo-01.json --phrase
```

### Cài đặt (lần đầu)

```powershell
uv pip install whisperx imageio-ffmpeg
```

Không cần cài `ffmpeg` system-wide — script tự dùng binary bundle từ `imageio-ffmpeg`.

Lần đầu chạy sẽ tải model:
- **faster-whisper `medium`** ~1.5 GB (default; đổi `--model small` để nhanh hơn)
- **wav2vec2 alignment model tiếng Việt** `nguyenvulebinh/wav2vec2-base-vietnamese-250h` ~370 MB

### Tuỳ chọn quan trọng
- `--model {tiny|base|small|medium|large-v3}` — mặc định `medium`. CPU-only nên dùng `small` cho test nhanh, `medium` cho chất lượng tốt.
- `--language` — mặc định `vi`. Đổi khi voice là ngôn ngữ khác.
- `--device cuda --compute-type float16` — bật khi có GPU CUDA (mặc định `cpu/int8`).
- `--no-align` — fallback khi alignment model tiếng Việt fail; output sẽ chỉ ở segment-level.
- `--phrase-max-words`, `--phrase-max-gap-ms` — tuning gộp cụm.

### ⚠️ Post-edit sau khi transcribe
- WhisperX có thể **nghe sai dấu tiếng Việt** (vd `Ẩn` → `Ân`, `biên` → `điên`) mặc dù TTS đọc rõ.
- **Đối chiếu lại với script gốc (`video-script.md`) và sửa `text` trong JSON cho đúng nguyên văn.** Timing (`startMs`/`endMs`) giữ nguyên — nó vẫn chính xác dù chữ sai.
- Đây là bước bắt buộc: caption phải khớp voice-over trong script user đã duyệt.

### Cách dùng caption trong Remotion

Import type chuẩn từ `@remotion/captions`:
```tsx
import type { Caption } from "@remotion/captions";
import captions from "../../research/<topic>/captions/vo-01.json";

const CaptionOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentMs = (frame / fps) * 1000;
  const active = (captions as Caption[]).find(
    (c) => currentMs >= c.startMs && currentMs < c.endMs
  );
  if (!active) return null;
  return <div className="caption">{active.text}</div>;
};
```

Convert `startMs` → frame khi cần đặt `<Sequence from={...}>`:
```ts
const startFrame = Math.round((c.startMs / 1000) * fps);
const durationInFrames = Math.max(1, Math.round(((c.endMs - c.startMs) / 1000) * fps));
```

Style caption: text ngắn (≤2 dòng), font lớn, outline đen + shadow để đọc được trên nền bất kỳ.

### Fallback — ước tính thủ công (khi WhisperX không dùng được)

Nếu không cài được WhisperX hoặc alignment model tiếng Việt fail hoàn toàn:
- Đo thời lượng từng WAV bằng `ffprobe -v error -show_entries format=duration -of csv=p=0 file.wav`.
- Chia đều số ms cho số từ trong script → sinh caption JSON thủ công theo cùng schema `Caption` như trên.
- Kém chính xác hơn nhưng vẫn dùng được component render như bình thường.

## Bước 4.5 — Sound Effects (SFX)

Mỗi scene tự động được gắn 1 SFX ngắn (whoosh / ding / chime…) trộn dưới voice ~18% volume. Chọn theo 3 tầng ưu tiên (giống repo `huytranvan2010/AI-auto-generate-video`):

1. **Override** trong `script.json` (field `sfx`):
   - `"sfx": "hook"` — ép category, hash sceneId để pick file trong đó.
   - `"sfx": "callout/pluck_002.ogg"` — chỉ định thẳng file cụ thể.
   - `"sfx": "none"` — tắt SFX cho scene này.
   - `"sfx": null` — bỏ qua override, đi tiếp tầng 2.
2. **Semantic match** — quét `voiceText` tìm keyword tiếng Việt:
   - `kỷ lục, cao nhất, thấp nhất, nóng nhất…` → **success** chime
   - `thảm kịch, mắc kẹt, lạc, vĩnh biệt…` → **alert** tone
   - `bạn có biết, kỳ diệu, khám phá, bí ẩn…` → **reveal** sparkle
   - `khắc nghiệt, sa mạc, ngàn năm, màn đêm…` → **drone** bell
3. **Default theo vị trí scene** — scene đầu → **hook**, scene cuối → **outro**, giữa → **callout**.

Trong 1 category, dùng djb2 hash `sceneId` để chọn file deterministic — cùng script luôn ra cùng SFX.

### Cài SFX pack lần đầu

```powershell
uv run sfx-download.py         # tải ~29 file Kenney CC0 → public/assets/sfx/<category>/
uv run sfx-download.py --scan-only   # regen manifest.json sau khi tự thêm/bớt file
```

Nguồn: Kenney game assets (CC0 v1.0, không cần attribution) qua mirror GitHub `lavenderdotpet/CC0-Public-Domain-Sounds`. Format `.ogg`, Remotion `<Audio>` phát native.

### Chèn SFX vào scene component (Bước 7)

Import helper `SceneSfx` + import scene metadata từ `script.json`:
```tsx
import { SceneSfx } from "../../lib/SceneSfx";
import script from "../../research/<topic>/script.json";

const sceneData = script.scenes.find((s) => s.id === "vo-01")!;

// Trong return của scene component:
<SceneSfx scene={sceneData} fromFrame={102} volume={0.22} />
```

- `fromFrame` — frame bắt đầu SFX (mặc định 0 = ngay đầu scene). Đặt trễ để SFX rơi trúng khoảnh khắc overlay text hiện, số count-up landing, v.v.
- `volume` — mặc định 0.18. Bump lên 0.22-0.28 nếu SFX to át voice; giảm xuống 0.10-0.15 khi SFX loud (jingles).

### Audit SFX trong pipeline

`pipeline.py` tự dự đoán SFX cho mỗi scene rồi hiển thị trong bảng audit. Ví dụ:
```
vo-05   ✅  ✅  20.7s  21.3s  −0.6s  622  −0.3s  alert/error_003.ogg   semantic
vo-08   ✅  ✅  12.1s  12.7s  −0.6s  362  −0.1s  outro/jingles_PIZZI14 override
```
Column `Reason` cho biết SFX chọn qua tầng nào (override / semantic / default). Nếu manifest thiếu category (chưa cài pack) → hiển thị `⚠ category/?`.

Khi vừa thả file SFX mới vào `public/assets/sfx/<category>/` thủ công, chạy `uv run pipeline.py <topic> --scan-sfx` để pipeline regenerate manifest trước khi audit.

## Bước 5 — Tìm tư liệu hình ảnh / video
- Dùng `/tavily-cli` để tìm nguồn ảnh và video miễn phí cho các scene.
- Ưu tiên nguồn **Creative Commons / royalty-free**: Pexels, Unsplash, Pixabay, Wikimedia Commons.
- Lưu danh sách URL tư liệu tại `src/research/<topic>/assets.md`.
- Mỗi asset ghi rõ: URL, loại (ảnh/video), mô tả, giấy phép, scene tương ứng.

## Bước 6 — Tải tư liệu về
- Tải video và ảnh đã chọn về thư mục `public/assets/video/` và `public/assets/images/`.
- Đặt tên file theo convention: `v01-mô-tả.mp4`, `i01-mô-tả.jpg`.

### Phương án tải

**Phương án 1 — Direct download (thử trước):**
```powershell
# Dùng curl hoặc Invoke-WebRequest
curl -L -o "public/assets/video/v01-mo-ta.mp4" "https://..."
```

**Phương án 2 — Playwright (dùng khi URL không tải trực tiếp được):**

Khi các trang như Pexels, Pixabay yêu cầu JavaScript render hoặc redirect qua link ẩn, dùng script Playwright để truy cập trang và intercept request tải file thực sự:

```powershell
uv run playwright-download.py --url "https://www.pexels.com/video/xxxx/" --out "public/assets/video/v01-mo-ta.mp4"
```

Script `playwright-download.py` nằm ở root project, logic:
1. Dùng `async_playwright` mở trang URL đã cho.
2. Intercept response có `Content-Type: video/*` hoặc `image/*` để lấy URL thực.
3. Hoặc click nút Download, chờ file được tải về, rồi move vào đúng thư mục.

Cài Playwright nếu chưa có:
```powershell
uv pip install playwright
uv run playwright install chromium
```

## Bước 7 — Xây dựng Remotion composition
- Tạo các scene component trong `src/compositions/<topic>/`.
- Mỗi scene là một file riêng: `Scene01.tsx`, `Scene02.tsx`, …
- File chính `<Topic>Video.tsx` dùng `<TransitionSeries>` ghép các scene.
- Đăng ký trong `src/Root.tsx` (từng scene + video chính trong `<Folder>`).
- Assets dùng `staticFile("assets/video/...")` và `staticFile("assets/images/...")`.
- Audio dùng `<Audio>` (voice) và `<OffthreadVideo>` (video) từ `remotion`.
- Caption component đọc từ file captions đã tạo ở bước 4.
- Format TikTok: `width={1080}`, `height={1920}`, `fps={30}`.

### ⚠️ Cảnh Cesium / WebGL nặng — PHẢI pre-render ra mp4
- Cesium (3D flythrough) rất nặng và hay crash tab khi render batch (lỗi `Target closed`, timeout `delayRender`).
- KHÔNG để Cesium chạy trực tiếp trong video chính. Thay vào đó:
  1. Tách riêng component Cesium "trần" (không overlay) + đăng ký 1 composition riêng (vd `DV-S01-CesiumBG`).
  2. Pre-render ra mp4 MỘT LẦN: `npx remotion render src/index.ts <CesiumComp> public/assets/video/<topic>/sceneXX-flythrough.mp4 --gl=angle --concurrency=1 --timeout=180000`
  3. Trong scene thật, phát lại mp4 bằng `<OffthreadVideo src={staticFile(...)} />` + overlay/voice/caption live.
- Nhờ vậy render video chính KHÔNG cần `--gl=angle`, không lo Cesium crash/timeout, và nhanh hơn nhiều.

### ⚠️ BẮT BUỘC — Header component
- **Mỗi video PHẢI có header component chèn vào**, hiển thị xuyên suốt toàn bộ video.
- Dùng `ChannelHeader` dùng chung ở `src/compositions/shared/ChannelHeader.tsx`.
- Chèn ở **cấp video chính** (`<Topic>Video.tsx`), overlay đè lên `<TransitionSeries>` — KHÔNG đặt trong từng scene (tránh animation lặp lại mỗi scene).
- Dùng frame toàn cục qua `useCurrentFrame()` để header animate 1 lần ở đầu rồi giữ nguyên.
- Mẫu:
  ```tsx
  const PersistentHeader: React.FC = () => {
    const frame = useCurrentFrame();
    return <ChannelHeader frame={frame} appearAt={0} position="top-left" size="md" channelName="Hồ Sơ Tự Nhiên" />;
  };
  // ...
  <AbsoluteFill>
    <TransitionSeries> ... </TransitionSeries>
    <PersistentHeader />   {/* đặt SAU TransitionSeries để nổi lên trên */}
  </AbsoluteFill>
  ```
