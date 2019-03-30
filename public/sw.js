/* eslint-disable no-console */
const CACHE_NAME = `STATIC_TASKMANAGER_V1.0`;


let path = `/505149-taskmanager-8/10/`;
if (location.host === `localhost:8081`) {
  path = `/`;
}
self.addEventListener(`install`, (evt) => {
  const openCache = caches.open(CACHE_NAME)
    .then((cache) => {
      return cache.addAll([
        path,
        `index.html`,
        `bundle.js`,
        `bundle.js.map`,
        `css/flatpickr.min.css`,
        `css/normalize.css`,
        `css/style.css`,
        `fonts/HelveticaNeueCyr-Bold.woff`,
        `fonts/HelveticaNeueCyr-Bold.woff2`,
        `fonts/HelveticaNeueCyr-Medium.woff`,
        `fonts/HelveticaNeueCyr-Medium.woff2`,
        `fonts/HelveticaNeueCyr-Roman.woff`,
        `fonts/HelveticaNeueCyr-Roman.woff2`,
        `img/add-photo.svg`,
        `img/close.svg`,
        `img/sample-img.svg`,
        `img/wave.svg`,
      ]);
    });

  evt.waitUntil(openCache);
});

self.addEventListener(`activate`, () => {
  console.log(`Service worker activated`);
});

self.addEventListener(`fetch`, (evt) => {
  evt.respondWith(
      fetch(evt.request)
      .then(function (response) {
        caches.open(CACHE_NAME)
        .then((cache) => cache.put(evt.request, response.clone()));

        return response.clone();
      })
    .catch(() => {
      caches.match(evt.request)
      .then((response) => {
        console.log(`Find in cache`, {response});
        return response;
      });
    })
    .catch((error) => console.error(error))
  );
});
