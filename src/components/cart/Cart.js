import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import RenderCartItem from '../RenderCartItem/RenderCartItem';
import Button from '../UI/Button';
import OrderSummary from '../OrderSummary/OrderSummary';
import SectionHeader from '../UI/SectionHeader';
import { getTranslate } from 'react-localize-redux';
import Stars from 'react-stars';
import Swiper from 'react-id-swiper';
import {starsRating } from '../../constants';
import Select from 'react-select';
import RenderProducts from '../../components/RenderProducts/RenderProducts';

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
									<span>Shopping</span> Cart<label>2 Items</label>
									</h1>
							</header>
							<div className="col-auto">
								<div className="cart-ship-to">
									<label>Ship to</label>
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
						<div className="total-sm d-lg-none d-flex align-items-stretch">
							<div>
												<label>Totla</label>
												<p>20700<span className="currency">SR</span></p>
										</div>
							<button class="btn-primary" type="button">Check Out<i className="icon-arrow-right"></i></button>
							</div>
						<form className="row" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
							<div className="col-lg-9">
								<ul className="cart-items list-unstyled">
									<li>
										<figure className="row">
											<a href="#" className="col-3 item-img">
												<img src="/img/oil-img-3.jpg"/>
											</a>
											<figcaption className="col-9">
												<div className="row">
													<div className="col-md-9 item-dis">
														<header>
															<h3><a href="#">8100 synthetic motor oil</a></h3>
															<h4>Motul USA <span>#Part Number</span></h4>
														</header>
														<div className="d-table product-options">
															<div className="d-table-row">
																<div className="d-table-cell"><span>Viscosity Grade</span></div>
																<div className="d-table-cell">SAE -50</div>
															</div>
															<div className="d-table-row">
																<div className="d-table-cell"><span>Volume</span></div>
																<div className="d-table-cell">1.32 Gallon</div>
															</div>
														</div>
														<div className="cart-quantity d-block d-lg-none">
															<h5>Quantity</h5>
															<div class="input-group quantity">
																<div class="input-group-prepend">
																	<button className="btn-gray" type="button" disabled><i className="minus"></i></button>
																</div>
																<input class="form-control" disabled value="1" type="text"/>
																<div class="input-group-append">
																	<button className="btn-gray" type="button"><i className="icon-plus"></i></button>
																</div>
															</div>
														</div>
														<div className="cart-product-price">
															<p className="price">11.19 <span>sr</span></p>
															<p className="availability"><i className="in-icon"></i>In Stock (16) - Ships in 24 to 48 hrs </p>
														</div>
														<div className="cart-actions">
															<a href="#" className="btn-gray"><i className="icon-heart"></i><span>Move to Wishlist</span></a>
															<a href="#" className="delete-btn"><i className="icon-trash"></i><span>Delet</span></a>
														</div>
													</div>
													<div className="col-md-3">
														<div className="cart-quantity d-none d-lg-block">
															<h5>Quantity</h5>
															<div class="input-group quantity">
																<div class="input-group-prepend">
																	<button className="btn-gray" type="button" disabled><i className="minus"></i></button>
																</div>
																<input class="form-control" disabled value="1" type="text"/>
																<div class="input-group-append">
																	<button className="btn-gray" type="button"><i className="icon-plus"></i></button>
																</div>
															</div>
														</div>
													</div>
												</div>
											</figcaption>
										</figure>
									</li>
									<li>
										<figure className="row">
											<a href="#" className="col-3 item-img">
												<img src="/img/product-1.jpg"/>
											</a>
											<figcaption className="col-9">
												<div className="row">
													<div className="col-md-9 item-dis">
														<header>
															<h3><a href="#">#Part Number</a></h3>
															<h4>Product Brand <span>Product Name</span></h4>
														</header>
														<div className="d-table product-options">
															<div className="d-table-row">
																<div className="d-table-cell"><span>Vechile Info</span></div>
																<div className="d-table-cell">
																	2015 Ford Focus<br/>
																VIN number (000 000 000 000 11)
															</div>
														</div>
														<div className="d-table-row">
															<div className="d-table-cell"><span>Fitment</span></div>
															<div className="d-table-cell"><i className="icon-checked"></i> Verified</div>
														</div>
														<div className="d-table-row">
															<div className="d-table-cell"><span>Made in </span></div>
															<div className="d-table-cell">China</div>
														</div>
														<div className="d-table-row">
															<div className="d-table-cell"><span>Condition</span></div>
															<div className="d-table-cell">New</div>
														</div>
													</div>
													<div className="cart-quantity d-block d-lg-none">
														<h5>Quantity</h5>
														<div class="input-group quantity">
															<div class="input-group-prepend">
																<button className="btn-gray" type="button" disabled><i className="minus"></i></button>
															</div>
															<input class="form-control" disabled value="1" type="text"/>
															<div class="input-group-append">
																<button className="btn-gray" type="button"><i className="icon-plus"></i></button>
															</div>
														</div>
													</div>
													<div className="cart-product-price">
														<p className="price">11.19 <span>sr</span></p>
														<p className="availability"><i className="in-icon"></i>In Stock (16) - Ships in 24 to 48 hrs </p>
													</div>
													<div className="cart-actions">
														<a href="#" className="btn-gray"><i className="icon-heart"></i><span>Move to Wishlist</span></a>
														<a href="#" className="delete-btn"><i className="icon-trash"></i><span>Delet</span></a>
													</div>
												</div>
												<div className="col-md-3">
													<div className="cart-quantity d-none d-lg-block">
														<h5>Quantity</h5>
														<div class="input-group quantity">
															<div class="input-group-prepend">
																<button className="btn-gray" type="button" disabled><i className="minus"></i></button>
															</div>
															<input class="form-control" disabled value="1" type="text"/>
															<div class="input-group-append">
																<button className="btn-gray" type="button"><i className="icon-plus"></i></button>
															</div>
														</div>
													</div>
												</div>
											</div>
										</figcaption>
									</figure>
								</li>
							</ul>
								<div className="row">
									<div className="col-md-6 ml-md-auto">
										<a href="#" className="cart-back">Continue Shopping<i className="icon-arrow-right"></i></a>
									</div>
								</div>
							</div>
							<div className="col-lg-3">
						<div className="order-summery">
								<header>
									<h2>Order Summary</h2>
									<span>2 items in your Cart</span>
								</header>
								<ul className="list-unstyled">
									<li>
										<label>Subtotal</label>
										<p>20700<span>SR</span></p>
									</li>
									<li>
										<label>Shipping Cost</label><p>50<span>SR</span></p>
									</li>
									<li>
										<label>Total</label><p class>20700<span>SR</span></p>
									</li>
								</ul>
								<button class="btn-primary" type="button">Check Out<i className="icon-arrow-right"></i></button>
							</div>
						<a href="#"  className="media chat-div">
								<img  src="/img/whatsapp-logo.svg" alt="whatsapp"/>
								<div class="media-body">
									<p>
										<span>Have a Question?</span>
										Ask a Specialis, In-House Experts. We know our products
									</p>
								</div>
							</a>
						<div className="banner-250 d-none d-lg-table">
								<p className="">
										Google Ad<br/>
									250x250
								</p>
							</div>
					</div>
						</form>
						<div className="row pt-sec">
							<div className="col recommended-product">
								<h3>Products Related To Items In Your Cart</h3>
								<Swiper {...params}>
									<div>
										<Link to="/" class="card">
											<img src="/img/product-1.jpg" class="card-img-top" alt="..." />
											<div class="card-body">
												<h5 class="card-title">Air Fuel Ratio Sensor</h5>
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
										<Link to="/" class="card">
											<img src="/img/product-2.jpg" class="card-img-top" alt="..." />
											<div class="card-body">
												<h5 class="card-title">8100 Synthetic Motor Oil</h5>
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
										<Link to="/" class="card">
											<img src="/img/product-3.jpg" class="card-img-top" alt="..." />
											<div class="card-body">
												<h5 class="card-title">GM Original Equipment EGR....</h5>
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
										<Link to="/" class="card">
											<img src="/img/product-4.jpg" class="card-img-top" alt="..." />
											<div class="card-body">
												<h5 class="card-title">NT05</h5>
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
										<Link to="/" class="card">
											<img src="/img/product-4.jpg" class="card-img-top" alt="..." />
											<div class="card-body">
												<h5 class="card-title">NT05</h5>
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
										<Link to="/" class="card">
											<img src="/img/product-1.jpg" class="card-img-top" alt="..." />
											<div class="card-body">
												<h5 class="card-title">Air Fuel Ratio Sensor</h5>
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
										<Link to="/" class="card">
											<img src="/img/product-4.jpg" class="card-img-top" alt="..." />
											<div class="card-body">
												<h5 class="card-title">NT05</h5>
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
							</div>
						</div>
					</div>
				</section>
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
