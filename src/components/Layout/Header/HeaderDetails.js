import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import DropdownItem from "../../UI/Nav/DropdownItem";
import GaragePopup from "../../../containers/GaragePopup/GaragePopup";
import { isEmpty, right } from "../../../utils";
import ButtonCustom from "../../UI/Button";
import { withStyles, Menu, MenuItem, Button } from "@material-ui/core";

class HeaderDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      count: 0,
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
  render() {
    const { translate, vehicles, isLoggedIn, fullName, classes, onAddVechile, onSignin, onSearch, direction } = this.props;
    const { anchorEl, activeSignIn, activeGatage, count } = this.state;
    const signinJoinHeader =
      <Fragment>
        <span className="user-img position-relative d-inline-block">
          <img alt="user" src="/img/user.svg" />
        </span>
        <b>{translate("general.signin")}</b>
        <span className="seperator" />
        {translate("general.join")}
      </Fragment>

    const garageHeader =
      <Fragment>
        <span className="garage-img">
          <img alt="garage" src="/img/garage.svg" />
          <div>{count}</div>
        </span>{" "}
        {translate("navBar.garage")}
      </Fragment>

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
          <li className="user-account">
            <DropdownItem header={signinJoinHeader}>
                <h6>Welcome Back</h6>
                <ul className="signin-list">
                  <li><a href="#" onClick={onSignin}>{translate("general.signin")} <i className={`icon-arrow-${right(direction)}`} /></a></li>
                  <li><a href="#"><i className="icon-facebook" /></a></li>
                  <li><a href="#"><img src="/img/google-icon.svg"></img></a></li>
                </ul>
                <p>
                  {translate("dropdown.signup.message")}
                  <Link to="/signup">
                    {translate("dropdown.signup.link")}
                    <i className={`icon-arrow-${right(direction)}`} style={styles.arrow_right} />
                  </Link>
                </p>
              <ul className="account-actions">
                <li>
                  <a href="#"><i className="icon-shopping-bag"></i>Orders</a>
                </li>
                <li><a href="#"><i className="icon-send"></i>Requests</a></li>
                <li><a href="#"><img alt="garage" src="/img/garage.svg"/>Garage</a></li>
              </ul>
          </DropdownItem>

          </li>
        </Fragment>
      );
    return (
          <ul>
            {authOrNotAuthButtons}
            <li className="search-sm"><a className="cd-search-trigger" href="#cd-search"><span></span></a></li>
            <li>
              <span className="seperator" />
            </li>
            <li>
              <Link to="/cart">
                <i className="icon-cart" />
              </Link>
            </li>
          </ul>
    );
  }
}

const styles = {
  label: {
    textTransform: "capitalize"
  },
  btn_social: {
    display: 'flex',
    margin: "0px 0px 10px 0px"
  },
  text: {
    margin: "0px 0px 24px 0px"
  },
  arrow_right: {
    color: "black"
  }

};

export default withStyles(styles)(HeaderDetails);