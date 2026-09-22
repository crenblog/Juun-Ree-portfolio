(() => {
  'use strict';
  const viewport = document.getElementById('ringsViewport');
  if (!viewport) return;
  const field = document.getElementById('ringsField');
  const room = document.getElementById('ringsRoom'), ctx = room.getContext('2d');
  const counter = document.getElementById('ringsCount'), intro = document.getElementById('ringsIntro');
  const projects = JSON.parse(document.getElementById('rings-data').textContent).projects;
  if (!projects?.length) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  let touchMode=!finePointer.matches, labelCard=null, hoverTimer=0, dismissed=null, keyboardCard=null;
  let cursor={x:0,y:0}, labelPosition=null, pressedLabelCard=null, hoverSpeed=1, opening=false, paused=false;
  // Content cycles and geometric turns deliberately do not coincide. Repeated
  // images keep their order but no longer stack at the same angular position.
  const TAU = Math.PI * 2, cards = [], cycleLength=projects.length+1, step=TAU/Math.max(7.3,Math.min(12.7,cycleLength*.83));
  const fragments={
    'biennale-guide':{parent:'Biennale',kind:'Overview'},
    'biennale-time':{parent:'Biennale',kind:'Design decision',section:'bH4'},
    'biennale-route':{parent:'Biennale',kind:'Design detail',section:'csH5'},
    'loop-words':{parent:'Loop',kind:'Overview'},
    'loop-recall':{parent:'Loop',kind:'Research insight',section:'csH3'},
    'loop-build':{parent:'Loop',kind:'Design detail',section:'csH5'},
    'off-pull':{parent:'Off',kind:'Problem',section:'csH2'},
    'off-signal':{parent:'Off',kind:'Research insight',section:'csH3'},
    'off-quiet':{parent:'Off',kind:'Design decision',section:'csH4'}
  };
  const pool=new Map();
  const mod = (v,n) => ((v%n)+n)%n;
  const clamp = (v,min,max) => Math.max(min,Math.min(max,v));
  let width,height,config,focal,unit,rotation=0,progress=0,target=0,rise=1,reach=1,frontScale=1.16;
  let last=0,frame=0,hovered=null,active=null,pointer=null,suppressClick=false,interactionTime=0;
  const surfaces=window.JuunRingsRenderer ? new window.JuunRingsRenderer(viewport,projects) : null;

  // Absolute sequence numbers never wrap while visible. Repeated cycles are
  // created ahead of the frustum and retired only beyond its farthest extent.
  function dimensions(){
    const portrait=height>width;
    if(width<768 && !portrait)return {fov:50,camera:12,radius:6.4,w:1.54,h:2.09};
    if(width<500)return {fov:70,camera:7.5,radius:3.9,w:1.1,h:1.54};
    if(width<768)return {fov:70,camera:9.5,radius:4.6,w:1.1,h:1.54,spacing:3.8};
    if(width<1024 && portrait)return {fov:65,camera:9,radius:4.7,w:1.32,h:1.84};
    if(width<1024)return {fov:60,camera:11,radius:5.6,w:1.32,h:1.76};
    return {fov:50,camera:12,radius:6.4,w:1.54,h:2.09};
  }
  const label=document.createElement('a'); label.className='rings__hover-label rings__focus-label';label.setAttribute('aria-hidden','true');label.tabIndex=-1;
  const arrow=document.createElement('span');arrow.textContent='↗';
  const copy=document.createElement('span'),title=document.createElement('strong'),category=document.createElement('small');
  copy.append(title,category);label.append(arrow,copy);viewport.append(label);
  const touchNav=document.createElement('nav');touchNav.className='rings__touch-nav';touchNav.setAttribute('aria-label','Browse work');
  const previous=document.createElement('button'),next=document.createElement('button');
  previous.type=next.type='button';previous.textContent='←';next.textContent='→';
  previous.setAttribute('aria-label','Previous work');next.setAttribute('aria-label','Next work');
  touchNav.append(previous,next);viewport.append(touchNav);
  const pause=document.createElement('button');pause.type='button';pause.className='rings__pause';
  const pauseIcon=document.createElement('span'),pauseCopy=document.createElement('span');
  pauseIcon.className='rings__motion-icon';pauseIcon.setAttribute('aria-hidden','true');pause.append(pauseIcon,pauseCopy);viewport.append(pause);
  function paintPause(){
    // Lucide pause/play, ISC licensed; see assets/icons/lucide/LICENSE.
    pauseIcon.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">'+(paused?'<path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/>':'<rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/>')+'</svg>';
    pauseCopy.textContent=paused?'Resume motion':'Pause motion';pause.setAttribute('aria-pressed',String(paused));
  }
  paintPause();
  pause.addEventListener('click',()=>{paused=!paused;target=progress;paintPause();intro.classList.add('is-hidden');});
  function setLabelVisible(show){label.classList.toggle('is-visible',show);label.setAttribute('aria-hidden',String(!show));label.tabIndex=show?0:-1;}
  function moveBy(amount){target=Math.round(target)+amount;interactionTime=performance.now()+1200;intro.classList.add('is-hidden');}
  previous.addEventListener('click',()=>moveBy(-1));next.addEventListener('click',()=>moveBy(1));
  function clearHoverSoon(){clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>{hovered=null;},65);}
  function setInputMode(touch){const changed=touchMode!==touch;touchMode=touch;viewport.classList.toggle('is-touch',touch);touchNav.hidden=!touch;if(changed && config)resize();}
  setInputMode(touchMode);
  finePointer.addEventListener('change',()=>setInputMode(!finePointer.matches));
  function open(card){
    if(!card || suppressClick || opening || window.jrSpace?.busy)return;
    if(card.boundary){target=card.sequence+1;interactionTime=performance.now()+1200;return;}
    hovered=null;keyboardCard=null;setLabelVisible(false);
    if(typeof window.jrOpenCase==='function'){
      opening=true;target=progress;
      Promise.resolve(window.jrOpenCase(card.project.case,card.button)).finally(()=>{opening=false;});
    }
    else location.href=card.project.url;
  }
  // Preserve the work the user pressed even if continuous travel updates the
  // center caption between pointerdown and click.
  label.addEventListener('pointerdown',()=>{pressedLabelCard=labelCard;});
  label.addEventListener('pointercancel',()=>{pressedLabelCard=null;});
  label.addEventListener('click',event=>{const selected=pressedLabelCard||labelCard;pressedLabelCard=null;if(selected){event.preventDefault();open(selected);}});
  label.addEventListener('pointerenter',()=>{clearTimeout(hoverTimer);hovered=labelCard;});
  label.addEventListener('pointerleave',clearHoverSoon);
  label.addEventListener('focus',()=>{keyboardCard=labelCard;});
  label.addEventListener('blur',()=>{keyboardCard=null;});
  function makeCard(sequence){
      const index=mod(sequence,cycleLength),boundary=index===projects.length;
      const project=boundary?null:projects[index];
      const button=document.createElement('button');
      button.className=boundary?'rings__card rings__boundary':'rings__card';button.type='button';
      button.setAttribute('aria-label',boundary?'End of all work. Start again at project 01.':`${project.title} — ${project.type}`);
      if(boundary){
        const circle=document.createElement('span');circle.className='rings__boundary-circle';
        const start=document.createElement('span');start.className='rings__boundary-face';start.textContent='START';
        const end=document.createElement('span');end.className='rings__boundary-face rings__boundary-face--back';end.textContent='END';
        circle.setAttribute('aria-hidden','true');circle.append(start,end);button.append(circle);
      }else{
        const image=document.createElement('img');image.src=project.src;image.alt='';image.draggable=false;
        button.append(image);
      }
      field.append(button);
      const card={sequence,index,project,boundary,button,scale:1,x:0,y:0,visible:false,focus:0};
      button.dataset.project=boundary?'cycle-end':project.id;button.dataset.sequence=sequence;
      if(!boundary){button.dataset.section=fragments[project.id]?.section||'';button.dataset.case=project.case;}
      button.addEventListener('pointerenter',event=>{if(event.pointerType!=='touch' && finePointer.matches){
        setInputMode(false);clearTimeout(hoverTimer);if(dismissed!==card)dismissed=null;hovered=card;
        cursor={x:event.clientX,y:event.clientY};labelPosition=null;
      }});
      button.addEventListener('pointerleave',()=>{if(hovered===card)clearHoverSoon();});
      button.addEventListener('focus',()=>{if(!pointer && !window.jrSpace?.busy && !window.jrSpace?.restoringFocus){keyboardCard=card;dismissed=null;target=sequence;paused=true;paintPause();}});
      button.addEventListener('blur',()=>{if(keyboardCard===card)keyboardCard=null;});
      button.addEventListener('click',()=>open(card));
      sizeCard(card);return card;
  }
  function sizeCard(card){
    const button=card.button;
    button.style.width=`${config.w*unit}px`;button.style.height=`${config.h*unit}px`;
    button.style.marginLeft=`${-config.w*unit/2}px`;button.style.marginTop=`${-config.h*unit/2}px`;
    if(card.boundary)button.style.setProperty('--boundary-unit',`${config.w*unit}px`);
  }
  function syncCycles(){
    const first=Math.floor(progress-reach),last=Math.ceil(progress+reach);
    for(let sequence=first;sequence<=last;sequence++)if(!pool.has(sequence))pool.set(sequence,makeCard(sequence));
    for(const [sequence,card] of pool)if(sequence<first-1 || sequence>last+1){
      if(document.activeElement===card.button)viewport.focus({preventScroll:true});
      if(hovered===card)hovered=null;
      card.button.remove();pool.delete(sequence);
    }
    cards.length=0;cards.push(...pool.values());
    viewport.dataset.copies=String(Math.ceil((last-first+1)/cycleLength));
    viewport.dataset.cycleHeight=(cycleLength*rise).toFixed(3);
  }
  function projectPoint(x,y,z){
    const depth=config.camera-z;
    return [width/2+x*focal/depth,height/2-y*focal/depth,depth];
  }
  function drawRoom(){
    ctx.clearRect(0,0,width,height);
    const fill=ctx.createRadialGradient(width/2,height/2,0,width/2,height/2,Math.max(width,height)*.75);
    fill.addColorStop(0,'#f1ede8');fill.addColorStop(.55,'#f1ede8');fill.addColorStop(1,'#e6e3db');ctx.fillStyle=fill;ctx.fillRect(0,0,width,height);
    const radius=22,extent=height>width?Math.max(30,22*Math.min(height/width,2.2)):22,bands=height>width?22:16;
    ctx.strokeStyle='rgba(12,48,36,.09)';ctx.lineWidth=.7;
    // Cylinder grid projected through the panel camera, without planar walls.
    function line(points){
      ctx.beginPath();let pen=false;
      for(const p of points){
        const q=projectPoint(...p);
        if(q[2]<.5 || Math.abs(q[0]-width/2)>width*3 || Math.abs(q[1]-height/2)>height*5){pen=false;continue;}
        if(pen)ctx.lineTo(q[0],q[1]);else ctx.moveTo(q[0],q[1]);pen=true;
      }
      ctx.stroke();
    }
    const turn=-rotation*.09;
    for(let i=0;i<80;i++){
      const angle=i/80*TAU+turn,x=Math.cos(angle)*radius,z=Math.sin(angle)*radius;
      if(z<config.camera-.5)line([[x,-extent,z],[x,extent,z]]);
    }
    for(let band=0;band<=bands;band++){
      const y=-extent+band/bands*extent*2,points=[];
      for(let i=0;i<=240;i++){const angle=i/240*TAU+turn;points.push([Math.cos(angle)*radius,y,Math.sin(angle)*radius]);}
      line(points);
    }
  }
  function render(dt){
    syncCycles();
    drawRoom();
    active=pool.get(Math.round(progress));
    for(const card of cards){
      const distance=card.sequence-progress;
      // Reverse the helix winding, not the vertical travel: forward input and
      // idle travel both carry cards rightward and upward past the viewer.
      const theta=Math.PI/2+distance*step;
      const x=Math.cos(theta)*config.radius,z=Math.sin(theta)*config.radius;
      const rear=(1-Math.sin(theta))/2;
      const y=-distance*rise*(1-.18*rear);
      card.theta=theta;card.worldY=y;
      const p=projectPoint(x,y,z),panelH=config.h*focal/p[2];card.x=p[0];card.y=p[1];
      card.visible=card.x>-panelH && card.x<width+panelH && card.y>-panelH && card.y<height+panelH;
      card.button.style.visibility=card.visible?'visible':'hidden';card.button.tabIndex=card===active?0:-1;
      // Only the current occurrence is in the accessible traversal. The visual
      // overscan copies must not become a repeated list for screen readers.
      card.button.setAttribute('aria-hidden',card===active?'false':'true');
      card.button.setAttribute('aria-current',card===active?'true':'false');
      if(!card.visible)continue;
      card.focus=Math.exp(-Math.pow(distance/.65,2));
      card.scale=1-.20*rear+(frontScale-1)*card.focus;
      const selectedCase=(keyboardCard||hovered)?.project?.case;
      const related=selectedCase && card.project?.case===selectedCase ? 1:0;
      card.related=(card.related||0)+(related-(card.related||0))*(1-Math.exp(-8*dt));
      card.button.style.transform=`translate3d(${x*unit}px,${-y*unit}px,${z*unit}px) rotateY(${Math.PI/2-theta}rad) scale(${card.scale})`;
      const fog=clamp((p[2]-config.camera*.58)/(config.camera*1.27),0,1);
      card.button.style.filter=`saturate(${1-fog*.12})`;
    }
    surfaces?.draw(cards,config,focal);
    if(active)counter.textContent=active.boundary?'End / Start':`${String(active.index+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')} fragments`;
    labelCard=touchMode?active:(keyboardCard||hovered);
    const show=!!labelCard && labelCard.visible && !labelCard.boundary && dismissed!==labelCard && !pointer?.moved && !document.body.classList.contains('case-open');
    setLabelVisible(show);
    if(show){
      const fragment=fragments[labelCard.project.id];
      title.textContent=labelCard.project.title;category.textContent=touchMode?'Explore this fragment ↗':fragment?`${fragment.parent} · ${fragment.kind}`:labelCard.project.type;label.href=labelCard.project.url;
      label.setAttribute('aria-label',`View ${labelCard.project.title}`);
      if(touchMode){label.style.left='50%';label.style.top='var(--touch-action-top)';}
      else{
        const bounds=labelCard.button.getBoundingClientRect(),lw=label.offsetWidth,lh=label.offsetHeight;
        const anchor=keyboardCard?{x:bounds.left+bounds.width/2,y:bounds.bottom}:cursor;
        const left=clamp(anchor.x+18,12,Math.max(12,width-lw-12));
        const top=clamp(anchor.y-lh/2,80,Math.max(80,height-lh-16));
        if(!labelPosition)labelPosition={x:left,y:top};
        const follow=reduced.matches?1:1-Math.exp(-22*dt);
        labelPosition.x+=(left-labelPosition.x)*follow;labelPosition.y+=(top-labelPosition.y)*follow;
        label.style.left=`${labelPosition.x}px`;label.style.top=`${labelPosition.y}px`;
      }
    }
    viewport.dataset.progress=progress.toFixed(3);viewport.dataset.rotation=rotation.toFixed(3);
    viewport.dataset.active=active.boundary?'cycle-end':active.project.id;
  }
  function animate(now){
    const dt=Math.min((now-last)/1000||1/60,.05);last=now;
    hoverSpeed+=((hovered && !touchMode ? .3:1)-hoverSpeed)*(1-Math.exp(-6*dt));
    if(!document.body.classList.contains('case-open') && !opening && !window.jrSpace?.busy){
      if(!reduced.matches && !paused && !keyboardCard && !pointer && now-interactionTime>0)target+=dt*.18*hoverSpeed;
      progress+=(target-progress)*(reduced.matches?1:1-Math.exp(-8*dt));
      rotation=progress*step;
      render(dt);
    }
    frame=requestAnimationFrame(animate);
  }
  function input(delta,touch=false){
    intro.classList.add('is-hidden');interactionTime=performance.now();hovered=null;
    target+=delta*(touch ? .004 : .0025);
  }
  viewport.addEventListener('wheel',event=>{
    if(document.body.classList.contains('case-open'))return;
    event.preventDefault();const factor=event.deltaMode===1?16:event.deltaMode===2?height:1;input((event.deltaY||event.deltaX)*factor);
  },{passive:false});
  viewport.addEventListener('pointerdown',event=>{
    if(event.button!==0)return;
    setInputMode(event.pointerType==='touch'||!finePointer.matches);
    suppressClick=false;
    if(event.target.closest('.rings__hover-label,.rings__touch-nav,.rings__pause'))return;
    suppressClick=false;pointer={id:event.pointerId,x:event.clientX,y:event.clientY,startX:event.clientX,startY:event.clientY,moved:false,lastDelta:0};
  });
  viewport.addEventListener('pointermove',event=>{
    if(event.pointerType!=='touch' && !event.target.closest('.rings__hover-label'))cursor={x:event.clientX,y:event.clientY};
    if(!pointer || pointer.id!==event.pointerId)return;
    if(Math.hypot(event.clientX-pointer.startX,event.clientY-pointer.startY)>7){
      if(!pointer.moved)viewport.setPointerCapture(event.pointerId);pointer.moved=true;suppressClick=true;viewport.classList.add('is-dragging');
    }
    if(pointer.moved){const dy=pointer.y-event.clientY,dx=pointer.x-event.clientX;const delta=Math.abs(dy)>=Math.abs(dx)?dy:dx;input(delta,true);pointer.lastDelta=delta;}
    pointer.x=event.clientX;pointer.y=event.clientY;
  });
  function release(event){
    if(!pointer || pointer.id!==event.pointerId)return;
    if(pointer.moved && event.type!=='pointercancel')input(pointer.lastDelta*3.5,true);
    pointer=null;viewport.classList.remove('is-dragging');if(viewport.hasPointerCapture(event.pointerId))viewport.releasePointerCapture(event.pointerId);
  }
  viewport.addEventListener('pointerup',release);viewport.addEventListener('pointercancel',release);
  viewport.addEventListener('keydown',event=>{
    if(document.body.classList.contains('case-open'))return;
    if(event.key==='Escape'){dismissed=labelCard;setLabelVisible(false);return;}
    if(['ArrowDown','PageDown','ArrowUp','PageUp','ArrowLeft','ArrowRight'].includes(event.key)){
      event.preventDefault();const forward=['ArrowDown','PageDown','ArrowRight'].includes(event.key);
      target=Math.round(target)+(forward?1:-1);interactionTime=performance.now()+1200;hovered=null;intro.classList.add('is-hidden');
    }else if(event.key==='Enter' && event.target===viewport){event.preventDefault();suppressClick=false;open(active);}
  });
  function resize(){
    width=viewport.clientWidth;height=viewport.clientHeight;config=dimensions();focal=height/(2*Math.tan(config.fov*Math.PI/360));unit=focal/config.camera;
    // Reserve header, caption and footer even in short landscape windows.
    const maxFrontHeight=Math.max(64,height-(touchMode?288:240)),frontHeight=config.h*1.16*focal/(config.camera-config.radius);
    if(frontHeight>maxFrontHeight){const ratio=maxFrontHeight/frontHeight;config.w*=ratio;config.h*=ratio;}
    // Only the foreground grows. Preserve the existing camera, rear cards and
    // desktop peak scale; constrain touch peaks to leave room for the fixed CTA.
    const baseH=config.h*focal/(config.camera-config.radius),baseW=baseH*config.w/config.h;
    const compact=touchMode||width<1080;
    frontScale=compact?Math.max(1.16,Math.min(1.16*1.26,maxFrontHeight/baseH,(width-64)/baseW)):1.16;
    rise=Math.max(config.h*.44,.396);
    const farDepth=config.camera+config.radius+config.w;
    reach=Math.ceil(((height/2+120)*farDepth/focal+config.h*1.5)/(rise*.82))+2;
    const frontH=config.h*frontScale*focal/(config.camera-config.radius),frontW=frontH*config.w/config.h;
    viewport.dataset.frontHeight=frontH.toFixed(1);viewport.dataset.frontScale=frontScale.toFixed(3);
    viewport.style.setProperty('--touch-action-top',`${Math.min(height-126,height/2+frontH/2+18)}px`);
    viewport.style.setProperty('--touch-action-width',`${Math.min(width-132,Math.max(180,frontW))}px`);
    field.style.perspective=`${focal}px`;
    for(const card of cards)sizeCard(card);
    const dpr=Math.min(devicePixelRatio||1,2);room.width=Math.round(width*dpr);room.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);surfaces?.resize(width,height);render(1/60);
  }
  addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',()=>{cancelAnimationFrame(frame);if(!document.hidden){last=performance.now();frame=requestAnimationFrame(animate);}});
  resize();frame=requestAnimationFrame(animate);
})();
