import React, { Component, Fragment } from 'react';
import Button from '../UI/Button';
import { right } from '../../utils';

import { CREDIT_CARD, BANK_TRANSFER } from '../../constants';
import { postCreditCard, postWireTransfer } from '../../utils/api';
import { withRouter } from 'react-router-dom';

class OrderSummary extends Component {
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
          that.props.setValidCredit(false);
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
    const { translate, checkoutData } = this.props;
    let orderSummary;

    var subtotal = 0;
    var quantity = 0;
    for (var i = 0; i < checkoutData.length; i++) {
      subtotal += checkoutData[i].subtotal;
      quantity += checkoutData[i].quantity;
    }
    const total = subtotal + 35;
    const vat = total * 0.05;
    const grandTotal = total + vat;
    const renderHeader = !this.props.removeHeader && <header>
      <h2>{translate("orderSummary.title")}</h2>
      <span>{quantity} {translate("orderSummary.itemsAmount")}</span>
    </header>
    if (quantity > 0) {
      orderSummary =
        <Fragment>
          {renderHeader}
          <ul className="list-unstyled">
            <li>
              <label>{translate("orderSummary.subtotal")}</label>
              <p>{subtotal.toFixed(2)}<span>{checkoutData[0].currency}</span></p>
            </li>
            <li>
              <label>{translate("orderSummary.shippingCost")}</label><p>35<span>{checkoutData[0].currency}</span></p>
            </li>
            <li>
              <label>{translate("orderSummary.total")}</label><p>{total.toFixed(2)}<span>{checkoutData[0].currency}</span></p>
            </li>
            <li>
              <label>{translate("orderSummary.vat")}</label><p>{vat.toFixed(2)}<span>{checkoutData[0].currency}</span></p>
            </li>
            <li>
              <label>{translate("orderSummary.grandTotal")}</label><p>{grandTotal.toFixed(2)}<span>{checkoutData[0].currency}</span></p>
            </li>
          </ul>
          {
            this.props.isDelivery && <Fragment>
              <Button
                type="submit"
                className={this.props.className}
                text={this.props.submitButton}
                onClick={this.handleClick}
                icon={`icon-arrow-${right('rtl')}`} />
            </Fragment>
          }
        </Fragment>
    } else {
      orderSummary = <div></div>;
    }
    return (
      <Fragment>
        {orderSummary}
      </Fragment>
    )
  }
}

OrderSummary.defaultProps = {
  className: 'btn btn-primary'
}

export default withRouter(OrderSummary);
