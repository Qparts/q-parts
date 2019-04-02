import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import DropdownItem from "../../UI/Nav/DropdownItem";
import { isEmpty, right } from "../../../utils";
import { withStyles, Menu, MenuItem, Button } from "@material-ui/core";
import { NavLg } from '../../Device';

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
    const dropdownHeader =
      <Fragment>
        {
          isLoggedIn ?
          <span>
            <b>{fullName}</b>
          </span> :
            <Fragment>
              <span className="user-img position-relative d-inline-block">
                <img alt="user" src="/img/user.svg" />
              </span>
              <b>{translate("general.signin")}</b>
              <span className="seperator" />
              {translate("general.join")}
            </Fragment>
        }
      </Fragment>

    const authOrNotAuthButtons =
      <NavLg>
        <li className="user-account">
          <DropdownItem header={dropdownHeader}>
            {
              !isLoggedIn && <Fragment>
                <h6>{translate("dialog.signin.title")}</h6>
                <ul className="signin-list">
                  <li><Link className="btn" to="#" onClick={onSignin}>{translate("general.signin")} <i className={`icon-arrow-${right(direction)}`} /></Link></li>
                  {/* <li><a href="#"><i className="icon-facebook" /></a></li>
                <li><a href="#"><img src="/img/google-icon.svg"></img></a></li> */}
                </ul>
                <p>
                  {translate("dropdown.signup.message")}
                  <Link to="/signup">
                    {translate("dropdown.signup.link")}
                    <i className={`icon-arrow-${right(direction)}`} style={styles.arrow_right} />
                  </Link>
                </p>
              </Fragment>
            }
            {
              isLoggedIn && <ul className="account-actions">
                <li>
                  {/* <Link to="/"><i className="icon-shopping-bag"></i>{translate("navBar.menu.menuItem.quotations")}</Link> */}
                </li>
                <li><Link to="/setting/quotations"><i className="icon-send"></i>{translate("navBar.menu.menuItem.quotations")}</Link></li>
                <li><Link to="/setting/garage"><img alt="garage" src="/img/garage.svg" />{translate("navBar.garage")}</Link></li>
                <li><Link to="/logout">{translate("navBar.menu.menuItem.logout")}</Link></li>
              </ul>
            }
          </DropdownItem>

        </li>
      </NavLg>
    return (
      <ul>
        {authOrNotAuthButtons}
        <li className="search-sm"><a className="cd-search-trigger" href="#cd-search"><span></span></a></li>
        <li>
          <span className="seperator" />
        </li>
        <li>
          <Link to="/cart" className="not-empty">
            <i className="icon-cart" />
            <span>2</span>
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
