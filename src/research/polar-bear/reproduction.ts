/**
 * Polar Bear — Sinh sản & Nuôi con
 * Nguồn: PBS Nature, Polar Bears International, SeaWorld, Polar Bear Range States
 */

export const polarBearReproduction = {
  maturity: {
    female: "4–6 tuổi (giao phối lần đầu thường lúc 5–6 tuổi)",
    male: "6–10 tuổi (thời kỳ sinh sản sung mãn bắt đầu từ ~10 tuổi)",
  },

  mating: {
    season: "Cuối tháng 1 – cuối tháng 6; đỉnh điểm tháng 3 – tháng 4",
    maleBehavior:
      "Con đực tìm con cái bằng cách ngửi dấu chân để lại trên tuyết; có thể đi theo tới hơn 100 km",
    pair: "Cặp đôi ở với nhau khoảng 1 tuần, giao phối nhiều lần",
    competition: "Con đực cạnh tranh quyết liệt để giành con cái",
  },

  pregnancy: {
    totalGestationMonths: 8,
    embryoDevelopmentMonths: 4,
    delayedImplantation: {
      description:
        "Phôi thai không làm tổ ngay sau thụ tinh — trôi nổi tự do trong tử cung đến tháng 10 mới bắt đầu phát triển",
      trigger: "Phụ thuộc vào tình trạng dinh dưỡng của con cái",
    },
    weightGain: {
      minimumKg: 200,
      note: "Con cái cần tăng ít nhất 200 kg mỡ trước khi sinh để nuôi mẹ và con trong suốt thời kỳ hang tuyết",
    },
  },

  den: {
    entryTime: "Giữa – cuối tháng 10 (có con cái vào sớm từ tháng 8)",
    location: "Thường đào trong lớp tuyết dày trên sườn dốc hướng nam",
    purpose: "Bảo vệ con non khỏi cái lạnh khắc nghiệt của Bắc Cực",
    motherFasting:
      "Mẹ không ăn không uống trong suốt thời gian ở hang — sống hoàn toàn bằng dự trữ mỡ, có thể lên đến 8 tháng",
  },

  birth: {
    season: "Tháng 11 – tháng 1",
    litterSize: {
      typical: 2,
      range: "1–4 con; lứa 2 con phổ biến nhất",
      note: "Lứa 3 con ít gặp; lứa 4 con rất hiếm",
    },
    cubAtBirth: {
      weightG: { min: 454, max: 680 },
      lengthCm: 30,
      condition: "Sinh ra mù, điếc, gần như không có lông",
      maleLarger: "Con đực sinh ra hơi lớn hơn con cái",
    },
  },

  cubDevelopment: {
    month1: "Mở mắt",
    month2: "Mọc răng, mọc lông đầy đủ, bắt đầu tập đi",
    exitDen: {
      timing: "Tháng 3 – tháng 4 (sau 3–4 tháng trong hang)",
      cubWeightKg: 10,
    },
    weaning: "Khoảng 2–2.5 năm tuổi",
    independence: "Rời mẹ sau 2–2.5 năm",
  },

  afterDen: {
    motherCondition:
      "Khi rời hang, mẹ đã nhịn ăn gần 8 tháng → ngay lập tức cần săn hải cẩu",
    firstActivity: "Gia đình tiến ra băng biển để săn mồi ngay sau khi rời hang",
  },

  reproductionRate: {
    cycleYears: "2–3 năm mỗi lứa",
    lifetimeLitters: "5–8 lứa trong đời",
    note:
      "Một trong những tỉ lệ sinh sản thấp nhất trong các loài thú có vú — quần thể hồi phục rất chậm",
  },

  vulnerability:
    "Giai đoạn ở hang tuyết là thời điểm dễ bị tổn thương nhất trong vòng đời gấu bắc cực",
};
