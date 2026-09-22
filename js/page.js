(function(){
  var html=document.documentElement;
  window.addEventListener('pageshow',function(){html.classList.remove('is-leaving');});
  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    var a=e.target.closest('a[href]');
    if(!a||a.target==='_blank'||a.download)return;
    var url;try{url=new URL(a.href,location.href);}catch(err){return;}
    if(url.origin!==location.origin||url.pathname+url.search===location.pathname+location.search)return;
    if(typeof jrIsCaseHref==='function'&&jrIsCaseHref(url.href)&&!document.documentElement.classList.contains('page-case'))return;
    e.preventDefault();
    if(window.jrSpace){window.jrSpace.navigate(url.href);return;}
    location.href=url.href;
  });
})();
(function(){
  var here=document.currentScript;
  if(document.body.classList.contains('sema-preview'))return;
  if(!here||!here.src)return;
  var s=document.createElement('script');
  s.src=here.src.replace(/page\.js(\?.*)?$/,'scrubber.js');
  s.async=false;
  here.parentNode.insertBefore(s,here.nextSibling);
})();
