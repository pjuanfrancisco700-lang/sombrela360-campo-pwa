const CACHE = 'sombrela360-campo-v1';
const CORE = ['./','./index.html','./manifest.webmanifest','./apple-touch-icon.png','./icons/app-192.png','./icons/app-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE))); self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(k => k!==CACHE && caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then(r => { const copy=r.clone(); caches.open(CACHE).then(c=>c.put('./index.html',copy)); return r; }).catch(()=>caches.match('./index.html')));
    return;
  }
  if (url.origin === location.origin) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(net => { if (e.request.method==='GET'){ const copy=net.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); } return net; })));
  }
});
