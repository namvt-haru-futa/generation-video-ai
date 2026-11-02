# Video Script — Thung lũng Chết (Death Valley)

## Thông tin chung
- **Chủ đề:** Death Valley — nơi nóng nhất, khô nhất, thấp nhất Bắc Mỹ
- **Format:** TikTok dọc **9:16** — `1080 x 1920`, `fps 30`
- **Thời lượng thực tế (theo voice đã render):** ~146 giây / ~2m26s (8 scenes) — đã căn theo file WAV thật
- **Giọng đọc TTS:** `giahuy` (Zero TTS)
- **Ngôn ngữ:** Tiếng Việt
- **Tông giọng:** Kể chuyện, cuốn hút, hơi kịch tính (kiểu "khám phá bí ẩn")

---

## Style Guide

### Màu sắc (palette sa mạc)
| Vai trò | Màu | Hex |
|---|---|---|
| Nền chính (tối) | Đen nâu | `#1A1206` |
| Nhấn nóng (heat) | Cam cháy | `#FF6B1A` |
| Nhấn phụ | Vàng cát | `#E8B84B` |
| Text chính | Trắng ngà | `#FFF8EC` |
| Text số liệu (highlight) | Cam sáng | `#FF8C24` |
| Muối / lạnh | Xanh tái | `#8FB8C9` |

### Typography
- **Tiêu đề / số liệu lớn:** Font sans-serif đậm (Montserrat / Anton / Bebas Neue) — in hoa, bold
- **Caption / phụ đề:** Sans-serif dễ đọc (Inter / Roboto Bold), size lớn, có outline đen + shadow
- **Số liệu kỷ lục:** Animation đếm số (count-up) hoặc pop scale

### Transition
- Scene 1 → 2: Zoom xuyên (continue zoom) hoặc fade từ cảnh vệ tinh
- Giữa các scene facts: `slide` ngang hoặc `whip pan` nhanh (kiểu TikTok)
- Chuyển tông cảm xúc (harsh → life): `fade` mềm
- Dùng `@remotion/transitions` (`fade`, `slide`, `wipe`)

### Nhạc & âm thanh
- Nhạc nền: ambient sa mạc + trống dồn nhẹ ở phần kỷ lục
- SFX: gió sa mạc (scene mở), "whoosh" khi chuyển số liệu

---

## Cấu trúc Scene

> Frame tính @30fps, mỗi scene = thời lượng voice + ~0.6s đệm (chưa trừ overlap transition). Voice thực đo bằng file WAV.

| Scene | Tên | Voice | Thời lượng scene | Frame (30fps) |
|---|---|---|---|---|
| 1 | Hook — Zoom vũ trụ → Death Valley | 12.4s | 13.0s | 0–390 |
| 2 | Nơi nóng nhất Trái Đất (134°F) | 17.9s | 18.5s | 390–945 |
| 3 | Điểm thấp nhất Bắc Mỹ (Badwater) | 18.4s | 19.0s | 945–1515 |
| 4 | Khô hạn nhất — nhưng từng là biển & hồ | 19.3s | 20.0s | 1515–2115 |
| 5 | Cái tên "Thung lũng Chết" ra đời | 20.7s | 21.3s | 2115–2754 |
| 6 | Sự sống kỳ diệu giữa địa ngục | 24.5s | 25.1s | 2754–3507 |
| 7 | Con người vẫn sống ở đây | 16.2s | 16.8s | 3507–4011 |
| 8 | Kết & CTA | 12.1s | 12.7s | 4011–4392 |
| | **Tổng** | **141.5s** | **~146.4s (4392f)** | |

---

## SCENE 1 — Hook: Lướt Trái Đất tới Death Valley
**Thời lượng:** 0–10s (frame 0–300)

### Visual
- Mở bằng **animation Trái Đất từ không gian** (globe view), rồi **camera lướt/zoom dần xuống** khu vực Bắc Mỹ → California → zoom sát vào Death Valley.
- **Kỹ thuật đề xuất:** Dùng **Cesium 3D Flythrough** có sẵn trong skill `remotion-maps/techniques/cesium` (cần MapTiler API key). Camera bắt đầu ở altitude cao (view toàn cầu) → hạ dần xuống địa hình sa mạc thực tế của Death Valley.
  - **Phương án dự phòng (không cần API key):** dùng video stock "earth zoom to location" tải từ Pexels/NASA, hoặc animation zoom trên ảnh vệ tinh tĩnh (Google Earth screenshot) + hiệu ứng `scale` + `blur` của Remotion.
- Khi camera dừng ở Death Valley: hiện **pin/marker** + text lớn.

### Text on screen
- (khi zoom gần) Marker: `📍 DEATH VALLEY`
- Title lớn xuất hiện: **"THUNG LŨNG CHẾT"**
- Subtitle: *California, Hoa Kỳ*

### Voice-over (VO-01)
> Ẩn mình ở phía đông bang Ca-li-pho-ni-a, ngay sát biên giới Nê-va-đa, nước Mỹ. Đây là nơi được xem là nóng nhất thế giới, với mức nhiệt độ kỷ lục từng được ghi nhận. Đây chính là Thung Lũng Chết.

---

## SCENE 2 — Nơi nóng nhất Trái Đất
**Thời lượng:** 10–22s (frame 300–660)

### Visual
- Cảnh sa mạc khô cằn, mặt đất nứt nẻ, sóng nhiệt bốc lên (heat haze).
- **Số liệu khổng lồ** đếm tăng dần lên: `56.7°C` (134°F) — hiệu ứng count-up + rung/glow cam.
- Chèn hình tấm biển nhiệt kế nổi tiếng ở Furnace Creek.
- Góc màn hình: dòng chữ nhỏ *10/7/1913 — Furnace Creek*.

### Text on screen
- **56.7°C** (134°F)
- `KỶ LỤC NHIỆT ĐỘ CAO NHẤT HÀNH TINH`
- badge: *10 tháng 7, 1913*

### Voice-over (VO-02)
> Ngày mười tháng bảy năm một nghìn chín trăm mười ba, nhiệt kế tại Phơ-nít Crík chạm mốc một trăm ba mươi tư độ F — tương đương với năm mươi sáu phẩy bảy độ C. Đến hôm nay, đây vẫn là nhiệt độ không khí cao nhất từng được ghi nhận trên toàn thế giới. Vào mùa hè, mặt đất ở đây có thể nóng tới gần chín mươi ba độ C — đủ sức chiên chín một quả trứng.

---

## SCENE 3 — Điểm thấp nhất Bắc Mỹ
**Thời lượng:** 22–33s (frame 660–990)

### Visual
- Cảnh **Badwater Basin** — cánh đồng muối trắng xóa trải dài, hoa văn lục giác.
- Đồ họa thanh đo độ cao: mũi tên chỉ xuống `-86m / -282ft` dưới mực nước biển.
- Đối lập: chèn nhanh đỉnh **Telescope Peak** phủ tuyết (3,368m) — hiệu ứng split so sánh cao/thấp.

### Text on screen
- **-86 m** (-282 ft)
- `ĐIỂM THẤP NHẤT BẮC MỸ`
- so sánh: `Badwater -86m  ⟷  Telescope Peak 3.368m`

### Voice-over (VO-03)
> Không chỉ nóng, Thung Lũng Chết còn là nơi thấp nhất Bắc Mỹ. Tại lòng chảo Bát-oa-tơ, cánh đồng muối trắng xóa trải dài đến tận chân trời nằm ở tám mươi sáu mét dưới mực nước biển. Điều kỳ lạ là chỉ cách đó chừng hai mươi bốn cây số, đỉnh Te-lơ-xcốp Pík lại vươn cao hơn ba nghìn ba trăm mét, và có tuyết vào mùa đông.

---

## SCENE 4 — Khô hạn nhất, nhưng từng là biển & hồ
**Thời lượng:** 33–45s (frame 990–1350)

### Visual
- Đất nứt nẻ khô hạn → **morph/transition** sang hình ảnh minh họa biển cổ đại và hồ Manly xanh biếc (dùng overlay bán trong suốt, hiệu ứng nước).
- Timeline đồ họa: `Biển 500 triệu năm trước → Hồ băng hà 15.000 năm trước → Sa mạc hôm nay`.

### Text on screen
- `~1.9 inch mưa / năm`
- `KHÔ HẠN NHẤT BẮC MỸ`
- timeline: *Từng là đáy biển → Từng là hồ khổng lồ → Sa mạc*

### Voice-over (VO-04)
> Mỗi năm nơi đây chỉ đón chưa đầy năm xăng-ti-mét mưa, khiến nó trở thành vùng khô hạn bậc nhất Bắc Mỹ. Nhưng bạn có biết rằng, hàng trăm triệu năm trước, cả khu vực này từng nằm dưới một vùng biển ấm. Và chỉ mới mười lăm nghìn năm trước, một hồ nước khổng lồ mang tên Men-li vẫn còn phủ kín thung lũng, trước khi bốc hơi hoàn toàn và để lại những cánh đồng muối như ngày nay.

---

## SCENE 5 — Cái tên "Thung lũng Chết" ra đời
**Thời lượng:** 45–57s (frame 1350–1710)

### Visual
- Tông cảnh chuyển tối, kịch tính. Hình ảnh minh họa **đoàn xe ngựa (wagon)** đi lạc trong sa mạc (tranh vẽ cổ / ảnh đen trắng vintage).
- Text năm `1849` hiện lớn. Hiệu ứng bụi, ánh nắng gắt.

### Text on screen
- `MÙA ĐÔNG 1849`
- `"Goodbye, Death Valley"`

### Voice-over (VO-05)
> Nhưng vì sao lại gọi là Thung Lũng Chết? Cái tên ấy không đến từ cái nóng, mà từ một thảm kịch. Mùa đông năm một nghìn tám trăm bốn mươi chín, một đoàn người đi tìm vàng đã lạc vào đây và mắc kẹt suốt nhiều tuần giữa vùng đất khắc nghiệt. Khi số ít người sống sót thoát ra được, họ ngoảnh lại và nói: Vĩnh biệt, Thung Lũng Chết. Và cái tên đó ở lại mãi mãi.

---

## SCENE 6 — Sự sống kỳ diệu giữa địa ngục
**Thời lượng:** 57–70s (frame 1710–2100)

### Visual
- Tông sáng lên, đầy sức sống. Chuỗi hình nhanh: **cá pupfish** bơi trong suối, **superbloom** hoa dại vàng rực phủ sa mạc, cáo sa mạc, cừu sừng lớn (bighorn sheep), kangaroo rat.
- Số liệu icon: `56 🦊  •  400 🐦  •  6 🐟`.

### Text on screen
- `SỰ SỐNG VẪN TỒN TẠI`
- `56 loài thú • ~400 loài chim • 6 loài cá`
- highlight: *Cá Pupfish — sống sót từ kỷ băng hà*

### Voice-over (VO-06)
> Nghe thì tưởng chẳng có gì sống nổi, nhưng Thung Lũng Chết lại là nhà của hơn năm mươi loài thú, gần bốn trăm loài chim, và cả những loài cá tí hon. Đặc biệt nhất là cá pắp-phít — hậu duệ của những chú cá từ thời hồ băng hà, sống sót đến tận hôm nay trong dòng suối mặn chát. Và sau những mùa đông mưa nhiều, cả sa mạc bừng nở hàng triệu bông hoa dại trong hiện tượng kỳ diệu mang tên siêu nở hoa.

---

## SCENE 7 — Con người vẫn sống ở đây
**Thời lượng:** 70–80s (frame 2100–2400)

### Visual
- Hình ảnh làng Furnace Creek, ốc đảo cọ xanh giữa sa mạc, người Timbisha Shoshone.
- Con số `~50 người` hiện lên, cạnh `hơn 1.000 năm`.

### Text on screen
- `NGƯỜI TIMBISHA SHOSHONE`
- `~50 người sống quanh năm`
- `Hơn 1.000 năm gắn bó`

### Voice-over (VO-07)
> Và điều tuyệt vời nhất: con người vẫn sinh sống ngay tại đây. Người Tim-bi-sa Sô-sô-ni đã gắn bó với vùng đất này hơn một nghìn năm. Ngày nay, khoảng năm mươi người trong bộ tộc vẫn sống quanh năm tại ốc đảo Phơ-nít Crík, ngay giữa lòng nơi được xem là khắc nghiệt nhất hành tinh.

---

## SCENE 8 — Kết & CTA
**Thời lượng:** 80–88s (frame 2400–2640)

### Visual
- Cảnh hoàng hôn tuyệt đẹp trên cồn cát Mesquite / Zabriskie Point, bầu trời đầy sao (stargazing).
- Logo/tên kênh + text CTA.

### Text on screen
- **DEATH VALLEY**
- *Nóng nhất • Khô nhất • Thấp nhất*
- CTA: `Theo dõi để khám phá tiếp 🌍`

### Voice-over (VO-08)
> Nóng nhất, khô nhất, thấp nhất — nhưng cũng đẹp đến nghẹt thở, nhất là khi màn đêm buông xuống và cả dải ngân hà hiện ra. Nếu bạn thích những vùng đất kỳ lạ như thế này, hãy theo dõi để cùng khám phá tiếp nhé.

---

## Phiên âm tên riêng (dùng trong LỜI ĐỌC — Text on screen vẫn giữ tên gốc)

| Tên gốc | Phiên âm đọc |
|---|---|
| California | Ca-li-pho-ni-a |
| Nevada | Nê-va-đa |
| Furnace Creek | Phơ-nít Crík |
| Badwater | Bát-oa-tơ |
| Telescope Peak | Te-lơ-xcốp Pík |
| Lake Manly | Men-li |
| pupfish | pắp-phít |
| Timbisha Shoshone | Tim-bi-sa Sô-sô-ni |
| Death Valley | Thung Lũng Chết (dùng tên Việt) |

---

## Danh sách Voice-over tách sẵn cho TTS

> Chạy TTS với giọng `giahuy`, xuất ra `public/voice/death-valley/` (mỗi topic 1 thư mục con)

| File | Scene | Nội dung |
|---|---|---|
| `voice/death-valley/vo-01.wav` | 1 | Ẩn mình ở phía đông bang Ca-li-pho-ni-a... Đây chính là Thung Lũng Chết. |
| `voice/death-valley/vo-02.wav` | 2 | Ngày mười tháng bảy năm một nghìn chín trăm mười ba... |
| `voice/death-valley/vo-03.wav` | 3 | Không chỉ nóng, Thung Lũng Chết còn là nơi thấp nhất... |
| `voice/death-valley/vo-04.wav` | 4 | Mỗi năm nơi đây chỉ đón chưa đầy năm xăng-ti-mét mưa... |
| `voice/death-valley/vo-05.wav` | 5 | Nhưng vì sao lại gọi là Thung Lũng Chết?... |
| `voice/death-valley/vo-06.wav` | 6 | Nghe thì tưởng chẳng có gì sống nổi... |
| `voice/death-valley/vo-07.wav` | 7 | Và điều tuyệt vời nhất: con người vẫn sinh sống... |
| `voice/death-valley/vo-08.wav` | 8 | Nóng nhất, khô nhất, thấp nhất... |

### Lệnh TTS mẫu (Bước 3)
```powershell
$env:PYTHONUTF8="1"; $env:PYTHONIOENCODING="utf-8"
uv run tts.py "Ẩn mình ở phía đông bang Ca-li-pho-ni-a, ngay sát biên giới Nê-va-đa, nước Mỹ. Đây là nơi được xem là nóng nhất thế giới, với mức nhiệt độ kỷ lục từng được ghi nhận. Đây chính là Thung Lũng Chết." -o public/voice/death-valley/vo-01.wav --voice "giahuy"
```
