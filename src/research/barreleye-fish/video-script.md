# Video Script — Cá Mắt Vòm (Barreleye Fish)

## Thông tin chung
- **Chủ đề:** Cá Mắt Vòm (*Macropinna microstoma*) — loài cá có đầu trong suốt duy nhất trên Trái Đất
- **Tiêu đề:** **Hồ Sơ #01: Loài cá có chiếc đầu trong suốt duy nhất trên Trái Đất**
- **Format:** TikTok dọc **9:16** — `1080 x 1920`, `fps 30`
- **Thời lượng dự kiến:** ~2 phút (8 scenes) — voice thực đo sau khi TTS
- **Giọng đọc TTS:** `giahuy` (Zero TTS)
- **Ngôn ngữ:** Tiếng Việt
- **Tông giọng:** Bí ẩn, kể chuyện khoa học kiểu "khám phá thế giới bên dưới" — tối, sâu, hồi hộp rồi bừng sáng ở các mốc "aha"

---

## Style Guide

### Màu sắc (palette biển sâu)
| Vai trò | Màu | Hex |
|---|---|---|
| Nền chính (nước sâu tối) | Xanh đen mực | `#020B18` |
| Nền phụ (ánh sáng ROV) | Xanh dương lạnh | `#0A2540` |
| Nhấn chính (mắt cá) | Xanh lá phát sáng | `#3DFFB3` |
| Nhấn phụ (bioluminescence) | Xanh cyan sáng | `#7EEBF5` |
| Text chính | Trắng ngà | `#F5FBFF` |
| Text nhấn số liệu | Xanh lá highlight | `#00FFA3` |
| Vảy cá / silhouette | Nâu đen | `#2A1810` |
| Cảnh báo / cảm xúc | Cam ấm (rất ít dùng) | `#FF6B4A` |

### Typography
- **Tiêu đề / số liệu lớn:** Sans-serif đậm (Anton / Bebas Neue / Montserrat Black) — in hoa
- **Caption / phụ đề:** Inter Bold hoặc Roboto Bold — outline đen 3-4px + shadow
- **Số liệu highlight:** Count-up animation, pop scale, glow xanh lá
- **Tên khoa học:** *Italic* — dưới tiêu đề chính

### Motion & Transition
- Scene 1: Zoom từ bề mặt biển → xuống 600m — dùng particle "marine snow" (hạt tuyết biển) chảy liên tục
- Giữa các scene: `fade` mềm (biển sâu, không giật cục kiểu TikTok điển hình)
- Chuyển sang "aha moment": `zoom + glow flash` xanh lá
- Cesium hoặc video stock deep-sea → **KHÔNG dùng Cesium** cho video này vì bối cảnh dưới biển, dùng video stock ROV footage + minh họa 2D

### Nhạc & âm thanh
- Nhạc nền: ambient underwater / bass sâu, hơi bí ẩn (không kịch tính quá — kiểu documentary NatGeo)
- SFX:
  - Scene 1 (hook): whoosh trầm + tiếng nước ép xuống độ sâu
  - Scene 2-3: nhấn xanh lá khi mắt hiện ra (chime nhẹ)
  - Scene 5 (mắt xoay): "click" cơ khí nhẹ
  - Scene 6 (trộm mồi): "sting" khi lướt qua xúc tu
  - Scene 8 (outro): fade nhạc + jingle CTA

### Persistent Header
- Dùng `ChannelHeader` — tên kênh **"Hồ Sơ Tự Nhiên"**, position top-left, size md
- Xuất hiện từ frame 0, giữ nguyên suốt video (theo rule bắt buộc)

---

## Cấu trúc Scene

> Frame tính @30fps. Thời lượng scene = voice + ~0.6s đệm. Voice thực đo bằng file WAV sau khi TTS.

| Scene | Tên | Voice ước tính | Thời lượng scene | Frame (30fps) |
|---|---|---|---|---|
| 1 | Hook — Xuống biển sâu | ~11s | 11.6s | 0–348 |
| 2 | Đầu trong suốt như buồng lái | ~15s | 15.6s | 348–816 |
| 3 | Hai chấm đen KHÔNG phải mắt | ~16s | 16.6s | 816–1314 |
| 4 | Nơi nó sống — vùng chạng vạng | ~14s | 14.6s | 1314–1752 |
| 5 | Bí ẩn 70 năm — mắt xoay được | ~20s | 20.6s | 1752–2370 |
| 6 | Kẻ trộm mồi của biển sâu | ~19s | 19.6s | 2370–2958 |
| 7 | Chỉ 9 lần trong 5.600 chuyến lặn | ~15s | 15.6s | 2958–3426 |
| 8 | Kết & CTA | ~10s | 10.6s | 3426–3744 |
| | **Tổng** | **~120s** | **~124.8s (3744f)** | |

---

## SCENE 1 — Hook: Xuống biển sâu

### Visual
- Mở bằng mặt biển yên tĩnh nhìn từ trên cao → **camera lao xuống nước**, ánh sáng mờ dần theo độ sâu.
- Text đồng hồ đo độ sâu ở góc: `100m → 300m → 500m → 800m` count-up.
- Đến độ sâu 700m, ánh sáng ROV rọi ra → **cá Mắt Vòm hiện lên trong bóng tối**, mắt xanh phát sáng qua vòm trong suốt.
- Marine snow (hạt tuyết biển) chảy chậm trong khung hình suốt scene.

### Text on screen
- (đồng hồ đếm độ sâu) `700 m`
- Title lớn: **CÁ MẮT VÒM**
- Subtitle italic: *Macropinna microstoma*

### Voice-over (VO-01)
> Sâu dưới đại dương Thái Bình Dương, ở nơi ánh sáng mặt trời gần như không thể chạm tới, tồn tại một sinh vật kỳ lạ đến mức khoa học phải mất bảy mươi năm mới hiểu được nó. Đây là Cá Mắt Vòm, loài cá duy nhất trên Trái Đất có chiếc đầu hoàn toàn trong suốt.

---

## SCENE 2 — Đầu trong suốt như buồng lái máy bay

### Visual
- Cận cảnh phần đầu cá — vòm trong suốt hiện rõ, ánh sáng xuyên qua.
- Overlay minh họa: **so sánh split** — đầu cá bên trái, buồng lái tiêm kích (F-16 cockpit) bên phải.
- Highlight vòng cong glow xanh cyan quanh mái vòm.
- Text mũi tên chỉ vào từng phần: `mái vòm trong suốt`, `dịch bên trong`, `hộp sọ`.

### Text on screen
- **CHIẾC ĐẦU NHƯ BUỒNG LÁI**
- `Mái vòm trong suốt • chứa đầy dịch`
- `Không loài cá nào khác có cấu trúc này`

### Voice-over (VO-02)
> Nhìn kỹ vào phần đầu của nó, bạn sẽ thấy một mái vòm trong veo bao trọn phía trên. Vòm này chứa đầy chất lỏng, hoạt động y hệt kính buồng lái của một chiếc máy bay chiến đấu. Và trên toàn bộ hành tinh này, không có loài cá nào khác sở hữu cấu tạo tương tự.

---

## SCENE 3 — Hai chấm đen KHÔNG phải mắt

### Visual
- Cận cảnh mặt cá nhìn thẳng — hai chấm đen phía trước rất "giống mắt".
- **Text đỏ nhấp nháy:** ❌ `KHÔNG PHẢI MẮT`
- Zoom vào hai chấm đen → label chuyển thành `LỖ MŨI` (cơ quan khứu giác).
- Camera pan lên phía trên → hai **quả cầu xanh lá phát sáng** bên trong vòm hiện ra.
- Text nhấn: ✅ `ĐÂY MỚI LÀ ĐÔI MẮT THẬT`
- Đôi mắt xanh có hiệu ứng glow pulse.

### Text on screen
- `❌ ĐÂY KHÔNG PHẢI MẮT`
- `Hai chấm đen = lỗ mũi (khứu giác)`
- `✅ ĐÔI MẮT THẬT nằm BÊN TRONG đầu`

### Voice-over (VO-03)
> Đây là điều khiến hầu hết mọi người bị lừa. Hai chấm đen ở phía trước mặt, trông y hệt như đôi mắt, thực ra chỉ là hai lỗ mũi. Còn đôi mắt thật của con cá lại là hai quả cầu xanh lá phát sáng, nằm sâu bên trong hộp sọ trong suốt.

---

## SCENE 4 — Nơi nó sống — vùng chạng vạng

### Visual
- Đồ họa cột nước biển theo chiều dọc — chia thành các tầng độ sâu.
- Highlight vùng **600-800m** với label "Vùng chạng vạng / Twilight Zone".
- Bản đồ Bắc Thái Bình Dương hiện lên → highlight vùng phân bố (Bering → Nhật Bản → Baja California).
- Thước tỉ lệ: silhouette cá cạnh cái thước → **15 cm**.

### Text on screen
- `600 – 800 m dưới mặt biển`
- `VÙNG CHẠNG VẠNG`
- `Bắc Thái Bình Dương`
- `Kích thước: 15 cm`

### Voice-over (VO-04)
> Cá Mắt Vòm sống ở độ sâu từ sáu trăm đến tám trăm mét, trong vùng gọi là vùng chạng vạng của đại dương. Nơi đó, ánh mặt trời chỉ còn là những tia sáng mờ nhạt. Nó phân bố khắp Bắc Thái Bình Dương, và cả cơ thể chỉ dài khoảng mười lăm xăng-ti-mét.

---

## SCENE 5 — Bí ẩn 70 năm — mắt xoay được

### Visual
- Timeline ngang: `1939 — Phát hiện lần đầu` → `2004 — Quay được cá sống` → `2009 — Giải bí ẩn`.
- Cảnh trong phòng lab MBARI → chuyển sang ROV lặn xuống biển sâu.
- **Trọng tâm:** Animation cá Mắt Vòm — **mắt xanh xoay 90°** từ hướng lên → hướng trước. Vòng cung mũi tên minh họa vòng xoay.
- Text tên nhà khoa học ghi credit dưới góc.

### Text on screen
- `1939 → 2009`
- `70 NĂM BÍ ẨN`
- `Mắt XOAY được bên trong đầu`
- (credit nhỏ) *MBARI — Robison & Reisenbichler, 2009*

### Voice-over (VO-05)
> Loài cá này được mô tả từ năm một chín ba chín, nhưng suốt bảy mươi năm sau đó, khoa học vẫn tin rằng mắt của nó cố định hướng lên trên. Mãi đến năm hai nghìn lẻ chín, hai nhà nghiên cứu tại Viện Em-ba-ri, bang Ca-li-pho-ni-a, mới chứng minh được sự thật gây sốc. Đôi mắt đó có thể xoay bên trong mái vòm trong suốt, từ nhìn lên trần cho tới nhìn thẳng về phía trước.

---

## SCENE 6 — Kẻ trộm mồi của biển sâu

### Visual
- Cá Mắt Vòm lơ lửng bất động dưới một con **sứa dây (siphonophore)** dài lê thê, xúc tu buông xuống.
- Xúc tu có các chấm sáng nhỏ (con mồi bị dính).
- Cá từ từ bơi lên, mắt xoay ra trước, **miệng nhỏ đớp gọn con mồi**.
- Overlay đường quét ánh sáng khi xúc tu chích vào vòm trong suốt → vòm không hề hấn gì (glow xanh cyan bảo vệ).

### Text on screen
- `KẺ TRỘM CỦA BIỂN SÂU`
- `Cướp mồi từ xúc tu sứa dây`
- `Mái vòm = tấm khiên chống chất độc`

### Voice-over (VO-06)
> Nhưng thứ ấn tượng nhất chính là cách nó kiếm ăn. Cá Mắt Vòm lơ lửng ngay bên dưới những con sứa dây khổng lồ, rồi giật lấy con mồi bị mắc kẹt trên xúc tu chích độc của chúng. Chiếc mái vòm trong suốt lúc này biến thành tấm khiên bảo vệ đôi mắt của nó khỏi những cái chích chết người.

---

## SCENE 7 — Chỉ 9 lần trong 5.600 chuyến lặn

### Visual
- Số liệu khổng lồ đếm lên trên nền tối:
  - `5.600+` chuyến lặn ROV
  - `27.600+` giờ video
  - `9` lần gặp — chữ `9` cực lớn, glow xanh lá pulse.
- Cảnh ROV Ventana quay được cá năm 2021 — phần video viral.
- Icon 🎥 nhỏ dưới góc.

### Text on screen
- `5.600+ chuyến lặn`
- `27.600+ giờ quay`
- **`CHỈ 9 LẦN GẶP`** (chữ lớn, glow)
- `Video viral toàn cầu — 12/2021`

### Voice-over (VO-07)
> Loài cá này hiếm đến mức nào? Trong hơn năm nghìn sáu trăm chuyến lặn và hai bảy nghìn sáu trăm giờ ghi hình, các robot lặn của Em-ba-ri chỉ bắt gặp Cá Mắt Vòm đúng chín lần. Cái nhìn hiếm hoi ấy quý giá đến mức mỗi lần đều trở thành sự kiện lan truyền toàn cầu.

---

## SCENE 8 — Kết & CTA

### Visual
- Cá Mắt Vòm bơi chậm biến mất vào bóng tối biển sâu.
- Text lớn hiện lên: **HỒ SƠ #01 — HOÀN TẤT**
- Logo kênh + CTA.

### Text on screen
- `HỒ SƠ #01 — CÁ MẮT VÒM`
- *Còn 8 triệu loài đang chờ được kể...*
- CTA: `Theo dõi để mở hồ sơ tiếp theo 🔍`

### Voice-over (VO-08)
> Đại dương đang giấu chúng ta hàng triệu bí mật khác. Nếu bạn thấy câu chuyện này thú vị, hãy theo dõi kênh để cùng mở những hồ sơ tiếp theo về những sinh vật kỳ lạ nhất hành tinh.

---

## Phiên âm tên riêng (dùng trong LỜI ĐỌC)

| Tên gốc | Phiên âm đọc |
|---|---|
| Macropinna microstoma | (không đọc trong voice, chỉ hiện text) |
| MBARI | Em-ba-ri |
| California | Ca-li-pho-ni-a |
| Bruce Robison | (paraphrase thành "hai nhà nghiên cứu") |
| Barreleye | (dùng tên Việt "Cá Mắt Vòm") |
| Siphonophore | sứa dây (dùng tên Việt) |
| ROV | robot lặn |
| twilight zone | vùng chạng vạng |

---

## Danh sách Voice-over tách sẵn cho TTS

> Chạy TTS với giọng `giahuy`, xuất ra `public/voice/barreleye-fish/`

| File | Scene | Nội dung |
|---|---|---|
| `voice/barreleye-fish/vo-01.wav` | 1 | Sâu dưới đại dương Thái Bình Dương... loài cá duy nhất trên Trái Đất có chiếc đầu hoàn toàn trong suốt. |
| `voice/barreleye-fish/vo-02.wav` | 2 | Nhìn kỹ vào phần đầu của nó... không có loài cá nào khác sở hữu cấu tạo tương tự. |
| `voice/barreleye-fish/vo-03.wav` | 3 | Đây là điều khiến hầu hết mọi người bị lừa... nằm sâu bên trong hộp sọ trong suốt. |
| `voice/barreleye-fish/vo-04.wav` | 4 | Cá Mắt Vòm sống ở độ sâu từ sáu trăm đến tám trăm mét... khoảng mười lăm xăng-ti-mét. |
| `voice/barreleye-fish/vo-05.wav` | 5 | Loài cá này được mô tả từ năm một chín ba chín... nhìn thẳng về phía trước. |
| `voice/barreleye-fish/vo-06.wav` | 6 | Nhưng thứ ấn tượng nhất chính là cách nó kiếm ăn... khỏi những cái chích chết người. |
| `voice/barreleye-fish/vo-07.wav` | 7 | Loài cá này hiếm đến mức nào?... sự kiện lan truyền toàn cầu. |
| `voice/barreleye-fish/vo-08.wav` | 8 | Đại dương đang giấu chúng ta hàng triệu bí mật khác... mở những hồ sơ tiếp theo về những sinh vật kỳ lạ nhất hành tinh. |

### Lệnh TTS mẫu (Bước 3)
```powershell
$env:PYTHONUTF8="1"; $env:PYTHONIOENCODING="utf-8"
uv run pipeline.py barreleye-fish
```
