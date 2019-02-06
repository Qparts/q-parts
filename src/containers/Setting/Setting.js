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
  deleteVehicle, moveWishlistToCart, deleteWishlist, getPendingRequests, getCompletedRequests
} from '../../actions/customerAction';
import { getCountry, findCity, getRegions } from '../../actions/apiAction';
import { addToCart, decrementQuantity, incrementQuantity } from '../../actions/cartAction';
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
import SideBar from '../../components/SideBar/SideBar';
import {
  match
} from '../../utils';

import SectionHeader from '../../components/UI/SectionHeader';
import {
  quotations, orders, helpCenter, wishlist, garage, accountSetting, addressBook, socialMedia, payment
} from '../../constants';
//Modal
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Title from '../../components/UI/Title';
//whatsapp
import CustomerService from '../../components/CustomerService/CustomerService';
import { SmallScreen, MediumScreen } from '../../components/Device/index.js'

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
      modal: false
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
    const { line1, line2, zipCode, title, mobile, city } = values;
    const latitude = city.latitude;
    const longitude = city.longitude;
    const cityId = city.id;
    this.props.addAddress({ line1, line2, cityId, zipCode, title, latitude, longitude, mobile })
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
            subHeader={"Store vehicles in your garage and Get product recommendations"} />
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
  render() {
    const { translate } = this.props;
    let dialog;

    if (this.state.dialogType === email) {
      dialog = <Modal contentClassName="container-fluid" className="password-popup" isOpen={this.state.modal} toggle={this.togglePopup} >
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
      dialog = <Modal contentClassName="container-fluid" className="password-popup" isOpen={this.state.modal} toggle={this.togglePopup} >
        <ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
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
      addressDialog = <Modal contentClassName="container-fluid" className="addresses-popup" isOpen={this.state.modal} toggle={this.togglePopup} >
        <ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
        <ModalBody>
          <Address
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
          />

        </ModalBody>
      </Modal>
    }

    let garageDialog;
    if (this.state.dialogType === garage_pupop)
      garageDialog = <Modal contentClassName="container-fluid" className="garage-popup" isOpen={this.state.modal} toggle={this.togglePopup} >
        <ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
        <ModalBody>
          <Vehicles
            newOrOldVechile={this.state.newOrOldVechile}
            onTabChange={this.handleChange}
            toggle={this.togglePopup}
            displayTwoTabs={false}
            direction={this.props.direction}
          />
        </ModalBody>
      </Modal>

    let paymentDialog;
    if (this.state.dialogType === payment_pupop)
      paymentDialog = <Modal contentClassName="container-fluid" className="payment-popup" isOpen={this.state.modal} toggle={this.togglePopup} >
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
        <MediumScreen>
          <section id="setting">
            <SectionHeader text={`${this.props.customer.firstName} ${this.props.customer.lastName}`} translate={translate} />
            <div className="header-settings row">
              <div>
                <i>
                  <img className="request" src="/img/request.svg" alt="request" />
                  <div>
                    <p>{translate('setting.request')}</p>
                    <h1>8</h1>
                  </div>
                </i>
                <i>
                  <img className="orders" src="/img/request.svg" alt="oreder" />
                  <div>
                    <p>{translate('setting.links.orders')}</p>
                    <h1>3</h1>
                  </div>
                </i>
                <i>
                  <img className="wishList" src="/img/request.svg" alt="wishList" />
                  <div>
                    <p>{translate('setting.links.wishlist')}</p>
                    <h1>1</h1>
                  </div>
                </i>
                <i>
                  <img className="garage" src="/img/request.svg" alt="garage" />
                  <div>
                    <p>{translate('setting.links.garage')}</p>
                    <h1>2<p>{translate('setting.vehicle')}</p></h1>
                  </div>
                </i>
              </div>
            </div>
            <div className="component-background">
              <section id="setting-details" className="container-fluid">
                <div className="wahtsapp-before-links">
                  <a className="bg-whatsapp">
                    <CustomerService
                      messages={["Have a Question?", "Ask a Specialis, In-House Experts."]}
                      url="" />
                  </a>
                </div>
                <div className="row">
                  <SettingLinks {...this.props} />
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
                            addToCart={this.props.addToCart} />
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
                            addresses={this.props.addresses} />
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
                            vehiclesFormat={this.props.vehiclesFormat}
                            onShowVehicleDialog={this.handleShowDialog}
                            onDeleteVehicle={this.handleDeleteVehicle}
                            translate={this.props.translate} />
                          {garageDialog}
                        </Fragment>
                      )
                    }} />
                    <Route path="/setting/wishlist" exact={true} render={() => {
                      return (
                        <Wishlist
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
                <div className="row">
                  <a className="bg-whatsapp">
                    <CustomerService
                      messages={["Have a Question?", "Ask a Special"]}
                      url="" />
                  </a>
                </div>
              </section>
            </div>
          </section>
        </MediumScreen>
        <SmallScreen>
          <section id="setting-mobile">
            <SectionHeader text={`${this.props.customer.firstName} ${this.props.customer.lastName}`} translate={translate} />
            <SideBar sidebarDocked={true} />
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
                      addToCart={this.props.addToCart} />
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
                      addresses={this.props.addresses} />
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
                      vehiclesFormat={this.props.vehiclesFormat}
                      onShowVehicleDialog={this.handleShowDialog}
                      onDeleteVehicle={this.handleDeleteVehicle}
                      translate={this.props.translate} />
                    {garageDialog}
                  </Fragment>
                )
              }} />
              <Route path="/setting/wishlist" exact={true} render={() => {
                return (
                  <Wishlist
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
        </SmallScreen>
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
    vehicles: state.api.vehicles,
    city: state.api.city,
    translate: getTranslate(state.localize),
    connectedPlatforms: getConnectedPlatforms(customer.socialMedia),
    component: getComponentName(ON_SOCIAL_MEDIA_LINK),
    currentLanguage: getActiveLanguage(state.localize).code,
    selectedCountry: state.customer.selectedCountry,
    checkout: state.cart.checkout,
    vehiclesFormat: state.customer.vehiclesFormat,
    wishlist: state.customer.wishlist,
    addresses: state.customer.detail.addresses,
    direction: state.customer.direction
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
    getCompletedRequests
  }, dispatch)
}

const WithSetting = WithSocialMedia(Setting);
export default connect(mapStateToProps, mapDispatchToProps)(WithSetting);
