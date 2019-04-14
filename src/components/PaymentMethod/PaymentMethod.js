import React, { Component } from 'react';
import Link from '../UI/Link';

import './PaymentMethod.css';
import { CREDIT_CARD, paymentMethod } from '../../constants';
import { getTranslatedObject } from '../../utils';

class PaymentMethod extends Component {
  render() {
    const { translate, checkout, currentLanguage } = this.props;
    if (checkout.paymentMethod === CREDIT_CARD) {
      return (
        <div>
          <div className="PaymentMethod_subheader">
            <h4>{this.props.title}</h4>
            <div className="payment-box_item">
              <div className="payment-box_item-label">
                {/* <img className="main-img" alt="user" src="/img/visa.svg" /> */}
                <p>{checkout.creditCard.ccName}</p>
              </div>
              <div className="visa-num">
                <p className="end-number">{translate("checkout.payment.creditCard.endNo")} <span>{checkout.creditCard.ccNumber.toString().substr(-4)}</span></p>
                <p className="expires-date">{translate("checkout.payment.creditCard.expires")}<span>{checkout.creditCard.ccMonth}/{checkout.creditCard.ccYear}</span></p>
              </div>
              <div className="payment-footer">
                <Link to="/checkout/payment" className="btn btn-gray" text={translate("setting.addressBook.edit")} icon="icon-edit" isReverseOrder />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <div className="PaymentMethod_subheader">
            <h4>{this.props.title}</h4>
            <div className="payment-box_item">
              <div className="payment-box_item-label">
                <p>{getTranslatedObject(paymentMethod, currentLanguage, 'name', 'nameAr')}</p>
              </div>
              <div className="payment-footer">
                <Link to="/checkout/payment" className="btn btn-gray" text={translate("setting.addressBook.edit")} icon="icon-edit" isReverseOrder />
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default PaymentMethod;
