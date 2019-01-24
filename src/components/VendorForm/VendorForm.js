import React, { Component, Fragment } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux'
import SelectInput from '../SelectInput/SelectInput';

import { getCountriesRegions } from '../../actions/apiAction';
import { getTranslate } from 'react-localize-redux';

import './VendorForm.css';

import _ from 'lodash';
import * as validations from '../../utils';
import Button from '../UI/Button';

class VendorForm extends Component {
  constructor(props) {
    super(props);

    this.props.getCountriesRegions();
  }

  handleSubmit = (values) => {
  }

  renderField = ({ label, sub, type, placeholder, input, meta: { touched, error, warning } }) => {

    return (
      <Fragment>
        <label>{label}</label> <br />
        <sub>{sub}</sub>
        <div className="VendorForm-required">
          <input
            type={type}
            placeholder={placeholder}
            {...input} />
          <Fragment>
            {touched &&
              ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
          </Fragment>
        </div>
      </Fragment>
    );
  }

  render() {
    const { translate } = this.props;
    const VendorTypeData = [
      { label: translate("form.vendor.businessType.retailer"), value: 'Retailer' },
      { label: translate("form.vendor.businessType.wholesaler"), value: 'Wholesaler' },
      { label: translate("form.vendor.businessType.maintenance"), value: 'Maintenance Workshop' },
    ];

    const carPartData = [
      { label: translate("form.vendor.partType.original"), value: 'original' },
      { label: translate("form.vendor.partType.commercial"), value: 'commercial' },
      { label: translate("form.vendor.partType.both"), value: 'I work in both' },
    ];


    const regionsData = _.has(this.props.formValues, 'country.regions') ?
      this.props.formValues.country.regions.map(region => {
        return {
          ...region,
          label: region.nameAr,
          value: region.regionId
        }
      }) : []

    const citiesData = _.has(this.props.formValues, 'region.cities') ?
      this.props.formValues.region.cities.map(city => {
        return {
          ...city,
          value: city.id,
          label: city.nameAr
        }
      }) : [];

    const countryId = _.has(this.props.formValues, 'country.countryId') ?
      this.props.formValues.country.countryId : '';

    const yesNoOptions = [
      { label: translate("form.vendor.deliveryService.yes"), value: 'Yes' },
      { label: translate("form.vendor.deliveryService.no"), value: 'No' },
    ];

    return (
      <div className="VendorForm-container">
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className="form-group">
            <Field
              label={translate("form.vendor.name")}
              name="vendorName"
              component={this.renderField}
              type="text"
              validate={[validations.required]}
              warn={validations.alphaNumeric}
            />
          </div>
          <div className="form-group">
            <Field
              label={translate("form.vendor.businessType.title")}
              name="vendorType"
              component={SelectInput}
              options={VendorTypeData}
              validate={[validations.required]} />
          </div>
          <div className="form-group">

            <Field
              label={translate("form.vendor.modelType")}
              name="carModel"
              component={this.renderField}
              validate={[validations.required]} />

          </div>
          <div className="form-group">
            <Field
              label={translate("form.vendor.partType.title")}
              name="carPart"
              component={SelectInput}
              options={carPartData}
              validate={[validations.required]} />
          </div>
          <div className="form-group">
            <Field
              label={translate("form.vendor.branchLocation.title")}
              name="country"
              component={SelectInput}
              options={this.props.countriesRegions}
              placeholder={translate("form.vendor.branchLocation.country")}
              validate={[validations.required]} />
          </div>
          <div className="form-group">
            <Field
              name="region"
              component={SelectInput}
              options={regionsData}
              placeholder={translate("form.vendor.branchLocation.region")}
              validate={[validations.required]} />
          </div>
          <div className="form-group">
            <Field
              name="city"
              component={SelectInput}
              options={citiesData}
              placeholder={translate("form.vendor.branchLocation.city")}
              validate={[validations.required]} />
          </div>
          <div className="form-group">
            <Field
              label={translate("form.vendor.branchesAmount.label")}
              sub={translate("form.vendor.branchesAmount.sub")}
              type="number"
              name="branchesNo"
              component={this.renderField}
              validate={[validations.required]} />
          </div>
          <div className="form-group">
            <Field
              label={translate("form.vendor.deliveryService.title")}
              name="vendorType"
              component={SelectInput}
              options={yesNoOptions}
              validate={[validations.required]} />
          </div>
          <div className="form-group">
            <Field
              label={translate("form.vendor.managerName")}
              name="managerName"
              component={this.renderField}
              validate={[validations.required]} />
          </div>

          <label htmlFor="">{translate("form.vendor.mobile")}</label>
          <div className="VendorForm-phone-number">
            <input type="text" readOnly="true" value={countryId} />
            <Field
              type="number"
              name="phoneNo"
              component={this.renderField}
              validate={[validations.required]} />
          </div>
          <div className="form-group">
            <label>{translate("form.vendor.email")}</label>
            <Field
              name="email"
              type="email"
              component={this.renderField}
              validate={[validations.required, validations.email]} />
          </div>
          <Button text={translate("form.vendor.submit")} type="submit" />
        </form>
      </div>
    )
  }
}

const mapDispatchToToprops = {
  getCountriesRegions
}

VendorForm = reduxForm({
  form: 'VendorForm'
})(VendorForm)

VendorForm = connect(state => ({
  formValues: getFormValues('VendorForm')(state),
  countriesRegions: state.api.countriesRegions,
  translate: getTranslate(state.localize),
}), mapDispatchToToprops
)(VendorForm)


export default VendorForm;