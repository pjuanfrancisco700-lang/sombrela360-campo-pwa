const CACHE = "sombrela360-v4.0.0";

const STATIC = [
  "./",
  "./index.html",
  "./styles.css?v=4.0.0",
  "./config.js?v=4.0.0",
  "./app.js?v=4.0.0",
  "./manifest.json",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/background-app.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(STATIC))
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key =>
            key !== CACHE &&
            (
              key.startsWith("sombrela360-") ||
              key.startsWith("sombrela365-")
            )
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

  // Solo manejar solicitudes GET del mismo origen.
  // Las peticiones a Google Apps Script u otros servicios externos
  // continúan directamente por internet.
  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin
  ) {
    return;
  }

  // Navegación: primero internet y, si falla, usar el index almacenado.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const clone = response.clone();

            caches.open(CACHE).then(cache => {
              cache.put("./index.html", clone);
            });
          }

          return response;
        })
        .catch(() => caches.match("./index.html"))
    );

    return;
  }

  // Archivos de la app: primero internet.
  // Si no hay conexión, usar la copia almacenada.
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response && response.ok) {
          const clone = response.clone();

          caches.open(CACHE).then(cache => {
            cache.put(request, clone);
          });
        }

        return response;
      })
      .catch(() => caches.match(request))
  );
});
