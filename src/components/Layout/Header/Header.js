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
      searchText: '',
      new: ''
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
    let subNav;
    if(window.location.pathname === "/accessories"){
      subNav = <div className="sub-nav"><ul className="container-fluid list-inline">
        <li><a>Wires and Cables</a></li>
        <li><a>Car Refrigerators</a></li>
        <li><a>Bodywork Cleaning</a></li>
        <li><a>Car Mats</a></li>
        <li><a>Children Seats</a></li>
      </ul>
    </div>;
    }else{
      subNav= <NavLg>
        <div className="sub-nav">
        </div>
      </NavLg>;
    }
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
            {subNav}
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
