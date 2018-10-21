import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import HeaderDetails from "./HeaderDetails";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  /* <div className="Layout-top_nav">
            <Link to="/">{translate("navBar.vehiclePart")}</Link>
            <Link to="/motor-oil">{translate("navBar.motorOil")}</Link>
            <Link to="/tyres">{translate("navBar.tyres")}</Link>
            <Link to="/tools">{translate("navBar.tools")}</Link>
            <Link to="/accessories">{translate("navBar.accessories")}</Link>
            <Link to="/">{translate("navBar.vendor")}</Link>
            <Link to="/">{translate("navBar.offers")}</Link>
            <Link to="/">{translate("navBar.blog")}</Link>
            <Link to="/">{translate("navBar.customOrder")}</Link>
          </div> */

  render() {
    return (
      <div className="main-header">
        <div className=" header-first">
          <div className="container-fluid d-flex justify-content-between">
            <ul className="nav-icon-pl setting list-inline ">
              <li className="ship-country">
                <div className="input-group">
                  <span className="ship-to">Ship to</span>
                  <select
                    ref={ref => (this.basicSelect = ref)}
                    id="shiping-country"
                  >
                    <option defaultValue="KSA">KSA</option>
                    <option value="2">Egypt</option>
                    <option value="3">Jordan</option>
                  </select>
                </div>
              </li>
              <li>
                <span className="seperator" />
              </li>
              <li>
                <a href="#" className="lang">
                  العربية
                </a>
              </li>
            </ul>
            <nav className="navbar">
              <ul className="list-inline">
                <li>
                  <Link to="/" className="selected">
                    Vehicle Part
                  </Link>
                  {/* <a href="#" className="selected">
                  Vehicle Part
                </a> */}
                </li>
                <li>
                  <Link to="/motor-oil">Motor Oil</Link>
                  {/* <a  to="/motor-oil">Motor Oil</a> */}
                </li>
                <li>
                  <Link to="/tyres">Tyres</Link>
                  {/* <a href="#">Tyres</a> */}
                </li>
                <li>
                  <Link to="/tools">Tools</Link>
                  {/* <a href="#">Tools</a> */}
                </li>
                <li>
                  <a href="#">Vendor</a>
                </li>
                <li>
                  <Link to="/accessories">Accessories</Link>
                  {/* <a href="#">Accessories</a> */}
                </li>
                <li>
                  <a href="#">Offers</a>
                </li>
              </ul>
            </nav>
            <a href="#" className="btn custom-order">
              <i className="icon-custom-order" /> <span>Custom Order</span>
            </a>
          </div>
        </div>
        <HeaderDetails />
      </div>
    );
  }
}
export default Header;
