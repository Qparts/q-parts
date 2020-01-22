/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React, { Fragment, useState, Component } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { DownLargeScreen, LargeScreen } from "../../../components/Device";
import { helpers } from "../../../constants";

import { getTranslatedObject } from "../../../utils";
import Select from "react-select";
import { InputGroup } from "reactstrap";
import SelectInput from "../../SelectInput/SelectInput";
import RenderField from "../../RenderField/RenderField";
import SelectInputField from "./SelectInputField";

const FormSchema = Yup.object().shape({
  make1: Yup.string().required("Required"),
  model1: Yup.string().required("Required"),
  year1: Yup.string().required("Required"),
  VINFrame0: Yup.string().required("Required")
});

export class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vin: "JTHBJ46G9B2420251",
      vinNum: "",
      hasFloat: "",
      selectedVehicles : "",
      selectedVehicleModel : "",
      selectedVehicleYear : ""
    };
  }

  handleSubmit = async () => {
    let selectedVehicle = selectedVehicle;
    delete selectedVehicle.models;
    selectedVehicle = {
      ...selectedVehicle,
      year: selectedVehicleYear,
      model: selectedVehicleModel
    };
    this.props.onSelectedVehicle(selectedVehicle);
    this.props.setSelectedVehicles(selectedVehicle);
    this.props.onVehicleSelected(true);
  };

  render() {
    let vehicleMake = this.props.vehicles.map(vehicle => {
      return {
        ...vehicle,
        label: getTranslatedObject(
          vehicle,
          this.props.currentLanguage,
          "name",
          "nameAr"
        ),
        value: vehicle.id
      };
    });

    const groupedvehicleMake = [
      {
        options: vehicleMake
      }
    ];

    const formatvehicleMakeLabel = () => (
      <div className="placeholder">
        <span>{this.props.translate("form.vehicle.make")}</span>
      </div>
    );

    let vehicleModels = null;

    let selectedVehicle = this.props.vehicles.find(vehicle =>
      vehicle.models.some(
        model => model.makeId === this.props.selectedVehicle.id
      )
    );

    if (selectedVehicle) {
      vehicleModels = this.props.selectedVehicle.models.map(model => {
        return {
          ...model,
          label: getTranslatedObject(
            model,
            this.props.currentLanguage,
            "name",
            "nameAr"
          ),
          value: model.id,
          years: model.modelYears
        };
      });
    } else {
      vehicleModels = [
        { value: "no options", label: "no options", years: [{}] }
      ];
    }

    const groupedvehicleModel = [
      {
        options: vehicleModels
      }
    ];

    const formatvehicleModelLabel = () => (
      <div className="placeholder">
        <span>{this.props.translate("form.vehicle.model")}</span>
      </div>
    );

    let vehicleYears = null;
    if (
      vehicleModels &&
      this.props.selectedVehicleModel &&
      this.props.selectedVehicleModel.years
    ) {
      let vehicleModel;
      if (
        (vehicleModel = vehicleModels.find(
          model => model.id === this.props.selectedVehicleModel.id
        ))
      ) {
        vehicleYears = vehicleModel.years.map(year => {
          return {
            label: getTranslatedObject(
              year,
              this.props.currentLanguage,
              "year",
              "year"
            ),
            vehicleYearId: year.id,
            imageLarge: year.imageLarge,
            imageSmall: year.imageSmall
          };
        });
      } else {
        vehicleYears = [];
      }
    } else {
      vehicleYears = [{ value: "no options", label: "no options" }];
    }

    const groupedvehicleYear = [
      {
        options: vehicleYears
      }
    ];

    const formatvehicleYearLabel = () => (
      <div className="placeholder">
        <span>{this.props.translate("form.vehicle.year")}</span>
      </div>
    );

    return (
      <Fragment>
        <Formik
          initialValues={{
            make1: "",
            model1: "",
            year1: "",
            VINFrame0: ""
          }}
          validationSchema={FormSchema}
          // onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="gray-input row add-vech-model">
              <div className="col-lg float-label">
              <Field
                  onChange={(e)=>this.setState({selectedVehicle : e.name})}
                  label={this.props.translate("form.vehicle.make")}
                  name="make1"
                  placeholder={" "}
                  type="select"
                  options={groupedvehicleMake}
                  formatGroupLabel={formatvehicleMakeLabel}
                  component={props => (
                    <SelectInputField
                      {...props}
                      meta={{ touched: touched.make1, error: errors.make1 }}
                    />
                  )}
                />
                {errors.make1 && touched.make1 ? (
                  <div>{errors.make1}</div>
                ) : null}
              </div>
              <div className="col-lg float-label">
                <Field
                  onChange={e =>this.setState({selectedVehicleModel : e.name})}
                  label={this.props.translate("form.vehicle.model")}
                  name="model1"
                  placeholder={" "}
                  type="select"
                  options={groupedvehicleModel}
                  formatGroupLabel={formatvehicleModelLabel}
                  component={props => (
                    <SelectInputField
                      {...props}
                      meta={{ touched: touched.model1, error: errors.model1 }}
                    />
                  )}
                />
                {errors.model && touched.model1 ? (
                  <div>{errors.model1}</div>
                ) : null}
              </div>
              <div className="col-lg float-label year">
              <Field
                  onChange={this.props.handleSelectedVehicleModal}
                  label={this.props.translate("form.vehicle.year")}
                  name="year1"
                  placeholder={" "}
                  type="select"
                  options={groupedvehicleYear}
                  formatGroupLabel={formatvehicleYearLabel}
                  component={props => (
                    <SelectInputField
                      {...props}
                      meta={{ touched: touched.year1, error: errors.year1 }}
                    />
                  )}
                />
                {errors.year1 && touched.year1 ? (
                  <div>{errors.year1}</div>
                ) : null}
              </div>
              <div className="col-lg vin-popover">
                <LargeScreen>
                  <p className="id-img" id="UncontrolledPopover" type="text">
                    <i className="icon-info"></i>{" "}
                  </p>
                  <UncontrolledPopover
                    className="vin"
                    placement="left"
                    target="UncontrolledPopover"
                    trigger="legacy"
                  >
                    <PopoverBody>
                      <img alt="" src="/img/vin-ex.jpg" />
                    </PopoverBody>
                  </UncontrolledPopover>
                </LargeScreen>
                <Field
                  hasFloatLabel
                  name="VINFrame0"
                  // type="text"
                  placeholder={this.props.translate(
                    "general.VINInput.placeholder"
                  )}
                  label={this.props.translate("general.VINInput.label")}
                  errorMessage={`${this.props.translate(
                    "general.enter"
                  )} ${this.props.translate("general.VINInput.label")}`}
                  // component={RenderField}
                />
                {errors.VINFrame0 && touched.VINFrame0 ? (
                  <div>{errors.VINFrame0}</div>
                ) : null}
                <div className="VIN-info">
                  <p
                    onClick={() =>
                      this.setState(prevState => ({
                        vinNum: prevState.vin
                      }))
                    }
                  >
                    {this.props.translate("vehicleInfo.VINNumberEx")}:
                    {this.state.vin}
                  </p>
                  <DownLargeScreen>
                    <p className="id-img " id="UncontrolledPopover" type="text">
                      <i className="icon-info"></i>{" "}
                      {this.props.translate("vehicleInfo.carId")}
                    </p>
                    <UncontrolledPopover
                      placement="top"
                      target="UncontrolledPopover"
                      trigger="legacy"
                    >
                      <PopoverBody>
                        <img alt="" src="/img/vin-ex.jpg" />
                      </PopoverBody>
                    </UncontrolledPopover>
                  </DownLargeScreen>
                </div>
              </div>
              <LargeScreen>
                <div className="col-lg-auto actions">
                  <button type="submit" className="btn btn-primary">
                    {this.props.translate("general.vehicleButton.add")}
                    <i className="icon-arrow-right"></i>
                  </button>
                </div>
              </LargeScreen>
              <DownLargeScreen>
                <div className="actions two-actions col">
                  <div className="row">
                    <div className="col-auto">
                      <button
                        type="submit"
                        className="btn btn-gray"
                        onClick={this.toggleChangeVehivle}
                      >
                        {this.props.translate("general.buttons.cancel")}
                      </button>
                    </div>
                    <div className="col-md-auto col">
                      <button type="submit" className="btn btn-primary">
                        {this.props.translate("general.vehicleButton.add")}
                        <i className="icon-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </DownLargeScreen>
            </Form>
          )}
        </Formik>
      </Fragment>
    );
  }
}
export default InputField;
