(function () {
  'use strict';
  
  self.addEventListener('push', (event) => {
  });

  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
  });
}());
