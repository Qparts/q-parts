import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import LanguageToggle from '../../../components/LanguageToggle'
import SideBar from '../../UI/SideBar';
import Button from '../../UI/Button';
import { connect } from 'react-redux';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';
import { selectVehicleGarage } from '../../../actions/customerAction';
import { isEmpty } from "../../../utils";
import ButtonCustom from "../../UI/Button";
import { styles } from "../../../constants";
import Select from 'react-select';
import { withRouter } from "react-router-dom";
export class MobileHeaderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
            checkGar: false
        }
    }
    checkSignIn= () => {
        this.setState({
            check: !this.state.check
        })
    }
    checkGarage = () => {
      this.setState({
        checkGar: !this.state.checkGar
      })
    }
    handleChange = (vehcile, e) => {
     this.props.selectVehicleGarage(vehcile)

    }
    onSignin = () => {
      this.props.history.push('/login')
    }
    render() {
      const shipToOptions = [
        { value: 1, label: "KSA" },
        { value: 2, label: "Egypt" },
        { value: 3, label: "Jordan" }
      ];
        const { translate, localize, changeDefaultDirection, onCloseNav, setSideBarRef, setOverLay, vehiclesFormat, onAddVechile, selectedVehicle, vehicles,
        onSignin } = this.props
        return (
            <section id="mobile-header-details">
                {!this.state.check && !this.state.checkGar ? (
                    <SideBar
                        onCloseNav={onCloseNav}
                        setSideBarRef={setSideBarRef}
                        setOverLay={setOverLay}>
                        <ul className="list-inline user-actions">
                            <Link className="w3-bar-item" to="/#" onClick={this.checkSignIn}>
                                <li className="user-account">
                                    <span className="user-img">
                                        <img alt="user" src="/img/user.svg" />
                                    </span>
                                    <p>
                                      {translate("general.signin")}
                                      <span className="seperator" />
                                      {translate("general.join")}
                                    </p>
                                </li>
                            </Link>
                        </ul>
                        <div className="sidebar-icon">
                          <Link className="w3-bar-item" to="/">
                            <div>
                              <i className="icon-home" />
                              <span>Home</span>
                            </div>
                          </Link>
                          <button className="w3-bar-item btn-link" to="/#" onClick={this.checkGarage}>
                            <div>
                              <i className="icon-garage" />
                              <span>Garage</span>
                            </div>
                          </button>
                          <Link className="w3-bar-item" to="setting/orders">
                            <div>
                              <i className="icon-custom-order" />
                              <span>Orders</span>
                            </div>
                          </Link>
                          <Link className="w3-bar-item" to="/cart">
                            <div>
                              <i className="icon-cart" />
                              <span>Cart</span>
                            </div>
                          </Link>
                          <Link className="w3-bar-item" to="setting/wishlist">
                            <div>
                              <i className="icon-heart" />
                              <span>Wish list</span>
                            </div>
                          </Link>
                        </div>
                        <hr />
                        <Link className="w3-bar-item" to="/">{translate("navBar.vehiclePart")}</Link>
                        <Link className="w3-bar-item" to="/motor-oil">{translate("navBar.motorOil")}</Link>
                        <Link className="w3-bar-item" to="/tyres">{translate("navBar.tyres")}</Link>
                        <Link className="w3-bar-item" to="/tools">{translate("navBar.tools")}</Link>
                        <Link className="w3-bar-item" to="/">{translate("navBar.vendor")}</Link>
                        <Link className="w3-bar-item" to="/accessories">{translate("navBar.accessories")}</Link>
                        <Link className="w3-bar-item" to="/">{translate("navBar.offers")}</Link>
                        <Link className="w3-bar-item" to="/">{translate("navBar.blog")}</Link>
                        <Link className="w3-bar-item" to="/">About Us</Link>
                        <Link className="w3-bar-item" to="/">Careers</Link>
                        <hr />
                        <div className="w3-bar-item">
                          <ul className="nav-icon-pl setting" style={{listStyleType:'none'}}>
                            <li className="ship-country">
                              <div className="input-group">
                                <span className="ship-to">Ship to</span>
                                <Select
                                  classNamePrefix="select"
                                  isSearchable={false}
                                  styles={styles.select}
                                  defaultValue={shipToOptions[0]}
                                  options={shipToOptions} />
                              </div>
                            </li>
                            <li className="lang-toggle">
                              <i className="icon-arrow-left" />
                              <LanguageToggle
                                localize={localize}
                                translate={translate}
                                changeDefaultDirection={changeDefaultDirection} />
                            </li>
                          </ul>
                        </div>
                        <hr />
                        <Link className="w3-bar-item" to="/">Shipping & delivery</Link>
                        <Link className="w3-bar-item" to="/">Returns</Link>
                        <Link className="w3-bar-item" to="/">FAQs</Link>
                        <Link className="w3-bar-item" to="/">Contact Us</Link>
                        <Link className="w3-bar-item" to="/">Privacy Policy</Link>
                        <Link className="w3-bar-item" to="/">Terms & conditions</Link>
                        <hr />
                        <Link className="w3-bar-item downloadApp" to="/"><p>Download Our App</p><i className="icon-apple" /> <i className="icon-play-store" /></Link>
                        <div className="footer-sideBar">
                          <li className="nav-item">
                            <Link className="w3-bar-item" to="/" style={{display:'flex'}}><i className="icon-arrow-left" /><p>one of the incubated project</p></Link>
                          </li>
                        </div>
                    </SideBar>
                ) : this.state.check ? (
                        <SideBar
                            onCloseNav={onCloseNav}
                            setSideBarRef={setSideBarRef}
                            setOverLay={setOverLay}>
                            <a to="/" onClick={this.checkSignIn} className="slider-back" >
                                <i className="icon-arrow-left" /><p>Back</p>
                            </a>
                            <div className="dropdown-divider"></div>
                            <div className="dropdown-header">
                              <div className="user">
                                    <img alt="user" src="img/user.svg" />
                                  <p>Welcome Back</p>
                              </div>
                                <div style={{display:'flex'}}>
                                    <Button
                                        type="submit"
                                        className="btn-primary"
                                        text={translate("general.signin")}
                                        icon="icon-arrow-right"
                                        onClick={() => {
                                            this.onSignin();
                                            onCloseNav();
                                        }}
                                        />
                                    <a><i className="icon-facebook-logo btn-facebook"/></a>
                                    <a className="btn-google"><img src="/img/google-icon.svg" alt="google"></img></a>
                                </div>
                                <br />
                                <div className="join-us">
                                  <p>{translate("dropdown.signup.message")}</p> <Link className="join-us-text" to="/signup">{translate("dropdown.signup.link")}</Link>
                                  <i className="icon-arrow-right" style={styles.arrow_right}/>
                                </div>

                            </div>
                        </SideBar>
                    ) : (
                      <Fragment>
                        {!isEmpty(vehicles) ? (
                          <SideBar
                              onCloseNav={onCloseNav}
                              setSideBarRef={setSideBarRef}
                              setOverLay={setOverLay}>
                              <a to="/" onClick={this.checkGarage} className="slider-back" >
                                  <i className="icon-arrow-left" /><p>Back</p>
                              </a>
                              <div className="dropdown-divider"></div>
                               <div className="dropdown-garage">
                               <div className="garage-header">
                                   <a href="#"><i className="icon-vehicle" /></a>
                                   <div>
                                     <h5>{translate("dropdown.garage.title")}</h5>
                                     <p>{translate("dropdown.garage.subTitle")}</p>
                                   </div>
                               </div>
                               <hr/>
                                {
                                 vehiclesFormat.map((vehicle, index) =>
                                  <div  key={index}>
                                   <div className="garage-content">
                                     <div className="d-flex justify-content-between">
                                       <div className="div-left">
                                        <div className="col-auto">
                                             <RadioButton value={selectedVehicle} name="vehcile" onChange={this.handleChange.bind(this, vehicle)} checked={vehicle.id === selectedVehicle.id} />
                                          <label htmlFor="rb1">{vehicle.label}</label>
                                        </div>
                                       </div>
                                       <div className="div-right">
                                        <Button className="btn-primary" text="Save"/>
                                        <a className="circle">
                                          <i className="icon-close"/>
                                        </a>
                                       </div>
                                     </div>
                                   </div>
                                   <hr/>
                                  </div>
                                 )
                                }
                                <div className="garage-footer">
                                <div className="d-flex justify-content-between">
                                 <button onClick={onAddVechile} className="btn-primary">
                                   <i className="icon-add-vehicle"/>
                                   <p>{translate("general.vehicleButton.add")}</p>
                                 </button>
                                 <div className="div-right col-auto">
                                   <a className="circle">
                                     <i className="icon-close"/>
                                   </a>
                                   <a  className="clear-history">{translate("general.vehicleButton.remove")}</a>
                                 </div>
                                </div>
                               </div>
                               </div>
                          </SideBar>
                        ) : (
                          <SideBar
                              onCloseNav={onCloseNav}
                              setSideBarRef={setSideBarRef}
                              setOverLay={setOverLay}>
                              <a to="/" onClick={this.checkGarage} className="slider-back" >
                                  <i className="icon-arrow-left" /><p>Back</p>
                              </a>
                              <div className="dropdown-divider"></div>
                            <ButtonCustom
                              className="btn-primary"
                              text={"Add a new vehicle"}
                              onClick={onAddVechile} />
                          </SideBar>
                          )}
                      </Fragment>
                    )
                }
            </section>
        )
    }
}

const WithLayout = withRouter(MobileHeaderDetails);
export default WithLayout;
