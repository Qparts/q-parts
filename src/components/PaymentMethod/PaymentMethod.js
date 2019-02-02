import React, { Component } from 'react';
import Button from '../UI/Button';

import './PaymentMethod.css';
import { CREDIT_CARD } from '../../constants';

class PaymentMethod extends Component {
  render() {
    const { translate, checkout } = this.props;
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
                <p className="end-number">Number Ending <span>4871</span></p>
                <p className="expires-date">Expires<span>04/2023</span></p>
              </div>
              <div className="payment-footer">
                <Button type="button" className="btn btn-gray" text={translate("setting.addressBook.edit")} icon="icon-edit" isReverseOrder />
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
        <div className="PaymentMethod_subheader">
          <span>Bank Tansfer</span>
        </div>
      </div>
      )
    }
  }
}

export default PaymentMethod;
