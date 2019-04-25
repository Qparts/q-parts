import React, { Component, Fragment, createRef } from "react";
import { Link, withRouter } from "react-router-dom";
import HeaderDetails from "./HeaderDetails";
import LanguageToggle from '../../../components/LanguageToggle'
import { toggleSearch } from '../../../utils';
import { NavSm, NavLg } from '../../Device';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
    this.header = createRef();
  }

  componentDidMount() {
    var new_scroll_position = 0;
    var last_scroll_position;
    var sm = window.matchMedia("(max-width: 1169px)");
    var lg = window.matchMedia("(min-width: 1170px)");

    window.addEventListener('scroll', (e) => {
      last_scroll_position = window.scrollY;
      if (lg.matches) { // If media query matches
        // Scrolling down
        if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
          // header.removeClass('slideDown').addClass('slideUp');
          this.header.current.classList.remove("slideDown");
          this.header.current.classList.add("slideUp");

          // Scrolling up
        } else if (new_scroll_position < 80) {
          // header.removeClass('slideUp').addClass('slideDown');
          this.header.current.classList.remove("slideUp");
          this.header.current.classList.add("slideDown");
        }

      }
      if (sm.matches) { // If media query matches
        // Scrolling down
        if (new_scroll_position < last_scroll_position && last_scroll_position > 80) {
          // header.removeClass('slideDown').addClass('slideUp');
          this.header.current.classList.remove("slideDown");
          this.header.current.classList.add("slideUp");
          // Scrolling up
        } else if (new_scroll_position > last_scroll_position) {
          // header.removeClass('slideUp').addClass('slideDown');
          this.header.current.classList.remove("slideUp");
          this.header.current.classList.add("slideDown");
        }
      }
      new_scroll_position = last_scroll_position;
    });
  }

  handleClick = (e) => {
    e.preventDefault();
    toggleSearch('close');
    this.props.history.push(`/listing?query=${this.state.searchText}&page=1`);
  }

  handleChange = e => {
    this.setState({ searchText: e.target.value })
  }

  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      toggleSearch('close');
      this.props.history.push(`/listing?query=${this.state.searchText}&page=1`);
    }
  }
  render() {
    const formatGroupLabel = () => (
      <div className="placeholder">
        <span>Select city</span>
      </div>
    );
    const groupedOptions = [
      {
        options: this.props.countriesOnly,
      },
    ];

    const { translate, localize, isLoggedIn, fullName, vehicles, onAddVechile, onSignin, changeDefaultDirection, onSearch, getCountriesOnly, direction, cart } = this.props;

    const mainSearch = (
      <div className="main-search">
        <input type="text" className="form-control" placeholder={translate("navBar.search")} aria-describedby="search input" onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
        <button className="btn" type="submit" onClick={this.handleClick}><i className="icon-search"></i></button>
      </div>
    );

    return (
      <Fragment>
        <div id="header-fixed" className="cd-main-header" ref={this.header}>
          <header className="main-header ">
            <div className="container-fluid">
              <div className="row">
                <div className="col-auto">
                  <Link className="brand" to="/">
                    <img alt="qParts" src="/img/qParts-logo.svg" />
                  </Link>
                </div>
                <div className="col">
                  <NavLg>
                    {mainSearch}
                  </NavLg>

                </div>
                <div className="col-auto">
                  <ul className="data-setting list-inline ">
                    {/* <li className="ship-country">
                      <div className="input-group">
                        <span className="ship-to">Ship to</span>
                        <Select
                          classNamePrefix="select"
                          isSearchable={false}
                          styles={styles.select}
                          defaultValue={"Saudi Arabia"}
                          options={groupedOptions}
                          formatGroupLabel={formatGroupLabel} />
                      </div>
                    </li> */}
                    {/* <li>
                      <span className="seperator" />
                    </li> */}
                    <li>
                      <LanguageToggle
                        localize={localize}
                        translate={translate}
                        changeDefaultDirection={changeDefaultDirection}
                        getCountriesOnly={getCountriesOnly} />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>
          <nav className="main-nav ">
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <Link className="scroll-dwon-brand" to="/">
                    <img alt="qParts" src="/img/qParts-logo.svg" />
                  </Link>
                  <ul className="cd-header-buttons">
                  {/* className="cd-nav-trigger new" */}
                    <li><a className="cd-nav-trigger" href="#cd-primary-nav"><span></span></a></li>
                  </ul>
                </div>
                <div className="user-actions col-auto">
                  <HeaderDetails
                    direction={direction}
                    translate={translate}
                    isLoggedIn={isLoggedIn}
                    fullName={fullName}
                    vehicles={vehicles}
                    onAddVechile={onAddVechile}
                    onSignin={onSignin}
                    onSearch={onSearch}
                    cart={cart} />
                </div>
              </div>
            </div>
            <div className="sub-nav"></div>
            <div id="cd-search" className="cd-search">
              <NavSm>
                {mainSearch}
              </NavSm>
            </div>
          </nav>

        </div>

      </Fragment>

    );
  }
}
export default withRouter(Header);


// const {
//   translate, localize, isLoggedIn, fullName, vehicles, onAddVechile,
//   onSignin, changeDefaultDirection, onSearch, getCountriesOnly, direction
// } = this.props;
// return (
//   <div className="main-header w3-hide-small w3-hide-medium">
//     <div className=" header-first border-bottom nav-icon-pl">
//       <div className="container-fluid d-flex justify-content-between">
//         <ul className="nav-icon-pl setting list-inline ">
//           <li className="ship-country">
//             <div className="input-group">
//               <span className="ship-to">Ship to</span>
//               <Select
//                 classNamePrefix="select"
//                 isSearchable={false}
//                 styles={styles.select}
//                 options={groupedOptions}
//                 onChange={this.props.selectCountry}
//                 formatGroupLabel={formatGroupLabel} />
//             </div>
//           </li>
//           <li>
//             <span className="seperator" />
//           </li>
//           <li>
//             <LanguageToggle
//               localize={localize}
//               translate={translate}
//               changeDefaultDirection={changeDefaultDirection}
//               getCountriesOnly={getCountriesOnly} />
//           </li>
//         </ul>
//         <nav className="navbar">
//           <ul className="list-inline">
//             <li>
//               <Link className="selected" to="/">{translate("navBar.vehiclePart")}</Link>
//             </li>
//             <li>
//               <Link to="/motor-oil">{translate("navBar.motorOil")}</Link>
//             </li>
//             <li>
//               <Link to="/tyres">{translate("navBar.tyres")}</Link>
//             </li>
//             <li>
//               <Link to="/tools">{translate("navBar.tools")}</Link>
//             </li>
//             <li>
//               <Link to="/">{translate("navBar.vendor")}</Link>
//             </li>
//             <li>
//               <Link to="/accessories">{translate("navBar.accessories")}</Link>
//             </li>
//             <li>
//               <Link to="/">{translate("navBar.offers")}</Link>
//             </li>
//             <li>
//               <Link to="/">{translate("navBar.blog")}</Link>
//             </li>
//           </ul>
//         </nav>
//         <Link className="btn custom-order" to="/">
//           <i className="icon-custom-order" />
//           <span>{translate("navBar.customOrder")}</span>
//         </Link>
//       </div>
//     </div>
//     <HeaderDetails
//       translate={translate}
//       isLoggedIn={isLoggedIn}
//       fullName={fullName}
//       vehicles={vehicles}
//       onAddVechile={onAddVechile}
//       onSignin={onSignin}
//       onSearch={onSearch}
//       direction={direction}/>
//   </div>
