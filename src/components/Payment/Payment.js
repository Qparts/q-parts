import React, { Fragment, Component } from 'react';
import Button from '../UI/Button';
import Checkbox from '../UI/Checkbox';
import { SmallScreen, MediumScreen } from '../../components/Device/index.js';

class Payment extends Component {
 constructor(props){
   super(props);
   this.state = {
     check: false
   }
 }
 render() {
  const { translate } = this.props;
  let payment;
  if(true){
    payment = <div id="payment-container">
     <div className="payment-header justify-content-between">
       <p>Your credit cards</p>
       <div className="payment-add">
         <p>Secure Credit Card Payment <i className="icon-secure"/></p>
         <Button type="button" className="btn btn-link" onClick={this.props.onShowEditDialog.bind(this, 'payment')} text="New Card" icon="icon-add" isReverseOrder/>
       </div>
     </div>
     <span className="seperator"></span>
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
        <span className="seperator"></span>
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
  }else{
    payment = <div id="payment-no-card">
      <div className="payment-header justify-content-between">
        <p>Your credit cards</p>
        <p className="payment-secure">Secure Credit Card Payment <i className="icon-secure"/></p>
      </div>
      <span className="seperator"></span>
      <div className="add-card">
        <p className="icon-debit-card"/>
        <p className="card-text">NO SAVER CARDS</p>
        <Button type="button" className="btn btn-link" text="New Card" onClick={this.props.onShowEditDialog.bind(this, 'payment')} icon="icon-add" isReverseOrder/>
      </div>
      </div>
  }
  return (
     <Fragment>
       <MediumScreen>
         <div className="col-10">
            {payment}
         </div>
       </MediumScreen>
       <SmallScreen>
         <div className="col-12 payment-mobile">
            {payment}
         </div>
       </SmallScreen>
     </Fragment>
  )
 }
}

export default Payment;
