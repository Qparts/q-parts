/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
workbox.core.skipWaiting();
workbox.core.clientsClaim();

self.addEventListener('push', event => {
	const data = event.data.json();
	event.waitUntil(self.registration.showNotification(data.title, {
		body: data.body
	}))
})

self.addEventListener('notificationclick', event => {
	const notification = event.notification;
	
	notification.close();
	event.waitUntil(clients.openWindow(notification.body));
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);