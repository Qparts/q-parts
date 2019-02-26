import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { incrementQuantity, decrementQuantity } from '../../actions/cartAction';
import RenderCartItem from '../RenderCartItem/RenderCartItem';
import Button from '../UI/Button';
import OrderSummary from '../OrderSummary/OrderSummary';
import SectionHeader from '../UI/SectionHeader';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Stars from 'react-stars';
import Swiper from 'react-id-swiper';
import { starsRating } from '../../constants';
import Select from 'react-select';
import RenderProducts from '../../components/RenderProducts/RenderProducts';
import { isAuth } from '../../utils'
import Login from "../../containers/Authentication/Login/Login";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Title from '../UI/Title';

import Slider from "react-slick";
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
		const { vehicles } = this.props;
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
		//related Products
		const params = {
			containerClass: `swiper-container products-list`,
			slidesPerView: 5,
			spaceBetween: 30,
			grabCursor: true,
			lazy: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			breakpoints: {
				1200: {
					slidesPerView: 4,
					spaceBetween: 30
				},
				992: {
					slidesPerView: 4,
					spaceBetween: 15
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 15
				},
				576: {
					slidesPerView: 2,
					spaceBetween: 15
				},
			}
		}
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
							<button className="btn btn-primary" type="button" onClick={this.handleSubmit}>{translate("orderSummary.checkout")}<i className="icon-arrow-right"></i></button>
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
										<button className="btn btn-primary" style={{ marginTop: "0px" }} type="button" onClick={this.handleSubmit}>{translate("orderSummary.checkout")}<i className="icon-arrow-right"></i></button>
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
						<div className="row pt-sec">
							{/* <div className="col recommended-product">
								<h3>Products Related To Items In Your Cart</h3>
								<Swiper {...params}>
									<div>
										<Link to="/" className="card">
											<img src="/img/product-1.jpg" className="card-img-top" alt="..." />
											<div className="card-body">
												<h5 className="card-title">Air Fuel Ratio Sensor</h5>
												<ul className="list-inline product-info">
													<li><strong>Bosch</strong></li>
													<li>#Part Num</li>
												</ul>
												<div className="rating">
													<Stars values={1} {...starsRating} />
													<span>0 review</span>
												</div>
												<p className="price">20 <span>sr</span></p>
											</div>
										</Link>
									</div>
									<div>
										<Link to="/" className="card">
											<img src="/img/product-2.jpg" className="card-img-top" alt="..." />
											<div className="card-body">
												<h5 className="card-title">8100 Synthetic Motor Oil</h5>
												<ul className="list-inline product-info">
													<li><strong>Motul USA</strong></li>
													<li>#Part Num</li>
												</ul>
												<div className="rating">
													<Stars values={1} {...starsRating} />
													<span>0 review</span>
												</div>
												<p className="price">263 <span>sr</span></p>
											</div>
										</Link>
									</div>
									<div>
										<Link to="/" className="card">
											<img src="/img/product-3.jpg" className="card-img-top" alt="..." />
											<div className="card-body">
												<h5 className="card-title">GM Original Equipment EGR....</h5>
												<ul className="list-inline product-info">
													<li><strong>ACDelco</strong></li>
													<li>#Part Num</li>
												</ul>
												<div className="rating">
													<Stars values={1} {...starsRating} />
													<span>0 review</span>
												</div>
												<p className="price">263 <span>sr</span></p>
											</div>
										</Link>
									</div>
									<div>
										<Link to="/" className="card">
											<img src="/img/product-4.jpg" className="card-img-top" alt="..." />
											<div className="card-body">
												<h5 className="card-title">NT05</h5>
												<ul className="list-inline product-info">
													<li><strong>NITTO</strong></li>
													<li>#Part Num</li>
												</ul>
												<div className="rating">
													<Stars values={1} {...starsRating} />
													<span>0 review</span>
												</div>
												<p className="price">500 <span>sr</span></p>
											</div>
										</Link>
									</div>
									<div>
										<Link to="/" className="card">
											<img src="/img/product-4.jpg" className="card-img-top" alt="..." />
											<div className="card-body">
												<h5 className="card-title">NT05</h5>
												<ul className="list-inline product-info">
													<li><strong>NITTO</strong></li>
													<li>#Part Num</li>
												</ul>
												<div className="rating">
													<Stars values={1} {...starsRating} />
													<span>0 review</span>
												</div>
												<p className="price">500 <span>sr</span></p>
											</div>
										</Link>
									</div>
									<div>
										<Link to="/" className="card">
											<img src="/img/product-1.jpg" className="card-img-top" alt="..." />
											<div className="card-body">
												<h5 className="card-title">Air Fuel Ratio Sensor</h5>
												<ul className="list-inline product-info">
													<li><strong>Bosch</strong></li>
													<li>#Part Num</li>
												</ul>
												<div className="rating">
													<Stars values={1} {...starsRating} />
													<span>0 review</span>
												</div>
												<p className="price">20 <span>sr</span></p>
											</div>
										</Link>
									</div>
									<div>
										<Link to="/" className="card">
											<img src="/img/product-4.jpg" className="card-img-top" alt="..." />
											<div className="card-body">
												<h5 className="card-title">NT05</h5>
												<ul className="list-inline product-info">
													<li><strong>NITTO</strong></li>
													<li>#Part Num</li>
												</ul>
												<div className="rating">
													<Stars values={1} {...starsRating} />
													<span>0 review</span>
												</div>
												<p className="price">500 <span>sr</span></p>
											</div>
										</Link>
									</div>
								</Swiper>
								<div className="swiper-left"></div>
							</div> */}
						</div>
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
/*<div >
	<dir className="container-fluid" id="cart-details">
		<form className="row" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
			<div className="col-md-9">
				<div className="border card q-display-small">
					<div className="checkout-sm-container">
						<div className="column">
							<span className="item-key">{translate("orderSummary.total")}</span>
							<span className="item-value">
								2050
								<span>SR</span>
							</span>
						</div>
						<div className="column">
							<Button
								type="submit"
								className="btn-primary"
								text={"Checkout"}
								icon="icon-arrow-right" />
						</div>
					</div>
				</div>
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
</div>*/
