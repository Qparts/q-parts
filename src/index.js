import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import registerServiceWorker from './registerServiceWorker';
import DirectionProvider from 'react-with-direction/dist/DirectionProvider';
import '../scss/main/main.scss';
// import '../scss/main-ar/main-ar.scss';

import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { LocalizeProvider } from 'react-localize-redux';

import Routes from './containers/Routers/Routers';

import ErrorBoundary from './components/ErrorBoundary';
import Nav from './components/UI/Nav';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: 'ltr'
    }
    // store.subscribe(() => {
    //   this.setState({
    //     direction: store.getState().customer.direction
    //   })
    // })

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
                <Nav/>
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
