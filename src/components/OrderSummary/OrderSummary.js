import React, { Component, Fragment } from 'react';
import Button from '../UI/Button';
import { right } from '../../utils';

import { CREDIT_CARD, BANK_TRANSFER } from '../../constants';
import { postCreditCard, postWireTransfer } from '../../utils/api';
import { withRouter } from 'react-router-dom';

class OrderSummary extends Component {
  constructor(props){
    super(props)
    console.log
  }
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
    } else if (paymentMethod === BANK_TRANSFER) {
      const data = { cartItems, addressId }
      postWireTransfer(data)
        .then(res => {
          history.push(`/payment-response?cartId=${res.data.cartId}`)
        })
    }
  }
    render() {
        const { translate, checkoutData } = this.props;
        let orderSummary;

        var subtotal=0;
        var quantity=0;
    		for(var i = 0 ; i<checkoutData.length ; i++){
    			subtotal +=checkoutData[i].subtotal;
          quantity +=checkoutData[i].quantity;
    		}
        const total = subtotal + 35;
        const vat = total * 0.05;
        const grandTotal = total + vat;
        const renderHeader = !this.props.removeHeader && <div className="order-summary__header">
            <div>
                <h5 className="card-title">{translate("orderSummary.title")}</h5>
            </div>
            <div>
                <span className="card-subtitle mb-2 order-summary__text-muted">{quantity} {translate("orderSummary.itemsAmount")}</span>
            </div>
            <div className="h-seperator" />
        </div>
        if(quantity>0){
          orderSummary=
              <section id="order-summary" className={this.props.col}>
                  <div className="border card card-body">
                      {renderHeader}
                      <div className="order-summary__details">
                          <span className="item-key">{translate("orderSummary.subtotal")}</span>
                          <span className="item-value">
                              {subtotal}
                              <span>SR</span>
                          </span>
                          <div className="h-seperator" />
                          <span className="item-key">{translate("orderSummary.shippingCost")}</span>
                          <span className="item-value">
                              35
                              <span>SR</span>
                          </span>
                          <div style={styles.secondSperator} className="h-seperator" />
                          <span className="item-key">{translate("orderSummary.total")}</span>
                          <span className="item-value">
                              {total}
                              <span>SR</span>
                          </span>
                          <div style={styles.secondSperator} className="h-seperator" />
                          <span className="item-key">{translate("orderSummary.vat")}</span>
                          <span className="item-value">
                              {vat.toFixed(2)}
                              <span>SR</span>
                          </span>
                          <div style={styles.secondSperator} className="h-seperator" />
                          <span className="item-key">{translate("orderSummary.grandTotal")}</span>
                          <span className="item-value">
                              {grandTotal.toFixed(2)}
                              <span>SR</span>
                          </span>
                      </div>
                  </div>
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
              </section>
        }else{
          orderSummary=<div></div>;
        }
        return (
          <Fragment>
          {orderSummary}
        </Fragment>
        )
    }
}

const styles = {
    secondSperator: {
        marginTop: '16px'
    }
}

OrderSummary.defaultProps = {
    className: 'btn btn-primary'
}

export default withRouter(OrderSummary);
