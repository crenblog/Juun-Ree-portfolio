/* Install before first paint, including browser Back/Forward restores. */
(() => {
  const html=document.documentElement,key='jr-space-entry';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const supported='PageSwapEvent' in window && 'PageRevealEvent' in window;
  html.dataset.spaceTransitionSupport=supported?'native':'fallback';
  const name=url=>{try{return new URL(url,location.href).pathname.split('/').pop()||'index.html';}catch{return '';}};
  const direction=(from,to)=>{
    const a=name(from),b=name(to);
    if(a==='index.html'&&b==='work.html')return 'forward';
    if(a==='work.html'&&b==='index.html')return 'back';
    return '';
  };
  window.jrSpaceRoute={direction,supported};
  let marker=null;
  try{marker=JSON.parse(sessionStorage.getItem(key)||'null');sessionStorage.removeItem(key);}catch{}
  const valid=marker&&marker.href===location.href&&Date.now()-marker.at<15000;
  if(valid&&marker.direction){
    html.dataset.spaceDirection=marker.direction;
    window.jrNativeSpaceEntry=marker.native&&supported&&!reduced.matches;
  }
  if(valid&&!window.jrNativeSpaceEntry){
    html.classList.add('space-entering');
    setTimeout(()=>html.classList.remove('space-entering'),6000);
  }
  // The outgoing and incoming snapshots move by the same distance, with the
  // same timing. No blank coloured panel or sidebar-width interpolation.
  window.addEventListener('pageswap',event=>{
    const destination=event.activation?.entry?.url;
    const dir=destination?direction(location.href,destination):'';
    if(!dir||reduced.matches){event.viewTransition?.skipTransition();return;}
    window.jrFreezeSpace?.();
    html.dataset.spaceDirection=dir;
    try{sessionStorage.setItem(key,JSON.stringify({href:destination,direction:dir,native:!!event.viewTransition,at:Date.now()}));}catch{}
  });
  window.addEventListener('pagereveal',event=>{
    if(!event.viewTransition)return;
    const activation=window.navigation?.activation;
    let restored=null;
    try{restored=JSON.parse(sessionStorage.getItem(key)||'null');if(restored?.href===location.href)sessionStorage.removeItem(key);}catch{}
    const restoreDirection=restored?.href===location.href&&Date.now()-restored.at<15000?restored.direction:'';
    const dir=restoreDirection||direction(activation?.from?.url||'',location.href)||html.dataset.spaceDirection;
    if(!dir||reduced.matches){event.viewTransition.skipTransition();return;}
    html.dataset.spaceDirection=dir;window.jrNativeSpaceEntry=true;
    if(window.jrSpace)window.jrSpace.busy=true;
    event.viewTransition.finished.catch(()=>{}).finally(()=>{
      delete html.dataset.spaceDirection;window.jrNativeSpaceEntry=false;
      window.jrSpace?.releaseNative?.();
    });
  });
})();
