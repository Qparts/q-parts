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

import './Address.css';

class Address extends Component {
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
        <div className="form-group">
          <label>{translate("form.address.region")}</label>
          <Field
            name="region"
            component={SelectInput}
            options={regionsData}
            placeholder=""
            validate={[validations.required]} />
        </div>
        <div className="form-group">
          <label>{translate("form.address.city")}</label>
          <Field
            name="city"
            component={SelectInput}
            options={citiesData}
            placeholder=""
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
          <RadioButton value={true} name="defaultAddress" onChange={onDefaultAddress} checked={true === defaultAddress} />
          <label className="p-radiobutton-label">{translate("form.address.buttons.defaultAddress")}</label>
        </div>
        <div>
          <Button onClick={onHide} type="reset" className="btn btn-light" text={translate("form.address.buttons.cancel")} />
          <Button type="submit" className="btn btn-secondary" text={translate("form.address.buttons.confirm")} />
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
              <Button type="button" className="btn btn-light" text={translate("form.address.map")} onClick={onShowGoogleMap} />
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>{translate("form.address.title")}</label>
                  <Field
                    name="title"
                    component={RenderField}
                    type="text"
                    placeholder=""
                    validate={[validations.required]} />
                </div>
                {renderCityRegion}
                <div className="form-group">
                  <label>{translate("form.address.line1")}</label>
                  <Field
                    name="line1"
                    component={RenderField}
                    type="text"
                    validate={[validations.required]} />
                </div>
                <div className="form-group">
                  <label>{translate("form.address.line2")}</label>
                  <Field name="line2" component={RenderField} type="text" />
                </div>
                <div className="form-group">
                  <label>{translate("form.address.zipCode")}</label>
                  <Field
                    name="zipCode"
                    component={RenderField}
                    type="text"
                    placeholder="4435"
                    validate={[validations.required]} />
                </div>
                {renderButtons}
              </form>
            </div>
        }
      </Fragment>
    )
  }
}

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