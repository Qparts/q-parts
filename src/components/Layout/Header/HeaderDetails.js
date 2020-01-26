
/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import DropdownItem from "../../UI/Nav/DropdownItem";
import { NavLg } from "../../Device";
import { getTranslate , getActiveLanguage } from "react-localize-redux";
import { connect } from "react-redux";
import {
  setSelectedVehicles,
  checkIsVehicleSelected,
  setSelectedVehicle,
  setSelectedVehicleModel,
  setSelectedVehicleYear,
  unsetVehcileFromSelectedVehicles,
  unsetSelectedVehicles,
  setSelectedVehicleVin
} from "../../../actions/apiAction";
import { clearFormDataFromCache } from "../../../actions/baseFormAction";
import Radio from "../../UI/Radio";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Title from "../../../components/UI/Title";
import Login from "../../../containers/Authentication/Login/Login";
import axios from "axios";
import * as validations from "../../../utils";
import {
  DownLargeScreen,
  LargeScreen,
  MediumScreen
} from "../../../components/Device";
import { Field  , reduxForm} from "redux-form";
import SelectInput from "../../../components/SelectInput/SelectInput";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { getTranslatedObject } from "../../../utils";
import RenderField from "../../../components/RenderField/RenderField";
import { withRouter } from "react-router-dom";
import { InputField } from "./inputField";





class HeaderDetails extends Component {
  constructor(props) {
    super(props);
    this.toggleChangeVehivle = this.toggleChangeVehivle.bind(this);
    this.state = {
      notification: "",
      newNote: "",
      selectedVehicles: props.selectedVehicles,
      isVehicleSelected: props.isVehicleSelected,
      selectedVehicle: props.selectedVehicle,
      selectedVehicleModel: props.selectedVehicleModel,
      selectedVehicleYear: props.selectedVehicleYear,
      modal: false,
      changeVehcileModal: false,
      vin: "JTHBJ46G9B2420251",
      vinInput: props.selectedVehicleVin,
      vinNum :"",
    };
  }

  componentDidMount() {
    this.setReadReplies();
  }

 async componentDidUpdate(prevProps, prevState) {
    const { completed } = this.props.quotations;
    const prevCompleted = prevProps.quotations.completed;

    if (completed !== prevCompleted) {
      this.setReadReplies();
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

  }

  


  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  setReadReplies = () => {
    let hasNoNewReply = this.props.quotations.completed.every(
      reply => reply.read
    );

    this.setState({
      notification: hasNoNewReply ? "" : "notification",
      newNote: hasNoNewReply ? "" : "new-note"
    });
  };

  getReplayCounter = () => {
    return this.props.quotations.completed.filter(reply => !reply.read).length;
  };

  togglePopup = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleDialog = dialogType => {
    this.setState({ dialogType });
    this.togglePopup();
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

  toggleChangeVehivle() {
    this.setState(prevState => ({
      changeVehcileModal: !prevState.changeVehcileModal
    }));
  }

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
      vin: this.state.vinNum
    };
    this.props.onSelectedVehicle(selectedVehicle);
    this.props.setSelectedVehicles(selectedVehicle);
    this.props.onVehicleSelected(true);
    this.toggleChangeVehivle();
}

  render() {
    const {
      translate,
      isLoggedIn,
      fullName,
      onSignin,
      cart,
      direction,
      currentLanguage
    } = this.props;

    
    const { notification, newNote } = this.state;
    const dropdownHeader = (
      <Fragment>
        {isLoggedIn ? (
          <span>
            <b>{fullName}</b>
            <label className={newNote} />
          </span>
        ) : (
          <Fragment>
            <span className="user-img position-relative d-inline-block">
              <img alt="user" src="/img/user.svg" />
            </span>
            <b>{translate("general.signin")}</b>
            <span className="seperator" />
            {translate("general.join")}
          </Fragment>
        )}
      </Fragment>
    );

    const authOrNotAuthButtons = (
      <NavLg>
        <li className="user-account">
          <DropdownItem header={dropdownHeader}>
            {!isLoggedIn && (
              <Fragment>
                <h6>{translate("dialog.signin.title")}</h6>
                <ul className="signin-list">
                  <li>
                    <Link className="btn" to="#" onClick={onSignin}>
                      {translate("general.signin")}{" "}
                      <i className="icon-arrow-right" />
                    </Link>
                  </li>
                  {/* <li><a href="#"><i className="icon-facebook" /></a></li>
                <li><a href="#"><img src="/img/google-icon.svg"></img></a></li> */}
                </ul>
                <p>
                  {translate("dropdown.signup.message")}
                  <Link to="/signup">
                    {translate("dropdown.signup.link")}
                    <i className="icon-arrow-right" />
                  </Link>
                </p>
                {/*<ul className="account-actions">
                  <li>
                   <Link to="/" onClick={onSignin}><i className="icon-shopping-bag"></i>{translate("navBar.menu.menuItem.order")}</Link>
                  </li>
                  <li><Link to="/setting/quotations"><i className="icon-send"></i>{translate("navBar.menu.menuItem.quotations")}</Link></li>
                  <li><Link to="/" onClick={onSignin}><img alt="garage" src="/img/garage.svg" />{translate("navBar.garage")}</Link></li>
                </ul>*/}
              </Fragment>
            )}
            {isLoggedIn && (
              <ul className="profile-actions list-unstyled">
                <li>
                  <Link to="/setting/quotations" className={notification}>
                    {this.getReplayCounter() > 0 && (
                      <span>{this.getReplayCounter()}</span>
                    )}
                    <i className="icon-send" />
                    {translate("navBar.menu.menuItem.quotations")}
                  </Link>
                </li>
                {/* <li>
                  <Link to="/setting/orders"><i className="icon-product"></i>{translate("navBar.menu.menuItem.order")}</Link>
                </li> */}
                <li>
                  <Link to="/setting/addresses">
                    <i className="icon-address" />
                    {translate("navBar.menu.menuItem.address")}
                  </Link>
                </li>
                {/* <li>
                  <Link to="/setting/profile"><img alt="garage" src="/img/user.svg" />{translate("navBar.menu.menuItem.setting")}</Link>
                </li> */}
                <li>
                  <Link to="/logout">
                    <i className="icon-sign-out" />
                    {translate("navBar.menu.menuItem.logout")}
                  </Link>
                </li>
              </ul>
            )}
          </DropdownItem>
        </li>
      </NavLg>
    );

    const { vehicles } = this.props;

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

    return (
      <ul>
        {authOrNotAuthButtons}
        <li className="search-sm">
          <a className="cd-search-trigger" href="#cd-search">
            <span />
          </a>
        </li>
        <li>
          <span className="seperator" />
        </li>
        <NavLg>
          <li>
            <div className="dropdown">
              <Link
                to="/setting/garage"
                className="dropdown-toggle"
                role="button"
                id="garage-dropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img alt="garage" src="/img/garage.svg" />

                {/*  user not logged in or logged in and don't have vehicles in history or in garage the notification will not be shown */}
                {(!isLoggedIn || isLoggedIn) &&
                this.state.selectedVehicles.length > 0 ? (
                  <span className="notify-num">
                    {this.props.selectedVehicles.length}
                  </span>
                ) : null}
                {translate("navBar.garage")}
              </Link>

              {/*  user not logged in or logged in and don't have vehicles in history or garage will be show a message to user */}
              {!this.state.selectedVehicles.length ? (
                <div
                  class="dropdown-menu garage-dropdown"
                  aria-labelledby="garage-dropdown"
                >
								<div className="empty-vehic">
                  <a href="#" className="btn btn-primary" onClick={this.toggleChangeVehivle}><i className="icon-add"> </i> {translate('dropdown.garage.addVehicle')}</a>
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
                        </header>
                        <form
                          className="gray-input row add-vech-model"
                          onSubmit={this.props.handleSubmit(this.handleChangeVehicleSubmit)}  
                        >
                          <div className="col-lg float-label">
                            <Field
                              onChange={e => this.props.onSelectedVehicle(e)}
                              label={translate("form.vehicle.make")}
                              name="make2"
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
                              name="model2"
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
                              name="year2"
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
                            {/* <Field
                              hasFloatLabel
                              name="VIN/Frame2"
                              type="text"
                              placeholder={translate(
                                "general.VINInput.placeholder"
                              )}
                              label={translate(
                                "general.VINInput.label"
                              )}
                              errorMessage={`${translate(
                                "general.enter"
                              )} ${translate(
                                "general.VINInput.label"
                              )}`}
                              component={RenderField}
                              onChange={(e)=>this.props.onSelectedVehicleVin(e)}
                              validate={[validations.required]}
                            /> */}
                            <RenderField
                             hasFloatLabel
                             name="VIN/Frame2"
                             type="text"
                             placeholder={translate(
                               "general.VINInput.placeholder"
                             )}
                             label={translate(
                               "general.VINInput.label"
                             )}
                             errorMessage={`${translate(
                               "general.enter"
                             )} ${translate(
                               "general.VINInput.label"
                             )}`}
                             
                             value={this.state.vinNum}
                          
                             validate={[validations.required]}
                             onChange={(e)=>this.setState({vinNum : e.target.value})}
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
									<p>{translate("dialog.vehicle.subTitle")}</p>
								</div>
                </div>
              ) : (
                <div
                  class="dropdown-menu garage-dropdown"
                  aria-labelledby="garage-dropdown"
                >
                  <div className="cached">
                    <div class="media">
                      <i className="icon-vehicle-history"></i>
                      <div class="media-body">
                        <h5>{translate("dropdown.garage.cached")}</h5>
                      </div>

                    </div>
                    <div className="vehic-list">
                      {this.state.selectedVehicles.map((vehicle, key) => {
                        return (
                          <div className="radio-custom" key={key}>
                                {vehicle.name ?
                            <a  className="row">
                              <div className="col-auto">
                                <Radio
                                  defaultChecked={this.state.selectedVehicle.id === vehicle.id}
                                  type="radio"
                                  id={key}
                                  name="radioGroup"
                                />
                              </div>
                               {this.props.currentLanguage === "ar" ?
                              <p className="col">
                                {vehicle.nameAr +
                                  " " +
                                  vehicle.model.nameAr +
                                  "" +
                                  vehicle.year.label
                                 }
                                {vehicle.vin ? (
                                  <span>{vehicle.vin}</span>
                                  ) : null}
                              </p>
                               :
                               <p className="col">
                                {vehicle.name +
                                  " " +
                                  vehicle.model.name+
                                  "" +
                                  vehicle.year.label
                                 }
                                {vehicle.vin ? (
                                  <span>{vehicle.vin}</span>
                                  ) : null}
                              </p>
                               }

                              <div className="col-auto vec-actions">
                                <a
                                  className="btn btn-gray"
                                  onClick={this.togglePopup}
                                  >
                                  <i className="icon-catalog"></i>
                                  {translate("dropdown.garage.catalog")}
                                </a>
                                {!isLoggedIn ? (
                                  <div>
                                    <a
                                    href="#"
                                      className="link"
                                      onClick={this.togglePopup}
                                    >
                                      {translate("dropdown.garage.save")}
                                    </a>
                                    <Modal
                                      dir={direction}
                                      contentClassName="container-fluid"
                                      // className={this.getDialogProps().className}
                                      isOpen={this.state.modal}
                                      toggle={this.togglePopup}
                                      >
                                      <ModalHeader toggle={this.togglePopup}>
                                        <p>Welcome</p> Back
                                      </ModalHeader>
                                      <ModalBody>
                                        {this.addSelectedVehiclesToGarage()}
                                      </ModalBody>
                                    </Modal>
                                  </div>
                                ) : (
                                  <a
                                  className="link"
                                  onClick={this.addSelectedVehiclesToGarage}
                                  >
                                    {translate("dropdown.garage.save")}
                                  </a>
                                )}
                              </div>
                            </a>
                              :null}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="vec-list-actions">
                    <div className="main-action">
                      <a className="btn btn-gray" onClick={this.toggleChangeVehivle}>
                        <i className="icon-add-vehicle"></i>
                        {translate("dropdown.garage.addVehicle")}
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
                              name="make2"
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
                              name="model2"
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
                              name="year2"
                              placeholder={" "}
                              component={SelectInput}
                              options={groupedvehicleYear}
                              validate={[validations.required]}
                              formatGroupLabel={formatvehicleYearLabel}
                            />
                          </div>
                          {/* <div className="col-lg vin-popover">
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
                              hasFloatLabel
                              name="VIN/Frame2"
                              type="text"
                              placeholder={translate(
                                "general.VINInput.placeholder"
                              )}
                              label={translate(
                                "general.VINInput.label"
                              )}
                              errorMessage={`${translate(
                                "general.enter"
                              )} ${translate(
                                "general.VINInput.label"
                              )}`}
                              component={props => {
                              	props.input.onChange= e => {
    	                            this.props.onSelectedVehicleVin(e)
	                                this.setState(() => ({
	                                  vinNum : e
	                                }))
                             	}
                              	return (
                                <RenderField
                                  {...props}
                                  value={this.state.vinNum}
                                />
                              )}}
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
                          </div> */}
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
                      </a>
                    </div>
                    <a href="" className="link" onClick={() =>{
                      this.props.onClearHistory(this.state.selectedVehicles);
                      this.props.onVehicleSelected(false)
                    }
                    }>
                      <i className="icon-clear"></i>
                      {translate('dropdown.garage.clear')}
                    </a>
                  </div>
                </div>
                /*user logged in and have vehicles in garage and history*/
              //   <div className="saved">
              //   <div class="media">
              //     <i className="icon-vehicle"></i>
              //     <div class="media-body">
              //       <h5>{translate('dropdown.garage.userGarage')}</h5>
              //     </div>
              //   </div>
              //   <div className="vehic-list">
              //     <div className="radio-custom" key={key}>
              //       <a  className="row">
              //         <div className="col-auto">
              //           <Radio
              //             checked={this.state.selectedVehicle
              //               .id === vehicle.id}
              //             type="radio"
              //             id={key}
              //             name="radioGroup"
              //           />
              //         </div>
              //         <p className="col">
              //         2016 Ford Focus
              //         <span>VIN(000 000 000 000 11)</span>
              //       </p>
              //       </a>
              //     </div>
              //   </div>
              // </div>
               )}

    
            </div>
          </li>
        </NavLg>
        <li>
          <Link to="/cart">
            <i className="icon-cart" />
            {cart.length > 0 && (
              <span className="notify-num">{cart.length}</span>
            )}
          </Link>
        </li>
      </ul>
    );
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
    customerDetail: state.customer.detail,
    vehicles: state.api.vehicles,
		currentLanguage: getActiveLanguage(state.localize).code,

  };
};

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
    onClearFormDataFromCache: data => dispatch(clearFormDataFromCache(data)),
    onSelectedVehicleVin: value => dispatch(setSelectedVehicleVin(value))
  };
};


HeaderDetails = reduxForm({
  form: "HeaderDetails"
})(HeaderDetails);

const withHeaderDetails = withRouter(HeaderDetails)

export default connect(mapStateToProps, mapDispatchToProps)(withHeaderDetails);

