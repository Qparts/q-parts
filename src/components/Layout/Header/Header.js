import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderDetails from "./HeaderDetails";
import Select from 'react-select';
import LanguageToggle from '../../../components/LanguageToggle'
import { styles } from "../../../constants";

class Header extends Component {

  render() {
    // TODO: Need to find a way to style the select component. To make it exactly like the design
    const shipToOptions = [
      { value: 1, label: "KSA" },
      { value: 2, label: "Egypt" },
      { value: 3, label: "Jordan" }
    ];
    const { translate, localize, isLoggedIn, fullName, vehicles, onAddVechile, onSignin } = this.props;
    return (
      <div className="main-header w3-hide-small w3-hide-medium">
        <div className=" header-first">
          <div className="container-fluid d-flex justify-content-between">
            <ul className="nav-icon-pl setting list-inline ">
              <li className="ship-country">
                <div className="input-group">
                  <span className="ship-to">Ship to</span>
                 <div className="custom-select">
                 <Select
                    styles={styles.select}
                    defaultValue={shipToOptions[0]}
                    options={shipToOptions} />
                </div>
                </div>
              </li>
              <li>
                <span className="seperator" />
              </li>
              <li>
                <LanguageToggle localize={localize} translate={translate} />
              </li>
            </ul>
            <nav className="navbar">
              <ul className="list-inline">
                <li>
                  <Link className="selected" to="/">{translate("navBar.vehiclePart")}</Link>
                </li>
                <li>
                  <Link to="/motor-oil">{translate("navBar.motorOil")}</Link>
                </li>
                <li>
                  <Link to="/tyres">{translate("navBar.tyres")}</Link>
                </li>
                <li>
                  <Link to="/tools">{translate("navBar.tools")}</Link>
                </li>
                <li>
                  <Link to="/">{translate("navBar.vendor")}</Link>
                </li>
                <li>
                  <Link to="/accessories">{translate("navBar.accessories")}</Link>
                </li>
                <li>
                  <Link to="/">{translate("navBar.offers")}</Link>
                </li>
                <li>
                  <Link to="/">{translate("navBar.blog")}</Link>
                </li>
              </ul>
            </nav>
            <Link className="btn custom-order" to="/">
              <i className="icon-custom-order" />
              <span>{translate("navBar.customOrder")}</span>
            </Link>
          </div>
        </div>
        <HeaderDetails
          translate={translate}
          isLoggedIn={isLoggedIn}
          fullName={fullName}
          vehicles={vehicles}
          onAddVechile={onAddVechile}
          onSignin={onSignin} />
      </div>
    );
  }
}
export default Header;
