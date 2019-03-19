import React, { Component, Fragment } from "react";
import Products from "../Products/Products";
import Title from '../UI/Title';
import { right } from '../../utils';
import OrderSteps from '../OrderSteps';
import { Link } from "react-router-dom";
import Button from '../UI/Link';

class HomeDetails extends Component {

	render() {
		const { recentViewedProducts, translate, direction, currentLanguage } = this.props;
		return (
			<Fragment>
				<section className="start-custom-order container-fluid">
					<Title header={translate("quotationOrder.title")} subHeader={translate("quotationOrder.weMoveFast")} caption={translate("quotationOrder.request")} />
					<OrderSteps translate={translate} direction={direction} />
					{/* <div className="order-form">
							<header className="row">
								<h2 className="col col-10 mx-auto">
									<span className="arrow"><i className="icon-arrow-down" /></span>
									{translate("quotationOrder.startNow")}
								</h2>
							</header>
							<div className="form-details">
								<form className="col-lg-10 offset-lg-1 box-shadow">
									<div className="form-row ">
										<div className="col">
											<input type="text" className="form-control input" placeholder={translate("quotationOrder.parts")} />
											<div className="input-group-prepend">
												<input type="file" ref={ref => this.fileInput = ref} />
												<Button text={<img className="upload-img" src="/img/upload-img.svg" alt="upload-img" />} type="reset" onClick={() => this.fileInput.click()} />
											</div>
										</div>
										<div className="col">
											<input type="text" className="form-control input" placeholder={translate("quotationOrder.vin")}/>
											<div className="input-group-prepend">
												<input type="file" ref={ref => this.fileInput = ref} />
												<Button text={<img className="upload-img" src="/img/upload-img.svg" alt="upload-img" />} type="reset" onClick={() => this.fileInput.click()} />
											</div>
										</div>
										<div className="col-auto">
											<button type="submit"className="btn btn-primary">
												<span>{translate("general.send")}</span>
												<i className={`icon-arrow-${right(direction)}`}></i>
											</button>
										</div>
									</div>
								</form>
							</div>
						
						</div> */}
					<div className="d-flex justify-content-center">
						<Button
							className="btn btn-primary"
							to={'/quotation-order'}
							text={translate("quotationOrder.startHere")}
						/>
					</div>
				</section>
				<section className="main-cat container-fluid">
					<div className="row">
						<Link to="/listing?query=&page=1&category=9" className="col-lg-4 col-6">
							<figure>
								<img src="/img/motor-oil.png" alt="Oil" />
								<figcaption>
									<h4>{translate("nav.oil")}</h4>
								</figcaption>
								<span>{translate("quotationOrder.shopNow")}</span>
							</figure>
						</Link>
						<Link to="/listing?query=&page=1&category=13" className="col-lg-4 col-6">
							<figure>
								<img src="/img/tyres.png" alt="Tires" />
								<figcaption>
									<h4>{translate("nav.tires")}</h4>
								</figcaption>
								<span>{translate("quotationOrder.shopNow")}</span>
							</figure>
						</Link>
						<Link to="/listing?query=&page=1&category=28" className="col-lg-4 col-6">
							<figure>
								<img src="/img/tools.png" alt="Tools" />
								<figcaption>
									<h4>{translate("quotationOrder.tools")}</h4>
								</figcaption>
								<span>{translate("quotationOrder.shopNow")}</span>
							</figure>
						</Link>
						<Link to="/listing?query=&page=1&category=10" className="col-lg-4 col-6">
							<figure>
								<img src="/img/accessories.png" alt="Accessories" />
								<figcaption>
									<h4>{translate("quotationOrder.accessories")}</h4>
								</figcaption>
								<span>{translate("quotationOrder.shopNow")}</span>
							</figure>
						</Link>
						<Link to="/listing?query=&page=1&category=36" className="col-lg-4 col-6">
							<figure>
								<img src="/img/outdoor-cat.jpg" alt="Outdoors" />
								<figcaption>
									<h4>{translate("quotationOrder.outdoors")}</h4>
								</figcaption>
								<span>{translate("quotationOrder.shopNow")}</span>
							</figure>
						</Link>
						<Link to="/listing?query=&page=1&category=26" className="col-lg-4 col-6">
							<figure>
								<img src="/img/car-care.jpg" alt=" Car Care" />
								<figcaption>
									<h4>{translate("quotationOrder.carCare")}</h4>
								</figcaption>
								<span>{translate("quotationOrder.shopNow")}</span>
							</figure>
						</Link>
					</div>
				</section>
				<section className="main-parts container-fluid">
					<header className="row">
						<h1 className="col">{translate("quotationOrder.mustHaves")}</h1>
					</header>
					<ul className="list-unstyled row">
						<li className="oil col-md-4 col-lg-auto">
							<Link to="/listing?query=&page=1&category=2" >
								<img src="/img/oil-filter.svg" alt="Premium quality oil for your engine" />
								<div className="media-body">
									<h5>{translate("quotationOrder.oilFilter")}</h5>
									<p>{translate("quotationOrder.premium")}</p>
								</div>
							</Link>
						</li>
						<li className="air col-md-4 col col-lg-auto">
							<Link to="/listing?query=&page=1&category=3" >
								<img src="/img/air-filter.svg" alt="Maximize engine  performance" />
								<div className="media-body">
									<h5>{translate("quotationOrder.airFilter")}</h5>
									<p>{translate("quotationOrder.max")}</p>
								</div>
							</Link>
						</li>
						<li className="brake col-md-4 col-lg-auto">
							<Link to="/listing?query=&page=1&category=6" >
								<img src="/img/disc-brake.svg" alt="Get trusted stopping  power" />
								<div className="media-body">
									<h5>{translate("quotationOrder.brakePads")}</h5>
									<p>{translate("quotationOrder.trusted")}</p>
								</div>
							</Link>
						</li>
					</ul>
				</section>
				<section className="vendor container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="vendor-details">
								<picture>
									<source media="(max-width: 991px)" srcSet="/img/vendor-xs.jpg" />
									<source media="(max-width: 992px)" srcSet="/img/vendor.png" />
									<img src="/img/vendor.png" alt="OUR SALES MORE THAN 50,000 ITEM" />
								</picture>
								<div className="d-flex justify-content-center">
									<h1>
										<span>{translate("quotationOrder.vendor.items")}</span>
										{translate("quotationOrder.vendor.joinUs")}
									</h1>
									<a className="btn btn-primary" href="#"><span>{translate("general.join")}</span><i className={`icon-arrow-${right(direction)}`}></i></a>
								</div>
							</div>

						</div>
					</div>
				</section>
				<Products
					recentViewedProducts={recentViewedProducts}
					translate={translate}
					direction={direction}
					currentLanguage={currentLanguage}
				/>
			</Fragment>
		);
	}
}
export default HomeDetails;
