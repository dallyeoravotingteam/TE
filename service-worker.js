const eventWindows = [
  { start: "15:15", end: "15:20", name: "ENGLISH TE 1 ⏳09:30AM - 10:30AM KST" },
    { start: "15:20", end: "15:30", name: "KOREAN/JAPANESE/VIETNAMESE TE 1 ⏳12:45PM - 01:45PM KST" },
    { start: "15:30", end: "15:40", name: "CHINESE TE 1 ⏳01:45PM - 02:45PM KST" },
    { start: "18:30", end: "19:30", name: "KOREAN/JAPANESE/VIETNAMESE TE 2 ⏳06:30PM - 07:30PM KST" },
    { start: "19:30", end: "20:30", name: "CHINESE TE 2 ⏳07:30PM - 08:30PM KST" },
    { start: "22:50", end: "23:50", name: "ENGLISH TE 2 ⏳10:50PM - 11:50PM KST" }
];

let notifiedTodaySW = new Set();

self.addEventListener('install', event => {
  console.log('[SW] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activated');
  return self.clients.claim();
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});

self.addEventListener('message', event => {
  const { type, currentTime } = event.data;
  const today = new Date().toISOString().slice(0, 10);

  if (type === 'CHECK_EVENT_NOTIFICATION') {
    for (const ev of eventWindows) {
      if (currentTime >= ev.start && currentTime < ev.end) {
        const key = today + ev.start;
        if (!notifiedTodaySW.has(key)) {
          notifiedTodaySW.add(key);
          self.registration.showNotification("⏰ Time Event Reminder (KST)", {
            body: `${ev.name}`,
            icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827392.png',
            tag: 'te-reminder',
            vibrate: [200, 100, 200]
          });
        }
        break;
      }
    }
  }
});
