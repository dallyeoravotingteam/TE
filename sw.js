importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyBJke8bTezlolxCsrBzRiGmN7MawREkyLI",
  authDomain: "timeevent-cf4f6.firebaseapp.com",
  projectId: "timeevent-cf4f6",
  storageBucket: "timeevent-cf4f6.appspot.com",
  messagingSenderId: "421978030703",
  appId: "1:421978030703:web:42e115a9c252ba23d5439a"
});

const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, { body, icon });
});

// Service worker lifecycle events
self.addEventListener('install', event => {
  console.log('[SW] Installed');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activated');
  self.clients.claim();
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});
