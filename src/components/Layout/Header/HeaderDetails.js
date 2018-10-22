import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
class HeaderDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="header-second">
        <div className="d-flex justify-content-between container-fluid">
          <a href="#" className="brand nav-icon-pl">
            <img src="img/qParts-logo.svg" />
          </a>
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
              <div className="dropdown show">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="user-img">
                    <img src="img/user.svg" />
                  </span>
                  <b>Sign in</b>
                  <span className="seperator" />
                  Join
                </a>
              </div>
            </li>
            <li>
              <span className="seperator" />
            </li>
            <li className="garage">
              <div className="dropdown show">
                <a
                  className="dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="garage-img">
                    <img src="img/garage.svg" />
                  </span>{" "}
                  Garage
                </a>
              </div>
            </li>
            <li>
              <a href="#">
                <i className="icon-heart" />
              </a>
            </li>
            <li>
              <a href="#">
                <i className="icon-cart" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default HeaderDetails;
