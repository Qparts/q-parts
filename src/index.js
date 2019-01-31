import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import registerServiceWorker from './registerServiceWorker';
import DirectionProvider from 'react-with-direction/dist/DirectionProvider';
import '../scss/main/main.scss';
// import '../scss/main-ar/main-ar.scss';

import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { LocalizeProvider, getTranslate } from 'react-localize-redux';

import Routes from './containers/Routers/Routers';

import ErrorBoundary from './components/ErrorBoundary';
import Nav from './components/UI/Nav';
import { InitializeDefaultLang } from './actions/apiAction';

class Root extends React.Component {
  constructor(props) {
    super(props);

    store.dispatch(InitializeDefaultLang('en'))

    this.state = {
      direction: 'ltr',
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
                <main className="nav-on-left">
                  <Routes />
                  <div className="overlay-lg"></div>
                  <a href="#" className="live-chat">
                    <img className="whatsapp" src="/img/whatsapp-logo.svg" alt="whatsapp" />
                    <p className="media-body">Have a Question? <span>Ask a Specialis</span></p>
                  </a>
                </main>
                <Nav translate={this.state.translate}/>
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
