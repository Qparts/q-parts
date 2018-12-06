import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import RenderCartItem from '../RenderCartItem/RenderCartItem';
import Button from '../UI/Button';
import OrderSummary from '../OrderSummary/OrderSummary';
import { getTranslate } from 'react-localize-redux';
import SectionHeader from '../UI/SectionHeader';

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
			<section id="cart">
				<div className="component-background">
					<SectionHeader text={"Cart"} />
					<dir className="container-fluid" id="cart-details">
						<form className="row" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
							<div className="col-md-9">
								<FieldArray
									name="purchasedItems"
									deleteText={translate("cart.table.delete")}
									purchasedItems={checkoutData}
									component={RenderCartItem}
								/>
								<div style={styles.divBtn}>
									<Button
										type="reset"
										className="btn-secondary btn-shopping"
										text={translate("cart.keepShopping")}
										icon="icon-arrow-right" />
								</div>
							</div>
							<OrderSummary col="col-md-3" translate={this.props.translate} isDelivery={true} submitButton={translate("orderSummary.checkout")} />
						</form>
					</dir>
				</div>
			</section>
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


const styles = {
	divBtn: {
		textAlign: 'right'
	}
}

const withCart = withRouter(Cart);

export default connect(mapStateToProps, null)(withCart);