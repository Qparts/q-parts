import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from 'react-localize-redux';
import { confirmUserAddress, addDeliveryAddress, addPaymentMethod, completeOrder } from '../../actions/customerAction';
import { getCountry, findCity, getRegions } from '../../actions/apiAction';
import OrderSummary from '../OrderSummary/OrderSummary';
import CheckoutShipping from '../CheckoutShipping/CheckoutShipping';
import CheckoutPayment from '../CheckoutPayment/CheckoutPayment';
import CheckoutConfirmation from '../CheckoutConfirmation/CheckoutConfirmation';

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
			header: ''
		}
	}

	componentDidMount() {
		const { pathname } = this.props.location;
		if (pathname === paymentStep) this.setState({ header: this.props.translate("checkout.paymentTitle") })
		else if (pathname === shippingStep) this.setState({ header: this.props.translate("checkout.customerTitle") })
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

	render() {
		const { pathname } = this.props.location;
		const canSubmitOrder = pathname === confirmationStep;
		const { translate } = this.props;

		return (
			<section>
			<h1>Shopping cart xx</h1>

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
	checkout: state.customer.checkout
});

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		confirmUserAddress,
		getRegions,
		getCountry,
		findCity,
		addDeliveryAddress,
		addPaymentMethod,
		completeOrder
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
// <div>
// 	<h1>{this.state.header}</h1>
// </div>
// <div className="Checkout-container">
// 	<Switch>
// 		<Route path="/checkout" exact={true} render={() => {
// 			return <CheckoutShipping
// 				address={this.props.address}
// 				customer={this.props.customer}
// 				getRegions={this.props.getRegions}
// 				getCountry={this.props.getCountry}
// 				regions={this.props.regions}
// 				country={this.props.country}
// 				confirmUserAddress={this.props.confirmUserAddress}
// 				onShowGoogleMap={this.handleShowGoogleMap}
// 				onCityFound={this.handleCityFound}
// 				showGoogleMap={this.state.showGoogleMap}
// 				cityFound={this.state.cityFound}
// 				city={this.props.city}
// 				findCity={this.props.findCity}
// 				translate={this.props.translate}
// 				isDelivery={this.state.isDelivery}
// 				defaultAddress={this.props.defaultAddress}
// 				addDeliveryAddress={this.props.addDeliveryAddress} />
// 		}} />
//
// 		<Route path="/checkout/payment" exact={true} render={() => {
// 			return <CheckoutPayment translate={translate} addPaymentMethod={this.props.addPaymentMethod} />
// 		}} />
//
// 		<Route path="/checkout/confirm" exact={true} render={() => {
// 			return <CheckoutConfirmation translate={translate} checkout={this.props.checkout} completeOrder={this.props.completeOrder} />
// 		}} />
// 	</Switch>
// 	<div className="Checkout-Order_summary">
// 		<OrderSummary translate={translate} isDelivery={canSubmitOrder} submitButton={translate("orderSummary.placeOrder")} />
// 	</div>
// </div>
