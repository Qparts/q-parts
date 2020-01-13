/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addRecentViewedProducts } from '../../actions/customerAction';
import { getSortedProducts } from '../../actions/apiAction';
import Stars from 'react-stars';

import { Link } from "react-router-dom";
import {	reduxForm } from "redux-form";
import { getTranslate } from 'react-localize-redux';


import { swiperParams } from '../../constants';
import Swiper from 'react-id-swiper';
import { getBestSeller, getPopularOilBrands } from '../../utils/api';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import { handleImageFallback, getTranslatedObject } from '../../utils';
import {  SmallScreen } from '../Device';

class Accessories extends Component {
	constructor(props) {
    super(props)

    this.state = {
      bestSeller: [],
			popularOilBrands: [],
    }

    this.loadBestSeller()
		getPopularOilBrands()
		.then(res =>{
			this.setState({
				popularOilBrands: res.data
			})
		})
  }

  loadBestSeller = () => {
    getBestSeller()
      .then(res => {
        this.setState({
          bestSeller: res.data,
          isLoading: true
        })
      });
  }
	render() {
		const { translate, direction, currentLanguage } = this.props;
        const { bestSeller } = this.state
		return (
			<Fragment>
				<section  className="accessorise-landing">
					<div className="accessories-cat container-fluid">
								<SmallScreen>
									<h3>{translate("accessories.category")}</h3>
								</SmallScreen>
								<div className="row">
									<div className="col-md-5 cables">
										<Link to="/listing?query=&page=1&category=12">
											<figure><img src="/img/Wires&Cables.jpg" alt="Wires & Cables" /></figure>
											<figcaption>{translate("nav.wiresAndCables")}</figcaption>
										</Link>
									</div>
									<div className="col-6 col-md-3 refrigerator">
										<a href="#">
											<div>
												<figcaption>Refrigerator</figcaption>
												<figure><img src="/img/refrigerator.jpg" alt="Refrigerator" /></figure>
											</div>
										</a>
									</div>
									<div className="col-6 col-md-4 car-mats">
										<Link to="/listing?query=&page=1&category=17">
											<figure><img src="/img/car-mats.jpg" alt="Car Mats" /></figure>
											<figcaption>{translate("nav.carMats")}</figcaption>
										</Link>
									</div>
								</div>
								<div className="row">
									<div className="col-md-7 bodywork">
										<Link to="/listing?query=&page=1&category=16">
											<figcaption><span>Bodywork</span> {translate("nav.bodyworkCleaningAndCare")}</figcaption>
											<figure><img src="/img/bodywork.jpg" alt="Bodywork Cleaning and Care" /></figure>
										</Link>
									</div>
									<div className="col-md-5 children-seats">
										<Link to="/listing?query=&page=1&category=15">
											<figure><img src="/img/children-seats.jpg" alt="Children Seats" /></figure>
											<figcaption>{translate("nav.childSeat")}</figcaption>
										</Link>
									</div>
								</div>
							</div>
					<div className="gray-bg pt-sec">
						<div className="container-fluid">
							<div className="row">
								<div className="col products-brand">
									<h3>{translate("accessories.popularBrands")}</h3>
									<div className="div-style">
										<ul className="row list-unstyled">
											<li className=" col-4 col-lg-2">
												<Link to={`/listing?query=&page=1&category=9&Brands=1`}>
													<img src="img/kanex.png" alt="kanex" />
												</Link>
											</li>
											<li className=" col-4 col-lg-2">
												<Link to="/">
													<img src="img/kenu.jpg" alt="kenu" />
												</Link>
											</li>
											<li className="col-4 col-lg-2">
												<Link to="/">
													<img src="img/STP.png" alt="STP" />
												</Link>
											</li>
											<li className="col-4 col-lg-2">
												<Link to="/">
													<img src="img/SONY.png" alt="SONY" />
												</Link>
											</li>
											<li className="col-4 col-lg-2">
												<Link to="/">
													<img src="img/huawei.png" alt="huawei" />
												</Link>
											</li>
											<li className="col-4 col-lg-2">
												<Link to="/">
													<img src="img/iottie.png" alt="huawei" />
												</Link>
											</li>
										</ul>
									</div>

								</div>
							</div>
							<div className="row pt-sec">
								<div className="col products-list">
									<h3>{translate("accessories.accessBestSeller")}</h3>
										<Swiper {...swiperParams(direction)}>
											{

												bestSeller.map((product, idx) => (
													<div key={idx}>
														<Link to={`/products/${product.id}`} className="card">
															<img onError={handleImageFallback} src={product.image} className="card-img-top" alt="no product" />
															<div className="card-body">
																<h5 className="card-title">{getTranslatedObject(product, currentLanguage, 'desc', 'descAr')}</h5>
																<ul className="list-inline product-info">
																	<li><strong>{getTranslatedObject(product.brand, currentLanguage, 'name', 'nameAr')}</strong></li>
																	<li>{product.number}</li>
																</ul>
																<div className="rating">
																	<Stars values={product.averageRating ? product.averageRating : 0} {...starsRating} />
																	<span>{getLength(product.reviews)} {translate("product.reviews")}</span>
																</div>
																<p className="price">{product.salesPrice.toFixed(2)} <span>{translate("general.currency")}</span></p>
															</div>
														</Link>
													</div>
												))
											}
										</Swiper>
										<div className="swiper-left"></div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		products: state.api.products,
		translate: getTranslate(state.localize),
		direction: state.customer.direction,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
		getSortedProducts: () => dispatch(getSortedProducts())
	}
}

Accessories = reduxForm({
	form: "Accessories"
})(Accessories);


export default connect(mapStateToProps, mapDispatchToProps)(Accessories);




// import React, { Component, Fragment } from 'react';
// import { connect } from 'react-redux';
// import { addRecentViewedProducts } from '../../actions/customerAction';
// import { getSortedProducts } from '../../actions/apiAction';
// import Select from 'react-select';
// import Button from '../UI/Button';
// import { styles, categorySortOptions } from '../../constants';
// import ProductGridView from '../ProductGridView/ProductGridView';
// import WithProductView from '../../hoc/WithProductView';
//
// import './Accessories.css';
//
// class Accessories extends Component {
//
//   render() {
//     const buttonsStyle = {
//       price: {
//         width: '5em'
//       }
//     }
//
//     return (
//       <Fragment>
//         <div style={styles.grey} className="Accessories-title">
//           <h4>Accessories</h4>
//         </div>
//         <div className="Accessories-sort_by">
//           <label htmlFor="">Sort by</label>
//           <Select options={categorySortOptions} onChange={this.props.handleSelectChange} />
//         </div>
//         <div className="Accessories-container">
//           <div className="Accessories-filter border rounded card">
//             <p>Categories</p>
//             <input className="form-control" type="text" name="" id="" placeholder="Search" />
//             <div>
//               <input type="checkbox" name="vehicle1" value="Bike" />
//               <label>ATD</label>
//             </div>
//             <hr />
//             <p>Made In</p>
//             <input className="form-control" type="text" name="" id="" placeholder="Search" />
//             <div>
//               <input type="checkbox" name="vehicle1" value="Bike" />
//               <label>China</label>
//             </div>
//             <hr />
//             <p>Brand</p>
//             <input className="form-control" type="text" name="" id="" placeholder="Search" />
//             <div>
//               <input type="checkbox" name="vehicle1" value="Bike" />
//               <label>ATD</label>
//             </div>
//             <hr />
//             <p>Price</p>
//             <div>
//               <input type="checkbox" name="vehicle1" value="Bike" />
//               <label>{"< 50"}</label>
//             </div>
//             <div className="Accessories-filter_price">
//               <input style={buttonsStyle.price} className="form-control" type="text" placeholder="Min" name="" id="" />
//               <input style={buttonsStyle.price} className="form-control" type="text" placeholder="Max" name="" id="" />
//               <Button text="Go" className="btn btn-secondary" />
//             </div>
//             <hr />
//             <p>Rating</p>
//             <div>
//               <input type="checkbox" name="vehicle1" value="Bike" />
//               <label>{"4 andf up more"}</label>
//             </div>
//             <div>
//               <input type="checkbox" name="vehicle1" value="Bike" />
//               <label>{"3 andf up more"}</label>
//             </div>
//             <hr />
//             <Button text="Clear all" className="btn btn-secondary" />
//           </div>
//           <div className="Accessories-contents">
//             {/* <ProductGridView product={this.props.currentProducts}/> */}
//           </div>
//         </div>
//       </Fragment >
//     )
//   }
// }
//
// const mapStateToProps = state => {
//   return {
//     products: state.api.products
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
//     getSortedProducts: () => dispatch(getSortedProducts())
//   }
// }
//
// const withAccessories = WithProductView(Accessories)
//
// export default connect(mapStateToProps, mapDispatchToProps)(withAccessories);
