import React, { Component } from 'react';

import './Addresses.css';
import Button from '../UI/Button';
import Checkbox from '../UI/Checkbox';

class Addresses extends Component {
  constructor(props){
    super(props);
    this.state = {
      check: false
    }
  }
 render() {
  const { translate } = this.props;
  let addresses;
  if(true){
    addresses = <div id="addresses-container">
     <div className="addresses-header justify-content-between">
       <p>{translate("setting.addressBook.shippingItem")}</p>
       <Button type="button" className="btn btn-link" text={translate("setting.addressBook.add")} onClick={this.props.onShowEditDialog.bind(this, 'addresses')} icon="icon-add" isReverseOrder/>
     </div>
     <span class="seperator"></span>
     <div className="addresses-box border rounded row">
      <div className="addresses-box_item col-6">
        <Checkbox
          onChange={e => this.setState({
            check: !this.state.check
          })}
          checked={this.state.check}
          label={translate("setting.addressBook.defaultAddress")}
        />
      <div className="addresses-box_item-label">
         <p>Ahmed Mahmoud</p>
       </div>
       <div className="about-the-person">
         <p>7 Yaser Ben Amer Street</p>
         <p>Amman, Jordan</p>
         <p>(962) 770-2302</p>
       </div>
       <div className="addresses-footer">
        <Button type="button" className="btn btn-link" text={translate("setting.addressBook.edit")} icon="icon-edit" isReverseOrder/>
       </div>
      </div>
      <div className="col-1">
        <span class="seperator"></span>
      </div>
      <div className="addresses-box_item col-5">
        <Checkbox
          onChange={e => this.setState({
            check: !this.state.check
          })}
          checked={this.state.check}
          label={translate("setting.addressBook.defaultAddress")}
        />
      <div className="addresses-box_item-label">
          <p>Ahmed Mahmoud</p>
        </div>
        <div className="about-the-person">
          <p>7 Yaser Ben Amer Street</p>
          <p>Amman, Jordan</p>
          <p>(962) 770-2302</p>
        </div>
       <div className="addresses-footer">
        <Button type="button" className="btn btn-link" text={translate("setting.addressBook.edit")} icon="icon-edit" isReverseOrder/>
        <Button type="button" className="btn btn-delete" text={translate("setting.addressBook.delete")} icon="icon-trash" isReverseOrder/>
       </div>
      </div>
     </div>
    </div>
  }else{
    addresses = <div id="empty-addresses">
      <div className="addresses-header justify-content-between">
        <p>{translate("setting.addressBook.shippingItem")}</p>
      </div>
      <span class="seperator"></span>
      <div className="add-addresses">
        <p className="icon-address"/>
        <p className="addresses-text">{translate("setting.addressBook.noAddress")}</p>
        <Button type="button" className="btn btn-link" text={translate("setting.addressBook.add")} onClick={this.props.onShowEditDialog.bind(this, 'addresses')} icon="icon-add" isReverseOrder/>
      </div>
      </div>
  }
  return (
   <div className="col-10">
      {addresses}
   </div>
  )
 }
}

export default Addresses;
// {
//  this.props.customer.addresses.map((address, idx) => {
//   return <div key={idx} className="addresses-box border rounded">
//    <div className="addresses-box_item">
//     {address.title}
//    </div>
//    <div className="addresses-box_item">
//     {address.line1}
//    </div>
//    <div className="Addresses-footer">
//     <Button type="button" className="btn btn-link" text={"Edit"} onClick={this.props.onEditAddress.bind(this, address)} />
//     | <Button type="button" className="btn btn-link" text={"Delete"}  />
//    </div>
//   </div>
//  })
// }
