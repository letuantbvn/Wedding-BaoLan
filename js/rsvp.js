(() => {
  const c=window.WEDDING_CONFIG||{};
  const form=document.getElementById('rsvpForm');const status=document.getElementById('formStatus');const button=document.getElementById('rsvpSubmit');
  const guestCount=document.getElementById('guestCount');
  const attendance=[...form.querySelectorAll('input[name="attendance"]')];
  attendance.forEach(input=>input.addEventListener('change',()=>{if(!input.checked)return;const coming=input.value.startsWith('Có');guestCount.disabled=!coming;if(!coming)guestCount.value='1';}));
  form.addEventListener('submit',async e=>{
    e.preventDefault();if(!form.reportValidity())return;
    if(!c.googleScriptUrl){status.textContent='RSVP chưa kết nối Google Sheets. Hãy cập nhật googleScriptUrl trong config/wedding-config.js.';status.style.color='#965b44';return;}
    const values=Object.fromEntries(new FormData(form).entries());
    if(!['Nhà Trai','Nhà Gái'].includes(values.guestSide)){
      status.textContent='Vui lòng chọn Nhà Trai hoặc Nhà Gái.';
      status.style.color='#965b44';
      return;
    }
    if(values.attendance.startsWith('Rất tiếc'))values.guestCount='0';
    Object.assign(values,{weddingDate:(c.weddingDate||'').slice(0,10)+' - '+(c.weddingEndDate||'').slice(0,10),submittedAt:new Date().toISOString()});
    button.disabled=true;status.textContent='Đang gửi xác nhận...';
    try{
      // Response from Apps Script is opaque in no-cors mode: cannot verify saved row in browser.
      await fetch(c.googleScriptUrl,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:new URLSearchParams(values).toString()});
      status.textContent='Yêu cầu đã được gửi. Cảm ơn bạn!';status.style.color='#60795f';form.reset();guestCount.disabled=false;
    }catch(err){console.error(err);status.textContent='Không thể gửi thông tin. Vui lòng thử lại hoặc liên hệ trực tiếp.';status.style.color='#965b44';}
    finally{button.disabled=false;}
  });
})();
