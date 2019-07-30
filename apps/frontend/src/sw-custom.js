(function () {
  'use strict';
  
  self.addEventListener('push', (event) => {
    // TODO customize behavior
  });

  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
  });
}());
