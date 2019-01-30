import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import registerServiceWorker from './registerServiceWorker';
import DirectionProvider from 'react-with-direction/dist/DirectionProvider';
//import '../scss/main/main.scss';
// import '../scss/main-ar/main-ar.scss';

import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'
import { LocalizeProvider } from 'react-localize-redux';

import Routes from './containers/Routers/Routers';

import ErrorBoundary from './components/ErrorBoundary';

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
                <nav className="cd-nav">
                  <ul id="cd-primary-nav" className="cd-primary-nav">
                    <li className="nav-sm">
                      <a className="user-account-sm" href="#">
                        <span className="rounded-circle ">
                          <img alt="user" src="/img/user.svg" />
                        </span>
                        <p>Sign in<i></i>Join</p>
                      </a>
                    </li>
                    <li className="nav-sm">
                      <a href="#">
                        <i className="icon-home"></i> home
                </a>
                    </li>
                    <li className="nav-sm">
                      <a href="#">
                        <i className="icon-send"></i> Requests
                </a>
                    </li>
                    <li className="nav-sm">
                      <a href="#">
                        <i className="icon-delivered-step"></i> Orders
                </a>
                    </li>
                    <li className="nav-sm">
                      <a href="#">
                        <i className="icon-heart"></i> Wish List
                </a>
                    </li>
                    <li className="sep"></li>
                    <li><a href="#">Custom Order</a></li>
                    <li className="has-children">
                      <a href="#">Vehicle Part</a>
                      <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><a href="#">Oil Filter</a></li>
                        <li><a href="#">Air Filters</a></li>
                        <li><a href="#">Brake Parts</a></li>
                      </ul>
                    </li>
                    <li className="has-children">
                      <a href="#">Oil</a>
                      <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><a href="#">Motor Oil</a></li>
                        <li><a href="#">Gear Oil</a></li>
                        <li><a href="#">Grease</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Tires</a></li>
                    <li className="has-children">
                      <a href="#">Tools</a>
                      <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><a href="#">Hand tools</a></li>
                        <li><a href="#">Electrical tools</a></li>
                        <li><a href="#">Tyre Inflator</a></li>
                        <li><a href="#">Repair Equipments</a></li>
                      </ul>
                    </li>
                    <li className="has-children">
                      <a href="#">Accessorise </a>
                      <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><a href="#">Car electronics</a></li>
                        <li><a href="#">Exterior accessories</a></li>
                        <li><a href="#">Car mats</a></li>
                        <li><a href="#">Wires and cables</a></li>
                        <li><a href="#">Covers</a></li>
                        <li><a href="#">Car first aid kit</a></li>
                        <li><a href="#">Internal light</a></li>
                        <li><a href="#">Tool kits</a></li>
                        <li><a href="#">Sun curtains</a></li>
                        <li><a href="#">Car sunshade</a></li>
                        <li><a href="#">Towing Tools</a></li>
                        <li><a href="#">Bodywork Cleaning & Care</a></li>
                        <li><a href="#">Car refrigerator</a></li>
                        <li><a href="#">Child seat</a></li>
                      </ul>
                    </li>
                    <li className="has-children">
                      <a href="#">Car Care</a>
                      <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><a href="#">Motor care liquids</a></li>
                        <li><a href="#">Wash cleaners and polishes</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Sports & Outdoors </a></li>
                    <li className="sep"></li>
                    <li className="nav-sm has-children">
                      <a href="#">Ship To</a>
                      <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><a href="#">KSA</a></li>
                        <li><a href="#">Cairo</a></li>
                      </ul>
                    </li>
                    <li className="nav-sm"><a className="lang" href="#">العربية</a></li>
                    <li className="sep"></li>
                    <li className="nav-sm"><a href="#">Shipping & Delivery</a></li>
                    <li className="nav-sm"><a href="#">Returns</a></li>
                    <li className="nav-sm"><a href="#">Contact Us</a></li>
                    <li className="nav-sm"><a href="#">Privacy Policy</a></li>
                    <li className="nav-sm"><a href="#">Terms & Conditions</a></li>
                    <li className="nav-sm"><a href="#" className="sponser">
                      <span><i></i></span><p>One of the incubated proiects</p>
                    </a></li>
                  </ul>
                </nav>
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
