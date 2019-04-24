import React, { Fragment, Component } from 'react';
import './Addresses.css';
import Button from '../UI/Button';
import { SmallScreen, MediumScreen } from '../../components/Device/index.js';
import Radio from '../UI/Radio';

class Addresses extends Component {
  handleChange = (index, e) => {
    this.props.changeDefaultAddress(index);
  }

  renderAddresses = () => {
    const { translate, addresses } = this.props;
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
                <Button type="button" className="btn btn-primary" onClick={this.props.onShowEditDialog.bind(this, 'addresses')} text={translate("setting.addressBook.add")} icon="icon-add" isReverseOrder/>
              </div>
            </div>
          </header>
        </MediumScreen>
        <SmallScreen>
          <header className="header-sm">
            <div className="row">
              <div className="col">
                  <h5 className="header-sm">{translate("setting.addressBook.shippingAddress")}</h5>
              </div>
              <div className="col-auto">
                <Button type="button" className="btn btn-primary" onClick={this.props.onShowEditDialog.bind(this, 'addresses')} icon="icon-add" isReverseOrder/>
              </div>
            </div>
          </header>
        </SmallScreen>
        <div className="info-list">
          <ul className="row list-unstyled">
            {
              this.props.addresses.map((address, idx) => {
            return <li className="col-md-6 radio-custom" key={idx}>
              <Radio
                 onChange={this.handleChange.bind(this, idx)}
                 checked={address.defaultAddress}
                 label={translate("setting.garage.defaultVehicle")}
                 type="radio"
                 id={address.id}
                 name="radioGroup"
              />
              <h6>{address.title}</h6>
              <address>
                <p>{address.line1} {address.line2}</p>
                <p>{address.cityId}</p>
                <p>{address.mobile}</p>
              </address>
              {/*<div className="actions">
                <Button type="button"  className="btn btn-gray" text={translate("general.buttons.edit")} icon="icon-edit" isReverseOrder/>
              </div>*/}
            </li>
            })}
          </ul>
        </div>
      </div>
      {/*<div id="addresses-container">
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
                  onChange={this.handleChange.bind(this, idx)}
                  checked={address.defaultAddress}
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
                  <Button disabled type="button" className="isDisabled btn btn-gray" text={translate("setting.addressBook.edit")} icon="icon-edit" isReverseOrder />
                  <Button disabled type="button" className="isDisabled btn btn-delete" text={translate("setting.addressBook.delete")} icon="icon-trash" isReverseOrder />
                </div>
              </div>
            })}
        </div>
      </div>*/}
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
