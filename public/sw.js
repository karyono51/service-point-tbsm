/* Service worker Business Center TBSM
   - Berkas situs sendiri: jaringan dulu (batas 4 detik), lalu cadangan dari cache.
   - Pustaka CDN & font: cache dulu, jaringan kalau belum ada.
   - API Appwrite dan permintaan non-GET tidak disentuh. */
var VER = 'v84';
var CACHE = 'bc-tbsm-' + VER;
var NET_TIMEOUT = 4000;
var SHELL = ['./', 'index.html', 'style.css?v=47', 'app.js?v=48', 'pwa.js?v=1', 'config.js',
  'manifest.json', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
var CDN = [
  'https://cdn.jsdelivr.net/npm/appwrite@20.0.0',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];
var CDN_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'fonts.googleapis.com', 'fonts.gstatic.com'];

/* Tiap berkas disimpan sendiri-sendiri: satu yang gagal (mis. config.js) tidak membatalkan yang lain. */
function put(c, u, mode) {
  return fetch(new Request(u, mode ? { mode: mode } : {}))
    .then(function (res) { if (res && (res.ok || res.type === 'opaque')) return c.put(u, res); })
    .catch(function () {});
}

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      return Promise.all(SHELL.map(function (u) { return put(c, u); })
        .concat(CDN.map(function (u) { return put(c, u, 'cors'); })));
    })
  );
});

self.addEventListener('message', function (e) {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) {
        return Promise.all(ks.filter(function (k) { return k.indexOf('bc-tbsm-') === 0 && k !== CACHE; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

function fromCache(r) {
  return caches.match(r).then(function (m) {
    if (m) return m;
    if (r.mode === 'navigate') return caches.match('index.html').then(function (x) { return x || caches.match('./'); });
    return Response.error();
  });
}

function networkFirst(r) {
  return new Promise(function (resolve) {
    var done = false;
    var timer = setTimeout(function () {
      /* jaringan lambat/menggantung: pakai cache kalau ada, kalau tidak tunggu jaringan */
      caches.match(r).then(function (m) { if (m && !done) { done = true; resolve(m); } });
    }, NET_TIMEOUT);
    fetch(r, { cache: 'no-cache' }).then(function (res) {
      clearTimeout(timer);
      if (res && res.ok) {
        var copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(r, copy); });
      }
      if (!done) { done = true; resolve(res && res.status >= 500 ? fromCache(r).then(function (m) { return m.type === 'error' ? res : m; }) : res); }
    }).catch(function () {
      clearTimeout(timer);
      if (!done) { done = true; resolve(fromCache(r)); }
    });
  });
}

self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);
  if (u.origin === self.location.origin) {
    e.respondWith(networkFirst(r));
    return;
  }
  if (CDN_HOSTS.indexOf(u.hostname) > -1) {
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
