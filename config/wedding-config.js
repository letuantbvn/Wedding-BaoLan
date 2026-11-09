/* Cập nhật thông tin tại đây. Các chi tiết chưa xác nhận được để trống. */
window.WEDDING_CONFIG = {
  groomName: "Phạm Bảo",
  brideName: "Ngọc Lan",
  monogram: "B&L",

  // DƯƠNG LỊCH 15–16/12/2026, ÂM LỊCH 07–08/11/2026 (GMT+7).
  // Countdown tính từ buổi đầu tiên lúc 16:30 ngày 15/12/2026.
  weddingDate: "2026-12-15T16:30:00+07:00",
  weddingEndDate: "2026-12-16T23:59:59+07:00",
  lunarDateLabel: "07–08/11/2026 (âm lịch)",
  galleryInitialCount: 8,
  galleryBatchSize: 8,

  // Lịch của hai nhà giống nhau theo thông tin được cung cấp.
  // solarDate: dương lịch, lunarDate: âm lịch.
  venues: {
    groom: {
      name: "Tư gia Nhà Trai",
      address: "Xóm 2, thôn Đồng Kinh, xã Nam Thái Ninh, tỉnh Hưng Yên",
      schedule: [
        {time: "16:30", solarDate: "15/12/2026", lunarDate: "07/11/2026"},
        {time: "10:00", solarDate: "16/12/2026", lunarDate: "08/11/2026"}
      ],
      mapUrl: "https://maps.app.goo.gl/nWyyNGhAqnL8X95m6"
    },
    bride: {
      name: "Tư gia Nhà Gái",
      address: "Xóm 7, thôn Đông Thái Xuyên, xã Đông Thái Ninh, tỉnh Hưng Yên",
      schedule: [
        {time: "16:30", solarDate: "15/12/2026", lunarDate: "07/11/2026"},
        {time: "10:00", solarDate: "16/12/2026", lunarDate: "08/11/2026"}
      ],
      mapUrl: "https://maps.app.goo.gl/RxiXbJmAewrdQCh48"
    }
  },

  // Wedding Gift: chỉ điền thông tin ngân hàng / QR chính thức.
  // Không dùng các số tài khoản trong ảnh tham khảo nếu chưa xác nhận.
  gifts: {
    groom: {
      bankName: "",
      accountNumber: "",
      accountHolder: "",
      qrImage: "" // Ví dụ: "assets/images/qr-groom.png"
    },
    bride: {
      bankName: "",
      accountNumber: "",
      accountHolder: "",
      qrImage: "" // Ví dụ: "assets/images/qr-bride.png"
    }
  },

  musicEnabled: true,
  musicFile: "assets/music/wedding.mp3",
  googleScriptUrl: "", // URL Web App của Google Apps Script sau khi deploy
  images: {
    hero: "assets/images/hero.jpg",
    storyOne: "assets/images/story-01.jpg",
    storyTwo: "assets/images/story-02.jpg",
    closing: "assets/images/closing.jpg",
    gallery: [
      "assets/images/gallery-1.jpg", "assets/images/gallery-2.jpg",
      "assets/images/gallery-3.jpg", "assets/images/gallery-4.jpg",
      "assets/images/gallery-5.jpg", "assets/images/gallery-6.jpg",
      "assets/images/gallery-7.jpg", "assets/images/gallery-8.jpg",
      "assets/images/gallery-9.jpg", "assets/images/gallery-10.jpg",
      "assets/images/gallery-11.jpg", "assets/images/gallery-12.jpg",
      "assets/images/gallery-13.jpg", "assets/images/gallery-14.jpg",
      "assets/images/gallery -15.jpg", "assets/images/gallery-16.jpg",
      "assets/images/gallery-17.jpg", "assets/images/gallery-18.jpg",
      "assets/images/gallery-19.jpg", "assets/images/gallery-20.jpg",
      "assets/images/gallery-21.jpg", "assets/images/gallery-22.jpg"
    ]
  }
};