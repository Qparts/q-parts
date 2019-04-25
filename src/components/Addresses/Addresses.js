import React, { Fragment, Component } from 'react';
import Button from '../UI/Button';
import { SmallScreen, MediumScreen } from '../Device/index.js';
import Address from './Address/Address';

class Addresses extends Component {
  handleChange = (index, e) => {
    this.props.changeDefaultAddress(index);
  }

  renderAddresses = () => {
    const { translate, addresses, currentLanguage } = this.props;
    if (addresses.length) {
      return <div className="user-address">
        <MediumScreen>
          <header>
            <div className="row">
              <div className="col">
                <h5>
                  {translate("setting.addressBook.shippingItem")}
                </h5>
              </div>
              <div className="col-auto">
                <Button type="button" className="btn btn-primary" onClick={this.props.onShowEditDialog.bind(this, 'addresses')} text={translate("setting.addressBook.add")} icon="icon-add" isReverseOrder />
              </div>
            </div>
          </header>
        </MediumScreen>
        <SmallScreen>
          <header className="header-sm">
            <div className="row">
              <div className="col">
                <h5 className="header-sm">{translate("setting.addressBook")}</h5>
              </div>
              <div className="col-auto">
                <Button type="button" className="btn btn-primary" onClick={this.props.onShowEditDialog.bind(this, 'addresses')} icon="icon-add" isReverseOrder />
              </div>
            </div>
          </header>
        </SmallScreen>
        <div className="info-list">
          <ul className="row list-unstyled">
            {
              this.props.addresses.map((address, addressIndex) => {
                return <Address
                  key={addressIndex}
                  address={address}
                  addressIndex={addressIndex}
                  onClickDefaultAddress={this.handleChange}
                  translate={translate}
                  regions={this.props.regions}
                  currentLanguage={currentLanguage}
                />
              
              })}
          </ul>
        </div>
      </div>
    } else {
      return <div className="empty">
        <header>
          <h5>{translate("setting.addressBook.shippingItem")}</h5>
        </header>
        <figure>
          <i className="icon-address"></i>
        </figure>
        <figcaption>
          <p>{translate("setting.addressBook.noAddresses")}</p>
          <a className="btn btn-primary" href="#" onClick={this.props.onShowEditDialog.bind(this, 'addresses')}><i className="icon-add"> </i> {translate("setting.addressBook.add")}</a>
        </figcaption>
      </div>
    }
  }
  render() {
    return (
      <Fragment>
        {this.renderAddresses()}
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
