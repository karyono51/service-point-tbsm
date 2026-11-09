/* Service worker: aplikasi tetap bisa dibuka tanpa internet.
   - Berkas situs sendiri: jaringan dulu, cadangan dari cache.
   - Pustaka CDN (Appwrite, jsPDF, Excel): disimpan di cache, dipakai saat offline.
   - API Appwrite dan permintaan non-GET tidak disentuh. */
var CACHE = 'bc-tbsm-v63';
var SHELL = ['./', 'index.html', 'style.css?v=45', 'app.js?v=45', 'config.js', 'manifest.json', 'icon-192.png', 'icon-512.png'];
var CDN = [
  'https://cdn.jsdelivr.net/npm/appwrite@20.0.0',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];
var CDN_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com'];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      var jobs = [c.addAll(SHELL).catch(function () {})];
      CDN.forEach(function (u) { jobs.push(c.add(u).catch(function () {})); });
      return Promise.all(jobs);
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) {
        return Promise.all(ks.filter(function (k) { return k !== CACHE; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);
  if (u.origin === self.location.origin) {
    e.respondWith(
      fetch(r, { cache: 'no-cache' }).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(r, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match(r).then(function (m) {
          return m || (r.mode === 'navigate' ? caches.match('index.html') : undefined);
        });
      })
    );
    return;
  }
  if (CDN_HOSTS.indexOf(u.hostname) > -1) {
    /* versi pustaka dipatok, jadi cache dulu lalu jaringan */
    e.respondWith(
      caches.match(r.url).then(function (m) {
        if (m) return m;
        return fetch(r).then(function (res) {
          if (res && (res.ok || res.type === 'opaque')) {
            var copy = res.clone();
            caches.open(CACHE).then(function (c) { c.put(r.url, copy); });
          }
          return res;
        });
      })
    );
  }
});
