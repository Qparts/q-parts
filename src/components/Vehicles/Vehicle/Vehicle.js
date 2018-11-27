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
import { isAuth } from '../../../utils';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';


class Vehicle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultVehicle: ''
    }
  }

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

  handleDefaultVehicle = e => {
    this.setState({ defaultVehicle: e.value })
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
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="row">
          <div className="group-shadow-input" />
          <div className="col-md-3 div-first-rounded m-sm">
            <Field
              name="make"
              placeholder={translate("form.vehicle.make")}
              component={SelectInput}
              options={makeData}
              validate={[validations.required]} />
          </div>
          <div className="col-md-3 m-sm">
            <Field
              name="model"
              placeholder={translate("form.vehicle.model")}
              component={SelectInput}
              options={modelData}
              validate={[validations.required]} />
          </div>
          <div className="col-md-3 m-sm">
            <Field
              name="year"
              placeholder={translate("form.vehicle.year")}
              component={SelectInput}
              options={yearData}
              validate={[validations.required]} />
          </div>
          <div className="col-md-3 div-last-rounded m-sm">
            <Field
              name="vin"
              placeholder={translate("form.vehicle.vin")}
              component={RenderField}
              type="text"
              validate={[validations.vin, validations.match17Digits, validations.allUpperCase]} />
            <Field
              name="vinImage"
              component={RenderFileInput}
              image='image'
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12 align-self-end">
            <div className="vehicle-radio">
              <RadioButton value={true} name="defaultAddress" onChange={this.handleDefaultVehicle} checked={true === this.state.defaultVehicle} />
              <label>{translate("form.signup.defaultVehicle")}</label>
            </div>
          </div>
          <div className="col-md-6 col-sm-12 text-align">
            <Button className="btn-primary" text={translate("form.vehicle.buttons.add")} icon={"icon-arrow-right"} />
          </div>
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