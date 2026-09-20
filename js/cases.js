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
var isCasePage=document.documentElement.classList.contains('page-case');
/* Same case chrome on index, All work, and standalone pages.
   Clip mask lives in the current document; overlay fetch only copies the section. */
function ensureCaseChrome(){
  if(!document.getElementById('jrFigMask')){
    var NS='http://www.w3.org/2000/svg';
    var svg=document.createElementNS(NS,'svg');
    svg.setAttribute('class','a2-noise-defs');
    svg.setAttribute('aria-hidden','true');
    svg.setAttribute('focusable','false');
    svg.setAttribute('width','0');
    svg.setAttribute('height','0');
    var defs=document.createElementNS(NS,'defs');
    var clip=document.createElementNS(NS,'clipPath');
    clip.setAttribute('id','jrFigMask');
    clip.setAttribute('clipPathUnits','objectBoundingBox');
    var path=document.createElementNS(NS,'path');
    path.setAttribute('transform','scale(0.0005139987561, 0.0008543065594)');
    path.setAttribute('d','M457.525 1.148c-20.789-3.198-193.979 1.16-283.854 2.496 11.104-.178 1.297-2.868-81.146-2.496-103.5.468-86 102.499-86 109.999s-7 524.5-6.5 547.5 10 59 6.5 99c-2.8 32-1.167 234.667 0 332.003.5 75 62.5 66.5 67 68.5s38.5 0 81.5 0 436 6 526 10.5 438.995-.5 505.495 0 330.01-12.5 417.51-12.5 230.99 2 270.99 0 40.5-16 51-31.5 12.5-61 12.5-105.5c0-44.503 7.01-274.504 7.01-348.004s-3.51-159.998-7.01-230.998 0-256.002 0-318.002 7.01-92.998-22.5-110.999c-18.79-11.471-81.99-9.999-133.49-9.999H853.525c-29 0-370 4-396 0Z');
    clip.appendChild(path);defs.appendChild(clip);svg.appendChild(defs);
    document.body.insertBefore(svg,document.body.firstChild);
  }
  if(caseView&&!document.getElementById('cvSk1')){
    var sk=document.createElement('div');
    sk.className='sk1';sk.id='cvSk1';sk.hidden=true;
    sk.innerHTML='<div class="sk1-card" id="cvSk1Card" aria-hidden="true"><p class="sk1-title" id="cvSk1Title"></p></div><div class="sk1-bar" id="cvSk1Bar" role="slider" aria-label="Read position" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><div class="sk1-ticks" id="cvSk1Ticks"></div><div class="sk1-ghost" aria-hidden="true"></div><div class="sk1-handle" aria-hidden="true"></div></div>';
    caseView.appendChild(sk);
  }
  var card=document.getElementById('cvSk1Card');
  if(card&&!document.getElementById('cvSk1Title')){
    card.innerHTML='<p class="sk1-title" id="cvSk1Title"></p>';
  }
}
ensureCaseChrome();
/* Canonical permalinks. 01–03 bodies are the main selected cases; All work
   and index both use these files. In-app clicks overlay; refresh is the page. */
var CASE_PAGES={biennale:'biennale.html',loop:'loop.html',off:'off.html',archive:'archive.html',signal:'signal.html',quiet:'quiet.html',frame:'frame.html',route:'route.html',hold:'hold.html',field:'field.html'};
var caseFetch={};
function caseSlug(id){return String(id||'').replace(/^cv-/,'');}
function caseFile(id){return CASE_PAGES[caseSlug(id)]||'';}
function caseIdFromHref(href){
  var url;try{url=new URL(href,location.href);}catch(err){return '';}
  var file=url.pathname.split('/').pop();
  for(var id in CASE_PAGES)if(CASE_PAGES[id]===file)return id;
  if(url.hash.indexOf('#cv-')===0)return url.hash.slice(4);
  return '';
}
function listUrl(){return document.documentElement.classList.contains('page-work')?'work.html':'index.html#work';}
function applyCaseI18n(){if(typeof setLang==='function')setLang(document.documentElement.lang||'en',true);}
function bindCaseNext(root){
  if(isCasePage)return;
  (root||document).querySelectorAll('.cv-next').forEach(function(n){
    if(n.dataset.bound==='1')return;n.dataset.bound='1';
    n.addEventListener('click',function(e){
      var next=n.getAttribute('data-next');
      if(!next)return;
      e.preventDefault();e.stopPropagation();
      jrOpenCase(next);
    });
  });
}
function randomRotateY(){return Math.floor(Math.random()*21)-10;}
function bindAnimatedTestimonials(root){
  (root||document).querySelectorAll('.cv-at').forEach(function(el){
    if(el.dataset.bound==='1')return;el.dataset.bound='1';
    var cards=[].slice.call(el.querySelectorAll('.cv-at-card'));
    var prevBtn=el.querySelector('.cv-at-prev');
    var nextBtn=el.querySelector('.cv-at-next');
    if(!cards.length)return;
    var active=0;
    function paint(n,animate){
      active=((n%cards.length)+cards.length)%cards.length;
      cards.forEach(function(card,idx){
        var on=idx===active;
        card.classList.toggle('is-on',on);
        card.style.zIndex=on?'40':String(cards.length+2-idx);
        card.classList.remove('is-pop');
        if(on){
          card.style.transform='scale(1) rotate(0deg)';
          if(animate!==false&&!noMotion){void card.offsetWidth;card.classList.add('is-pop');}
        }else{
          card.style.transform='scale(0.95) rotate('+randomRotateY()+'deg)';
        }
      });
    }
    if(prevBtn)prevBtn.addEventListener('click',function(){paint(active-1);});
    if(nextBtn)nextBtn.addEventListener('click',function(){paint(active+1);});
    paint(0,false);
  });
}
function setCaseMedia(){}
function ensureCase(id){
  var cv='cv-'+caseSlug(id);
  if(document.getElementById(cv))return Promise.resolve(true);
  var file=caseFile(cv);if(!file||!caseView)return Promise.resolve(false);
  if(!caseFetch[file])caseFetch[file]=fetch(file,{credentials:'same-origin'}).then(function(r){if(!r.ok)throw new Error('case');return r.text();});
  return caseFetch[file].then(function(html){
    if(document.getElementById(cv))return true;
    var doc=new DOMParser().parseFromString(html,'text/html');
    var sec=doc.getElementById(cv)||doc.querySelector('.cv-case');
    if(!sec)return false;
    var wrap=caseView.querySelector('.cv-wrap');if(!wrap)return false;
    wrap.appendChild(document.importNode(sec,true));
    var live=document.getElementById(cv);if(live)live.hidden=true;
    applyCaseI18n();bindCaseNext(wrap);bindAnimatedTestimonials(wrap);return true;
  }).catch(function(){return false;});
}
function prefetchCase(id){var file=caseFile(id);if(!file||document.getElementById('cv-'+caseSlug(id)))return;if(!caseFetch[file])caseFetch[file]=fetch(file,{credentials:'same-origin'}).then(function(r){if(!r.ok)throw new Error('case');return r.text();});}
function jrOpenCase(id,trigger){
  var cv='cv-'+caseSlug(id);
  return ensureCase(cv).then(function(ok){
    if(ok){openCase(cv,trigger);return true;}
    var file=caseFile(cv);if(file)location.href=file;return false;
  });
}
window.jrOpenCase=jrOpenCase;window.jrPrefetchCase=prefetchCase;window.jrIsCaseHref=function(href){return !!caseIdFromHref(href);};
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
  if(!caseView)return;
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
  if(window.jrFreezePointer)window.jrFreezePointer();
  if(window.cvSk1Open)window.cvSk1Open();
  setCaseMedia(true);
  window.setTimeout(function(){ if(caseTitle)caseTitle.focus({preventScroll:true}); },0);
  if(isCasePage)return;
  var file=caseFile(id);
  if(file){if(location.pathname.split('/').pop()!==file)history.pushState({cv:id},'',file);}
  else if(location.hash!=='#'+id)history.pushState({cv:id},'','#'+id);
}
function closeCase(fromPop){
  if(isCasePage){
    if(!fromPop)location.href='work.html';
    return;
  }
  if(!cvCurrent)return;
  var file=caseFile(cvCurrent);
  cvCurrent=null;
  caseView.classList.remove('open');caseView.setAttribute('aria-hidden','true');caseView.setAttribute('inert','');
  document.body.classList.remove('case-open','case-chrome-away');
  syncLanguageIndicators(true);
  var page=document.querySelector('.layout');if(page)page.inert=false;
  if(caseScrollLock.active)releaseMainScrollAfterClose();else document.body.style.overflow='';
  if(!isCasePage&&!fromPop)history.pushState(null,'',listUrl());
  if(window.jrFreezePointer)window.jrFreezePointer();
  if(window.cvSk1Close)window.cvSk1Close();
  setCaseMedia(false);
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
var cvBack=document.getElementById('cvBack');
if(cvBack&&cvBack.tagName==='BUTTON')cvBack.addEventListener('click',function(){closeCase();});
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
bindCaseNext(document);bindAnimatedTestimonials(document);
document.addEventListener('click',function(e){
  if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
  if(isCasePage)return;
  var a=e.target.closest('a[href]');if(!a||a.target==='_blank')return;
  var id=caseIdFromHref(a.href);if(!id)return;
  e.preventDefault();e.stopPropagation();
  jrOpenCase(id,a);
},true);
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
  if(isCasePage)return;
  var id=caseIdFromHref(location.href);
  if(id)jrOpenCase(id);else closeCase(true);
});
if(isCasePage){
  var live=document.querySelector('.cv-case');
  if(live)openCase(live.id);
}else if(location.hash.length>1||caseIdFromHref(location.href)){
  var bootId=caseIdFromHref(location.href)||(location.hash.indexOf('#cv-')===0?location.hash.slice(4):'');
  if(bootId)jrOpenCase(bootId);
}
document.querySelectorAll('.sb-lang button, .scroll-topbar__lang button').forEach(function(b){
  b.addEventListener('click',function(){setTimeout(function(){
    if(cvCurrent)cvBuildChips(document.getElementById(cvCurrent));
    if(window.cvSk1Paint)window.cvSk1Paint();
  },40);});
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

/* Scrubber lives in js/scrubber.js — loaded from page.js on every page. */
