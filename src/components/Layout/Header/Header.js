import React, { Component, Fragment, createRef } from "react";
import { Link, withRouter } from "react-router-dom";
import HeaderDetails from "./HeaderDetails";
import Select from 'react-select';
import LanguageToggle from '../../../components/LanguageToggle'
import { styles } from "../../../constants";
import Nav from '../../UI/Nav';
import { toggleSearch } from '../../../utils';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ''
    }
    this.header = createRef();
    this.searchDiv = createRef();
    this.searchLg = createRef();
    this.cdSearch = createRef();
  }

  componentDidMount() {

    var new_scroll_position = 0;
    var last_scroll_position;
    var sm = window.matchMedia("(max-width: 1169px)");
    var lg = window.matchMedia("(min-width: 1170px)");
    var moveSearch = () => {
      if (lg.matches) {
        //move search
        this.searchLg.current.appendChild(this.searchDiv.current);
      } else if (sm.matches) {
        //move search input
        this.cdSearch.current.appendChild(this.searchDiv.current);
      }
    }
    moveSearch();
    window.onresize = () => {
      moveSearch();
    };
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

  render() {
    const shipToOptions = [
      { value: 1, label: "KSA" },
      { value: 2, label: "Egypt" },
      { value: 3, label: "Jordan" }
    ];
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

    const { translate, localize, isLoggedIn, fullName, vehicles, onAddVechile, onSignin, changeDefaultDirection, onSearch, getCountriesOnly } = this.props;
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
                <div className="col" id="search-lg" ref={this.searchLg}>
                  <div className="main-search" ref={this.searchDiv}>
                    <input type="text" className="form-control" placeholder="Search by Part Number,  Product Name" aria-describedby="search input" onChange={this.handleChange}/>
                    <button className="btn" type="submit" onClick={this.handleClick}><i className="icon-search"></i></button>

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
                    <li><a className="cd-nav-trigger" href="#cd-primary-nav"><span></span></a></li>
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
            <div id="cd-search" className="cd-search" ref={this.cdSearch}>

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
