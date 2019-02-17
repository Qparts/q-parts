import React, { Component } from 'react';
import Button from '../UI/Button';

import './DeliveryAddress.css';

class DeliveryAddress extends Component {
 render() {
   const { translate, deliveryAddress } = this.props
  return (
   <div>
    <div className="DeliveryAddress_subheader">
     <h4>{this.props.title}</h4>
       <div className="addresses-box_item">
        <div className="addresses-box_item-label">
           <p>{deliveryAddress.title}</p>
         </div>
         <div className="about-the-person">
           <p>{deliveryAddress.line1}</p>
           <p>{deliveryAddress.mobile}</p>
         </div>
         <div className="addresses-footer">
          <Button disabled type="button" className="isDisabled btn btn-gray" text={translate("setting.addressBook.edit")} icon="icon-edit" isReverseOrder/>
         </div>
         {/* <span className="seperator"></span>
         <p className="footer-delivery">{translate("checkout.payment.cash.estimatedDelivery")}: 6 Aug 2018</p> */}
        </div>
    </div>
   </div>
  )
 }
}

export default DeliveryAddress;
