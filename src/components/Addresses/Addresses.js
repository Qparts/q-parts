import React, { Component } from 'react';

import './Addresses.css';
import Button from '../UI/Button';

class Addresses extends Component {

 render() {
  const { translate } = this.props;
  return (
   <div className="Addresses-container">
    <div className="Addresses-button">
     <Button className="btn btn-secondary" onClick={this.props.onShowAdressDialog.bind(this, null)} text={translate("setting.addressBook.add")} />
    </div>
    <p>{translate("setting.addressBook.title")}</p>
    {
     this.props.customer.addresses.map((address, idx) => {
      return <div key={idx} className="addresses-box border rounded">
       <div className="addresses-box_item">
        {address.title}
       </div>
       <div className="addresses-box_item">
        {address.line1}
       </div>
       <div className="Addresses-footer">
        <Button type="button" className="btn btn-link" text={"Edit"} onClick={this.props.onEditAddress.bind(this, address)} />
        | <Button type="button" className="btn btn-link" text={"Delete"}  />
       </div>
      </div>
     })
    }
   </div>
  )
 }
}

export default Addresses;