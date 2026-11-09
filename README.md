# Wedding Invitation v1.7 — Luxury Ivory (VN / EN)

Website thiệp cưới HTML + CSS + JavaScript thuần, chạy qua GitHub Pages.

## Thông tin đã cập nhật

- Chú rể: theo cấu hình hiện tại trong wedding-config.js (tên có thể được điều chỉnh riêng)
- Cô dâu: Ngọc Lan (theo cấu hình hiện tại)
- Ngày cưới dương lịch: 15–16/12/2026 (Thứ Ba – Thứ Tư, giờ Việt Nam); âm lịch: 07–08/11/2026.
- Hai khu vực riêng: Nhà Trai và Nhà Gái, đã nhập địa chỉ tại Hưng Yên
- Wedding Gift: đã cập nhật hai mã VietQR chính thức, HDBank (Nhà Trai) và MB Bank (Nhà Gái), có nút sao chép STK
- Gallery: đọc động 22 ảnh hiện có trong assets/images
- RSVP: dùng Google Apps Script và Google Sheets, không có database.

**Hai địa chỉ Nhà Trai/Nhà Gái và hai mốc giờ đã được bổ sung trong cấu hình**. Cả hai nhà: 16:30 ngày 15/12/2026 (âm 07/11/2026) và 10:00 ngày 16/12/2026 (âm 08/11/2026).

## 1. Chạy website

Dùng extension Live Server trong VS Code để mở index.html. Hoặc mở trực tiếp file HTML từ máy.

## 2. Chỉnh địa điểm / thông tin cưới

Mở config/wedding-config.js. Cập nhật cặp địa điểm:

    venues: {
      groom: {
        name: "Tư gia Nhà Trai",
        address: "Xóm 2, thôn Đồng Kinh, xã Nam Thái Ninh, tỉnh Hưng Yên",
        schedule: [
          {time:"16:30", solarDate:"15/12/2026", lunarDate:"07/11/2026"},
          {time:"10:00", solarDate:"16/12/2026", lunarDate:"08/11/2026"}
        ],
        mapUrl: ""
      },
      bride: {
        name: "Tư gia Nhà Gái",
        address: "Xóm 7, thôn Đông Thái Xuyên, xã Đông Thái Ninh, tỉnh Hưng Yên",
        schedule: [
          {time:"16:30", solarDate:"15/12/2026", lunarDate:"07/11/2026"},
          {time:"10:00", solarDate:"16/12/2026", lunarDate:"08/11/2026"}
        ],
        mapUrl: ""
      }
    }

Mỗi địa điểm có nút GET DIRECTIONS riêng. Nếu có địa chỉ nhưng thiếu mapUrl, website tạo liên kết tìm kiếm Google Maps. Nếu thiếu cả hai, nút bản đồ được vô hiệu hóa và hiện "BẢN ĐỒ ĐANG CẬP NHẬT".

Ngày cưới bắt đầu lúc 16:30 ngày 15/12/2026, các sự kiện tiếp theo lúc 10:00 ngày 16/12/2026, múi giờ +07:00. Âm lịch tương ứng 07–08/11/2026. Lịch Google Calendar lưu cả hai ngày; chi tiết ghi rõ hai mốc giờ.

Countdown sẽ đếm ngược đến 16:30 ngày 15/12/2026. Khi bước vào hai ngày tổ chức, website chuyển thông điệp mừng cưới.

## 3. Ảnh và nhạc

Thư mục ảnh hiện có:
- hero.jpg, story-01.jpg, story-02.jpg, closing.jpg;
- gallery-1.jpg đến gallery-14.jpg;
- gallery -15.jpg (lưu ý có dấu cách trong tên);
- gallery-16.jpg đến gallery-22.jpg.

Danh sách toàn bộ album được cấu hình trong images.gallery của config/wedding-config.js. Có thể thêm/bớt ảnh bằng cách cập nhật mảng này. Ảnh trong gallery tải lazy và có lightbox.

Nhạc dùng assets/music/wedding.mp3. Khi khách bấm con dấu mở thiệp, nhạc tự phát trong chính thao tác click (được trình duyệt cho phép). Nút MUSIC ON/OFF vẫn có thể bật/tắt thủ công. Âm lượng khởi tạo 55%, tự lặp, có xử lý khi phát nhạc thất bại.

## 4. Google Sheets RSVP

Google Sheet đã được tạo: https://docs.google.com/spreadsheets/d/1_IQXhfUWpxPYsPqbzo0yvy8b9fY8epFSDpjm7SvHfUs/edit

ID đã nằm trong google-apps-script/Code.gs. Để hoàn tất kết nối, mở chính Sheet trên → Extensions → Apps Script → dán Code.gs → Deploy as Web App (Execute as Me, Anyone) → sao chép URL /exec vào googleScriptUrl của config/wedding-config.js. Gửi RSVP thử và xác minh dòng mới trong tab RSVP.

Hướng dẫn đầy đủ và trạng thái tích hợp nằm ở GOOGLE_SHEETS_SETUP.md.

Dữ liệu ngày cưới RSVP được gửi dưới dạng 2026-12-15 - 2026-12-16.
Frontend gửi với fetch mode no-cors; browser không thể xác nhận Google Sheet đã ghi dữ liệu. Phải thử và xác nhận trực tiếp trong Sheet.
Endpoint công khai có nguy cơ spam. Không thu thập dữ liệu nhạy cảm không cần thiết.

## 5. GitHub Pages

1. Upload toàn bộ source vào root GitHub repository.
2. Settings → Pages → Deploy from a branch.
3. Chọn main và folder / (root), Save.
4. URL dạng https://USERNAME.github.io/REPOSITORY/

Không cần domain riêng hay thuê hosting. Google Fonts cần kết nối internet. Website hỗ trợ responsive và prefers-reduced-motion.

## 6. Bản sao trước sửa

D:\Code\Inivation_Wedding_backup_20261109

Bản backup nằm ngoài thư mục dự án nên không được publish cùng GitHub Pages.


## 7. Bổ sung RSVP Nhà Trai / Nhà Gái và gallery không cắt ảnh (v1.2)

- Form RSVP có radio bắt buộc **Nhà Trai / Nhà Gái**, nằm ngay dưới số điện thoại.
- Trường gửi đi có tên `guestSide`. Mã `google-apps-script/Code.gs` thêm cột **Guest Side** vào cuối Sheet (đối với Sheet cũ) và giữ nguyên các cột/dữ liệu đã có. Các bản ghi trước đây sẽ để trống cột này.
- **Quan trọng:** Sau khi sửa `Code.gs`, cần cập nhật mã trên Apps Script và **Deploy → Manage deployments → Edit → New version → Deploy**. Chỉ sửa code trên máy không cập nhật Web App đang chạy.
- Gallery được bố trí dạng masonry, giữ nguyên tỷ lệ của từng file ảnh, không cắt mặt/cắt phần trên và dưới. CSS mới ở `css/gallery-layout.css`, được tải cuối cùng sau `responsive.css`.
- Desktop: 3 cột; tablet: 2 cột; mobile hẹp: 1 cột. Mặc định hiện 8 ảnh, nút Xem thêm hiển thị các ảnh kế tiếp theo lô 8, Thu gọn sau khi xem hết. Bấm vào ảnh để mở lightbox.
- Bản backup các file trước khi sửa nằm ở `D:\Code\Inivation_Wedding_backup_Gallery_RSVP_20261109`.


## 8. Wedding Gift + cập nhật địa chỉ (v1.3)

Phần Wedding Gift nằm **ngay bên dưới RSVP** và phía trên phần Thank You.
Giao diện hai thẻ Chú Rể / Cô Dâu, nền ivory/champagne, chữ 囍 và hoa văn trang nhã. Trên desktop hiện 2 cột, mobile tự xếp thành 1 cột.

### Địa chỉ cưới hiện tại

- **Nhà Trai:** Xóm 2, thôn Đồng Kinh, xã Nam Thái Ninh, tỉnh Hưng Yên.
- **Nhà Gái:** Xóm 7, thôn Đông Thái Xuyên, xã Đông Thái Ninh, tỉnh Hưng Yên.

Hai nút chỉ đường đã dùng các URL Google Maps riêng do người dùng cung cấp; lịch cả hai nhà gồm 16:30 ngày 15/12 và 10:00 ngày 16/12/2026.

### Điền thông tin chuyển khoản và QR

Mở config/wedding-config.js:

    gifts: {
      groom: {
        bankName: "HDBank",
        accountNumber: "203704070032134",
        accountHolder: "PHAM QUOC BAO",
        qrImage: "assets/images/qr-groom.png"
      },
      bride: {
        bankName: "MB Bank",
        accountNumber: "070024072",
        accountHolder: "VU THI NGOC LAN",
        qrImage: "assets/images/qr-bride.png"
      }
    }

Hai ảnh QR **đã được thêm** vào assets/images và kiểm tra khớp với dữ liệu QR do bạn cung cấp. Kiểm tra lại tên, số tài khoản trong ứng dụng ngân hàng khi quét trước khi chia sẻ.

Hiện hai QR và số tài khoản đã được cấu hình; nút Sao chép hoạt động trên HTTPS (GitHub Pages) và localhost hỗ trợ Clipboard API. Nếu sau này xóa file QR hoặc sai đường dẫn thì placeholder sẽ hiện lại.

Mã giao diện nằm ở css/wedding-gift.css và js/wedding-gift.js. Không cần thay đổi Google Apps Script/Google Sheets để hiển thị Wedding Gift.

Backup trước lần cập nhật: D:\Code\Inivation_Wedding_backup_Gift_20261109


## 9. Bố cục gallery và lịch 15–16/12/2026 (v1.4)

- Gallery chỉ hiển thị 8 ảnh lúc đầu. Nút "XEM THÊM 8 ẢNH" mở thêm từng nhóm 8, khi đã mở đủ sẽ đổi thành "THU GỌN ALBUM". Thay số ảnh tại galleryInitialCount và galleryBatchSize trong config/wedding-config.js. Các ảnh ẩn không bị cắt mặt, các ảnh vừa mở dùng lazy loading.
- Font menu desktop được tăng lên 11px, tablet 10px, mobile 9px; có chỉnh khoảng cách cho màn hình hẹp.
- Dương lịch: **16:30, 15/12/2026** và **10:00, 16/12/2026** cho cả Nhà Trai và Nhà Gái.
- Âm lịch do người dùng cung cấp: **07/11/2026** và **08/11/2026**. Đã ghi nhãn "Âm lịch" rõ ràng bên dưới mỗi mốc dương lịch để tránh nhầm.
- Địa chỉ Nhà Trai / Nhà Gái vẫn giữ nguyên. Google Calendar là sự kiện cả hai ngày, nội dung có ghi hai giờ và hai địa chỉ.
- Cấu hình lịch của từng nhà nằm ở venues.groom.schedule và venues.bride.schedule. Nếu đổi giờ, hãy cập nhật cả các trường schedule và weddingDate (để countdown khớp).
- CSS bổ sung: css/polish-v14.css.
- Backup trước khi sửa: D:\Code\Inivation_Wedding_backup_v14_20261109.

## 10. Mã QR chính thức và Google Sheet RSVP (v1.5)

- Hai mã QR đã được tái tạo từ nội dung VietQR chính xác trong ảnh cung cấp, lưu tại assets/images/qr-groom.png và assets/images/qr-bride.png. Đã kiểm tra QR giải mã đúng payload gốc và giao diện tải được trên desktop/mobile.
- Chủ tài khoản chú rể: PHAM QUOC BAO · HDBank · 203704070032134.
- Chủ tài khoản cô dâu: VU THI NGOC LAN · MB Bank · 070024072.
- Đã sửa thuộc tính loading=eager cho QR ở index.html (ảnh QR ban đầu bị ẩn để chờ onload, nếu để lazy thì trình duyệt có thể không tải).
- Google Sheet đã được tạo với tab RSVP, 8 cột, hàng tiêu đề và múi giờ Việt Nam; mã Code.gs đã cấu hình sẵn Sheet ID.
- URL Web App đã được triển khai, đã xác nhận phản hồi GET/POST và dữ liệu ghi thành công vào Google Sheet, sau đó xóa bản thử.
- Xem các bước chính xác trong GOOGLE_SHEETS_SETUP.md.
- Backup trước lần sửa: D:\Code\Inivation_Wedding_backup_QR_Sheets_20261109.

## 11. Kết nối Apps Script thực tế

Đã gắn URL /exec vào config/wedding-config.js và xác nhận GET trả về ready:true, POST trả về ok:true. Một bản RSVP thử đã được xác nhận ghi đúng 8 cột trong Google Sheet, sau đó xóa. Source vẫn chưa được push lên GitHub. Không cần thêm thư viện Apps Script mà người dùng gửi; sử dụng trực tiếp Web App URL.

## 12. Nhạc tự phát khi mở thiệp và font desktop (v1.6)

- Bấm con dấu OPEN LETTER là tương tác người dùng: website gọi audio.play() ngay trong handler của click, không chờ animation 900ms. Như vậy tránh lỗi chính sách autoplay của trình duyệt. Nếu tệp âm thanh hoặc trình duyệt từ chối phát, menu vẫn ở MUSIC OFF và khách có thể bấm bật thủ công.
- Âm lượng khởi tạo ở 55%, phát lặp, có thể tắt / bật lại bằng MUSIC ON/OFF trên menu.
- Nhạc hiện tại: assets/music/wedding.mp3 (khoảng 53 MB). Cân nhắc nén file nhạc trước khi đưa lên GitHub Pages để giảm thời gian tải trên mạng di động.
- Bổ sung CSS desktop ở css/typography-v16.css (tải sau polish-v14.css). Tăng nhẹ kích thước chữ menu, mô tả, nội dung câu chuyện, địa chỉ, form RSVP, Wedding Gift và footer từ màn hình rộng tối thiểu 851px; không làm to lại typography mobile.
- Kiểm thử Microsoft Edge headless: nhạc phát ngay từ click mở thiệp; MENU MUSIC ON, OFF, ON hoạt động; font desktop paragraph 17px, subtitle 15px, menu 13px, RSVP input 16px, gift account 14px; mobile 390px không tràn ngang.
- Bản backup trước thay đổi nằm tại D:\Code\Inivation_Wedding_backup_music_typography_20261109.


## 13. Song ngữ Việt / Anh — v1.7

- **Tiếng Việt là mặc định** khi mở hoặc tải lại thiệp (không lưu lựa chọn EN vào localStorage).
- Nút VN / EN nằm **ngay cạnh nút nhạc** trên thanh menu. Nhấn để đổi toàn bộ chữ trên trang mà không reload.
- Bản dịch bao gồm: mở thiệp, menu, hero, câu chuyện, đếm ngược, ngày cưới, lịch trình Nhà Trai/Nhà Gái, Google Calendar, album, RSVP, Wedding Gift, thông báo gửi form, thanh nhạc và footer.
- Phần ngày âm/dương và thứ trong tuần tự chuyển theo ngôn ngữ. Địa chỉ, tên riêng, số tài khoản ngân hàng và liên kết bản đồ vẫn giữ nguyên dữ liệu gốc.
- Các giá trị **radio RSVP gửi sang Google Sheets không thay đổi** (guestSide: Nhà Trai / Nhà Gái, attendance giữ nguyên tiếng Việt), ngay cả khi khách đang xem trang bằng English.
- Nút không làm dừng nhạc hoặc mất dữ liệu người dùng đang nhập, cũng không làm thu gọn album đã mở.
- js/i18n.js: bảng dịch tĩnh + điều khiển nút VN/EN + thuộc tính lang.
- js/i18n-dynamic.js: dịch ngày tháng, lịch trình, bản đồ, Google Calendar, gallery, biểu mẫu đang nhập.
- js/countdown.js, js/rsvp.js, js/wedding-gift.js, js/main.js: thông điệp và nhãn động theo ngôn ngữ.
- css/i18n-v17.css: style nút switch; desktop một hàng và mobile menu hai hàng cho 320–600px.
- Kiểm thử Edge: default VI, chuyển EN rồi trở về VI, nhạc tiếp tục phát, 8→16 ảnh trong album, dữ liệu form không mất, không tràn ngang ở 320 / 390 / 600 / 768 / 1024px.
- Backup trước chỉnh sửa: D:\Code\Inivation_Wedding_backup_i18n_20261109.

Để chỉnh câu chữ: sửa cặp ngôn ngữ trong bảng messages của js/i18n.js. Không cần database, framework hay dịch vụ dịch máy. Source tương thích GitHub Pages.
