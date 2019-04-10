import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../UI/Button';
import RenderCartItem from '../RenderCartItem/RenderCartItem';
import DeliveryAddress from '../DeliveryAddress/DeliveryAddress';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import { SmallScreen, MediumScreen } from '../Device/index.js';
import { ClipLoader } from "react-spinners";

import './CheckoutConfirmation.css';
import { CREDIT_CARD, BANK_TRANSFER, styles } from '../../constants';
import { postCreditCard, postWireTransfer } from '../../utils/api';
import { getTranslatedObject, l, right } from '../../utils';

import { Link } from 'react-router-dom'
import { handleImageFallback } from '../../utils';
import * as constant from '../../constants';
import { Alert } from 'reactstrap';

class CheckoutConfirmation extends Component {
  static defaultProps = {
    divCol: 'col-lg-12'
  }
  constructor(props) {
    super(props)
    this.state ={
      error: false
    }
    this.props.setLoading(false);
  }
  handleClick = () => {
    const { purchasedItems, checkout: { deliveryAddress, creditCard, paymentMethod }, history, setLoading } = this.props;
    setLoading(true);
    const addressId = deliveryAddress.id;
    const cartItems = purchasedItems.map(purchasedItem => {
      return {
        productId: purchasedItem.id,
        quantity: purchasedItem.quantity,
        salesPrice: purchasedItem.salesPrice
      }
    });
    if (paymentMethod === CREDIT_CARD) {
      const data = { cartItems, addressId, creditCard }
      postCreditCard(data)
        .then(res => {
          if (res.status === 201) {
            history.push(`/payment-response?cartId=${res.data.cartId}`)
          } else if (res.status === 202) {
            window.location = res.data.transactionUrl;
          }else{
            this.setState({
              error: true
            })
          }
        });
    } else if (paymentMethod === BANK_TRANSFER) {
      const data = { cartItems, addressId }
      postWireTransfer(data)
        .then(res => {
          history.push(`/payment-response?cartId=${res.data.cartId}`)
          this.props.setLoading(false);
        })
    }

    this.props.setLoading(false);
  }

  render() {
    const { checkout, translate, purchasedItems, incrementQuantity, decrementQuantity, direction, currentLanguage, isLoading, divCol } = this.props;

    const removeButton= true;

    if (isLoading) {
      return (
        <div style={styles.loading}>
          <ClipLoader
            css={styles.spinner}
            sizeUnit={"px"}
            size={150}
            loading={isLoading}
          />
        </div>
      )
    }
    return (
      <Fragment>
        <div className="border rounded card card-body row" id="checkout-order">
          <div className="CheckoutConfirmation-container">
            {this.state.error &&
              <Alert color="danger">
                transaction failed
              </Alert>}
            <div className="col-12">
              <div className="row">
                <div className="col-12 col-md-6 delivery-address">
                  <DeliveryAddress
                    title={translate("deliveryAddress.title")}
                    change={translate("deliveryAddress.change")}
                    deliveryAddress={checkout.deliveryAddress}
                    translate={translate} />
                </div>
                <div className="col-12 col-md-6 payment-method">
                  <PaymentMethod
                    currentLanguage={currentLanguage}
                    title={translate("paymentMethod.title")}
                    change={translate("paymentMethod.change")}
                    checkout={checkout}
                    translate={translate} />
                </div>
              </div>
            </div>
          </div>
          <div className="CheckoutConfirmation_items card">
            <div className="div-title">
              <p className="title">{translate("checkout.confirm.table.items")}</p>
            </div>
            <div className={`render-cart-item ${divCol}`}>
              <ul className="cart-items list-unstyled">
                {
                  purchasedItems.map((purchasedItem, idx) => {
                    return <li key={idx} className="bg-white">
                      <figure className="row">
                        <Link to="#" className="col-3 item-img">
                          <img onError={handleImageFallback} src={purchasedItem.image} alt="no item" />
                        </Link>
                        <figcaption className="col-9">
                          <div className="row">
                            <div className="col-md-9 item-dis">
                              <header>
                                <h3><Link to="#">{purchasedItem.desc}</Link></h3>
                                <h4>{getTranslatedObject(purchasedItem.brand, currentLanguage, 'name', 'nameAr')} <span>{purchasedItem.productNumber}</span></h4>
                              </header>
                              <div>
                                <div className="cart-quantity d-none d-lg-block">
                                  <h5>{translate("general.quantity")}</h5>
                                  <h5 className="quantity">{purchasedItem.quantity} </h5>
                                </div>
                              </div>
                              <div className="cart-product-price">
                                <p className="price">{purchasedItem.salesPrice} <span>{translate("general.currency")}</span></p>
                              </div>
                              <div className="cart-actions">
                                <Link to="#" className="isDisabled btn btn-gray"><i className="icon-heart"></i><span>{translate("general.buttons.wishlist")}</span></Link>
                                <Link to="#" className="isDisabled delete-btn"><i className="icon-trash"></i><span>{translate("general.buttons.delete")}</span></Link>
                              </div>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </li>
                  })
                }
              </ul>
              <div className="row">
                <div className={`col-md-6 m${l(direction)}-md-auto`}>
                  {
                    !removeButton && <Link to="/" className="btn cart-back">{translate("general.buttons.continueShopping")}<i className={`icon-arrow-${right(direction)}`}></i></Link>
                  }
                </div>
              </div>
            </div>

          </div>
          <div className="footer-delivery justify-content-between row">
            <p>{translate("checkout.payment.cash.placeOrder")} <span> {translate("checkout.payment.cash.terms")} </span></p>
            <button type="button" className="btn btn-primary justify-content-between" onClick={this.handleClick}>
              <div><p>{translate("checkout.payment.cash.total")}</p>
                <p>{this.props.grandTotal.toFixed(2)}<sub>{translate("general.currency")}</sub></p>
              </div>
              <span>{translate("checkout.confirm.placeOrder")} <i className={`icon-arrow-${right(direction)}`} /></span></button>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(CheckoutConfirmation);
