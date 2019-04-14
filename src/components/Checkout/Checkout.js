import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { confirmUserAddress, completeOrder, addAddress, completeShipping, completePayment, changeDefaultAddress, setLoading, setValidCredit } from '../../actions/customerAction';
import { getCountry, findCity, getRegions } from '../../actions/apiAction';
import { incrementQuantity, decrementQuantity, addDeliveryAddress, addPaymentMethod, deleteCart } from '../../actions/cartAction';
import OrderSummary from '../OrderSummary/OrderSummary';
import CheckoutShipping from '../CheckoutShipping/CheckoutShipping';
import CheckoutPayment from '../CheckoutPayment/CheckoutPayment';
import CheckoutConfirmation from '../CheckoutConfirmation/CheckoutConfirmation';
import Button from '../UI/Button';

import { SmallScreen, MediumScreen } from '../Device/index.js'

import { colors } from '../../constants'

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
	componentWillMount() {
		this.props.completeShipping(false);
		this.props.completePayment(false);
	}
	render() {
		const { pathname } = this.props.location;
		const canSubmitOrder = pathname === confirmationStep;
		const { translate } = this.props;
		let signinClass = "signin";
		let orderClass = "order";
		let shippingClass = "shipping";
		let paymentClass = "payment";

		const styles = {
			hideShadow: {
				boxShadow: !canSubmitOrder ? 'none' : colors.boxShadow
			}
		}

		const checkoutData = this.props.purchasedItems.map(item => {
			return {
				...item.product,
				desc: item.product.desc,
				salesPrice: item.product.salesPrice.toFixed(2),
				currency: translate("general.currency"),
				quantity: item.quantity,
				quantityLabel: translate("general.quantity"),
				image: item.product.image,
				productNumber: item.product.productNumber,
				brand: item.product.brand,
				subtotal: item.product.salesPrice.toFixed(2) * item.quantity,
				id: item.product.id
			}
		});

		let subtotal = 0;
		for (var i = 0; i < checkoutData.length; i++) {
			subtotal += checkoutData[i].subtotal;
		}
		const total = subtotal + 35;
		const vat = total * 0.05;
		const grandTotal = total + vat;

		if (this.props.isShippingCompleted) {
			paymentClass += " paymentActive"
			shippingClass += " shippingDone"
		}

		if (this.props.isPaymentCompleted) {
			orderClass += " orderActive"
			paymentClass += " paymentDone"
		}
		if(checkoutData.length === 0){
			this.props.history.push('/');
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
										<Button type="button" className={signinClass} text={translate("checkout.singInTitle")} icon="icon-user" isReverseOrder />
										<button type="button" className={shippingClass}><i className="icon-shipping"></i> {translate("checkout.shippingTitle")} <div><i className="icon-arrow-down" /></div></button>
										<button type="button" className={paymentClass}><i className="icon-payment"></i> {translate("checkout.paymentTitle")} <div><i className="icon-arrow-down" /></div></button>
										<button type="button" className={orderClass}><i className="icon-delivered-step"></i> {translate("checkout.orderTitle")} <div><i className="icon-arrow-down" /></div></button>
									</div>
								</div>
							</div>
						</div>
					</section>
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
				</SmallScreen>
				<div className="Checkout-container container-fluid">
					<Switch>
						<Route path="/checkout" exact={true} render={() => {
							return <CheckoutShipping
								direction={this.props.direction}
								currentLanguage={this.props.currentLanguage}
								addAddress={this.props.addAddress}
								address={this.props.address}
								customer={this.props.customer}
								checkout={this.props.checkout}
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
								defaultAddress={this.props.defaultAddress}
								addDeliveryAddress={this.props.addDeliveryAddress}
								addresses={this.props.addresses}
								completeShipping={this.props.completeShipping}
								changeDefaultAddress={this.props.changeDefaultAddress} />
						}} />

						<Route path="/checkout/payment" exact={true} render={() => {
							return <CheckoutPayment
								direction={this.props.direction}
								translate={translate}
								addPaymentMethod={this.props.addPaymentMethod}
								completePayment={this.props.completePayment}
								checkout={this.props.checkout}
								setValidCredit={this.props.setValidCredit}/>
						}} />

						<Route path="/checkout/confirm" exact={true} render={() => {
							return <CheckoutConfirmation
								translate={translate}
								currentLanguage={this.props.currentLanguage}
								direction={this.props.direction}
								checkout={this.props.checkout}
								completeOrder={this.props.completeOrder}
								purchasedItems={checkoutData}
								incrementQuantity={this.props.incrementQuantity}
								decrementQuantity={this.props.decrementQuantity}
								grandTotal={grandTotal}
								setLoading={this.props.setLoading}
								isLoading={this.props.isLoading}
								setValidCredit={this.props.setValidCredit}
								isValidcreditCard={this.props.isValidcreditCard}
								deleteCart={this.props.deleteCart} />
						}} />
					</Switch>
					{
						!this.props.isLoading && (
							<div className="col-12 col-md-3">
								<div style={styles.hideShadow} className="order-summary">
									<OrderSummary
										direction={this.props.direction}
										translate={translate}
										isDelivery={canSubmitOrder}
										submitButton={translate("orderSummary.placeOrder")}
										checkoutData={checkoutData}
										purchasedItems={checkoutData}
										checkout={this.props.checkout}
										setLoading={this.props.setLoading}
										isLoading={this.props.isLoading}
										setValidCredit={this.props.setValidCredit}
										isValidcreditCard={this.props.isValidcreditCard} />
								</div>
							</div>
						)
					}
				</div>
			</section>
		)
	}
}
const mapStateToProps = state => ({
	customer: state.customer.detail,
	defaultAddress: state.customer.defaultAddress,
	address: state.customer.address,
	direction: state.customer.direction,
	regions: state.api.regions,
	country: state.api.country,
	city: state.api.city,
	translate: getTranslate(state.localize),
	currentLanguage: getActiveLanguage(state.localize).code,
	checkout: state.cart.checkout,
	cartId: state.cart.cartId,
	addresses: state.customer.detail.addresses,
	isShippingCompleted: state.customer.isShippingCompleted,
	isPaymentCompleted: state.customer.isPaymentCompleted,
	purchasedItems: state.cart.purchasedItems,
	isLoading: state.customer.isLoading,
	isValidcreditCard: state.customer.isValidcreditCard
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
		completePayment,
		incrementQuantity,
		decrementQuantity,
		changeDefaultAddress,
		setLoading,
		setValidCredit,
		deleteCart
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
