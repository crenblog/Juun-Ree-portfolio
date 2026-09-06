/* ---- reduced motion + embed-safe anchor scroll ---- */
var noMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    if(a.closest('.case-view'))return;
    if(a.id==='workNav' && window.matchMedia('(min-width: 1080px)').matches)return; /* desktop Work retains its accordion; compact layouts scroll to #work */
    var href=a.getAttribute('href');
    if(!href||href.length<2)return;
    var t=document.getElementById(href.slice(1));
    if(t){
      e.preventDefault();
      if(window.innerWidth<1080&&a.closest('.sb-nav, .scroll-topbar__nav')&&(href==='#about'||href==='#contact')){
        window.dispatchEvent(new CustomEvent('portfolio:header-intent-scroll',{detail:{target:href.slice(1)}}));
      }
      t.scrollIntoView({behavior:noMotion?'auto':'smooth',block:'start'});
    }
  });
});

/* ---- case study overlay ---- */
var caseView=document.getElementById('caseView');
var cvChips=document.getElementById('cvChips');
var cvCurrent=null;
var cvTrigger=null;
function needsCompactScrollIsolation(){return window.matchMedia('(max-width: 1079px)').matches;}
/* Detail scroll isolation: the case owns scrolling while open. Store and restore
   the document position instead of relying on body overflow alone, which can leak on iOS. */
var caseScrollLock={active:false,y:0,bodyStyle:null,releaseTimer:null,scrollRestoration:null};
function lockMainScroll(){
  if(!needsCompactScrollIsolation()||caseScrollLock.active)return;
  var body=document.body;
  caseScrollLock.y=window.scrollY||document.documentElement.scrollTop||0;
  caseScrollLock.bodyStyle={position:body.style.position,top:body.style.top,left:body.style.left,right:body.style.right,width:body.style.width,overflow:body.style.overflow};
  caseScrollLock.scrollRestoration=history.scrollRestoration;
  history.scrollRestoration='manual';
  body.style.position='fixed';body.style.top='-'+caseScrollLock.y+'px';body.style.left='0';body.style.right='0';body.style.width='100%';body.style.overflow='hidden';
  document.documentElement.classList.add('case-open');
  caseScrollLock.active=true;
}
function unlockMainScroll(){
  if(!caseScrollLock.active)return;
  var body=document.body,style=caseScrollLock.bodyStyle;
  var restoreY=caseScrollLock.y;
  var previousRestoration=caseScrollLock.scrollRestoration||'auto';
  body.style.position=style.position;body.style.top=style.top;body.style.left=style.left;body.style.right=style.right;body.style.width=style.width;body.style.overflow=style.overflow;
  document.documentElement.classList.remove('case-open');
  function restorePosition(){
    var root=document.documentElement;
    var previousBehavior=root.style.scrollBehavior;
    root.style.scrollBehavior='auto';
    window.scrollTo({top:restoreY,left:0,behavior:'auto'});
    root.scrollTop=restoreY;
    document.body.scrollTop=restoreY;
    root.style.scrollBehavior=previousBehavior;
  }
  restorePosition();
  window.requestAnimationFrame(function(){
    restorePosition();
    window.setTimeout(function(){
      restorePosition();
      history.scrollRestoration=previousRestoration;
      caseScrollLock.active=false;caseScrollLock.bodyStyle=null;caseScrollLock.scrollRestoration=null;
    },0);
  });
}
function releaseMainScrollAfterClose(){
  if(!caseScrollLock.active)return;
  if(noMotion){unlockMainScroll();return;}
  var released=false;
  function release(e){
    if(released||(e&&(e.target!==caseView||e.propertyName!=='transform'))){return;}
    released=true;caseView.removeEventListener('transitionend',release);
    if(caseScrollLock.releaseTimer){window.clearTimeout(caseScrollLock.releaseTimer);caseScrollLock.releaseTimer=null;}
    unlockMainScroll();
  }
  caseView.addEventListener('transitionend',release);
  caseScrollLock.releaseTimer=window.setTimeout(release,320);
}
function cvBuildChips(sec){
  cvChips.innerHTML='';
  if(sec.hasAttribute('data-no-chips')){cvChips.hidden=true;return;}
  cvChips.hidden=false;
  sec.querySelectorAll('h2').forEach(function(h){
    var a=document.createElement('a');a.href='#';a.textContent=h.textContent;
    a.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();
      var y=h.getBoundingClientRect().top-caseView.getBoundingClientRect().top+caseView.scrollTop-84;
      caseView.scrollTo({top:y,behavior:noMotion?'auto':'smooth'});});
    cvChips.appendChild(a);
  });
}
function openCase(id,trigger){
  if(trigger)cvTrigger=trigger;
  var sec=document.getElementById(id);if(!sec)return;
  cvCurrent=id;
  document.querySelectorAll('.cv-case').forEach(function(c){c.hidden=(c.id!==id);});
  cvBuildChips(sec);
  caseView.classList.add('open');caseView.setAttribute('aria-hidden','false');caseView.removeAttribute('inert');
  document.body.classList.add('case-open');
  document.body.classList.remove('case-chrome-away');
  if(window.cvChromeReset)window.cvChromeReset();
  if(window.matchMedia('(max-width: 599px)').matches)syncLanguageIndicators(true);
  var page=document.querySelector('.layout');if(page)page.inert=true;
  var caseTitle=sec.querySelector('.cv-title');
  if(caseTitle){caseTitle.setAttribute('tabindex','-1');caseView.setAttribute('aria-label',caseTitle.textContent.trim());}
  if(needsCompactScrollIsolation())lockMainScroll();else document.body.style.overflow='hidden';
  var stb=document.getElementById('scrollTopbar');if(stb)stb.classList.remove('is-visible');
  var hp=document.getElementById('hover-preview');if(hp)hp.classList.remove('on');
  caseView.scrollTop=0;
  if(window.cvSk1Open)window.cvSk1Open();
  window.setTimeout(function(){ if(caseTitle)caseTitle.focus({preventScroll:true}); },0);
  if(location.hash!=='#'+id){history.pushState({cv:id},'','#'+id);}
}
function closeCase(){
  if(!cvCurrent)return;
  cvCurrent=null;
  caseView.classList.remove('open');caseView.setAttribute('aria-hidden','true');caseView.setAttribute('inert','');
  document.body.classList.remove('case-open','case-chrome-away');
  syncLanguageIndicators(true);
  var page=document.querySelector('.layout');if(page)page.inert=false;
  if(caseScrollLock.active)releaseMainScrollAfterClose();else document.body.style.overflow='';
  history.pushState(null,'','#work');
  if(window.cvSk1Close)window.cvSk1Close();
  if(cvTrigger){
    var trigger=cvTrigger;cvTrigger=null;
    window.setTimeout(function(){trigger.focus({preventScroll:true});},0);
  }
}
document.querySelectorAll('.idx-row').forEach(function(row){
  var id='cv-'+row.id.replace('proj-','');
  var action=row.querySelector('.view-link');
  function openFromPointer(){
    var compactInput=window.matchMedia('(max-width: 1079px) and (hover: none), (max-width: 1079px) and (pointer: coarse)').matches;
    if(!compactInput||noMotion){openCase(id,action);return;}
    if(row.dataset.opening==='true')return;
    row.dataset.opening='true';row.classList.add('is-opening');
    window.setTimeout(function(){
      row.classList.remove('is-opening');row.dataset.opening='';openCase(id,action);
    },48);
  }
  if(action){
    action.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openFromPointer();});
  }
  /* The whole project row remains a pointer affordance, as in the prior portfolio
     interaction model. The visible CTA stays the keyboard-accessible action and
     receives focus again when the dialog closes; the row click simply restores
     the expected direct-entry behavior for pointer users. */
  row.addEventListener('click',function(e){
    if(e.target.closest('.view-link'))return;
    openFromPointer();
  });
});
document.getElementById('cvBack').addEventListener('click',function(){closeCase();});
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'&&cvCurrent){closeCase();return;}
  if(e.key!=='Tab'||!cvCurrent)return;
  var extra=document.querySelectorAll('#siteLang button');
  var focusable=Array.prototype.slice.call(caseView.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')).concat(Array.prototype.slice.call(extra)).filter(function(el){return !el.closest('[hidden]');});
  if(!focusable.length){e.preventDefault();return;}
  var first=focusable[0],last=focusable[focusable.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
});
document.querySelectorAll('.cv-next').forEach(function(n){
  n.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openCase(n.getAttribute('data-next'));});
});
(function(){
  var lastY=0,up=0,down=0;
  window.cvChromeReset=function(){lastY=0;up=0;down=0;};
  caseView.addEventListener('scroll',function(){
    if(!cvCurrent)return;
    var y=caseView.scrollTop,delta=y-lastY;
    if(y<12){document.body.classList.remove('case-chrome-away');up=0;down=0;}
    else if(delta>1){down+=delta;up=0;if(down>14)document.body.classList.add('case-chrome-away');}
    else if(delta<-1){up+=Math.abs(delta);down=0;if(up>22)document.body.classList.remove('case-chrome-away');}
    lastY=y;
  },{passive:true});
})();
/* Only cancel a touch when the detail scroller has reached an edge; normal
   internal scrolling remains native. This is the iOS fallback for scroll chaining. */
var caseTouchY=null;
caseView.addEventListener('touchstart',function(e){
  if(e.touches.length===1)caseTouchY=e.touches[0].clientY;
},{passive:true});
caseView.addEventListener('touchmove',function(e){
  if(!needsCompactScrollIsolation()||!cvCurrent||caseTouchY===null||e.touches.length!==1)return;
  var y=e.touches[0].clientY,delta=y-caseTouchY;
  var atTop=caseView.scrollTop<=0;
  var atBottom=caseView.scrollTop+caseView.clientHeight>=caseView.scrollHeight-1;
  if((atTop&&delta>0)||(atBottom&&delta<0))e.preventDefault();
  caseTouchY=y;
},{passive:false});
caseView.addEventListener('touchend',function(){caseTouchY=null;},{passive:true});
caseView.addEventListener('touchcancel',function(){caseTouchY=null;},{passive:true});
window.addEventListener('popstate',function(){
  var t=document.getElementById(location.hash.slice(1));
  if(t&&t.classList.contains('cv-case')){openCase(t.id);}else{closeCase();}
});
if(location.hash.length>1){var t0=document.getElementById(location.hash.slice(1));if(t0&&t0.classList.contains('cv-case')){openCase(t0.id);}}
document.querySelectorAll('.sb-lang button, .scroll-topbar__lang button').forEach(function(b){
  b.addEventListener('click',function(){setTimeout(function(){if(cvCurrent){cvBuildChips(document.getElementById(cvCurrent));}},40);});
});

/* ---- scroll-return topbar: downward reading hides it, upward intent reveals it ---- */
(function(){
  var bar=document.getElementById('scrollTopbar');
  if(!bar)return;
  var lastY=window.scrollY,upDistance=0,downDistance=0,ticking=false;
  function update(){
    var y=Math.max(0,window.scrollY); var delta=y-lastY;
    if(y<160){bar.classList.remove('is-visible');upDistance=0;downDistance=0;}
    else if(delta<-1){upDistance+=Math.abs(delta);downDistance=0;if(upDistance>22)bar.classList.add('is-visible');}
    else if(delta>1){downDistance+=delta;upDistance=0;if(downDistance>14)bar.classList.remove('is-visible');}
    lastY=y;ticking=false;
  }
  window.addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(update);ticking=true;}},{passive:true});
  /* Mirror the sidebar scrollspy's .active state onto the topbar links */
  var staticLinks=document.querySelectorAll('.sb-nav > a[href^="#"]');
  var barLinks=document.querySelectorAll('.scroll-topbar__nav a[href^="#"]');
  function syncCurrent(){barLinks.forEach(function(link){
    var side=document.querySelector('.sb-nav > a[href="'+link.getAttribute('href')+'"]');
    if(side&&side.classList.contains('active'))link.setAttribute('aria-current','location');
    else link.removeAttribute('aria-current');
  });}
  staticLinks.forEach(function(link){new MutationObserver(syncCurrent).observe(link,{attributes:true,attributeFilter:['class']});});
  syncCurrent();
})();
/* Keep the skip link visually absent in ordinary browsing, while preserving a
   reliable keyboard-only entry point into main content across mobile browsers. */
(function(){
  var skip=document.querySelector('.skip-link');
  if(!skip)return;
  skip.addEventListener('focus',function(){skip.classList.add('is-focused');});
  skip.addEventListener('blur',function(){skip.classList.remove('is-focused');});
})();

/* ---- case read-position scrubber ---- */
(function(){
  var sk1=document.getElementById('cvSk1');
  var card=document.getElementById('cvSk1Card');
  var bar=document.getElementById('cvSk1Bar');
  var ticks=document.getElementById('cvSk1Ticks');
  var idEl=document.getElementById('cvSk1Id');
  var valEl=document.getElementById('cvSk1Val');
  var commentEl=document.getElementById('cvSk1Comment');
  if(!sk1||!card||!bar||!ticks||!idEl||!valEl||!commentEl)return;

  var COPY={
    csH1:{id:'context',val:'"Background"'},
    csH2:{id:'problem',val:'find.pain()'},
    csH3:{id:'research',val:'observe()'},
    csH4:{id:'explore',val:'discard()'},
    csH5:{id:'design',val:'ship()'},
    csH6:{id:'impact',val:'measure()'},
    csH7:{id:'note',val:'reflect()'}
  };
  var hover=false,drag=false,focus=false,pointerX=0;

  for(var i=0;i<40;i++){
    var t=document.createElement('span');
    t.className='sk1-tick'+(i%5===0?' is-major':'');
    ticks.appendChild(t);
  }

  function maxScroll(){
    return Math.max(0,caseView.scrollHeight-caseView.clientHeight);
  }
  function progress(){
    var m=maxScroll();
    return m?Math.max(0,Math.min(1,caseView.scrollTop/m)):0;
  }
  function pointerP(e){
    var r=bar.getBoundingClientRect();
    if(!r.width)return 0;
    return Math.max(0,Math.min(1,(e.clientX-r.left)/r.width));
  }
  function currentCase(){
    return document.getElementById(cvCurrent);
  }
  function heads(){
    var sec=currentCase();
    return sec?sec.querySelectorAll('.cv-blk h2'):[];
  }
  function sectionAtScroll(scrollTop){
    var list=heads(),cur=null,i,h,y;
    var origin=caseView.getBoundingClientRect().top;
    var trigger=scrollTop+caseView.clientHeight*0.34;
    for(i=0;i<list.length;i++){
      h=list[i];
      y=h.getBoundingClientRect().top-origin+caseView.scrollTop;
      if(y<=trigger)cur=h;
    }
    return cur;
  }
  function fillCard(h2){
    var key=h2&&h2.getAttribute('data-i18n');
    var copy=(key&&COPY[key])||{id:'section',val:'"Now"'};
    idEl.textContent=copy.id;
    valEl.textContent=copy.val;
    commentEl.textContent=h2?('// '+(h2.textContent||'')):'';
  }
  function cardOn(){
    var on=hover||drag||focus;
    card.classList.toggle('is-on',on);
    card.setAttribute('aria-hidden',on?'false':'true');
  }
  function paint(fromPointer){
    var p=progress();
    sk1.style.setProperty('--p',String(p));
    bar.setAttribute('aria-valuenow',String(Math.round(p*100)));
    var m=maxScroll();
    var scroll=fromPointer?pointerX*m:caseView.scrollTop;
    fillCard(sectionAtScroll(scroll));
    cardOn();
  }
  function setP(p){
    var m=maxScroll();
    caseView.scrollTop=Math.max(0,Math.min(1,p))*m;
  }

  function onEnter(e){
    hover=true;sk1.classList.add('is-hover');
    pointerX=pointerP(e);
    sk1.style.setProperty('--h',String(pointerX));
    if(!drag)paint(true);
    else cardOn();
  }
  function onMove(e){
    pointerX=pointerP(e);
    sk1.style.setProperty('--h',String(pointerX));
    if(drag){setP(pointerX);paint(false);}
    else if(hover)paint(true);
  }
  function onDown(e){
    if(e.button!=null&&e.button!==0)return;
    drag=true;sk1.classList.add('is-drag');
    bar.classList.add('is-drag');
    if(bar.setPointerCapture&&e.pointerId!=null)bar.setPointerCapture(e.pointerId);
    pointerX=pointerP(e);
    sk1.style.setProperty('--h',String(pointerX));
    setP(pointerX);paint(false);
    e.preventDefault();
  }
  function onUp(e){
    if(!drag)return;
    drag=false;sk1.classList.remove('is-drag');
    bar.classList.remove('is-drag');
    if(bar.releasePointerCapture&&e.pointerId!=null){
      try{bar.releasePointerCapture(e.pointerId);}catch(err){}
    }
    var over=e.target&&(e.target===bar||bar.contains(e.target));
    if(!over){hover=false;sk1.classList.remove('is-hover');}
    paint(hover&&!drag);
  }
  function onLeave(){
    if(drag)return;
    hover=false;sk1.classList.remove('is-hover');
    cardOn();
  }

  bar.addEventListener('pointerenter',onEnter);
  bar.addEventListener('pointermove',onMove);
  bar.addEventListener('pointerdown',onDown);
  bar.addEventListener('pointerup',onUp);
  bar.addEventListener('pointercancel',onUp);
  bar.addEventListener('pointerleave',onLeave);
  bar.addEventListener('focus',function(){focus=true;paint(false);});
  bar.addEventListener('blur',function(){focus=false;cardOn();});
  bar.addEventListener('keydown',function(e){
    var p=progress(),next=p;
    if(e.key==='ArrowLeft'||e.key==='ArrowDown')next=p-0.04;
    else if(e.key==='ArrowRight'||e.key==='ArrowUp')next=p+0.04;
    else if(e.key==='Home')next=0;
    else if(e.key==='End')next=1;
    else return;
    e.preventDefault();
    setP(next);paint(false);
  });
  caseView.addEventListener('scroll',function(){if(!sk1.hidden)paint(hover&&!drag);},{passive:true});

  window.cvSk1Open=function(){
    sk1.hidden=false;
    hover=false;drag=false;focus=false;
    sk1.classList.remove('is-hover','is-drag');
    sk1.style.setProperty('--h','0');
    paint(false);
  };
  window.cvSk1Close=function(){
    hover=false;drag=false;focus=false;
    sk1.classList.remove('is-hover','is-drag');
    card.classList.remove('is-on');
    sk1.hidden=true;
  };
  if(cvCurrent)window.cvSk1Open();
})();
