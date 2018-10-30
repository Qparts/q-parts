import React, { Component, Fragment } from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { getTranslate } from "react-localize-redux";
import {
  Field,
  reduxForm,
  getFormValues,
  change as changeFieldValue
} from "redux-form";
import Button from "../../components/UI/Button";
import { Dialog } from "primereact/components/dialog/Dialog";
import SelectInput from "../../components/SelectInput/SelectInput";
import RenderField from "../../components/RenderField/RenderField";
import Vehicles from "../../components/Vehicles/Vehicles";

import {
  findSelectedPart,
  setCurrentVehicleSearch
} from "../../actions/baseFormAction";
import { addToCart } from "../../actions/cartAction";
import { completeOrder } from "../../actions/customerAction";

import _ from "lodash";
import * as validations from "../../utils";
import { isAuth } from "../../utils";
import { TAB_ONE, ADD_VEHICLE } from "../../constants";

import "./ManualForm.scss";

export class ManualForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newOrOldVechile: TAB_ONE,
      visible: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.vehiclesFormat !== this.props.vehiclesFormat &&
      this.state.visible
    ) {
      this.onHide();
    }
  }

  componentWillUnmount() {
    this.props.completeOrder(false);
  }

  handleSubmit = ({ partNo, maker }) => {
    this.props.setCurrentVehicleSearch(maker, partNo);
    this.props.history.push(`/order/part/${partNo}/makeId/${maker.id}`);
  };

  onHide = event => {
    this.props.changeFieldValue("ManualForm", "maker", "");
    this.setState({
      visible: false,
      newOrOldVechile: TAB_ONE
    });
  };

  handleAddVehicle = value => {
    if (value.value === ADD_VEHICLE) {
      this.setState({
        visible: true
      });
    }
  };

  handleChange = (event, value) => {
    this.setState({
      newOrOldVechile: value
    });
  };

  handleTrackOrder = () => {
    this.props.history.push("/setting/orders/1");
  };

  render() {
    const { handleSubmit, vehicles, translate } = this.props;
    const makerData = vehicles.map(vehicle => {
      return {
        ...vehicle,
        label: vehicle.nameAr,
        value: vehicle.id
      };
    });

    const modelData = _.has(this.props.formValues, "maker.models")
      ? this.props.formValues.maker.models.map(model => {
          return {
            ...model,
            label: model.nameAr,
            value: model.id
          };
        })
      : [];

    const yearData = _.has(this.props.formValues, "model.modelYears")
      ? this.props.formValues.model.modelYears.map(modelYear => {
          return {
            ...modelYear,
            label: modelYear.year,
            value: modelYear.id
          };
        })
      : [];

    const dropdownList = this.props.vehiclesFormat.slice(0);
    dropdownList.unshift({
      value: ADD_VEHICLE,
      label: (
        <i className="fas fa-plus-circle ManualForm-add_vehcile">Add Vehicle</i>
      )
    });

    const dialog = (
      <Dialog
        header={translate("dialog.vehicle.title")}
        maximizable={true}
        visible={this.state.visible}
        positionTop={0}
        minWidth={1000}
        modal={true}
        onHide={this.onHide}
      >
        <Vehicles
          newOrOldVechile={this.state.newOrOldVechile}
          onTabChange={this.handleChange}
        />
      </Dialog>
    );

    const alertOrderCompleted = this.props.isOrderCompleted && (
      <div className="alert alert-success" role="alert">
        {translate("form.order.trackOrder")}{" "}
        <Button
          type="button"
          className="btn btn-link"
          text={translate("form.order.trackButton")}
          onClick={this.handleTrackOrder}
        />
      </div>
    );

    return (
      <Fragment>
        <img
          alt=""
          className="d-block w-100 mob-hero-img"
          src="img/hero-lg.jpg"
          srcSet="img/hero-lg.jpg, img/cover-img-xs.jpg"
        />
        <div className="container-fluid">
          <div className="row header-shopby-container">
            <header className="col header-shopby-vehicle">
              <h1>{translate("form.order.title")}</h1>
              <p>{translate("form.order.subTitle")}</p>
            </header>
          </div>
          <form className="row mob-form-container" onSubmit={handleSubmit(this.handleSubmit)}>
            <div className="col-lg-4 col-xl-4 mob-form-part-label  col-md-6 col-sm-6">
              <Field
                label={translate("form.order.partNo")}
                name="partNo"
                className="form-control mb-2 mr-sm-2 mob-part-no"
                component={RenderField}
                type="text"
                placeholder={translate("form.order.placeholder.partNo")}
                validate={[validations.required]}
              />
            </div>
            {!isAuth(this.props.token) ? (
              <Fragment>
                <div className="col-lg-6 col-xl-6  col-md-12 col-sm-12 mob-form-order-container">
                  <label className="mob-form-order-container-label">{translate("form.order.make")}</label>
                  <div className="form-inline row">
                    <Field
                      className=" col-lg-4 col-xl-4 manual-mob-maker col-md-12 col-sm-12"
                      name="maker"
                      placeholder="make"
                      component={SelectInput}
                      options={makerData}
                      validate={[validations.required]}
                    />
                    <Field
                      className="col-lg-4 col-xl-4  col-md-12 col-sm-12"
                      name="model"
                      placeholder="model"
                      component={SelectInput}
                      options={modelData}
                      validate={[validations.required]}
                    />
                    <Field
                      className="col-lg-4 col-xl-4  col-md-12 col-sm-12"
                      name="year"
                      placeholder="year"
                      component={SelectInput}
                      options={yearData}
                      validate={[validations.required]}
                    />
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="col-lg-6 col-xl-6  col-md-12 col-sm-12">
                <label>{translate("form.order.make")}</label>
                <div className="form-inline row">
                  <Field
                    className="col-lg-6 col-xl-6 col-md-12 col-sm-12"
                    name="maker"
                    component={SelectInput}
                    options={dropdownList}
                    onChange={this.handleAddVehicle}
                    validate={[validations.required]}
                  />
                </div>
              </div>
            )}
            {/* <div className="col-lg-6">
							<label>For My Vechile</label>
							<div className="form-inline row">
								<select className="custom-select col-lg-2">
									<option defaultValue="Select Year">Select Year</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
								<select className="custom-select col-lg-5">
									<option defaultValue="Select Make ">Select Make</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
								<select className="custom-select col-lg-5">
									<option defaultValue="Select Model">Select Model</option>
									<option value="1">One</option>
									<option value="2">Two</option>
									<option value="3">Three</option>
								</select>
							</div>
						</div> */}
            <Button
              type="submit"
              className="btn btn-primary manual-general-search-btn"
              text={
                <i className="icon-arrow-right">
                  {translate("general.searchButton")}
                </i>
              }
            />
          </form>
        </div>
        {dialog}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    part: state.manualOrder.part,
    vehicles: state.api.vehicles,
    formValues: getFormValues("ManualForm")(state),
    translate: getTranslate(state.localize),
    token: state.customer.token,
    // vehiclesFormat: customer.vehicles,
    vehiclesFormat: state.customer.vehiclesFormat,
    isOrderCompleted: state.customer.isOrderCompleted
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      findSelectedPart,
      addToCart,
      setCurrentVehicleSearch,
      completeOrder,
      changeFieldValue
    },
    dispatch
  );
};

ManualForm = reduxForm({
  form: "ManualForm"
})(ManualForm);

const withManualForm = withRouter(ManualForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withManualForm);
