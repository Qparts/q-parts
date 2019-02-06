import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../UI/Button';
import RenderCartItem from '../RenderCartItem/RenderCartItem';
import DeliveryAddress from '../DeliveryAddress/DeliveryAddress';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import { SmallScreen, MediumScreen } from '../Device/index.js';

import './CheckoutConfirmation.css';
import { CREDIT_CARD, BANK_TRANSFER } from '../../constants';
import { postCreditCard, postWireTransfer } from '../../utils/api';

class CheckoutConfirmation extends Component {

  handleClick = () => {
    const { purchasedItems, checkout: { deliveryAddress, creditCard, paymentMethod }, history } = this.props;
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
        window.location = res.data.transactionUrl;
      })
    } else if(paymentMethod === BANK_TRANSFER) {
      const data = { cartItems, addressId }
      postWireTransfer(data)
      .then(res => {
        history.push(`/payment-response?cartId=${res.data.cartId}`)
      })
    }
  }

  render() {
    const { checkout, translate, purchasedItems, incrementQuantity, decrementQuantity } = this.props;
    return (
      <Fragment>
        <MediumScreen>
          <div className="border rounded card card-body row" id="checkout-order">
            <div className="CheckoutConfirmation-container">
              <div className="col-12">
                <div className="row">
                  <div className="col-6 delivery-address">
                    <DeliveryAddress
                      title={translate("deliveryAddress.title")}
                      change={translate("deliveryAddress.change")}
                      deliveryAddress={checkout.deliveryAddress}
                      translate={translate} />
                  </div>
                  <div className="col-6 payment-method">
                    <PaymentMethod
                      title={translate("paymentMethod.title")}
                      change={translate("paymentMethod.change")}
                      checkout={checkout}
                      translate={translate} />
                  </div>
                </div>
              </div>
            </div>
            <div className="CheckoutConfirmation_items card">
              <div className="col-12">
                <p className="title">{translate("checkout.confirm.table.items")}</p>
              </div>
              <RenderCartItem
                deleteText={translate("cart.table.delete")}
                name="purchasedItems"
                purchasedItems={purchasedItems}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                divCol='col-lg-12'
              />
            </div>
            <div className="footer-delivery justify-content-between row">
              <p>{translate("checkout.payment.cash.placeOrder")} <span> {translate("checkout.payment.cash.terms")} </span></p>
              <button type="button" className="btn btn-primary justify-content-between" onClick={this.handleClick}><p>{translate("checkout.payment.cash.total")}<p>20700<sub>SR</sub></p></p><span>{translate("checkout.confirm.placeOrder")} <i className="icon-arrow-right" /></span></button>
            </div>
          </div>
        </MediumScreen>
        <SmallScreen>
          <div className="border rounded card card-body row" id="checkout-order-mobile">
            <div className="CheckoutConfirmation-container">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 delivery-address">
                    <DeliveryAddress
                      title={translate("deliveryAddress.title")}
                      change={translate("deliveryAddress.change")}
                      deliveryAddress={checkout.deliveryAddress}
                      translate={translate} />
                  </div>
                  <div className="col-12 payment-method">
                    <PaymentMethod
                      title={translate("paymentMethod.title")}
                      change={translate("paymentMethod.change")}
                      checkout={checkout}
                      translate={translate} />
                  </div>
                </div>
              </div>
            </div>
            <div className="CheckoutConfirmation_items card">
              <div className="col-12">
                <p className="title">{translate("checkout.confirm.table.items")}</p>
              </div>
              <RenderCartItem
                deleteText={translate("cart.table.delete")}
                name="purchasedItems"
                purchasedItems={purchasedItems}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                divCol='col-lg-12'
              />
            </div>
            <div className="footer-delivery row">
              <p>{translate("checkout.payment.cash.placeOrder")} <span> {translate("checkout.payment.cash.terms")} </span></p>
              <Button type="button" className="btn btn-primary col-12" onClick={this.handleClick} text={translate("checkout.confirm.placeOrder")} icon="icon-arrow-right" />
            </div>
          </div>
        </SmallScreen>
      </Fragment>
    )
  }
}

export default withRouter(CheckoutConfirmation);
