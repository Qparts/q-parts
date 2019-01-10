import React, { Component, Fragment } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import _ from 'lodash';
import Button from '../../UI/Button';
import { connect } from 'react-redux'
import SelectInput from '../../SelectInput/SelectInput';
import { Map, GoogleApiWrapper } from 'google-maps-react'
import AutoComplete from '../../../containers/Autocomplete/Autocomplete';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';
import RenderField from '../../RenderField/RenderField';
import * as validations from '../../../utils';
import Checkbox from '../../UI/Checkbox';

import './Address.css';

class Address extends Component {
  constructor(props){
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
    const { handleSubmit, regions, formValues, translate, onShowGoogleMap, address, onHide, defaultAddress, onDefaultAddress, isDelivery } = this.props;

    const regionsData = regions ?
      regions.map(region => {
        return {
          ...region,
          value: region.id,
          label: region.nameAr
        }
      }) : [];

    const citiesData = _.has(formValues, 'region.cities') ?
      formValues.region.cities.map(city => {
        return {
          ...city,
          value: city.id,
          label: city.nameAr
        }
      }) : [];

    const renderCityRegion = !this.props.cityFound ?
      <Fragment>
        <div className="col-md-4 div-rounded-first">
          <Field
            name="country"
            placeholder={translate("form.address.country")}
            component={SelectInput}
            options={citiesData}
            validate={[validations.required]} />
        </div>
        <div className="col-md-4 div-rounded">
          <Field
            name="city"
            placeholder={translate("form.address.city")}
            component={SelectInput}
            options={citiesData}
            validate={[validations.required]} />
        </div>
        <div className="col-md-4 div-rounded-last">
          <Field
            name="region"
            placeholder={translate("form.address.region")}
            component={SelectInput}
            options={regionsData}
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
        <div>
          <Checkbox
            onChange={e => this.setState({
              check: !this.state.check
            })}
            checked={this.state.check}
            label={translate("form.address.buttons.defaultAddress")}
          />
        </div>
        <div className="footer">
          <Button onClick={onHide} type="reset" className="btn btn-light" text={translate("form.address.buttons.cancel")} />
          <Button type="submit" className="btn btn-primary" text={translate("form.address.buttons.confirm")} />
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
                <div className="row">
                  <div className="col-6 first-Name">
                    <Field
                      label={translate("form.address.firstName")}
                      name="firstName"
                      component={RenderField}
                      type="text"
                      hasFloatLabel
                      validate={[validations.required]} />
                  </div>
                  <div className="col-6 last-name">
                    <Field
                      label={translate("form.address.lastName")}
                      name="lastName"
                      component={RenderField}
                      type="text"
                      hasFloatLabel
                      validate={[validations.required]} />
                  </div>
                    <div className="col-12 google-map">
                      <img className="main-img" alt="user" src="/img/google-map.svg" onClick={onShowGoogleMap}/>
                      <p>{translate("form.address.selectAddress")}</p>
                  </div>
                  <div className="col-md-12 address-title">
                    <Field
                      label={`*${translate("form.address.title")}`}
                      name="title"
                      component={RenderField}
                      type="text"
                      hasFloatLabel
                      validate={[validations.required]} />
                  </div>
                  <div className="col-12 address-title">
                    <Field
                      label={`${translate("form.address.title")} (${translate("form.address.line2")})`}
                      name="title-line2"
                      component={RenderField}
                      type="text"
                      hasFloatLabel
                      validate={[validations.required]} />
                  </div>
                  {renderCityRegion}
                  <div className="row phone-info col-12">
                    <p className="col-12">{translate("form.address.alternatePhone")}</p>
                    <div className="phone-number col-6">
                      <div className="first">
                        <Field
                          name="phone"
                          component={RenderField}
                          clearable={false}
                          placeholder="+966"
                          validate={[validations.required]} />
                      </div>
                      <Field
                        name="phone-number"
                        component={RenderField}
                        clearable={false}
                        placeholder={translate("form.address.phoneNumber")}
                        validate={[validations.required]} />
                    </div>
                    <div className="alternate-phone-number col-6">
                      <div className="first">
                        <Field
                          name="alternate-phone"
                          component={RenderField}
                          clearable={false}
                          placeholder="+966"
                          validate={[validations.required]} />
                      </div>
                      <Field
                        name="alternate-phone-number"
                        component={RenderField}
                        clearable={false}
                        placeholder={translate("form.address.phoneNumber")}
                        validate={[validations.required]} />
                    </div>
                  </div>
                  <div className="col-12 shipping-style">
                    <Field
                      name="shipping"
                      component={RenderField}
                      type="text"
                      placeholder={translate("form.address.shippingNote")}
                      validate={[validations.required]} />
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
      initialValues: state.customer.address,
      formValues: getFormValues('Address')(state),
    }
  }
)(Address)


export default GoogleApiWrapper({
  apiKey: 'AIzaSyApz-uE9jj33-kpEAGVMHkWz93hJfIuHfU',
  libraries: ['places', 'visualization'],
})(Address);
