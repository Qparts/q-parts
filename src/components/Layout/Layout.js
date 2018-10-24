import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Vehicles from "../Vehicles/Vehicles";
import { Dialog } from "primereact/components/dialog/Dialog";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer";

import { TAB_ONE } from "../../constants";
import { isEmpty } from "../../utils";

import "./Layout.css";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      newOrOldVechile: TAB_ONE
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.vehicles !== this.props.vehicles && this.state.visible) {
      this.onHide();
    }
  }

  handleAddVechile = event => {
    this.setState({
      visible: true
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

  render() {
    const { isLoggedIn, fullName, vehicles, translate, localize } = this.props;
    const dialog = (
      <Dialog
        header={translate("dialog.vehicle.title")}
        maximizable={true}
        visible={this.state.visible}
        positionTop={0}
        minWidth={1000}
        modal={true}
        onHide={this.onHide}
      >
        <Vehicles
          newOrOldVechile={this.state.newOrOldVechile}
          onTabChange={this.handleChange}
          displayTwoTabs={!isEmpty(vehicles)}
        />
      </Dialog>
    );
    return (
      <Fragment>
        <Header
          translate={translate}
          localize={localize}
          vehicles={this.props.vehicles}
          isLoggedIn={isLoggedIn}
          fullName={fullName}
          onAddVechile={this.handleAddVechile} />
        {dialog}
        {this.props.children}
        <Footer />
      </Fragment>
    );
  }
}

const WithLayout = withRouter(Layout);

export default WithLayout;
