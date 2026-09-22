(() => {
  const routes={40:['짧게, 핵심부터.','대표 작품을 중심으로 가볍게 둘러보는 경로 예시입니다.'],90:['조금 더, 천천히.','작품과 전시실 사이를 여유 있게 연결하는 경로 예시입니다.'],180:['오늘은, 충분히.','여러 전시실과 휴식 시간을 함께 고려한 경로 예시입니다.']};
  document.querySelectorAll('[data-minutes]').forEach(button=>button.addEventListener('click',()=>{
    const value=button.dataset.minutes;
    document.querySelectorAll('[data-minutes]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
    document.getElementById('semaMinutes').textContent=value;
    document.getElementById('semaRouteTitle').textContent=routes[value][0];
    document.getElementById('semaRouteCopy').textContent=routes[value][1];
  }));
  const links=[...document.querySelectorAll('.sema-chapters a')];
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(link=>{if(link.hash==='#'+entry.target.id)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}),{rootMargin:'-20% 0px -55% 0px'});
    links.forEach(link=>observer.observe(document.querySelector(link.hash)));
  }
})();
