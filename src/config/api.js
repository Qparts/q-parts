let backendHost;
let proxyHost = 'www.q.parts';

const isProduction = process.env.REACT_APP_NODE_ENV === 'production';

if (isProduction) {
    backendHost = `https://${proxyHost}`;
} else {
    proxyHost = 'localhost:8000';
    backendHost = `http://${proxyHost}`;
}

export const API_ROOT = `${backendHost}/api`;
export const API_V1 = 'v1';
export const API_V2 = 'v2';
