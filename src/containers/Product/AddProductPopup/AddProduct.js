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

import Title from '../../../components/UI/Title';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

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
      this.props.togglePopupLogin();
      this.props.togglePopup();
      this.props.setCheckLoginCheckout(true);
    }
  }
  handleSubmitMoblie = values => {
    values.preventDefault();
    if (this.props.token) {
      this.props.history.push('/checkout');
    } else {
      this.props.history.push('/loginCheckout');
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

    const { translate, currentLanguage, direction } = this.props;

    return <section className="add-product container-fluid">
      <SmallScreen>
        <Title number={data.quantity} header={translate("dialog.addToCart.title")} />
      </SmallScreen>
      <div className="row">
        <div className="col-6">
          <img
            src={data.image}
            onError={handleImageFallback}
            alt=""
          />
        </div>
        <div className="col-6">
          <ul className="list-inline product-item">
            <li className="product-item_desc"><h5>{data.desc}</h5></li>
            <div>
              <li className="product-brand">
                <strong>{getTranslatedObject(data.brand, currentLanguage, 'name', 'nameAr')}</strong>
              </li>
              <li className="product-number">#{data.productNumber}</li>
            </div>
            <div className="product-review">
              <li><Stars values={data.averageRating} {...constant.starsRating} /></li>
              <li>{getLength(data.reviews)} {translate("product.reviews")}</li>
            </div>
            <li className="product_price-quantity">
              <p className="price">{data.salesPrice.toFixed(2)}<span>{translate("general.currency")}</span></p>
              <p className="quantity">{translate("general.quantity")}: {data.quantity}</p>
            </li>
          </ul>
        </div>
      </div>
      <div className="subtotal">
        <div className="row">
          <div className={`${currentLanguage === constant.EN ? 'col-8' : 'col-7'} subtotal-main`}>
            <p>{translate("general.subtotal")} ({data.quantity} {translate("dialog.addToCart.items")})</p>
          </div>
          <p className="product_amount col d-flex align-items-center">{data.salesPrice.toFixed(2)}<span>{translate("general.currency")}</span></p>
        </div>
      </div>
      <div className="row">
        <div className="btn-footer col-12">
          {/* <div className="group-shadow-input group-shadow-div"/> */}
          <MediumScreen>
            <button className="btn btn-gray-secondary continue-btn" onClick={this.continueShopping}>{translate("general.buttons.continueShopping")}</button>
            <button onClick={this.handleSubmit} className="btn btn-primary check-out-btn">{translate("general.buttons.checkout")}<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
          </MediumScreen>
          <SmallScreen>
            <button style={this.getbackground()} className="btn btn-gray-secondary continue-btn" onClick={this.continueShoppingMoblile}>{translate("general.buttons.continueShopping")}</button>
            <button onClick={this.handleSubmitMoblie} className="btn btn-primary check-out-btn">{translate("general.buttons.checkout")}<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
          </SmallScreen>
        </div>
      </div>
    </section>
  }
}

const withAddProduct = withRouter(AddProduct);

export default withAddProduct;
