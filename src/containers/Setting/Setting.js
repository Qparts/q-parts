import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate, getActiveLanguage } from "react-localize-redux";

import Profile from '../../components/Profile/Profile';
import SettingLinks from '../../components/SettingLinks/SettingLinks';
import {
  loadCurrentUser, editName, editPhoneNo, editEmail, editPassword,
  confirmUserAddress, socialMediaButton, addAddress, clearAddress,
  deleteVehicle, moveWishlistToCart, deleteWishlist, getPendingRequests,
  getCompletedRequests, changeDefaultAddress, changeDefaultVehicle,
  incrementQuantity, decrementQuantity
} from '../../actions/customerAction';
import { getCountry, findCity, getRegions } from '../../actions/apiAction';
import { addToCart } from '../../actions/cartAction';
import ResetPassword from '../../components/ResetPassword/ResetPassword';
import EditInfo from '../../components/EditInfo/EditInfo';
import Addresses from '../../components/Addresses/Addresses';
import Address from '../../components/Addresses/Address/Address';
import PrivateRoute from '../../components/PrivateRoute';
import SocialMediaLink from '../../components/SocialMediaLink/SocialMediaLink';
import Quotations from '../../components/Quotations/Quotations';
import WithSocialMedia from '../../hoc/WithSocialMedia';
import { getConnectedPlatforms, getComponentName } from '../../utils/components';
import { ON_SOCIAL_MEDIA_LINK, TAB_ONE } from '../../constants';
import Orders from '../../components/Orders/Orders';
import Order from '../../components/Order/Order';
import HelpCenter from '../../components/HelpCenter/HelpCenter';
import Garage from '../../components/Garage/Garage';
import Vehicles from '../../components/Vehicles/Vehicles';
import Wishlist from '../../components/Wishlist/Wishlist';
import Payment from '../../components/Payment/Payment';
import PaymentPopup from '../../components/Payment/PaymentPopup';
import Footer from '../../components/Layout/Footer/Footer';

import {
  match
} from '../../utils';
import _ from 'lodash';

import SectionHeader from '../../components/UI/SectionHeader';
import {
  quotations, orders, helpCenter, wishlist, garage, accountSetting, addressBook, socialMedia, payment
} from '../../constants';
//Modal
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Title from '../../components/UI/Title';
//whatsapp

import { getFormValues } from 'redux-form';

import { LargeScreen , DownLargeScreen} from '../../components/Device/index.js'
import Sidebar from "react-sidebar";
const name = 'name';
const phone = 'phone';
const email = 'email';
const password = 'password';
const garage_pupop = 'garage';
const payment_pupop = 'payment';
const addresses_popup = 'addresses'
// const vehicle = 'vehicle';


class Setting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      dialogType: '',
      showGoogleMap: false,
      cityFound: false,
      AddAdressType: "",
      defaultAddress: null,
      newOrOldVechile: TAB_ONE,
      sectionHeader: '',
      modal: false,
      sidebarOpen: false,
    }

  }

  componentDidMount = () => {
    this.getSectionHeader(this.props.location.pathname);
  }


  componentDidUpdate(prevProps, prevState) {
    const { location: { pathname } } = this.props;
    const prevPathname = prevProps.location.pathname;
    if (pathname !== prevPathname) {
      this.getSectionHeader(pathname)
    }
  }

  renderField = ({ label, type, placeholder, input, meta: { touched, error } }) => {

    return (
      <div>
        <label htmlFor={label}></label>
        <input
          type={type}
          placeholder={placeholder}
          {...input} />
        {touched && error}
      </div>
    );
  }

  onHide = () => {
    this.setState({ visible: false, cityFound: false, showGoogleMap: false, defaultAddress: null, newOrOldVechile: TAB_ONE });

    this.props.clearAddress();
    this.togglePopup();
  }

  onConfirmDialog = (values) => {
    this.onHide();
  }

  onEdit = (type, values) => {
    const { currentLanguage } = this.props.currentLanguage;
    return match(type)
      .on(type => type === name, () => this.props.editName({ firstName: values.firstName, lastName: values.lastName, defaultLang: values.defaultLang ? values.defaultLang.value : currentLanguage }))
      .on(type => type === phone, () => this.props.editPhoneNo(type, values.mobile))
      .on(type => type === email, () => this.props.editEmail({ newEmail: values.email }, email, currentLanguage))
      .on(type => type === password, () => (
        this.props.editPassword({ oldPassword: values.oldPassword, newPassword: values.newPassword }, password, currentLanguage)
          .then(() => (
            this.togglePopup()
          ))
      ))
      .otherwise(type => type)
  }

  onSaveNewAddress = values => {
    const { line1, line2, zipCode, title, mobile, city, defaultAddress } = values;
    const latitude = city.latitude;
    const longitude = city.longitude;
    const cityId = city.id;
    this.props.addAddress({ line1, line2, cityId, zipCode, title, latitude, longitude, mobile, defaultAddress: _.isUndefined(defaultAddress) ? false : defaultAddress })
      .then(() => {
        this.onHide();
      });
  }

  handleShowDialog = (type, event) => {
    event.preventDefault();

    this.setState({ modal: !this.state.modal, dialogType: type });
  }

  handleShowGoogleMap = () => {
    this.setState({
      showGoogleMap: !this.state.showGoogleMap,
    })
  }

  handleCityFound = (bool) => {
    this.setState({
      cityFound: bool,
    })
  }

  handleChangeDefaultAddress = e => {
    this.setState({ defaultAddress: e.value })
  }

  handleChange = (value) => {
    this.setState({
      newOrOldVechile: value
    })
  };

  handleDeleteVehicle = (vehicle, event) => {
    event.preventDefault();
    this.props.deleteVehicle(vehicle);
  }

  handleEditAddress = (address, event) => {
    event.preventDefault();
    // this.props.confirmUserAddress(address);
    this.handleShowDialog.bind(this, null);
  }

  getSectionHeader = (pathname) => {
    const pathnameSplit = pathname.split('/');
    const sectionHeader = pathnameSplit[pathnameSplit.length - 1];
    const { translate } = this.props;

    switch (sectionHeader) {
      case quotations:
        return this.setState({ sectionHeader: translate(`setting.links.${quotations}`) });

      case orders:
        return this.setState({ sectionHeader: translate(`setting.links.${orders}`) });

      case 'help_center':
        return this.setState({ sectionHeader: translate(`setting.links.${helpCenter}`) });

      case 'wishlist':
        return this.setState({ sectionHeader: translate(`setting.links.${wishlist}`) });

      case garage:
        return this.setState({ sectionHeader: translate(`setting.links.${garage}`) });

      case 'profile':
        return this.setState({ sectionHeader: translate(`setting.links.${accountSetting}`) });

      case 'addresses':
        return this.setState({ sectionHeader: translate(`setting.links.${addressBook}`) });

      case 'connect':
        return this.setState({ sectionHeader: translate(`setting.links.${socialMedia}`) });

      case 'payment':
        return this.setState({ sectionHeader: payment });

      default:
        break;
    }
  }
  togglePopup = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  getDialogProps = () => {
    const { dialogType } = this.state;
    const { translate } = this.props;

    switch (dialogType) {
      case 'password':
        return {
          header: <Title
            header={translate("dialog.updatePassword.title")} />
        }
      case 'email':
        return {
          header: <Title
            header={translate("dialog.updateEmail.title")} />
        }
      case 'garage':
        return {
          header: <Title
            header={translate("dialog.vehicle.title")}
            subHeader={translate("dialog.vehicle.subTitle")} />
        }
      case 'payment':
        return {
          header: <Title
            header="Ad Credit Card"
            subHeader={"Secure Credit Card Payment"} />
        }
      case 'addresses':
        return {
          header: <Title
            header={translate("dialog.address.title")}
            subHeader={translate("setting.addressBook.shippingItem")} />
        }
      default:
        break;
    }
  }
  handleDialog = (dialogType) => {
    this.setState({ dialogType });
    this.togglePopup();
  };

  openSidebar = () => {
    this.setState({ sidebarOpen: !this.state.sidebarOpen })
  }
  onSetSidebarOpen = async (open) => {
		await this.setState({
			sidebarOpen: open,
		});
	}

  render() {
      console.log(this.state.sidebarOpen)
    const { translate, direction } = this.props;
    let dialog;

    if (this.state.dialogType === email) {
      dialog = <Modal dir={direction} contentClassName="container-fluid" className="password-popup" isOpen={this.state.modal} toggle={this.togglePopup} >
        <ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
        <ModalBody>
          <EditInfo
            name={"email"}
            type="text"
            placeholder={translate("dialog.updateEmail.placeholder")}
            onHide={this.onHide}
            cancel={translate("dialog.updateEmail.cancel")}
            update={translate("dialog.updateEmail.update")}
            onSubmit={this.onEdit.bind(this, email)}
          />
        </ModalBody>
      </Modal>
    } else if (this.state.dialogType === password) {
      dialog = <Modal dir={direction} className="setting-popup" isOpen={this.state.modal} toggle={this.togglePopup} >
        <ModalHeader toggle={this.togglePopup} className="have-icon">
          <p><i className="icon-change-password"></i>Change</p> Password
        </ModalHeader>
        <ModalBody>
          <ResetPassword
            translate={translate}
            showPhoneNo={false}
            toggle={this.togglePopup}
            onSubmit={this.onEdit.bind(this, password)}
            direction={this.props.direction}
          />
        </ModalBody>
      </Modal>
    }

    let addressDialog;
    if (this.state.dialogType === addresses_popup) {
      addressDialog = <Modal dir={direction} contentClassName="container-fluid" className="setting-popup" isOpen={this.state.modal} toggle={this.togglePopup} >
        <ModalHeader toggle={this.togglePopup} className="have-icon">
              <p><i className="icon-add-location"></i>Shipping</p> Address
        </ModalHeader>
        <ModalBody>
          <span className="sub-header">{translate("setting.addressBook.shippingItem")}</span>
          <Address
            currentLanguage={this.props.currentLanguage}
            address={this.props.address}
            customer={this.props.customer}
            getRegions={this.props.getRegions}
            getCountry={this.props.getCountry}
            regions={this.props.regions}
            country={this.props.country}
            confirmUserAddress={this.props.confirmUserAddress}
            onSubmit={this.onSaveNewAddress}
            onShowGoogleMap={this.handleShowGoogleMap}
            onCityFound={this.handleCityFound}
            showGoogleMap={this.state.showGoogleMap}
            cityFound={this.state.cityFound}
            city={this.props.city}
            findCity={this.props.findCity}
            translate={this.props.translate}
            onHide={this.onHide}
            defaultAddress={this.state.defaultAddress}
            onDefaultAddress={this.handleChangeDefaultAddress}
            formValues={this.props.formValues}
          />

        </ModalBody>
      </Modal>
    }

    let garageDialog;
    if (this.state.dialogType === garage_pupop)
      garageDialog = <Modal dir={direction}  className="setting-popup" isOpen={this.state.modal} toggle={this.togglePopup} >
        <ModalHeader toggle={this.togglePopup} className="have-icon">
              <p><i className="icon-add-vehicle"></i>{translate("dialog.vehicle.add")}</p> {translate("dialog.vehicle.vehicle")}
        </ModalHeader>
        <ModalBody>
          <span className="sub-header">{translate("dialog.vehicle.subTitle")}</span>
          <Vehicles
            toggle={this.togglePopup}
            direction={this.props.direction}
            defaultLang={this.props.currentLanguage}
          />

        </ModalBody>
      </Modal>

    let paymentDialog;
    if (this.state.dialogType === payment_pupop)
      paymentDialog = <Modal dir={direction} contentClassName="container-fluid" className="payment-popup" isOpen={this.state.modal} toggle={this.togglePopup} >
        <ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
        <ModalBody>
          <PaymentPopup
            onTabChange={this.handleChange}
            toggle={this.togglePopup}
            displayTwoTabs={false}
            direction={this.props.direction}
          />
        </ModalBody>
      </Modal>



    return (
      <Fragment>
          <SectionHeader className="profile-header" text={`${this.props.customer.firstName} ${this.props.customer.lastName}`} translate={translate} />
          <section className="user-main">
            <div className="container-fluid">
                <LargeScreen>
                  <div className="row">
                    <div className="col-lg-9 offset-lg-3">
                      <div className="dashboard">
                          <span className="bg"></span>
                          <ul className="list-unstyled">
                            <li className="col">
                              <a href="#" class="media">
                                <img className="request-tab" src="/img/request.svg" alt="request" />
                                <div class="media-body">
                                  <h5>{translate('setting.request')}</h5>
                                  {this.props.requests.length}
                                </div>
                              </a>
                            </li>
                            <li className="col">
                              <a href="#" class="media">
                                <img className="order-tab" src="/img/orders-UP.svg" alt="Orders" />
                                <div class="media-body">
                                  <h5>Orders</h5>
                                  {this.props.requests.length}
                                </div>
                              </a>
                            </li>
                            <li className="col">
                              <a href="#" class="media">
                                <img className="wish-list-tab" src="/img/wish-list-UP.svg" alt="Wish List" />
                                <div class="media-body">
                                  <h5>{translate('setting.links.wishlist')}</h5>
                                  {this.props.wishlist.length}
                                </div>
                              </a>
                            </li>
                            <li className="col">
                              <a href="#" class="media">
                                <img className="garage-tab" src="/img/garage-UP.svg" alt="Garage" />
                                <div class="media-body">
                                  <h5>{translate('setting.links.garage')}</h5>
                                  {this.props.vehicles.length}<label>{translate('setting.vehicle')}</label>
                              </div>
                            </a>
                          </li>
                          </ul>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <SettingLinks onSetSidebarOpen={this.onSetSidebarOpen} {...this.props} />
                    <div className="setting-tab-content col-lg-9">
                      <Switch>
                      <Route path="/setting/profile" exact={true} render={({ match }) => {
                        return (
                          <Fragment>
                            <Profile
                              customer={this.props.customer}
                              title="Personal customer"
                              name="name"
                              email="email"
                              password="password"
                              onShowEditDialog={this.handleDialog}
                              onSubmit={this.onEdit.bind(this, name)}
                              direction={this.props.direction}
                              {...this.props} />
                            {dialog}
                          </Fragment>
                        )
                      }} />
                      <Route path="/setting/quotations" exact={true} render={() => {
                        return (
                          <Fragment>
                            <Quotations
                                getPendingRequests={this.props.getPendingRequests}
                                getCompletedRequests={this.props.getCompletedRequests}
                                customer={this.props.customer}
                                quotations={this.props.quotations}
                                translate={this.props.translate}
                                direction={this.props.direction}
                                addToCart={this.props.addToCart}
                                currentLanguage={this.props.currentLanguage}
                                incrementQuantity={this.props.incrementQuantity}
                                decrementQuantity={this.props.decrementQuantity}
                                token={this.props.token} />
                          </Fragment>
                        )
                      }} />
                      <Route path="/setting/connect" exact={true} render={({ match }) => {
                        return (
                          <Fragment>
                            <SocialMediaLink
                              connectedPlatforms={this.props.connectedPlatforms}
                              handleResponse={this.props.handleResponse}
                              handleFailure={this.props.handleFailure} />
                          </Fragment>
                        )
                      }} />
                      <Route path="/setting/addresses" exact={true} render={() => {
                        return (
                          <Fragment>
                            <Addresses
                              customer={this.props.customer}
                              onShowEditDialog={this.handleDialog}
                              onEditAddress={this.handleEditAddress}
                              translate={this.props.translate}
                              addresses={this.props.addresses}
                              changeDefaultAddress={this.props.changeDefaultAddress} />
                            {addressDialog}
                          </Fragment>
                        )
                      }} />
                      <Route path="/setting/orders/" exact={true} render={() => {
                        return (
                          <Orders translate={this.props.translate} />
                        )
                      }} />
                      <Route path="/setting/orders/:orderId" exact={true} render={() => {
                        return (
                          <Order translate={this.props.translate} checkout={this.props.checkout} />
                        )
                      }} />
                      <Route path="/setting/help_center" exact={true} render={() => {
                        return (
                          <HelpCenter translate={this.props.translate} />
                        )
                      }} />
                      <Route path="/setting/garage" exact={true} render={() => {
                        return (
                          <Fragment>
                            <Garage
                              vehicles={this.props.vehicles}
                              onShowVehicleDialog={this.handleShowDialog}
                              onDeleteVehicle={this.handleDeleteVehicle}
                              changeDefaultVehicle={this.props.changeDefaultVehicle}
                              translate={this.props.translate}
                              defaultLang={this.props.defaultLang} />
                            {garageDialog}
                          </Fragment>
                        )
                      }} />
                      <Route path="/setting/wishlist" exact={true} render={() => {
                        return (
                          <Wishlist
                            currentLanguage={this.props.currentLanguage}
                            direction={this.props.direction}
                            wishlist={this.props.wishlist}
                            deleteWishlist={this.props.deleteWishlist}
                            moveWishlistToCart={this.props.moveWishlistToCart}
                            translate={this.props.translate} />
                        )
                      }} />
                      <Route path="/setting/payment/" exact={true} render={() => {
                        return (
                          <Fragment>
                            <Payment
                              translate={this.props.translate}
                              onShowEditDialog={this.handleDialog}
                            />
                            {paymentDialog}
                          </Fragment>
                        )
                      }} />
                      <PrivateRoute
                        path="/setting/profile/phone"
                        component={EditInfo}
                        labels={["Confirmation number", "Phone number"]}
                        names={["confirmationNo", "mobile"]}
                        name=""
                        type="text"
                        placeholder={["Confirmation number", "Your phone number"]}
                        renderField={this.renderField}
                        onSubmit={this.onEdit.bind(this, phone)}
                        redirectTo="/setting/profile" />
                    </Switch>
                    </div>
                  </div>
                </LargeScreen>
                <DownLargeScreen>
                  <Sidebar
                    sidebarClassName="sidebar"
                    contentClassName="content-sidebar"
                    overlayClassName="sidebar-overlay"
                    sidebar={
                      <Fragment>
                        <SettingLinks {...this.props} />
                      </Fragment>
                    }
                    children={
                      <Fragment>
                        <div className="setting-tab-content col-lg-9">
                          <div className="sign-out">
                            <button className="btn more" onClick={() => this.openSidebar()}><i className="icon-more"></i></button>
                          </div>
                          <Switch>
                            <Route path="/setting/profile" exact={true} render={({ match }) => {
                              return (
                                <Fragment>
                                  <Profile
                                    customer={this.props.customer}
                                    title="Personal customer"
                                    name="name"
                                    email="email"
                                    password="password"
                                    onShowEditDialog={this.handleDialog}
                                    onSubmit={this.onEdit.bind(this, name)}
                                    direction={this.props.direction}
                                    {...this.props} />
                                  {dialog}
                                </Fragment>
                              )
                            }} />
                            <Route path="/setting/quotations" exact={true} render={() => {
                              return (
                                <Fragment>
                                  <Quotations
                                      getPendingRequests={this.props.getPendingRequests}
                                      getCompletedRequests={this.props.getCompletedRequests}
                                      customer={this.props.customer}
                                      quotations={this.props.quotations}
                                      translate={this.props.translate}
                                      direction={this.props.direction}
                                      addToCart={this.props.addToCart}
                                      currentLanguage={this.props.currentLanguage}
                                      incrementQuantity={this.props.incrementQuantity}
                                      decrementQuantity={this.props.decrementQuantity}
                                      token={this.props.token} />
                                </Fragment>
                              )
                            }} />
                            <Route path="/setting/connect" exact={true} render={({ match }) => {
                              return (
                                <Fragment>
                                  <SocialMediaLink
                                    connectedPlatforms={this.props.connectedPlatforms}
                                    handleResponse={this.props.handleResponse}
                                    handleFailure={this.props.handleFailure} />
                                </Fragment>
                              )
                            }} />
                            <Route path="/setting/addresses" exact={true} render={() => {
                              return (
                                <Fragment>
                                  <Addresses
                                    customer={this.props.customer}
                                    onShowEditDialog={this.handleDialog}
                                    onEditAddress={this.handleEditAddress}
                                    translate={this.props.translate}
                                    addresses={this.props.addresses}
                                    changeDefaultAddress={this.props.changeDefaultAddress} />
                                  {addressDialog}
                                </Fragment>
                              )
                            }} />
                            <Route path="/setting/orders/" exact={true} render={() => {
                              return (
                                <Orders translate={this.props.translate} />
                              )
                            }} />
                            <Route path="/setting/orders/:orderId" exact={true} render={() => {
                              return (
                                <Order translate={this.props.translate} checkout={this.props.checkout} />
                              )
                            }} />
                            <Route path="/setting/help_center" exact={true} render={() => {
                              return (
                                <HelpCenter translate={this.props.translate} />
                              )
                            }} />
                            <Route path="/setting/garage" exact={true} render={() => {
                              return (
                                <Fragment>
                                  <Garage
                                    vehicles={this.props.vehicles}
                                    onShowVehicleDialog={this.handleShowDialog}
                                    onDeleteVehicle={this.handleDeleteVehicle}
                                    changeDefaultVehicle={this.props.changeDefaultVehicle}
                                    translate={this.props.translate} />
                                  {garageDialog}
                                </Fragment>
                              )
                            }} />
                            <Route path="/setting/wishlist" exact={true} render={() => {
                              return (
                                <Wishlist
                                  currentLanguage={this.props.currentLanguage}
                                  direction={this.props.direction}
                                  wishlist={this.props.wishlist}
                                  deleteWishlist={this.props.deleteWishlist}
                                  moveWishlistToCart={this.props.moveWishlistToCart}
                                  translate={this.props.translate} />
                              )
                            }} />
                            <Route path="/setting/payment/" exact={true} render={() => {
                              return (
                                <Fragment>
                                  <Payment
                                    translate={this.props.translate}
                                    onShowEditDialog={this.handleDialog}
                                  />
                                  {paymentDialog}
                                </Fragment>
                              )
                            }} />
                            <PrivateRoute
                            path="/setting/profile/phone"
                            component={EditInfo}
                            labels={["Confirmation number", "Phone number"]}
                            names={["confirmationNo", "mobile"]}
                            name=""
                            type="text"
                            placeholder={["Confirmation number", "Your phone number"]}
                            renderField={this.renderField}
                            onSubmit={this.onEdit.bind(this, phone)}
                            redirectTo="/setting/profile" />
                          </Switch>
                        </div>
                        <Footer translate={translate} />
                      </Fragment>
                    }
                    open={this.state.sidebarOpen}
        						onClick={this.handleClick}
        						onSetOpen={this.onSetSidebarOpen}
        						contentId="contentId"
        						pullRight={true}
                    >
                  </Sidebar>

                </DownLargeScreen>

            </div>
          </section>
        {/*<SmallScreen>
          <section id="setting-mobile">
            <SectionHeader text={`${this.props.customer.firstName} ${this.props.customer.lastName}`} translate={translate} />
            <Switch>
              <Route path="/setting/profile" exact={true} render={({ match }) => {
                return (
                  <Fragment>
                    <Profile
                      customer={this.props.customer}
                      title="Personal customer"
                      name="name"
                      email="email"
                      password="password"
                      onShowEditDialog={this.handleDialog}
                      onSubmit={this.onEdit.bind(this, name)}
                      direction={this.props.direction}
                      {...this.props} />
                    {dialog}
                  </Fragment>
                )
              }} />

              <Route path="/setting/quotations" exact={true} render={() => {
                return (
                  <Fragment>
                    <Quotations
                      getPendingRequests={this.props.getPendingRequests}
                      getCompletedRequests={this.props.getCompletedRequests}
                      customer={this.props.customer}
                      quotations={this.props.quotations}
                      translate={this.props.translate}
                      direction={this.props.direction}
                      addToCart={this.props.addToCart}
                      currentLanguage={this.props.currentLanguage}
                      incrementQuantity={this.props.incrementQuantity}
                      decrementQuantity={this.props.decrementQuantity}
                      token={this.props.token} />
                  </Fragment>
                )
              }} />

              <Route path="/setting/connect" exact={true} render={({ match }) => {
                return (
                  <Fragment>
                    <SocialMediaLink
                      connectedPlatforms={this.props.connectedPlatforms}
                      handleResponse={this.props.handleResponse}
                      handleFailure={this.props.handleFailure} />
                  </Fragment>
                )
              }} />
              <Route path="/setting/addresses" exact={true} render={() => {
                return (
                  <Fragment>
                    <Addresses
                      customer={this.props.customer}
                      onShowEditDialog={this.handleDialog}
                      onEditAddress={this.handleEditAddress}
                      translate={this.props.translate}
                      addresses={this.props.addresses}
                      changeDefaultAddress={this.props.changeDefaultAddress} />
                    {addressDialog}
                  </Fragment>
                )
              }} />
              <Route path="/setting/orders/" exact={true} render={() => {
                return (
                  <Orders translate={this.props.translate} />
                )
              }} />

              <Route path="/setting/orders/:orderId" exact={true} render={() => {
                return (
                  <Order translate={this.props.translate} checkout={this.props.checkout} />
                )
              }} />
              <Route path="/setting/help_center" exact={true} render={() => {
                return (
                  <HelpCenter translate={this.props.translate} />
                )
              }} />
              <Route path="/setting/garage" exact={true} render={() => {
                return (
                  <Fragment>
                    <Garage
                      vehicles={this.props.vehicles}
                      onShowVehicleDialog={this.handleShowDialog}
                      onDeleteVehicle={this.handleDeleteVehicle}
                      translate={this.props.translate}
                      changeDefaultVehicle={this.props.changeDefaultVehicle} />
                    {garageDialog}
                  </Fragment>
                )
              }} />
              <Route path="/setting/wishlist" exact={true} render={() => {
                return (
                  <Wishlist
                    currentLanguage={this.props.currentLanguage}
                    direction={this.props.direction}
                    wishlist={this.props.wishlist}
                    deleteWishlist={this.props.deleteWishlist}
                    moveWishlistToCart={this.props.moveWishlistToCart}
                    translate={this.props.translate} />
                )
              }} />
              <Route path="/setting/payment/" exact={true} render={() => {
                return (
                  <Fragment>
                    <Payment
                      translate={this.props.translate}
                      onShowEditDialog={this.handleDialog}
                    />
                    {paymentDialog}
                  </Fragment>
                )
              }} />
              <PrivateRoute
                path="/setting/profile/phone"
                component={EditInfo}
                labels={["Confirmation number", "Phone number"]}
                names={["confirmationNo", "mobile"]}
                name=""
                type="text"
                placeholder={["Confirmation number", "Your phone number"]}
                renderField={this.renderField}
                onSubmit={this.onEdit.bind(this, phone)}
                redirectTo="/setting/profile" />

            </Switch>
          </section>
        </SmallScreen>*/}
      </Fragment>
    );
  }
}

Setting.propTypes = {
  customer: propTypes.shape({
    firstName: propTypes.string,
    lastName: propTypes.string,
    mobile: propTypes.string,
    email: propTypes.string,
    password: propTypes.any,
    addresses: propTypes.arrayOf(propTypes.shape({
      addressId: propTypes.number,
      customerId: propTypes.number,
      line1: propTypes.string,
      line2: propTypes.string,
      cityId: propTypes.number,
      zipCode: propTypes.string,
      title: propTypes.string,
      latitude: propTypes.number,
      longitude: propTypes.number,
    }))
  })
}

const mapStateToProps = (state) => {
  const customer = state.customer.detail;
  return {
    customer,
    quotations: state.customer.quotations,
    address: state.customer.address,
    regions: state.api.regions,
    country: state.api.country,
    vehicles: customer.vehicles,
    token: state.customer.token,
    city: state.api.city,
    translate: getTranslate(state.localize),
    connectedPlatforms: getConnectedPlatforms(customer.socialMedia),
    component: getComponentName(ON_SOCIAL_MEDIA_LINK),
    currentLanguage: getActiveLanguage(state.localize).code,
    selectedCountry: state.customer.selectedCountry,
    checkout: state.cart.checkout,
    wishlist: state.customer.wishlist,
    addresses: state.customer.detail.addresses,
    direction: state.customer.direction,
    requests: state.customer.quotations.pending,
    requestCompleted: state.customer.quotations.completed,
    formValues: getFormValues('Setting')(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    loadCurrentUser,
    editName,
    editPhoneNo,
    editEmail,
    editPassword,
    confirmUserAddress,
    getRegions,
    getCountry,
    findCity,
    socialMediaButton,
    addAddress,
    clearAddress,
    deleteVehicle,
    addToCart,
    moveWishlistToCart,
    deleteWishlist,
    incrementQuantity,
    decrementQuantity,
    getPendingRequests,
    getCompletedRequests,
    changeDefaultAddress,
    changeDefaultVehicle
  }, dispatch)
}

const WithSetting = WithSocialMedia(Setting);
export default connect(mapStateToProps, mapDispatchToProps)(WithSetting);
