import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import DropdownItem from "../../UI/Nav/DropdownItem";
class HeaderDetails extends Component {
  render() {
    const signinJoinHeader =
      <Fragment>
        <span className="user-img">
          <img alt="user" src="img/user.svg" />
        </span>
        <b>Sign in</b>
        <span className="seperator" />
        Join
    </Fragment>

    const garageHeader =
      <Fragment>
        <span className="garage-img">
          <img alt="garage" src="img/garage.svg" />
        </span>{" "}
        Garage
    </Fragment>
    return (
      <div className="header-second">
        <div className="d-flex justify-content-between container-fluid">
          <Link className="brand nav-icon-pl" to="/">
            <img alt="qParts" src="img/qParts-logo.svg" />
          </Link>
          <ul className="list-inline user-actions">
            <li className="search">
              <a href="#">
                <i className="icon-search" />
              </a>
            </li>
            <li>
              <span className="seperator" />
            </li>
            <li className="user-account">
              <DropdownItem header={signinJoinHeader}>
                <button>
                  Sign in
                </button>
              </DropdownItem>
            </li>
            <li>
              <span className="seperator" />
            </li>
            <li className="garage">
              <DropdownItem header={garageHeader}>
                <div>
                  Garage list
              </div>
              </DropdownItem>
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

export default HeaderDetails;



{/* <Nav id="secondNavBar">
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
        </Nav> */}