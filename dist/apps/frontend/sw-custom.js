(function() {
  'use strict';
  // self.addEventListener('push', (event) => {});
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const originUrl = event.target.location.origin;
    const data = event.notification.data;

    if (clients.openWindow && originUrl) {
      const params = `?cityId=${data.city.id}&day=${data.day}`;
      event.waitUntil(clients.openWindow(`${originUrl}/fiveDayForecast${params}`));
    }

  });
}());
