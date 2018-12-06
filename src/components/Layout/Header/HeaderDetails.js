import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import DropdownItem from "../../UI/Nav/DropdownItem";
import GaragePopup from "../../../containers/GaragePopup/GaragePopup";
import { isEmpty } from "../../../utils";
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
    const { translate, vehicles, isLoggedIn, fullName, classes, onAddVechile, onSignin } = this.props;
    const { anchorEl, activeSignIn, activeGatage, count } = this.state;
    const signinJoinHeader =
      <Fragment>
        <span className="user-img">
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
            <a>
              <DropdownItem DropdownItemId="signin" header={signinJoinHeader}>
                <div className="dropdown-header">
                  <p>Welcome Back</p>
                  <div>
                    <button type="submit" className="btn-primary" onClick={onSignin}>
                      {translate("general.signin")} <i className="icon-arrow-right" />
                    </button>
                    <a href="#"><i className="icon-facebook-logo" /></a>
                    <a href="#"><i className="icon-google-logo" /></a>
                    <a href="#" className="twit"><i className="icon-twitter" /></a>
                  </div>
                  <br />
                  <p className="text-singIn">{translate("dropdown.signup.message")}</p> <Link class="join-us-text" to="/signup">{translate("dropdown.signup.link")}</Link>
                  <i className="icon-arrow-right" />
                  <div class="dropdown-divider"  >
                  </div>
                  <div className="dropdown-footer">
                    <li>
                      <img alt="garage" src="/img/garage.svg" /> <p>Orders</p>
                    </li>
                    <li>
                      <img alt="garage" src="/img/request.svg" /> <p>Request</p>
                    </li>
                    <li>
                      <img alt="garage" src="/img/garage.svg" /> <p>My Garage</p>
                    </li>
                  </div>
                </div>

              </DropdownItem>
            </a>
          </li>
        </Fragment>
      );
    return (
      <div className="header-second">
        <div className="d-flex justify-content-between container-fluid">
          <Link className="brand nav-icon-pl" to="/">
            <img alt="qParts" src="/img/qParts-logo.svg" />
          </Link>
          <ul className="list-inline user-actions">
            <li className="search">
              <a href="">
                <i className="icon-search" />
              </a>
            </li>
            <li>
              <span className="seperator" />
            </li>
            {authOrNotAuthButtons}
            <li>
              <span className="seperator" />
            </li>
            <li className="garage">
              <a>
                <DropdownItem DropdownItemId="garage" header={garageHeader}>
                  <Fragment>
                    {!isEmpty(vehicles) ? (
                      <GaragePopup
                        translate={translate}
                        className=""
                        onAddVechile={onAddVechile}
                      />
                    ) : (
                        <ButtonCustom
                          className="btn-primary"
                          text={"Add a new vehicle"}
                          onClick={onAddVechile} />
                      )}
                  </Fragment>
                </DropdownItem>
              </a>
            </li>
            <li>
              <Link to="/wishlist">
                <i className="icon-heart" />
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="icon-cart" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const styles = {
  label: {
    textTransform: "capitalize"
  }
};

export default withStyles(styles)(HeaderDetails);;



{/* <Nav id="secondNavBar">
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
        </Nav> */}