import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementQuantity, decrementQuantity } from '../../actions/cartAction';
import RenderCartItem from '../RenderCartItem/RenderCartItem';
import OrderSummary from '../OrderSummary/OrderSummary';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Select from 'react-select';
import { isAuth, right } from '../../utils'
import Login from "../../containers/Authentication/Login/Login";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Title from '../UI/Title';

import { CustomScreen } from '../Device';
import CustomerService from '../CustomerService/CustomerService';
class Cart extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dialogType: 'signin',
			modal: false
		};
	}
	togglePopup = () => {
		this.setState({
			modal: !this.state.modal
		})
	}
	getDialogProps = () => {
		const { dialogType } = this.state;
		const { translate } = this.props;

		switch (dialogType) {
			case 'signin':
				return {
					header: <Title header={translate("dialog.signin.title")} />
				}
			default:
				break;
		}
	}
	getDialogComponent = () => {
		const { dialogType } = this.state;

		switch (dialogType) {
			case 'signin':
				return <Login toggle={this.togglePopup} />

			default:
				break;
		}
	}
	handleSubmit = values => {
		if (isAuth(this.props.token)) {
			this.props.history.push('/checkout');
		} else {
			if (window.innerWidth < 950) {
				this.props.history.push('/login')
			} else {
				this.setState({ dialogType: 'signin' });
				this.togglePopup();
			}
		}
	}
	render() {
		const { translate, direction } = this.props;
		const dialog = (
			<Modal dir={direction} contentClassName="container-fluid" className={this.getDialogProps().className} isOpen={this.state.modal} toggle={this.togglePopup} >
				<ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
				<ModalBody>
					{this.getDialogComponent()}
				</ModalBody>
			</Modal>
		)
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
				subtotal: item.product.salesPrice.toFixed(2) * item.quantity
			}
		});
		var subtotal = 0;
		var quantity = 0;
		var divItemMovile = "total-sm d-lg-none d-flex align-items-stretch";

		const chatMessages = [
			translate("customerService.cart.whatsApp.header"),
			translate("customerService.cart.whatsApp.subHeader")
		  ];

		for (var i = 0; i < checkoutData.length; i++) {
			subtotal += checkoutData[i].subtotal;
			quantity += checkoutData[i].quantity;
			divItemMovile = "totalFoundData d-block d-lg-none d-flex align-items-stretch"
		}
		const shipToOptions = [
			{ value: 1, label: "KSA" },
			{ value: 2, label: "Egypt" },
			{ value: 3, label: "Jordan" }
		];
		return (
			<section>
				<section className="default-header-bg">
					<div className="container-fluid">
						<div className="row">
							<header className="col cart-header">
								<h1>
									<span>{translate("cart.shoppingCart.header")}</span>
									<CustomScreen maxWidth={1199.98}>{translate("general.cart")}</CustomScreen>
									<label>{quantity} {translate("general.item")}</label>
								</h1>
							</header>
							<div className="col-auto">
								<div className="cart-ship-to">
									<label>{translate("cart.shipTo")}</label>
									<Select
										classNamePrefix="select"
										isSearchable={false}
										styles={styles.select}
										defaultValue={shipToOptions[0]}
										options={shipToOptions} />
								</div>
							</div>
						</div>
					</div>
				</section>
				<section className="gray-bg pt-sec">
					<div className="container-fluid">
						<div className={divItemMovile}>
							<div>
								<label>{translate("orderSummary.total")}</label>
								<p>{subtotal + 50}<span className="currency">{translate("general.currency")}</span></p>
							</div>
							<button className="btn btn-primary" type="button" onClick={this.handleSubmit}>{translate("orderSummary.checkout")}<i className={`icon-arrow-${right(direction)}`}></i></button>
						</div>
						<form className="row" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
							<RenderCartItem
								currentLanguage={this.props.currentLanguage}
								translate={translate}
								direction={direction}
								purchasedItems={checkoutData}
								incrementQuantity={this.props.incrementQuantity}
								decrementQuantity={this.props.decrementQuantity}
							/>
							<div className="col-lg-3">
								<div className="order-summery">
									<OrderSummary
										translate={translate}
										checkoutData={checkoutData}
										subtotal={subtotal}
										submitButton={translate("orderSummary.placeOrder")} />
									{quantity > 0 &&
										<button className="btn btn-primary" style={{ marginTop: "0px" }} type="button" onClick={this.handleSubmit}>{translate("orderSummary.checkout")}<i className={`icon-arrow-${right(direction)}`}></i></button>
									}
								</div>
								<CustomerService
									messages={chatMessages}
									url="" />
								<div className="banner-250 d-none d-lg-table bg-white">
									<p className="">
										Google Ad<br />
										250x250
								</p>
								</div>
							</div>
						</form>
					</div>
				</section>
				{dialog}
			</section>


		);
	}
}

const mapStateToProps = (state) => {
	return {
		purchasedItems: state.cart.purchasedItems,
		translate: getTranslate(state.localize),
		token: state.customer.token,
		currentLanguage: getActiveLanguage(state.localize).code,
	}
}
const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		incrementQuantity,
		decrementQuantity
	}, dispatch)
}

Cart = reduxForm({
	form: 'Cart'
})(Cart)


const styles = {
	divBtn: {
		textAlign: 'right'
	}
}

const withCart = withRouter(Cart);

export default connect(mapStateToProps, mapDispatchToProps)(withCart);
