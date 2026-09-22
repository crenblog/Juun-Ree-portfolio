const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../js/space-entry.js'),'utf8');
function fixture({href='https://portfolio.test/index.html',marker=null,reduced=false,native=true}={}){
  const events={},storage=new Map(),classes=new Set(),html={dataset:{},classList:{add:x=>classes.add(x),remove:x=>classes.delete(x)}};
  if(marker)storage.set('jr-space-entry',JSON.stringify(marker));
  const window={addEventListener:(name,fn)=>events[name]=fn,jrSpace:{busy:false,releaseNative(){this.busy=false;}}};
  if(native){window.PageSwapEvent=function(){};window.PageRevealEvent=function(){};}
  vm.runInNewContext(source,{window,document:{documentElement:html},location:{href},matchMedia:()=>({matches:reduced}),URL,Date,sessionStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},setTimeout:()=>0});
  return {window,html,classes,storage,events};
}
test('only peer spaces receive horizontal direction; details stay overlays',()=>{
  const f=fixture(),route=f.window.jrSpaceRoute;
  assert.equal(route.direction('index.html','work.html'),'forward');assert.equal(route.direction('work.html','index.html'),'back');
  for(const page of ['biennale.html','loop.html','off.html','sema-preview.html'])assert.equal(route.direction(page,'work.html'),'');
});
test('native entry does not add an ivory curtain over the connected snapshots',()=>{
  const href='https://portfolio.test/work.html';
  const f=fixture({href,marker:{href,direction:'forward',native:true,at:Date.now()}});
  assert.equal(f.html.dataset.spaceDirection,'forward');assert(!f.classes.has('space-entering'));assert(f.window.jrNativeSpaceEntry);
});
test('unsupported browsers retain a bounded directional curtain fallback',()=>{
  const href='https://portfolio.test/work.html';
  const f=fixture({href,native:false,marker:{href,direction:'forward',native:false,at:Date.now()}});
  assert(f.classes.has('space-entering'));assert.equal(f.html.dataset.spaceTransitionSupport,'fallback');
});
test('bfcache entry takes the fresh reverse direction instead of its old forward direction',async()=>{
  const f=fixture();f.html.dataset.spaceDirection='forward';
  f.storage.set('jr-space-entry',JSON.stringify({href:'https://portfolio.test/index.html',direction:'back',at:Date.now()}));
  let finish;const finished=new Promise(resolve=>finish=resolve);
  f.events.pagereveal({viewTransition:{finished,skipTransition(){throw Error('unexpected skip');}}});
  assert.equal(f.html.dataset.spaceDirection,'back');assert(f.window.jrSpace.busy);
  finish();await new Promise(resolve=>setImmediate(resolve));assert(!f.window.jrSpace.busy);assert.equal(f.html.dataset.spaceDirection,undefined);
});
test('reduced motion and detail navigation skip native snapshot animation',()=>{
  for(const reduced of [true,false]){
    const f=fixture({reduced});let skipped=false;
    f.events.pageswap({activation:{entry:{url:'https://portfolio.test/biennale.html'}},viewTransition:{skipTransition(){skipped=true;}}});
    assert(skipped);
  }
});
