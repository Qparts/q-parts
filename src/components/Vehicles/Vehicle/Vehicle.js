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

import Checkbox from '../../UI/Checkbox';

class Vehicle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      check: false
    }
  }

  handleSubmit = values => {
    this.props.saveFormDataToCache(values);

    const vehicleYearId = values.year.id;
    const vin = values.vin;
    this.props.addVehcile({ vehicleYearId, vin })
    .then(() => {
      this.props.clearFormDataFromCache('vehicle')
      this.props.toggle();
    });
  }

  onCancle = () => {
    this.props.toggle();
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
              validate={[validations.vin, validations.match17Digits, validations.allUpperCase]} />
            <Field
              name="vinImage"
              component={RenderFileInput}
              image='image'
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 align-self-end vehicle-radio">
            <Checkbox
              onChange={e => this.setState({
                check: !this.state.check
              })}
              checked={this.state.check}
              label={translate("form.signup.defaultVehicle")}
            />
          </div>
          <div className="footer col-12">
            <Button className="btn btn-light col-3" type="reset" text="Cancel" onClick={this.onCancle} />
            <Button className="btn-primary col-8" text={translate("form.vehicle.buttons.add")} icon={"icon-arrow-right"} />
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
