import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Vehicles from "../Vehicles/Vehicles";
import Search from "../Search/Search";
import Login from "../../containers/Authentication/Login/Login";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer";
import MobileHeader from "./MobileHeader/MobileHeader";
import MobileFooter from "./Footer/MobileFooter";
import { TAB_ONE, styles, colors } from "../../constants";
import { isEmpty } from "../../utils";

import Title from '../UI/Title';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogType: 'signin'
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.vehicles !== this.props.vehicles && this.state.visible) {
    //   this.onHide();
    // }
    if (this.props.isLoggedIn && prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.props.togglePopup();
    }
  }

  handleDialog = (dialogType) => {
    this.setState({ dialogType });
    this.props.togglePopup();
  };

  handleChange = (event, value) => {
    this.setState({
      newOrOldVechile: value
    });
  };

  getDialogProps = () => {
    const { dialogType } = this.state;
    const { translate } = this.props;

    switch (dialogType) {
      case 'vehicle':
        return {
          header: <Title
            header={translate("dialog.vehicle.title")}
            subHeader={translate("dialog.vehicle.subTitle")} />
        }
      case 'signin':
        return {
          header: <Title header={translate("dialog.signin.title")} />
        }
      case 'search':
        return {
          minWidth: '80%'
        }
      default:
        break;
    }
  }

  getDialogComponent = () => {
    const { vehicles } = this.props;
    const { dialogType } = this.state;

    switch (dialogType) {
      case 'vehicle':
        return <Vehicles />
      case 'signin':
        return <Login />
      case 'search':
        return <Search onTogglePopup={this.props.togglePopup} />

      default:
        break;
    }
  }

  render() {
    const {
      isLoggedIn, fullName, translate, localize, changeDefaultDirection,
      vehiclesFormat, selectedVehicle, modal, togglePopup
    } = this.props;
    const dialog = (
      <Modal isOpen={modal} toggle={togglePopup} >
        <ModalHeader toggle={togglePopup}>{this.getDialogProps().header}</ModalHeader>
        <ModalBody>
          {this.getDialogComponent()}
        </ModalBody>
      </Modal>
    )
    return (
      <Fragment>
        <MobileHeader
          translate={translate}
          localize={localize}
          selectedVehicle={selectedVehicle}
          changeDefaultDirection={changeDefaultDirection}
          vehicles={this.props.vehicles}
          vehiclesFormat={vehiclesFormat}
          onAddVechile={this.handleDialog.bind(this, 'vehicle')}
          onSignin={this.handleDialog.bind(this, 'signin')}
          onSearch={this.handleDialog.bind(this, 'search')} />
        <Header
          translate={translate}
          localize={localize}
          vehicles={this.props.vehicles}
          isLoggedIn={isLoggedIn}
          fullName={fullName}
          onAddVechile={this.handleDialog.bind(this, 'vehicle')}
          onSignin={this.handleDialog.bind(this, 'signin')}
          onSearch={this.handleDialog.bind(this, 'search')}
          changeDefaultDirection={changeDefaultDirection} />
        {dialog}
        {this.props.children}
        <Footer />
        <MobileFooter />
      </Fragment>
    );
  }
}

const WithLayout = withRouter(Layout);

export default WithLayout;
