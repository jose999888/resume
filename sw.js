const version = 'v123'
const CURRENT_CACHE = `vue-pwa-${version}`
const urlToCache = []
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CURRENT_CACHE).then((cache) => {
      return cache.addAll(urlToCache)
    }),
  )
  self.skipWaiting()
})
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(
        keys.map((key) => {
          if (key !== CURRENT_CACHE) {
            return caches.delete(key)
          }
          return Promise.resolve()
        }),
      )
    })(),
  )
  self.clients.claim()
  console.log('Service worker activated')
})
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((r) => {
      if (r) console.log('命中缓存', r)
      return r || fetch(event.request)
    }),
  )
  console.log(`URL requested: ${event.request}`)
})
