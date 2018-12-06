import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LanguageToggle from '../../../components/LanguageToggle'
import SideBar from '../../UI/SideBar';
import Button from '../../UI/Button';

export class MobileHeaderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false
        }
        this.checkSignIn = this.checkSignIn.bind(this);
    }
    checkSignIn() {
        this.setState({
            check: !this.state.check
        })
    }
    render() {
        const { translate, localize, changeDefaultDirection, onCloseNav, setSideBarRef, setOverLay } = this.props
        return (
            <section id="mobile-header-details">
                {!this.state.check ? (
                    <SideBar
                        onCloseNav={onCloseNav}
                        setSideBarRef={setSideBarRef}
                        setOverLay={setOverLay}>
                        <ul className="list-inline user-actions">
                            <Link to="/#" onClick={this.checkSignIn} className="singIn-join">
                                <li className="user-account">
                                    <span className="user-img">
                                        <img alt="user" src="/img/user.svg" />
                                    </span>
                                    {translate("general.signin")}
                                    <span className="seperator" />
                                    {translate("general.join")}
                                </li>
                            </Link>
                        </ul>
                        <Link className="w3-bar-item" to="/">
                            <i className="icon-home" />
                            <span>Home</span>
                        </Link>
                        <Link className="w3-bar-item" to="/vehicles" onClick={onCloseNav}>
                            <i className="icon-garage" />
                            <span>Garage</span>
                        </Link>
                        <Link className="w3-bar-item" to="setting/orders">
                            <i className="icon-custom-order" />
                            <span>Orders</span>
                        </Link>
                        <Link className="w3-bar-item" to="/cart">
                            <i className="icon-cart" />
                            <span>Cart</span>
                        </Link>
                        <Link className="w3-bar-item" to="setting/wishlist">
                            <i className="icon-heart" />
                            <span>Wish list</span>
                        </Link>
                        <hr />
                        <Link className="w3-bar-item" to="/">{translate("navBar.vehiclePart")}</Link>
                        <Link className="w3-bar-item" to="/motor-oil">{translate("navBar.motorOil")}</Link>
                        <Link className="w3-bar-item" to="/tyres">{translate("navBar.tyres")}</Link>
                        <Link className="w3-bar-item" to="/tools">{translate("navBar.tools")}</Link>
                        <Link className="w3-bar-item" to="/">{translate("navBar.vendor")}</Link>
                        <Link className="w3-bar-item" to="/accessories">{translate("navBar.accessories")}</Link>
                        <Link className="w3-bar-item" to="/">{translate("navBar.offers")}</Link>
                        <Link className="w3-bar-item" to="/">{translate("navBar.blog")}</Link>
                        <hr />
                        <div className="w3-bar-item">
                            <i className="icon-world" />
                            <LanguageToggle localize={localize} translate={translate} changeDefaultDirection={changeDefaultDirection} />
                        </div>
                        <hr />
                        <Link className="w3-bar-item" to="/">Shipping & delivery</Link>
                        <Link className="w3-bar-item" to="/">FAQs</Link>
                        <Link className="w3-bar-item" to="/">Privacy Policy</Link>
                        <Link className="w3-bar-item" to="/">Terms & conditions </Link>
                    </SideBar>
                ) : (
                        <SideBar
                            onCloseNav={onCloseNav}
                            setSideBarRef={setSideBarRef}
                            setOverLay={setOverLay}>
                            <a to="/" onClick={this.checkSignIn} >
                                <p className="slider-back"><i className="icon-arrow-left" /> back</p>
                            </a>
                            <div class="dropdown-divider"  ></div>
                            <div className="dropdown-header">
                                <div className="user">
                                    <span>
                                        <img alt="user" src="/img/user.svg" />
                                    </span>
                                    <p>Welcome Back</p>

                                </div>
                                <div>
                                    <button type="submit" className="btn-primary">
                                        {translate("general.signin")} <i className="icon-arrow-right" />
                                    </button>
                                    <a ><i className="icon-facebook-logo" /></a>
                                    <a><i className="icon-google-logo" /></a>
                                    <a className="twit"><i className="icon-twitter" /></a>
                                </div>
                                <br />
                                <p>{translate("dropdown.signup.message")}</p> <Link class="join-us-text" to="/signup">{translate("dropdown.signup.link")}</Link>
                                <i className="icon-arrow-right" />
                            </div>
                        </SideBar>
                    )
                }
            </section>
        )
    }
}

export default MobileHeaderDetails
