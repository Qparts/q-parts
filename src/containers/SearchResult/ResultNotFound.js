import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../../components/UI/Link';

import { right } from '../../utils';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';

import Products from "../../components/Products/Products";
import { Link } from "react-router-dom";

class ResultNotFound extends Component {
  render () {
    const { recentViewedProducts, translate, direction, currentLanguage } = this.props;

    return(
      <Fragment>
        <div className="container-fluid">
          <div className="no-products">
            <div>
              <div className="gray-bg"></div>
              <div class="media">
                <img alt="No Products" src="/img/no-products.svg"/>
                <div class="media-body">
                  <h5 class="mt-0">{translate("noResult.no-product")}</h5>
                  <Button className="btn btn-primary" icon={`icon-arrow-${right(direction)}`} text={translate("noResult.custom-order")} to={'/quotation-order'}/>
                </div>
              </div>
            </div>
          </div>

          <section className="main-cat">
            <div className="row">
              <div className="col">
                <header class="sec-header"><h1><p>{translate("noResult.shopBy")}</p>{translate("noResult.category")}</h1></header>
              </div>
            </div>
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

        </div>
        <Products
          recentViewedProducts={recentViewedProducts}
          translate={translate}
          direction={direction}
          currentLanguage={currentLanguage}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    direction: state.customer.direction,
    translate: getTranslate(state.localize),
    recentViewedProducts: state.customer.recentViewedProducts,
    currentLanguage: getActiveLanguage(state.localize).code,
  }
}

export default connect(mapStateToProps, null)(ResultNotFound);
