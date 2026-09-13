(function(){
  var html=document.documentElement;
  window.addEventListener('pageshow',function(){html.classList.remove('is-leaving');});
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  document.addEventListener('click',function(e){
    if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
    var a=e.target.closest('a[href]');
    if(!a||a.target==='_blank'||a.download)return;
    var url;try{url=new URL(a.href,location.href);}catch(err){return;}
    if(url.origin!==location.origin||url.pathname+url.search===location.pathname+location.search)return;
    if(typeof jrIsCaseHref==='function'&&jrIsCaseHref(url.href)&&!document.documentElement.classList.contains('page-case'))return;
    e.preventDefault();
    if(html.classList.contains('is-leaving'))return;
    html.classList.add('is-leaving');
    var gone=false;
    function go(){if(gone)return;gone=true;location.href=url.href;}
    document.body.addEventListener('animationend',function(ev){if(ev.target===document.body&&ev.animationName==='jr-page-out')go();});
    setTimeout(go,280);
  });
})();
(function(){
  var here=document.currentScript;
  if(!here||!here.src)return;
  var s=document.createElement('script');
  s.src=here.src.replace(/page\.js(\?.*)?$/,'scrubber.js');
  s.async=false;
  here.parentNode.insertBefore(s,here.nextSibling);
})();
