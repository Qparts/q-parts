import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import SelectInput from '../../SelectInput/SelectInput';
import RenderField from '../../RenderField/RenderField';
import { saveFormDataToCache, clearFormDataFromCache } from '../../../actions/baseFormAction';
import { addVehcile } from '../../../actions/customerAction';
import Button from '../../UI/Button';
import RenderFileInput from '../../RenderFileInput/RenderFileInput';

import _ from 'lodash';
import * as validations from '../../../utils';
import { getTranslatedObject } from '../../../utils';
import { right } from '../../../utils';

import RenderCheckboxField from '../../UI/RenderCheckboxField';
import * as normalizing from '../../../utils';

class Vehicle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      check: false
    }
  }

  handleSubmit = values => {
    this.props.saveFormDataToCache(values);
    const vehicleYearId = values.year.value;
    const vin = values.vin;
    const defaultVehicle = _.isUndefined(values.defaultVehicle) ? false : values.defaultVehicle;
    this.props.addVehcile({ vehicleYearId, vin, defaultVehicle })
      .then(() => {
        this.props.clearFormDataFromCache('vehicle')
        this.props.toggle();
      });
  }

  onCancle = () => {
    this.props.toggle();
  }

  render() {
    const { handleSubmit, vehicles, translate, direction, defaultLang } = this.props;
    const makeData = vehicles.map(vehicle => {
      return {
        ...vehicle,
        label: getTranslatedObject(vehicle, defaultLang, 'name', 'nameAr'),
        value: vehicle.id
      }
    });

    const modelData = _.has(this.props.formValues, 'make.models') ?
      this.props.formValues.make.models.map(model => {
        return {
          ...model,
          label: getTranslatedObject(model, defaultLang, 'name', 'nameAr'),
          value: model.id
        }
      }) : [];

    const yearData = _.has(this.props.formValues, 'model.modelYears') ?
      this.props.formValues.model.modelYears.map(modelYear => {
        return {
          ...modelYear,
          label: modelYear.year,
          value: modelYear.id
        }
      }) : [];


      const vehicleYear = [
      	{ value: 1, label: "2010" },
      	{ value: 2, label: "2011" },
      	{ value: 3, label: "2012" },
      ];
      const groupedvehicleYear = [
      	{
      		options: vehicleYear,
      	},
      ];
      const formatvehicleYearLabel = () => (
      	<div className="placeholder">
      		<span>Select Year</span>
      	</div>
      );
      const vehicleMake = [
      	{ value: 1, label: "BMW" },
      	{ value: 2, label: "KIA" },
      	{ value: 3, label: "Ford" },
      ];
      const groupedvehicleMake = [
      	{
      		options: vehicleMake,
      	},
      ];
      const formatvehicleMakeLabel = () => (
      	<div className="placeholder">
      		<span>Select vehicle Make</span>
      	</div>
      );
      const vehicleModel = [
      	{ value: 1, label: "Rio" },
      	{ value: 2, label: "Focus" },
      	{ value: 3, label: "20CS" },
      ];
      const groupedvehicleModel = [
      	{
      		options: vehicleModel,
      	},
      ];
      const formatvehicleModelLabel = () => (
      	<div className="placeholder">
      		<span>Select vehicle Model</span>
      	</div>
      );
    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} className="one-col gray-input">
        <div className="input-groub">
          <div className="float-label">
            <Field
              label={translate("form.vehicle.make")}
              name="make"
              placeholder={" "}
              component={SelectInput}
              options={groupedvehicleMake}
              formatGroupLabel={formatvehicleMakeLabel}
              validate={[validations.required]}
            />
          </div>
          <div className="float-label">
              <Field
                label={translate("form.vehicle.model")}
                name="model"
                placeholder={" "}
                component={SelectInput}
                options={groupedvehicleModel}
                formatGroupLabel={formatvehicleModelLabel}
                validate={[validations.required]}
              />
          </div>
          <div className="float-label">
              <Field
                label={translate("form.vehicle.year")}
                name="year"
                placeholder={" "}
                component={SelectInput}
                options={groupedvehicleYear}
                formatGroupLabel={formatvehicleYearLabel}
                validate={[validations.required]}
              />
          </div>
          <div className="add-file has-float-label">
            <Field
              name="vin"
              type="text"
              hasFloatLabel
              label={translate("quotationOrder.vin")}
              placeholder={translate("quotationOrder.vin")}
              component={RenderField}
              maxLength="17"
              normalize={normalizing.upper}
              validate={_.has(this.props.formValues, 'vinImage') ? [] : [validations.required, validations.vin, validations.match17Digits, validations.allUpperCase]}
              disabled={_.has(this.props.formValues, 'garage')} />
            <Field
              removeImage={_.has(this.props.formValues, 'garage')}
              name="vinImage"
              component={RenderFileInput}
              image="image"
              disabled={_.has(this.props.formValues, 'garage')} />
          </div>
        </div>
        <div class="checkbox">
          <input type="checkbox" id="default-vehicle" value="checked" />
            <label for="default-vehicle">{translate("form.signup.defaultVehicle")}</label>
          </div>
      <div className="row form-submit">
        <div className="col-auto"><Button className="btn btn-gray" type="reset" text={translate("general.buttons.cancel")} onClick={this.onCancle} /></div>
        <div className="col"><Button className="btn btn-primary" text={translate("form.vehicle.buttons.add")} icon={`icon-arrow-${right(direction)}`} /></div>
      </div>
        {/*<form onSubmit={handleSubmit(this.handleSubmit)}>
          <div className="row no-gutters">
            <div className="group-shadow-input group-shadow-div" />
            <div className="col-md-12 div-first-rounded">
              <Field
                name="make"
                placeholder={translate("form.vehicle.make")}
                component={SelectInput}
                options={makeData}
                validate={[validations.required]} />
            </div>
            <div className="col-md-12 div-rounded">
              <Field
                name="model"
                placeholder={translate("form.vehicle.model")}
                component={SelectInput}
                options={modelData}
                validate={[validations.required]} />
            </div>
            <div className="col-md-12 div-rounded">
              <Field
                name="year"
                placeholder={translate("form.vehicle.year")}
                component={SelectInput}
                options={yearData}
                validate={[validations.required]} />
            </div>
            <div className="col-md-12 div-last-rounded">
              <Field
                name="vin"
                placeholder={translate("form.vehicle.vin")}
                component={RenderField}
                type="text"
                maxLength="17"
                textTransform="uppercase"
                validate={[validations.required, validations.vin, validations.match17Digits, validations.allUpperCase]} />
              <Field
                name="vinImage"
                component={RenderFileInput}
                image='image'
              />
            </div>
          </div>
          <div className="row no-gutters">
            <div className="col-md-12 align-self-end vehicle-radio">
              <Field
                name="defaultVehicle"
                id="defaultVehicle"
                component={RenderCheckboxField}
                label={translate("form.signup.defaultVehicle")}
              />
            </div>
            <Button className="btn btn-light col-3" type="reset" text={translate("general.buttons.cancel")} onClick={this.onCancle} />
            <Button className="btn btn-primary col-8" text={translate("form.vehicle.buttons.add")} icon={`icon-arrow-${right(direction)}`} />
          </div>
        </form>*/}
      </form>
    )
  }
}

Vehicle = reduxForm({
  form: 'Vehicle'
})(Vehicle)

const mapStateToProps = state => {
  return {
    vehicles: state.api.vehicles,
    token: state.customer.token,
    formValues: getFormValues('Vehicle')(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveFormDataToCache: (values) => dispatch(saveFormDataToCache(values)),
    clearFormDataFromCache: (data) => dispatch(clearFormDataFromCache(data)),
    addVehcile: (values) => dispatch(addVehcile(values)),
  }
}

const VehicleWithRouter = withRouter(Vehicle);
export default connect(mapStateToProps, mapDispatchToProps)(VehicleWithRouter);
