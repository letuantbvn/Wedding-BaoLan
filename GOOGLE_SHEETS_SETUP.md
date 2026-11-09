# Kết nối RSVP → Google Sheets (Wedding Invitation)

## Google Sheet đã tạo
https://docs.google.com/spreadsheets/d/1_IQXhfUWpxPYsPqbzo0yvy8b9fY8epFSDpjm7SvHfUs/edit

Tab: **RSVP**. Các cột: Timestamp, Guest Name, Phone, Attendance, Guests, Message, Wedding Date, Guest Side.

Sheet được tạo ở Google Drive đang kết nối với ChatGPT. Để triển khai Apps Script, hãy sử dụng **chính tài khoản Google có quyền chỉnh sửa Sheet này**. Nếu dùng tài khoản Google khác, chủ Sheet phải cấp quyền Editor trước, nếu không Apps Script có thể báo lỗi quyền.

## Các bước triển khai lại khi cần (đã hoàn thành lần đầu)

1. Mở Google Sheet ở đường link bên trên.
2. Chọn **Extensions → Apps Script**.
3. Xóa mã mặc định trong trình biên tập và dán toàn bộ nội dung file google-apps-script/Code.gs trong dự án.
   - Mã đã có sẵn SPREADSHEET_ID và SHEET_NAME, không cần thay ID.
   - Mã có hàm doGet kiểm tra quyền truy cập và doPost ghi RSVP.
4. Nhấn **Save** (đặt tên dự án Wedding RSVP API nếu muốn).
5. Chọn **Deploy → New deployment**, loại **Web app**.
6. Chọn **Execute as: Me** và **Who has access: Anyone**. Xác nhận và cấp quyền Google khi được hỏi.
7. Sao chép URL Web App kết thúc bằng **/exec**.
8. Mở config/wedding-config.js, thay dòng googleScriptUrl: "" bằng Google Apps Script URL /exec vừa sao chép.
9. Mở URL /exec trên trình duyệt. Kết quả phải có "ok":true, "ready":true; nếu ready:false, kiểm tra quyền chỉnh sửa Sheet.
10. Mở website thiệp cưới, gửi **một bản RSVP thử**. Xác nhận dòng mới xuất hiện ở tab RSVP.

**Sau mỗi lần cập nhật mã Apps Script:** vào Deploy → Manage deployments → Edit → New version → Deploy. Cập nhật file Code.gs trên máy không tự cập nhật Web App.

## Bảo mật và hạn chế

- Google Sheet vẫn là **riêng tư**, không mở quyền đọc hoặc sửa Sheet công khai. Apps Script nhận phản hồi và thực thi với quyền chủ sở hữu.
- Endpoint /exec là điểm nhận dữ liệu công khai; có rủi ro spam. Không yêu cầu khách cung cấp thông tin nhạy cảm không cần thiết.
- Frontend gửi qua fetch mode no-cors. Browser **không thể đọc kết quả ghi từ Apps Script**: thông báo trên trang chỉ có nghĩa yêu cầu đã gửi đi. Hãy luôn kiểm tra dòng dữ liệu thật trong Sheet trước khi chia sẻ website.
- Dùng URL /exec, không dùng /dev cho khách mời.
- Không cần backend/database/server riêng hay hosting trả phí.

## Mã QR đã tích hợp

Hai QR được tái tạo trực tiếp từ payload VietQR của các ảnh người dùng cung cấp và kiểm tra giải mã:

- Nhà Trai: HDBank — PHAM QUOC BAO — 203704070032134 — assets/images/qr-groom.png
- Nhà Gái: MB Bank — VU THI NGOC LAN — 070024072 — assets/images/qr-bride.png

Hai mã QR không cài số tiền mặc định. Luôn kiểm tra thông tin trong ứng dụng ngân hàng khi quét trước khi phát hành rộng rãi.

## Trạng thái

**ĐÃ KẾT NỐI THÀNH CÔNG.** URL Web App đã gắn trong config/wedding-config.js. Đã kiểm tra GET trả về {ok:true, ready:true}; POST trả về {ok:true}, bản ghi xuất hiện trong tab RSVP của Google Sheet. Dòng dữ liệu kiểm thử đã được xóa sau khi xác minh. Khi thay Code.gs trong tương lai, cần tạo phiên bản triển khai mới trong Apps Script.
