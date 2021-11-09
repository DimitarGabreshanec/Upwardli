import { handleFetchEvent } from './handler'

addEventListener('fetch', (event) => {
  event.respondWith(handleFetchEvent(event))
})
