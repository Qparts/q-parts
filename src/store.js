import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import storage from 'redux-persist/lib/storage';

import reducer from './reducers';

let middleware = applyMiddleware(thunk);
const persistConfig = {
    key: 'vBeta2.7',
    storage,
    blacklist: ['form', 'webSocket']
};
const persistedReducer = persistReducer(persistConfig, reducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (process.env.NODE_ENV === 'development') {
    middleware = applyMiddleware(thunk, logger);
  }

/* eslint-disable no-underscore-dangle */
export const store = createStore(
    persistedReducer,
    composeEnhancers(middleware));
 /* eslint-enable */

 export const persistor = persistStore(store);