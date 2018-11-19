import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import registerServiceWorker from './registerServiceWorker';

import '../scss/app.scss';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';

import store from './store';
import { saveState, initialStoreLoad } from './localStorage';
import { LocalizeProvider } from 'react-localize-redux';

import Routes from './containers/Routers/Routers';

import ErrorBoundary from './components/ErrorBoundary';


initialStoreLoad(store);

store.subscribe(() => {
  saveState({
    manualForm: store.getState().manualForm,
    cart: store.getState().cart,
    customer: store.getState().customer,
    localize: store.getState().localize,
    manualOrder: store.getState().manualOrder,
    api: store.getState().api
  });
});

ReactDOM.render(
  <Provider store={store}>
    <div dir="ltr">
      <LocalizeProvider store={store}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </LocalizeProvider>
    </div>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
