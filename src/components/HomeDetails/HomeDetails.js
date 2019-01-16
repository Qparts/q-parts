import React, { Component, Fragment } from "react";
import Products from "../Products/Products";
import Button from "../UI/Button";
import Title from '../UI/Title';

class HomeDetails extends Component {

	render() {
		const { products, getOffers, addRecentViewedProducts, onRecentlyViewedProducts, translate } = this.props;
		return (
			<Fragment>
				<section className="start-custom-order">
						<Title header="Custom order"subHeader="We move fast. Send us request and we will reply by price and all details"/>
						<ul className="order-steps">
							<li>
								<figure>
									<div>
										<div className="figure request"><img src="/img/request.svg" alt="request" /></div>
										<span><i className="icon-arrow-right"></i></span>
									</div>
										<figcaption>
											<h3>Request</h3>
											<p>Fill in your vehicle data and the <span>parts you want</span></p>
										</figcaption>
								</figure>
							</li>
							<li>
								<figure>
									<div>
										<span></span>
										<div className="figure price"><img src="/img/check-price.svg" alt="check-price" /></div>
										<span><i className="icon-arrow-right"></i></span>
									</div>
									<figcaption>
										<h3>Check Price</h3>
										<p>The price will deliver to you <span>within 24 hours</span></p>
									</figcaption>
								</figure>
							</li>
							<li>
								<figure>
									<div>
										<span></span>
										<div className="figure cart"><img src="/img/add-to-cart.svg" alt="add-to-cart" /></div>
										<span><i className="icon-checked"></i></span>
									</div>
									<figcaption>
										<h3>Add To Cart</h3>
										<p>choose Sipping Address <span>and payment method</span></p>
									</figcaption>
								</figure>
							</li>
							<li>
								<figure>
									<div>
										<span></span>
										<div className="figure delivery"><img src="/img/delivery-product.svg" alt="delivery-product" /></div>
									</div>
									<figcaption>
										<h3>Receive Order</h3>
										<p>Your order for your workshop or <span>anywher you love</span></p>
									</figcaption>
								</figure>
							</li>
						</ul>
						<div className="order-form">
							<header>
								<h2><span className="arrow"><i className="icon-arrow-down" /></span>Start Now</h2>
							</header>
							<div className="form-details">
								<form>
									<div className="form-row">
										<div className="col">
											<input type="text" class="form-control" placeholder="Part Name, Number or image" />
											<div className="input-group-prepend">
												<input type="file" ref={ref => this.fileInput = ref} />
												<Button text={<img className="upload-img" src="/img/upload-img.svg" alt="upload-img" />} type="reset" onClick={() => this.fileInput.click()} />
											</div>
										</div>
										<div className="col">
											<input type="text" class="form-control" placeholder="Vin Number or Vechile ID image" />
											<div className="input-group-prepend">
												<input type="file" ref={ref => this.fileInput = ref} />
												<Button text={<img className="upload-img" src="/img/upload-img.svg" alt="upload-img" />} type="reset" onClick={() => this.fileInput.click()} />
											</div>
										</div>
										<div className="col-auto">
											<button type="submit"className="btn-primary">
												<span>{translate("general.send")}</span>
												<i className="icon-arrow-right"></i>
											</button>
										</div>
									</div>
								</form>
						</div>
						</div>
				</section>
				<section className="main-cat">
					<div className="row">
							<a href="#" className="col-lg-4 col-6">
								<figure>
									<img src="/img/motor-oil.png" alt="Oil" />
									<figcaption>
										<h4>Oil</h4>
									</figcaption>
									<span>Shop Now</span>
								</figure>
							</a>
							<a href="#" className="col-lg-4 col-6">
								<figure>
									<img src="/img/tyres.png" alt="Tires" />
									<figcaption>
										<h4>Tires</h4>
									</figcaption>
									<span>Shop Now</span>
								</figure>
							</a>
							<a href="#" className="col-lg-4 col-6">
								<figure>
									<img src="/img/tools.png" alt="Tools" />
									<figcaption>
										<h4>Tools</h4>
									</figcaption>
									<span>Shop Now</span>
								</figure>
							</a>
							<a href="#" className="col-lg-4 col-6">
								<figure>
									<img src="/img/accessories.png" alt="Accessories" />
									<figcaption>
										<h4>Accessories</h4>
									</figcaption>
									<span>Shop Now</span>
								</figure>
							</a>
							<a href="#" className="col-lg-4 col-6">
								<figure>
									<img src="/img/outdoor-cat.jpg" alt="Outdoors" />
									<figcaption>
										<h4>Outdoors</h4>
									</figcaption>
									<span>Shop Now</span>
								</figure>
							</a>
							<a href="#" className="col-lg-4 col-6">
								<figure>
									<img src="/img/car-care.jpg" alt=" Car Care" />
									<figcaption>
										<h4> Car Care </h4>
									</figcaption>
									<span>Shop Now</span>
								</figure>
							</a>
					</div>
				</section>
				<section className="main-parts">
					<header>
						<h1>MUST HAVES FOR EVERY CAR</h1>
					</header>
					<ul>
						<li className="oil">
							<a href="#">
								<img src="/img/oil-filter.svg" alt="Premium quality oil for your engine"/>
								<div class="media-body">
									<h5>Oil Filter</h5>
									<p>Premium quality oil for your engine</p>
								</div>
							</a>
						</li>
						<li className="air">
							<a href="#">
								<img src="/img/air-filter.svg" alt="Maximize engine  performance"/>
								<div class="media-body">
									<h5>Air Filters</h5>
									<p>Maximize engine  performance</p>
								</div>
							</a>
						</li>
						<li className="brake">
							<a href="#">
								<img src="/img/disc-brake.svg" alt="Get trusted stopping  power"/>
								<div class="media-body">
									<h5>Brake Parts</h5>
									<p>Get trusted stopping  power</p>
								</div>
							</a>
						</li>
					</ul>
				</section>
				<section className="vendor">
					<div className="row">
						<div className="col-12">
							<div className="vendor-details">
								<picture>
				          <source media="(max-width: 576px)" srcset="/img/vendor-xs.jpg" />
				          <source media="(max-width: 992px)" srcset="/img/vendor.png" />
				          <img src="/img/vendor.png" alt="OUR SALES MORE THAN 50,000 ITEM" />
				        </picture>
								<div>
									<h1>
										<span>OUR SALES MORE THAN 50,000 ITEM</span>
										VENDOR ! Join Qetaa.com
									</h1>
									<a className="btn-primary" href="#"><span>{translate("general.join")}</span><i className="icon-arrow-right"></i></a>
								</div>
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
			</Fragment>
		);
	}
}
export default HomeDetails;
