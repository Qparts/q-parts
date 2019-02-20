import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import registerServiceWorker from './registerServiceWorker';
import DirectionProvider from 'react-with-direction/dist/DirectionProvider';
// import '../scss/main/main.scss';
import '../scss/main-ar/main-ar.scss';

import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { LocalizeProvider, getTranslate } from 'react-localize-redux';

import Routes from './containers/Routers/Routers';

import ErrorBoundary from './components/ErrorBoundary';
import { InitializeDefaultLang } from './actions/apiAction';

class Root extends React.Component {
  constructor(props) {
    super(props);

    store.dispatch(InitializeDefaultLang(store.getState().customer.defaultLang))

    this.state = {
      direction: store.getState().customer.direction,
      customer: store.getState().customer,
      defaultLang: store.getState().customer.defaultLang,
      translate: getTranslate(store.getState().localize),
    }
  }

  componentDidMount = () => {
    store.subscribe(() => {
      this.setState({
        customer: store.getState().customer.detail,
        defaultLang: store.getState().customer.defaultLang
      })
    })
  }
  

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DirectionProvider direction={this.state.direction}>
            <LocalizeProvider store={store}>
              <ErrorBoundary>
                  <Routes direction={this.state.direction}/>
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
