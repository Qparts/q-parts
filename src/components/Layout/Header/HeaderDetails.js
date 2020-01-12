import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import DropdownItem from "../../UI/Nav/DropdownItem";
import { NavLg } from "../../Device";
import { getTranslate } from "react-localize-redux";
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

class HeaderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: "",
      newNote: "",
      selectedVehicles: props.selectedVehicles,
      isVehicleSelected: props.isVehicleSelected,
      selectedVehicle: props.selectedVehicle,
      modal: false
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

  render() {
    const {
      translate,
      isLoggedIn,
      fullName,
      onSignin,
      cart,
      direction
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
              {(!isLoggedIn || isLoggedIn) &&
              this.state.selectedVehicles.length <= 0 ? (
                <div
                  class="dropdown-menu garage-dropdown"
                  aria-labelledby="garage-dropdown"
                >
                  <div>hello</div>
                </div>
              ) : null}

              {/* user not logged in or logged in and have vehicles in history */}
              {(!isLoggedIn || isLoggedIn) && this.state.selectedVehicles ? (
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
                      <a
                        href="#"
                        onClick={() =>
                          this.props.onClearHistory(this.state.selectedVehicles)
                        }
                      >
                        <i className="icon-clear"></i>
                        {translate("dropdown.garage.clear")}
                      </a>
                    </div>
                    <div className="vehic-list">
                      {this.state.selectedVehicles.map((vehicle, key) => {
                        return (
                          <div className="radio-custom" key={key}>
                            <a href="#" className="row">
                              <div className="col-auto">
                                <Radio
                                   checked={
                                    this.state.selectedVehicle
                                      .id === vehicle.id
                                  }
                                  type="radio"
                                  id="1"
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
                                <a
                                  href="#"
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
                                    href="#"
                                    className="link"
                                    onClick={this.addSelectedVehiclesToGarage}
                                  >
                                    {translate("dropdown.garage.save")}
                                  </a>
                                )}
                              </div>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="vec-list-actions">
                    <div className="main-action">
                      <a className="btn btn-gray">
                        <i className="icon-add-vehicle"></i>
                        {translate("dropdown.garage.addVehicle")}
                      </a>
                    </div>
                  </div>
                </div>
              ) :
                isLoggedIn && this.state.selectedVehicles ? 
              {/*user logged in and have vehicles in garage and history*/}
                 (
                  <div
                  class="dropdown-menu garage-dropdown"
                  aria-labelledby="garage-dropdown"
                >
                  <div className="saved">
                    <div class="media">
                      <i className="icon-vehicle"></i>
                      <div class="media-body">
                        <h5>{translate("dropdown.garage.userGarage")}</h5>
                      </div>
                      <a href="#">
                        <i className="icon-add"></i>
                        {translate("dropdown.garage.addVehicle")}
                      </a>
                    </div>
                    <div className="vehic-list">
                      <div className="radio-custom" key="3">
                        <a href="#" className="row">
                          <div className="col-auto">
                            <Radio
                              checked="true"
                              type="radio"
                              id="3"
                              name="radioGroup"
                            />
                          </div>
                          <p className="col">
                            2016 Ford Focus
                            <span>VIN(000 000 000 000 11)</span>
                          </p>
                          <div className="col-auto vec-actions">
                            <a href="#" className="btn btn-gray">
                              <i className="icon-catalog"></i>
                              {translate("dropdown.garage.catalog")}
                            </a>
                            <a href="#" className="link">
                              <i className="icon-trash"></i>
                            </a>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="cached">
                      <div class="media">
                        <i className="icon-vehicle-history"></i>
                        <div class="media-body">
                          <h5>{translate("dropdown.garage.cached")}</h5>
                        </div>
                        <a
                          href="#"
                          onClick={() =>
                            this.props.onClearHistory(this.state.selectedVehicles)
                          }
                        >
                          <i className="icon-clear"></i>
                          {translate("dropdown.garage.clear")}
                        </a>
                      </div>
                      <div className="vehic-list">
                        {this.state.selectedVehicles.map((vehicle, key) => {
                          console.log(vehicle);
                          return (
                            <div className="radio-custom" key={key}>
                              <a href="#" className="row">
                                <div className="col-auto">
                                  <Radio
                                     checked={
                                      this.state.selectedVehicle
                                        .id === vehicle.id
                                    }
                                    type="radio"
                                    id="1"
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
                                  <a
                                    href="#"
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
                                      href="#"
                                      className="link"
                                      onClick={this.addSelectedVehiclesToGarage}
                                    >
                                      {translate("dropdown.garage.save")}
                                    </a>
                                  )}
                                </div>
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="vec-list-actions">
                      <div className="main-action">
                        <a className="btn btn-gray">
                          <i className="icon-add-vehicle"></i>
                          {translate("dropdown.garage.addVehicle")}
                        </a>
                      </div>
                    </div>
                </div>
                 )
                : null }
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
    customerDetail: state.customer.detail
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderDetails);
