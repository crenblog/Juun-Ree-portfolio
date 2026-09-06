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
var cvProg=document.getElementById('cvProg');
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
  setLang(document.documentElement.lang||'en');
  cvCurrent=id;
  document.querySelectorAll('.cv-case').forEach(function(c){c.hidden=(c.id!==id);});
  cvBuildChips(sec);
  caseView.classList.add('open');caseView.setAttribute('aria-hidden','false');caseView.removeAttribute('inert');
  document.body.classList.add('case-open');
  syncLanguageIndicators(true);
  var page=document.querySelector('.layout');if(page)page.inert=true;
  var caseTitle=sec.querySelector('.cv-title');
  if(caseTitle){caseTitle.setAttribute('tabindex','-1');caseView.setAttribute('aria-label',caseTitle.textContent.trim());}
  if(needsCompactScrollIsolation())lockMainScroll();else document.body.style.overflow='hidden';
  var stb=document.getElementById('scrollTopbar');if(stb)stb.classList.remove('is-visible');
  var hp=document.getElementById('hover-preview');if(hp)hp.classList.remove('on');
  caseView.scrollTop=0;cvProg.style.width='0%';
  window.setTimeout(function(){ if(caseTitle)caseTitle.focus({preventScroll:true}); },0);
  if(location.hash!=='#'+id){history.pushState({cv:id},'','#'+id);}
}
function closeCase(){
  if(!cvCurrent)return;
  cvCurrent=null;
  caseView.classList.remove('open');caseView.setAttribute('aria-hidden','true');caseView.setAttribute('inert','');
  document.body.classList.remove('case-open');
  var page=document.querySelector('.layout');if(page)page.inert=false;
  if(caseScrollLock.active)releaseMainScrollAfterClose();else document.body.style.overflow='';
  history.pushState(null,'','#work');
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
  var extra=window.matchMedia('(min-width: 600px)').matches
    ? document.querySelectorAll('#siteLang button')
    : document.querySelectorAll('.case-lang button');
  var focusable=Array.prototype.slice.call(caseView.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])')).concat(Array.prototype.slice.call(extra)).filter(function(el){return !el.closest('[hidden]');});
  if(!focusable.length){e.preventDefault();return;}
  var first=focusable[0],last=focusable[focusable.length-1];
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
});
document.querySelectorAll('.cv-next').forEach(function(n){
  n.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openCase(n.getAttribute('data-next'));});
});
caseView.addEventListener('scroll',function(){
  var h=caseView.scrollHeight-caseView.clientHeight;
  cvProg.style.width=(h>0?(caseView.scrollTop/h)*100:0)+'%';
});
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
