import React, { Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import Stars from 'react-stars';
import { sliderSetting, starsRating } from '../../constants';
import Title from '../UI/Title';

import './Products.css';
import { BEST_SELLER, OFFERS } from '../../constants';
import Swiper from 'react-id-swiper';

class Products extends Component {
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
        const { translate } = this.props;
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
            <section className="products-sec">
              <div className="container-fluid">
                <Title header={translate("offers.title")} subHeader={translate("offers.subTitle")} />
                  <ul className="nav">
                    <li>
                      <a className="active" data-toggle="tab" href="#best-seller" role="tab" aria-controls="best-seller" aria-selected="true">Best Seller</a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#offers" role="tab" aria-controls="offers" aria-selected="false">Offers</a>
                    </li>
                    <li>
                      <a data-toggle="tab" href="#recently-viewed" role="tab" aria-controls="recently-viewed" aria-selected="false">Recently Viewed</a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="best-seller" role="tabpanel">
                      <h3>Best Seller</h3>
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
                    </div>
                    <div className="tab-pane fade" id="offers" role="tabpanel" >
                      <h3>Offers</h3>
                    </div>
                    <div className="tab-pane fade" id="recently-viewed" role="tabpanel">
                      <h3>recently-viewed</h3>
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
//             className="btn-link selected"
//             text={translate("offers.recommendation.bestSeller")}
//             onClick={this.props.getOffers.bind(this, BEST_SELLER)} />
//     </li>
//     <li>
//         <span className="seperator" />
//     </li>
//     <li>
//         <Button
//             type="button"
//             className="btn-link"
//             text={translate("offers.recommendation.offers")}
//             onClick={this.props.getOffers.bind(this, OFFERS)} />
//     </li>
//     <li>
//         <span className="seperator" />
//     </li>
//     <li>
//         <Button
//             type="button"
//             className="btn-link"
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
