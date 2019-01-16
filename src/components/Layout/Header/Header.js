import React, { Component, Fragment } from "react";
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
    const formatGroupLabel = () => (
      <div className="placeholder">
        <span >Select city</span>
      </div>
    );
    const groupedOptions = [
      {
        label: 'Colours', // call this say ShipTo
        options: shipToOptions,
      },
    ];

    const { translate, localize, isLoggedIn, fullName, vehicles, onAddVechile, onSignin, changeDefaultDirection, onSearch } = this.props;
    return (
      <Fragment>
        <header className="main-header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-auto">
                <Link className="brand" to="/">
                  <img alt="qParts" src="/img/qParts-logo.svg" />
                </Link>
              </div>
              <div className="col">
                <div class="main-search">
                    <input type="text" class="form-control" placeholder="Search by Part Number,  Product Name" aria-describedby="search input" />
                    <button class="btn" type="submit"><i className="icon-search"></i></button>

                  </div>

              </div>
              <div className="col-auto">
                <ul className="setting list-inline ">
                  <li className="ship-country">
                    <div className="input-group">
                      <span className="ship-to">Ship to</span>
                      <Select
                        classNamePrefix="select"
                        isSearchable={false}
                        styles={styles.select}
                        defaultValue={shipToOptions[0]}
                        options={groupedOptions}
                        formatGroupLabel={formatGroupLabel} />
                    </div>
                  </li>
                  <li>
                    <span className="seperator" />
                  </li>
                  <li>
                    <LanguageToggle
                      localize={localize}
                      translate={translate}
                      changeDefaultDirection={changeDefaultDirection} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>
        <nav className="main-nav">
          <div className="container-fluid">
            <div className="row">
              <div class="col cd-main-header">
                  <ul class="cd-header-buttons">
                    <li><a class="cd-nav-trigger" href="#cd-primary-nav">Menu<span></span></a></li>
                  </ul>
              </div>
              <div className="user-actions">
                <HeaderDetails
                  translate={translate}
                  isLoggedIn={isLoggedIn}
                  fullName={fullName}
                  vehicles={vehicles}
                  onAddVechile={onAddVechile}
                  onSignin={onSignin}
                  onSearch={onSearch} />
              </div>
            </div>
          </div>
          <div className="sub-nav">

          </div>
        </nav>

    </Fragment>

    );
  }
}
export default Header;
// <li>
//   <Link className="selected" to="/">{translate("navBar.vehiclePart")}</Link>
// </li>
// <li>
//   <Link to="/motor-oil">{translate("navBar.motorOil")}</Link>
// </li>
// <li>
//   <Link to="/tyres">{translate("navBar.tyres")}</Link>
// </li>
// <li>
//   <Link to="/tools">{translate("navBar.tools")}</Link>
// </li>
// <li>
//   <Link to="/">{translate("navBar.vendor")}</Link>
// </li>
// <li>
//   <Link to="/accessories">{translate("navBar.accessories")}</Link>
// </li>
// <li>
//   <Link to="/">{translate("navBar.offers")}</Link>
// </li>
// <li>
//   <Link to="/">{translate("navBar.blog")}</Link>
// </li>
