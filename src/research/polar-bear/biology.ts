/**
 * Polar Bear — Sinh học & Thể chất
 * Nguồn: Polar Bears International, PBS Nature, National Geographic, Wikipedia
 */

export const polarBearBiology = {
  size: {
    male: {
      weightKg: { min: 300, max: 800 },
      weightLbs: { min: 660, max: 1760 },
      lengthM: { min: 2.4, max: 3.0 },
      heightAtShoulderM: { min: 1.0, max: 1.5 },
      standingHeightM: "> 3 m khi đứng thẳng trên 2 chân",
    },
    female: {
      weightKg: { min: 150, max: 300 },
      weightLbs: { min: 330, max: 660 },
      lengthM: { min: 1.8, max: 2.0 },
    },
    cub: {
      birthWeightG: { min: 454, max: 680 },
      birthLengthCm: 30,
      note: "Nhỏ bằng con chuột lang khi mới sinh",
    },
    seasonalWeightChange:
      "Trọng lượng có thể thay đổi ±50% theo mùa khi tích/tiêu mỡ",
  },

  lifespan: {
    wild: "20–30 năm",
    captivity: "Có thể đến 40 năm",
  },

  fur: {
    color: "Trắng/vàng nhạt — nhưng thực ra trong suốt (transparent)",
    structure: "Lông rỗng ruột (hollow core), phản chiếu ánh sáng thành màu trắng",
    layers: [
      "Lớp lót (undercoat): dày, mềm, giữ nhiệt",
      "Lớp bảo vệ (guard hairs): trong suốt, rỗng, chống nước và băng",
    ],
    waterRepellent: true,
    note: "Lông không thấm nước; sau khi bơi chỉ cần rũ là khô",
    thickest: "Lông dày nhất trong tất cả các loài gấu",
  },

  skin: {
    color: "Đen hoàn toàn",
    purpose: "Hấp thụ tối đa nhiệt lượng từ mặt trời",
  },

  fat: {
    thicknessCm: 10,
    thicknessInches: 4,
    purposes: ["Cách nhiệt chống lạnh", "Tăng sức nổi khi bơi", "Dự trữ năng lượng khi nhịn ăn"],
  },

  paws: {
    widthCm: 30,
    description: "Rộng như đĩa ăn, giúp phân tán trọng lượng trên băng",
    claws: 5,
    clawPurpose: ["Bắt và giữ con mồi", "Bám chắc trên băng"],
    papillae: "Các mấu nhỏ dưới lòng bàn chân chống trơn trượt",
    swimming: "Chân trước như mái chèo, chân sau như bánh lái",
    webbing: "Chân hơi có màng — thích nghi với bơi lội",
    furUnderPaws: true,
  },

  locomotion: {
    walkingSpeedKmh: 5.5,
    runningSpeedKmh: 40,
    swimmingSpeedKmh: 10,
    swimmingRange: "Có thể bơi liên tục hàng trăm km; đã ghi nhận cách đất liền > 160 km",
    walkingStyle: "Đặt gót chân trước (giống người), gáng lắc lư đặc trưng",
    energyCost: "Tốn nhiều năng lượng hơn hầu hết động vật khác khi di chuyển",
  },

  senses: {
    smell: {
      rangeKm: 16,
      description: "Khứu giác xuất sắc nhất — có thể ngửi con mồi từ 16 km",
    },
    hearing: "Tốt",
    vision: "Tốt, kể cả trong điều kiện ánh sáng thấp",
  },

  record: "Là loài ăn thịt trên cạn lớn nhất Trái Đất (theo khối lượng cơ thể)",
};
