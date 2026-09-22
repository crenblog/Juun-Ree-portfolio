/* Head bootstrap: retain the solid cover across real document navigation. */
(() => {
  try{
    const key='jr-space-entry',entry=JSON.parse(sessionStorage.getItem(key)||'null');
    sessionStorage.removeItem(key);
    const restoring=performance.getEntriesByType('navigation')[0]?.type==='back_forward';
    if((entry&&entry.href===location.href&&Date.now()-entry.at<15000)||restoring){
      document.documentElement.classList.add('space-entering');
      setTimeout(()=>document.documentElement.classList.remove('space-entering'),6000);
    }
  }catch{}
})();
