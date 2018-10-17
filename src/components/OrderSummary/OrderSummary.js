import React, { Component } from 'react';
import Button from '../UI/Button';

import './OrderSummary.css';

class OrderSummary extends Component {
 render() {
  const { translate } = this.props;
  const renderHeader = !this.props.removeHeader && <div className="card card-body">
   <p>{translate("orderSummary.title")}</p>
   <p>3 {translate("orderSummary.itemsAmount")}</p>
  </div>
  return (
   <div className="OrderSummary-container ">
    {renderHeader}
    <div className="OrderSummary-item card card-body">
     <p>{translate("orderSummary.subtotal")}</p>
     <p>2000 SR</p>
    </div>
    <div className="OrderSummary-item card card-body">
     <p>{translate("orderSummary.shippingCost")}</p>
     <p>50 SR</p>
    </div>
    <div className="OrderSummary-item card card-body">
     <p>{translate("orderSummary.total")}</p>
     <p>2050 SR</p>
    </div>
    {
     this.props.isDelivery && <div className="card card-body">
      <Button type="submit" className={this.props.className} text={this.props.submitButton} />
     </div>
    }
   </div>
  )
 }
}

OrderSummary.defaultProps = {
 className: 'btn btn-secondary'
}

export default OrderSummary;