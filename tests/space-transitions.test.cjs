const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../js/space-transitions.js'),'utf8');
const turn=()=>new Promise(resolve=>setImmediate(resolve));
function fixture({reduced=false,images=[],incoming=false}={}){
  const classes=new Set(incoming?['space-entering']:[]),events={},animations=[],navigation=[],storage=new Map();
  const sheet={style:{},setAttribute(){},animate(frames,options){animations.push({frames,options});return {finished:Promise.resolve(),cancel(){}};}};
  const html={classList:{contains:k=>classes.has(k),add:k=>classes.add(k),remove:k=>classes.delete(k)}};
  const document={documentElement:html,createElement:()=>sheet,body:{append(){}},querySelectorAll:()=>images,fonts:{ready:Promise.resolve()},readyState:'complete',addEventListener(){}};
  const window={addEventListener:(name,fn)=>events[name]=fn};
  const context={document,window,matchMedia:()=>({matches:reduced}),requestAnimationFrame:fn=>queueMicrotask(fn),innerHeight:800,Promise,URL,Date,location:{href:'https://portfolio.test/work.html',assign:href=>navigation.push(href)},sessionStorage:{setItem:(k,v)=>storage.set(k,v)},setTimeout:(fn,ms)=>{const timer=setTimeout(fn,ms);timer.unref();return timer;},clearTimeout};
  vm.runInNewContext(source,context);
  return {api:window.jrSpace,sheet,classes,animations,navigation,storage,events};
}
test('cover precedes content mutation; reveal waits for first-view image decoding',async()=>{
  let decode;const pending=new Promise(resolve=>decode=resolve);
  const f=fixture({images:[{getBoundingClientRect:()=>({width:300,height:400,top:100,bottom:500}),decode:()=>pending}]});
  let changed=false;
  const finished=f.api.run(()=>{changed=true;assert.equal(f.sheet.style.transform,'translateY(0)');assert(f.api.busy);});
  await turn();assert(changed);assert.equal(f.animations.length,1);assert(f.api.busy);
  decode();await finished;
  assert.equal(f.animations.length,2);
  assert.equal(f.animations[0].frames[0].transform,'translateY(100%)');
  assert.equal(f.animations[0].frames[1].transform,'translateY(0)');
  assert.equal(f.animations[1].frames[1].transform,'translateY(100%)');
  assert.equal(f.animations[0].options.duration,280);assert.equal(f.animations[1].options.duration,360);
  assert(!f.api.busy);assert(!f.classes.has('space-busy'));
});
test('failed media and reduced motion cannot trap the user behind the sheet',async()=>{
  const f=fixture({reduced:true,images:[{getBoundingClientRect:()=>({width:30,height:40,top:10,bottom:50}),decode:()=>Promise.reject(Error('image missing'))}]});
  await f.api.run(()=>{});assert.equal(f.animations.length,0);assert(!f.api.busy);assert.equal(f.sheet.style.transform,'translateY(100%)');
  await assert.rejects(f.api.run(()=>{throw Error('failed view');}));assert(!f.api.busy);
});
test('duplicate clicks are ignored and queued history actions run after the current transition',async()=>{
  const f=fixture(),order=[];
  const first=f.api.run(()=>order.push('first'));
  const duplicate=f.api.run(()=>order.push('duplicate'));
  const back=f.api.run(()=>order.push('back'),{queue:true});
  await Promise.all([first,duplicate,back]);assert.deepEqual(order,['first','back']);
});
test('document navigation stores a matching entry marker only after covering',async()=>{
  const f=fixture();await f.api.navigate('index.html');
  assert.equal(f.sheet.style.transform,'translateY(0)');assert.deepEqual(f.navigation,['index.html']);
  assert.equal(JSON.parse(f.storage.get('jr-space-entry')).href,'https://portfolio.test/index.html');
});
test('incoming document and bfcache restore reveal without another upward cover',async()=>{
  const f=fixture({incoming:true});await turn();await turn();assert(!f.api.busy);
  assert.equal(f.animations.length,1);assert.equal(f.animations[0].frames[0].transform,'translateY(0)');
  f.events.pageshow({persisted:true});await turn();await turn();assert(!f.api.busy);assert.equal(f.animations.length,2);
});
test('all public portfolio pages include an early entry cover and shared transition controller',()=>{
  for(const file of ['index','work','biennale','loop','off','archive','signal','quiet','frame','route','hold','field']){
    const html=fs.readFileSync(path.join(__dirname,'../'+file+'.html'),'utf8');
    assert(html.indexOf('js/space-entry.js')<html.indexOf('</head>'),file);
    assert(html.indexOf('js/space-transitions.js')<html.indexOf('js/cases.js'),file);
    assert.match(html,/js\/page\.js\?v=space-sheet-10/);
  }
});
