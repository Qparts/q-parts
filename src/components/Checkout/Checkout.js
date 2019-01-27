import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from 'react-localize-redux';
import { confirmUserAddress, addDeliveryAddress, addPaymentMethod, completeOrder, addAddress, completeShipping, completePayment } from '../../actions/customerAction';
import { getCountry, findCity, getRegions } from '../../actions/apiAction';
import OrderSummary from '../OrderSummary/OrderSummary';
import CheckoutShipping from '../CheckoutShipping/CheckoutShipping';
import CheckoutPayment from '../CheckoutPayment/CheckoutPayment';
import CheckoutConfirmation from '../CheckoutConfirmation/CheckoutConfirmation';
import propTypes from 'prop-types';
import Button from '../UI/Button';

import { SmallScreen, MediumScreen } from '../Device/index.js'
import CustomerService from '../CustomerService/CustomerService';
import './Checkout.css';

const shippingStep = '/checkout';
const paymentStep = '/checkout/payment';
const confirmationStep = '/checkout/confirm';

class Checkout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showGoogleMap: false,
			cityFound: false,
			isDelivery: true,
			header: '',
			active: ''
		}
	}

	componentDidMount() {
		const { pathname } = this.props.location;
		if (pathname === paymentStep) this.setState({ header: this.props.translate("checkout.paymentTitle") })
		else if (pathname === shippingStep) this.setState({ header: this.props.translate("checkout.customerTitle") })
	}
	onSaveNewAddress = values => {
    const { line1, line2, zipCode, title, mobile, city } = values;
    const latitude = city.latitude;
    const longitude = city.longitude;
    const cityId = city.id;
    this.props.addAddress({ line1, line2, cityId, zipCode, title, latitude, longitude, mobile })
      .then(() => {
        this.onHide();
      });
  }

	componentDidUpdate(prevProps, prevState) {
		const { pathname } = this.props.location;
		if (prevProps.location !== this.props.location) {

			if (pathname === paymentStep) this.setState({ header: this.props.translate("checkout.paymentTitle") });
			else if (pathname === shippingStep) this.setState({ header: this.props.translate("checkout.customerTitle") });
			else if (pathname === confirmationStep) this.setState({ header: this.props.translate("checkout.confirmTitle") });
		}
	}

	handleShowGoogleMap = () => {
		this.setState({
			showGoogleMap: !this.state.showGoogleMap,
		})
	}

	handleCityFound = (bool) => {
		this.setState({
			cityFound: bool,
		})
	}
	activeButton = (value) => {
		this.setState({
			active: value
		})
	}

	render() {
		const { pathname } = this.props.location;
		const canSubmitOrder = pathname === confirmationStep;
		const { translate } = this.props;
		let signinClass= "signin";
		let orderClass= "order";
		let shippingClass= "shipping";
		let paymentClass= "payment";

		if(this.props.isShippingCompleted){
			paymentClass += " paymentActive"
			shippingClass += " shippingDone"
		}

		if(this.props.isPaymentCompleted){
			orderClass += " orderActive"
			paymentClass += " paymentDone"
		}
		return (
			<section className="checkout-container-shipping">
				<MediumScreen>
					<section className="default-header-bg">
  					<div className="container-fluid">
  						<div className="row">
  							<header className="col-4">
  								<h1>{this.state.header}</h1>
  							</header>
  							<div className="col-8">
									<div className="header-options">
											<Button type="button" className={signinClass} text="Sign In" icon="icon-user" isReverseOrder/>
											<button type="button" className={shippingClass}><i className="icon-shipping"></i> Shipping <div><i className="icon-arrow-down"/></div></button>
											<button type="button" className={paymentClass}><i className="icon-payment"></i> Payment <div><i className="icon-arrow-down"/></div></button>
											<button type="button" className={orderClass}><i className="icon-delivered-step"></i> Order Receipt <div><i className="icon-arrow-down"/></div></button>
									</div>
  							</div>
  						</div>
  					</div>
  				</section>
				 <div className="Checkout-container container-fluid">
				 	<Switch>
				 		<Route path="/checkout" exact={true} render={() => {
				 			return <CheckoutShipping
				 				address={this.props.address}
				 				customer={this.props.customer}
				 				getRegions={this.props.getRegions}
				 				getCountry={this.props.getCountry}
				 				regions={this.props.regions}
				 				country={this.props.country}
				 				confirmUserAddress={this.props.confirmUserAddress}
				 				onShowGoogleMap={this.handleShowGoogleMap}
				 				onCityFound={this.handleCityFound}
				 				showGoogleMap={this.state.showGoogleMap}
				 				cityFound={this.state.cityFound}
				 				city={this.props.city}
				 				findCity={this.props.findCity}
				 				translate={this.props.translate}
				 				isDelivery={this.state.isDelivery}
				 				defaultAddress={this.props.defaultAddress}
				 				addDeliveryAddress={this.props.addDeliveryAddress}
								onSubmit={this.onSaveNewAddress}
								addresses={this.props.addresses}
								completeShipping={this.props.completeShipping} />
				 		}} />

				 		<Route path="/checkout/payment" exact={true} render={() => {
				 			return <CheckoutPayment translate={translate} addPaymentMethod={this.props.addPaymentMethod} completePayment={this.props.completePayment}/>
				 		}} />

				 		<Route path="/checkout/confirm" exact={true} render={() => {
				 			return <CheckoutConfirmation translate={translate} checkout={this.props.checkout} completeOrder={this.props.completeOrder} />
				 		}} />
				 	</Switch>
				 	<div className="Checkout-Order_summary col-3">
				 		<OrderSummary translate={translate} isDelivery={canSubmitOrder} submitButton={translate("orderSummary.placeOrder")} />
				 	</div>
				 </div>
				</MediumScreen>
				<SmallScreen>
					<section className="default-header-bg">
  					<div className="container-fluid">
  						<div className="row">
  							<header className="col-4">
  								<h1>{this.state.header}</h1>
  							</header>
  						</div>
  					</div>
  				</section>
				 <div className="Checkout-container-mobile container-fluid">
				 	<Switch>
				 		<Route path="/checkout" exact={true} render={() => {
				 			return <CheckoutShipping
				 				address={this.props.address}
				 				customer={this.props.customer}
				 				getRegions={this.props.getRegions}
				 				getCountry={this.props.getCountry}
				 				regions={this.props.regions}
				 				country={this.props.country}
				 				confirmUserAddress={this.props.confirmUserAddress}
				 				onShowGoogleMap={this.handleShowGoogleMap}
				 				onCityFound={this.handleCityFound}
				 				showGoogleMap={this.state.showGoogleMap}
				 				cityFound={this.state.cityFound}
				 				city={this.props.city}
				 				findCity={this.props.findCity}
				 				translate={this.props.translate}
				 				isDelivery={this.state.isDelivery}
				 				defaultAddress={this.props.defaultAddress}
				 				addDeliveryAddress={this.props.addDeliveryAddress}
								onSubmit={this.onSaveNewAddress}
								addresses={this.props.addresses}
								completeShipping={this.props.completeShipping} />
				 		}} />

				 		<Route path="/checkout/payment" exact={true} render={() => {
				 			return <CheckoutPayment translate={translate} addPaymentMethod={this.props.addPaymentMethod} completePayment={this.props.completePayment}/>
				 		}} />

				 		<Route path="/checkout/confirm" exact={true} render={() => {
				 			return <CheckoutConfirmation translate={translate} checkout={this.props.checkout} completeOrder={this.props.completeOrder} />
				 		}} />
				 	</Switch>
				 	<div className="Checkout-Order_summary">
				 		<OrderSummary translate={translate} isDelivery={canSubmitOrder} submitButton={translate("orderSummary.placeOrder")} />
            <div className="wahtsapp" style={{marginTop: "20px"}}>
              <a className="bg-whatsapp">
                <CustomerService
                  messages={["Have a Question?", "Ask a Specialis, In-House Experts."]}
                  url="" />
              </a>
            </div>
				 	</div>
				 </div>
				</SmallScreen>
			</section>
		)
	}
}
const mapStateToProps = state => ({
	customer: state.customer.detail,
	defaultAddress: state.customer.defaultAddress,
	address: state.customer.address,
	regions: state.api.regions,
	country: state.api.country,
	city: state.api.city,
	translate: getTranslate(state.localize),
	checkout: state.customer.checkout,
	addresses: state.customer.detail.addresses,
	isShippingCompleted: state.customer.isShippingCompleted,
	isPaymentCompleted: state.customer.isPaymentCompleted
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		confirmUserAddress,
		getRegions,
		getCountry,
		findCity,
		addDeliveryAddress,
		addPaymentMethod,
		completeOrder,
		addAddress,
		completeShipping,
		completePayment
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
