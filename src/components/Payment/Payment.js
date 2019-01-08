import React, { Component } from 'react';
import Button from '../UI/Button';
import Checkbox from '../UI/Checkbox';

class Payment extends Component {
 constructor(props){
   super(props);
   this.state = {
     check: false
   }
 }
 render() {
  const { translate } = this.props;
  return (
   <div className="col-10">
   <div id="payment-container">
    <div className="payment-header justify-content-between">
      <p>Your credit cards</p>
      <div className="payment-add">
        <p>Secure Credit Card Payment <i className="icon-secure"/></p>
        <Button type="button" className="btn btn-link" text="New Card" icon="icon-add" isReverseOrder/>
      </div>
    </div>
    <span class="seperator"></span>
    <div className="payment-box border rounded row">
     <div className="payment-box_item col-6">
       <Checkbox
         onChange={e => this.setState({
           check: !this.state.check
         })}
         checked={this.state.check}
         label="Default Payment"
       />
      <div className="payment-box_item-label">
        <img className="main-img" alt="user" src="/img/visa.svg" />
        <p>SHAIMAA AHMED M SOUDY</p>
      </div>
      <div className="visa-num">
        <p className="end-number">Number Ending <span>4871</span></p>
        <p className="expires-date">Expires<span>04/2023</span></p>
      </div>
      <div className="payment-footer">
       <Button type="button" className="btn btn-link" text="Edit" icon="icon-edit" isReverseOrder/>
      </div>
     </div>
     <div className="col-1">
       <span class="seperator"></span>
     </div>
     <div className="payment-box_item col-5">
       <Checkbox
         onChange={e => this.setState({
           check: !this.state.check
         })}
         checked={this.state.check}
         label="Default Payemnt"
       />
       <div className="payment-box_item-label">
         <img className="main-img" alt="user" src="/img/visa.svg" />
         <p>SHAIMAA AHMED M SOUDY</p>
       </div>
       <div className="visa-num">
         <p className="end-number">Number Ending <span>4871</span></p>
         <p className="expires-date">Expires<span>04/2023</span></p>
       </div>
      <div className="payment-footer">
       <Button type="button" className="btn btn-link" text="Edit" icon="icon-edit" isReverseOrder/>
       <Button type="button" className="btn btn-delete" text={translate("setting.garage.delete")} icon="icon-trash" isReverseOrder/>
      </div>
     </div>
    </div>
   </div>
   </div>
  )
 }
}

export default Payment;
