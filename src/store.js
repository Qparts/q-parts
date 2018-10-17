import { applyMiddleware, createStore, compose } from 'redux';
import { logger } from 'redux-logger';
import thunk from 'redux-thunk';

import { loadState } from './localStorage';

import reducer from './reducers';

const middleware = applyMiddleware(thunk, logger);
const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/* eslint-disable no-underscore-dangle */
export default createStore(
 reducer,
 persistedState,
 composeEnhancers(middleware));
 /* eslint-enable */