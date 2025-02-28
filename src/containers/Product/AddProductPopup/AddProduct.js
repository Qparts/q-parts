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

    return <section className="add-product">
      <SmallScreen>
        <Title number={data.quantity} header={translate("dialog.addToCart.title")} />
      </SmallScreen>
      <div class="media">
        <span className="media-img">
          <img
            src={data.image}
            onError={handleImageFallback}
            alt=""
          />
        </span>
        <div class="media-body">
          <h5>{data.desc}</h5>
          <ul className="list-inline product-item">
              <li>
                <strong>{getTranslatedObject(data.brand, currentLanguage, 'name', 'nameAr')}</strong> #{data.productNumber}
              </li>
              <li className="product-review">
                <Stars values={data.averageRating} {...constant.starsRating} />
                {getLength(data.reviews)} {translate("product.reviews")}
            </li>
          </ul>
          <p className="price">{data.salesPrice.toFixed(2)}<span>{translate("general.currency")}</span></p>
          <p>{translate("general.quantity")}: {data.quantity}</p>
        </div>
      </div>

      <div className="subtotal">
          <div className="col">
            {translate("general.subtotal")} <p>({data.quantity} {translate("dialog.addToCart.items")})</p>
          </div>
          <div className="price col-auto">
            {data.salesPrice.toFixed(2)}<span>{translate("general.currency")}</span>
          </div>
      </div>
      <MediumScreen>
        <div className="btn-footer row">
          <div className="col-md-7 offset-md-5">
            <div className="row">
              <div className="action-shadow"></div>
              <div className="col-auto">
                <button className="btn btn-gray" onClick={this.continueShopping}>{translate("general.buttons.continueShopping")}</button>
              </div>
              <div className="col">
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>{translate("general.buttons.checkout")}<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
              </div>
            </div>
          </div>
        </div>
      </MediumScreen>
      <SmallScreen>
        <div className="btn-footer">
          <div className="row">
            <div className="col-auto">
              <button  className="btn btn-gray" onClick={this.continueShoppingMoblile}>{translate("general.buttons.continueShopping")}</button>
            </div>
            <div className="col">
              <button onClick={this.handleSubmitMoblie} className="btn btn-primary">{translate("general.buttons.checkout")}<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
            </div>
          </div>
        </div>
    </SmallScreen>
    </section>
  }
}

const withAddProduct = withRouter(AddProduct);

export default withAddProduct;
