// Keep the incoming space's first snapshot complete. Bounded for offline/failures.
const data=document.getElementById('rings-data');
if(data){
  let timer;
  const assets=JSON.parse(data.textContent).projects.map(project=>{
    const image=new Image();image.src=project.src;return image.decode().catch(()=>{});
  });
  await Promise.race([Promise.all([...assets,document.fonts.ready]),new Promise(resolve=>timer=setTimeout(resolve,1800))]);
  clearTimeout(timer);
  window.dispatchEvent(new Event('portfolio:space-ready'));
}
