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



export const requestNotification = (registration) => {
    const key = "BHJi5MpWRcO9_TPQ7Uotn4padQLFf9X3ut6lY60NbGBWSfpw-8sb2UOscnd_tdy9v6LWEO4-HeJnRjkWHFoq1V4";
    registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(key)
    })
        .then(subscription => postSubscribeCustomer(subscription))
        .catch(err => console.error("Push subscription error: ", err))

}