/* Shared read-position scrubber. Any page that loads page.js gets this.
   One handle. Pointer x and thumb x use the same inset math so the
   thumb center sits on the cursor. No hover ghost. */
(function(){
  var MARKUP='<div class="sk1-card" id="cvSk1Card" aria-hidden="true"><p class="sk1-title" id="cvSk1Title"></p></div><div class="sk1-bar" id="cvSk1Bar" role="slider" aria-label="Read position" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><div class="sk1-ticks" id="cvSk1Ticks"></div><div class="sk1-handle" aria-hidden="true"></div></div>';

  function boot(){
    var sk1=ensure();
    if(!sk1||sk1.dataset.bound==='1')return;
    sk1.dataset.bound='1';

    var card=document.getElementById('cvSk1Card');
    var bar=document.getElementById('cvSk1Bar');
    var ticks=document.getElementById('cvSk1Ticks');
    var titleEl=document.getElementById('cvSk1Title');
    var handle=sk1.querySelector('.sk1-handle');
    if(!card||!bar||!ticks||!titleEl||!handle)return;

    var ghost=sk1.querySelector('.sk1-ghost');
    if(ghost)ghost.remove();

    if(!ticks.childElementCount){
      for(var i=0;i<40;i++){
        var t=document.createElement('span');
        t.className='sk1-tick'+(i%5===0?' is-major':'');
        ticks.appendChild(t);
      }
    }

    var hover=false,drag=false,focus=false,pointerX=0;
    var boundRoot=null;

    function caseView(){return document.getElementById('caseView');}
    function isCaseReading(){
      var cv=caseView();
      return !!(document.documentElement.classList.contains('page-case')||(cv&&cv.classList.contains('open')));
    }
    function scroller(){
      if(isCaseReading())return caseView();
      if(document.documentElement.classList.contains('page-work'))return null;
      return document.scrollingElement||document.documentElement;
    }
    function isDoc(root){
      return root===document.scrollingElement||root===document.documentElement||root===document.body;
    }
    function viewH(root){return isDoc(root)?window.innerHeight:root.clientHeight;}
    function topOf(root){return isDoc(root)?(window.scrollY||root.scrollTop):root.scrollTop;}
    function setTop(root,y){
      if(isDoc(root))window.scrollTo(0,y);
      else root.scrollTop=y;
    }
    function maxScroll(){
      var root=scroller();if(!root)return 0;
      if(isDoc(root))return Math.max(0,root.scrollHeight-window.innerHeight);
      return Math.max(0,root.scrollHeight-root.clientHeight);
    }
    function progress(){
      var m=maxScroll();
      return m?Math.max(0,Math.min(1,topOf(scroller())/m)):0;
    }
    function metrics(){
      var r=bar.getBoundingClientRect();
      var cs=getComputedStyle(bar);
      var padL=parseFloat(cs.paddingLeft)||0;
      var padR=parseFloat(cs.paddingRight)||0;
      var thumb=handle.offsetWidth||6;
      var inner=bar.clientWidth;
      var travel=Math.max(1,inner-padL-padR-thumb);
      return {r:r,padL:padL,thumb:thumb,travel:travel};
    }
    function pointerP(e){
      var m=metrics();
      var x=e.clientX-m.r.left-bar.clientLeft;
      var min=m.padL+m.thumb/2;
      var max=m.padL+m.travel+m.thumb/2;
      return Math.max(0,Math.min(1,(x-min)/Math.max(1,max-min)));
    }
    function place(p){
      var m=metrics();
      handle.style.left=(m.padL+p*m.travel)+'px';
    }
    function labelScope(){
      if(isCaseReading()){
        var id=window.cvCurrent;
        var sec=(id&&document.getElementById(id))||document.querySelector('.cv-case:not([hidden])');
        return sec||caseView();
      }
      return document.querySelector('.layout')||document.body;
    }
    function labelOf(h){
      if(!h)return '';
      var custom=h.getAttribute('data-sk1');
      if(custom&&custom.trim())return custom.trim();
      return (h.textContent||'').replace(/\s+/g,' ').trim();
    }
    function sections(){
      var root=scroller();var scope=labelScope();
      if(!root||!scope)return [];
      var origin=isDoc(root)?0:root.getBoundingClientRect().top;
      var nodes=scope.querySelectorAll('.cv-blk h2, [data-sk1]');
      if(!nodes.length)nodes=scope.querySelectorAll('h2');
      var out=[],i,h,y;
      for(i=0;i<nodes.length;i++){
        h=nodes[i];
        if(!h.getClientRects().length)continue;
        y=h.getBoundingClientRect().top-origin+topOf(root);
        out.push({el:h,y:y,label:labelOf(h)});
      }
      return out;
    }
    function sectionAt(scrollTop){
      var root=scroller();if(!root)return null;
      var list=sections(),cur=null,i;
      var trigger=scrollTop+viewH(root)*0.34;
      for(i=0;i<list.length;i++)if(list[i].y<=trigger)cur=list[i];
      return cur||list[0]||null;
    }
    function fillCard(item){
      titleEl.textContent=item&&item.label?item.label:'';
    }
    function cardOn(){
      var on=hover||drag||focus;
      card.classList.toggle('is-on',on);
      card.setAttribute('aria-hidden',on?'false':'true');
    }
    function paint(){
      var root=scroller();
      if(!root){sk1.hidden=true;return;}
      var p=drag||hover?pointerX:progress();
      if(!(drag||hover))pointerX=p;
      place(p);
      bar.setAttribute('aria-valuenow',String(Math.round(progress()*100)));
      var m=maxScroll();
      var scroll=(drag||hover)?pointerX*m:topOf(root);
      fillCard(sectionAt(scroll));
      cardOn();
    }
    function setP(p){
      var root=scroller();if(!root)return;
      setTop(root,Math.max(0,Math.min(1,p))*maxScroll());
    }

    function onEnter(e){
      hover=true;sk1.classList.add('is-hover');
      pointerX=pointerP(e);
      paint();
    }
    function onMove(e){
      pointerX=pointerP(e);
      if(drag){setP(pointerX);place(pointerX);fillCard(sectionAt(pointerX*maxScroll()));cardOn();}
      else if(hover)paint();
    }
    function onDown(e){
      if(e.button!=null&&e.button!==0)return;
      drag=true;sk1.classList.add('is-drag');
      if(bar.setPointerCapture&&e.pointerId!=null)bar.setPointerCapture(e.pointerId);
      pointerX=pointerP(e);
      setP(pointerX);
      place(pointerX);
      fillCard(sectionAt(pointerX*maxScroll()));
      cardOn();
      e.preventDefault();
    }
    function onUp(e){
      if(!drag)return;
      drag=false;sk1.classList.remove('is-drag');
      if(bar.releasePointerCapture&&e.pointerId!=null){
        try{bar.releasePointerCapture(e.pointerId);}catch(err){}
      }
      var over=e.target&&(e.target===bar||bar.contains(e.target));
      if(!over){hover=false;sk1.classList.remove('is-hover');}
      paint();
    }
    function onLeave(){
      if(drag)return;
      hover=false;sk1.classList.remove('is-hover');
      paint();
    }

    bar.addEventListener('pointerenter',onEnter);
    bar.addEventListener('pointermove',onMove);
    bar.addEventListener('pointerdown',onDown);
    bar.addEventListener('pointerup',onUp);
    bar.addEventListener('pointercancel',onUp);
    bar.addEventListener('pointerleave',onLeave);
    bar.addEventListener('focus',function(){focus=true;paint();});
    bar.addEventListener('blur',function(){focus=false;cardOn();});
    bar.addEventListener('keydown',function(e){
      var p=progress(),next=p;
      if(e.key==='ArrowLeft'||e.key==='ArrowDown')next=p-0.04;
      else if(e.key==='ArrowRight'||e.key==='ArrowUp')next=p+0.04;
      else if(e.key==='Home')next=0;
      else if(e.key==='End')next=1;
      else return;
      e.preventDefault();
      setP(next);paint();
    });

    function onScroll(){if(!sk1.hidden&&!drag)paint();}
    function bindRoot(){
      if(boundRoot){
        boundRoot.removeEventListener('scroll',onScroll);
        if(isDoc(boundRoot))window.removeEventListener('scroll',onScroll);
      }
      boundRoot=scroller();
      if(!boundRoot)return;
      if(isDoc(boundRoot))window.addEventListener('scroll',onScroll,{passive:true});
      else boundRoot.addEventListener('scroll',onScroll,{passive:true});
    }
    bindRoot();
    window.addEventListener('resize',function(){if(!sk1.hidden)paint();});

    function show(){
      bindRoot();
      if(!scroller()){sk1.hidden=true;return;}
      sk1.hidden=false;
      hover=false;drag=false;focus=false;
      sk1.classList.remove('is-hover','is-drag');
      paint();
    }
    function hide(){
      hover=false;drag=false;focus=false;
      sk1.classList.remove('is-hover','is-drag');
      card.classList.remove('is-on');
      if(document.documentElement.classList.contains('page-case'))return;
      sk1.hidden=true;
    }

    window.cvSk1Paint=function(){if(!sk1.hidden)paint();};
    window.cvSk1Open=function(){show();};
    window.cvSk1Close=function(){hide();bindRoot();if(scroller()&&!document.documentElement.classList.contains('page-work'))show();};

    if(isCaseReading())show();
    else if(scroller())show();
  }

  function ensure(){
    var sk1=document.getElementById('cvSk1');
    if(sk1)return sk1;
    sk1=document.createElement('div');
    sk1.className='sk1';
    sk1.id='cvSk1';
    sk1.hidden=true;
    sk1.innerHTML=MARKUP;
    document.body.appendChild(sk1);
    return sk1;
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
