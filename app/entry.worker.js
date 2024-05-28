/// <reference lib="WebWorker" />

export {};

let self;

self.addEventListener('install', event => {
  console.log('Service worker installed');

  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  console.log('Service worker activated');

  event.waitUntil(self.clients.claim());
});

export const defaultFetchHandler = async ({
  request
}) => {
  const serverHost = 'https://office-bill-app.netlify.app/';
  const url = new URL(request.url);

  if (request.method.toLowercase() === 'get' && url.searchParams.get('_data'))
    return fetch(`${serverHost}${url.pathname}`);

  return fetch(request);
}
