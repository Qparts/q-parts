import React, { Component } from 'react';
import { getTranslatedObject } from '../../../utils';
import { handleImageFallback } from '../../../utils';
import { right } from '../../../utils';
import { getLength } from '../../../utils/array';
import Stars from 'react-stars';
import * as constant from '../../../constants';
import _ from 'lodash';

import { withRouter, Redirect } from 'react-router-dom';
import { MediumScreen, SmallScreen } from '../../../components/Device';

import Login from "../../Authentication/Login/Login";
import Title from '../../../components/UI/Title';


class AddProduct extends Component {
  continueShoppingMoblile = () => {
    this.props.history.push({
      pathname: `/`,
    })
  }
  continueShopping = (values) => {
    values.preventDefault();
    this.props.togglePopup();
  }
  handleSubmit = values => {
    values.preventDefault();
    if (this.props.token) {
      this.props.history.push('/checkout');
    } else {
      this.props.history.push('/login')
    }
  }

  getbackground = () => {
    if (window.innerWidth <= 767) {
      return {
        background: constant.colors.basicWhite
      }
    } else
      return {
        background: ''
      }
  }

  render() {
    const data = _.has(this.props.location.state, 'data') ? this.props.location.state.data : this.props.data;
    if (_.isEmpty(data)) return <Redirect to="/" />

    const { translate, currentLanguage } = this.props;

    return <section className="add-product container-fluid">
      <SmallScreen>
        <Title number={data.quantity} header={translate("dialog.addToCart.title")} />
      </SmallScreen>
      <form className="row">
        <div className="row item">
          <img
            src={data.image}
            onError={handleImageFallback}
            alt=""
          />
          <div className="text-item">
            <div>
              <span className="product-item_desc">{data.desc}</span>
            </div>
            <div>
              <span className="product-Name">{translate("general.by")}</span>
              <span className="product-Name">{getTranslatedObject(data.brand, currentLanguage, 'name', 'nameAr')}</span>
              <span className="product-Number"> {data.productNumber} </span>
              <div className="product-rate">
                <Stars values={data.averageRating} {...constant.starsRating} />
                {getLength(data.reviews)} {translate("product.reviews")}
              </div>
            </div>
            <div >
              <span className="product-price">{data.salesPrice.toFixed(2)}</span>
              <sub className="product-price-sr">{translate("general.currency")}</sub>
            </div>
            <div>
              <span className="product-quantity">{translate("general.quantity")}: {data.quantity} </span>
            </div>
          </div>
        </div>
        <div style={this.getbackground()} className="btn-primary col-9"><span>{translate("general.subtotal")} ({data.quantity} {translate("dialog.addToCart.items")})</span></div>
        <div style={this.getbackground()} className="btn-primary sale-price col-2">
          <p>{data.salesPrice.toFixed(2)}<sub>{translate("general.currency")}</sub></p>
        </div>

        <div className="btn-footer col-12">
          <div className="group-shadow-input group-shadow-div"></div>
          <MediumScreen>
            <button className="btn btn-primary" onClick={this.continueShopping}>{translate("general.buttons.continueShopping")}</button>
            <button onClick={this.handleSubmit} className="btn check-out">{translate("general.buttons.checkout")}<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
          </MediumScreen>
          <SmallScreen>
            <button style={this.getbackground()} className="btn btn-primary" onClick={this.continueShoppingMoblile}>{translate("general.buttons.continueShopping")}</button>
            <button onClick={this.handleSubmit} className="btn check-out">{translate("general.buttons.checkout")}<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
          </SmallScreen>
        </div>
      </form>
    </section>
  }
}

const withAddProduct = withRouter(AddProduct);

export default withAddProduct;
