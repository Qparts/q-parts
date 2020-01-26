/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component, Fragment } from "react"; // eslint-disable-line no-unused-vars
import { Field, reduxForm } from "redux-form";
import SelectInput from "../../components/SelectInput/SelectInput";
import { getTranslate } from "react-localize-redux";
import { connect } from "react-redux";
import { getTranslatedObject } from "../../utils";
import { withRouter } from "react-router-dom";
import * as validations from "../../utils";
import {
  DownLargeScreen,
  LargeScreen,
  MediumScreen
} from "../../components/Device";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import RenderField from "../../components/RenderField/RenderField";
import { Link } from "react-router-dom";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import Radio from "../../components/UI/Radio";
import {
  setSelectedVehicles,
  checkIsVehicleSelected,
  setSelectedVehicle,
  setSelectedVehicleModel,
  setSelectedVehicleYear,
  unsetVehcileFromSelectedVehicles,
  unsetSelectedVehicles,
  setSelectedVehicleVin
} from "../../actions/apiAction";

import Login from "../Authentication/Login/Login";
import Title from "../../components/UI/Title";
import axios from "axios";
export class ManualForm extends Component {
  constructor(props) {
    super(props);
    this.toggleChangeVehivle = this.toggleChangeVehivle.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      selectedVehicles: props.selectedVehicles,
      selectedVehicle: props.selectedVehicle,
      selectedVehicleModel: props.selectedVehicleModel,
      selectedVehicleYear: props.selectedVehicleYear,
      isVehicleSelected: props.isVehicleSelected,
      browseCatalogeModal: false,
      selectedVehicleField: null,
      vin: "JTHBJ46G9B2420251",
      vinNum: "",
      open: false,
      changeVehcileModal: false,
      dialogType: "signin",
      modal: false
    };
  }

  async componentDidUpdate() {
    if (this.state.selectedVehicle !== this.props.selectedVehicle) {
      await this.setState({
        selectedVehicle: this.props.selectedVehicle
      });
    }
    if (this.state.selectedVehicles !== this.props.selectedVehicles) {
      await this.setState({
        selectedVehicles: this.props.selectedVehicles
      });
    }
    if (this.state.selectedVehicleModel !== this.props.selectedVehicleModel) {
      await this.setState({
        selectedVehicleModel: this.props.selectedVehicleModel
      });
    }
    if (this.props.selectedVehicleYear !== this.state.selectedVehicleYear) {
      await this.setState({
        selectedVehicleYear: this.props.selectedVehicleYear
      });
    }

    if (this.props.selectedVehicleVin !== this.state.vinInput) {
      await this.setState({
        vinInput: this.props.selectedVehicleVin
      });
    }
    if (this.props.isVehicleSelected !== this.state.isVehicleSelected) {
      await this.setState({
        isVehicleSelected: this.props.isVehicleSelected
      });
    }
  }

  toggle() {
    this.setState(prevState => ({
      browseCatalogeModal: !prevState.browseCatalogeModal
    }));
  }

  toggleChangeVehivle() {
    this.setState(prevState => ({
      changeVehcileModal: !prevState.changeVehcileModal
    }));
  }

  handleDialog = dialogType => {
    this.setState({ dialogType });
    this.togglePopup();
  };

  togglePopup = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  getDialogProps = () => {
    const { dialogType } = this.state;
    const { translate } = this.props;

    switch (dialogType) {
      case "vehicle":
        return {
          header: (
            <Title
              header={translate("dialog.vehicle.title")}
              subHeader={translate("dialog.vehicle.subTitle")}
            />
          ),
          className: "garage-popup"
        };
      case "signin":
        return {
          header: <Title header={translate("dialog.signin.title")} />
        };
      default:
        break;
    }
  };

  // getDialogComponent = () => {
  // 	const { dialogType } = this.state;

  // 	switch (dialogType) {
  // 		case 'signin':
  // 			return <Login toggle={this.togglePopup} />;

  // 		default:
  // 			break;
  // 	}
  // };

  handleSelect(e) {
    console.log(e);
  }

  addSelectedVehiclesToGarage = () => {
    if (this.props.isLoggedIn) {
      axios
        .post(
          "http://qtest.fareed9.com:8081/service-q-customer/rest/api/v1/vehicle",
          {
            id: this.state.selectedVehicle.id,
            customerId: this.props.customerDetail.id,
            vehicleYearId: this.state.selectedVehicleYear.vehicleYearId,
            vin: this.state.vinInput
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      return <Login toggle={this.togglePopup} />;
    }
  };

  handleSubmit = async () => {
    let selectedVehicle = this.state.selectedVehicle;
    delete selectedVehicle.models;
    selectedVehicle = {
      ...selectedVehicle,
      year: this.state.selectedVehicleYear,
      model: this.state.selectedVehicleModel
    };

    this.props.onSelectedVehicle(selectedVehicle);
    this.props.setSelectedVehicles(selectedVehicle);
    this.props.onVehicleSelected(true);
  };

  handleChangeVehicleSubmit = () => {
    let selectedVehicle = this.state.selectedVehicle;
    delete selectedVehicle.models;
    selectedVehicle = {
      ...selectedVehicle,
      year: this.state.selectedVehicleYear,
      model: this.state.selectedVehicleModel,
      vin: this.state.vinNum
    };
    this.props.onSelectedVehicle(selectedVehicle);
    this.props.setSelectedVehicles(selectedVehicle);
    // this.toggleChangeVehivle();
  };

  handleBrowseCataloge = () => {};

  render() {
    const { vehicles, currentLanguage, direction, translate } = this.props;
    const { isVehicleSelected } = this.state;
    let selectedVechileModule;

    console.log(this.state.selectedVehicleField);
    const vehicleMake = vehicles.map(vehicle => {
      return {
        ...vehicle,
        label: getTranslatedObject(vehicle, currentLanguage, "name", "nameAr"),
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
        <span>{translate("form.vehicle.make")}</span>
      </div>
    );

    let vehicleModels = null;

    let selectedVehicle = vehicles.find(vehicle =>
      vehicle.models.some(
        model => model.makeId === this.state.selectedVehicle.id
      )
    );
    if (selectedVehicle) {
      vehicleModels = selectedVehicle.models.map(model => {
        return {
          ...model,
          label: getTranslatedObject(model, currentLanguage, "name", "nameAr"),
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
        <span>{translate("form.vehicle.model")}</span>
      </div>
    );

    let vehicleYears = null;
    if (
      vehicleModels &&
      this.state.selectedVehicleModel &&
      this.state.selectedVehicleModel.years
    ) {
      let vehicleModel;
      if (
        (vehicleModel = vehicleModels.find(
          model => model.id === this.state.selectedVehicleModel.id
        ))
      ) {
        vehicleYears = vehicleModel.years.map(year => {
          return {
            label: getTranslatedObject(year, currentLanguage, "year", "year"),
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
        <span>{translate("form.vehicle.year")}</span>
      </div>
    );

    if (isVehicleSelected && this.state.selectedVehicles.length) {
      selectedVechileModule = (
        <div>
          <section className="container-fluid">
            <div className="selected-vechile home">
              <div className="vehicle-img">
                <picture>
                  <source
                    media="(max-width: 465px)"
                    srcSet={this.state.selectedVehicleYear.imageSmall}
                  />
                  <img alt="" src={this.state.selectedVehicleYear.imageLarge} />
                </picture>
                <div className="bg-overlay"></div>
                <div className="bg-brand"></div>
              </div>
              <div className="vehicle-info">
                <div className="row">
                  {this.state.selectedVehicle.name ? (
                    <header className="col">
                      <label className="header-label">
                        {translate("general.selectedVehcile")}:
                      </label>
                      <h3>
                        {currentLanguage === "ar"
                          ? this.state.selectedVehicle.nameAr +
                            " " +
                            this.state.selectedVehicleModel.nameAr +
                            " " +
                            this.state.selectedVehicleYear.label
                          : this.state.selectedVehicle.name +
                            " " +
                            this.state.selectedVehicleModel.name +
                            " " +
                            this.state.selectedVehicleYear.label}
                      </h3>
                      {this.state.selectedVehicle.vin ? (
                        <p>VIN({this.state.selectedVehicle.vin})</p>
                      ) : null}
                    </header>
                  ) : null}
                  <div className="col-md-auto btn-group">
                    {/* browse cataloge button*/}
                    <a
                      href="#"
                      className="btn btn-primary"
                      onClick={this.toggle}
                    >
                      <i className="icon-catalog"></i>
                      {translate("general.browseCataloge.browseButton")}
                    </a>
                    <Modal
                      isOpen={this.state.browseCatalogeModal}
                      toggle={this.toggle}
                      className="modal-lg vin-modal"
                    >
                      <ModalHeader toggle={this.toggle}>
                        {this.props.translate(
                          "general.browseCataloge.vehicleVinNumber"
                        )}
                      </ModalHeader>
                      <ModalBody>
                        <div className="row veh-main-info">
                          <div className="col">
                            <p>
                              <label className="header-label">
                                {this.props.translate(
                                  "general.browseCataloge.vehcileSelectedLabel"
                                )}
                                :
                              </label>
                              {currentLanguage === "ar"
                                ? this.props.selectedVehicle.nameAr +
                                  " " +
                                  this.props.selectedVehicleModel.nameAr +
                                  " " +
                                  this.props.selectedVehicleYear.label
                                : this.props.selectedVehicle.name +
                                  " " +
                                  this.props.selectedVehicleModel.name +
                                  " " +
                                  this.props.selectedVehicleYear.label}
                            </p>
                          </div>
                          <MediumScreen>
                            <div className="col-auto">
                              <a
                                href="#"
                                className="btn btn-gray-secondary"
                                onClick={this.toggleChangeVehivle}
                              >
                                <i className="icon-vehicle"></i>
                                {translate("general.vehicle.changeVehcile")}
                              </a>
                              <Modal
                                isOpen={this.state.changeVehcileModal}
                                toggle={this.toggleChangeVehivle}
                                className="modal-xl vin-modal"
                              >
                                <ModalHeader toggle={this.toggleChangeVehivle}>
                                  {translate(
                                    "general.changeVehicle.modalHeader"
                                  )}{" "}
                                  <LargeScreen>
                                    <span>
                                      {translate(
                                        "general.changeVehicle.modalHeaderSpan"
                                      )}
                                    </span>
                                  </LargeScreen>
                                </ModalHeader>
                                <ModalBody className="add-new-vehicle">
                                  <header>
                                    <h4>
                                      {translate(
                                        "general.changeVehicle.addNewVehicle"
                                      )}{" "}
                                    </h4>
                                    <div className="garage-select">
                                      <MediumScreen>
                                        <label>
                                          {translate(
                                            "form.vehicle.placeholder.select"
                                          )}
                                        </label>
                                      </MediumScreen>
                                      <a
                                        className="btn btn-gray-secondary dropdown-toggle"
                                        role="button"
                                        id="garage-dropdown"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                      >
                                        <img
                                          className="icon-garage"
                                          alt="garage"
                                          src="/img/garage.svg"
                                        />{" "}
                                        {translate("form.vehicle.title")}
                                        <span className="vec-count">
                                          {this.props.selectedVehicles.length}
                                        </span>
                                      </a>
                                      <div
                                        class="dropdown-menu garage-dropdown"
                                        aria-labelledby="garage-dropdown"
                                      >
                                        {/* {this.props.isLoggedIn ?
              								<div className="saved">
              									<div class="media">
              										<i className="icon-vehicle"></i>
              										<div class="media-body">
              											<h5>{translate('dropdown.garage.userGarage')}</h5>
              										</div>
              									</div>
              									<div className="vehic-list">
              										<div className="radio-custom" key={key}>
              											<a  className="row">
              												<div className="col-auto">
              													<Radio
              														checked={this.state.selectedVehicle
                                            .id === vehicle.id}
              														type="radio"
              														id={key}
              														name="radioGroup"
              													/>
              												</div>
              												<p className="col">
              												2016 Ford Focus
              												<span>VIN(000 000 000 000 11)</span>
              											</p>
              											</a>
              										</div>
              									</div>
              								</div>
                         :null } */}
                                        <div className="cached">
                                          <div class="media">
                                            <i className="icon-vehicle-history"></i>
                                            <div class="media-body">
                                              <h5>
                                                {translate(
                                                  "dropdown.garage.cached"
                                                )}
                                              </h5>
                                            </div>
                                          </div>
                                          {this.state.selectedVehicles.map(
                                            (vehicle, key) => {
                                              return (
                                                <div
                                                  className="vehic-list"
                                                  key={key}
                                                >
                                                  <div
                                                    className="radio-custom"
                                                    key="005"
                                                  >
                                                    <a className="row">
                                                      <div className="col-auto">
                                                        <Radio
                                                          checked={
                                                            this.state
                                                              .selectedVehicle
                                                              .id === vehicle.id
                                                          }
                                                          type="radio"
                                                          id={key}
                                                          name="radioGroup"
                                                        />
                                                      </div>
                                                      <p className="col">
                                                        {currentLanguage ===
                                                        "ar"
                                                          ? vehicle.nameAr +
                                                            " " +
                                                            vehicle.model
                                                              .nameAr +
                                                            " " +
                                                            vehicle.year.label
                                                          : vehicle.name +
                                                            " " +
                                                            vehicle.model.name +
                                                            " " +
                                                            vehicle.year.label}
                                                        {vehicle.vin ? (
                                                          <span>
                                                            {vehicle.vin}
                                                          </span>
                                                        ) : null}
                                                      </p>
                                                      <div className="col-auto vec-actions">
                                                        {!this.props
                                                          .isLoggedIn ? (
                                                          <div>
                                                            <a
                                                              href="#"
                                                              className="link"
                                                              onClick={
                                                                this.togglePopup
                                                              }
                                                            >
                                                              {translate(
                                                                "dropdown.garage.save"
                                                              )}
                                                            </a>
                                                            <Modal
                                                              dir={direction}
                                                              contentClassName="container-fluid"
                                                              // className={
                                                              //   this.getDialogProps()
                                                              //     .className
                                                              // }
                                                              isOpen={
                                                                this.state
                                                                  .loginModal
                                                              }
                                                              toggle={
                                                                this.togglePopup
                                                              }
                                                            >
                                                              <ModalHeader
                                                                toggle={
                                                                  this
                                                                    .togglePopup
                                                                }
                                                              >
                                                                <p>Welcome</p>{" "}
                                                                Back
                                                              </ModalHeader>
                                                              <ModalBody>
                                                                {this.addSelectedVehiclesToGarage()}
                                                              </ModalBody>
                                                            </Modal>
                                                          </div>
                                                        ) : (
                                                          <a
                                                            href="#"
                                                            className="link"
                                                            onClick={
                                                              this
                                                                .addSelectedVehiclesToGarage
                                                            }
                                                          >
                                                            {translate(
                                                              "dropdown.garage.save"
                                                            )}
                                                          </a>
                                                        )}
                                                      </div>
                                                    </a>
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </div>
                                      <div
                                        class="dropdown-menu garage-dropdown d-none"
                                        aria-labelledby="garage-dropdown"
                                      >
                                        <ul className="list-unstyled">
                                          {this.state.selectedVehicles.map(
                                            (vehicle, key) => {
                                              return (
                                                <li
                                                  className="radio-custom"
                                                  key={key}
                                                >
                                                  <div href="#" className="row">
                                                    <div className="col-auto">
                                                      <Radio
                                                        checked={
                                                          this.state
                                                            .selectedVehicle
                                                            .id === vehicle.id
                                                        }
                                                        type="radio"
                                                        id={key}
                                                        name="radioGroup"
                                                      />
                                                    </div>
                                                    <p className="col">
                                                      {vehicle.name +
                                                        " " +
                                                        vehicle.model.name +
                                                        "" +
                                                        vehicle.year.label}
                                                      {vehicle.vin ? (
                                                        <span>
                                                          {vehicle.vin}
                                                        </span>
                                                      ) : null}
                                                    </p>
                                                    <div className="col-auto vec-actions">
                                                      {!this.props
                                                        .isLoggedIn ? (
                                                        <div>
                                                          <a
                                                            href="#"
                                                            className="btn btn-primary"
                                                            onClick={
                                                              this.togglePopup
                                                            }
                                                          >
                                                            <i className="icon-catalog"></i>
                                                            {translate(
                                                              "setting.accountSetting.save"
                                                            )}
                                                          </a>
                                                          <Modal
                                                            dir={direction}
                                                            contentClassName="container-fluid"
                                                            // className={
                                                            //   this.getDialogProps()
                                                            //     .className
                                                            // }
                                                            isOpen={
                                                              this.state
                                                                .loginModal
                                                            }
                                                            toggle={
                                                              this.togglePopup
                                                            }
                                                          >
                                                            <ModalHeader
                                                              toggle={
                                                                this.togglePopup
                                                              }
                                                            >
                                                              <p>Welcome</p>{" "}
                                                              Back
                                                            </ModalHeader>
                                                            <ModalBody>
                                                              {this.addSelectedVehiclesToGarage()}
                                                            </ModalBody>
                                                          </Modal>
                                                        </div>
                                                      ) : (
                                                        <a
                                                          href="#"
                                                          className="btn btn-primary"
                                                          onClick={
                                                            this
                                                              .addSelectedVehiclesToGarage
                                                          }
                                                        >
                                                          <i className="icon-catalog"></i>
                                                          save
                                                        </a>
                                                      )}
                                                    </div>
                                                  </div>
                                                </li>
                                              );
                                            }
                                          )}
                                        </ul>
                                      </div>
                                    </div>
                                  </header>
                                  <form
                                    className="gray-input row add-vech-model"
                                    onSubmit={this.props.handleSubmit(
                                      this.handleChangeVehicleSubmit
                                    )}
                                  >
                                    <div className="col-lg float-label">
                                      <Field
                                        onChange={e =>
                                          this.props.onSelectedVehicle(e)
                                        }
                                        label={translate("form.vehicle.make")}
                                        name="make6"
                                        placeholder={" "}
                                        component={SelectInput}
                                        options={groupedvehicleMake}
                                        formatGroupLabel={
                                          formatvehicleMakeLabel
                                        }
                                      />
                                    </div>
                                    <div className="col-lg float-label">
                                      <Field
                                        onChange={e =>
                                          this.props.onSelectedVehicleModel(e)
                                        }
                                        label={translate("form.vehicle.model")}
                                        name="model6"
                                        placeholder={" "}
                                        component={SelectInput}
                                        options={groupedvehicleModel}
                                        validate={[validations.required]}
                                        formatGroupLabel={
                                          formatvehicleModelLabel
                                        }
                                      />
                                    </div>
                                    <div className="col-lg float-label year">
                                      <Field
                                        onChange={e =>
                                          this.props.onSelectedVehicleYear(e)
                                        }
                                        label={translate("form.vehicle.year")}
                                        name="year6"
                                        placeholder={" "}
                                        component={SelectInput}
                                        options={groupedvehicleYear}
                                        validate={[validations.required]}
                                        formatGroupLabel={
                                          formatvehicleYearLabel
                                        }
                                      />
                                    </div>
                                    <div className="col-lg vin-popover">
                                      <LargeScreen>
                                        <p
                                          className="id-img"
                                          id="UncontrolledPopover"
                                          type="text"
                                        >
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
                                        onChange={e =>
                                          this.setState({
                                            vinNum: e.target.value
                                          })
                                        }
                                        hasFloatLabel
                                        name="VIN/Frame0"
                                        type="text"
                                        placeholder={this.props.translate(
                                          "general.VINInput.placeholder"
                                        )}
                                        label={this.props.translate(
                                          "general.VINInput.label"
                                        )}
                                        errorMessage={`${this.props.translate(
                                          "general.enter"
                                        )} ${this.props.translate(
                                          "general.VINInput.label"
                                        )}`}
                                        component={RenderField}
                                        validate={[validations.required]}
                                      />
                                      <div className="VIN-info">
                                        <p
                                          onClick={() =>
                                            this.setState(prevState => ({
                                              vinNum: prevState.vin
                                            }))
                                          }
                                        >
                                          {translate("vehicleInfo.VINNumberEx")}
                                          :{this.state.vin}
                                        </p>
                                        <DownLargeScreen>
                                          <p
                                            className="id-img "
                                            id="UncontrolledPopover"
                                            type="text"
                                          >
                                            <i className="icon-info"></i>{" "}
                                            {translate("vehicleInfo.carId")}
                                          </p>
                                          <UncontrolledPopover
                                            placement="top"
                                            target="UncontrolledPopover"
                                            trigger="legacy"
                                          >
                                            <PopoverBody>
                                              <img
                                                alt=""
                                                src="/img/vin-ex.jpg"
                                              />
                                            </PopoverBody>
                                          </UncontrolledPopover>
                                        </DownLargeScreen>
                                      </div>
                                    </div>
                                    <LargeScreen>
                                      <div className="col-lg-auto actions">
                                        <button
                                          type="submit"
                                          className="btn btn-primary"
                                        >
                                          {translate(
                                            "general.vehicleButton.add"
                                          )}
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
                                              {translate(
                                                "general.buttons.cancel"
                                              )}
                                            </button>
                                          </div>
                                          <div className="col-md-auto col">
                                            <button
                                              type="submit"
                                              className="btn btn-primary"
                                            >
                                              {translate(
                                                "general.vehicleButton.add"
                                              )}
                                              <i className="icon-arrow-right"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </DownLargeScreen>
                                  </form>
                                </ModalBody>
                              </Modal>
                            </div>
                          </MediumScreen>
                        </div>
                        <form className="gray-input vin-input">
                          <Field
                            onChange={e =>
                              this.setState({ vinNum: e.target.value })
                            }
                            hasFloatLabel
                            name="VIN/Frame1"
                            type="text"
                            placeholder={this.props.translate(
                              "general.VINInput.placeholder"
                            )}
                            label={this.props.translate(
                              "general.VINInput.label"
                            )}
                            errorMessage={`${this.props.translate(
                              "general.enter"
                            )} ${this.props.translate(
                              "general.VINInput.label"
                            )}`}
                            component={RenderField}
                            validate={[validations.required]}
                          />
                          <div className="VIN-info">
                            <p
                              onClick={() =>
                                this.setState(prevState => ({
                                  vinInput: prevState.vin
                                }))
                              }
                            >
                              {this.props.translate("vehicleInfo.VINNumberEx")}:{" "}
                              <Link to="#">{this.state.vin}</Link>
                            </p>
                            <p
                              className="id-img"
                              id="UncontrolledPopover"
                              type="text"
                            >
                              <i className="icon-info"></i>{" "}
                              {this.props.translate("vehicleInfo.carId")}
                            </p>
                            <UncontrolledPopover
                              placement="top"
                              target="UncontrolledPopover"
                            >
                              <PopoverBody>
                                <img alt="" src="/img/vin-ex.jpg" />
                              </PopoverBody>
                            </UncontrolledPopover>
                          </div>
                          <div className="actions two-actions">
                            <div className="row">
                              <div className="col-auto">
                                <button
                                  type="submit"
                                  className="btn btn-gray"
                                  onClick={this.toggle}
                                >
                                  {this.props.translate(
                                    "general.buttons.cancel"
                                  )}
                                </button>
                              </div>
                              <div className="col-md-auto col">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                >
                                  {this.props.translate(
                                    "general.browseCataloge.browseButton"
                                  )}
                                  <i className="icon-arrow-right"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </ModalBody>
                    </Modal>
                    {/* change vehicle button */}
                    <a
                      href="#"
                      className="btn btn-dark-black"
                      onClick={this.toggleChangeVehivle}
                    >
                      <i className="icon-vehicle"></i>
                      {translate("general.vehicle.changeVehcile")}
                    </a>
                    <Modal
                      isOpen={this.state.changeVehcileModal}
                      toggle={this.toggleChangeVehivle}
                      className="modal-xl vin-modal"
                    >
                      <ModalHeader toggle={this.toggleChangeVehivle}>
                        {translate("general.changeVehicle.modalHeader")}{" "}
                        <LargeScreen>
                          <span>
                            {translate("general.changeVehicle.modalHeaderSpan")}
                          </span>
                        </LargeScreen>
                      </ModalHeader>
                      <ModalBody className="add-new-vehicle">
                        <header>
                          <h4>
                            {translate("general.changeVehicle.addNewVehicle")}{" "}
                          </h4>
                          <div className="garage-select">
                            <MediumScreen>
                              <label>
                                {translate("form.vehicle.placeholder.select")}
                              </label>
                            </MediumScreen>
                            <a
                              className="btn btn-gray-secondary dropdown-toggle"
                              role="button"
                              id="garage-dropdown"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <img
                                className="icon-garage"
                                alt="garage"
                                src="/img/garage.svg"
                              />{" "}
                              {translate("form.vehicle.title")}
                              <span className="vec-count">
                                {this.props.selectedVehicles.length}
                              </span>
                            </a>
                            <div
                              class="dropdown-menu garage-dropdown"
                              aria-labelledby="garage-dropdown"
                            >
                              {/* {this.props.isLoggedIn ?
              								<div className="saved">
              									<div class="media">
              										<i className="icon-vehicle"></i>
              										<div class="media-body">
              											<h5>{translate('dropdown.garage.userGarage')}</h5>
              										</div>
              									</div>
              									<div className="vehic-list">
              										<div className="radio-custom" key={key}>
              											<a  className="row">
              												<div className="col-auto">
              													<Radio
              														checked={this.state.selectedVehicle
                                            .id === vehicle.id}
              														type="radio"
              														id={key}
              														name="radioGroup"
              													/>
              												</div>
              												<p className="col">
              												2016 Ford Focus
              												<span>VIN(000 000 000 000 11)</span>
              											</p>
              											</a>
              										</div>
              									</div>
              								</div>
                         :null } */}
                              <div className="cached">
                                <div class="media">
                                  <i className="icon-vehicle-history"></i>
                                  <div class="media-body">
                                    <h5>
                                      {translate("dropdown.garage.cached")}
                                    </h5>
                                  </div>
                                </div>
                                {this.state.selectedVehicles.map(
                                  (vehicle, key) => {
                                    return (
                                      <div className="vehic-list" key={key}>
                                        <div className="radio-custom" key="005">
                                          <a className="row">
                                            <div className="col-auto">
                                              <Radio
                                                checked={
                                                  this.state.selectedVehicle
                                                    .id === vehicle.id
                                                }
                                                type="radio"
                                                id={key}
                                                name="radioGroup"
                                              />
                                            </div>
                                            <p className="col">
                                              {currentLanguage === "ar"
                                                ? vehicle.nameAr +
                                                  " " +
                                                  vehicle.model.nameAr +
                                                  " " +
                                                  vehicle.year.label
                                                : vehicle.name +
                                                  " " +
                                                  vehicle.model.name +
                                                  " " +
                                                  vehicle.year.label}
                                              {vehicle.vin ? (
                                                <span>{vehicle.vin}</span>
                                              ) : null}
                                            </p>
                                            <div className="col-auto vec-actions">
                                              {!this.props.isLoggedIn ? (
                                                <div>
                                                  <a
                                                    href="#"
                                                    className="link"
                                                    onClick={this.togglePopup}
                                                  >
                                                    {translate(
                                                      "dropdown.garage.save"
                                                    )}
                                                  </a>
                                                  <Modal
                                                    dir={direction}
                                                    contentClassName="container-fluid"
                                                    className={
                                                      this.getDialogProps()
                                                        .className
                                                    }
                                                    isOpen={this.state.modal}
                                                    toggle={this.togglePopup}
                                                  >
                                                    <ModalHeader
                                                      toggle={this.togglePopup}
                                                    >
                                                      <p>Welcome</p> Back
                                                    </ModalHeader>
                                                    <ModalBody>
                                                      {this.addSelectedVehiclesToGarage()}
                                                    </ModalBody>
                                                  </Modal>
                                                </div>
                                              ) : (
                                                <a
                                                  href="#"
                                                  className="link"
                                                  onClick={
                                                    this
                                                      .addSelectedVehiclesToGarage
                                                  }
                                                >
                                                  {translate(
                                                    "dropdown.garage.save"
                                                  )}
                                                </a>
                                              )}
                                            </div>
                                          </a>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                                {/* <div className="vehic-list">
              										<div className="radio-custom" key="006">
              											<a href="#" className="row">
              												<div className="col-auto">
              													<Radio
              														checked="true"
              														type="radio"
              														id="006"
              														name="radioGroup"
              													/>
              												</div>
              												<p className="col">
              												2016 Ford Focus
              												<span>VIN(000 000 000 000 11)</span>
              											</p>
              												<div className="col-auto vec-actions">
              												<a href="#" className="link">{translate('dropdown.garage.save')}</a>
              											</div>
              											</a>
              										</div>
              									</div>  */}
                              </div>
                            </div>
                            <div
                              class="dropdown-menu garage-dropdown d-none"
                              aria-labelledby="garage-dropdown"
                            >
                              <ul className="list-unstyled">
                                {this.state.selectedVehicles.map(
                                  (vehicle, key) => {
                                    return (
                                      <li className="radio-custom" key={key}>
                                        <div href="#" className="row">
                                          <div className="col-auto">
                                            <Radio
                                              checked={
                                                this.state.selectedVehicle
                                                  .id === vehicle.id
                                              }
                                              type="radio"
                                              id={key}
                                              name="radioGroup"
                                            />
                                          </div>
                                          <p className="col">
                                            {vehicle.name +
                                              " " +
                                              vehicle.model.name +
                                              "" +
                                              vehicle.year.label}
                                            {vehicle.vin ? (
                                              <span>{vehicle.vin}</span>
                                            ) : null}
                                          </p>
                                          <div className="col-auto vec-actions">
                                            {!this.props.isLoggedIn ? (
                                              <div>
                                                <a
                                                  href="#"
                                                  className="btn btn-primary"
                                                  onClick={this.togglePopup}
                                                >
                                                  <i className="icon-catalog"></i>
                                                  {translate(
                                                    "setting.accountSetting.save"
                                                  )}
                                                </a>
                                                <Modal
                                                  dir={direction}
                                                  contentClassName="container-fluid"
                                                  className={
                                                    this.getDialogProps()
                                                      .className
                                                  }
                                                  isOpen={this.state.modal}
                                                  toggle={this.togglePopup}
                                                >
                                                  <ModalHeader
                                                    toggle={this.togglePopup}
                                                  >
                                                    <p>Welcome</p> Back
                                                  </ModalHeader>
                                                  <ModalBody>
                                                    {this.addSelectedVehiclesToGarage()}
                                                  </ModalBody>
                                                </Modal>
                                              </div>
                                            ) : (
                                              <a
                                                href="#"
                                                className="btn btn-primary"
                                                onClick={
                                                  this
                                                    .addSelectedVehiclesToGarage
                                                }
                                              >
                                                <i className="icon-catalog"></i>
                                                save
                                              </a>
                                            )}
                                          </div>
                                        </div>
                                      </li>
                                    );
                                  }
                                )}
                              </ul>
                            </div>
                          </div>
                        </header>
                        <form
                          className="gray-input row add-vech-model"
                          onSubmit={this.props.handleSubmit(
                            this.handleChangeVehicleSubmit
                          )}
                        >
                          <div className="col-lg float-label">
                            <Field
                              onChange={e => this.props.onSelectedVehicle(e)}
                              label={translate("form.vehicle.make")}
                              name="make1"
                              placeholder={" "}
                              component={SelectInput}
                              options={groupedvehicleMake}
                              formatGroupLabel={formatvehicleMakeLabel}
                            />
                          </div>
                          <div className="col-lg float-label">
                            <Field
                              onChange={e =>
                                this.props.onSelectedVehicleModel(e)
                              }
                              label={translate("form.vehicle.model")}
                              name="model1"
                              placeholder={" "}
                              component={SelectInput}
                              options={groupedvehicleModel}
                              validate={[validations.required]}
                              formatGroupLabel={formatvehicleModelLabel}
                            />
                          </div>
                          <div className="col-lg float-label year">
                            <Field
                              onChange={e =>
                                this.props.onSelectedVehicleYear(e)
                              }
                              label={translate("form.vehicle.year")}
                              name="year1"
                              placeholder={" "}
                              component={SelectInput}
                              options={groupedvehicleYear}
                              validate={[validations.required]}
                              formatGroupLabel={formatvehicleYearLabel}
                            />
                          </div>
                          <div className="col-lg vin-popover">
                            <LargeScreen>
                              <p
                                className="id-img"
                                id="UncontrolledPopover"
                                type="text"
                              >
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
                              onChange={e =>
                                this.setState({ vinNum: e.target.value })
                              }
                              hasFloatLabel
                              name="VIN/Frame2"
                              type="text"
                              placeholder={this.props.translate(
                                "general.VINInput.placeholder"
                              )}
                              label={this.props.translate(
                                "general.VINInput.label"
                              )}
                              errorMessage={`${this.props.translate(
                                "general.enter"
                              )} ${this.props.translate(
                                "general.VINInput.label"
                              )}`}
                              component={RenderField}
                              validate={[validations.required]}
                            />
                            <div className="VIN-info">
                              <p
                                onClick={() =>
                                  this.setState(prevState => ({
                                    vinNum: prevState.vin
                                  }))
                                }
                              >
                                {translate("vehicleInfo.VINNumberEx")}:
                                {this.state.vin}
                              </p>
                              <DownLargeScreen>
                                <p
                                  className="id-img "
                                  id="UncontrolledPopover"
                                  type="text"
                                >
                                  <i className="icon-info"></i>{" "}
                                  {translate("vehicleInfo.carId")}
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
                                {translate("general.vehicleButton.add")}
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
                                    {translate("general.buttons.cancel")}
                                  </button>
                                </div>
                                <div className="col-md-auto col">
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    {translate("general.vehicleButton.add")}
                                    <i className="icon-arrow-right"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </DownLargeScreen>
                        </form>
                      </ModalBody>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    } else {
      selectedVechileModule = (
        <section className="select-vechile">
          <picture>
            <source media="(max-width: 650px)" srcset="/img/hero-xs.jpg" />
            <source media="(max-width: 465px)" srcset="/img/hero-xxs.jpg" />
            <img alt="" src="/img/hero-lg.jpg" />
          </picture>
          <div className="form-main">
            <div className="container-fluid">
              <header>
                <h1> {translate("form.order.title")} </h1>
                <p>{translate("form.order.subTitle")} </p>
              </header>
              <form
                onSubmit={this.props.handleSubmit(this.handleSubmit)}
                className="select-vechile-form"
              >
                <div className="row">
                  <div className="col-md float-label">
                    <Field
                      // value={this.state.selectedVehicle}
                      onChange={e => this.props.onSelectedVehicle(e)}
                      label={translate("form.vehicle.make")}
                      name="make4"
                      placeholder={" "}
                      component={SelectInput}
                      options={groupedvehicleMake}
                      validate={[validations.required]}
                      formatGroupLabel={formatvehicleMakeLabel}
                    />
                  </div>
                  <div className="col-md float-label">
                    <Field
                      onChange={e => this.props.onSelectedVehicleModel(e)}
                      label={translate("form.vehicle.model")}
                      name="model4"
                      placeholder={" "}
                      component={SelectInput}
                      options={groupedvehicleModel}
                      validate={[validations.required]}
                      formatGroupLabel={formatvehicleModelLabel}
                    />
                  </div>
                  <div className="col-md float-label">
                    <Field
                      onChange={e => this.props.onSelectedVehicleYear(e)}
                      label={translate("form.vehicle.year")}
                      name="year4"
                      placeholder={" "}
                      component={SelectInput}
                      options={groupedvehicleYear}
                      validate={[validations.required]}
                      formatGroupLabel={formatvehicleYearLabel}
                    />
                  </div>
                  <div className="col-md-auto">
                    <button type="submit" className="btn btn-primary">
                      {translate("general.buttons.go")}{" "}
                      <i className="icon-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      );
    }
    return <div>{selectedVechileModule}</div>;
  }
}

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.localize),
    isVehicleSelected: state.api.isVehicleSelected,
    selectedVehicle: state.api.selectedVehicle,
    selectedVehicleModel: state.api.selectedVehicleModel,
    selectedVehicleYear: state.api.selectedVehicleYear,
    selectedVehicles: state.api.selectedVehicles,
    selectedVehicleVin: state.api.selectedVehicleVin,
    customerDetail: state.customer.detail
  };
};

ManualForm = reduxForm({
  form: "ManualForm"
})(ManualForm);

const withManualForm = withRouter(ManualForm);

const mapDispatchToProps = dispatch => {
  return {
    onVehicleSelected: value => dispatch(checkIsVehicleSelected(value)),
    onSelectedVehicle: value => dispatch(setSelectedVehicle(value)),
    onSelectedVehicleModel: value => dispatch(setSelectedVehicleModel(value)),
    onSelectedVehicleYear: value => dispatch(setSelectedVehicleYear(value)),
    onDeleteSelectedVehicle: payload =>
      dispatch(unsetVehcileFromSelectedVehicles(payload)),
    setSelectedVehicles: payload => dispatch(setSelectedVehicles(payload)),
    onClearHistory: payload => dispatch(unsetSelectedVehicles(payload)),
    onSelectedVehicleVin: value => dispatch(setSelectedVehicleVin(value))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withManualForm);
