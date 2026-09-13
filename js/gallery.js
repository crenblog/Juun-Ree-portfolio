/*
 * Curved Gallery — independent reference reconstruction, September 2026.
 * No React, GSAP, Three.js, external CDN, tracking, or runtime network dependency.
 * Reference motion is a fitted demonstration, not recovered original application code.
 *
 * ⛔ INTERACTION LOCK — do not "improve" this later without an explicit request.
 * Wheel / drag: free pan. Do not snap the wheel. Free pan clears keyboard focus.
 * Arrow keys: spatial focus (Apple TV / Netflix). Start from
 *   1) last keyboard focus, else 2) tile under the pointer, else 3) nearest to screen center.
 * Then move one neighbor and lerp the camera so that card sits at screen center.
 * The OS cursor is never faked or hidden. Pages cannot teleport it (clickjacking).
 * After arrows, a closed case, or returning to All work, ignore the pointer
 * until it actually moves over a card — otherwise the back control (top-left)
 * sits in the look zone and the gallery pans by itself.
 * Look-follow is bounded to the visible card group, plus a slight overflow.
 * Empty space far from the group is outside the view — the gallery does not pan.
 * Phone (max-width 599): two columns, pair centered on the screen midline.
 * Tablet (600–1079): three columns, trio centered on the screen midline.
 * Phone/tablet pan is symmetric about that rest: each side gets half of the old one-way travel.
 * Desktop keeps the sqrt grid. Do not square tiles. Do not snap the wheel.
 * Do not draw a focus ring on the selected tile.
 * Enter: open the focused card (or nearest). Escape: close. Home / R: reset.
 */
(() => {
 'use strict';
 const $=id=>document.getElementById(id);
 const boot=JSON.parse($('gallery-data').textContent);
 const qp=new URLSearchParams(location.search);
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 const mod=(v,n)=>((v%n)+n)%n;
 const mix=(a,b,t)=>a+(b-a)*t;
 const smooth=t=>(t=clamp(t,0,1),t*t*(3-2*t));
 const finite=(v,f=0)=>Number.isFinite(Number(v))?Number(v):f;
 /* LOCK: tile aspect is 4:3 — same as main hover preview (.idx-prev 320×240). Do not square these. */
 const TILE_W=600,TILE_H=450;
 /* lookDead/Start: past the card cluster so a click does not pan.
    lookOverflow: pan only on the card group plus a slight pad — not empty space.
    lookMax ~2.1 cards/s: one new work every ~0.5s, a screen of cards in ~1.8s. */
 const CONFIG={radius:1100,perspective:1700,cardSize:150,pitchX:158,pitchY:128,originX:77,originY:222,yaw:.085,pitch:.02,roll:.004,dragGain:1,wheelGain:.72,followMs:64,releaseFriction:5.5,openOmega:15.5,closeOmega:22,referenceDuration:6.733333,lookDead:.46,lookStart:.54,lookCruise:.66,lookMax:330,lookFade:.22,lookOverflow:56};
 const els={stage:$('stage'),composition:$('composition'),field:$('field'),spotlight:$('spotlight'),backdrop:$('backdrop'),layer:$('detail-layer'),photo:$('detail-photo'),image:$('detail-image'),sheet:$('detail-sheet'),copy:$('detail-copy'),title:$('detail-title'),description:$('detail-description'),link:$('detail-link'),scrim:$('scrim'),empty:$('empty'),announce:$('announcement')};
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 const finePointer=matchMedia('(pointer: fine)');
 const phoneMQ=matchMedia('(max-width: 599px)');
 const tabletMQ=matchMedia('(min-width: 600px) and (max-width: 1079px)');
 const validImage=s=>typeof s==='string'&&s.length<14000000&&(/^(data:image\/(png|jpe?g|webp|gif|avif);base64,|https?:\/\/)/i.test(s)||(!/^\w+:/.test(s)&&!s.startsWith('//')&&!/[<>]/.test(s)&&s.length>0));
 const validLink=s=>typeof s==='string'&&(/^https?:\/\//i.test(s)||/^(index\.html|#|\.\/)/.test(s)||/^[a-z0-9-]+\.html$/i.test(s))?s:'';
 function normalize(list){const ids=new Set();return (Array.isArray(list)?list:[]).slice(0,300).map((p,i)=>{
  if(!p||typeof p!=='object'||Array.isArray(p))return null;const id=String(p.id||'project-'+i).slice(0,100);if(ids.has(id))return null;ids.add(id);
  return {id,title:String(p.title||'Untitled').slice(0,200),description:String(p.description||'').slice(0,3000),alt:String(p.alt||p.title||'Project image').slice(0,300),src:validImage(p.src)?p.src:'',url:validLink(p.url),color:/^#[0-9a-f]{6}$/i.test(p.color||'')?p.color:'#27302b',brightness:clamp(finite(p.brightness,1),.1,2),hover:clamp(finite(p.hover,1),.2,2.5),provisional:!!p.provisional};
 }).filter(Boolean);}
 let projects=normalize(boot.projects), ids=new Map(projects.map((p,i)=>[p.id,i]));
 const pattern=[['blur','relief','azure','form','flora','tropic','padel'],['stem','drift','form','flora','tropic','puro','stallion'],['flora','puro','stallion','stem','drift','azure','form']];
 const motion=Array.isArray(boot.motion)?boot.motion:[];
 const tiles=new Map();
 let layout=qp.get('layout')||(boot.defaultLayout||'reference');
 layout=layout==='gallery'?'gallery':'reference';
 let blank=qp.get('media')==='blank'||!!boot.blankMedia;
 let reduced=media.matches, unit=1,W=576,H=360,raf=0,lastTime=0,renderCount=0;
 let pan={x:0,y:0,tx:0,ty:0,vx:0,vy:0},tilt={x:CONFIG.pitch,y:CONFIG.yaw,z:CONFIG.roll};
 let pointer=null,selected=null,selectionQuad=null,returnFocus=null,mouseClient={x:null,y:null},focusCell=null,pointerStale=false,staleAt={x:null,y:null},lookBox=null;
 let light={x:W/2,y:H/2,tx:W/2,ty:H/2,opacity:0,targetOpacity:0,inside:false};
 let aim={x:W/2,y:H/2,inside:false,fine:finePointer.matches,active:false,fade:0,r:0,gain:0,speed:0};
 let spring={p:0,v:0,target:0};
 let playing=false,refTime=null,refBox=null,refProgress=0,photoBounds=null,panelBounds=null;
 let lastRefRow=null,lastModal=false,manualMoved=false;
 const safeJson=value=>JSON.stringify(value).replace(/</g,'\\u003c');
 document.body.classList.toggle('gallery-only',layout==='gallery');
 document.body.classList.toggle('blank-media',blank);
 els.backdrop.src=boot.background||'';
 function announce(text){els.announce.textContent=text;}
 function rowCols(){
  if(layout!=='gallery')return 0;
  if(phoneMQ.matches)return 2;
  if(tabletMQ.matches)return 3;
  return 0;
 }
 function gridSize(){
  const n=Math.max(1,projects.length);
  const cols=rowCols();
  if(cols)return {cols,rows:Math.ceil(n/cols)};
  const c=Math.max(1,Math.ceil(Math.sqrt(n)));
  return {cols:c,rows:Math.ceil(n/c)};
 }
 function projectIndex(c,r){if(!projects.length)return -1;if(layout==='gallery'){const g=gridSize();if(c<0||r<0||c>=g.cols||r>=g.rows)return -1;const i=r*g.cols+c;return i<projects.length?i:-1;}const wanted=pattern[mod(r,3)][mod(c+5*Math.floor(r/3),7)];return ids.has(wanted)?ids.get(wanted):mod(c+3*r,projects.length);}
 function clampPan(){
  if(layout!=='gallery')return;
  const g=gridSize(),spanX=(g.cols-1)*CONFIG.pitchX,minY=-(g.rows-1)*CONFIG.pitchY;
  /* Framed rows rest at pan 0. Split leftover travel equally so the left card can come to center too. */
  if(rowCols()){
    const halfX=spanX/2;
    pan.tx=clamp(pan.tx,-halfX,halfX);pan.x=clamp(pan.x,-halfX,halfX);
    if(pan.x===-halfX||pan.x===halfX)pan.vx=0;
  }else{
    pan.tx=clamp(pan.tx,-spanX,0);pan.x=clamp(pan.x,-spanX,0);
    if(pan.x===-spanX||pan.x===0)pan.vx=0;
  }
  pan.ty=clamp(pan.ty,minY,0);pan.y=clamp(pan.y,minY,0);
  if(pan.y===minY||pan.y===0)pan.vy=0;
 }
 function bounds(q){const xs=q.map(p=>p[0]),ys=q.map(p=>p[1]);return {x:Math.min(...xs),y:Math.min(...ys),width:Math.max(...xs)-Math.min(...xs),height:Math.max(...ys)-Math.min(...ys)};}
 function rectangle(x,y,w,h){return [[x,y],[x+w,y],[x+w,y+h],[x,y+h]];}
 function interpolateQuad(a,b,t){return a.map((p,i)=>[mix(p[0],b[i][0],t),mix(p[1],b[i][1],t)]);}
 function localPoint(q,p){
  // Invert a bilinear quad with Newton iterations. Values may remain outside 0..1,
  // which lets one screen-space lantern illuminate neighboring cards continuously.
  const b=bounds(q);let u=(p.x-b.x)/Math.max(.001,b.width),v=(p.y-b.y)/Math.max(.001,b.height);
  for(let n=0;n<5;n++){
   const a=q[0],c=q[1],d=q[2],e=q[3];
   const x=a[0]*(1-u)*(1-v)+c[0]*u*(1-v)+d[0]*u*v+e[0]*(1-u)*v;
   const y=a[1]*(1-u)*(1-v)+c[1]*u*(1-v)+d[1]*u*v+e[1]*(1-u)*v;
   const xu=(c[0]-a[0])*(1-v)+(d[0]-e[0])*v,yu=(c[1]-a[1])*(1-v)+(d[1]-e[1])*v;
   const xv=(e[0]-a[0])*(1-u)+(d[0]-c[0])*u,yv=(e[1]-a[1])*(1-u)+(d[1]-c[1])*u;
   const det=xu*yv-xv*yu;if(Math.abs(det)<1e-7)break;const ex=x-p.x,ey=y-p.y;
   u-=(ex*yv-ey*xv)/det;v-=(ey*xu-ex*yu)/det;
  }
  return {x:u*TILE_W,y:v*TILE_H};
 }
 function referenceLight(t){
  const points=[[0,288,180],[.3,470,118],[.6,493,73],[.9,310,83],[1.2,365,208],[1.5,285,267],[1.8,292,270],[2.1,367,207],[2.7,380,219],[3,249,175],[3.3,247,175],[4.8,306,263],[5.1,312,192],[5.4,504,80],[5.7,486,120],[6,410,195],[6.3,384,202],[6.733,288,180]];
  let i=0;while(i<points.length-2&&points[i+1][0]<=t)i++;const a=points[i],b=points[i+1],f=smooth((t-a[0])/(b[0]-a[0]));return {x:mix(a[1],b[1],f),y:mix(a[2],b[2],f)};
 }
 // Closed-form homography from a DOM rectangle to a measured/projected quadrilateral.
 function matrix(q,w=TILE_W,h=TILE_H){
  const [p0,p1,p2,p3]=q;const dx1=p1[0]-p2[0],dx2=p3[0]-p2[0],dx3=p0[0]-p1[0]+p2[0]-p3[0];
  const dy1=p1[1]-p2[1],dy2=p3[1]-p2[1],dy3=p0[1]-p1[1]+p2[1]-p3[1];const den=dx1*dy2-dx2*dy1;
  const g=Math.abs(den)>1e-10?(dx3*dy2-dx2*dy3)/den:0,hp=Math.abs(den)>1e-10?(dx1*dy3-dx3*dy1)/den:0;
  const a=(p1[0]-p0[0]+g*p1[0])/w,b=(p3[0]-p0[0]+hp*p3[0])/h,d=(p1[1]-p0[1]+g*p1[1])/w,e=(p3[1]-p0[1]+hp*p3[1])/h;
  return `matrix3d(${[a*unit,d*unit,0,g/w,b*unit,e*unit,0,hp/h,0,0,1,0,p0[0]*unit,p0[1]*unit,0,1].map(v=>Math.abs(v)<1e-12?0:+v.toFixed(9)).join(',')})`;
 }
 function rotateAndProject(x,y,z){
  const cy=Math.cos(tilt.y),sy=Math.sin(tilt.y),cx=Math.cos(tilt.x),sx=Math.sin(tilt.x),cz=Math.cos(tilt.z),sz=Math.sin(tilt.z);
  const ax=x*cy+z*sy,az=-x*sy+z*cy,ay=y*cx-az*sx,bz=y*sx+az*cx;
  const bx=ax*cz-ay*sz,by=ax*sz+ay*cz,k=CONFIG.perspective/(CONFIG.perspective-bz);
  return [W/2+bx*k,H/2+by*k,bz];
 }
 // Tangent cards on a gently curved surface; camera projection is independent of DOM layout.
 function quadFor(c,r,hover=0){
  const R=CONFIG.radius,theta=(CONFIG.originX+c*CONFIG.pitchX+pan.x-288)/R,phi=(CONFIG.originY+r*CONFIG.pitchY+pan.y-180)/R;
  const ct=Math.cos(theta),st=Math.sin(theta),cp=Math.cos(phi),sp=Math.sin(phi);
  // Concave dome: the viewer is looking at the inside/back side of the sphere.
  // The centre is the deepest point; the rim comes toward the viewer.
  const centre=[R*st*cp,R*sp,R-R*ct*cp-hover*3],ex=[ct,0,st],ey=[-st*sp,cp,ct*sp];
  const halfW=CONFIG.cardSize/2,halfH=CONFIG.cardSize*0.75/2;
  return [[-1,-1],[1,-1],[1,1],[-1,1]].map(([u,v])=>rotateAndProject(centre[0]+(u*halfW*ex[0]+v*halfH*ey[0]),centre[1]+(u*halfW*ex[1]+v*halfH*ey[1]),centre[2]+(u*halfW*ex[2]+v*halfH*ey[2])).slice(0,2));
 }
 function ranges(){const ox=CONFIG.originX+W/2-288,oy=CONFIG.originY+H/2-180;return {c0:Math.floor((-pan.x-ox)/CONFIG.pitchX)-2,c1:Math.ceil((W-pan.x-ox)/CONFIG.pitchX)+2,r0:Math.floor((-pan.y-oy)/CONFIG.pitchY)-2,r1:Math.ceil((H-pan.y-oy)/CONFIG.pitchY)+2};}
 function nearest(id){let winner=null,score=Infinity;const rg=ranges();for(let r=rg.r0;r<=rg.r1;r++)for(let c=rg.c0;c<=rg.c1;c++){
  const i=projectIndex(c,r);if(i<0||(id&&projects[i].id!==id))continue;const b=bounds(quadFor(c,r));const s=(b.x+b.width/2-W/2)**2+(b.y+b.height/2-H/2)**2;if(s<score){score=s;winner={c,r,i,key:`${c}:${r}`};}
 }return winner;}
 function makeTile(c,r,i){const key=`${c}:${r}`,button=document.createElement('button'),image=document.createElement('img'),label=document.createElement('span'),blankLabel=document.createElement('span');
  button.type='button';button.id='tile-'+c+'-'+r;button.className='tile';button.dataset.key=key;button.dataset.project=projects[i].id;button.setAttribute('aria-label','Open '+projects[i].title);
  image.className='base-image';image.alt='';image.draggable=false;image.decoding='async';image.src=projects[i].src||'';image.hidden=blank||!projects[i].src;image.addEventListener('error',()=>{image.hidden=true;});
  label.className='caption';label.textContent=projects[i].title;blankLabel.className='blank-title';blankLabel.textContent=projects[i].title;
  button.append(image,label,blankLabel);button.style.background=projects[i].color;
  if(projects[i].url&&window.jrPrefetchCase)button.addEventListener('pointerenter',function(){jrPrefetchCase(projects[i].id);});
  button.addEventListener('focus',()=>{if(!selected){if(refTime!==null)engage();const b=bounds(quadFor(c,r));light.tx=b.x+b.width/2;light.ty=b.y+b.height/2;light.targetOpacity=1;wake();}});
  button.addEventListener('click',event=>{if(event.detail===0){engage();openTile({c,r,i,key});}});
  els.field.append(button);const t={key,c,r,i,button,image,label,visible:false,quad:null};tiles.set(key,t);return t;
 }
 function sample(t){if(!motion.length)return [t,0,0,0,0,null];let lo=0,hi=motion.length-1;while(lo<hi){const mid=(lo+hi+1)>>1;if(motion[mid][0]<=t)lo=mid;else hi=mid-1;}const a=motion[lo],b=motion[Math.min(lo+1,motion.length-1)],f=b[0]===a[0]?0:clamp((t-a[0])/(b[0]-a[0]),0,1);let box=null;
  if(a[5]||b[5]){const aa=a[5]||[b[5][0],b[5][1],0,b[5][3]],bb=b[5]||[a[5][0],a[5][1],0,a[5][3]];box=aa.map((v,i)=>mix(v,bb[i],f));if(box[2]<.2)box=null;}
  return [t,mix(a[1],b[1],f),mix(a[2],b[2],f),mix(a[3],b[3],f),mix(a[4],b[4],f),box];
 }
 function applyReference(t){const s=sample(t);lastRefRow=s;
  // LK flow is screen-space; these low-order fits map it into the curved layout's world space.
  pan.x=1.0308*s[1]+.000161*s[1]*s[1];pan.y=1.09*s[2]-.00031*s[2]*s[2];pan.tx=pan.x;pan.ty=pan.y;
  tilt.y=CONFIG.yaw+clamp(s[3]/6000,-.10,.10);tilt.x=CONFIG.pitch+clamp(-s[4]/6500,-.07,.07);tilt.z=CONFIG.roll+clamp(s[3]/35000,-.016,.016);
  refBox=s[5];refProgress=0;const lp=referenceLight(t);light.x=light.tx=lp.x;light.y=light.ty=lp.y;light.opacity=light.targetOpacity=refBox?0:1;
  const active=!!refBox||(t>3.235&&t<4.75);
  if(active&&ids.has('tropic')){
   if(!selected||projects[selected.i]?.id!=='tropic'){selected=nearest('tropic');selectionQuad=selected?quadFor(selected.c,selected.r,1):null;fillDetails();}
   if(refBox)refProgress=clamp((refBox[3]-CONFIG.cardSize)/(252-CONFIG.cardSize),0,1);
   else if(t<3.4)refProgress=.31*smooth((t-3.235)/.1);else refProgress=.2*(1-smooth((t-4.62)/.13));
  }else if(selected){selected=null;selectionQuad=null;}
 }
 function fillDetails(){if(!selected)return;const p=projects[selected.i];els.image.src=p.src||'';els.image.hidden=blank||!p.src;els.photo.style.background=p.color;els.image.alt=p.alt;els.title.textContent=p.title;els.description.textContent=p.description;els.link.hidden=!p.url;if(p.url)els.link.href=p.url;else els.link.removeAttribute('href');els.photo.setAttribute('aria-label','Close '+p.title+' details');els.copy.tabIndex=p.description.length>350||p.title.length>70?0:-1;}
 function detailLayout(){if(layout==='gallery'&&W<510&&H>570){const w=Math.min(W-40,370),h=w*3/4,top=Math.max(20,(H-h-180)/2);return {photo:rectangle((W-w)/2,top,w,h),sheet:{x:(W-w)/2,y:top+h-1,w,h:180,stacked:true}};}
  const k=Math.min(1,(W-30)/484,(H-28)/220),pw=250*k,ph=pw*3/4,sw=232*k,left=(W-pw-sw)/2,top=(H-ph)/2;return {photo:rectangle(left,top,pw,ph),sheet:{x:left+pw-1,y:top,w:sw+1,h:ph,stacked:false}};
 }
 function renderModal(){const p=selected?(refTime!==null?refProgress:spring.p):0;lastModal=!!selected;els.layer.hidden=!selected;els.field.inert=!!selected;els.stage.setAttribute('aria-busy',pointer?'true':'false');
  if(!selected){photoBounds=null;panelBounds=null;els.field.style.opacity='1';return;}
  const pData=projects[selected.i],dest=detailLayout(),src=selectionQuad||quadFor(selected.c,selected.r);let photoQ,sheet;
  if(refTime!==null&&refBox&&layout==='reference'){
   const [x,y,w,h]=refBox;const pw=h*.992;photoQ=rectangle(x-pw,y,pw,h);sheet={x:x-.6,y,w:w+1.2,h,stacked:false};
  }else{
   photoQ=interpolateQuad(src,dest.photo,p);const b=bounds(photoQ),sp=smooth(clamp((p-.05)/.95,0,1));
   if(dest.sheet.stacked)sheet={x:b.x,y:b.y+b.height-1,w:b.width,h:dest.sheet.h*sp,stacked:true};
   else sheet={x:photoQ[1][0]-.6,y:photoQ[1][1],w:dest.sheet.w*sp,h:Math.max(1,photoQ[2][1]-photoQ[1][1]),stacked:false};
  }
  photoBounds=bounds(photoQ);panelBounds={x:sheet.x,y:sheet.y,width:sheet.w,height:sheet.h};
  els.photo.style.transform=matrix(photoQ);els.photo.style.borderRadius='25px';els.image.style.filter=`brightness(${mix(pData.brightness,pData.hover,p)})`;
  const scl=photoBounds.height/TILE_H,localW=Math.max(.02,sheet.w/scl),localH=Math.max(.02,sheet.h/scl);
  els.sheet.style.width=localW+'px';els.sheet.style.height=localH+'px';els.sheet.style.borderRadius=sheet.stacked?'0 0 22px 22px':'0 22px 22px 0';
  els.sheet.style.transform=matrix(rectangle(sheet.x,sheet.y,Math.max(.01,sheet.w),Math.max(.01,sheet.h)),localW,localH);
  els.copy.style.width=(sheet.stacked?localW:555)+'px';els.copy.style.minHeight='0';els.copy.style.height=(sheet.stacked?Math.max(localH,180/scl):TILE_H)+'px';els.copy.style.opacity=String(smooth(sheet.w/(dest.sheet.w||1)*1.5));
  const physicalScale=scl*unit;const readable=layout==='gallery';els.title.style.fontSize=(readable?Math.max(30,20/physicalScale):30)+'px';els.description.style.fontSize=(readable?Math.max(16,14/physicalScale):16)+'px';
  els.description.style.color=readable?'#4A4A4A':'#5E584E';els.title.style.marginBottom=(readable?Math.max(23,10/physicalScale):23)+'px';els.copy.style.padding=(readable?Math.max(40,16/physicalScale):40)+'px';
  els.scrim.style.opacity=String(.035*p);els.field.style.opacity='1';
 }
 function render(dt=0){renderCount++;els.empty.hidden=projects.length>0;const activeKeys=new Set();const rg=ranges();
  els.spotlight.style.setProperty('--light-x',(light.x*unit).toFixed(2)+'px');els.spotlight.style.setProperty('--light-y',(light.y*unit).toFixed(2)+'px');els.spotlight.style.opacity=String(light.opacity);
  if(projects.length)for(let r=rg.r0;r<=rg.r1;r++)for(let c=rg.c0;c<=rg.c1;c++){
   const i=projectIndex(c,r);if(i<0)continue;const key=`${c}:${r}`;activeKeys.add(key);let tile=tiles.get(key);if(tile&&tile.i!==i){tile.button.remove();tiles.delete(key);tile=null;}if(!tile)tile=makeTile(c,r,i);
   const q=quadFor(c,r),b=bounds(q);tile.quad=q;tile.visible=b.x<W&&b.x+b.width>0&&b.y<H&&b.y+b.height>0;
   tile.button.style.display=tile.visible?'block':'none';tile.button.style.visibility=selected&&selected.key===key?'hidden':'visible';tile.button.tabIndex=tile.visible&&Math.min(b.width,b.height)>65&&!selected?0:-1;
   if(tile.visible){
    const on=!!(focusCell&&focusCell.key===key&&!selected);
    tile.button.classList.toggle('is-focus',on);
    tile.button.style.transform=matrix(q);tile.button.style.zIndex=on?'2':'1';
    tile.image.style.filter=`brightness(${Math.max(.34,projects[i].brightness*(on?1:0.72))}) saturate(${on?1:.9})`;
    tile.label.style.opacity=layout==='gallery'?'1':'.72';tile.label.style.fontSize=(layout==='gallery'?Math.max(22,14*TILE_H/Math.max(1,b.height*unit)):22)+'px';
   }
  }
  for(const [key,t] of tiles)if(!activeKeys.has(key)){t.button.remove();tiles.delete(key);}
  updateLookBox();
  renderModal();return false;
 }
 function stepSpring(dt){const omega=spring.target?CONFIG.openOmega:CONFIG.closeOmega;if(reduced){spring.p=spring.target;spring.v=0;return false;}const d=spring.p-spring.target,k=spring.v+omega*d,e=Math.exp(-omega*dt);spring.p=clamp(spring.target+(d+k*dt)*e,0,1);spring.v=(spring.v-omega*k*dt)*e;const moving=Math.abs(spring.p-spring.target)>.0008||Math.abs(spring.v)>.002;
  if(!moving){spring.p=spring.target;spring.v=0;}return moving;
 }
 function restore(){const target=returnFocus?.isConnected?returnFocus:els.stage;returnFocus=null;target.focus({preventScroll:true});}
 function tick(now){raf=0;const dt=lastTime?Math.min((now-lastTime)/1000,.05):1/60;lastTime=now;let busy=false;
  if(refTime!==null){if(playing&&!reduced){refTime=mod(refTime+dt,CONFIG.referenceDuration);busy=true;}applyReference(refTime);}
  else{
   const la=reduced?1:1-Math.exp(-dt/.055);light.x=mix(light.x,light.tx,la);light.y=mix(light.y,light.ty,la);light.opacity=mix(light.opacity,selected?0:light.targetOpacity,la);busy=busy||Math.abs(light.x-light.tx)+Math.abs(light.y-light.ty)+Math.abs(light.opacity-(selected?0:light.targetOpacity))>.002;
   busy=lookStep(dt)||busy;
   if(!selected){if(!pointer&&!reduced&&!aim.active){const k=1000/CONFIG.followMs,decay=Math.exp(-k*dt);pan.tx+=pan.vx*(1-decay)/k;pan.ty+=pan.vy*(1-decay)/k;pan.vx*=decay;pan.vy*=decay;clampPan();}
    const a=reduced?1:1-Math.exp(-dt*1000/CONFIG.followMs),oldX=pan.x,oldY=pan.y;pan.x=mix(pan.x,pan.tx,a);pan.y=mix(pan.y,pan.ty,a);clampPan();
    const vx=(pan.x-oldX)/Math.max(dt,.001),vy=(pan.y-oldY)/Math.max(dt,.001);tilt.y=mix(tilt.y,CONFIG.yaw+clamp(vx/6000,-.1,.1),a);tilt.x=mix(tilt.x,CONFIG.pitch+clamp(-vy/6500,-.07,.07),a);tilt.z=mix(tilt.z,CONFIG.roll+clamp(vx/35000,-.016,.016),a);
    busy=busy||Math.abs(pan.x-pan.tx)+Math.abs(pan.y-pan.ty)>.01||Math.hypot(pan.vx,pan.vy)>.15||Math.abs(tilt.y-CONFIG.yaw)+Math.abs(tilt.x-CONFIG.pitch)>.00005||aim.active;
    // Preserve the repeating lattice while keeping numbers well-conditioned on very long drags.
    if(layout!=='gallery'){if(Math.abs(pan.x)>100000){const shift=Math.trunc(pan.x/(CONFIG.pitchX*7))*CONFIG.pitchX*7;pan.x-=shift;pan.tx-=shift;}
    if(Math.abs(pan.y)>100000){const shift=Math.trunc(pan.y/(CONFIG.pitchY*21))*CONFIG.pitchY*21;pan.y-=shift;pan.ty-=shift;}}
   }
   if(selected){busy=stepSpring(dt)||busy;if(spring.p===0&&spring.target===0){selected=null;selectionQuad=null;els.field.inert=false;light.targetOpacity=light.inside?1:0;restore();announce('Project details closed.');}}
  }
  busy=render(dt)||busy;if(busy&&!document.hidden)raf=requestAnimationFrame(tick);
 }
 function wake(){if(!raf&&!document.hidden){lastTime=performance.now();raf=requestAnimationFrame(tick);}}
 function engage(){const wasReference=refTime!==null;if(wasReference){const was=selected;spring={p:was?refProgress:0,v:0,target:was?1:0};if(was)selectionQuad=quadFor(was.c,was.r,0);refTime=null;refBox=null;}playing=false;if(wasReference){pan.tx=pan.x;pan.ty=pan.y;}pan.vx=0;pan.vy=0;}
 function openTile(tile){if(!tile||!projects[tile.i])return false;
  const p=projects[tile.i];
  if(p.url&&typeof jrOpenCase==='function'){engage();jrOpenCase(p.id,tile.button);return true;}
  if(selected){if(selected.key===tile.key){spring.target=1;wake();return true;}return false;}
  selected={...tile};selectionQuad=(tiles.get(tile.key)?.quad||quadFor(tile.c,tile.r,1)).map(p=>p.slice());returnFocus=document.activeElement;spring={p:reduced?1:0,v:0,target:1};pan.tx=pan.x;pan.ty=pan.y;pan.vx=pan.vy=0;light.targetOpacity=0;fillDetails();render();els.photo.focus({preventScroll:true});announce(projects[tile.i].title+' details opened.');wake();return true;
 }
 function openProject(id){engage();const key=typeof id==='number'?projects[clamp(Math.floor(id),0,projects.length-1)]?.id:id;return openTile(nearest(key));}
 function close(){engage();if(!selected)return false;spring.target=0;if(reduced){spring.p=0;spring.v=0;selected=null;selectionQuad=null;els.field.inert=false;light.targetOpacity=light.inside?1:0;render();restore();announce('Project details closed.');return true;}wake();return true;}
 function getWorldPointer(event){const b=els.stage.getBoundingClientRect();return {x:(event.clientX-b.left)*els.stage.clientWidth/b.width/unit,y:(event.clientY-b.top)*els.stage.clientHeight/b.height/unit};}
 function aimRadius(p){return Math.hypot((p.x-W/2)/Math.max(1,W/2),(p.y-H/2)/Math.max(1,H/2));}
 function setAim(p,pointerType){
  aim.x=p.x;aim.y=p.y;aim.inside=true;aim.fine=pointerType!=='touch'&&finePointer.matches;
 }
 function stopLook(hard){
  aim.inside=false;aim.active=false;aim.gain=0;aim.speed=0;aim.vx=0;aim.vy=0;aim.fade=0;
  if(hard){pan.vx=0;pan.vy=0;}
 }
 function updateLookBox(){
  let x0=Infinity,y0=Infinity,x1=-Infinity,y1=-Infinity,n=0;
  for(const t of tiles.values()){
   if(!t.visible||!t.quad)continue;const b=bounds(t.quad);
   x0=Math.min(x0,b.x);y0=Math.min(y0,b.y);x1=Math.max(x1,b.x+b.width);y1=Math.max(y1,b.y+b.height);n++;
  }
  if(!n||!els.stage.clientWidth){lookBox=null;return;}
  const st=els.stage.getBoundingClientRect();
  const sx=unit*st.width/els.stage.clientWidth,sy=unit*st.height/els.stage.clientHeight,pad=CONFIG.lookOverflow;
  lookBox={x:st.left+x0*sx-pad,y:st.top+y0*sy-pad,w:(x1-x0)*sx+pad*2,h:(y1-y0)*sy+pad*2};
 }
 function inLookView(x,y){
  if(overChrome(x,y)||!lookBox)return false;
  return x>=lookBox.x&&x<=lookBox.x+lookBox.w&&y>=lookBox.y&&y<=lookBox.y+lookBox.h;
 }
 function lookStep(dt){
  // Rest → short ease-out to cruise → plateau. Going closer to the rim does not go faster.
  const wasActive=aim.active;
  if(reduced||selected||pointer||pointerStale||refTime!==null||!aim.inside||!aim.fine||(!wasActive&&Math.hypot(pan.vx,pan.vy)>40)){aim.active=false;aim.gain=0;aim.speed=0;return false;}
  const nx=(aim.x-W/2)/Math.max(1,W/2),ny=(aim.y-H/2)/Math.max(1,H/2),r=Math.hypot(nx,ny);
  aim.r=r;
  if(aim.active){if(r<CONFIG.lookDead)aim.active=false;}else if(r>CONFIG.lookStart)aim.active=true;
  if(!aim.active){
   if(wasActive){pan.vx=aim.vx||0;pan.vy=aim.vy||0;}
   aim.gain=0;aim.speed=0;aim.vx=0;aim.vy=0;return false;
  }
  aim.fade=Math.min(1,aim.fade+dt/CONFIG.lookFade);
  const span=Math.max(.001,CONFIG.lookCruise-CONFIG.lookStart);
  const t=r<=CONFIG.lookStart?0:clamp((r-CONFIG.lookStart)/span,0,1);
  const gain=(1-(1-t)*(1-t))*aim.fade,speed=CONFIG.lookMax*gain,inv=r>1e-4?1/r:0;
  const vx=-nx*inv*speed,vy=-ny*inv*speed;
  pan.tx+=vx*dt;pan.ty+=vy*dt;pan.vx=vx;pan.vy=vy;aim.vx=vx;aim.vy=vy;aim.gain=gain;aim.speed=speed;clampPan();return speed>.35;
 }
 function beginPointer(event,p,tile){
  pointer={id:event.pointerId,start:p,last:p,t:performance.now(),tx:pan.tx,ty:pan.ty,moved:false,key:tile?.key||tile?.dataset?.key||null,history:[{...p,t:performance.now()}]};manualMoved=false;
 }
 function dragPointer(p,now){
  if(!pointer)return;const dx=p.x-pointer.start.x,dy=p.y-pointer.start.y;
  if(Math.hypot(dx,dy)>5){pointer.moved=true;manualMoved=true;els.stage.classList.add('dragging');}
  pan.tx=pointer.tx+dx*CONFIG.dragGain;pan.ty=pointer.ty+dy*CONFIG.dragGain;clampPan();pointer.last=p;pointer.t=now;pointer.history.push({...p,t:now});pointer.history=pointer.history.filter(x=>now-x.t<90);wake();
 }
 els.stage.addEventListener('pointerdown',event=>{
  if(pointer||event.button!==0||selected||event.target.closest('#detail-layer'))return;pointerStale=false;engage();const p=getWorldPointer(event),tile=event.target.closest('.tile');beginPointer(event,p,tile);els.stage.setPointerCapture(event.pointerId);event.preventDefault();
 });
 els.stage.addEventListener('pointerenter',event=>{if(event.pointerType==='touch'||selected)return;mouseClient={x:event.clientX,y:event.clientY};if(pointerStale)return;if(!inLookView(event.clientX,event.clientY)){stopLook(true);return;}light.inside=true;const p=getWorldPointer(event);setAim(p,event.pointerType);aim.fade=aimRadius(p)<CONFIG.lookStart?1:0;aim.active=false;if(refTime===null){light.tx=p.x;light.ty=p.y;light.targetOpacity=1;wake();}});
 els.stage.addEventListener('pointerleave',event=>{if(pointer||event.pointerType==='touch')return;stopLook(true);if(pointerStale)return;light.inside=false;light.targetOpacity=0;wake();});
 els.stage.addEventListener('pointermove',event=>{
  const hoverPoint=getWorldPointer(event);
  if(pointerStale&&!thawPointer(event)){
   mouseClient={x:event.clientX,y:event.clientY};
   if(pointer&&pointer.id===event.pointerId)dragPointer(hoverPoint,performance.now());
   return;
  }
  const physicalMove=mouseClient.x===null||Math.hypot(event.clientX-mouseClient.x,event.clientY-mouseClient.y)>.5||Math.hypot(event.movementX||0,event.movementY||0)>.5;
  mouseClient={x:event.clientX,y:event.clientY};
  if(event.pointerType!=='touch'&&!selected&&!pointerStale){
   if(!inLookView(event.clientX,event.clientY)){stopLook(true);wake();}
   else {if(refTime!==null&&physicalMove)engage();setAim(hoverPoint,event.pointerType);if(refTime===null){light.inside=true;light.tx=hoverPoint.x;light.ty=hoverPoint.y;light.targetOpacity=1;wake();}}
  }
  if(!pointer||pointer.id!==event.pointerId)return;dragPointer(hoverPoint,performance.now());
 });
 document.addEventListener('pointermove',event=>{
  if(pointerStale||selected||pointer||event.pointerType==='touch')return;
  if((aim.inside||aim.active)&&!inLookView(event.clientX,event.clientY)){stopLook(true);wake();}
 },{passive:true});
 function release(event,cancelled=false){if(!pointer||pointer.id!==event.pointerId)return;const saved=pointer;pointer=null;els.stage.classList.remove('dragging');if(els.stage.hasPointerCapture(event.pointerId))els.stage.releasePointerCapture(event.pointerId);
  if(!cancelled&&!saved.moved&&saved.key){const tile=tiles.get(saved.key);if(tile)openTile(tile);}
  else if(!cancelled&&saved.moved){setFocusCell(null);if(!reduced&&performance.now()-saved.t<100&&saved.history.length>1){const first=saved.history[0],last=saved.history[saved.history.length-1],dt=Math.max((last.t-first.t)/1000,.016);pan.vx=clamp((last.x-first.x)/dt,-1900,1900);pan.vy=clamp((last.y-first.y)/dt,-1900,1900);}}
  wake();
 }
 els.stage.addEventListener('pointerup',e=>release(e));els.stage.addEventListener('pointercancel',e=>release(e,true));
 els.stage.addEventListener('lostpointercapture',e=>{if(pointer&&pointer.id===e.pointerId)release(e,true);});
 /* LOCK: wheel stays free-pan. Do not convert this to one-card snap. */
 els.stage.addEventListener('wheel',event=>{if(selected||event.ctrlKey)return;event.preventDefault();engage();setFocusCell(null);const mult=event.deltaMode===1?16:event.deltaMode===2?H:1;let dx=event.deltaX*mult,dy=event.deltaY*mult;if(event.shiftKey&&Math.abs(dx)<1){dx=dy;dy=0;}pan.tx-=clamp(dx,-500,500)*CONFIG.wheelGain/unit;pan.ty-=clamp(dy,-500,500)*CONFIG.wheelGain/unit;clampPan();wake();},{passive:false});
 els.photo.addEventListener('click',close);els.scrim.addEventListener('click',close);
 els.stage.addEventListener('focusin',event=>{if(event.target===els.stage&&refTime!==null){engage();wake();}});
 /* LOCK: arrows = spatial focus + camera-center. Do not go back to raw pan nudges. */
 function cellUnderPointer(){
  if(mouseClient.x==null||!light.inside)return null;
  const p={x:(mouseClient.x-(els.stage.getBoundingClientRect().left))*els.stage.clientWidth/els.stage.getBoundingClientRect().width/unit,y:(mouseClient.y-els.stage.getBoundingClientRect().top)*els.stage.clientHeight/els.stage.getBoundingClientRect().height/unit};
  for(const t of tiles.values()){
   if(!t.visible||!t.quad)continue;const b=bounds(t.quad);
   if(p.x>=b.x&&p.x<=b.x+b.width&&p.y>=b.y&&p.y<=b.y+b.height)return {c:t.c,r:t.r,i:t.i,key:t.key};
  }
  return null;
 }
 function cellFromActive(){
  const el=document.activeElement;if(!el||!el.classList||!el.classList.contains('tile'))return null;
  const t=tiles.get(el.dataset.key);return t?{c:t.c,r:t.r,i:t.i,key:t.key}:null;
 }
 function resolveFocus(){
  if(focusCell&&projectIndex(focusCell.c,focusCell.r)>=0)return focusCell;
  return cellFromActive()||cellUnderPointer()||nearest();
 }
 function setFocusCell(cell){
  focusCell=cell;
  if(cell)els.stage.setAttribute('aria-activedescendant','tile-'+cell.c+'-'+cell.r);
  else els.stage.removeAttribute('aria-activedescendant');
 }
 function centerOn(c,r){
  pan.vx=0;pan.vy=0;
  pan.tx=288-CONFIG.originX-c*CONFIG.pitchX;
  pan.ty=180-CONFIG.originY-r*CONFIG.pitchY;
  clampPan();
 }
 function overChrome(x,y){
  const el=document.elementFromPoint(x,y);if(!el)return true;
  if(el.closest('#siteLang,.cf-title,#cvBack,.case-view'))return true;
  const back=document.querySelector('body.page-work > a.cv-back');
  return !!(back&&(el===back||back.contains(el)));
 }
 function overContent(x,y){
  const el=document.elementFromPoint(x,y);
  return !!(el&&el.closest('#stage')&&!overChrome(x,y));
 }
 function freezePointer(){
  pointerStale=true;
  staleAt={x:mouseClient.x,y:mouseClient.y};
  aim.active=false;aim.inside=false;aim.gain=0;aim.speed=0;aim.fade=0;
  light.targetOpacity=0;
 }
 function thawPointer(event){
  if(!pointerStale)return true;
  if(event.pointerType==='touch'){pointerStale=false;return true;}
  const moved=Math.hypot(event.movementX||0,event.movementY||0)>=3||(staleAt.x!=null&&Math.hypot(event.clientX-staleAt.x,event.clientY-staleAt.y)>=10);
  if(!moved)return false;
  if(overChrome(event.clientX,event.clientY)||!overContent(event.clientX,event.clientY)||!inLookView(event.clientX,event.clientY))return false;
  pointerStale=false;return true;
 }
 window.jrFreezePointer=freezePointer;
 function stepCard(dc,dr){
  engage();
  const from=resolveFocus();if(!from)return;
  const c=from.c+dc,r=from.r+dr,i=projectIndex(c,r);
  if(i<0){announce('End of work.');return;}
  setFocusCell({c:c,r:r,i:i,key:c+':'+r});
  centerOn(c,r);
  freezePointer();
  if(document.activeElement?.classList?.contains('tile'))els.stage.focus({preventScroll:true});
  else if(document.activeElement===document.body||document.activeElement===document.documentElement)els.stage.focus({preventScroll:true});
  if(projects[i])announce(projects[i].title);
  wake();
 }
 function onGalleryKey(event){
  if(event.ctrlKey||event.metaKey||event.altKey)return;
  const typing=event.target.closest&&event.target.closest('input,textarea,select,[contenteditable="true"]');
  if(typing)return;
  if(selected){
   if(event.key==='Escape'){event.preventDefault();close();return;}
   if(event.key==='Tab'&&event.target.closest('#detail-layer,#stage')){
    const list=[els.photo,...(els.copy.tabIndex===0?[els.copy]:[]),...(!els.link.hidden?[els.link]:[]),els.scrim];
    let i=list.indexOf(document.activeElement);i=mod(i+(event.shiftKey?-1:1),list.length);
    event.preventDefault();list[i].focus({preventScroll:true});
   }
   return;
  }
  if(event.key==='ArrowLeft'){event.preventDefault();stepCard(-1,0);}
  else if(event.key==='ArrowRight'){event.preventDefault();stepCard(1,0);}
  else if(event.key==='ArrowUp'){event.preventDefault();stepCard(0,-1);}
  else if(event.key==='ArrowDown'){event.preventDefault();stepCard(0,1);}
  else if(event.key==='Home'||event.key==='r'||event.key==='R'){event.preventDefault();reset();}
  else if(event.key==='Enter'&&(event.target===els.stage||event.target===document.body||event.target===document.documentElement||event.target.classList.contains('tile'))){event.preventDefault();engage();openTile(focusCell||nearest());}
  else if(event.code==='Space'&&event.target===els.stage){event.preventDefault();playing?pause():playReference();}
 }
 document.addEventListener('keydown',onGalleryKey);
 function resize(){if(layout==='reference'){const scale=Math.min(innerWidth/674,innerHeight/778);els.composition.style.transform=`scale(${scale})`;unit=1;W=576;H=360;CONFIG.originX=77;CONFIG.originY=222;}else{els.composition.style.transform='none';const w=els.stage.clientWidth,h=els.stage.clientHeight;
  const cols=rowCols();
  if(cols){
    /* N cards straddle the midline. Side inset keeps them off the chrome. */
    const span=(cols-1)*CONFIG.pitchX+CONFIG.cardSize;
    const inset=clamp(w*(cols===2?0.08:0.055),cols===2?16:20,cols===2?28:40);
    unit=Math.max(.1,(w-inset*2)/span);W=w/unit;H=h/unit;
    CONFIG.originX=288-(cols-1)*CONFIG.pitchX/2;CONFIG.originY=180;
  }else{
    unit=w<560?w/450:Math.min(w/576,h/360);unit=Math.max(.1,unit);W=w/unit;H=h/unit;
    CONFIG.originX=288;CONFIG.originY=180;
  }
  clampPan();}
  if(refTime!==null)applyReference(refTime);else if(selected)selectionQuad=quadFor(selected.c,selected.r,0);render();wake();}
 function reset(){engage();setFocusCell(null);pointerStale=false;selected=null;selectionQuad=null;spring={p:0,v:0,target:0};pan={x:0,y:0,tx:0,ty:0,vx:0,vy:0};tilt={x:CONFIG.pitch,y:CONFIG.yaw,z:CONFIG.roll};light.targetOpacity=light.inside?1:0;render();wake();}
 function seek(time){playing=false;refTime=clamp(finite(time),0,CONFIG.referenceDuration-.001);applyReference(refTime);render();return getState();}
 function playReference(){if(reduced||!projects.length)return false;refTime=refTime===null?0:refTime;playing=true;wake();return true;}
 function pause(){playing=false;if(raf){cancelAnimationFrame(raf);raf=0;}render();return getState();}
 function setLayout(value){layout=value==='gallery'?'gallery':'reference';document.body.classList.toggle('gallery-only',layout==='gallery');resize();return layout;}
 function setProjects(value){reset();projects=normalize(value);ids=new Map(projects.map((p,i)=>[p.id,i]));tiles.forEach(t=>t.button.remove());tiles.clear();render();announce(projects.length+' projects loaded.');return projects.length;}
 function setMedia(value){blank=value==='blank';document.body.classList.toggle('blank-media',blank);tiles.forEach(t=>{t.image.hidden=blank||!projects[t.i].src;});if(selected)fillDetails();render();}
 function exportHTML(){const doc=document.documentElement.cloneNode(true),data=doc.querySelector('#gallery-data');data.textContent=safeJson({...boot,projects,defaultLayout:layout,blankMedia:blank,autoplay:false});doc.querySelector('#field').replaceChildren();doc.querySelector('#field').removeAttribute('inert');doc.querySelector('#detail-layer').hidden=true;doc.querySelector('#detail-image').removeAttribute('src');doc.querySelector('#detail-title').textContent='';doc.querySelector('#detail-description').textContent='';doc.querySelector('#stage').classList.remove('dragging');const blob=new Blob(['<!doctype html>\n'+doc.outerHTML],{type:'text/html;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='my-curved-gallery.html';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}
 function getState(){return {layout,curvature:'concave-inside-sphere',playing,referenceTime:refTime,light:{x:light.x,y:light.y,opacity:light.opacity,active:light.targetOpacity>0},look:{x:aim.x,y:aim.y,r:aim.r,gain:aim.gain,speed:aim.speed,active:aim.active,inside:aim.inside},pan:{x:pan.x,y:pan.y,targetX:pan.tx,targetY:pan.ty},modal:selected?{id:projects[selected.i]?.id,progress:refTime!==null?refProgress:spring.p,target:spring.target,photo:photoBounds,panel:panelBounds}:null,projectCount:projects.length,domTiles:tiles.size,visibleTiles:[...tiles.values()].filter(t=>t.visible).length,reducedMotion:reduced,blankMedia:blank,renderCount};}
 window.Gallery=Object.freeze({getState,getProjects:()=>projects.map(p=>({...p})),open:openProject,close,reset,seek,playReference,pause,setLayout,setMedia,setProjects,exportHTML,panTo:(x,y,{instant=false}={})=>{engage();if(selected)return false;pan.tx=finite(x);pan.ty=finite(y);if(instant){pan.x=pan.tx;pan.y=pan.ty;tilt={x:CONFIG.pitch,y:CONFIG.yaw,z:CONFIG.roll};render();}wake();return true;},getGeometry:()=>[...tiles.values()].filter(t=>t.visible).map(t=>({id:projects[t.i].id,key:t.key,c:t.c,r:t.r,quad:t.quad.map(p=>p.slice()),bounds:bounds(t.quad)}))});
 new ResizeObserver(resize).observe(els.stage);window.addEventListener('resize',resize);
 media.addEventListener('change',event=>{reduced=event.matches;if(reduced){engage();if(selected)spring.p=spring.target;pan.vx=pan.vy=0;pan.x=pan.tx;pan.y=pan.ty;}wake();});
 function onBreak(){if(layout==='gallery'){pan.tx=pan.x=0;pan.ty=pan.y=0;pan.vx=0;pan.vy=0;}resize();}
 phoneMQ.addEventListener('change',onBreak);
 tabletMQ.addEventListener('change',onBreak);
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;lastTime=0;}else{freezePointer();wake();}});
 window.addEventListener('pageshow',freezePointer);
 window.addEventListener('focus',freezePointer);
 freezePointer();
 resize();if(qp.has('t'))seek(finite(qp.get('t')));else if(qp.get('replay')==='1'||(boot.autoplay&&qp.get('replay')!=='0'&&!reduced))playReference();
 document.documentElement.dataset.ready='true';
})();
