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
    super(props);
    this.props.correctCredit(false);
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
    const that = this;
    if (paymentMethod === CREDIT_CARD) {
      const data = { cartItems, addressId, creditCard }
      postCreditCard(data)
        .then(res => {
          if (res.status === 201) {
            history.push(`/payment-response?cartId=${res.data.cartId}`)
          } else if (res.status === 202) {
            window.location = res.data.transactionUrl;
          }
        })
        .catch(function(fallback) {
          that.props.correctCredit(true);
          that.props.setLoading(false);
        });
    } else if (paymentMethod === BANK_TRANSFER) {
      const data = { cartItems, addressId }
      postWireTransfer(data)
        .then(res => {
          history.push(`/payment-response?cartId=${res.data.cartId}`)
          this.props.setLoading(false);
        })
    }
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

    if(this.props.isCorrectCredit){
      window.scrollTo(0, 0);
    }
    return (
      <Fragment>
        <div className="border rounded card card-body row" id="checkout-order">
          <div className="CheckoutConfirmation-container">
            {this.props.isCorrectCredit &&
              <Alert color="danger">
                {translate("general.error")}
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
            <RenderCartItem
              currentLanguage={currentLanguage}
              translate={translate}
              direction={direction}
              deleteText={translate("cart.table.delete")}
              name="purchasedItems"
              purchasedItems={purchasedItems}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              divCol='col-lg-12'
              removeButton={true}
              deleteCart={this.props.deleteCart}
              moveCartToWishlist={this.props.moveCartToWishlist}
            />

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
