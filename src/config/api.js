let backendHost;
const proxyHost = 'q.parts';

const hostname = window && window.location && window.location.hostname;

if (true) {
 backendHost = `http://${proxyHost}`;
} else {
 backendHost = 'http://localhost:8000';
}

export const API_ROOT = `${backendHost}/api`;
export const API_V1 = 'v1';
export const API_V2 = 'v2';