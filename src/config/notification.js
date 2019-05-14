import { postSubscribeCustomer } from '../utils/api';

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



export const requestNotification = async() => {
	if (global.registration) {
		await global.registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey: urlB64ToUint8Array(process.env.REACT_APP_WEBPUSH_PUBLIC_KEY)
		})
			.then(subscription => postSubscribeCustomer(subscription))
			.catch(err => console.error("Push subscription error: ", err))
	}
	return;

}