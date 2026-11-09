/* Wedding Invitation i18n — Vietnamese by default, English on demand. */
(() => {
  'use strict';
  const messages = {
    pageTitle: ['Thiệp cưới | Bảo & Lan', 'Wedding Invitation | Bảo & Lan'],
    pageDescription: ['Trân trọng kính mời bạn đến chung vui trong ngày trọng đại của chúng mình.', 'You are warmly invited to celebrate our wedding.'],
    introOverline: ['TRÂN TRỌNG KÍNH MỜI', 'YOU ARE CORDIALLY INVITED'],
    introWeddingOf: ['LỄ THÀNH HÔN CỦA', 'THE WEDDING OF'],
    introHint: ['Chạm vào con dấu để mở thiệp', 'Tap the seal to open the invitation'],
    openInvitation: ['Mở thiệp cưới', 'Open the wedding invitation'],
    navAria: ['Điều hướng chính', 'Main navigation'],
    navStory: ['CHUYỆN CHÚNG MÌNH', 'OUR STORY'],
    navDay: ['NGÀY CƯỚI', 'THE DAY'],
    navGallery: ['ALBUM ẢNH', 'GALLERY'],
    navRsvp: ['XÁC NHẬN', 'RSVP'],
    heroFamily: ['CÙNG GIA ĐÌNH HAI BÊN', 'TOGETHER WITH OUR FAMILIES'],
    heroNote: ['TRÂN TRỌNG KÍNH MỜI BẠN ĐẾN CHUNG VUI', 'REQUEST THE PLEASURE OF YOUR COMPANY'],
    scroll: ['KHÁM PHÁ THIỆP CƯỚI', 'SCROLL TO EXPLORE'],
    saveDate: ['LƯU LẠI NGÀY VUI', 'SAVE THE DATE'],
    welcomeTitle: ['Khởi đầu hạnh phúc<br><i>cho mãi về sau.</i>', 'A beautiful beginning<br><i>to forever.</i>'],
    welcomePara: ['Có những cuộc gặp gỡ trở thành định mệnh. Chúng tôi rất hạnh phúc khi được cùng nhau viết nên chương mới của cuộc đời, và mong bạn sẽ hiện diện để chia sẻ niềm vui ấy.', 'Some meetings are simply meant to be. We are delighted to begin a new chapter together and would love for you to share in our happiness.'],
    storyChapter: ['CHƯƠNG ĐẦU TIÊN', 'CHAPTER ONE'],
    storyTitle: ['Chuyện <i>chúng mình</i>', 'Our <i>story</i>'],
    storySubtitle: ['Mỗi câu chuyện tình yêu đều đẹp theo cách riêng của nó.', 'Every love story is beautiful, but ours is our favorite.'],
    storyMoments: ['KHOẢNH KHẮC CỦA CHÚNG MÌNH', 'OUR MOMENTS'],
    storyTogether: ['Bên nhau', 'Together'],
    storyPara: ['Từ những điều bình dị nhất, chúng tôi tìm thấy ở nhau sự đồng hành, sẻ chia và một tình yêu muốn gìn giữ suốt đời.', 'In the simplest moments, we found companionship, understanding, and a love we hope to cherish forever.'],
    storyJourney: ['VÀ HÀNH TRÌNH VẪN TIẾP NỐI...', 'AND THE JOURNEY CONTINUES...'],
    storyForever: ['MÃI BÊN NHAU', 'FOREVER'],
    countdownOverline: ['ĐẾM NGƯỢC ĐẾN NGÀY HẠNH PHÚC', 'COUNTING DOWN TO FOREVER'],
    countdownTitle: ['Ngày vui <i>sắp đến.</i>', 'The day is <i>almost here.</i>'],
    days: ['NGÀY', 'DAYS'],
    hours: ['GIỜ', 'HOURS'],
    minutes: ['PHÚT', 'MINUTES'],
    seconds: ['GIÂY', 'SECONDS'],
    dayOverline: ['TRÂN TRỌNG ĐÓN TIẾP', 'JOIN OUR CELEBRATION'],
    dayTitle: ['Ngày <i>chung đôi</i>', 'The <i>wedding day</i>'],
    daySubtitle: ['Sự hiện diện của bạn sẽ khiến ngày vui thêm trọn vẹn.', 'Your presence would make our day complete.'],
    venueGroom: ['NHÀ TRAI', "GROOM'S FAMILY"],
    venueBride: ['NHÀ GÁI', "BRIDE'S FAMILY"],
    venueGroomAria: ['Địa điểm nhà trai', "Groom's family venue"],
    venueBrideAria: ['Địa điểm nhà gái', "Bride's family venue"],
    scheduleGroomAria: ['Lịch trình Nhà Trai', "Groom's family schedule"],
    scheduleBrideAria: ['Lịch trình Nhà Gái', "Bride's family schedule"],
    dressCode: ['TRANG PHỤC', 'DRESS CODE'],
    dressValue: ['Lịch sự · Trang trọng · Tươi vui', 'Elegant · Formal · Festive'],
    galleryOverline: ['NHỮNG KHOẢNH KHẮC ĐÁNG NHỚ', 'MOMENTS TO REMEMBER'],
    galleryTitle: ['Album <i>ảnh cưới</i>', 'The <i>gallery</i>'],
    gallerySubtitle: ['Những khoảnh khắc yêu thương trên hành trình của chúng mình.', 'A few frames from our favorite chapter.'],
    galleryAria: ['Album ảnh cưới', 'Wedding photo gallery'],
    galleryCountWord: ['ẢNH', 'PHOTOS'],
    rsvpOverline: ['XÁC NHẬN THAM DỰ', 'KINDLY RESPOND'],
    rsvpTitle: ['Bạn sẽ <i>đến chung vui chứ?</i>', 'Will you <i>join us?</i>'],
    rsvpSubtitle: ['Xin vui lòng xác nhận sự hiện diện của bạn trước ngày cưới.', 'Please let us know if you will join us before our wedding day.'],
    guestNameLabel: ['HỌ VÀ TÊN *', 'YOUR NAME *'],
    guestNamePlaceholder: ['Tên của bạn', 'Your full name'],
    phoneLabel: ['SỐ ĐIỆN THOẠI', 'PHONE NUMBER'],
    phonePlaceholder: ['Số điện thoại liên hệ', 'Contact phone number'],
    guestSideLegend: ['BẠN LÀ KHÁCH BÊN NÀO? *', 'WHICH FAMILY ARE YOU A GUEST OF? *'],
    guestSideGroom: ['Nhà Trai', "Groom's family"],
    guestSideBride: ['Nhà Gái', "Bride's family"],
    attendanceLegend: ['BẠN SẼ THAM DỰ CHỨ? *', 'WILL YOU ATTEND? *'],
    attendanceYes: ['Rất vui được tham dự', 'Joyfully accepts'],
    attendanceNo: ['Rất tiếc, không thể tham dự', 'Regretfully declines'],
    guestCountLabel: ['SỐ KHÁCH THAM DỰ', 'NUMBER OF GUESTS'],
    messageLabel: ['LỜI CHÚC GỬI ĐẾN CHÚNG MÌNH', 'A MESSAGE FOR THE COUPLE'],
    messagePlaceholder: ['Viết lời chúc của bạn...', 'Leave your wishes here...'],
    rsvpSubmit: ['GỬI XÁC NHẬN', 'SEND RSVP'],
    rsvpPrivacy: ['Thông tin chỉ được sử dụng để chuẩn bị cho ngày vui của chúng mình.', 'Your information will only be used to prepare for our celebration.'],
    giftOverline: ['MỘT CHÚT YÊU THƯƠNG', 'A LITTLE TOKEN OF LOVE'],
    giftTitle: ['Quà <i>mừng cưới</i>', 'Wedding <i>Gift</i>'],
    giftIntro: ['Sự hiện diện và những lời chúc của bạn đã là món quà quý giá nhất dành cho chúng mình.', 'Your presence and heartfelt wishes are the most precious gifts to us.'],
    giftQrWaiting: ['MÃ QR ĐANG CẬP NHẬT', 'QR CODE COMING SOON'],
    giftForGroom: ['DÀNH CHO CHÚ RỂ', 'FOR THE GROOM'],
    giftForBride: ['DÀNH CHO CÔ DÂU', 'FOR THE BRIDE'],
    giftWishes: ['THƯƠNG MẾN & CHÚC PHÚC', 'WITH LOVE & BEST WISHES'],
    giftGroomTitle: ['Mừng cưới đến chú rể', 'A gift for the groom'],
    giftBrideTitle: ['Mừng cưới đến cô dâu', 'A gift for the bride'],
    giftTo: ['Gửi lời chúc tới', 'With best wishes to'],
    bankLabel: ['Ngân hàng', 'Bank'],
    accountLabel: ['Số tài khoản', 'Account number'],
    holderLabel: ['Chủ tài khoản', 'Account holder'],
    giftCopy: ['Sao chép số tài khoản', 'Copy account number'],
    giftGroomQrAlt: ['Mã QR mừng cưới chú rể', "Groom's gift QR code"],
    giftBrideQrAlt: ['Mã QR mừng cưới cô dâu', "Bride's gift QR code"],
    closingOverline: ['HẸN GẶP BẠN TRONG NGÀY VUI', "WE CAN'T WAIT TO CELEBRATE WITH YOU"],
    closingTitle: ['Cảm <i>ơn bạn.</i>', 'Thank <i>you.</i>'],
    closingWithLove: ['Thân thương,', 'With love,'],
    footerMade: ['ĐƯỢC LÀM BẰNG TÌNH YÊU - Letuantbvn', 'MADE WITH LOVE - Letuantbvn'],
    footerTop: ['VỀ ĐẦU TRANG ↑', 'BACK TO TOP ↑'],
    lightboxAria: ['Xem ảnh cưới', 'View wedding photos'],
    lightboxClose: ['Đóng', 'Close'],
    lightboxPrev: ['Ảnh trước', 'Previous photo'],
    lightboxNext: ['Ảnh tiếp', 'Next photo'],
    lightboxAlt: ['Ảnh cưới', 'Wedding photo'],
    languageButtonVi: ['Chuyển sang tiếng Anh', 'Switch to English'],
    languageButtonEn: ['Chuyển sang tiếng Việt', 'Switch to Vietnamese'],
    musicOn: ['NHẠC BẬT', 'MUSIC ON'],
    musicOff: ['NHẠC TẮT', 'MUSIC OFF'],
    musicOnAria: ['Tắt nhạc nền', 'Turn background music off'],
    musicOffAria: ['Bật nhạc nền', 'Turn background music on'],
    musicMissing: ['Nhạc nền chưa được cấu hình', 'Background music is not configured'],
    musicError: ['Không thể phát nhạc, hãy kiểm tra tệp âm thanh', 'Cannot play music. Please check the audio file'],
    venueTimeTitle: ['THỜI GIAN TỔ CHỨC', 'CELEBRATION SCHEDULE'],
    venueSolar: ['Dương lịch', 'Gregorian calendar'],
    venueLunar: ['Âm lịch', 'Lunar calendar'],
    mapLink: ['XEM CHỈ ĐƯỜNG ↗', 'GET DIRECTIONS ↗'],
    mapPending: ['BẢN ĐỒ ĐANG CẬP NHẬT', 'MAP COMING SOON'],
    calendarLink: ['THÊM NGÀY CƯỚI VÀO LỊCH ↗', 'ADD CELEBRATION TO CALENDAR ↗'],
    accountPending: ['Đang cập nhật', 'Coming soon'],
    copySuccess: ['Đã sao chép số tài khoản.', 'Account number copied.'],
    copyFail: ['Hãy chọn và sao chép số tài khoản phía trên.', 'Please select and copy the account number above.'],
    galleryViewPhoto: ['Xem ảnh cưới', 'View wedding photo'],
    galleryPhotoAlt: ['Ảnh cưới', 'Wedding photo'],
    galleryShowMore: ['XEM THÊM {count} ẢNH  ↗', 'VIEW {count} MORE PHOTOS  ↗'],
    galleryCollapse: ['THU GỌN ALBUM  ↑', 'SHOW FEWER PHOTOS  ↑'],
    galleryCounter: ['{shown} / {total} ẢNH', '{shown} / {total} PHOTOS'],
    countInvalid: ['Vui lòng cập nhật ngày cưới hợp lệ.', 'Please provide a valid wedding date.'],
    countOverlinePast: ['MÃI TRONG TIM CHÚNG MÌNH', 'FOREVER IN OUR HEARTS'],
    countTitlePast: ['Một ngày <i>để nhớ.</i>', 'A day to <i>remember.</i>'],
    countLabelPast: ['Ngày vui đã diễn ra · {date}', 'Our beautiful day · {date}'],
    countOverlineToday: ['NGÀY HẠNH PHÚC ĐÃ ĐẾN', 'THE CELEBRATION IS HERE'],
    countTitleToday: ['Hôm nay là <i>ngày của chúng mình.</i>', 'Today is <i>our day.</i>'],
    countLabelToday: ['{date} · Ngày chung đôi', '{date} · A celebration of love'],
    rsvpNotConnected: ['RSVP chưa kết nối Google Sheets. Hãy cập nhật cấu hình.', 'RSVP is not connected to Google Sheets. Please update the configuration.'],
    rsvpSelectSide: ['Vui lòng chọn Nhà Trai hoặc Nhà Gái.', "Please select the Groom's or Bride's family."],
    rsvpSending: ['Đang gửi xác nhận...', 'Sending your RSVP...'],
    rsvpSuccess: ['Yêu cầu đã được gửi. Cảm ơn bạn!', 'Your response has been sent. Thank you!'],
    rsvpError: ['Không thể gửi thông tin. Vui lòng thử lại hoặc liên hệ trực tiếp.', 'Could not send your response. Please try again or contact us.']
  };

  let lang = 'vi'; // Luôn bắt đầu bằng tiếng Việt khi tải hoặc tải lại trang.
  const t = (key, variables = {}) => {
    const entry = messages[key];
    const value = entry ? entry[lang === 'en' ? 1 : 0] : key;
    return value.replace(/\{([a-zA-Z]+)\}/g, (match, name) =>
      Object.prototype.hasOwnProperty.call(variables, name) ? String(variables[name]) : match
    );
  };
  const apply = () => {
    document.documentElement.lang = lang;
    document.title = t('pageTitle');
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = t('pageDescription');
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml); // Chỉ dùng chuỗi HTML tin cậy trong bảng dịch.
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      el.setAttribute('aria-label', t(el.dataset.i18nAria));
      if (el.tagName === 'IMG') el.alt = t(el.dataset.i18nAria);
    });
    const toggle = document.getElementById('languageToggle');
    if (toggle) {
      toggle.setAttribute('aria-label', t(lang === 'vi' ? 'languageButtonVi' : 'languageButtonEn'));
      toggle.title = t(lang === 'vi' ? 'languageButtonVi' : 'languageButtonEn');
      toggle.setAttribute('aria-pressed', String(lang === 'en'));
      toggle.querySelector('[data-lang="vi"]')?.classList.toggle('active', lang === 'vi');
      toggle.querySelector('[data-lang="en"]')?.classList.toggle('active', lang === 'en');
    }
  };
  const setLanguage = next => {
    if (next !== 'vi' && next !== 'en') return;
    if (next === lang) return;
    lang = next;
    apply();
    document.dispatchEvent(new CustomEvent('wedding:languagechange', {detail:{lang}}));
  };
  window.WEDDING_I18N = {
    t,
    get lang() { return lang; },
    setLanguage,
    apply
  };
  document.getElementById('languageToggle')?.addEventListener('click', () => {
    setLanguage(lang === 'vi' ? 'en' : 'vi');
  });
  apply();
})();
