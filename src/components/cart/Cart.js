import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import Table from '../UI/Table';
import RenderCartItem from '../RenderCartItem/RenderCartItem';
import Button from '../UI/Button';
import OrderSummary from '../OrderSummary/OrderSummary';
import { getTranslate } from 'react-localize-redux';

import './Cart.css';

class Cart extends Component {
	handleSubmit = values => {
		this.props.history.push('/checkout');
	}
	render() {
		const { translate } = this.props;
		const checkoutData = this.props.purchasedItems.map(item => {
			return {
				desc: item.product.desc,
				price: `${item.product.salesPrice.toFixed(2)} SR`,
				quantity: item.quantity,
			}
		});
		const headers = [
			translate("cart.table.items"),
			translate("cart.table.quantity"),
			translate("cart.table.price"),
		]

		return (
			<form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
				<div className="Cart-container">
					<div className="border rounded card card-body">
						<Table
							headers={headers}
							columns={[{}]}
						/>
						<FieldArray
							name="purchasedItems"
							deleteText={translate("cart.table.delete")}
							purchasedItems={checkoutData}
							component={RenderCartItem}
						/>
					</div>
					<OrderSummary translate={this.props.translate} isDelivery={true} submitButton={translate("orderSummary.checkout")} />
				</div>
				<div className="Cart-button">
					<div>
						<Button type="reset" className="btn btn-light" text={translate("cart.keepShopping")} />
					</div>
				</div>
			</form>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		purchasedItems: state.cart.purchasedItems,
		translate: getTranslate(state.localize),
	}
}

Cart = reduxForm({
	form: 'Cart'
})(Cart)


const withCart = withRouter(Cart);

export default connect(mapStateToProps, null)(withCart);