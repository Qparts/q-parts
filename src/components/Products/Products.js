import React, { Component } from 'react';
import Button from '../UI/Button';
import { withRouter } from 'react-router-dom';
import Slider from "react-slick";
import Stars from 'react-stars';
import { sliderSetting, starsRating } from '../../constants';
import Title from '../UI/Title';

import './Products.css';
import { BEST_SELLER, OFFERS } from '../../constants';

class Products extends Component {

    goToProduct = (product, event) => {
        this.props.addRecentViewedProducts(product);
        this.props.history.push(`/products/${product.id}`)
    }

    getReviewsLength = (reviews) => (
        reviews ? reviews.length : 0
    )

    render() {
        const { translate } = this.props;
        return (
            <section id="products">
                <div className="">
                    <div className="container-fluid">
                        <Title
                            header={translate("offers.title")}
                            subHeader={translate("offers.subTitle")}
                        />
                        <div className="row">
                            <div className="col">
                                <ul
                                    className="nav nav-pills list-inline align-items-center"
                                    id="pills-tab"
                                    role="tablist">
                                    <li>
                                        <Button
                                            type="button"
                                            className="btn-link selected"
                                            text={translate("offers.recommendation.bestSeller")}
                                            onClick={this.props.getOffers.bind(this, BEST_SELLER)} />
                                    </li>
                                    <li>
                                        <span className="seperator" />
                                    </li>
                                    <li>
                                        <Button
                                            type="button"
                                            className="btn-link"
                                            text={translate("offers.recommendation.offers")}
                                            onClick={this.props.getOffers.bind(this, OFFERS)} />
                                    </li>
                                    <li>
                                        <span className="seperator" />
                                    </li>
                                    <li>
                                        <Button
                                            type="button"
                                            className="btn-link"
                                            text={translate("offers.recommendation.recentViewed")}
                                            onClick={this.props.onRecentlyViewedProducts} />
                                    </li>
                                </ul>
                            </div>
                            <div className="tab-content col" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="best-seller" role="tabpanel" aria-labelledby="best-seller-tab">
                                    <Slider {...sliderSetting}>
                                        {
                                            this.props.products.map((product, idx) => (
                                                <a href="" key={idx} className="card" onClick={this.goToProduct.bind(this, product)}>
                                                    <img className="card-img-top" src="/img/product-2.jpg" alt="product" />
                                                    <div className="card-body">
                                                        <h5 className="card-title">{product.desc}</h5>
                                                        <p className="product-brand">{product.manufacturer.name}</p>
                                                        <div className="product-review">
                                                            <Stars values={product.averageRating} {...starsRating} />
                                                            <span className="total-review">{this.getReviewsLength(product.reviews)} review</span>
                                                        </div>
                                                        <p className="price">
                                                            {product.salesPrice.toFixed(2)} <span className="currency">SR</span>
                                                        </p>
                                                    </div>
                                                </a>
                                            ))
                                        }
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default withRouter(Products);