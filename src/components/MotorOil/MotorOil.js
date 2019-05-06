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
import { getBestSeller, getMotorOil } from '../../utils/api';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import { handleImageFallback, getTranslatedObject } from '../../utils';

class MotorOil extends Component {
	constructor(props) {
    super(props)

    this.state = {
      bestSeller: [],
			popularOilBrands: [],
    }

    this.loadBestSeller()
		getMotorOil()
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
				<section id="motor-oil">
					<div className="oil-img">
						<section className="main-cat container-fluid">
							<ul className="row">
								<li className="col-lg-4 col-6"><div><img src="/img/motor-oill.jpg" alt="Oil"/> <span><h4>{translate("navBar.motorOil")}</h4><Link to="/listing?query=&page=1&category=9" className="btn btn-primary">{translate("quotationOrder.shopNow")}</Link></span></div></li>
								<li className="col-lg-4 col-6"><div><img src="/img/gear-oil.jpg" alt="gear"/> <span><h4>{translate("nav.gearOil")}</h4><Link to="/listing?query=&page=1&category=9" className="btn btn-primary">{translate("quotationOrder.shopNow")}</Link></span></div></li>
								<li className="col-lg-4 col-6"><div><img src="/img/grease.jpg" alt="grease"/> <span><h4>{translate("nav.grease")}</h4><Link to="/listing?query=&page=1&category=9" className="btn btn-primary">{translate("quotationOrder.shopNow")}</Link></span></div></li>
							</ul>
						</section>
					</div>
					<div className="popular-oil container-fluid">
						<header>
							<h1>{translate("motorOil.popularBrands")}</h1>
						</header>
						<section className="main-cat">
							<div className="row">
								{
									this.state.popularOilBrands.map((product,idx) => (
											<Link to={`/listing?query=&page=1&category=${product.id}`} className="col-2" key={idx}>
													<img src={product.image} alt={getTranslatedObject(product, currentLanguage, 'name', 'nameAr')} />
											</Link>
									))
								}
							</div>
						</section>
					</div>
					<div className="poster">
						<img src="/img/motor-oil.png" alt="poster" />
					</div>
					<div className="best-seller container-fluid">
						<header>
							<h1>
							{translate("motorOil.oilBestSeller")}
							</h1>
						</header>

						<section className="products-sec">
			        <div>
			          <div className="tab-content">
			            <div className="tab-pane fade show active" id="best-seller" role="tabpanel">
			              <h3>{translate("offers.recommendation.bestSeller")}</h3>
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

			      </section>
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

MotorOil = reduxForm({
	form: "MotorOil"
})(MotorOil);


export default connect(mapStateToProps, mapDispatchToProps)(MotorOil);
