import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Products from "../Products/Products";
import AppsLink from '../AppsLink/AppsLink';
import Button from "../UI/Button";
import Title from '../UI/Title';

class HomeDetails extends Component {

	render() {
		const { products, getOffers, addRecentViewedProducts, onRecentlyViewedProducts, translate } = this.props;
		return (
			<Fragment>
				<section id="home-details" className="container-fluid">
					<Title
						header="Custom order"
						subHeader="We move fast. Send us request and we will reply by price and all details"
					/>
					<div className="row">
						<div className="col col-lg-12 col-md-12 col-sm-12 col-xl-12 col-12">
							<div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
								<div className="row">
									<div className="col-lg-12">
										<div className="row text-center">
											<div className="col-lg-3">
												<img className="request" src="/img/request.svg" alt="request" />
												<figcaption className="clearfix">
													<h3>Request</h3>
													<p>Fill in your vehicle data and the <span>parts you want</span></p>
												</figcaption>
											</div>
											<div className="col-sm-12 w3-hide-large icon-arrow-down custom-order-arrow"></div>
											<div className="col-lg-3">
												<img className="check-price" src="/img/check-price.svg" alt="check-price" />
												<figcaption>
													<h3>Check Price</h3>
													<p>The price will deliver to you <span>within 24 hours</span></p>
												</figcaption>
											</div>
											<div className="col-sm-12 w3-hide-large icon-arrow-down custom-order-arrow"></div>
											<div className="col-lg-3">
												<img className="add-to-cart" src="/img/add-to-cart.svg" alt="add-to-cart" />
												<figcaption>
													<h3>Add To Cart</h3>
													<p>choose Sipping Address <span>and payment method</span></p>
												</figcaption>
											</div>
											<div className="col-sm-12 w3-hide-large icon-arrow-down custom-order-arrow"></div>
											<div className="col-lg-3">
												<img className="delivery-product" src="/img/delivery-product.svg" alt="delivery-product" />
												<figcaption>
													<h3>Receive Order</h3>
													<p>Your order for your workshop or <span>anywher you love</span></p>
												</figcaption>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
								<header>
									<h2>Start Now</h2>
									<div className="ellipse">
										<i className="icon-arrow-down" />
									</div>
								</header>
								<div className="col-12">
									<form className="form-inline d-flex p-2 justify-content-center rounded-rectangle">
										<div className="mr-2 flex-fill input-group upload-file">
											<input type="text" className="form-control part-name-input" placeholder="Part Name, Number or image" />
											<div className="input-group-prepend">
												<span className="ellipse">
													<i>
														<input type="file" ref={ref => this.fileInput = ref} />
														<Button
															text={<img className="upload-img" src="/img/upload-img.svg" alt="upload-img" />}
															type="reset" onClick={() => this.fileInput.click()} />
													</i>
												</span>
											</div>
										</div>
										<div className="mr-2 flex-fill input-group upload-file">
											<input type="text" className="form-control vin-input" placeholder="Vin Number or Vechile ID image" />
											<div className="input-group-prepend">
												<span className="ellipse">
													<i>
														<input type="file" ref={ref => this.fileInput = ref} />
														<Button
															text={<img className="upload-img" src="/img/upload-img.svg" alt="upload-img" />}
															type="reset" onClick={() => this.fileInput.click()} />
													</i>
												</span>
											</div>
										</div>
										<div className="mr-2 w-sm-100">
											<Button
												type="submit"
												className="btn-primary w-sm-100"
												text={
													<Fragment>
														<span>{translate("general.send")}</span>
														<i className="icon-arrow-right"></i>
													</Fragment>
												}
											/>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section id="catagory-imgs" className="container-fluid">
					<div className="row">
						<div className="spare-part-img-container col-md-4 col-12">
							<a href="">
								<div className="spare-part-img"></div>
								<figcaption>
									<h3>Spare Parts</h3>
								</figcaption>
							</a>
						</div>
						<div className="col-md-4 col-sm-12">
							<div className="row">
								<div className="motor-oil-img-container col-md-12 col-6">
									<a href="/motor-oil">
										<div className="motor-oil-img" />
										<figcaption>
											<h3>Motor Oil</h3>
										</figcaption>
									</a>
								</div>
								<div className="tyre-img-container col-md-12 col-6">
									<a href="/tyres">
										<div className="tyre-img" />
										<figcaption>
											<h3>Tyres</h3>
										</figcaption>
									</a>
								</div>
							</div>
						</div>
						<div className="col-md-4 col-sm-12">
							<div className="row">
								<div className="tools-img-container col-md-12 col-6">
									<a href="/tools">
										<div className="tools-img" />
										<figcaption>
											<h3>Tools</h3>
										</figcaption>
									</a>
								</div>
								<div className="accessories-img-container col-md-12 col-6">
									<a href="/accessories">
										<div className="accessories-img" />
										<figcaption>
											<h3>Accessories</h3>
										</figcaption>
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="join-us" className="container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="vendor-img-container" align="center">
								<div className="vendor-img" alt="vendor" />
							</div>
							<div className="d-flex justify-content-center">
								<p>
									OUR SALES MORE THAN 50,000 ITEM
                  <h1>VENDOR ! Join Qetaa.com</h1>
								</p>
								<Button
									type="submit"
									className="btn-primary"
									text={
										<Fragment>
											<span>{translate("general.join")}</span>
											<i className="icon-arrow-right"></i>
										</Fragment>
									}
								/>
							</div>
						</div>
					</div>
				</section>
				<Products
					products={products}
					getOffers={getOffers}
					addRecentViewedProducts={addRecentViewedProducts}
					onRecentlyViewedProducts={onRecentlyViewedProducts}
					translate={translate}
				/>
				<AppsLink />
			</Fragment>
		);
	}
}
export default HomeDetails;
