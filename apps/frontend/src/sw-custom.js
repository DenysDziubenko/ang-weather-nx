(function() {
  'use strict';
  // self.addEventListener('push', (event) => {});
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const originUrl = event.target.location.origin;

    if (clients.openWindow && originUrl) {
      event.waitUntil(clients.openWindow(originUrl));
    }

  });
}());
