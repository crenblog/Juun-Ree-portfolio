/* One bottom-up cover / downward reveal for documents and case overlays. */
(() => {
  const html=document.documentElement,reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const sheet=document.createElement('div');sheet.className='space-sheet';sheet.setAttribute('aria-hidden','true');document.body.append(sheet);
  const api={busy:false,restoringFocus:false};
  let animation=null,operation=Promise.resolve(),leaving=false;
  const entry=html.classList.contains('space-entering');
  if(entry)sheet.style.transform='translateY(0)';
  html.classList.remove('space-entering');
  window.jrSpace=api;
  api.restoreFocus=trigger=>{api.restoringFocus=true;try{trigger?.focus({preventScroll:true});}finally{api.restoringFocus=false;}};
  function bounded(promise,ms){
    return new Promise(resolve=>{const timer=setTimeout(resolve,ms);Promise.resolve(promise).catch(()=>{}).then(value=>{clearTimeout(timer);resolve(value);});});
  }
  function frames(){return new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));}
  async function move(cover,direction=html.dataset?.spaceDirection){
    animation?.cancel();
    const side=direction==='back'?-1:1;
    const from=direction?(cover?`translateX(${side*100}%)`:'translateX(0)'):(cover?'translateY(100%)':'translateY(0)');
    const to=direction?(cover?'translateX(0)':`translateX(${-side*100}%)`):(cover?'translateY(0)':'translateY(100%)');
    sheet.style.transform=to;
    if(reduced.matches||!sheet.animate)return;
    animation=sheet.animate([{transform:from},{transform:to}],{
      duration:cover?280:360,easing:cover?'cubic-bezier(.65,0,.35,1)':'cubic-bezier(.22,1,.36,1)'
    });
    await animation.finished.catch(()=>{});animation=null;
  }
  async function ready(root=document){
    await frames();
    // Wait for first-view media and typography, not off-screen lazy images.
    const images=[...root.querySelectorAll('img')].filter(img=>{
      const r=img.getBoundingClientRect();return r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight;
    });
    const media=images.map(img=>img.decode?img.decode().catch(()=>{}):Promise.resolve());
    const language=new Promise(resolve=>{
      if(!html.classList.contains('i18n-pending'))return resolve();
      const observer=new MutationObserver(()=>{if(!html.classList.contains('i18n-pending')){observer.disconnect();clearTimeout(timer);resolve();}});
      const timer=setTimeout(()=>{observer.disconnect();resolve();},2200);
      observer.observe(html,{attributes:true,attributeFilter:['class']});
    });
    await Promise.all([bounded(Promise.all(media),2200),bounded(document.fonts?.ready,1200),language]);
    window.dispatchEvent?.(new Event('portfolio:space-ready'));
    await frames();
  }
  function release(){api.busy=false;html.classList.remove('space-busy');sheet.style.transform='translateY(100%)';}
  api.releaseNative=()=>{window.jrUnfreezeSpace?.();release();};
  api.run=(change,{queue=false}={})=>{
    if(api.busy){
      if(leaving||!queue)return Promise.resolve(false);
      const next=()=>api.run(change,{queue:true});return operation.then(next,next);
    }
    api.busy=true;html.classList.add('space-busy');
    operation=(async()=>{
      try{await move(true);const root=await change();await ready(root?.querySelectorAll?root:document);await move(false);return true;}
      finally{release();}
    })();
    return operation;
  };
  api.navigate=async href=>{
    if(api.busy)return;
    api.busy=true;leaving=true;html.classList.add('space-busy');
    try{
      const direction=window.jrSpaceRoute?.direction(location.href,href)||'';
      const native=!!direction&&window.jrSpaceRoute?.supported&&!reduced.matches;
      if(native){await window.jrFreezeSpace?.();await frames();}
      if(!native)await move(true,direction);
      try{sessionStorage.setItem('jr-space-entry',JSON.stringify({href:new URL(href,location.href).href,direction,native,at:Date.now()}));}catch{}
      leaving=true;location.assign(href);
      // Navigation can be cancelled: don't leave an obscured screen.
      setTimeout(()=>{if(leaving){leaving=false;move(false).finally(release);}},5000);
    }catch{leaving=false;release();}
  };
  api.alignCase=(trigger,caseElement)=>{
    const section=trigger?.closest('.rings__card')?.dataset.section;
    const heading=section?caseElement.querySelector('[data-i18n="'+section+'"]'):caseElement.querySelector('.cv-title');
    if(!heading)return;
    const view=document.getElementById('caseView');
    const align=()=>{
      if(section){let top=0,node=heading;while(node&&node!==view){top+=node.offsetTop;node=node.offsetParent;}view.scrollTop=Math.max(0,top-100);}
      window.cvChromeReset?.();document.body.classList.remove('case-chrome-away');
    };
    align();requestAnimationFrame(()=>requestAnimationFrame(()=>{if(!caseElement.hidden)align();}));
    heading.tabIndex=-1;heading.focus({preventScroll:true});
  };
  if(entry){
    api.busy=true;html.classList.add('space-busy');
    operation=new Promise(resolve=>{
      const reveal=()=>ready().then(()=>move(false)).finally(()=>{release();resolve();});
      if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',reveal,{once:true});else reveal();
    });
  }
  window.addEventListener('pageshow',event=>{
    if(event.persisted){
      leaving=false;animation?.cancel();
      if(html.dataset?.spaceDirection||window.jrNativeSpaceEntry){release();return;}
      api.busy=true;html.classList.add('space-busy');sheet.style.transform='translateY(0)';operation=ready().then(()=>move(false)).finally(release);
    }
  });
})();
