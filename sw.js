// Offline cache. Pages + JSON manifests: network-first. Other static assets: cache-first.
// CACHE gets a unique suffix on every build (vite.config.ts stamps the build id), so old caches are dropped.
const CACHE = 'eve-v2-mvxnrvnk';
const CORE = ['./', './index.html', './manifest.webmanifest', './assets/eve/eve_neutral.webp', './icons/icon-192.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
const networkFirst = (req) => fetch(req).then((r) => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); } return r; })
  .catch(() => caches.match(req).then((r) => r || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate' || new URL(req.url).pathname.endsWith('.json')) { e.respondWith(networkFirst(req)); return; }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => {
    if (r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); }
    return r;
  })));
});
