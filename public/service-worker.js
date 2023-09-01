const CACHE_NAME = 'ecommerce-app-cache';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './favicon.ico',
    './logo192.png',
    './logo512.png',
    './service-worker.js',
    './static/js/787.9eb6d22a.chunk.js',
    './static/js/787.9eb6d22a.chunk.js.map',
    './static/js/main.8a2efafa.js',
    './static/js/main.8a2efafa.js.map',
    './static/js/main.8a2efafa.js.LICENSE.txt',
    './static/css/main.e6c13ad2.css',
    './static/css/main.e6c13ad2.css.map',
];


self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
            .catch(() => {
                return caches.match('./index.html');
            })
    );
});
