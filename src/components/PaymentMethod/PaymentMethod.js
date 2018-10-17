import React, { Component } from 'react';
import Button from '../UI/Button';

import './PaymentMethod.css';

class PaymentMethod extends Component {
 render() {
  return (
   <div>
    <div className="PaymentMethod_subheader">
     <h4>{this.props.title}</h4>
     <Button type="button" className="btn btn-link" text={this.props.change} />
    </div>
    <p>{this.props.paymentMethod.type}</p>
   </div>
  )
 }
}

export default PaymentMethod;