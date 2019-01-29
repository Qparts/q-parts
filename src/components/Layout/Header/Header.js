import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import HeaderDetails from "./HeaderDetails";
import Select from 'react-select';
import LanguageToggle from '../../../components/LanguageToggle'
import { styles } from "../../../constants";

class Header extends Component {
  componentDidMount(){

    var new_scroll_position = 0;
    var last_scroll_position;
    var header = document.getElementById("header-fixed");
    var sm = window.matchMedia("(max-width: 1169px)");
    var lg = window.matchMedia("(min-width: 1170px)");
    var searchDiv = document.getElementsByClassName("main-search")[0];
    var moveSearch = function(){
      if (lg.matches){
        //move search
        document.getElementById("search-lg").appendChild(searchDiv);
      }else if (sm.matches){
        //move search input
        document.getElementById("cd-search").appendChild(searchDiv);
      }
    }
    moveSearch();
    window.onresize= function() {
      moveSearch();
    };
    window.addEventListener('scroll', function(e) {
      last_scroll_position = window.scrollY;
      if (lg.matches) { // If media query matches
        // Scrolling down
          if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
            // header.removeClass('slideDown').addClass('slideUp');
            header.classList.remove("slideDown");
            header.classList.add("slideUp");
          // Scrolling up
        } else if (new_scroll_position < 80) {
            // header.removeClass('slideUp').addClass('slideDown');
            header.classList.remove("slideUp");
            header.classList.add("slideDown");
          }


        }
        if (sm.matches) { // If media query matches
          // Scrolling down
            if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
              // header.removeClass('slideDown').addClass('slideUp');
              header.classList.remove("slideDown");
              header.classList.add("slideUp");
            // Scrolling up
          } else if (new_scroll_position > last_scroll_position) {
              // header.removeClass('slideUp').addClass('slideDown');
              header.classList.remove("slideUp");
              header.classList.add("slideDown");
            }

          }


      new_scroll_position = last_scroll_position;
    });
  }

  render() {
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
console.log(this.state);
    return (
      <Fragment>
        <div id="header-fixed" className="cd-main-header">
          <header className="main-header ">
            <div className="container-fluid">
              <div className="row">
                <div className="col-auto">
                  <Link className="brand" to="/">
                    <img alt="qParts" src="/img/qParts-logo.svg" />
                  </Link>
                </div>
                <div className="col" id="search-lg">
                  <div class="main-search">
                      <input type="text" class="form-control" placeholder="Search by Part Number,  Product Name" aria-describedby="search input" />
                      <button class="btn" type="submit"><i className="icon-search"></i></button>

                    </div>

                </div>
                <div className="col-auto">
                  <ul className="data-setting list-inline ">
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
          <nav className="main-nav ">
            <div className="container-fluid">
              <div className="row">
                <div class="col">
                  <Link className="scroll-dwon-brand" to="/">
                    <img alt="qParts" src="/img/qParts-logo.svg" />
                  </Link>
                    <ul class="cd-header-buttons">
                      <li><a class="cd-nav-trigger" href="#cd-primary-nav"><span></span></a></li>
                    </ul>
                </div>
                <div className="user-actions col-auto">
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
            <div className="sub-nav"></div>
              <div id="cd-search" class="cd-search">
            		
            	</div>
          </nav>

        </div>

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
