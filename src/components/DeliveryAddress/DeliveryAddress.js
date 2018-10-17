import React, { Component } from 'react';
import Button from '../UI/Button';

import './DeliveryAddress.css';

class DeliveryAddress extends Component {
 render() {
  return (
   <div>
    <div className="DeliveryAddress_subheader">
     <h4>{this.props.title}</h4>
     <Button type="button" className="btn btn-link" text={this.props.change} />
    </div>
    <p>{this.props.deliveryAddress.title}</p>
    <p>{this.props.deliveryAddress.line1}</p>
   </div>
  )
 }
}

export default DeliveryAddress;