/* My Financial Budget — offline cache (version 20261003162622) */
const CACHE='mfb-20261003162622';
const FILES=['./','./manifest.webmanifest?v=20261003162622','./apple-touch-icon.png?v=20261003162622','./icon-192.png?v=20261003162622','./icon-512.png?v=20261003162622'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==CACHE).map(n=>caches.delete(n)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET'||new URL(req.url).origin!==location.origin) return;
  if(req.mode==='navigate'){
    e.respondWith(fetch(req,{cache:'no-store'}).then(res=>{ const c=res.clone(); caches.open(CACHE).then(x=>x.put('./',c)); return res; })
      .catch(()=>caches.match('./')));
    return;
  }
  e.respondWith(caches.match(req).then(r=>r||fetch(req).then(res=>{ if(res.ok){ const c=res.clone(); caches.open(CACHE).then(x=>x.put(req,c)); } return res; })));
});
