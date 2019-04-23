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

  handleSubmit = values => {
    const vehicleYearId = values.year.value;
    const vin = _.isUndefined(values.vin) ? null : values.vin;
    const defaultVehicle = _.isUndefined(values.defaultVehicle) ? false : values.defaultVehicle;
    const vinImage = values.vinImage ? values.vinImage : false;

    this.props.addVehcile({ vehicleYearId, vin, defaultVehicle, vinImage })
      .then(() => {
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


    const groupedvehicleYear = [
      {
        options: yearData,
      },
    ];
    const formatvehicleYearLabel = () => (
      <div className="placeholder">
        <span>{translate("general.vehicle.year")}</span>
      </div>
    );
    
    const groupedvehicleMake = [
      {
        options: makeData,
      },
    ];
    const formatvehicleMakeLabel = () => (
      <div className="placeholder">
        <span>{translate("general.vehicle.make")}</span>
      </div>
    );
  
    const groupedvehicleModel = [
      {
        options: modelData,
      },
    ];
    const formatvehicleModelLabel = () => (
      <div className="placeholder">
        <span>{translate("general.vehicle.model")}</span>
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
              validate={_.has(this.props.formValues, 'vinImage') ? [] : [validations.required, validations.vin, validations.match17Digits, validations.allUpperCase]} />
            <Field
              name="vinImage"
              component={RenderFileInput}
              image="image" />
          </div>
        </div>
        <Field
          className="checkbox"
          type="checkbox"
          name="defaultVehicle"
          id="defaultVehicle"
          component={RenderCheckboxField}
          label={translate("form.signup.defaultVehicle")}
        />
        <div className="row form-submit">
          <div className="col-auto"><Button className="btn btn-gray" type="reset" text={translate("general.buttons.cancel")} onClick={this.onCancle} /></div>
          <div className="col"><Button className="btn btn-primary" text={translate("form.vehicle.buttons.add")} icon={`icon-arrow-${right(direction)}`} /></div>
        </div>
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
