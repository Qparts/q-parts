/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { getTranslatedObject } from '../../../utils';
import { handleImageFallback } from '../../../utils';

import * as constant from '../../../constants';
import _ from 'lodash';

import { withRouter, Redirect } from 'react-router-dom';



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
      this.props.history.push('/cart');
    } else {
      this.props.togglePopupLogin();
      this.props.togglePopup();
      this.props.setCheckLoginCheckout(true);
    }
  }
  handleSubmitMoblie = values => {
    values.preventDefault();
    if (this.props.token) {
      this.props.history.push('/cart');
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
    const { translate, currentLanguage } = this.props;
    let quantity =0;
    if(data.length > 1){
      // for(var i=0 ; i<data.length ; i++){
      //   quantity += data[i].quantity;
      // }
      return <section className="add-product">
        {
          data.map((productData, idx) => {
            return <Fragment key={idx}>
            <div className="media">
              <span className="media-img">
                <img
                  src={productData.image}
                  onError={handleImageFallback}
                  alt=""
                />
              </span>
              <div className="media-body">
                <h5>{productData.desc}</h5>
                <ul className="list-inline product-item">
                    <li>
                      <strong>{getTranslatedObject(productData.brand, currentLanguage, 'name', 'nameAr')}</strong> #{productData.productNumber}
                    </li>
                    {/* <li className="product-review">
                      <Stars values={productData.averageRating} {...constant.starsRating} />
                      {getLength(productData.reviews)} {translate("product.reviews")}
                    </li> */}
                </ul>
                <p className="price">{productData.salesPrice.toFixed(2)}<span>{translate("general.currency")}</span></p>
                <p>{translate("general.quantity")}: {productData.quantity}</p>
              </div>
            </div>

            <div className="subtotal">
                {/* <div className="col">
                  {translate("general.subtotal")} <p>({productData.quantity} {translate("dialog.addToCart.items")})</p>
                </div>
                <div className="price col-auto">
                  {productData.salesPrice.toFixed(2)}<span>{translate("general.currency")}</span>
                </div> */}
            </div>
          </Fragment>
          })
        }
        <Fragment>
          <div className="btn-footer row">
            <div className="col-md-7 offset-md-5">
              <div className="row">
                <div className="action-shadow"></div>
                <div className="col-auto">
                  <button className="btn btn-gray" onClick={this.continueShopping}>{translate("general.buttons.continueShopping")}</button>
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>{translate("general.buttons.checkout")}<i className="icon-arrow-right" /></button>
                </div>
              </div>
            </div>
          </div>
      </Fragment>
      </section>
    }else{
      return <section className="add-product">
        <div className="media">
          <span className="media-img">
            <img
              src={data.image}
              onError={handleImageFallback}
              alt=""
            />
          </span>
          <div className="media-body">
            <h5>{data.desc}</h5>
            <ul className="list-inline product-item">
                <li>
                  <strong>{getTranslatedObject(data.brand, currentLanguage, 'name', 'nameAr')}</strong> #{data.productNumber}
                </li>
                {/* <li className="product-review">
                  <Stars values={data.averageRating} {...constant.starsRating} />
                  {getLength(data.reviews)} {translate("product.reviews")}
               </li> */}
            </ul>
            <p className="price">{data.salesPrice.toFixed(2)}<span>{translate("general.currency")}</span></p>
            <p>{translate("general.quantity")}: {data.quantity}</p>
          </div>
        </div>

        {/* <div className="subtotal">
            <div className="col">
              {translate("general.subtotal")} <p>({data.quantity} {translate("dialog.addToCart.items")})</p>
            </div>
            <div className="price col-auto">
              {data.salesPrice.toFixed(2)}<span>{translate("general.currency")}</span>
            </div>
        </div> */}
        <Fragment>
          <div className="btn-footer row">
            <div className="col-md-7 offset-md-5">
              <div className="row">
                <div className="action-shadow"></div>
                <div className="col-auto">
                  <button className="btn btn-gray" onClick={this.continueShopping}>{translate("general.buttons.continueShopping")}</button>
                </div>
                <div className="col">
                  <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>{translate("general.buttons.checkout")}<i className="icon-arrow-right" /></button>
                </div>
              </div>
            </div>
          </div>
      </Fragment>
      </section>
    }
  }
}

const withAddProduct = withRouter(AddProduct);

export default withAddProduct;
