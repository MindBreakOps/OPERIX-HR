const CACHE_NAME = 'operix-staff-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/staff-app.html',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap',
  'https://raw.githubusercontent.com/MindBreakOps/LX-Permits/main/hr.png'
];

// Install event - cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
	caches.open(CACHE_NAME)
	  .then(cache => cache.addAll(ASSETS_TO_CACHE))
	  .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
	caches.keys().then(cacheNames => {
	  return Promise.all(
		cacheNames.map(cache => {
		  if (cache !== CACHE_NAME) {
			return caches.delete(cache);
		  }
		})
	  );
	})
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', event => {
  event.respondWith(
	fetch(event.request).catch(() => {
	  return caches.match(event.request);
	})
  );
});

