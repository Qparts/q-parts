import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';

import SelectInput from '../../SelectInput/SelectInput';
import RenderField from '../../RenderField/RenderField';
import { Button } from 'primereact/components/button/Button';
import { saveFormDataToCache, clearFormDataFromCache } from '../../../actions/baseFormAction';
import { addVehcile } from '../../../actions/customerAction';

import _ from 'lodash';
import * as validations from '../../../utils';
import { isAuth } from '../../../utils';

import './Vehicle.css';

class Vehicle extends Component {

  handleSubmit = values => {
    this.props.saveFormDataToCache(values);
    if (isAuth(this.props.token)) {
      const vehicleId = values.year.id;
      const vin = values.vin;
      this.props.addVehcile({ vehicleId, vin })
      this.props.clearFormDataFromCache('vehicle')
      this.props.history.push('/');

    } else {
      this.props.history.push('/login');

    }
  }


  render() {
    const { handleSubmit, vehicles, translate } = this.props;
    const makeData = vehicles.map(vehicle => {
      return {
        ...vehicle,
        label: vehicle.nameAr,
        value: vehicle.id
      }
    });

    const modelData = _.has(this.props.formValues, 'make.models') ?
      this.props.formValues.make.models.map(model => {
        return {
          ...model,
          label: model.nameAr,
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

    return (
      <form className="Vehicle-container" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group">
          <label>{translate("form.vehicle.make")}</label>
          <Field
            name="make"
            placeholder=""
            component={SelectInput}
            options={makeData}
            validate={[validations.required]} />
        </div>
        <div className="form-group">
          <label>{translate("form.vehicle.model")}</label>
          <Field
            name="model"
            placeholder=""
            component={SelectInput}
            options={modelData}
            validate={[validations.required]} />
        </div>
        <div className="form-group">
          <label>{translate("form.vehicle.year")}</label>
          <Field
            name="year"
            placeholder=""
            component={SelectInput}
            options={yearData}
            validate={[validations.required]} />
        </div>
        <div className="form-group">
          <label>{translate("form.vehicle.vin")}</label>
          <Field
            name="vin"
            component={RenderField}
            type="text" placeholder={translate("form.vehicle.placeholder.vin")}
            validate={[validations.vin, validations.match17Digits, validations.allUpperCase]} />
        </div>
        <Button label={translate("form.vehicle.buttons.add")} />
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