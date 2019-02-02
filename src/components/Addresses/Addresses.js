import React, { Fragment, Component } from 'react';

import './Addresses.css';
import Button from '../UI/Button';
import Checkbox from '../UI/Checkbox';
import { SmallScreen, MediumScreen } from '../../components/Device/index.js';

class Addresses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false
    }
  }
  renderAddresses = () => {
    const { translate, addresses } = this.props;
    if (addresses) {
      return <div id="addresses-container">
        <div className="addresses-header justify-content-between">
          <p> {translate("setting.addressBook.shippingItem")}</p>
          <Button type="button" className="btn btn-primary" text={translate("setting.addressBook.add")} onClick={this.props.onShowEditDialog.bind(this, 'addresses')} icon="icon-add" isReverseOrder />
        </div>

        <span className="seperator"></span>
        <div className="addresses-box border rounded  row">
          {
            this.props.addresses.map((address, idx) => {
              return <div className="addresses-box_item col-6" key={idx}>
                <Checkbox
                  onChange={e => this.setState({
                    check: !this.state.check
                  })}
                  checked={this.state.check}
                  label={translate("setting.addressBook.defaultAddress")}
                />
                <div className="addresses-box_item-label">
                  <p>{address.title}</p>
                </div>
                <div className="about-the-person">
                  <p>{address.cityId} {address.line1} {address.line2}</p>
                  <p>{address.mobile}</p>
                </div>
                <div className="addresses-footer">
                  <Button type="button" className="btn btn-gray" text={translate("setting.addressBook.edit")} icon="icon-edit" isReverseOrder />
                  <Button type="button" className="btn btn-delete" text={translate("setting.addressBook.delete")} icon="icon-trash" isReverseOrder />
                </div>
              </div>
            })}
        </div>
      </div>
    } else {
      return <div id="empty-addresses">
        <div className="addresses-header justify-content-between">
          <p>{translate("setting.addressBook.shippingItem")}</p>
        </div>
        <span className="seperator"></span>
        <div className="add-addresses">
          <p className="icon-address" />
          <p className="addresses-text">NO SAVER ADDRESSES</p>
          <Button type="button" className="btn btn-gray" text={translate("setting.addressBook.add")} onClick={this.props.onShowEditDialog.bind(this, 'addresses')} icon="icon-add" isReverseOrder />
        </div>
      </div>
    }
  }
  render() {
    return (
      <Fragment>
        <MediumScreen>
          <div className="col-10">
            {this.renderAddresses()}
          </div>
        </MediumScreen>
        <SmallScreen>
          <div className="col-12 adresses-mobile">
            {this.renderAddresses()}
          </div>
        </SmallScreen>
      </Fragment>
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
//     <Button type="button" className="btn btn-gray" text={"Edit"} onClick={this.props.onEditAddress.bind(this, address)} />
//     | <Button type="button" className="btn btn-gray" text={"Delete"}  />
//    </div>
//   </div>
//  })
// }
