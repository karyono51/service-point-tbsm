/* Tombol "Pasang aplikasi" + pemberitahuan versi baru. Berdiri sendiri, tidak mengubah app.js. */
(function () {
  var dip = null, bar = null;
  function standalone() {
    return matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  }
  function show(msg, label, fn) {
    if (bar) bar.remove();
    bar = document.createElement('div');
    bar.setAttribute('role', 'status');
    bar.style.cssText = 'position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:9999;' +
      'background:#0c5a41;color:#fff;padding:10px 12px;border-radius:12px;display:flex;gap:10px;align-items:center;' +
      'box-shadow:0 4px 16px rgba(0,0,0,.3);font:500 14px/1.3 system-ui,sans-serif;max-width:480px;margin:auto';
    var t = document.createElement('span'); t.style.flex = '1'; t.textContent = msg; bar.appendChild(t);
    if (label) {
      var b = document.createElement('button'); b.textContent = label;
      b.style.cssText = 'background:#fff;color:#0c5a41;border:0;border-radius:8px;padding:7px 12px;font-weight:700';
      b.onclick = function () { fn(); }; bar.appendChild(b);
    }
    var x = document.createElement('button'); x.textContent = '✕'; x.setAttribute('aria-label', 'Tutup');
    x.style.cssText = 'background:none;border:0;color:#fff;font-size:16px;padding:4px 6px';
    x.onclick = function () { bar.remove(); bar = null; }; bar.appendChild(x);
    document.body.appendChild(bar);
  }
  addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); dip = e;
    try { if (localStorage.getItem('bc_noinst') === '1' || standalone()) return; } catch (_) {}
    show('Pasang Business Center di layar utama agar bisa dibuka seperti aplikasi.', 'Pasang', function () {
      dip.prompt(); dip.userChoice.then(function () { dip = null; if (bar) { bar.remove(); bar = null; } });
    });
  });
  addEventListener('appinstalled', function () { if (bar) { bar.remove(); bar = null; } });
  /* iOS Safari tidak punya beforeinstallprompt: beri petunjuk sekali saja */
  var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !navigator.standalone;
  if (ios) addEventListener('load', function () {
    try { if (localStorage.getItem('bc_iosHint')) return; localStorage.setItem('bc_iosHint', '1'); } catch (_) {}
    setTimeout(function () { show('Untuk memasang: ketuk tombol Bagikan, lalu “Tambah ke Layar Utama”.'); }, 3000);
  });
  /* versi baru: tawarkan muat ulang, jangan paksa saat pengguna sedang mengisi form */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function (reg) {
      function apply() {
        var w = reg.waiting;
        if (!w) { location.reload(); return; }
        var done = false;
        navigator.serviceWorker.addEventListener('controllerchange', function () {
          if (done) return; done = true; location.reload();
        });
        w.postMessage('SKIP_WAITING');
      }
      function watch(w) {
        w.addEventListener('statechange', function () {
          if (w.state === 'installed' && navigator.serviceWorker.controller)
            show('Versi baru tersedia.', 'Muat ulang', apply);
        });
      }
      if (reg.waiting && navigator.serviceWorker.controller) show('Versi baru tersedia.', 'Muat ulang', apply);
      reg.addEventListener('updatefound', function () { if (reg.installing) watch(reg.installing); });
      setInterval(function () { reg.update().catch(function () {}); }, 30 * 60 * 1000);
    });
  }
})();
