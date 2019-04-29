/* eslint-disable no-console */
let path = `/taskmanager/`;
if (location.host === `localhost:8081`) {
  path = `/`;
}
const CACHE_NAME = `STATIC_TASKMANAGER_V1.0`;
const urlsToCache = [
  path,
  `./index.html`,
  `./bundle.js`,
  `./css/flatpickr.min.css`,
  `./css/normalize.css`,
  `./css/style.css`,
  `./fonts/HelveticaNeueCyr-Bold.woff`,
  `./fonts/HelveticaNeueCyr-Bold.woff2`,
  `./fonts/HelveticaNeueCyr-Medium.woff`,
  `./fonts/HelveticaNeueCyr-Medium.woff2`,
  `./fonts/HelveticaNeueCyr-Roman.woff`,
  `./fonts/HelveticaNeueCyr-Roman.woff2`,
  `./img/add-photo.svg`,
  `./img/close.svg`,
  `./img/sample-img.jpg`,
  `./img/wave.svg`,
];

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener(`activate`, () => {
  console.log(`Service worker activated!`);
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
        return caches.match(evt.request)
        .then((response) => {
          console.log(`Find in cache`, {response});
          return response;
        });
      })
    .catch((error) => console.error(error))
  );
});
