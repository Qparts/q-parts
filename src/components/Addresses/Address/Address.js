import React, { Component, Fragment } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import _ from 'lodash';
import Button from '../../UI/Button';
import { connect } from 'react-redux'
import SelectInput from '../../SelectInput/SelectInput';
import RenderCheckboxField from '../../UI/RenderCheckboxField';
import { Map, GoogleApiWrapper } from 'google-maps-react'
import AutoComplete from '../../../containers/Autocomplete/Autocomplete';
import RenderField from '../../RenderField/RenderField';
import * as validations from '../../../utils';
import { getTranslatedObject, getTranslatedString } from '../../../utils';

import './Address.css';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: false
    }
  }
  componentWillMount() {
    this.props.getCountry(this.props.customer.countryId);
    this.props.getRegions(this.props.customer.countryId);
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

  render() {
    const {
      handleSubmit, regions, formValues, translate, currentLanguage, onShowGoogleMap,
      address, onHide, defaultAddress, onDefaultAddress, isDelivery
    } = this.props;

    const regionsData = regions ?
      regions.map(region => {
        return {
          ...region,
          value: region.id,
          label: getTranslatedObject(region, currentLanguage, 'name', 'nameAr')
        }
      }) : [];

    const citiesData = _.has(formValues, 'region.cities') ?
      formValues.region.cities.map(city => {
        return {
          ...city,
          value: city.id,
          label: getTranslatedObject(city, currentLanguage, 'name', 'nameAr')
        }
      }) : [];

    const renderCityRegion = !this.props.cityFound ?
      <Fragment>
        <div className="col-md-4 div-rounded-first">
          <Field
            disabled
            name={`${getTranslatedString(currentLanguage, 'name', 'nameAr')}`}
            placeholder={translate("form.address.country")}
            component={RenderField}
            validate={[validations.required]} />
        </div>
        <div className="col-md-4 div-rounded">
          <Field
            name="region"
            placeholder={translate("form.address.region")}
            component={SelectInput}
            options={regionsData}
            validate={[validations.required]} />
        </div>
        <div className="col-md-4 div-rounded-last">
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

    let renderButtons =
      <Fragment>
        <div className="Checkbox">
          <Field
            name="defaultAddress"
            id="defaultAddress"
            component={RenderCheckboxField}
            label={translate("form.address.buttons.defaultAddress")}
          />
        </div>
        <div className="row">
          <Button onClick={onHide} type="reset" className="btn btn-light col-3" text={translate("form.address.buttons.cancel")} />
          <Button type="submit" className="btn btn-primary col-8" text={translate("form.address.buttons.confirm")} />
        </div>
      </Fragment>

    if (isDelivery) {
      renderButtons = <Button type="submit" className="btn btn-secondary" text={translate("form.address.buttons.deliver")} />
    }

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
              <form onSubmit={handleSubmit}>
                <div className="row no-gutters">
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
                      label={translate("setting.addressBook.addressLine1")}
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
                      <div className="phone-number col-12">
                        <div className="first">
                          <input
                            className="form-control"
                            value={"+966"}
                            type="text"
                            readOnly />
                        </div>
                        <Field
                          name="mobile"
                          component={RenderField}
                          placeholder={translate("form.address.phoneNumber")}
                          validate={[validations.required]} />
                      </div>

                    </div>
                  </div>
                  <div className="phone-info col-12">
                    <div className="row">
                      <div className="zipCode col-12">
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
                </div>
                {renderButtons}
              </form>
            </div>
        }
      </Fragment>
    )
  }
}
// <Button type="button" className="btn btn-light" text={translate("form.address.map")} onClick={onShowGoogleMap} />

Address = reduxForm({
  form: 'Address',
  enableReinitialize: true
})(Address)

Address = connect(
  state => {
    return {
      initialValues: state.api.country,
      formValues: getFormValues('Address')(state),
    }
  }
)(Address)


export default GoogleApiWrapper({
  apiKey: 'AIzaSyApz-uE9jj33-kpEAGVMHkWz93hJfIuHfU',
  libraries: ['places', 'visualization'],
})(Address);
