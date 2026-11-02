/**
 * Polar Bear — Bảo tồn & Mối đe dọa
 * Nguồn: WWF, Polar Bears International, IUCN, US Climate Resilience Toolkit
 */

export const polarBearConservation = {
  populationStatus: {
    global: "~26,000 con (ước tính IUCN)",
    subpopulations: 19,
    trend:
      "Không có hành động giảm phát thải: có thể mất gần toàn bộ quần thể trước cuối thế kỷ 21",
  },

  conservationStatus: {
    iucn: "Vulnerable — Dễ bị tổn thương (2015)",
    usa: "Threatened — Bị đe dọa theo US Endangered Species Act (2008)",
    milestone:
      "Là một trong những loài đầu tiên được liệt kê nguy cấp do tác động của biến đổi khí hậu",
  },

  primaryThreat: {
    name: "Biến đổi khí hậu (Climate Change)",
    mechanism:
      "Nhiệt độ tăng → băng biển tan sớm vào mùa xuân và đóng muộn vào mùa thu → rút ngắn mùa săn mồi",
    impacts: [
      "Mất môi trường sống chính (sea ice)",
      "Giảm thời gian tiếp cận hải cẩu — nguồn thức ăn chính",
      "Gấu phải bơi xa hơn để tìm băng → tốn nhiều năng lượng, nguy cơ chết đuối",
      "Gấu cái mang thai phải dành nhiều thời gian trên đất liền hơn → đe dọa hang tuyết",
      "Quần thể gầy đi, tỉ lệ sống của con non giảm",
    ],
  },

  otherThreats: [
    {
      name: "Ô nhiễm hóa chất",
      detail:
        "Kim loại nặng và chất hữu cơ bền vững (POPs) tích lũy trong cơ thể gấu qua chuỗi thức ăn, ảnh hưởng sức khỏe và sinh sản",
    },
    {
      name: "Khai thác dầu khí",
      detail:
        "Thăm dò và khoan dầu ở Bắc Cực làm xáo trộn hang tuyết, có thể nghiền nát gấu đang ngủ đông; làm trầm trọng thêm khủng hoảng khí hậu",
    },
    {
      name: "Xung đột người–gấu",
      detail:
        "Băng tan đẩy gấu vào gần khu dân cư để tìm thức ăn → nguy cơ xung đột và bị tiêu diệt",
    },
    {
      name: "Săn bắt",
      detail:
        "Được quản lý theo hiệp ước quốc tế; người bản địa Inuit và Inuvialuit được phép săn theo hạn ngạch truyền thống",
    },
    {
      name: "Bệnh tật",
      detail: "Ngày càng được ghi nhận nhiều hơn khi hệ miễn dịch suy yếu do thiếu dinh dưỡng",
    },
  ],

  conservationEfforts: [
    {
      name: "Công ước quốc tế về gấu bắc cực (1973)",
      detail: "5 quốc gia có gấu bắc cực ký kết bảo vệ và nghiên cứu loài này",
    },
    {
      name: "Đạo luật Bảo vệ Thú biển Hoa Kỳ (Marine Mammal Protection Act)",
      detail: "Bảo vệ gấu bắc cực khỏi bị săn bắt và quấy rối tại Mỹ",
    },
    {
      name: "Kế hoạch Quản lý Bảo tồn Gấu Bắc Cực (USFWS 2016)",
      detail:
        "Xác định giảm phát thải khí nhà kính là ưu tiên số 1; hỗ trợ bảo tồn quốc tế và quản lý hợp tác với cộng đồng bản địa",
    },
    {
      name: "Tổ chức Polar Bears International",
      detail:
        "Nghiên cứu, giáo dục và vận động chính sách bảo tồn gấu bắc cực toàn cầu",
    },
    {
      name: "WWF Arctic Programme",
      detail: "Giám sát quần thể, bảo vệ môi trường sống và vận động giảm khí thải",
    },
  ],

  ecologicalRole: {
    apexPredator: "Kiểm soát quần thể hải cẩu từ trên xuống (top-down control)",
    indicator:
      "Là loài chỉ thị (flagship/indicator species) — sức khỏe của quần thể gấu phản ánh sức khỏe tổng thể của hệ sinh thái Bắc Cực",
    tourism:
      "Thu hút du lịch sinh thái lớn, đặc biệt tại Churchill, Manitoba, Canada",
  },
};
