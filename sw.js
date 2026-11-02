// Offline cache. Pages + JSON manifests: network-first. Scene videos / Range requests: network only. Other static assets: cache-first.
// CACHE gets a unique suffix on every build (vite.config.ts stamps the build id), so old caches are dropped.
const CACHE = 'eve-v3-mvzcmqb3';
const CORE = ['./', './index.html', './manifest.webmanifest', './assets/eve/eve_neutral.webp', './icons/icon-192.png'];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
// pages/manifests skip the HTTP cache (GitHub Pages sends max-age=600) so a new build shows up on the next launch
const fresh = (req) => (req.mode === 'navigate' ? fetch(req.url, { cache: 'no-cache', credentials: 'same-origin' }) : fetch(req));
const networkFirst = (req) => fresh(req).then((r) => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); } return r; })
  .catch(() => caches.match(req).then((r) => r || (req.mode === 'navigate' ? caches.match('./index.html') : Response.error())));
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  // video: never cached/precached and never answered from cache — the browser streams it with Range requests
  // (206 responses), which Cache API can't serve correctly (breaks iOS Safari). Straight to the network.
  // build id check (src/systems/update.ts): always straight to the network, never cached
  if (new URL(req.url).pathname.endsWith('/version.json')) return;
  if (req.headers.has('range') || /\/assets\/scenes\/[^/]+\.(mp4|webm)$/i.test(new URL(req.url).pathname)) return;
  if (req.mode === 'navigate' || new URL(req.url).pathname.endsWith('.json')) { e.respondWith(networkFirst(req)); return; }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => {
    if (r.ok) { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(req, cp)); }
    return r;
  })));
});
