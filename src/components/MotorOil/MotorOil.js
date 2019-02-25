import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addRecentViewedProducts } from '../../actions/customerAction';
import { getSortedProducts } from '../../actions/apiAction';
import Slider from 'react-slick';
import Stars from 'react-stars';
import Title from '../UI/Title';
import Manufacturers from '../Manufacturers/Manufacturers';
import Ads from '../Ads/Ads';

import { Link } from "react-router-dom";
import {	reduxForm } from "redux-form";
import { getTranslate } from 'react-localize-redux';


import { BEST_SELLER } from '../../constants';
import Swiper from 'react-id-swiper';
import { getBestSeller } from '../../utils/api';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import { handleImageFallback } from '../../utils';

class MotorOil extends Component {
	constructor(props) {
    super(props)

    this.state = {
      bestSeller: []
    }

    this.loadBestSeller()
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
		const { translate } = this.props;
    const { bestSeller } = this.state
		const params = {
      containerClass: `swiper-container products-list`,
      slidesPerView: 5,
      spaceBetween: 30,
      grabCursor: true,
      lazy: true,
      rebuildOnUpdate: true,
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
			<Fragment>
				<section id="motor-oil">
					<div className="oil-img">
						<section className="main-cat container-fluid">
							<div className="row">
								<Link to="/listing?query=&page=1&category=9" className="col-lg-4 col-6">
									<figure>
										<img src="/img/motor-oil.png" alt="Oil" />
										<figcaption>
											<h4>{translate("navBar.motorOil")}</h4>
										</figcaption>
										<span>{translate("quotationOrder.shopNow")}</span>
									</figure>
								</Link>
								<Link to="/listing?query=&page=1&category=13" className="col-lg-4 col-6">
									<figure>
										<img src="/img/tyres.png" alt="Tires" />
										<figcaption>
											<h4>Gear Oil</h4>
										</figcaption>
										<span>{translate("quotationOrder.shopNow")}</span>
									</figure>
								</Link>
								<Link to="/listing?query=&page=1&category=28" className="col-lg-4 col-6">
									<figure>
										<img src="/img/tools.png" alt="Tools" />
										<figcaption>
											<h4>Grease</h4>
										</figcaption>
										<span>{translate("quotationOrder.shopNow")}</span>
									</figure>
								</Link>
							</div>
						</section>
					</div>
					<div className="popular-oil container-fluid">
						<header>
							<h1>Popular Oil Brands</h1>
						</header>
						<section className="main-cat">
							<div className="row">
								<Link to="/listing?query=&page=1&category=9" className="col-2">
										<img src="/img/motor-oil.png" alt="Oil" />
								</Link>
								<Link to="/listing?query=&page=1&category=13" className="col-2">
										<img src="/img/tyres.png" alt="Tires" />
								</Link>
								<Link to="/listing?query=&page=1&category=28" className="col-2">
										<img src="/img/tools.png" alt="Tools" />
								</Link>
								<Link to="/listing?query=&page=1&category=9" className="col-2">
										<img src="/img/motor-oil.png" alt="Oil" />
								</Link>
								<Link to="/listing?query=&page=1&category=13" className="col-2">
										<img src="/img/tyres.png" alt="Tires" />
								</Link>
								<Link to="/listing?query=&page=1&category=28" className="col-2">
										<img src="/img/tools.png" alt="Tools" />
								</Link>
							</div>
						</section>
					</div>
					<div className="poster">
						<img src="/img/motor-oil.png" alt="poster" />
					</div>
					<div className="best-seller container-fluid">
						<header>
							<h1>
								Oil Bestseller
							</h1>
						</header>

						<section className="products-sec">
			        <div>
			          <div className="tab-content">
			            <div className="tab-pane fade show active" id="best-seller" role="tabpanel">
			              <h3>Best Seller</h3>
			              <Swiper {...params}>
			                {

			                  bestSeller.map((product, idx) => (
			                    <div key={idx}>
			                      <Link to={`/products/${product.id}`} className="card">
			                        <img onError={handleImageFallback} src={product.image} className="card-img-top" alt="no product" />
			                        <div className="card-body">
			                          <h5 className="card-title">{product.desc}</h5>
			                          <ul className="list-inline product-info">
			                            <li><strong>{product.brand.name}</strong></li>
			                            <li>{product.number}</li>
			                          </ul>
			                          <div className="rating">
			                            <Stars values={product.averageRating ? product.averageRating : 0} {...starsRating} />
			                            <span>{getLength(product.reviews)} review</span>
			                          </div>
			                          <p className="price">{product.salesPrice.toFixed(2)} <span>sr</span></p>
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
