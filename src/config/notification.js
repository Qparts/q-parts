/* eslint-disable no-useless-escape */
import { postSubscribeCustomer } from '../utils/api';
const isProduction = process.env.NODE_ENV === 'production';

const urlB64ToUint8Array = (base64String) => {
	const padding = '='.repeat((4 - base64String.length % 4) % 4);
	const base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/');

	const rawData = window.atob(base64);
	const outputArray = new Uint8Array(rawData.length);

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
}

const hasRegistration = (registration) => {
	if (!registration.pushManager) {
		console.log('Push manager unavailable.')
		return false;
	}
	return true;
}


export const requestNotification = () => {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.ready.then(registration => {
			if (!hasRegistration(registration)) return;

			registration.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: urlB64ToUint8Array(process.env.REACT_APP_WEBPUSH_PUBLIC_KEY)
			})
				.then(subscription => postSubscribeCustomer(subscription))
				.catch(err => console.error("Push subscription error: ", err))
		})

			.catch(e => {
				console.error('An error ocurred during Service Worker registration.', e)
			})

	}
}

export const getSubscription = async () => {
	if ('serviceWorker' in navigator) {
		if (!isProduction) return;
		await navigator.serviceWorker.ready.then(async (registration) => {

			if (!hasRegistration(registration)) return;

			await registration.pushManager.getSubscription()
				.then(subscription => {
					const isSubscribed = (subscription !== null);

					if (isSubscribed) {
						console.log('User IS subscribed.');
						return postSubscribeCustomer(subscription)
							.catch(err => console.error("Push subscription error: ", err));

					} else {
						console.log('User is NOT subscribed.');
					}
				})
		})
			.catch(e => {
				console.error('An error ocurred during Service Worker registration.', e)
			})
	}
}