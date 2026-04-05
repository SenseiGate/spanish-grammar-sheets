const CACHE_NAME = "fichas-espanol-cache-v1";

const FILES_TO_CACHE = [
  "/Fichas-Espanol/",
  "/Fichas-Espanol/index.html",
  "/Fichas-Espanol/a1/index.html",
  "/Fichas-Espanol/a2/index.html",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png"
];

// Install
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});