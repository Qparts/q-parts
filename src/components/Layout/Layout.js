import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Vehicles from "../Vehicles/Vehicles";
import Login from "../../containers/Authentication/Login/Login";
import { Dialog } from "primereact/components/dialog/Dialog";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer";
import MobileHeader from "./MobileHeader/MobileHeader";
import MobileFooter from "./Footer/MobileFooter";
import { TAB_ONE, styles, colors } from "../../constants";
import { isEmpty } from "../../utils";

import "./Layout.css";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      newOrOldVechile: TAB_ONE,
      dialogType: 'signin'
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.vehicles !== this.props.vehicles && this.state.visible) {
      this.onHide();
    }
  }

  handleDialog = (dialogType, event) => {
    this.setState({
      visible: true,
      dialogType
    });
  };

  handleChange = (event, value) => {
    this.setState({
      newOrOldVechile: value
    });
  };

  onHide = event => {
    this.setState({
      visible: false,
      newOrOldVechile: TAB_ONE
    });
  };
  getDialogComponent = () => {
    const { vehicles } = this.props;
    const { dialogType } = this.state;

    switch (dialogType) {
      case 'vehicle':
        return <Vehicles
          newOrOldVechile={this.state.newOrOldVechile}
          onTabChange={this.handleChange}
          displayTwoTabs={!isEmpty(vehicles)}
        />
      case 'signin':
        return <Login />

      default:
        break;
    }
  }

  render() {
    const { isLoggedIn, fullName, translate, localize, changeDefaultDirection } = this.props;
    const { dialogType } = this.state;
    const dialog = (
      <Dialog
        showHeader={true}
        maximizable={true}
        visible={this.state.visible}
        positionTop={65}
        modal={true}
        onHide={this.onHide}
        style={{
          background: colors.lightGray
        }}
      >
        {this.getDialogComponent()}
      </Dialog>
    );
    return (
      <Fragment>
        <MobileHeader
          translate={translate}
          localize={localize}
          changeDefaultDirection={changeDefaultDirection} />
        <Header
          translate={translate}
          localize={localize}
          vehicles={this.props.vehicles}
          isLoggedIn={isLoggedIn}
          fullName={fullName}
          onAddVechile={this.handleDialog.bind(this, 'vehicle')}
          onSignin={this.handleDialog.bind(this, 'signin')}
          changeDefaultDirection={changeDefaultDirection} />
        {dialog}
        {this.props.children}
        <Footer />
        <MobileFooter/>
      </Fragment>
    );
  }
}

const WithLayout = withRouter(Layout);

export default WithLayout;
