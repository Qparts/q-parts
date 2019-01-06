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

import store from './store';
import { saveState, initialStoreLoad, clearState } from './localStorage';
import { LocalizeProvider } from 'react-localize-redux';

import Routes from './containers/Routers/Routers';

import ErrorBoundary from './components/ErrorBoundary';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      direction: store.getState().customer.direction
    };

    initialStoreLoad(store);
    //loadStyle(this.state.direction);

    store.subscribe(() => {
      saveState({
        manualForm: store.getState().manualForm,
        cart: store.getState().cart,
        customer: store.getState().customer,
        localize: store.getState().localize,
        manualOrder: store.getState().manualOrder,
        api: store.getState().api
      });
      this.setState({
        direction: store.getState().customer.direction
      })
    });
    // clearState();
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
       <DirectionProvider direction={this.state.direction}>
          <LocalizeProvider store={store}>
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
          </LocalizeProvider>
        </DirectionProvider>
      </Provider>
    )
  }
}

ReactDOM.render(
  <Root />
  , document.getElementById('root'));
registerServiceWorker();
