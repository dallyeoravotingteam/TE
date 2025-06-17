importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBJke8bTezlolxCsrBzRiGmN7MawREkyLI",
  authDomain: "timeevent-cf4f6.firebaseapp.com",
  projectId: "timeevent-cf4f6",
  storageBucket: "timeevent-cf4f6.firebasestorage.app",
  messagingSenderId: "421978030703",
  appId: "1:421978030703:web:42e115a9c252ba23d5439a"
};

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title, { body, icon });
});

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
