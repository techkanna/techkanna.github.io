const cacheName = 'v1';
const cacheAssets = [
  'index.html',
  'about.html',
  '/assets/css/style.min.css',
  '/assets/js/main.js',
];
// call install event
self.addEventListener('install', (e) => {
  console.log('installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('caching files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate event
self.addEventListener('activate', (e) => {
  console.log('activated');

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== cacheName) {
              console.log('clearing old cache');
              return caches.delete(cache);
            }
          })
        )
      })
  );
});

// call fetch event
self.addEventListener('fetch', e => {
  console.log('fetching');
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  )
});