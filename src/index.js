import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux"
import registerServiceWorker from './registerServiceWorker';
import DirectionProvider from 'react-with-direction/dist/DirectionProvider';
import { Link } from "react-router-dom";

//import loadStyle from './config/app-style';
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
      <Fragment>

         <main class="cd-main-content">
           <LocalizeProvider store={store}>
            <ErrorBoundary>
              <Routes />
            </ErrorBoundary>
          </LocalizeProvider>
         <div class="overlay"></div>
       </main>

       <nav className="cd-nav">
       		<ul id="cd-primary-nav" className="cd-primary-nav">
            <li><a href="#">Custom Order</a></li>
       			<li className="has-children">
       				<a href="#">Vehicle Part</a>
       				<ul className="cd-secondary-nav is-hidden">
       					<li className="go-back"><a href="#0">Menu</a></li>
       					<li><a href="#">Oil Filter</a></li>
                <li><a href="#">Air Filters</a></li>
                <li><a href="#">Brake Parts</a></li>
       				</ul>
       			</li>

            <li className="has-children">
              <a href="#">Oil</a>
              <ul className="cd-secondary-nav is-hidden">
                <li className="go-back"><a href="#0">Menu</a></li>
                <li><a href="#">Motor Oil</a></li>
                <li><a href="#">Gear Oil</a></li>
                <li><a href="#">Grease</a></li>
              </ul>
            </li>

            <li><a href="#">Tires</a></li>

              <li className="has-children">
                <a href="#">Tools</a>
                <ul className="cd-secondary-nav is-hidden">
                  <li className="go-back"><a href="#0">Menu</a></li>
                  <li><a href="#">Hand tools</a></li>
                  <li><a href="#">Electrical tools</a></li>
                  <li><a href="#">Tyre Inflator</a></li>
                  <li><a href="#">Repair Equipments</a></li>
                </ul>
              </li>

            <li className="has-children">
                <a href="#">Accessorise </a>
                <ul className="cd-secondary-nav is-hidden">
                  <li className="go-back"><a href="#0">Menu</a></li>
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
                <li className="go-back"><a href="#0">Menu</a></li>
                <li><a href="#">Motor care liquids</a></li>
                <li><a href="#">Wash cleaners and polishes</a></li>
              </ul>
            </li>
            <li><a href="#">Sports & Outdoors </a></li>
       		</ul>
       	</nav>
      </Fragment>

        </DirectionProvider>
      </Provider>
    )
  }
}

ReactDOM.render(
  <Root />
  , document.getElementById('root'));
registerServiceWorker();
