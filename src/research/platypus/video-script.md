# 🎬 Video Script: Thú Mỏ Vịt — Sinh Vật "Không Thể Có Thật"

**Format:** TikTok / Short-form vertical (9:16 · 1080x1920)
**Thời lượng:** ~1 phút 30 giây
**Giọng đọc:** Phạm Tuyên (Nam · Bắc · Tự nhiên)
**Phong cách:** Fast-paced facts, mỗi fact một cú "wow", text lớn đồng bộ giọng đọc
**Nguồn nội dung:** `facts.md` (cùng thư mục)

---

## 🗂️ Cấu trúc — 6 Scene

| # | Scene | Giây (thực tế) | Voice | Dài voice |
|---|-------|------|-----|-----|
| 01 | Hook — Meme "Perry the Platypus" + lời dẫn | 0:00–0:14 | `voice-01-intro-perry.wav` | 10,88s (+meme 3s) |
| 02 | Con vật bị nghi là trò lừa + đẻ trứng | 0:14–0:29 | `voice-02-hoax-eggs.wav` | 15,41s |
| 03 | Săn mồi bằng "giác quan điện" | 0:29–0:43 | `voice-03-electroreception.wav` | 13,12s |
| 04 | Nọc độc + tiết sữa qua da | 0:43–0:59 | `voice-04-venom-milk.wav` | 16,00s |
| 05 | Phát sáng UV + bộ gen dị nhất | 0:59–1:13 | `voice-05-uv-genome.wav` | 14,43s |
| 06 | Kết — Bảo tồn + callback meme | 1:13–1:28 | `voice-06-conservation-outro.wav` | 14,64s |

> **Voice đã tạo** (VieNeu-TTS · giọng Phạm Tuyên) tại `public/voice/platypus/`. Tổng voice ~84,5s + nhịp meme 3s ≈ 87,5s. Timing trên là mốc thực tế dựa trên thời lượng WAV đo bằng ffprobe — dùng cho Bước 4 (caption) & Bước 7 (Remotion). Ở 30 fps: Scene 01 ≈ frame 0–420, Scene 02 ≈ 420–870, v.v.
> Truy cập trong Remotion: `staticFile("voice/platypus/voice-01-intro-perry.wav")`.

> **Lưu ý audio:** Scene 01 cho **nhịp punchline meme phát nguyên tiếng ở 0:00–0:03** ("A Platypus? … Perry the Platypus!?"), sau đó **hạ audio meme xuống ~10%** để lời dẫn TTS vào từ ~0:03. Từ Scene 02 trở đi nhạc nền để nhỏ (~15–20%) nhường giọng đọc.

---

## 🎞️ Scene 01 — Hook: Meme "Perry the Platypus" + lời dẫn (0:00–0:12)

### Visual
- Dùng clip: `assets/video/PLATYPUS/Doofenshmirtz A Platypus- PERRY THE PLATYPUS-! MEGA Compilation (online-video-cutter.com).mp4`
- Clip gốc 16:9 → đặt **dải ngang giữa khung dọc** (letterbox), nền trên/dưới màu tối `#0D1B2A`
- **0:00–0:03:** để nhịp meme "Perry the Platypus!?" chạy tự nhiên — text phía trên: **"Nhớ Perry không?"**
- **0:03–0:12:** lời dẫn vào, text đổi thành câu hỏi lớn: **"Nhưng thú mỏ vịt THẬT… là như thế nào?"**
- Cuối scene: nhá nhanh vài hình thú mỏ vịt thật (teaser) để chuyển sang Scene 02

### Âm thanh
- **0:00–0:03:** audio meme phát nguyên tiếng (punchline "A Platypus? … Perry the Platypus!?")
- **Từ 0:03:** hạ audio meme xuống ~10%, lời dẫn TTS vào; nhạc nền nhẹ nổi lên

### Script giọng đọc
> "Chắc nhiều bạn từng xem Phineas and Ferb, và ấn tượng ngay với chú thú mỏ vịt Perry. Nhưng thú mỏ vịt ngoài đời thật sự là con vật như thế nào? Sau đây là vài sự thật khó tin về chúng."

---

## 🎞️ Scene 02 — Con vật bị nghi là trò lừa (0:12–0:28)

### Visual
- Cut sang ảnh/clip thú mỏ vịt thật đang bơi
- Text lần lượt pop theo giọng đọc: **"MỎ VỊT"** · **"ĐUÔI HẢI LY"** · **"CHÂN RÁI CÁ"**
- Hiệu ứng "hồ sơ khoa học cũ" — ảnh đen trắng thế kỷ 18, con dấu **"HOAX?"** đỏ
- Reveal: **"ĐỘNG VẬT CÓ VÚ… ĐẺ TRỨNG"** — chữ to

### Âm thanh
- Nhạc tò mò, tiếng "record scratch" khi cắt từ meme sang

### Script giọng đọc
> "Nó có mỏ như vịt, đuôi như hải ly, chân như rái cá.
> Khi các nhà khoa học châu Âu lần đầu nhìn thấy nó, họ còn tưởng đây là trò đùa của ai đó khâu mỏ khi vịt vào một con vật khác.
> Nhưng nó hoàn toàn có thật. Và nó là một trong số ít động vật có vú trên đời… lại đẻ trứng."

---

## 🎞️ Scene 03 — Săn mồi bằng "giác quan điện" (0:28–0:44)

### Visual
- Clip thú mỏ vịt lặn xuống nước, nhắm mắt
- Text: **"NHẮM MẮT · BỊT TAI · BỊT MŨI"**
- Animation: cái mỏ phát ra "sóng điện" (đường lượn xanh neon) dò con mồi dưới đáy
- Text to: **"SĂN MỒI BẰNG… ĐIỆN"**
- So sánh nhỏ: icon cá mập + dấu bằng

### Âm thanh
- Tiếng nước, hiệu ứng "điện" lách tách nhẹ

### Script giọng đọc
> "Khi lặn, nó nhắm mắt, bịt tai, bịt luôn cả mũi.
> Vậy làm sao nó săn mồi? Bằng điện.
> Cái mỏ của nó dò được những tín hiệu điện cực nhỏ phát ra từ cơ bắp con mồi — y hệt cách một con cá mập săn mồi. Cực hiếm ở loài thú."

---

## 🎞️ Scene 04 — Nọc độc + tiết sữa qua da (0:44–1:00)

### Visual
- Close-up **cựa độc ở chân sau con đực** — text: **"THÚ CÓ VÚ… CÓ NỌC ĐỘC"**
- Cảnh 2 con đực đấu nhau (mùa giao phối)
- Chuyển tone ấm: thú mỏ vịt mẹ với con non
- Animation: **sữa rỉ qua da** (không có núm vú) — text: **"TIẾT SỮA QUA DA"**

### Âm thanh
- Nửa đầu: nhạc căng (nọc độc) → nửa sau: nhạc ấm (mẹ con)

### Script giọng đọc
> "Chưa hết. Con đực có cựa độc ở chân sau — đúng vậy, một loài thú có vú lại có nọc độc. Nọc không giết được người, nhưng đau đến mức không thuốc giảm đau nào dập nổi.
> Còn con cái? Nó nuôi con bằng sữa — nhưng không hề có núm vú. Sữa rỉ thẳng ra qua da cho con liếm."

---

## 🎞️ Scene 05 — Phát sáng UV + bộ gen dị nhất (1:00–1:16)

### Visual
- Cảnh tối → chiếu **đèn UV** vào thú mỏ vịt → lông **phát sáng xanh lục / cyan**
- Text: **"PHÁT SÁNG DƯỚI TIA UV"** + badge **"Phát hiện 2020"**
- Cut sang animation nhiễm sắc thể: đa số thú "XY" (2) → thú mỏ vịt hiện ra **10** NST xếp thành hàng
- Text to: **"10 NHIỄM SẮC THỂ GIỚI TÍNH"**

### Âm thanh
- Hiệu ứng "glow" huyền ảo → chuyển synth khoa học

### Script giọng đọc
> "Năm 2020, các nhà khoa học phát hiện thêm một điều điên rồ: dưới tia cực tím, bộ lông nâu của nó phát sáng màu xanh lục. Đến giờ vẫn chưa ai lý giải được tại sao.
> Và trong khi con người chỉ có hai nhiễm sắc thể giới tính, thú mỏ vịt có tới… mười."

---

## 🎞️ Scene 06 — Kết: Bảo tồn + callback meme (1:16–1:30)

### Visual
- Chuỗi hình đẹp: thú mỏ vịt bơi trong dòng suối Úc
- Text: **"Chỉ sống ở nước ngọt miền đông nước Úc"** → **"SẮP BỊ ĐE DỌA"**
- **Callback:** chèn lại 1 nhịp ngắn (~1s) khung hình meme "PERRY THE PLATYPUS!?" như một cú nháy mắt
- Fade to black — CTA: **"Follow để xem thêm sinh vật kỳ lạ 🐾"**

### Âm thanh
- Nhạc lắng lại; nhịp meme callback bật nhẹ ở cuối

### Script giọng đọc
> "Sinh vật kỳ lạ này chỉ còn sống ở các dòng nước ngọt miền đông nước Úc, và đang được xếp vào nhóm sắp bị đe dọa.
> Nên lần tới nghe tới thú mỏ vịt — đừng chỉ nghĩ 'à, con Perry'. Nó là một trong những sinh vật khó tin nhất hành tinh.
> Theo dõi để xem thêm nhé."

---

## 📋 Script TTS — Toàn bộ liền mạch

### `voice-full.wav`
```
Chắc nhiều bạn từng xem Phineas and Ferb, và ấn tượng ngay với chú thú mỏ vịt Perry. Nhưng thú mỏ vịt ngoài đời thật sự là con vật như thế nào? Sau đây là vài sự thật khó tin về chúng.

Nó có mỏ như vịt, đuôi như hải ly, chân như rái cá. Khi các nhà khoa học châu Âu lần đầu nhìn thấy nó, họ còn tưởng đây là trò lừa của ai đó khi khâu mỏ vịt vào một con vật khác. Nhưng nó hoàn toàn có thật. Và nó là một trong số ít động vật có vú trên đời lại đẻ trứng.

Khi lặn, nó nhắm mắt, bịt tai, bịt luôn cả mũi. Vậy làm sao nó săn mồi? Bằng điện. Cái mỏ của nó dò được những tín hiệu điện cực nhỏ phát ra từ cơ bắp con mồi — y hệt cách một con cá mập săn mồi. Cực hiếm ở loài thú.

Chưa hết. Con đực có cựa độc ở chân sau — đúng vậy, một loài thú có vú lại có nọc độc. Nọc không giết được người, nhưng đau đến mức không thuốc giảm đau nào dập nổi. Còn con cái? Nó nuôi con bằng sữa — nhưng không hề có núm vú. Sữa rỉ thẳng ra qua da cho con liếm.

Năm hai nghìn không trăm hai mươi, các nhà khoa học phát hiện thêm một điều điên rồ: dưới tia cực tím, bộ lông nâu của nó phát sáng màu xanh lục. Đến giờ vẫn chưa ai lý giải được tại sao. Và trong khi con người chỉ có hai nhiễm sắc thể giới tính, thú mỏ vịt có tới mười.

Sinh vật kỳ lạ này chỉ còn sống ở các dòng nước ngọt miền đông nước Úc, và đang được xếp vào nhóm sắp bị đe dọa. Nên lần tới nghe tới thú mỏ vịt — đừng chỉ nghĩ à, con Perry. Nó là một trong những sinh vật khó tin nhất hành tinh. Theo dõi để xem thêm nhé.
```

---

### Tách file theo scene (để sync từng đoạn):

**`voice-01-intro-perry.wav`**
```
Chắc nhiều bạn từng xem Phineas and Ferb, và ấn tượng ngay với chú thú mỏ vịt Perry. Nhưng thú mỏ vịt ngoài đời thật sự là con vật như thế nào? Sau đây là vài sự thật khó tin về chúng.
```

**`voice-02-hoax-eggs.wav`**
```
Nó có mỏ như vịt, đuôi như hải ly, chân như rái cá. Khi các nhà khoa học châu Âu lần đầu nhìn thấy nó, họ còn tưởng đây là trò lừa — ai đó khâu mỏ vịt vào một con vật khác. Nhưng nó hoàn toàn có thật. Và nó là một trong số ít động vật có vú trên đời lại đẻ trứng.
```

**`voice-03-electroreception.wav`**
```
Khi lặn, nó nhắm mắt, bịt tai, bịt luôn cả mũi. Vậy làm sao nó săn mồi? Bằng điện. Cái mỏ của nó dò được những tín hiệu điện cực nhỏ phát ra từ cơ bắp con mồi — y hệt cách một con cá mập săn mồi. Cực hiếm ở loài thú.
```

**`voice-04-venom-milk.wav`**
```
Chưa hết. Con đực có cựa độc ở chân sau — đúng vậy, một loài thú có vú lại có nọc độc. Nọc không giết được người, nhưng đau đến mức không thuốc giảm đau nào dập nổi. Còn con cái? Nó nuôi con bằng sữa — nhưng không hề có núm vú. Sữa rỉ thẳng ra qua da cho con liếm.
```

**`voice-05-uv-genome.wav`**
```
Năm hai nghìn không trăm hai mươi, các nhà khoa học phát hiện thêm một điều điên rồ: dưới tia cực tím, bộ lông nâu của nó phát sáng màu xanh lục. Đến giờ vẫn chưa ai lý giải được tại sao. Và trong khi con người chỉ có hai nhiễm sắc thể giới tính, thú mỏ vịt có tới mười.
```

**`voice-06-conservation-outro.wav`**
```
Sinh vật kỳ lạ này chỉ còn sống ở các dòng nước ngọt miền đông nước Úc, và đang được xếp vào nhóm sắp bị đe dọa. Nên lần tới nghe tới thú mỏ vịt — đừng chỉ nghĩ à, con Perry. Nó là một trong những sinh vật khó tin nhất hành tinh. Theo dõi để xem thêm nhé.
```

---

## 🎨 Visual Style

- **Ratio:** 9:16 (TikTok vertical · 1080x1920 · 30 fps)
- **Palette:**
  - Xanh nước `#1B4965` · Cyan phát sáng `#5FE0C4` (dùng cho hiệu ứng điện + UV glow)
  - Nâu thú mỏ vịt `#6B4A2B` · Kem `#F1E9DB` · Nền tối `#0D1B2A`
  - Đỏ accent `#E85D5D` (con dấu HOAX, cảnh báo bảo tồn)
- **Typography:** Sans-serif bold, chữ HOA cho keyword; số liệu ("10", "2020") cỡ cực lớn
- **Text animation:** Pop-in + slight bounce đồng bộ đúng từ nhấn mạnh trong giọng đọc
- **Transitions:**
  - Scene 01→02: record-scratch / glitch cut (từ meme sang thực tế)
  - Giữa các fact: hard cut nhanh
  - Scene 06: fade to black + nhịp meme callback
- **Pace:** Cắt nhanh 2–4s/shot; giữ mỗi fact đúng 1 câu punch
- **Meme clip:** letterbox ngang giữa khung, KHÔNG crop fill (giữ mặt nhân vật)
- **Channel header (XUYÊN SUỐT):** gắn `ChannelHeader` ("Hồ Sơ Tự Nhiên") ở **cấp composition** (`PlatypusVideo.tsx`), phủ `AbsoluteFill` đè lên toàn bộ `TransitionSeries` để hiển thị **liên tục cả video**, không nhét riêng từng scene (tránh reset animation mỗi lần chuyển scene). Vị trí `top-left`, `size="md"`, `appearAt={0}`.

---

## ⚖️ Ghi chú bản quyền
- Clip "Perry the Platypus" là nội dung Phineas and Ferb (Disney) — có thể bị Content ID nhận diện khi đăng. Dùng ở dạng meme ngắn cho nội dung cá nhân/giáo dục; cân nhắc nếu kênh có mục đích thương mại.

## ✅ Độ chính xác nội dung
- Tất cả fact khớp `facts.md`, đã kiểm chứng đa nguồn (Wikipedia, National Geographic, Australian Museum, WWF, Nature, Britannica).
- Script tránh dùng fact "không có dạ dày" (dễ gây sai lệch) — thay bằng các fact đã xác thực rõ ràng để an toàn.
