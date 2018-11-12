import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import LanguageToggle from '../../../components/LanguageToggle'

export class MobileHeaderDetails extends Component {
    render() {
        const { translate, localize } = this.props
        return (
            <div className="w3-sidebar w3-bar-block w3-animate-left" style={{ display: 'none', zIndex: '5' }} ref={ref => this.sideBar = ref}>
                <ul className="list-inline user-actions">
                    <Link to="/login">
                        <li className="user-account">
                            <span className="user-img">
                                <img alt="user" src="img/user.svg" />
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
                <Link className="w3-bar-item" to="setting/garage">
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
                    <LanguageToggle localize={localize} translate={translate} />
                </div>
                <hr />
                <Link className="w3-bar-item" to="/">Shipping & delivery</Link>
                <Link className="w3-bar-item" to="/">FAQs</Link>
                <Link className="w3-bar-item" to="/">Privacy Policy</Link>
                <Link className="w3-bar-item" to="/">Terms & conditions </Link>
            </div>
        )
    }
}

export default MobileHeaderDetails
