const CACHE = "sombrela360-v4.1.0";

const STATIC = [
  "./",
  "./index.html",
  "./styles.css?v=4.1.0",
  "./config.js?v=4.1.0",
  "./app.js?v=4.1.0",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/background-app.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(STATIC)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key =>
            key !== CACHE &&
            (key.startsWith("sombrela360-") || key.startsWith("sombrela365-"))
          )
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  // Apps Script y cualquier servicio externo quedan fuera del Service Worker.
  if (request.method !== "GET" || url.origin !== self.location.origin) return;

  // Navegación: intentamos red primero para detectar rápidamente una nueva
  // versión del HTML; si no hay conexión, abrimos la copia instalada.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(cache => cache.put("./index.html", clone));
          }
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Archivos versionados de la PWA: caché primero. Esto evita esperar a la
  // red cada vez que se abre la app. Al cambiar ?v= se obtiene el archivo nuevo.
  const isVersionedStatic =
    url.pathname.endsWith("/app.js") ||
    url.pathname.endsWith("/styles.css") ||
    url.pathname.endsWith("/config.js") ||
    url.pathname.endsWith("/manifest.json") ||
    url.pathname.includes("/assets/");

  if (isVersionedStatic) {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response && response.ok) {
            const clone = response.clone();
            caches.open(CACHE).then(cache => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
