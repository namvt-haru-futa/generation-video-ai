# Tư liệu ảnh & video — Cá Mắt Vòm (Barreleye Fish)

> Ưu tiên nguồn **Public Domain** (US Government) và **CC-BY 4.0** — có thể dùng cho video thương mại + phi thương mại. Chỉ cần credit trong description khi dùng CC-BY.

---

## Nguồn được chọn (đã có URL trực tiếp)

### 🐟 Ảnh barreleye fish (thật)
| ID | File | URL trực tiếp | License | Kích thước |
|---|---|---|---|---|
| **i01** | `i01-barreleye-noaa.jpg` | https://upload.wikimedia.org/wikipedia/commons/b/b5/Barreleye-fish_GoK.jpg | **Public Domain** (NOAA — Exploring Pelagic Biodiversity of the Gulf of Alaska) | 4000×3000, 3.31 MB |

Dùng cho: **Scene 2, 3** — cận cảnh phần đầu cá, minh họa 2 chấm đen (lỗ mũi).

---

### 🎨 Illustration khoa học của barreleye
| ID | File | URL trực tiếp | License | Kích thước |
|---|---|---|---|---|
| **i02** | `i02-macropinna-illustration.png` | https://upload.wikimedia.org/wikipedia/commons/5/50/Macropinna_microstoma_illustration.png | **CC-BY 4.0** — Poulsen et al. 2016 (PLOS ONE, J. Hlidberg / K.E. Hjørne) | 558×234, 141 KB |

Dùng cho: **Scene 1** (title card), **Scene 5** (timeline khoa học). Credit: "Illustration: Poulsen et al. 2016, CC BY 4.0".

---

### 🎬 Video Marine Snow (tuyết biển)
| ID | File | URL trực tiếp | License | Kích thước |
|---|---|---|---|---|
| **v01** | `v01-marine-snow.mp4` | https://oceanexplorer.noaa.gov/wp-content/uploads/2013/10/marine-snow-1920x1080-1.mp4 | **Public Domain** (NOAA/UAF/Oceaneering — Gulf of Alaska 2019) | 1920×1080, 6.9 MB |

Dùng cho: **Scene 1** (particle marine snow background), **Scene 4** (nền deep sea).

---

### 🎬 Video Siphonophore (sứa dây)
| ID | File | URL trực tiếp | License | Kích thước |
|---|---|---|---|---|
| **v02** | `v02-siphonophore.mp4` | https://oceanexplorer.noaa.gov/wp-content/uploads/2021/02/ex1708-siphonophore.mp4 | **Public Domain** (NOAA — Deep-Sea Symphony: Musicians Seamounts, 800m Hawaii) | mp4, 10.5 MB |

Dùng cho: **Scene 6** — cảnh cá lơ lửng dưới xúc tu sứa dây.

---

### 🎬 Video deep sea creature (nền deep sea)
| ID | File | URL trực tiếp | License | Kích thước |
|---|---|---|---|---|
| **v03** | `v03-deepsea-creature.mp4` | https://videos.pexels.com/video-files/29881943/12828923_2560_1440_30fps.mp4 | **Pexels Free License** (Adis Resic — Dec 2024) | 2560×1440, 4K, 19s @ 30fps |

Dùng cho: **Scene 1** (hook — sinh vật lướt qua bóng tối), **Scene 8** (kết — biến mất vào tối).

---

## Ghi chú license & Credit trong description

Khi upload video, description nên có block:
```
🎬 Nguồn tư liệu:
• Barreleye fish photo — NOAA Ocean Exploration (Public Domain)
• Marine snow footage — NOAA/UAF/Oceaneering (Public Domain)
• Siphonophore footage — NOAA Ocean Exploration, Deep-Sea Symphony (Public Domain)
• Macropinna illustration — Poulsen et al. 2016, PLOS ONE (CC BY 4.0)
• Deep sea creature clip — Adis Resic / Pexels (Pexels License)

📚 Nguồn khoa học:
• MBARI — mbari.org/animal/barreleye-fish
• Robison & Reisenbichler (2008), Copeia 4:780-784
• Monterey Bay Aquarium — montereybayaquarium.org
```

---

## Đồ họa tự vẽ trong Remotion (không cần download)

Những phần sau sẽ dựng trực tiếp bằng SVG / CSS / animation trong Remotion, không cần asset ngoài:

| Scene | Đồ họa tự dựng |
|---|---|
| 1 | Đồng hồ đo độ sâu count-up (100→800m) |
| 2 | Split cockpit F-16 vs đầu cá — có thể dùng emoji `✈️` + illustration i02 |
| 3 | Highlight vòng nhấp nháy `❌`/`✅`, mũi tên chỉ vào 2 chấm đen |
| 4 | Cột nước phân tầng độ sâu (SVG rectangles gradient) + bản đồ Bắc Thái Bình Dương (SVG) + thước 15cm |
| 5 | Timeline ngang 1939 → 2004 → 2009 (SVG + animation) + minh họa mắt xoay 90° |
| 6 | (nền video v02) + đường quét ánh sáng khi vòm chống xúc tu |
| 7 | Count-up số liệu khổng lồ 5.600, 27.600, số `9` lớn với glow |
| 8 | Logo kênh + CTA button |

---

## Nguồn dự phòng (không tải, chỉ dùng khi cần bổ sung)

Nếu cần thêm ảnh/video, tham khảo:
- MBARI barreleye gallery: https://www.mbari.org/animal/barreleye-fish (video có sẵn nhưng license phải hỏi permission — hiện chưa dùng)
- NOAA ROV Deep Discoverer footage: https://oceanexplorer.noaa.gov/technology/subs-deep-discoverer (119 MB — quá to)
- Wikimedia Commons category: https://commons.wikimedia.org/wiki/Category:Macropinna_microstoma
- Pexels deep sea search: https://www.pexels.com/search/videos/deep%20sea

---

## Convention đặt tên file

Trong `public/assets/`:
- Ảnh: `public/assets/images/<topic>/i<NN>-<slug>.<ext>` (vd `i01-barreleye-noaa.jpg`)
- Video: `public/assets/video/<topic>/v<NN>-<slug>.mp4` (vd `v01-marine-snow.mp4`)

> Riêng cho topic này: `public/assets/images/barreleye-fish/` và `public/assets/video/barreleye-fish/`
