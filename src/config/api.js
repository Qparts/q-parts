let backendHost;
const proxyHost = 'qtest.fareed9.com';

const hostname = window && window.location && window.location.hostname;

if (hostname === proxyHost) {
 backendHost = `http://${proxyHost}`
} else {
 backendHost = 'http://localhost:8000';
}

export const API_ROOT = `${backendHost}/api`;
export const API_V1 = 'v1';
export const API_V2 = 'v2';