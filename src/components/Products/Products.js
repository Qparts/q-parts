import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Stars from 'react-stars';
import { sliderSetting, starsRating, params } from '../../constants';
import Title from '../UI/Title';

import './Products.css';
import { BEST_SELLER, OFFERS } from '../../constants';
import Swiper from 'react-id-swiper';
import { getLength } from '../../utils/array';
import { getBestSeller, getOffers } from '../../utils/api';
import { handleImageFallback, getTranslatedString } from '../../utils';

class Products extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bestSeller: [],
      offers: [],
      isLoading: false
    }

    this.loadBestSeller()
    this.loadOffers()
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

  loadOffers = () => {
    getOffers()
      .then(res => {
        this.setState({
          offers: res.data,
          isLoading: true
        })
      });
  }

  goToProduct = (product, event) => {
    this.props.addRecentViewedProducts(product);
    this.props.history.push(`/products/${product.id}`)
  }
  getReviewsLength = (reviews) => (
    reviews ? reviews.length : 0
  )
  componentDidMount = () => {
    //nav slider
    const swiperLeftHidden = document.getElementsByClassName("swiper-left")[0];
    document.getElementsByClassName("products-list")[0].appendChild(swiperLeftHidden);
  }

  render() {
    const { translate, direction, currentLanguage } = this.props;
    const { bestSeller, offers } = this.state
    return (
      <section className="products-sec">
        <div className="container-fluid">
          <Title header={translate("offers.title")} subHeader={translate("offers.subTitle")} />
          <ul className="nav">
            <li>
              <a className="active" data-toggle="tab" href="#best-seller" role="tab" aria-controls="best-seller" aria-selected="true">
              {translate("offers.recommendation.bestSeller")}</a>
            </li>
            <li>
              <a data-toggle="tab" href="#offers" role="tab" aria-controls="offers" aria-selected="false">{translate("offers.recommendation.offers")}</a>
            </li>
            <li>
              <a data-toggle="tab" href="#recently-viewed" role="tab" aria-controls="recently-viewed" aria-selected="false">
              {translate("offers.recommendation.recentViewed")}</a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="best-seller" role="tabpanel">
              <h3>{translate("offers.recommendation.bestSeller")}</h3>
              <Swiper {...params(direction)}>
                {
                  
                  bestSeller.map((product, idx) => (
                    <div key={idx}>
                      <Link to={`/products/${product.id}`} className="card">
                        <img onError={handleImageFallback} src={product.image} className="card-img-top" alt="no product" />
                        <div className="card-body">
                          <h5 className="card-title">{product.desc}</h5>
                          <ul className="list-inline product-info">
                            <li><strong>{getTranslatedString(product.brand, currentLanguage, 'name', 'nameAr')}</strong></li>
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
            <div className="tab-pane fade" id="offers" role="tabpanel" >
              <h3>{translate("offers.recommendation.offers")}</h3>
            </div>
            <div className="tab-pane fade" id="recently-viewed" role="tabpanel">
              <h3>{translate("offers.recommendation.recentViewed")}</h3>
            </div>
          </div>
        </div>

      </section>
    );
  }
}

export default withRouter(Products);

//tab links


// <ul
//     className="nav nav-pills list-inline align-items-center"
//     id="pills-tab"
//     role="tablist">
//     <li>
//         <Button
//             type="button"
//             className="btn-gray selected"
//             text={translate("offers.recommendation.bestSeller")}
//             onClick={this.props.getOffers.bind(this, BEST_SELLER)} />
//     </li>
//     <li>
//         <span className="seperator" />
//     </li>
//     <li>
//         <Button
//             type="button"
//             className="btn-gray"
//             text={translate("offers.recommendation.offers")}
//             onClick={this.props.getOffers.bind(this, OFFERS)} />
//     </li>
//     <li>
//         <span className="seperator" />
//     </li>
//     <li>
//         <Button
//             type="button"
//             className="btn-gray"
//             text={translate("offers.recommendation.recentViewed")}
//             onClick={this.props.onRecentlyViewedProducts} />
//     </li>
// </ul>

//tab tabContent

// <div className="tab-content col" id="pills-tabContent">
//     <div className="tab-pane fade show active" id="best-seller" role="tabpanel" aria-labelledby="best-seller-tab">
//         <Slider {...sliderSetting}>
//             {
//                 this.props.products.map((product, idx) => (
//                     <a href="" key={idx} className="card" onClick={this.goToProduct.bind(this, product)}>
//                         <img className="card-img-top" src="/img/product-2.jpg" alt="product" />
//                         <div className="card-body">
//                             <h5 className="card-title">{product.desc}</h5>
//                             <p className="product-brand">{product.manufacturer.name}</p>
//                             <div className="product-review">
//                                 <Stars values={product.averageRating} {...starsRating} />
//                                 <span className="total-review">{this.getReviewsLength(product.reviews)} review</span>
//                             </div>
//                             <p className="price">
//                                 {product.salesPrice.toFixed(2)} <span className="currency">SR</span>
//                             </p>
//                         </div>
//                     </a>
//                 ))
//             }
//         </Slider>
//     </div>
// </div>
