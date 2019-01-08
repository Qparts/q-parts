import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import registerServiceWorker from './registerServiceWorker';
import DirectionProvider from 'react-with-direction/dist/DirectionProvider';
//import loadStyle from './config/app-style';
import '../scss/app.scss';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/omega/theme.css';
import 'font-awesome/css/font-awesome.css';

import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { LocalizeProvider } from 'react-localize-redux';

import Routes from './containers/Routers/Routers';

import ErrorBoundary from './components/ErrorBoundary';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: store.getState().customer.direction
    };

    //loadStyle(this.state.direction);

  }

  /*
  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.direction !== this.state.direction) {
      loadStyle(this.state.direction)
    }
  }
  */

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DirectionProvider direction={this.state.direction}>
            <LocalizeProvider store={store}>
              <ErrorBoundary>
                <Routes />
              </ErrorBoundary>
            </LocalizeProvider>
          </DirectionProvider>
        </PersistGate>
      </Provider>
    )
  }
}

ReactDOM.render(
  <Root />
  , document.getElementById('root'));
registerServiceWorker();
