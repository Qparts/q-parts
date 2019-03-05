import React, { Component, Fragment } from 'react';
import DeliveryAddress from '../DeliveryAddress/DeliveryAddress';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import _ from 'lodash';
import { getQuery, handleImageFallback, getTranslatedObject, right } from '../../utils/index.js';
import { paymentResponse } from '../../utils/api';
import { CREDIT_CARD } from '../../constants';
import * as constant from '../../constants'
import { clearCart } from '../../actions/cartAction';
import { Link, Redirect } from 'react-router-dom';
import Title from '../UI/Title';

import { bindActionCreators } from 'redux';
class CheckoutConfirmation extends Component {

  constructor(props) {
    super(props)

    if (props.checkout.paymentMethod === CREDIT_CARD) {
      paymentResponse(this.props.location.search);
    }
  }
  componentWillUnmount() {
    this.props.clearCart();
  }

  handleClick = () => {
    this.props.completeOrder(true);
    this.props.history.push('/');
  }

  render() {
    const { checkout, translate, location, purchasedItems, currentLanguage } = this.props;
    const params = getQuery(location);
    const checkoutData = purchasedItems.map(item => {
      return {
        ...item.product,
        desc: item.product.desc,
        salesPrice: item.product.salesPrice.toFixed(2),
        currency: translate("general.currency"),
				quantity: item.quantity,
				quantityLabel: translate("general.quantity"),
        image: item.product.image,
        productNumber: item.product.productNumber,
        brand: item.product.brand,
        subtotal: item.product.salesPrice.toFixed(2) * item.quantity
      }
    });

    let subtotal = 0;
    for (var i = 0; i < checkoutData.length; i++) {
      subtotal += checkoutData[i].subtotal;
    }
    const total = subtotal + 35;
    const vat = total + 0.05;
    const grandTotal = total + vat;

    if (_.isEmpty(purchasedItems)) {
      return <Redirect to="/" />
    }
    return (
      <Fragment>
        <section id="confirm-order">
          <div className="content">
            <i className="icon-delivered-step upload-img" />
            <Title header={translate("general.thankYou")} />
            <h5>{translate("checkout.orderNumber.textOne")}{params.cartId} {translate("checkout.orderNumber.textTwo")} <br />{translate("checkout.orderNumber.textThree")}</h5>
            <button className="btn btn-open-G" style={{ display: "none" }}>{translate("general.trackOrder")}<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
          </div>
          <div className="CheckoutConfirmation_items card">
            <p className="title">{translate("checkout.confirm.table.items")}</p>
            <ul className="cart-items list-unstyled">
              {
                checkoutData.map((checkoutData, idx) => {
                  return <li key={idx} className="bg-white">
                    <figure className="row">
                      <Link to="#" className="col-3 item-img">
                        <img onError={handleImageFallback} src={checkoutData.image} alt="no item" />
                      </Link>
                      <figcaption className="col-9">
                        <div className="row">
                          <div className="col-md-9 item-dis">
                            <header>
                              <h3><Link to="#">{checkoutData.desc}</Link></h3>
                              <h4>{getTranslatedObject(checkoutData.brand, currentLanguage, 'name', 'nameAr')} <span>{checkoutData.productNumber}</span></h4>
                            </header>
                            <div className="cart-quantity d-block d-lg-none">
                              <h5>{checkoutData.quantityLabel}</h5>
                              <div className="input-group quantity">
                                <div className="input-group-prepend">
                                  <button
                                    className="btn btn-gray"
                                    type="button"
                                    onClick={this.handleClick.bind(this, constant.DECREMENT, checkoutData.quantity, checkoutData)}>
                                    <i className="minus"></i></button>
                                </div>
                                <input disabled className="form-control" value={checkoutData.quantity} type="text" />
                                <div className="input-group-append">
                                  <button
                                    className="btn btn-gray" type="button"
                                    onClick={this.handleClick.bind(this, constant.INCREMENT, checkoutData.quantity, checkoutData)}>
                                    <i className="icon-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 div-price-quantity">
                            <div className="cart-product-price">
                              <p className="price">{checkoutData.salesPrice} <span>{checkoutData.currency}</span></p>
                            </div>
                            <div className="cart-quantity d-none d-lg-block">
                              <h5>{checkoutData.quantityLabel} {checkoutData.quantity} </h5>
                            </div>
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  </li>
                })
              }
            </ul>
            <div className="estimation">
              <p className="title">{translate("checkout.estimation")}</p>
              <div className="estimation-table">
                <div className="d-table product-options">
                  <div className="d-table-row">
                    <div className="d-table-cell first-row"><span>{translate("orderSummary.subtotal")}</span></div>
                    <div className="d-table-cell first-row">
                      {subtotal} <span>{checkoutData.currency}</span>
                    </div>
                  </div>
                  <div className="d-table-row">
                    <div className="d-table-cell"><span>{translate("orderSummary.shippingCost")}</span></div>
                    <div className="d-table-cell">35 <span>{checkoutData.currency}</span></div>
                  </div>
                  <div className="d-table-row">
                    <div className="d-table-cell"><span>{translate("orderSummary.total")}</span></div>
                    <div className="d-table-cell">{total} <span>{checkoutData.currency}</span></div>
                  </div>
                  <div className="d-table-row">
                    <div className="d-table-cell"><span>{translate("orderSummary.vat")}</span></div>
                    <div className="d-table-cell">{vat} <span>{checkoutData.currency}</span></div>
                  </div>
                  <div className="d-table-row">
                    <div className="d-table-cell"><span>{translate("orderSummary.grandTotal")}</span></div>
                    <div className="d-table-cell">{grandTotal} <span>{checkoutData.currency}</span></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-12 delivery-address">
                <DeliveryAddress
                  title={translate("deliveryAddress.title")}
                  change={translate("deliveryAddress.change")}
                  deliveryAddress={checkout.deliveryAddress}
                  translate={translate} />
              </div>
              <div className="col-md-6 col-12 payment-method">
                <PaymentMethod
                  currentLanguage={currentLanguage}
                  title={translate("paymentMethod.title")}
                  change={translate("paymentMethod.change")}
                  checkout={checkout}
                  translate={translate} />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.localize),
  checkout: state.cart.checkout,
  purchasedItems: state.cart.purchasedItems,
  currentLanguage: getActiveLanguage(state.localize).code,
  direction: state.customer.direction
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    clearCart,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutConfirmation);
