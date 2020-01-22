
/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// import DropdownItem from "../../UI/Nav/DropdownItem"; 
// import { NavLg } from "../../Device";
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
} from "../../actions/apiAction";
import { clearFormDataFromCache } from "../../actions/baseFormAction";
import Radio from "../UI/Radio";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Title from "../../components/UI/Title";
import Login from "../../containers/Authentication/Login/Login";
import axios from "axios";
import * as validations from "../../utils";
import {
  DownLargeScreen,
  LargeScreen,
  MediumScreen
} from "../../components/Device";
import { Field  , reduxForm} from "redux-form";
import SelectInput from "../../components/SelectInput/SelectInput";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { getTranslatedObject } from "../../utils";
import RenderField from "../../components/RenderField/RenderField";
import { withRouter } from "react-router-dom";
// import { InputField } from "./inputField";





class ChangeVehicleModal extends Component {
    constructor(props){
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
        }
    }

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
    
  render(){
     const {translate , direction , vehicles , currentLanguage}=this.props;
      
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
  
  
  
      return(
           <div>
                {this.props.isVehicleSelected ? (
                    <Fragment>
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
                            </div>
                          </MediumScreen>
                        </div>
                        <form className="gray-input vin-input">
                          <Field
                            onChange={e =>
                              this.setState(() => ({
                                vinInput: e.target.value
                              }))
                            }
                            hasFloatLabel
                            name="VIN/Frame"
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
                            component={props => (
                              <RenderField
                                {...props}
                                value={this.state.vinInput}
                              />
                            )}
                            // validate={[validations.required]}
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
                    </Fragment>
                  ) 
                  
                  : (
                    <Fragment>
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
                              onChange={e =>
                                this.setState(() => ({
                                  vinInput: e.target.value
                                }))
                              }
                              ref={this.vinFieldRef}
                              value={this.state.vinInput}
                              hasFloatLabel
                              name="VIN/Frame"
                              type="text"
                              placeholder={translate(
                                "general.VINInput.placeholder"
                              )}
                              label={translate("general.VINInput.label")}
                              errorMessage={`${translate(
                                "general.enter"
                              )} ${translate("general.VINInput.label")}`}
                              component={props => (
                                <RenderField
                                  {...props}
                                  value={this.state.vinInput}
                                />
                              )}
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
                    </Fragment>
                  )}
           </div>
      )
  }
}


const mapStateToProps = state => {
  console.log(state);
  
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


ChangeVehicleModal = reduxForm({
  form: "HeaderDetails"
})(ChangeVehicleModal);

const withChangeVehicleModal = withRouter(ChangeVehicleModal)

export default connect(mapStateToProps, mapDispatchToProps)(withChangeVehicleModal);

