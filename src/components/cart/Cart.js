import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import Table from '../UI/Table';
import RenderCartItem from '../RenderCartItem/RenderCartItem';
import Button from '../UI/Button';
import OrderSummary from '../OrderSummary/OrderSummary';
import { getTranslate } from 'react-localize-redux';

class Cart extends Component {
	handleSubmit = values => {
		this.props.history.push('/checkout');
	}
	render() {
		const { translate } = this.props;
		const checkoutData = this.props.purchasedItems.map(item => {
			return {
				desc: item.product.desc,
				price: item.product.salesPrice.toFixed(2),
				currency: 'SR',
				quantity: item.quantity,
				quantityLabel: 'quantity',
				image: 'https://images-na.ssl-images-amazon.com/images/I/61z0QXd06sL._SL1024_.jpg',
				productNumber: item.product.productNumber,
                manufacturerName: item.product.manufacturer.name
			}
		});

		return (
			<div className="component-background">
				<section id="cart">
					<dir className="container-fluid">
						<form className="row" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
							<div className="col-md-9">
								<FieldArray
									name="purchasedItems"
									deleteText={translate("cart.table.delete")}
									purchasedItems={checkoutData}
									component={RenderCartItem}
								/>
							</div>
							<OrderSummary col="col-md-3" translate={this.props.translate} isDelivery={true} submitButton={translate("orderSummary.checkout")} />
							<div className="Cart-button">
								<div>
									<Button type="reset" className="btn btn-light" text={translate("cart.keepShopping")} />
								</div>
							</div>
						</form>
					</dir>
				</section>
			</div>
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