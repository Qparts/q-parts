import React, { Component, Fragment, createRef } from "react";
import { Link, withRouter } from "react-router-dom";
import HeaderDetails from "./HeaderDetails";
import LanguageToggle from '../../../components/LanguageToggle'
import { toggleSearch } from '../../../utils';
import { NavSm, NavLg, DownMediumScreen, MediumScreen } from '../../Device';
import { getTranslatedString } from "../../../utils";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      new: '',
      vin:"879310KD00",
      vinInput:""
    }
    this.header = createRef();
  }

  componentDidMount() {
    var new_scroll_position = 0;
    var last_scroll_position;
    var sm = window.matchMedia("(max-width: 1169px)");
    var lg = window.matchMedia("(min-width: 1170px)");
    this.setReadReplies();

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

  componentDidUpdate(prevProps, prevState) {
    const { completed } = this.props.quotations;
    const prevCompleted = prevProps.quotations.completed;

    if (completed !== prevCompleted) {
      this.setReadReplies();
    }
  }

  setReadReplies = () => {
    let hasNoNewReply = this.props.quotations.completed.every(reply => reply.read);

    this.setState({
      new: hasNoNewReply ? '' : 'new',
    })
  }

  handleClick = (e) => {
    e.preventDefault();
    toggleSearch('close');
    this.props.history.push(`/listing?query=${this.state.searchText}&page=1`);
  }

  handleChange = e => {
    this.setState({ vinInput: e.target.value })
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

    const { translate, localize, isLoggedIn, fullName, vehicles, onAddVechile, onSignin, changeDefaultDirection, onSearch, getCountriesOnly, direction, currentLanguage, cart } = this.props;
    console.log(cart)
    const mainSearch = (
      <div className="main-search">
        <input value={this.state.vinInput} type="text" className="form-control" placeholder={translate("navBar.search")} aria-describedby="search input" onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
        <div className="float-btn">
          <MediumScreen>
            <p onClick={()=>{this.setState(prevState => ({vinInput: prevState.vin})); console.log(this.state.vinInput) }}>{translate("navBar.partNumExText")}:<a>{this.state.vin}</a></p>
          </MediumScreen>
          <button className="btn" type="submit" onClick={this.handleClick}><i className="icon-search"></i></button>
        </div>
        <DownMediumScreen>
          <p className="vin-sm">{translate("navBar.partNumExText")}<a href="#">{translate("navBar.partNumEx")}</a></p>
        </DownMediumScreen>
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
                  <img alt="qParts" src={getTranslatedString(currentLanguage, "/img/qParts-logo.svg", "/img/qParts-logo-ar.svg")} />
                  </Link>
                </div>
                <div className="col">
                  <NavLg>
                    {mainSearch}
                  </NavLg>
                </div>
                <div className="col-auto">
                  <ul className="data-setting list-inline ">
                    <li className="ship-country">
                      <span className="ship-to">{translate("cart.shipTo")} {translate("general.ksa")}</span>
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
                  <Link className={getTranslatedString(currentLanguage, "scroll-dwon-brand", "scroll-dwon-brand-ar")} to="/">
                    <img alt="qParts" src={getTranslatedString(currentLanguage, "/img/qParts-logo.svg", "/img/qParts-logo-ar.svg")} />
                  </Link>
                  <ul className="cd-header-buttons">
                    <li><a className={`cd-nav-trigger ${this.state.new}`} href="#cd-primary-nav"><span></span></a></li>
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
                    cart={cart}
                    quotations={this.props.quotations} />
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
