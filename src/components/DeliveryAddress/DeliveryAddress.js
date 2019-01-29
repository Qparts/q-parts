import React, { Component } from 'react';
import Button from '../UI/Button';

import './DeliveryAddress.css';

class DeliveryAddress extends Component {
 render() {
   const { translate } = this.props
  return (
   <div>
    <div className="DeliveryAddress_subheader">
     <h4>{this.props.title}</h4>
       <div className="addresses-box_item">
        <div className="addresses-box_item-label">
           <p>Title</p>
         </div>
         <div className="about-the-person">
           <p>Ammman Irbid Inbah</p>
           <p>777777777</p>
         </div>
         <div className="addresses-footer">
          <Button type="button" className="btn btn-link" text={translate("setting.addressBook.edit")} icon="icon-edit" isReverseOrder/>
         </div>
         <span className="seperator"></span>
         <p className="footer-delivery">{translate("checkout.payment.cash.estimatedDelivery")}: 6 Aug 2018</p>
        </div>
    </div>
    <p>{this.props.deliveryAddress.title}</p>
    <p>{this.props.deliveryAddress.line1}</p>
   </div>
  )
 }
}

export default DeliveryAddress;
