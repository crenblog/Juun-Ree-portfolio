    // Clock function
    function updateClock() {
      const now = new Date();
      const options = { timeZone: 'Asia/Tokyo', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
      document.getElementById('clock').textContent = new Intl.DateTimeFormat('en-US', options).format(now);
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Accordion Logic
    const workNav = document.getElementById('workNav');
    const workSub = document.getElementById('workSub');
    workNav.addEventListener('click', (e) => {
      e.preventDefault();
      /* Only layouts below the desktop sidebar breakpoint scroll; every desktop sidebar opens its project list. */
      if (window.innerWidth < 1080) {
        var workSec = document.getElementById('work');
        if (workSec) workSec.scrollIntoView({ behavior: window.noMotion ? 'auto' : 'smooth', block: 'start' });
        return;
      }
      const isOpen = workSub.classList.toggle('open');
      workNav.setAttribute('aria-expanded', isOpen);
    });

    // Image Hover Preview Logic — stabilized lane-follow
    // X축만 커서를 감쇠 추적(유동감)하고 Y축은 행마다 고정 슬롯(행 아래/위 여백)에 정박 →
    // 호버한 행의 텍스트를 절대 가리지 않으면서, 위치가 점프하지 않아 차분한 움직임 유지
    const hoverPreview = document.getElementById('hover-preview');
    const previewItems = hoverPreview.querySelectorAll('.pv');
    const rows = document.querySelectorAll('.idx-row');
    const idxList = document.querySelector('.idx-list');

    const PW = 320, PH = 240;  // 프리뷰 크기
    const PAD = 20;            // 뷰포트 가장자리 여백
    const GAP = 20;            // 텍스트 블록 하단과 프리뷰 사이 간격 (근접성 = 그룹핑)
    const DAMP = 8;            // 감쇠 속도 — 낮을수록 느긋하고 차분한 glide
    const pvNoMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pvCoarse = window.matchMedia('(hover: none), (pointer: coarse)').matches;

    let cur = { x: 0, y: 0, op: 0, sc: 0.96 };
    let tgt = { x: 0, y: 0 };
    let slotY = 0, prevT = 0, rafId = null;
    let currentRow = null;

    // 프리뷰의 수평 레인: 사이드바 오른쪽 ~ 뷰포트 오른쪽 끝 (사이드바 침범 방지)
    function lane() {
      const sb = document.querySelector('.sb');
      const minX = sb ? sb.getBoundingClientRect().right + PAD : PAD;
      return { minX, maxX: window.innerWidth - PW - PAD };
    }

    // 행마다 고정된 수직 슬롯: 행 테두리(패딩 64px 포함)가 아니라 텍스트 블록의 실제 하단을 기준으로 —
    // 근접성 원리로 프리뷰가 호버한 행의 일부처럼 묶여 보임. 공간이 없으면 위로.
    function computeSlot() {
      if (!currentRow) return;
      let contentTop = Infinity, contentBottom = -Infinity;
      currentRow.querySelectorAll('.r-body, .r-side').forEach(el => {
        const r = el.getBoundingClientRect();
        contentTop = Math.min(contentTop, r.top);
        contentBottom = Math.max(contentBottom, r.bottom);
      });
      const below = contentBottom + GAP;
      const above = contentTop - GAP - PH;
      const canBelow = below + PH <= window.innerHeight - PAD;
      const canAbove = above >= PAD;
      slotY = (canBelow || !canAbove)
        ? Math.min(below, window.innerHeight - PH - PAD)
        : Math.max(above, PAD);
    }

    function updateX(e) {
      const l = lane();
      tgt.x = Math.max(l.minX, Math.min(e.clientX - PW / 2, l.maxX));
      tgt.y = slotY;
    }

    function tick(now) {
      const dt = Math.min((now - prevT) / 1000, 0.05); prevT = now;
      const on = hoverPreview.classList.contains('on');
      const opT = on ? 1 : 0, scT = on ? 1 : 0.96;
      const a = pvNoMotion ? 1 : 1 - Math.exp(-DAMP * dt); // 프레임레이트 무관 지수 감쇠
      cur.x += (tgt.x - cur.x) * a;
      cur.y += (tgt.y - cur.y) * a;
      cur.op += (opT - cur.op) * a;
      cur.sc += (scT - cur.sc) * a;
      hoverPreview.style.left = cur.x.toFixed(1) + 'px';
      hoverPreview.style.top = cur.y.toFixed(1) + 'px';
      hoverPreview.style.opacity = cur.op.toFixed(3);
      hoverPreview.style.transform = 'scale(' + cur.sc.toFixed(4) + ')';
      const settled = Math.abs(opT - cur.op) < 0.01 && Math.abs(tgt.x - cur.x) < 0.5 && Math.abs(tgt.y - cur.y) < 0.5;
      if (!on && settled) { rafId = null; return; } // 숨김 완료 시 루프 종료 (idle 부하 없음)
      rafId = requestAnimationFrame(tick);
    }
    function startLoop() { if (rafId === null) { prevT = performance.now(); rafId = requestAnimationFrame(tick); } }

    rows.forEach(row => {
      row.addEventListener('pointerenter', (e) => {
        if (pvCoarse) return; // touch input: the preview stays off
        const index = row.getAttribute('data-prev');
        previewItems.forEach(item => item.classList.remove('on'));
        if (previewItems[index]) previewItems[index].classList.add('on');
        currentRow = row;
        computeSlot();
        updateX(e);
        // 첫 등장은 제자리에서 부드럽게 fade-in (행 사이를 이동 중일 때는 glide 유지)
        if (cur.op < 0.05) { cur.x = tgt.x; cur.y = tgt.y + 8; }
        hoverPreview.classList.add('on');
        if (idxList) idxList.classList.add('hovering');
        startLoop();
      });
      row.addEventListener('pointermove', updateX);
      row.addEventListener('pointerleave', () => {
        hoverPreview.classList.remove('on');
        if (idxList) idxList.classList.remove('hovering');
        currentRow = null;
        startLoop();
      });
    });
    // 스크롤로 행이 움직이면 슬롯 재계산
    window.addEventListener('scroll', () => { if (currentRow) { computeSlot(); tgt.y = slotY; } }, { passive: true });

    /* Adaptive scroll preview — contextual image direction for compact layouts.
       The image keeps full opacity while it moves and progressively shrinks into
       the title's upper safe band. Only the true final exit uses opacity, scale,
       and a short upward drift together. */
    (function(){
      var preview=document.getElementById('adaptive-preview');
      var work=document.getElementById('work');
      var adaptiveRows=Array.prototype.slice.call(document.querySelectorAll('.idx-row'));
      var topbar=document.getElementById('scrollTopbar');
      var list=document.querySelector('.idx-list');
      if(!preview||!work||!adaptiveRows.length)return;
      var enabledMQ=window.matchMedia('(min-width: 360px) and (max-width: 1079px)');
      var reduceMQ=window.matchMedia('(prefers-reduced-motion: reduce)');
      var art=preview.querySelectorAll('.pv');
      /* Reference-matched scatter: one compact canvas carries local image-content
         rectangles. This avoids generic dots and avoids a DOM node per fragment. */
      var fragmentCanvas=document.createElement('canvas');
      fragmentCanvas.className='adaptive-fragment-canvas';
      fragmentCanvas.setAttribute('aria-hidden','true');
      document.body.appendChild(fragmentCanvas);
      var fragmentCtx=fragmentCanvas.getContext('2d'),fragments=[],fragmentSource=null,fragmentDPR=1;
      function hideFragments(){
        if(!fragmentCanvas||!fragmentCtx)return;
        fragmentCanvas.style.display='none';
        fragmentCtx.clearRect(0,0,fragmentCanvas.width,fragmentCanvas.height);
        fragments=[];fragmentSource=null;
      }
      function paintFragmentSource(width,height,id){
        var source=document.createElement('canvas'),ctx=source.getContext('2d');
        source.width=width;source.height=height;
        var colors=id==='1'?['#7A5B15','#8A6A1F']:id==='2'?['#26333B','#0C3024']:['#0C3024','#154536'];
        var gradient=ctx.createLinearGradient(0,0,width,height);
        gradient.addColorStop(0,colors[0]);gradient.addColorStop(1,colors[1]);ctx.fillStyle=gradient;ctx.fillRect(0,0,width,height);
        ctx.globalAlpha=.18;ctx.fillStyle=id==='1'?'#F2E8D2':'#8CB3A1';ctx.beginPath();ctx.arc(width*.74,height*.28,Math.max(18,width*.26),0,Math.PI*2);ctx.fill();
        ctx.globalAlpha=.5;ctx.fillStyle='#fff';ctx.font='800 '+Math.max(14,Math.round(width*.075))+'px Inter, sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('PROJECT 0'+(Number(id)+1),width*.5,height*.5);
        ctx.globalAlpha=1;return source;
      }
      function captureFragments(direction){
        /* Scope lock: the reference scatter is compact Work preview only. */
        if(!enabled()||reduceMQ.matches||!fragmentCtx)return;
        var rect=preview.getBoundingClientRect(),width=Math.max(1,Math.round(rect.width)),height=Math.max(1,Math.round(rect.height));
        var active=preview.querySelector('.pv.on'),id=active?(active.className.match(/pv-(\d)/)||['','0'])[1]:'0';
        fragmentDPR=Math.min(2,window.devicePixelRatio||1);
        fragmentCanvas.width=Math.round(width*fragmentDPR);fragmentCanvas.height=Math.round(height*fragmentDPR);
        fragmentCtx.setTransform(fragmentDPR,0,0,fragmentDPR,0,0);
        fragmentCanvas.style.left=Math.round(rect.left)+'px';fragmentCanvas.style.top=Math.round(rect.top)+'px';
        fragmentCanvas.style.width=width+'px';fragmentCanvas.style.height=height+'px';fragmentCanvas.style.display='block';
        fragmentSource=paintFragmentSource(width,height,id);fragments=[];
        /* 9×7 field with deterministic skips produces image shards, not confetti. */
        for(var row=0;row<7;row++)for(var col=0;col<9;col++){
          var seed=(row*29+col*17+Number(id)*11)%31;if(seed%5===0)continue;
          var cellW=width/9,cellH=height/7;
          var fw=Math.max(4,Math.min(18,cellW*(.32+(seed%5)*.09)));
          var fh=Math.max(3,Math.min(15,cellH*(.28+(seed%4)*.10)));
          var sx=Math.min(width-fw,Math.max(0,col*cellW+(seed%7)*.9));
          var sy=Math.min(height-fh,Math.max(0,row*cellH+((seed*3)%6)*.8));
          fragments.push({sx:sx,sy:sy,sw:fw,sh:fh,dx:((seed%9)-4)*1.6,dy:direction*(9+(seed%7)*2.1),delay:(seed%6)/34,rot:((seed%11)-5)*.35});
        }
      }
      var scrolling=false,timer=null,raf=null,last=0,ticking=false;
      /* Quiet Editorial Index motion: ordinary reading states stay optically still.
         Only exit has a restrained paper-edge tuck, never a decorative card flip. */
      var current={x:0,y:0,op:0,scale:.96,sx:1,sy:1,rot:0,dust:0};
      var target={x:0,y:0,scale:.96,op:0,sx:1,sy:1,rot:0,dust:0,dustDir:-1,exit:true};
      /* Motion Stability Pass: the preview still looks the same; only state admission
         and follow timing change so reading never competes with a restless object. */
      var PAD=20,GAP=20,DAMP=10,FAST_DAMP=14,EXIT_DAMP=10;
      var activeRow=null,candidateRow=null,candidateSince=0,clearSince=0;
      /* Quiet Editorial Index: a Work visit has one optical size. Rows may move
         the preview, but they must never resize it — in either scroll direction. */
      var workStageScale=null,workStageBaseHeight=0;
      var lastScrollY=window.scrollY,lastScrollTime=performance.now(),scrollSpeed=0,scrollDirection=0;
      var DEAD_ZONE=1.5,CANDIDATE_HOLD=96,CANDIDATE_FAST_HOLD=60,EXIT_HOLD=480;
      var ENTER_SHIFT=8;
      /* A header destination scroll is navigation, not Work exploration. Keep the
         existing preview system dormant only for that finite, compact-screen trip. */
      var navIntent={active:false,token:0,raf:null,timer:null,lastY:0,still:0};
      function enabled(){return enabledMQ.matches;}
      function releaseNavIntent(token){
        if(token!==navIntent.token)return;
        navIntent.active=false;
        if(navIntent.raf){cancelAnimationFrame(navIntent.raf);navIntent.raf=null;}
        if(navIntent.timer){clearTimeout(navIntent.timer);navIntent.timer=null;}
        settle();
      }
      function hideForHeaderNavigation(){
        activeRow=null;candidateRow=null;clearSince=0;workStageScale=null;workStageBaseHeight=0;
        work.classList.remove('adaptive-previewing');
        adaptiveRows.forEach(function(row){row.classList.remove('adaptive-active');});
        preview.dataset.state='yield';preview.dataset.edge='none';
        target.op=0;target.dust=0;target.exit=true;current.op=0;current.dust=0;
        preview.style.opacity='0';hideFragments();
        if(raf!==null){cancelAnimationFrame(raf);raf=null;}
      }
      function suppressForHeaderScroll(){
        if(!enabled())return;
        var token=++navIntent.token;
        navIntent.active=true;navIntent.lastY=window.scrollY;navIntent.still=0;
        if(navIntent.raf){cancelAnimationFrame(navIntent.raf);}
        if(navIntent.timer){clearTimeout(navIntent.timer);}
        hideForHeaderNavigation();
        function watch(){
          if(token!==navIntent.token)return;
          var y=window.scrollY;
          navIntent.still=Math.abs(y-navIntent.lastY)<.5?navIntent.still+1:0;
          navIntent.lastY=y;
          if(navIntent.still>=3){releaseNavIntent(token);return;}
          navIntent.raf=requestAnimationFrame(watch);
        }
        navIntent.raf=requestAnimationFrame(watch);
        navIntent.timer=setTimeout(function(){releaseNavIntent(token);},2400);
        requestAnimationFrame(function(){
          if(token!==navIntent.token||!navIntent.active||!('onscrollend' in window))return;
          window.addEventListener('scrollend',function(){releaseNavIntent(token);},{once:true,passive:true});
        });
      }
      function readingLine(){return window.innerHeight*.58;}
      function pickRow(){
        var line=readingLine(),best=null,distance=Infinity;
        adaptiveRows.forEach(function(row){
          var r=row.getBoundingClientRect();
          if(r.top<=line&&r.bottom>=line){
            var d=Math.abs((r.top+r.bottom)/2-line);
            if(d<distance){best=row;distance=d;}
          }
        });
        return best;
      }
      function topSafeBand(){
        if(topbar&&topbar.classList.contains('is-visible'))return topbar.getBoundingClientRect().bottom+16;
        return 24;
      }
      function measure(){return {w:preview.offsetWidth,h:preview.offsetHeight};}
      function rightAnchoredX(base,scale){
        var rail=list?list.getBoundingClientRect():{left:PAD,right:window.innerWidth-PAD};
        var right=Math.min(window.innerWidth-PAD,rail.right);
        /* The CSS origin is always top-right. Returning the unscaled frame left
           keeps the visual right edge fixed as scaleX changes during the tuck. */
        return Math.max(PAD,Math.min(right-base.w,window.innerWidth-base.w-PAD));
      }
      function renderFragments(progress){
        if(!fragmentCtx||!fragmentSource||!fragments.length||reduceMQ.matches)return;
        var p=Math.max(0,Math.min(1,progress));
        fragmentCtx.clearRect(0,0,fragmentCanvas.width/fragmentDPR,fragmentCanvas.height/fragmentDPR);
        fragments.forEach(function(f){
          var q=Math.max(0,Math.min(1,(p-f.delay)/(1-f.delay)));
          /* A brief reveal followed by a full fade: 0 → peak → 0, while the
             original image itself follows the required 100% → 0% path. */
          var alpha=q<.14?q/.14:Math.max(0,(1-q)/.86);
          if(alpha<=.002)return;
          fragmentCtx.save();fragmentCtx.globalAlpha=alpha*.82;
          fragmentCtx.translate(f.sx+f.sw*.5+f.dx*q,f.sy+f.sh*.5+f.dy*q);
          fragmentCtx.rotate((f.rot*q)*Math.PI/180);
          fragmentCtx.drawImage(fragmentSource,f.sx,f.sy,f.sw,f.sh,-f.sw*.5,-f.sh*.5,f.sw,f.sh);
          fragmentCtx.restore();
        });
      }
      function yieldState(){
        return {
          state:'yield',op:0,scale:current.scale||.96,x:current.x,y:current.y+ENTER_SHIFT,
          sx:1,sy:1,rot:0,exit:true
        };
      }
      function fixedStageState(row){
        if(!enabled()||!row)return yieldState();
        var text=row.querySelector('.r-body');
        if(!text)return yieldState();
        var tr=text.getBoundingClientRect(),base=measure();
        var compactMobile=window.innerWidth<600;
        var gap=compactMobile?16:GAP;
        /* Fill more of the empty band above the copy, still never over the title. */
        var nominal=compactMobile?Math.min(base.h*.9,220):Math.min(base.h*.78,Math.min(220,window.innerHeight*.28));
        if(workStageScale===null||Math.abs(base.h-workStageBaseHeight)>.5){
          workStageScale=nominal/base.h;workStageBaseHeight=base.h;
        }
        /* One constant-size stage travels through all Work rows; it never pulses between projects. */
        var scale=workStageScale,desired=base.h*scale;
        var x=rightAnchoredX(base,scale);
        /* Protect the return topbar by moving the fixed-size stage, never shrinking it. */
        var y=Math.max(topSafeBand(),tr.top-gap-desired);
        return {state:'stage',op:1,scale:scale,x:x,y:y,sx:1,sy:1,rot:0,exit:false};
      }
      function workSpan(){
        var line=readingLine(),first=adaptiveRows[0].getBoundingClientRect(),last=adaptiveRows[adaptiveRows.length-1].getBoundingClientRect();
        return {inside:line>=first.top&&line<=last.bottom,before:line<first.top,after:line>last.bottom};
      }
      function travelState(){
        var line=readingLine(),before=null,after=null;
        adaptiveRows.forEach(function(row){
          var rect=row.getBoundingClientRect(),center=(rect.top+rect.bottom)/2;
          if(center<=line)before=row;
          if(!after&&center>line)after=row;
        });
        if(!before)return fixedStageState(adaptiveRows[0]);
        if(!after)return fixedStageState(adaptiveRows[adaptiveRows.length-1]);
        var from=fixedStageState(before),to=fixedStageState(after);
        var fromCenter=(before.getBoundingClientRect().top+before.getBoundingClientRect().bottom)/2;
        var toCenter=(after.getBoundingClientRect().top+after.getBoundingClientRect().bottom)/2;
        var progress=Math.max(0,Math.min(1,(line-fromCenter)/(toCenter-fromCenter)));
        return {state:'stage',op:1,scale:from.scale,x:from.x+(to.x-from.x)*progress,y:from.y+(to.y-from.y)*progress,sx:1,sy:1,rot:0,exit:false};
      }
      function computeState(row){
        return fixedStageState(row);
      }
      function assignTarget(next){
        /* Ignore sub-pixel retargeting while reading; it is motion without information. */
        if(!next.exit){
          if(Math.abs(next.x-target.x)<DEAD_ZONE)next.x=target.x;
          if(Math.abs(next.y-target.y)<DEAD_ZONE)next.y=target.y;
          if(Math.abs(next.scale-target.scale)<.003)next.scale=target.scale;
        }
        target.x=next.x;target.y=next.y;target.scale=next.scale;target.op=next.op;
        target.sx=next.sx;target.sy=next.sy;target.rot=next.rot;target.exit=Boolean(next.exit);
        target.dust=0;
      }
      function activate(row){
        var wasVisible=current.op>.03&&preview.dataset.state!=='yield';
        var next=computeState(row);
        activeRow=row;candidateRow=null;clearSince=0;
        adaptiveRows.forEach(function(item){item.classList.toggle('adaptive-active',item===row&&next.op>0);});
        work.classList.toggle('adaptive-previewing',next.op>0);
        var id=row&&row.getAttribute('data-prev');
        if(id!==null)art.forEach(function(item){item.classList.toggle('on',item.classList.contains('pv-'+id));});
        preview.dataset.state=next.state;
        assignTarget(next);
        if(!next.exit){current.dust=0;hideFragments();}
        if(!wasVisible&&next.op){
          current.x=next.x;
          current.y=next.y+ENTER_SHIFT;
          current.scale=next.scale;
          current.sx=1;current.sy=1;current.rot=0;
          current.op=0;
        }
        start();
      }
      function clear(flow){
        flow=flow||scrollDirection||1;
        /* Same 8px fade as enter. No rotate, no shatter, no scale punch. */
        var verticalDirection=flow>0?-1:1;
        activeRow=null;candidateRow=null;clearSince=0;workStageScale=null;workStageBaseHeight=0;
        work.classList.remove('adaptive-previewing');
        adaptiveRows.forEach(function(row){row.classList.remove('adaptive-active');});
        preview.dataset.state='exit';
        preview.dataset.edge=verticalDirection<0?'up':'down';
        target.x=current.x;
        target.y=current.y+verticalDirection*ENTER_SHIFT;
        target.op=0;
        target.scale=current.scale;target.sx=1;target.sy=1;target.rot=0;target.dust=0;target.dustDir=verticalDirection;target.exit=true;
        hideFragments();
        start();
      }
      function tick(now){
        var dt=Math.min((now-last)/1000,.05);last=now;
        var velocityBlend=Math.min(1,scrollSpeed/1.8);
        var followDamp=target.exit?EXIT_DAMP:DAMP+(FAST_DAMP-DAMP)*velocityBlend;
        var a=reduceMQ.matches?1:1-Math.exp(-followDamp*dt);
        var opacityA=reduceMQ.matches?1:1-Math.exp(-(target.exit?EXIT_DAMP:DAMP)*dt);
        current.x+=(target.x-current.x)*a;
        current.y+=(target.y-current.y)*a;
        current.scale+=(target.scale-current.scale)*a;
        current.sx+=(target.sx-current.sx)*a;
        current.sy+=(target.sy-current.sy)*a;
        current.rot+=(target.rot-current.rot)*a;
        current.op+=(target.op-current.op)*opacityA;
        current.dust+=(target.dust-current.dust)*opacityA;
        preview.style.transform='translate3d('+current.x.toFixed(1)+'px,'+current.y.toFixed(1)+'px,0) rotate('+current.rot.toFixed(3)+'deg) scale('+(current.scale*current.sx).toFixed(4)+','+(current.scale*current.sy).toFixed(4)+')';
        preview.style.opacity=current.op.toFixed(3);
        renderFragments(current.dust);
        var settled=Math.abs(target.op-current.op)<.01&&Math.abs(target.x-current.x)<.5&&Math.abs(target.y-current.y)<.5&&Math.abs(target.scale-current.scale)<.002&&Math.abs(target.sx-current.sx)<.002&&Math.abs(target.sy-current.sy)<.002&&Math.abs(target.rot-current.rot)<.01&&Math.abs(target.dust-current.dust)<.01;
        if(settled&&!scrolling){if(target.op===0){preview.dataset.state='yield';preview.dataset.edge='none';hideFragments();}raf=null;return;}
        raf=requestAnimationFrame(tick);
      }
      function start(){if(raf===null){last=performance.now();raf=requestAnimationFrame(tick);}}
      function settle(){
        scrolling=false;scrollSpeed=0;candidateRow=null;clearSince=0;
        var span=workSpan();
        if(!span.inside){clear(span.before?-1:1);return;}
        refresh(performance.now());
      }
      function refresh(now){
        if(navIntent.active)return;
        if(!enabled()){clear();return;}
        var span=workSpan();
        var row=pickRow();
        if(!span.inside){
          candidateRow=null;
          if(!activeRow){clear();return;}
          if(!clearSince)clearSince=now;
          if(now-clearSince>=EXIT_HOLD)clear(span.before?-1:1);else start();
          return;
        }
        /* Between rows, retain the same full-size stage and travel it between anchors. */
        if(!row){
          clearSince=0;candidateRow=null;preview.dataset.state='stage';
          assignTarget(travelState());start();
          return;
        }
        clearSince=0;
        if(row===activeRow){candidateRow=null;activate(row);return;}
        if(candidateRow!==row){
          candidateRow=row;candidateSince=now;
          if(!activeRow)activate(row);else start();
          return;
        }
        var hold=scrollSpeed>1.2?CANDIDATE_FAST_HOLD:CANDIDATE_HOLD;
        if(!activeRow||now-candidateSince>=hold)activate(row);else start();
      }
      function onScroll(){
        if(ticking)return;ticking=true;
        requestAnimationFrame(function(){
          var now=performance.now(),scrollY=window.scrollY,delta=scrollY-lastScrollY;
          var elapsed=Math.max(1,now-lastScrollTime),nextDirection=delta===0?scrollDirection:(delta>0?1:-1);
          scrollSpeed=scrollSpeed*.62+Math.abs(delta/elapsed)*.38;
          if(nextDirection&&scrollDirection&&nextDirection!==scrollDirection){
            /* Reverse from the current visual state; never complete an old exit first. */
            candidateRow=null;candidateSince=now;clearSince=0;target.exit=false;target.dust=0;preview.dataset.edge='none';
          }
          scrollDirection=nextDirection;lastScrollY=scrollY;lastScrollTime=now;
          scrolling=!reduceMQ.matches;refresh(now);clearTimeout(timer);timer=setTimeout(settle,180);ticking=false;
        });
      }
      adaptiveRows.forEach(function(row){
        row.addEventListener('pointerenter',function(e){if(enabled()&&e.pointerType!=='touch'){scrolling=false;activate(row);}});
      });
      window.addEventListener('portfolio:header-intent-scroll',function(e){
        if(e.detail&&(e.detail.target==='about'||e.detail.target==='contact'))suppressForHeaderScroll();
      });
      window.addEventListener('scroll',onScroll,{passive:true});
      if('onscrollend' in window)window.addEventListener('scrollend',settle,{passive:true});
      window.addEventListener('resize',function(){workStageScale=null;workStageBaseHeight=0;settle();},{passive:true});enabledMQ.addEventListener('change',function(){workStageScale=null;workStageBaseHeight=0;settle();});reduceMQ.addEventListener('change',settle);
    }());

    // Simple Scrollspy
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sb-nav a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        link.removeAttribute('aria-current');
        if (link.getAttribute('href').includes(current)) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'location');
        }
      });
    });
