let backendHost;
export let proxyHost = 'www.q.parts';

const isProduction = process.env.REACT_APP_NODE_ENV === 'production';

if (isProduction) {
    backendHost = `https://${proxyHost}`;
} else {
    proxyHost = 'qtest.fareed9.com';
    backendHost = `http://${proxyHost}`;
}

export const API_ROOT = `${backendHost}/api`;
export const API_V1 = 'v1';
export const API_V2 = 'v2';
