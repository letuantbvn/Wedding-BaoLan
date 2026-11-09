/**
 * Wedding RSVP -> Google Sheets.
 * Thêm Guest Side mà không làm lệch dữ liệu của sheet cũ.
 * Deploy: New deployment -> Web app -> Execute as Me -> Anyone.
 */
// Sheet RSVP đã được tạo: https://docs.google.com/spreadsheets/d/1_IQXhfUWpxPYsPqbzo0yvy8b9fY8epFSDpjm7SvHfUs/edit
const SPREADSHEET_ID = '1_IQXhfUWpxPYsPqbzo0yvy8b9fY8epFSDpjm7SvHfUs';
const SHEET_NAME = 'RSVP';
const BASE_HEADERS = [
  'Timestamp', 'Guest Name', 'Phone', 'Attendance',
  'Guests', 'Message', 'Wedding Date', 'Guest Side'
];

// Truy cập /exec sau triển khai để kiểm tra quyền đọc Sheet.
// Không xuất dữ liệu khách mời trong phản hồi này.
function doGet() {
  try {
    const ready = Boolean(SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME));
    return json({ok:ready,service:'Wedding RSVP',ready});
  } catch (err) {
    console.error(err);
    return json({ok:false,service:'Wedding RSVP',ready:false});
  }
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(15000);
    const p = (e && e.parameter) || {};
    const guestSide = String(p.guestSide || '').trim();
    const clean = (value, length) => {
      const s = String(value || '').trim().slice(0, length);
      // Không cho dữ liệu người dùng bị diễn giải thành công thức trong Sheets.
      return ['=', '+', '-', '@'].includes(s.charAt(0)) ? "'" + s : s;
    };
    if (!String(p.guestName || '').trim()
        || !String(p.attendance || '').trim()
        || !['Nhà Trai', 'Nhà Gái'].includes(guestSide)) {
      return json({ok:false,error:'Missing or invalid required fields'});
    }
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1,1,1,BASE_HEADERS.length).setValues([BASE_HEADERS]);
      sheet.setFrozenRows(1);
    } else {
      const existingHeaders = sheet.getRange(
        1,1,1,Math.max(sheet.getLastColumn(),1)
      ).getValues()[0].map(v => String(v || '').trim());
      // Sheet cũ có 7 cột; thêm cột bên phải và giữ nguyên dữ liệu lịch sử.
      if (!existingHeaders.includes('Guest Side')) {
        sheet.getRange(1, existingHeaders.length + 1).setValue('Guest Side');
      }
    }
    const columns = sheet.getRange(1,1,1,sheet.getLastColumn())
      .getValues()[0].map(v => String(v || '').trim());
    const data = {
      'Timestamp': new Date(),
      'Guest Name': clean(p.guestName,100),
      'Phone': clean(p.phone,30),
      'Attendance': clean(p.attendance,100),
      'Guests': clean(p.guestCount,5),
      'Message': clean(p.message,1000),
      'Wedding Date': clean(p.weddingDate,100),
      'Guest Side': clean(guestSide,20)
    };
    sheet.appendRow(columns.map(h => Object.prototype.hasOwnProperty.call(data,h) ? data[h] : ''));
    return json({ok:true});
  } catch (err) {
    console.error(err);
    return json({ok:false,error:'Server error'});
  } finally {
    if (lock.hasLock()) lock.releaseLock();
  }
}
function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
