/* Localize information generated dynamically by main.js and the gallery. */
(() => {
  'use strict';
  const cfg = window.WEDDING_CONFIG || {};
  const i18n = window.WEDDING_I18N;
  if (!i18n) return;
  const t = (k,vars) => i18n.t(k,vars);
  const $ = q => document.querySelector(q);
  const $$ = q => [...document.querySelectorAll(q)];
  const zone = 'Asia/Ho_Chi_Minh';
  const start = new Date(cfg.weddingDate || '2026-12-15T16:30:00+07:00');
  const end = new Date(cfg.weddingEndDate || '2026-12-16T23:59:59+07:00');
  const valid = !Number.isNaN(+start) && !Number.isNaN(+end) && end >= start;
  const fmt = (d,opts,loc='en-GB') =>
    new Intl.DateTimeFormat(loc,{...opts,timeZone:zone}).format(d);
  const key = d => fmt(d,{year:'numeric'}) + fmt(d,{month:'2-digit'}) + fmt(d,{day:'2-digit'});
  const names = {groom:cfg.groomName||'Quốc Bảo',bride:cfg.brideName||'Ngọc Lan'};
  const isVi = () => i18n.lang === 'vi';

  function dateInfo() {
    if (!valid) return {
      short:'15 – 16 · 12 · 2026',
      long:isVi()?'15 – 16 tháng 12 năm 2026':'15 – 16 December 2026',
      weekday:isVi()?'THỨ BA – THỨ TƯ':'TUESDAY – WEDNESDAY',
      month:isVi()?'THÁNG 12':'DECEMBER',
      lunar:isVi()?'07–08/11/2026 (âm lịch)':'07–08/11/2026 (lunar calendar)'
    };
    const m=fmt(start,{month:'2-digit'}),y=fmt(start,{year:'numeric'});
    const a=fmt(start,{day:'2-digit'}),b=fmt(end,{day:'2-digit'});
    const sameMonth=fmt(start,{month:'2-digit',year:'numeric'})===fmt(end,{month:'2-digit',year:'numeric'});
    const long=sameMonth
      ? isVi()? a+' – '+b+' tháng '+Number(m)+' năm '+y
        : a+' – '+b+' '+fmt(start,{month:'long'})+' '+y
      : isVi() ? fmt(start,{day:'2-digit',month:'2-digit',year:'numeric'},'vi-VN')+' – '+
        fmt(end,{day:'2-digit',month:'2-digit',year:'numeric'},'vi-VN')
        :fmt(start,{day:'2-digit',month:'long',year:'numeric'})+' – '+
          fmt(end,{day:'2-digit',month:'long',year:'numeric'});
    const weekday=fmt(start,{weekday:'long'},isVi()?'vi-VN':'en-GB')+' – '+
      fmt(end,{weekday:'long'},isVi()?'vi-VN':'en-GB');
    const lunarRaw=cfg.lunarDateLabel||'07–08/11/2026 (âm lịch)';
    return {
      short:sameMonth?a+' – '+b+' · '+m+' · '+y:
        fmt(start,{day:'2-digit',month:'2-digit',year:'numeric'})+' – '+
        fmt(end,{day:'2-digit',month:'2-digit',year:'numeric'}),
      long,
      weekday:weekday.toLocaleUpperCase(isVi()?'vi-VN':'en-GB'),
      month:isVi()?'THÁNG '+Number(m):fmt(start,{month:'long'}).toUpperCase(),
      lunar:isVi()?lunarRaw:lunarRaw.replace(/\(\s*âm lịch\s*\)/gi,'(lunar calendar)')
    };
  }
  function renderMain() {
    const d=dateInfo();
    $$('[data-date-label]').forEach(el=>el.textContent=d.short);
    $$('[data-weekday]').forEach(el=>el.textContent=d.weekday);
    $$('[data-lunar-label]').forEach(el=>el.textContent=d.lunar);
    $$('[data-month]').forEach(el=>el.textContent=d.month);
    $('#whenTitle').textContent=d.long.toLocaleUpperCase(isVi()?'vi-VN':'en-GB');
    const countdownLabel=$('#countdownLabel');
    if (!$('#countdown').hidden) countdownLabel.textContent=d.long;
    else if (Date.now()>end.getTime())
      countdownLabel.textContent=t('countLabelPast',{date:$('#whenTitle').textContent});
    else if (Date.now()>=start.getTime())
      countdownLabel.textContent=t('countLabelToday',{date:$('#whenTitle').textContent});
    for (const side of ['groom','bride']) {
      const venue=cfg.venues?.[side]||{};
      const name=venue.name||'';
      const title=$('[data-'+side+'-venue]');
      if (!isVi() && name === 'Tư gia Nhà Trai') title.textContent="Groom's family home";
      else if (!isVi() && name === 'Tư gia Nhà Gái') title.textContent="Bride's family home";
      else title.textContent=name;
      const schedule=$('[data-'+side+'-schedule]');
      const titleSchedule=schedule.querySelector('.venue-schedule-title');
      if(titleSchedule)titleSchedule.textContent=t('venueTimeTitle');
      schedule.querySelectorAll('.venue-schedule-row').forEach((row,index)=>{
        const item=venue.schedule?.[index]||{};
        const solar=row.querySelector('.venue-schedule-solar');
        const lunar=row.querySelector('.venue-schedule-lunar');
        if(solar)solar.textContent=(item.solarDate||'')+' · '+t('venueSolar');
        if(lunar)lunar.textContent=(item.lunarDate||'')+' · '+t('venueLunar');
      });
      const map=$('#'+side+'MapLink');
      map.textContent=map.hasAttribute('href')?t('mapLink'):t('mapPending');
    }
    const calendar=$('#calendarLink');
    if(valid) {
      const endExclusive=new Date(end.getTime()+1000);
      const describe=(side,viName,enName)=>{
        const venue=cfg.venues?.[side]||{};
        return (isVi()?viName:enName)+': '+
          (venue.schedule||[]).map(item=>
            item.time+' '+item.solarDate+' ('+(isVi()?'âm':'lunar')+' '+item.lunarDate+')'
          ).join('; ')+'\n'+(venue.address||'');
      };
      const params=new URLSearchParams({
        action:'TEMPLATE',
        text:(isVi()?'Lễ cưới của ':'Wedding of ')+names.groom+' & '+names.bride,
        dates:key(start)+'/'+key(endExclusive),ctz:zone,
        details:(isVi()?'Dương lịch: ':'Gregorian calendar: ')+d.long+'\n'+
          (isVi()?'Âm lịch: ':'Lunar calendar: ')+d.lunar+'\n'+
          describe('groom','Nhà Trai',"Groom's family")+'\n'+
          describe('bride','Nhà Gái',"Bride's family")
      });
      calendar.href='https://calendar.google.com/calendar/render?'+params;
    }
    calendar.textContent=t('calendarLink');
    $('#lightboxImage').alt=t('lightboxAlt');
    const audio=$('#backgroundMusic');
    const music=$('#musicToggle');
    const playing=!audio.paused;
    music.setAttribute('aria-label',t(playing?'musicOnAria':'musicOffAria'));
    music.title=t(playing?'musicOnAria':'musicOffAria');
    $('#musicText').textContent=t(playing?'musicOn':'musicOff');
    // Giữ nguyên value gốc của select/radio để Google Sheets luôn nhận dữ liệu tương thích.
    $$('#guestCount option').forEach(option=>{
      const n=Number(option.value);
      option.textContent=isVi()?n+' người':n+' '+(n===1?'guest':'guests');
    });
  }

  function renderGallery() {
    const visible=$$('#galleryGrid .gallery-tile').filter(el=>!el.hidden);
    const all=$$('#galleryGrid .gallery-tile');
    const more=$('#galleryMore');
    const counter=$('#galleryCount');
    if(more && !more.hidden) {
      const remaining=all.length-visible.length;
      const batchSize=Math.max(1,Number(cfg.galleryBatchSize)||8);
      more.textContent=remaining>0 ? t('galleryShowMore',{count:Math.min(remaining,batchSize)}) : t('galleryCollapse');
    }
    if(counter)counter.textContent=t('galleryCounter',{shown:visible.length,total:all.length});
    all.forEach((tile,index)=>{
      tile.setAttribute('aria-label',t('galleryViewPhoto')+' '+(index+1));
      const photo=tile.querySelector('img');
      if(photo)photo.alt=t('galleryPhotoAlt')+' '+(index+1);
    });
  }
  function render() {renderMain();renderGallery();}
  document.addEventListener('wedding:languagechange',render);
  $('#galleryMore')?.addEventListener('click',renderGallery);
  render();
})();
