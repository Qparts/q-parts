import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Menu, MenuItem, withStyles } from "@material-ui/core";

import DropdownItem from "../UI/Nav/DropdownItem";
import Nav from "../UI/Nav";
import Vehicles from "../Vehicles/Vehicles";
import { Dialog } from "primereact/components/dialog/Dialog";
import GaragePopup from "../../containers/GaragePopup/GaragePopup";
import LanguageToggle from "../LanguageToggle";
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer";
import select2 from "select2"; // eslint-disable-line
import $ from "jquery";

import { TAB_ONE } from "../../constants";
import { isEmpty } from "../../utils";

import "./Layout.css";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      visible: false,
      newOrOldVechile: TAB_ONE
    };
  }

  componentDidMount = () => {
    $(this.basicSelect).select2({
      minimumResultsForSearch: -1
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.vehicles !== this.props.vehicles && this.state.visible) {
      this.onHide();
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
    const { anchorEl } = this.state;
    const { classes, isLoggedIn, fullName, vehicles, translate } = this.props;
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
    const authOrNotAuthButtons = isLoggedIn ? (
      <Fragment>
        <Button
          aria-owns={anchorEl ? "menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          classes={{
            label: classes.label
          }}
        >
          {fullName}
        </Button>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <Link to="/setting/addresses">
              {translate("navBar.menu.menuItem.address")}
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/setting/quotations">
              {translate("navBar.menu.menuItem.quotations")}
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/setting">
              {translate("navBar.menu.menuItem.setting")}
            </Link>
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <Link to="/logout">{translate("navBar.menu.menuItem.logout")}</Link>
          </MenuItem>
        </Menu>
      </Fragment>
    ) : (
      <Fragment>
        <DropdownItem header={translate("navBar.signinSignup")}>
          <div className="Layout-nav-popup">
            <Button
              component={Link}
              to="/login"
              variant="contained"
              classes={{
                label: classes.label
              }}
            >
              {translate("general.signin")}
            </Button>
            <br />
            {translate("dropdown.signup.message")}{" "}
            <Link to="/signup">{translate("dropdown.signup.link")}</Link>
          </div>
        </DropdownItem>
      </Fragment>
    );
    return (
      <Fragment>
        <Nav id="TopNavbar">
          {/* <div className="Layout-top_nav">
            <Link to="/">{translate("navBar.vehiclePart")}</Link>
            <Link to="/motor-oil">{translate("navBar.motorOil")}</Link>
            <Link to="/tyres">{translate("navBar.tyres")}</Link>
            <Link to="/tools">{translate("navBar.tools")}</Link>
            <Link to="/accessories">{translate("navBar.accessories")}</Link>
            <Link to="/">{translate("navBar.vendor")}</Link>
            <Link to="/">{translate("navBar.offers")}</Link>
            <Link to="/">{translate("navBar.blog")}</Link>
            <Link to="/">{translate("navBar.customOrder")}</Link>
          </div> */}
          <Header />
        </Nav>
        <hr />
        <Nav id="secondNavBar">
          <LanguageToggle localize={this.props.localize} />
          <Link to="/">
            <i className="fas fa-home fa-2x" />
          </Link>
          {!isEmpty(vehicles) ? (
            <DropdownItem header={translate("navBar.garage")}>
              <GaragePopup
                translate={translate}
                className="Layout-nav-popup Layout-nav-garage_popup"
                onAddVechile={this.handleAddVechile}
              />
            </DropdownItem>
          ) : (
            <Button
              variant="outlined"
              classes={{
                label: classes.label
              }}
              onClick={this.handleAddVechile}
            >
              {translate("navBar.garage")}
            </Button>
          )}
          {authOrNotAuthButtons}
          <div>
            <Button
              component={Link}
              to="/vendor_registration_form"
              variant="outlined"
              classes={{
                label: classes.label
              }}
            >
              {translate("navBar.joinUs")}
            </Button>
          </div>
          <Link to="/cart">
            <i className="fas fa-shopping-cart fa-2x" />
          </Link>
        </Nav>
        {dialog}
        {this.props.children}
        <Footer/>
      </Fragment>
    );
  }
}

const styles = {
  label: {
    textTransform: "capitalize"
  }
};

const WithLayout = withRouter(Layout);

export default withStyles(styles)(WithLayout);
