import React, { Component, Fragment } from 'react';
import { reduxForm, FieldArray } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Button from '../UI/Button';
import Table from '../UI/Table';
import RenderCartItem from '../RenderCartItem/RenderCartItem';
import DeliveryAddress from '../DeliveryAddress/DeliveryAddress';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import { SmallScreen, MediumScreen } from '../Device/index.js';

import './CheckoutConfirmation.css';

class CheckoutConfirmation extends Component {

  handleClick = () => {
    this.props.completeOrder(true);
    this.props.history.push('/confirmOrder');
  }

  render() {
    const { checkout, translate } = this.props;
    const mockCart = [
      {
        name: "Test from the client",
        quantity: 1,
        price: "200 SR"
      },
      {
        name: "Test from the client",
        quantity: 2,
        price: "200 SR"
      }
    ];
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
                      change={translate("deliveryAddress.change")} deliveryAddress={checkout.deliveryAddress} translate={translate} />
                  </div>
                    <div className="col-6 payment-method">
                      <PaymentMethod
                        title={translate("paymentMethod.title")}
                        change={translate("paymentMethod.change")} paymentMethod={checkout.paymentMethod} translate={translate} />
                    </div>
                </div>
              </div>
            </div>
            <div className="CheckoutConfirmation_items card">
              <p className="title">{translate("checkout.confirm.table.items")}</p>
              <FieldArray
                deleteText={translate("cart.table.delete")}
                name="purchasedItems"
                purchasedItems={mockCart}
                component={RenderCartItem}
              />
            </div>
            <div className="footer-delivery justify-content-between row">
              <p>{translate("checkout.payment.cash.placeOrder")} <span> {translate("checkout.payment.cash.terms")} </span></p>
              <button type="button" className="btn btn-primary justify-content-between" onClick={this.handleClick}><p>{translate("checkout.payment.cash.total")}<p>20700<sub>SR</sub></p></p><span>{translate("checkout.confirm.placeOrder")} <i className="icon-arrow-right"/></span></button>
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
                      change={translate("deliveryAddress.change")} deliveryAddress={checkout.deliveryAddress} translate={translate} />
                  </div>
                    <div className="col-12 payment-method">
                      <PaymentMethod
                        title={translate("paymentMethod.title")}
                        change={translate("paymentMethod.change")} paymentMethod={checkout.paymentMethod} translate={translate} />
                    </div>
                </div>
              </div>
            </div>
            <div className="CheckoutConfirmation_items card">
              <p className="title">{translate("checkout.confirm.table.items")}</p>
              <FieldArray
                deleteText={translate("cart.table.delete")}
                name="purchasedItems"
                purchasedItems={mockCart}
                component={RenderCartItem}
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

CheckoutConfirmation = reduxForm({
  form: 'CheckoutConfirmation',
})(CheckoutConfirmation)

export default withRouter(CheckoutConfirmation);
