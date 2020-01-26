/* eslint-disable jsx-a11y/href-no-hash */
import React from "react";
import { getTranslatedObject } from "../../utils";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  reduxForm,
  getFormValues,
  change as changeFieldValue
} from "redux-form";
import _ from "lodash";
import Swiper from "react-id-swiper";
import { getTranslate } from "react-localize-redux";
import Stars from "react-stars";
import { swiperParams } from "../../constants";
import { getBestSeller } from "../../utils/api";
import { handleImageFallback } from "../../utils";
import { starsRating } from "../../constants";
import { getLength } from "../../utils/array";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import SelectInput from "../../components/SelectInput/SelectInput";
import RenderField from "../../components/RenderField/RenderField";
import * as validations from "../../utils";
import { DownLargeScreen, LargeScreen, MediumScreen } from "../../components/Device";
import { Field } from "redux-form";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import TiresForm from "./tires-form";
import "./shop-tires.css";
import Radio from "../../components/UI/Radio";
import axios from "axios";
import Login from "../../containers/Authentication/Login/Login";
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



const { Component, Fragment, createRef } = React;

class HomeDetails extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.toggleChangeVehivle = this.toggleChangeVehivle.bind(this);
    this.state = {
      garage: null,
      modal: false,
      open: false,
      vin: "JTHBJ46G9B2420251",
      vinInput: props.selectedVehicleVin,
      vinNum :"",
      bestSeller: [],
      changeVehcileModal:false,
      selectedVehicles: props.selectedVehicles,
      selectedVehicle: props.selectedVehicle,
      selectedVehicleModel: props.selectedVehicleModel,
      selectedVehicleYear: props.selectedVehicleYear,
      loginModal : false 
    };
    this.vinFieldRef = createRef(null);
    this.loadBestSeller();
  }

  loadBestSeller = () => {
    getBestSeller().then(res => {
      this.setState({
        bestSeller: res.data,
        isLoading: true
      });
    });
  };

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

 async toggleChangeVehivle(e) {
  await  this.setState(prevState => ({
      changeVehcileModal: !prevState.changeVehcileModal,
      modal: !prevState.modal
    }));
  }


 async componentDidUpdate (prevProps, prevState) {
    const { currentLanguage, formValues } = this.props;
    const prevFormValues = _.has(prevProps, "formValues.garage")
      ? prevProps.formValues.garage
      : null;

    if (_.has(formValues, "garage") && formValues.garage !== prevFormValues) {
      const selectedVehicle = formValues.garage.vehicle;
      const vin = formValues.garage.vin;

      this.setState(
        {
          garage: [
            {
              value: 1,
              label: getTranslatedObject(
                selectedVehicle.make,
                currentLanguage,
                "name",
                "nameAr"
              )
            },
            {
              value: 2,
              label: getTranslatedObject(
                selectedVehicle.model,
                currentLanguage,
                "name",
                "nameAr"
              )
            },
            { value: 3, label: selectedVehicle.year },
            vin
          ]
        },
        () => {
          this.handleFillValues();
        }
      );
    }

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

  };

  handleFillValues = () => {
    const { garage } = this.state;

    this.props.changeFieldValue("QuotationRequest", "make", garage[0]);
    this.props.changeFieldValue("QuotationRequest", "model", garage[1]);
    this.props.changeFieldValue("QuotationRequest", "year", garage[2]);
    this.props.changeFieldValue("QuotationRequest", "vin", garage[3]);
  };

  handleSubmit = () => {
    this.props.history.push("/quotation-order");
  };

  handleClick = e => {
    this.setState({ open: !this.state.open });
  };

  handleClose = e => {
    this.setState({ open: false });
  };

  submit = values => {};

  
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

  handleChangeVehicleSubmit = ()=>{
      let selectedVehicle = this.state.selectedVehicle;
      delete selectedVehicle.models;
      selectedVehicle = {
        ...selectedVehicle,
        year: this.state.selectedVehicleYear,
        model: this.state.selectedVehicleModel,
        // vin: this.state.vinInput
      };
      this.props.onSelectedVehicle(selectedVehicle);
      this.props.setSelectedVehicles(selectedVehicle);
      this.toggleChangeVehivle();
  }

  
  togglePopup = () => {
    this.setState({
      loginModal: !this.state.loginModal , 
    });
    // this.toggleChangeVehivle();
 
  };


  render() {
    const { bestSeller } = this.state;
    const {
      translate,
      direction,
      currentLanguage,
      vehicles,
    } = this.props;


    const makeData = vehicles.map(vehicle => {
      return {
        ...vehicle,
        label: getTranslatedObject(vehicle, currentLanguage, "name", "nameAr"),
        value: vehicle.id
      };
    });

    const groupedvehicleMake = [
      {
        options: makeData
      }
    ];

    const formatvehicleMakeLabel = () => (
      <div className="placeholder">
        <span>{translate("general.vehicle.make")}</span>
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



 



    return (
      <Fragment>
        <div className="container-fluid">
          <section className="main-parts">
            <header className="row">
              <h1 className="col">{translate("quotationOrder.mustHaves")}</h1>
            </header>
            <ul className="list-unstyled row">
              <li className="oil col-md-6 col-lg-3">
                <Link to="/listing?query=&page=1&category=2">
                  <img
                    src="/img/oil-filter.svg"
                    alt="Premium quality oil for your engine"
                  />
                  <div className="media-body">
                    <h5>{translate("quotationOrder.oilFilter")}</h5>
                    <p>{translate("quotationOrder.premium")}</p>
                  </div>
                </Link>
              </li>
              <li className="air col-md-6 col-lg-3">
                <Link to="/listing?query=&page=1&category=3">
                  <img
                    src="/img/air-filter.svg"
                    alt="Maximize engine  performance"
                  />
                  <div className="media-body">
                    <h5>{translate("quotationOrder.airFilter")}</h5>
                    <p>{translate("quotationOrder.max")}</p>
                  </div>
                </Link>
              </li>
              <li className="brake col-md-6 col-lg-3">
                <Link to="/listing?query=&page=1&category=6">
                  <img
                    src="/img/disc-brake.svg"
                    alt="Get trusted stopping power"
                  />
                  <div className="media-body">
                    <h5>{translate("quotationOrder.brakePads")}</h5>
                    <p>{translate("quotationOrder.trusted")}</p>
                  </div>
                </Link>
              </li>
              <li className="spark col-md-6 col-lg-3">
                <Link to="/listing?query=&page=1&category=5">
                  <img
                    src="/img/spark-plug.svg"
                    alt="Maintain Engine Efficiency"
                  />
                  <div className="media-body">
                    <h5>{translate("nav.sparkPlugs")}</h5>
                    <p>{translate("quotationOrder.maintenance")}</p>
                  </div>
                </Link>
              </li>
            </ul>
          </section>
          <section className="main-cat">
            <header className="row cat-header">
              <h1 className="col">{translate("homePage.shopByCateg")}</h1>
            </header>
            <ul className="list-unstyled row">
              <li className="col-md-8">
                <Link to="#" onClick={this.toggle}>
                  <figure>
                    <img src="/img/parts-cat.jpg" alt="Vehicle Parts" />
                    <figcaption>
                      <h4>{translate("nav.vehicleParts")}</h4>
                    </figcaption>
                    <span>{translate("quotationOrder.shopNow")}</span>
                  </figure>
                  {this.props.isVehicleSelected ? (
                    <Modal
                      isOpen={this.state.modal}
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
                              <a href="#" className="btn btn-gray-secondary" 
                               onClick={this.toggleChangeVehivle}
                              ><i className="icon-vehicle"></i>{translate("general.vehicle.changeVehcile")}</a>
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
                            <div class="dropdown-menu garage-dropdown" aria-labelledby="garage-dropdown">
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
              											<h5>{translate('dropdown.garage.cached')}</h5>
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
                                              {currentLanguage === "ar" ?
                                              vehicle.nameAr +
                                                " " +
                                                vehicle.model.nameAr +
                                                " " +
                                                vehicle.year.label
                                                :
                                                vehicle.name +
                                                " " +
                                                vehicle.model.name +
                                                " " +
                                                vehicle.year.label
                                                }
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
                                                {translate('dropdown.garage.save')}
                                                </a>
                                                <Modal
                                                  dir={direction}
                                                  contentClassName="container-fluid"
                                                  // className={
                                                  //   this.getDialogProps()
                                                  //     .className
                                                  // }
                                                  isOpen={this.state.loginModal}
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
                                                {translate('dropdown.garage.save')}
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
                                                {translate("setting.accountSetting.save")}
                                                </a>
                                                <Modal
                                                  dir={direction}
                                                  contentClassName="container-fluid"
                                                  // className={
                                                  //   this.getDialogProps()
                                                  //     .className
                                                  // }
                                                  isOpen={this.state.loginModal}
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
                          onSubmit={this.props.handleSubmit(this.handleChangeVehicleSubmit)}  
                        >
                          <div className="col-lg float-label">
                            <Field
                              onChange={e => this.props.onSelectedVehicle(e)}
                              label={translate("form.vehicle.make")}
                              name="make3"
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
                              name="model3"
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
                              name="year3"
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
                              onChange={e => this.setState({vinNum : e.target.value})}
                              hasFloatLabel
                              name="VIN/Frame3"
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
                                {translate(
                                  "vehicleInfo.VINNumberEx"
                                )}
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
                                    <img alt="" src="/img/vin-ex.jpg" />
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
                                {translate("general.vehicleButton.add")}
                                <i className="icon-arrow-right"></i>
                              </button>
                            </div>

                          </LargeScreen>
                          <DownLargeScreen>
                            <div className="actions two-actions col">
                              <div className="row">
                                <div className="col-auto">
                                  <button type="submit" className="btn btn-gray" onClick={this.toggleChangeVehivle}>
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
                          </MediumScreen>
                        </div>
                        <form className="gray-input vin-input">
                        <Field
                              onChange={e => this.setState({vinNum : e.target.value})}
                              hasFloatLabel
                              name="VIN/Frame4"
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
                                this.setState(prevState => 
                                  ({
                                  vinInput: prevState.vin
                                })
                                )
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
                  ) 
                  
                  : (
                    <Modal
                      isOpen={this.state.modal}
                      toggle={this.toggle}
                      className="modal-xl vin-modal"
                     
                    >
                      <ModalHeader toggle={this.toggle}>
                        {translate("vehicleInfo.popupVinNumTitle")}
                        <LargeScreen>
                          <span>
                            {translate("vehicleInfo.popupVinNumSubTitle")}
                          </span>
                        </LargeScreen>
                      </ModalHeader>
                      <ModalBody>
                        <form className="gray-input row">
                          <div className="col-md-auto float-label make">
                            <Field
                              onChange={e =>
                                this.setState(() => ({
                                  selectedVehicle: e.name
                                }))
                              }
                              label="Make"
                              name="make"
                              placeholder={" "}
                              component={SelectInput}
                              options={groupedvehicleMake}
                              formatGroupLabel={formatvehicleMakeLabel}
                            />
                          </div>
                          <div className="col">
                          <Field
                              onChange={e => this.setState({vinNum : e.target.value})}
                              hasFloatLabel
                              name="VIN/Frame5"
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
                                {translate("vehicleInfo.VINNumberEx")}:
                                {this.state.vin}
                              </p>

                              <p
                                className="id-img"
                                id="UncontrolledPopover"
                                type="text"
                              >
                                <i className="icon-info"></i>{" "}
                                {translate("vehicleInfo.carId")}
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
                          </div>
                          <div className="col-lg-auto actions">
                            <div className="row">
                              <DownLargeScreen>
                                <div className="col-auto">
                                  <button
                                    type="submit"
                                    className="btn btn-gray"
                                    onClick={this.handleClose}
                                  >
                                    {translate("general.buttons.cancel")}
                                  </button>
                                </div>
                              </DownLargeScreen>
                              <div className="col-md-auto col">
                                <Link to="">
                                  <button
                                    type="submit"
                                    className="btn btn-primary"
                                  >
                                    {translate(
                                      "vehicleInfo.browseCatalogueBtn"
                                    )}
                                    <i className="icon-arrow-right"></i>
                                  </button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </form>
                      </ModalBody>
                    </Modal>
                  )}
                </Link>
              </li>
              <li className="col-md-4 col-6">
                <Link to="/accessories">
                  <figure>
                    <img src="/img/accessories-cat-lg.jpg" alt="Accessories" />
                    <figcaption>
                      <h4>{translate("nav.accessorise")}</h4>
                    </figcaption>
                    <span>{translate("quotationOrder.shopNow")}</span>
                  </figure>
                </Link>
              </li>
              <li className="col-md-4 col-6">
                <Link to="/listing?query=&page=1&category=7">
                  <figure>
                    <img src="/img/motor-oil-cat-lg.jpg" alt="Motor Oil" />
                    <figcaption>
                      <h4>{translate("nav.motorOil")}</h4>
                    </figcaption>
                    <span>{translate("quotationOrder.shopNow")}</span>
                  </figure>
                </Link>
              </li>
              <li className="col-md-4 col-6">
                <Link to="/listing?query=&page=1&category=8">
                  <figure>
                    <img src="/img/gear-oil-cat-lg.jpg" alt="Gear Oil" />
                    <figcaption>
                      <h4>{translate("nav.gearOil")}</h4>
                    </figcaption>
                    <span>{translate("quotationOrder.shopNow")}</span>
                  </figure>
                </Link>
              </li>
              <li className="col-md-4 col-6">
                <Link to="/listing?query=&page=1&category=27">
                  <figure>
                    <img src="/img/coolant-lg.jpg" alt="Coolant " />
                    <figcaption>
                      <h4>{translate("nav.coolant")}</h4>
                    </figcaption>
                    <span>{translate("quotationOrder.shopNow")}</span>
                  </figure>
                </Link>
              </li>
            </ul>
          </section>
          {/* <section className="vendor">
						<div className="shop-tires">
							<div className="shop-tires-details">
								<header>{translate("tires.title")}
								</header>
								<hr />
								<h5>{translate("tires.selectTiresSize.header")}  | </h5>
                                 <TiresForm vehicles={this.vehicles}/>
							</div>
							<img alt="" src="/img/tire-ex.png" className="tires-img" />
						</div>
					</section> */}
          <section className="tires-filter">
            <picture>
              <source media="(max-width: 760px)" srcSet="/img/tire-bg-sm.jpg" />
              <img alt="" src="/img/tire-bg.jpg" />
            </picture>
            <div className="d-flex">
              <div className="col">
                <header className="cat-header">
                  <h1>
                    <p>{translate("tires.shop")}</p> {translate("tires.title")}
                  </h1>
                </header>
                <div className="tire-ex">
                  <h5>{translate("tires.selectTiresSize.header")} </h5>
                  <ul className="list-inline">
                    <li>
                      <p>225</p>
                      <label>{translate("tires.placeholders.width")}</label>
                    </li>
                    <li>/</li>
                    <li>
                      <p>45</p>
                      <label>{translate("tires.placeholders.height")}</label>
                    </li>
                    <li>
                      <p>R17</p>
                      <label>{translate("tires.placeholders.diameter")}</label>
                    </li>
                  </ul>
                </div>
                <TiresForm vehicles={this.vehicles} />
              </div>
              <LargeScreen>
                <aside className="col-lg-auto col-md-5 img-ex">
                  <img alt="" src="/img/tire-ex.png" />
                </aside>
              </LargeScreen>
            </div>
          </section>
        </div>
        <section className="top-selling">
          <div className="gray-bg pb-sec">
            <div className="container-fluid">
              <div className="row">
                <div className="col products-list">
                  <header className="sec-head">
                    <h2>Top Selling</h2>
                  </header>
                  <Swiper {...swiperParams(direction)}>
                    {bestSeller.map((product, idx) => (
                      <div key={idx}>
                        <Link to={`/products/${product.id}`} className="card">
                          <img
                            onError={handleImageFallback}
                            src={product.image}
                            className="card-img-top"
                            alt="no product"
                          />
                          <div className="card-body">
                            <h5 className="card-title">
                              {getTranslatedObject(
                                product,
                                currentLanguage,
                                "desc",
                                "descAr"
                              )}
                            </h5>
                            <ul className="list-inline product-info">
                              <li>
                                <strong>
                                  {getTranslatedObject(
                                    product.brand,
                                    currentLanguage,
                                    "name",
                                    "nameAr"
                                  )}
                                </strong>
                              </li>
                              <li>{product.number}</li>
                            </ul>
                            <div className="rating">
                              <Stars
                                values={
                                  product.averageRating
                                    ? product.averageRating
                                    : 0
                                }
                                {...starsRating}
                              />
                              <span>
                                {getLength(product.reviews)} 0 Review(s)
                              </span>
                            </div>
                            <p className="price">
                              {product.salesPrice.toFixed(2)} <span>RS</span>
                            </p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </Swiper>
                  <div className="swiper-left"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

HomeDetails = reduxForm({
  form: "QuotationRequest"
})(HomeDetails);

const mapStateToProps = state => {
  console.log(state);
  
  return {
    formValues: getFormValues("QuotationRequest")(state),
    translate: getTranslate(state.localize),
    selectedVehicle: state.api.selectedVehicle,
    isVehicleSelected: state.api.isVehicleSelected,
    selectedVehicleModel: state.api.selectedVehicleModel,
    selectedVehicleYear: state.api.selectedVehicleYear,
    selectedVehicles: state.api.selectedVehicles,
    selectedVehicleVin: state.api.selectedVehicleVin,
    customerDetail: state.customer.detail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeFieldValue: (format, field, value) =>
      dispatch(changeFieldValue(format, field, value)),
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

const withHomeDetails = withRouter(HomeDetails);

export default connect(mapStateToProps, mapDispatchToProps)(withHomeDetails);
