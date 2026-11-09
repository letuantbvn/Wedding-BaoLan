# Wedding Invitation v1.4 — Luxury Ivory

Website thiệp cưới HTML + CSS + JavaScript thuần, chạy qua GitHub Pages.

## Thông tin đã cập nhật

- Chú rể: theo cấu hình hiện tại trong wedding-config.js (tên có thể được điều chỉnh riêng)
- Cô dâu: Ngọc Lan (theo cấu hình hiện tại)
- Ngày cưới dương lịch: 15–16/12/2026 (Thứ Ba – Thứ Tư, giờ Việt Nam); âm lịch: 07–08/11/2026.
- Hai khu vực riêng: Nhà Trai và Nhà Gái, đã nhập địa chỉ tại Hưng Yên
- Wedding Gift: hai thẻ QR/ngân hàng, cấu hình riêng và tự ẩn nút sao chép khi chưa có số tài khoản
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

Nhạc dùng assets/music/wedding.mp3. Khách phải chủ động bấm MUSIC để phát, không tự phát trong trình duyệt.

## 4. Google Sheets RSVP

1. Tạo Google Sheet mới, sao chép Sheet ID trong đường dẫn.
2. Vào Extensions → Apps Script và dán nội dung google-apps-script/Code.gs.
3. Sửa SPREADSHEET_ID trong Code.gs bằng ID Google Sheet.
4. Deploy → New deployment → Web app.
5. Execute as: Me; Who has access: Anyone.
6. Deploy, cấp quyền, sao chép URL /exec.
7. Dán URL vào googleScriptUrl trong config/wedding-config.js.
8. Gửi bản RSVP thử và kiểm tra dòng mới trong Google Sheet.

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

Hai nút chỉ đường dùng tìm kiếm Google Maps với địa chỉ đã cung cấp. Muốn dẫn đến đúng ghim vị trí, hãy điền URL Maps chính thức vào thuộc tính mapUrl của mỗi nhà. Ngày/giờ riêng từng nhà vẫn để trống do chưa có thông tin.

### Điền thông tin chuyển khoản và QR

Mở config/wedding-config.js:

    gifts: {
      groom: {
        bankName: "Tên ngân hàng của chú rể",
        accountNumber: "Số tài khoản chú rể",
        accountHolder: "Chủ tài khoản",
        qrImage: "assets/images/qr-groom.png"
      },
      bride: {
        bankName: "Tên ngân hàng của cô dâu",
        accountNumber: "Số tài khoản cô dâu",
        accountHolder: "Chủ tài khoản",
        qrImage: "assets/images/qr-bride.png"
      }
    }

Hãy thêm ảnh QR **chính thức** vào assets/images với đường dẫn tương ứng. Không lấy số tài khoản hoặc QR từ hình tham khảo nếu chưa chắc chắn đúng người nhận.

Nếu chưa có QR thì thẻ hiển thị placeholder "MÃ QR ĐANG CẬP NHẬT" — **không tạo QR giả**. Nếu chưa nhập số tài khoản, nút Sao chép sẽ ẩn. Nếu đã nhập, nút Sao chép hoạt động trên HTTPS (GitHub Pages) và localhost hỗ trợ Clipboard API.

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
