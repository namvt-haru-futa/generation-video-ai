# Tư liệu hình ảnh / video — Thung Lũng Chết

## Nguyên tắc bản quyền
- **Wikimedia Commons** — CC BY / CC BY-SA / Public Domain → dùng được, ghi credit khi CC BY(-SA).
- **NPS (nps.gov) & Library of Congress** — Public Domain (tác phẩm chính phủ Mỹ) → dùng thoải mái.
- ⚠️ **National Geographic / Visit California / Getty** — ẢNH CÓ BẢN QUYỀN, KHÔNG tải dùng. Chỉ tham khảo bố cục.
- Approach dựng hình: **Scene 1** = Cesium flythrough (đã có). **Scene 2–8** = ảnh tĩnh độ phân giải cao + hiệu ứng **Ken Burns** (zoom/pan chậm) qua component `ImageBg`.

## Cách tải (Bước 6)
Dùng `Special:FilePath` của Wikimedia, thêm `?width=1920` để lấy bản JPEG vừa phải (tránh TIFF/PNG gốc vài trăm MB):
```
https://commons.wikimedia.org/wiki/Special:FilePath/<TÊN_FILE>?width=1920
```

---

## Scene 1 — Hook (Cesium flythrough)
- Không cần asset tải về. Dùng `CesiumIntroFlythrough` (MapTiler).
- (Tùy chọn) ảnh panorama dự phòng: `File:Death Valley National Park.jpg` — Wikimedia, CC BY-SA.

---

## Scene 2 — Nơi nóng nhất (134°F)
Cảnh khô cằn, muối nứt, nắng gắt.

| # | Mô tả | File / Nguồn | Loại | License |
|---|---|---|---|---|
| i01 | Devil's Golf Course — muối nhọn sắc, khô cằn | `File:Badwater Basin & Devil's Golf Course, Death Valley National Park (32079974301).jpg` | ảnh | CC BY-SA (Wikimedia) |
| i02 | Nền thung lũng khô, dãy núi trần | `File:Death Valley National Park, California (69173489).jpg` | ảnh | CC BY-SA (Wikimedia) |
| i03 | (fill) Cận cảnh đất nứt nẻ khô hạn | Pixabay/Pexels "cracked earth desert" | ảnh | Pexels/Pixabay free |

---

## Scene 3 — Điểm thấp nhất (Badwater)
| # | Mô tả | File / Nguồn | Loại | License |
|---|---|---|---|---|
| i04 | Biển báo "Badwater Basin 282 feet below sea level" | `File:Badwater elevation sign.jpg` | ảnh | CC BY-SA 3.0 (Ivan) |
| i05 | Cánh đồng muối lục giác Badwater (4000×3000) | `File:Badwater Basin, Death Valley National Park, California (15082537054).jpg` | ảnh | CC BY-SA 2.0 |
| i06 | Biển "Sea Level" trên vách đá Badwater | `File:BadwaterSL.JPG` | ảnh | CC BY-SA 3.0 (Qfl247) |
| i07 | Dãy Panamint / Telescope Peak phủ tuyết nhìn từ Badwater (2005) | Commons gallery `Panamint Range` → "snow-covered Panamint Range from Badwater 2005" | ảnh | CC (kiểm tra file) |

---

## Scene 4 — Khô hạn nhất, từng là biển & hồ
| # | Mô tả | File / Nguồn | Loại | License |
|---|---|---|---|---|
| i08 | Badlands Zabriskie Point (đáy hồ cổ đại) | `File:Death Valley,19820817,Zabriskie Point...` hoặc file Zabriskie Point sunrise trong gallery DV | ảnh | CC (kiểm tra file) |
| i09 | Cánh đồng muối trắng trải rộng (tái dùng i05) | như i05 | ảnh | CC BY-SA 2.0 |
| i10 | Panorama toàn thung lũng | `File:Death Valley National Park.jpg` | ảnh | CC BY-SA |

> Hình "biển cổ đại / hồ Manly" khó có ảnh thật → dùng overlay nước bán trong suốt + timeline đồ họa tự dựng trong Remotion.

---

## Scene 5 — Cái tên ra đời (1849 + borax)
Ảnh lịch sử đen trắng / vintage.

| # | Mô tả | File / Nguồn | Loại | License |
|---|---|---|---|---|
| i11 | Đoàn 20 con la kéo borax ra khỏi Death Valley, ~1900 (5129×3905) | `File:Twenty-mule team hauling borax out of Death Valley to the railroad, ca.1900 (CHS-1618).jpg` | ảnh | **Public Domain** |
| i12 | Đoàn 20 mule team thập niên 1880 | `File:20 Mule Team in Death Valley.jpg` | ảnh | **Public Domain** (NPS) |
| i13 | Xe borax gốc trưng bày tại Furnace Creek (~1935) | `File:20-mule-team wagons.jpg` | ảnh | **Public Domain** (NPS) |
| i14 | Xe borax tại Harmony Borax Works (Carol Highsmith) | `File:"Twenty mule team" borax wagons at the Harmony Borax Works in California's Death Valley LCCN2013631223.tif` | ảnh | **Public Domain** (LOC/Highsmith) |

---

## Scene 6 — Sự sống kỳ diệu (pupfish, superbloom, wildlife)
| # | Mô tả | File / Nguồn | Loại | License |
|---|---|---|---|---|
| i15 | Superbloom 2016 — hoa desert gold vàng rực phủ thung lũng | `Category:2016 Death Valley superbloom` (41 files) — chọn ảnh field of bloom | ảnh | CC (kiểm tra từng file) |
| i16 | Hoa dại cận cảnh (Geraea canescens, desert five-spot...) | `User:Dcrjsr/gallery of Death Valley superbloom 2016` | ảnh | CC BY (Dcrjsr) |
| i17 | Cá pupfish (Cyprinodon) | `Category:Cyprinodon salinus` / `Category:Cyprinodon` trên Commons — chọn file có license CC/PD | ảnh | kiểm tra file |
| i18 | Salt Creek / suối trong sa mạc | NPS photo gallery Death Valley (Salt Creek) | ảnh | Public Domain (NPS) |

> Cần vào từng category để chốt file cụ thể + license ở Bước 6. Wildlife bổ sung (bighorn sheep, coyote, kit fox): `Category:Fauna of Death Valley National Park`.

---

## Scene 7 — Con người vẫn sống ở đây
| # | Mô tả | File / Nguồn | Loại | License |
|---|---|---|---|---|
| i19 | Ốc đảo Furnace Creek — hàng cọ xanh giữa sa mạc | Commons gallery DV → mục "Furnace Creek" ("Furnace Creek oasis") | ảnh | CC (kiểm tra file) |
| i20 | Toàn cảnh khu Furnace Creek / resort giữa thung lũng | `Category:Furnace Creek, California` trên Commons | ảnh | kiểm tra file |

> ⚠️ Tế nhị: KHÔNG dùng ảnh cận mặt người Timbisha Shoshone. Ưu tiên cảnh ốc đảo, hàng cọ, làng nhìn xa. Text on screen sẽ nêu thông tin bộ tộc.

---

## Scene 8 — Kết & CTA (ngân hà, hoàng hôn)
| # | Mô tả | File / Nguồn | Loại | License |
|---|---|---|---|---|
| i21 | Ngân hà trên Racetrack Playa (featured picture) | Commons gallery DV → "Panorama of Racetrack Playa at night, with the Milky Way" | ảnh | CC (featured) |
| i22 | Cồn cát Mesquite Flat lúc hoàng hôn/bình minh (featured) | `File:Mesquite Sand Dunes in Death Valley.jpg` | ảnh | CC BY-SA (Brocken Inaglory) |
| i23 | Zabriskie Point lúc bình minh | Commons DV gallery → "Zabriskie Point at sunrise" | ảnh | CC (kiểm tra file) |
| i24 | (fill) Ngân hà trên cồn cát sa mạc | Pexels "milky way desert dunes" | ảnh | Pexels free |

---

## Danh mục nguồn để duyệt thêm (Bước 6)
- `commons.wikimedia.org/wiki/Category:Death_Valley_National_Park`
- `commons.wikimedia.org/wiki/Death_Valley_National_Park` (gallery đã tuyển: Furnace Creek, Badwater, Zabriskie, Ubehebe, Milky Way...)
- `commons.wikimedia.org/wiki/Category:2016_Death_Valley_superbloom`
- `commons.wikimedia.org/wiki/Category:Harmony_Borax_Works` (99 files 20-mule-team)
- `commons.wikimedia.org/wiki/Category:Fauna_of_Death_Valley_National_Park`
- NPS photo gallery: `nps.gov/media/photo/gallery.htm?id=F255D951-757C-49B9-A561-AC2C94313BBB`

## Convention đặt tên khi tải (Bước 6)
- Ảnh: `public/assets/images/i04-badwater-sign.jpg`
- Video (nếu có): `public/assets/video/v01-mo-ta.mp4`

---

## ✅ ĐÃ TẢI VỀ (Bước 6) — `public/assets/images/death-valley/`

> 20 ảnh. Ghi credit theo cột "Nguồn / Tác giả / License".

| File | Scene | Nguồn (Wikimedia Commons / khác) | License |
|---|---|---|---|
| i01-devils-golf.jpg | 2 | File:Badwater Basin & Devil's Golf Course... (32079974301) | CC BY-SA (Flickr) |
| i02-valley-dry.jpg | 2 | File:Death Valley National Park, California (69173489) | CC BY-SA |
| i04-badwater-sign.jpg | 3 | File:Badwater elevation sign.jpg — Ivan | CC BY-SA 3.0 |
| i05-badwater-hexagon.jpg | 3,4 | File:Badwater Basin... (15082537054) | CC BY-SA 2.0 |
| i06-badwater-sealevel.jpg | 3 | File:BadwaterSL.JPG — Qfl247 | CC BY-SA 3.0 |
| i07-panamint-dantes.jpg | 3 | File:Panamint Range and Death Valley from Dante's View.jpg | CC BY-SA |
| i08-zabriskie-badlands.jpg | 4 | File:Badlands from Zabriskie Point, panorama... | CC BY-SA |
| i10-panorama.jpg | 1,4 | File:Death Valley National Park.jpg | CC BY-SA |
| i11-mule-team-1900.jpg | 5 | File:Twenty-mule team hauling borax... ca.1900 (CHS-1618) | **Public Domain** |
| i12-mule-team-1880s.jpg | 5 | File:20 Mule Team in Death Valley.jpg — NPS | **Public Domain** |
| i13-mule-wagons.jpg | 5 | File:20-mule-team wagons.jpg — G. A. Grant/NPS | **Public Domain** |
| i15-superbloom-field.jpg | 6 | File:Desert-gold Geraea canescens field-saltflat-mtn.jpg — Dcrjsr | CC BY |
| i16-superbloom-redhills.jpg | 6 | File:Death Valley Desrt-gold red-hills.jpg — Dcrjsr | CC BY |
| i17-pupfish-pair.jpg | 6 | File:A brightly colored male pupfish... (NPS/USFWS) | Public Domain / CC |
| i19-furnace-oasis.jpg | 7 | File:California - Death Valley - The Oasis Fuernace Creek (14324962323) | CC BY-SA (Flickr) |
| i20-furnace-unsplash.jpg | 7 | File:Death Valley... Furnace Creek (Unsplash c-NFJc86CSc) | Unsplash (CC0-like) |
| i21-milkyway-stars.jpg | 8 | File:Amazing Stars (Unsplash).jpg | Unsplash (CC0-like) |
| i22-mesquite-dunes.jpg | 8 | File:Mesquite Sand Dunes in Death Valley.jpg — Brocken Inaglory | CC BY-SA (Featured) |
| i23-zabriskie-sunset.jpg | 8 | File:Death Valley Scenic Byway - Sunset from Zabriskie Point - NARA 7717992 | **Public Domain** (NARA), lowres 750px |
| i25-natgeo-hero.jpg | 2/4 | National Geographic — i.natgeofe.com SPI-2692983 | ⚠️ **Bản quyền Nat Geo** — bạn tự ghi nguồn/chịu trách nhiệm |

### Ghi chú
- Tất cả link Wikimedia lấy qua API `imageinfo` (bản 1920px), trừ i25 (Nat Geo hero 1920×1080).
- **i25 (Nat Geo)** có bản quyền — dùng theo quyết định của bạn, nhớ ghi nguồn.
- **Visit California**: KHÔNG tải được tự động (trang SPA, lazy-load ảnh, chặn headless). Playwright intercept + đọc DOM đều không ra ảnh ≥800px. Nếu cần, tải thủ công 1 ảnh hero từ trang rồi bỏ vào thư mục.
- i23 chỉ 750×490 (bản NARA nhỏ) — để dự phòng; Scene 8 chính dùng i21 (ngân hà) + i22 (cồn cát).
- Đủ ảnh cho cả 8 scene. Scene 1 dùng Cesium (không cần ảnh).
