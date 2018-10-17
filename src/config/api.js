let backendHost;
const proxyHost = 'qtest.fareed9.com';
const apiVersion = 'v1';

const hostname = window && window.location && window.location.hostname;

if (hostname === proxyHost) {
 backendHost = `http://${proxyHost}`
} else {
 backendHost = 'http://localhost:8000'
}

export const API_ROOT = `${backendHost}/api/${apiVersion}`;