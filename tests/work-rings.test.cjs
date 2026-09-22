const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'work.html'),'utf8');
const data=html.match(/<script[^>]+id="rings-data"[^>]*>([\s\S]*?)<\/script>/)[1];

// Controller-level tests. This is deliberately not a claim of physical-device
// or GPU rendering coverage; layout is also inspected in the preview browser.
function fixture({width=1280,height=720,touch=false,reduced=false}={}){
  class El{
    constructor(){this.children=[];this.dataset={};this.attrs={};this.events={};this.textContent='';this.offsetWidth=220;this.offsetHeight=64;
      const classes=new Set();this.classList={add:(...s)=>s.forEach(v=>classes.add(v)),remove:(...s)=>s.forEach(v=>classes.delete(v)),contains:s=>classes.has(s),toggle:(s,on)=>{if(on)classes.add(s);else classes.delete(s);}};
      this.style={setProperty(k,v){this[k]=v;}};
    }
    append(...els){this.children.push(...els);els.forEach(e=>e.parent=this);}
    setAttribute(k,v){this.attrs[k]=v;}
    addEventListener(k,f){(this.events[k]??=[]).push(f);}
    fire(k,e={}){for(const f of this.events[k]||[])f({preventDefault(){},...e});}
    remove(){this.parent.children=this.parent.children.filter(e=>e!==this);}
    getBoundingClientRect(){return {left:500,top:180,bottom:500,width:220,height:320};}
    focus(){document.activeElement=this;this.fire('focus');}
    closest(){return null;}
    hasPointerCapture(){return false;}
    setPointerCapture(){}
    releasePointerCapture(){}
  }
  const els=Object.fromEntries(['ringsViewport','ringsField','ringsRoom','ringsCount','ringsIntro','rings-data'].map(id=>[id,new El()]));
  els.ringsViewport.clientWidth=width;els.ringsViewport.clientHeight=height;els['rings-data'].textContent=data;
  els.ringsRoom.getContext=()=>new Proxy({createRadialGradient:()=>({addColorStop(){}})},{get:(o,k)=>o[k]||(()=>{})});
  const document={getElementById:id=>els[id],createElement:()=>new El(),body:new El(),activeElement:null,addEventListener(){}};
  const window={};const opened=[];window.jrOpenCase=(id,button)=>{opened.push({id,button});return Promise.resolve();};
  let now=0,raf;const globalEvents={};
  const context={document,window,matchMedia:q=>({matches:q.includes('reduced')?reduced:!touch,addEventListener(){}}),performance:{now:()=>now},requestAnimationFrame:f=>(raf=f,1),cancelAnimationFrame(){},addEventListener:(k,f)=>globalEvents[k]=f,setTimeout,clearTimeout,devicePixelRatio:1,location:{}};
  vm.runInNewContext(fs.readFileSync(path.join(root,'js/work-rings.js'),'utf8'),context);
  function tick(n=1){for(let i=0;i<n;i++){now+=1000/60;raf(now);}}
  const viewport=els.ringsViewport;
  return {els,viewport,window,opened,tick,progress:()=>+viewport.dataset.progress,
    label:viewport.children.find(e=>e.className.includes('hover-label')),
    pause:viewport.children.find(e=>e.className==='rings__pause'),
    current:()=>els.ringsField.children.find(e=>e.attrs['aria-current']==='true')};
}
test('auto and forward wheel keep the same continuous direction; pause is explicit',()=>{
  const f=fixture();f.tick(120);assert(f.progress()>.2);
  const before=f.progress();f.viewport.fire('wheel',{deltaY:100,deltaMode:0});f.tick(60);assert(f.progress()>before+.2);
  f.pause.fire('click');const stopped=f.progress();f.tick(120);assert.equal(f.progress(),stopped);
  f.pause.fire('click');f.tick(60);assert(f.progress()>stopped);
});
test('content cycles no longer share an identical rotation',()=>{
  const f=fixture();f.tick();
  const visible=f.els.ringsField.children.filter(e=>e.style.transform);
  const a=visible.find(e=>visible.some(other=>other.dataset.sequence===e.dataset.sequence+10));
  const b=visible.find(e=>e.dataset.sequence===a.dataset.sequence+10);
  const angle=e=>+e.style.transform.match(/rotateY\(([-.\d]+)rad\)/)[1];
  const difference=Math.abs(angle(a)-angle(b))%(Math.PI*2);
  assert(difference>.5 && difference<5.8);
  assert.equal(f.els.ringsField.children.filter(e=>e.attrs['aria-hidden']==='false').length,1);
});
test('hover slows but never freezes; leaving releases the caption',async()=>{
  const normal=fixture();normal.tick(180);const normalTravel=normal.progress();
  const f=fixture();f.current().fire('pointerenter',{pointerType:'mouse',clientX:620,clientY:360});f.tick(180);
  assert(f.progress()>0);assert(f.progress()<normalTravel*.6);assert(f.label.classList.contains('is-visible'));
  f.current().fire('pointerleave');await new Promise(r=>setTimeout(r,80));f.tick();assert(!f.label.classList.contains('is-visible'));
});
test('touch action position remains constant across different cards and fits the viewport',()=>{
  for(const [width,height] of [[320,568],[390,844],[768,1024],[1024,768],[844,390]]){
    const f=fixture({width,height,touch:true});const top=parseFloat(f.viewport.style['--touch-action-top']);
    assert(top>=0 && top+64<=height-50,`${width}×${height}: action fits`);
    const actionWidth=parseFloat(f.viewport.style['--touch-action-width']);assert(actionWidth+112<=width);
    f.tick(600);assert.equal(parseFloat(f.viewport.style['--touch-action-top']),top);
  }
});
test('touch opens the fragment pressed, even when the central card changes before release',()=>{
  const f=fixture({width:390,height:844,touch:true});f.tick();const pressed=f.current();
  f.label.fire('pointerdown');f.tick(360);assert.notEqual(f.current(),pressed);
  f.label.fire('click');assert.equal(f.opened[0].button,pressed);
});
test('reduced motion and restored focus do not introduce automatic travel or snapping',()=>{
  const f=fixture({reduced:true});f.tick(120);assert.equal(f.progress(),0);
  f.viewport.fire('wheel',{deltaY:137,deltaMode:0});f.tick();assert.equal(f.progress(),.343);
  f.window.jrSpace={restoringFocus:true};f.current().focus();f.tick();assert.equal(f.progress(),.343);
});
test('desktop peak size is unchanged; the helix pitch increases by ten percent',()=>{
  const f=fixture();
  assert.equal(+f.viewport.dataset.frontScale,1.16);
  assert(Math.abs(+f.viewport.dataset.cycleHeight-2.09*.44*10)<.001);
});
test('touch foreground grows without changing rear geometry or covering the CTA',()=>{
  for(const [width,height] of [[320,568],[390,844],[768,1024],[1024,768],[1366,1024],[844,390]]){
    const f=fixture({width,height,touch:true});
    const front=+f.viewport.dataset.frontHeight,scale=+f.viewport.dataset.frontScale;
    const top=parseFloat(f.viewport.style['--touch-action-top']);
    assert(scale>=1.16 && scale<=1.462);
    assert(front<=height-288+.1);
    assert(top>=height/2+front/2+17.9);
    if(height>700)assert(scale>1.16,`${width}×${height}: foreground enlarged`);
  }
});
test('motion control keeps its decorative icon and readable name through toggles',()=>{
  const f=fixture();const [icon,copy]=f.pause.children;
  assert.equal(icon.attrs['aria-hidden'],'true');assert.match(icon.innerHTML,/<rect/);assert.equal(copy.textContent,'Pause motion');
  f.pause.fire('click');assert.match(icon.innerHTML,/<path/);assert.equal(copy.textContent,'Resume motion');
  f.pause.fire('click');assert.match(icon.innerHTML,/<rect/);assert.equal(copy.textContent,'Pause motion');
});
