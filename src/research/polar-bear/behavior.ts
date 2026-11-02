/**
 * Polar Bear — Hành vi & Săn mồi
 * Nguồn: PBS Nature, WWF, National Geographic, World Wildlife Fund
 */

export const polarBearBehavior = {
  socialLife: {
    type: "Đơn độc (solitary)",
    exceptions: ["Mùa giao phối", "Mẹ nuôi con nhỏ"],
    predators: {
      adult: "Không có thiên địch tự nhiên khi trưởng thành",
      cubs: ["Sói", "Gấu đực khác (infanticide)"],
    },
    overheating:
      "Dù sống ở môi trường băng giá, gấu bắc cực rất dễ bị quá nhiệt khi chạy nhanh → thường di chuyển chậm và nghỉ ngơi thường xuyên",
  },

  diet: {
    type: "Hypercarnivore (thiên về thịt)",
    primaryPrey: ["Hải cẩu vành (ringed seal)", "Hải cẩu râu (bearded seal)"],
    secondaryPrey: [
      "Xác cá voi",
      "Hải mã (walrus)",
      "Trứng chim biển",
      "Cá",
      "Thực vật, tảo biển (khi thiếu thức ăn)",
    ],
    fastingPeriod:
      "Có thể nhịn ăn vài tháng trong mùa không có băng — sống nhờ dự trữ mỡ",
    successRate: "Bắt được 1–2 con mồi trên 10 lần cố gắng tùy mùa",
  },

  huntingTechniques: [
    {
      name: "Still-hunting (Săn kiên nhẫn)",
      description:
        "Đứng bất động hàng giờ — thậm chí nhiều ngày — bên lỗ thở của hải cẩu trên băng. Khi hải cẩu trồi lên thở, gấu cắn đầu và kéo lên băng bằng móng vuốt.",
      frequency: "Phổ biến nhất",
    },
    {
      name: "Stalking (Rình rập)",
      description:
        "Lén lút tiếp cận hải cẩu đang nằm phơi nắng trên mép băng rồi tấn công bất ngờ.",
    },
    {
      name: "Aquatic hunting (Săn dưới nước)",
      description: "Hiếm — gấu ít khi bắt được hải cẩu trong nước hở.",
    },
    {
      name: "Scavenging (Ăn xác)",
      description: "Ăn xác chết cá voi và các động vật biển khi cơ hội xuất hiện.",
    },
  ],

  hygiene: {
    afterEating: "Thường bơi hoặc lăn trên tuyết sau khi ăn để làm sạch lông",
    reason:
      "Lông bẩn và ướt mất khả năng cách nhiệt — vệ sinh giúp duy trì hiệu quả giữ nhiệt",
    rollingInSnow: "Cũng dùng để làm mát khi quá nóng",
  },

  swimming: {
    maxDistanceKm: 160,
    speedKmh: 10,
    diveDepthFt: "Ít nhất 10–15 feet (~3–5m) dưới mặt nước",
    buoyancy: "Lông rỗng và lớp mỡ dày giúp nổi tự nhiên",
    duration: "Có thể bơi nhiều ngày liên tục",
  },

  territoryAndRoaming: {
    description:
      "Không có vùng lãnh thổ cố định — di chuyển theo băng biển theo mùa",
    range: "Vùng hoạt động rất rộng, hàng ngàn km²",
  },

  sleepAndRest: {
    hibernation: false,
    note:
      "Gấu bắc cực KHÔNG ngủ đông. Chỉ gấu cái mang thai vào hang tuyết để sinh con trong mùa đông.",
    restFrequency:
      "Nghỉ ngơi thường xuyên giữa các lần di chuyển để tránh quá nhiệt",
  },
};
