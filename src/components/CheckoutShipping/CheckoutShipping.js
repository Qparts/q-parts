import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Button from '../UI/Button';
import Address from '../Addresses/Address/Address';
import _ from 'lodash';

import './CheckoutShipping.css';

class CheckoutShipping extends Component {
 handleDelivery = values => {

  const submit = _.isEmpty(values) ? this.props.defaultAddress : values

  this.props.addDeliveryAddress(submit);
  this.props.history.push('/checkout/payment');

 }

 render() {
  const { translate } = this.props;
  return (
   <div className="border rounded card card-body">
    <form onSubmit={this.props.handleSubmit(this.handleDelivery)}>
     <h4>{translate("shippingAddress.title")}</h4>
     <p>{translate("shippingAddress.subTitle")}</p>
     <p>{this.props.defaultAddress.title}</p>
     <p>{this.props.defaultAddress.line1}</p>
     <div className="Checkout-shipping_address-footer">
      <Button type="submit" className="btn btn-secondary" text={translate("shippingAddress.buttons.deliveryAddress")} />
      <Button type="button" className="btn btn-link" text={translate("shippingAddress.buttons.edit")} /> | <Button type="button" className="btn btn-link" text={translate("shippingAddress.buttons.delete")} />
     </div>
    </form>
    <hr />
    <Address
     address={this.props.address}
     customer={this.props.customer}
     getRegions={this.props.getRegions}
     getCountry={this.props.getCountry}
     regions={this.props.regions}
     country={this.props.country}
     confirmUserAddress={this.props.confirmUserAddress}
     onShowGoogleMap={this.props.onShowGoogleMap}
     onCityFound={this.props.onCityFound}
     showGoogleMap={this.props.showGoogleMap}
     cityFound={this.props.cityFound}
     city={this.props.city}
     findCity={this.props.findCity}
     translate={this.props.translate}
     isDelivery={this.props.isDelivery}
     onSubmit={this.handleDelivery}
    />
   </div>
  );
 }
}

CheckoutShipping = reduxForm({
 form: 'CheckoutShipping',
})(CheckoutShipping)

export default withRouter(CheckoutShipping);