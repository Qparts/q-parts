import React, { Component, Fragment } from 'react';
import { Field, reduxForm, getFormValues, reset } from 'redux-form';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Button from '../UI/Button';
import SelectInput from '../SelectInput/SelectInput';
import { Map, GoogleApiWrapper } from 'google-maps-react'
import AutoComplete from '../../containers/Autocomplete/Autocomplete';
import RenderField from '../RenderField/RenderField';
import * as validations from '../../utils';
import Radio from '../UI/Radio';
import { connect } from 'react-redux';

class CheckoutShipping extends Component {
  constructor(props) {

    super(props);
    this.state = {
      hasNewAddress: false
    }
  }
  componentWillMount() {
    this.props.getCountry(this.props.customer.countryId);
    this.props.getRegions(this.props.customer.countryId);
    this.props.addDeliveryAddress(this.getDefaultAddress());
    this.props.completeShipping(false);
  }

  getDefaultAddress = () => {
    const findAddress = this.props.addresses.filter(address => address.default);

    return findAddress[0] ? findAddress[0] : {};
  }

  onAddressSelected = (e) => {
    e.preventDefault();

    this.props.onShowGoogleMap();
    this.props.findCity(this.props.address.city, this.props.customer.countryId);

    if (this.props.address.city === undefined) {
      this.props.onCityFound(false);
    } else {
      this.props.onCityFound(true);
    }
  }
  handleDelivery = e => {
    const { deliveryAddress } = this.props.checkout;

    if (Object.keys(deliveryAddress).length > 0) {
      this.props.completeShipping(true);
      this.props.history.push('/checkout/payment');
    }
  }
  handleAddNewAddress = () => {
    this.setState({ hasNewAddress: true });
  }
  cancle = () => {
    this.props.dispatch(reset('CheckoutShipping'));
    this.setState({ hasNewAddress: false });
  }
  handleChange = (address, index) => {
    this.props.changeDefaultAddress(index);
    this.props.addDeliveryAddress(address);
  }
  render() {
    const { handleSubmit, regions, formValues, translate, onShowGoogleMap, address, defaultAddress, onDefaultAddress, isDelivery, addresses } = this.props;

    const regionsData = regions ?
      regions.map(region => {
        return {
          ...region,
          value: region.id,
          label: region.name
        }
      }) : [];

    const citiesData = _.has(formValues, 'region.cities') ?
      formValues.region.cities.map(city => {
        return {
          ...city,
          value: city.id,
          label: city.name
        }
      }) : [];

    let canSubmit = Object.keys(this.props.checkout.deliveryAddress).length > 0;
    const styles = {
      disable: {
        opacity: '0.6',
        cursor: 'default'
      }
    }

    let addressItem;
    if (addresses) {
      addressItem = <div id="addresses-container">
        <div className="addresses-box border rounded  row" style={{ marginRight: "0px" }}>
          {
            this.props.addresses.map((address, idx) => {
              return <div className="addresses-box_item col-6" key={idx}>
                <Radio
                  onChange={this.handleChange.bind(this, address, idx)}
                  checked={address.default}
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
      addressItem = <div></div>
    }
    const renderCityRegion = !this.props.cityFound ?
      <Fragment>
        <div className="col-6 col-md-4 div-rounded-first">
          <Field
            disabled
            name="name"
            placeholder={translate("form.address.country")}
            component={RenderField}
            validate={[validations.required]} />
        </div>
        <div className="col-6 col-md-4 div-rounded">
          <Field
            name="region"
            placeholder={translate("form.address.region")}
            component={SelectInput}
            options={regionsData}
            validate={[validations.required]} />
        </div>
        <div className="col-12 col-md-4 div-rounded-last">
          <Field
            name="city"
            placeholder={translate("form.address.city")}
            component={SelectInput}
            options={citiesData}
            validate={[validations.required]} />
        </div>
      </Fragment> :
      <Fragment>
        <div>
          <label>{translate("form.address.city")}</label>
          <input
            className="form-control"
            value={address.city}
            type="text"
            readOnly />
        </div>
      </Fragment>

    return (
      <Fragment>
        {
          this.props.showGoogleMap ? (
            <div className="Address-map">
              <Map className="map" google={this.props.google} visible={false}>
                {
                  this.props.country && <AutoComplete onAddressSelected={this.onAddressSelected} {...this.props} />
                }
              </Map>
            </div>
          ) :
            <div className="Address-container">
              <div className="addresses-header justify-content-between ">
                <p>{translate("setting.addressBook.shippingItem")}</p>
                <Button type="button" className="btn btn-primary" icon="icon-add" text={translate("setting.addressBook.add")} onClick={this.handleAddNewAddress} isReverseOrder />
              </div>
              <form onSubmit={handleSubmit}>
                {(
                  this.state.hasNewAddress && <div className="row no-gutters">
                    <div className="col-12 title-address">
                      <Field
                        label={translate("setting.addressBook.title")}
                        name="title"
                        component={RenderField}
                        type="text"
                        placeholder={translate("setting.addressBook.title")}
                        hasFloatLabel
                        validate={[validations.required]} />
                    </div>
                    {/* <div className="col-12 google-map">
                    <Link to="#" onClick={onShowGoogleMap}>
                      <img className="main-img" alt="user" src="/img/google-map.svg" />
                      <p>{translate("form.address.selectAddress")}</p>
                    </Link>
                  </div> */}
                    <div className="col-md-12 address-title">
                      <Field
                        label={`*${translate("setting.addressBook.addressLine1")}`}
                        name="line1"
                        component={RenderField}
                        type="text"
                        placeholder={translate("setting.addressBook.addressLine1")}
                        hasFloatLabel
                        validate={[validations.required]} />
                    </div>
                    <div className="col-12 address-title">
                      <Field
                        label={translate("setting.addressBook.addressLine2")}
                        name="line2"
                        component={RenderField}
                        type="text"
                        placeholder={translate("setting.addressBook.addressLine2")}
                        hasFloatLabel />
                    </div>
                    {renderCityRegion}
                    <div className="phone-info col-12">
                      <div className="row">
                        <div className="phone-number col-6">
                          <div className="first">
                            <Field
                              name="phone"
                              component={RenderField}
                              placeholder="+966"
                              validate={[validations.required]} />
                          </div>
                          <Field
                            name="mobile"
                            component={RenderField}
                            placeholder={translate("form.address.phoneNumber")}
                            validate={[validations.required]} />
                        </div>
                        <div className="zipCode col-6">
                          <Field
                            name="zipCode"
                            component={RenderField}
                            placeholder={translate("form.address.zipCode")}
                            validate={[validations.required]} />
                        </div>
                      </div>
                    </div>
                    <div className="col-12 shipping-style">
                      <Field
                        name="shipping"
                        component={RenderField}
                        type="text"
                        placeholder={translate("form.address.shippingNote")} />
                    </div>
                    <div className="footer col-12">
                        <Button type="submit" className="btn btn-primary col-12 col-md-3" text={translate("setting.addressBook.add")} icon="icon-arrow-right" />
                        <Button type="reset" className="btn btn-light col-12 col-md-4" onClick={this.cancle} text={translate("form.address.buttons.cancel")} />
                      </div>
                  </div>
                )}
                {addressItem}
                <Button type="button" className="btn btn-secondary" style={canSubmit ? {} : styles.disable} text={translate("form.address.buttons.deliver")} icon="icon-arrow-right" onClick={this.handleDelivery} />
              </form>
            </div>
        }
      </Fragment>
    )
  }
}

CheckoutShipping = reduxForm({
  form: 'CheckoutShipping',
})(CheckoutShipping)

CheckoutShipping = connect(
  state => {
    return {
      initialValues: state.api.country,
      formValues: getFormValues('CheckoutShipping')(state),
    }
  }
)(CheckoutShipping)

export default withRouter(CheckoutShipping);
