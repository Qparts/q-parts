import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { swiperParams } from '../../constants';
import Title from '../UI/Title';
import { Tabs, Tab } from 'react-bootstrap';

import Swiper from 'react-id-swiper';
import { getBestSeller, getOffers } from '../../utils/api';
import RenderProducts from '../RenderProducts/RenderProducts';

class Products extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bestSeller: [],
      offers: [],
      isLoading: false
    }

    this.swiperLeftHidden = createRef();
    this.bestSeller = createRef();
    this.offers = createRef();
    this.recentViewed = createRef();

    this.loadBestSeller()
    this.loadOffers()
  }

  componentDidMount = () => {
    //nav slider
    this.bestSeller.current.swiper.el.appendChild(this.swiperLeftHidden.current.cloneNode(true));
    this.offers.current.swiper.el.appendChild(this.swiperLeftHidden.current.cloneNode(true));
    this.recentViewed.current.swiper.el.appendChild(this.swiperLeftHidden.current.cloneNode(true));
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

  render() {
    const { translate, direction, currentLanguage, recentViewedProducts } = this.props;
    const { bestSeller, offers } = this.state
    return (
      <section className="products-sec">
        <div className="container-fluid">
          <Title header={translate("offers.title")} subHeader={translate("offers.subTitle")} />
          <Tabs defaultActiveKey="best-seller" id="uncontrolled-tab-example">
            <Tab eventKey="best-seller" title={translate("offers.recommendation.bestSeller")}>
              <h3>{translate("offers.recommendation.bestSeller")}</h3>
              <Swiper {...swiperParams(direction)} ref={this.bestSeller}>
                {

                  bestSeller.map((product, idx) => (
                    <RenderProducts
                      key={idx}
                      translate={translate}
                      direction={direction}
                      currentLanguage={currentLanguage}
                      isListView={false}
                      product={product} />
                  ))
                }
              </Swiper>
            </Tab>
            <Tab eventKey="offers" title={translate("offers.recommendation.offers")}>
              <h3>{translate("offers.recommendation.offers")}</h3>
              <Swiper {...swiperParams(direction)} ref={this.offers}>
                {

                  offers.map((product, idx) => (
                    <RenderProducts
                      key={idx}
                      translate={translate}
                      direction={direction}
                      currentLanguage={currentLanguage}
                      isListView={false}
                      product={product} />
                  ))
                }
              </Swiper>
            </Tab>
            <Tab eventKey="recently-viewed" title={translate("offers.recommendation.recentViewed")}>
              <h3>{translate("offers.recommendation.recentViewed")}</h3>
              <Swiper {...swiperParams(direction)} ref={this.recentViewed}>
                {

                  recentViewedProducts.map((product, idx) => (
                    <RenderProducts
                      key={idx}
                      translate={translate}
                      direction={direction}
                      currentLanguage={currentLanguage}
                      isListView={false}
                      product={product} />
                  ))
                }
              </Swiper>
            </Tab>
          </Tabs>
        </div>
        <div className="swiper-left" ref={this.swiperLeftHidden}/>
      </section>
    );
  }
}

export default withRouter(Products);