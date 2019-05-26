import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { closeNav, right } from '../../../utils';
import LanguageToggle from '../../LanguageToggle';

const Nav = (
    {
        translate, direction, isLoggedIn, fullName, localize, changeDefaultDirection,
        getCountriesOnly, quotations
    }) => {

    const getReplayCounter = () => {
        return quotations.completed.filter(reply => !reply.read).length;
    }

    let hasNoNewReply = quotations.completed.every(reply => reply.read);

    const userSettingPages = isLoggedIn ? <Fragment>
        <li className="nav-sm">
            <Link className={hasNoNewReply ? '' : 'notification'} to="/setting/quotations" onClick={close}>
                <i className="icon-send"></i> {translate("navBar.quotations")}
                {getReplayCounter() > 0 && <span>{getReplayCounter()}</span>}
            </Link>
        </li>
        {/* <li className="nav-sm">
                    <Link to="/setting/orders" onClick={close}>
                        <i className="icon-product"></i> {translate("navBar.orders")}
                    </Link>
                </li> */}
        <li className="nav-sm">
            <Link to="/setting/wishlist" onClick={close}>
                <i className="icon-heart"></i> {translate("navBar.wishlist")}
            </Link>
        </li>

        <li className="nav-sm">
            <Link to="/setting/garage" onClick={close}>
                <i className="icon-garage"></i>{translate("navBar.garage")}
            </Link>
        </li>
        <li className="nav-sm">
            <Link to="/setting/addresses" onClick={close}>
                <i className="icon-address"></i>
                {translate("navBar.menu.menuItem.address")}
            </Link>
        </li>
        <li className="nav-sm">
            <Link to="/logout" onClick={close}><i className="icon-sign-out"></i> {translate("navBar.menu.menuItem.logout")}</Link>
        </li>
    </Fragment> : null;

    return (
        <nav className="cd-nav">
            <ul id="cd-primary-nav" className="cd-primary-nav">
                <li className="nav-sm">
                    <button className="user-account-sm w-100" href="#">
                        <span className="rounded-circle ">
                            <img alt="user" src="/img/user.svg" />
                        </span>
                        {
                            isLoggedIn ?
                                <p>{fullName} {/*<span>View Profile</span>*/}</p> :
                                <Link to="/login" onClick={close}>
                                    <p>{translate("general.signin")}<i></i>{translate("general.join")}</p>
                                </Link>
                        }
                    </button>
                </li>
                <li className="nav-sm">
                    <Link to="/" onClick={close}>
                        <i className="icon-home"></i> {translate("navBar.home")}
                    </Link>
                </li>
                {userSettingPages}
                <li className="sep"></li>
                <li>
                    <Link to="/quotation-order" onClick={close}>
                        {translate("nav.quotationOrder")}
                    </Link>
                </li>
                <li className="has-children">
                    <Link to="#">{translate("nav.consumableParts")}</Link>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">{translate("general.buttons.back")}</a></li>
                        <li><Link to="/listing?query=&page=1&category=2" onClick={close}>{translate("nav.oilFilter")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=3" onClick={close}>{translate("nav.airFilter")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=6" onClick={close}>{translate("nav.brakePads")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=4" onClick={close}>{translate("nav.acFilter")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=5" onClick={close}>{translate("nav.sparkPlugs")}</Link></li>
                    </ul>
                </li>
                <li className="has-children">

                    <Link to="/setting/addresses">
                        {translate("nav.oil")}
                    </Link>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">{translate("general.buttons.back")}</a></li>
                        <li><Link to="/listing?query=&page=1&category=7" onClick={close}>{translate("nav.motorOil")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=8" onClick={close}>{translate("nav.gearOil")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=27" onClick={close}>{translate("nav.coolant")}</Link></li>
                    </ul>
                </li>

                <li><Link to="/listing?query=&page=1&category=13" onClick={close}>{translate("nav.tires")}</Link></li>
                <li className="has-children">
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">{translate("general.buttons.back")}</a></li>
                        <li><Link to="/listing?query=&page=1&category=29" onClick={close}>{translate("nav.handTools")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=30" onClick={close}>{translate("nav.electricalTools")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=31" onClick={close}>{translate("nav.tyreInflator")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=33" onClick={close}>{translate("nav.repairEquipment")}</Link></li>
                    </ul>
                </li>
                <li className="has-children">
                    <a href="#">{translate("nav.accessorise")}</a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">{translate("general.buttons.back")}</a></li>
                        <li><Link to="/listing?query=&page=1&category=11" onClick={close}>{translate("nav.carAccessorise")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=20" onClick={close}>{translate("nav.exteriorAccessorise")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=17" onClick={close}>{translate("nav.carMats")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=12" onClick={close}>{translate("nav.wiresAndCables")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=18" onClick={close}>{translate("nav.Covers")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=19" onClick={close}>{translate("nav.carFirstAidKit")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=21" onClick={close}>{translate("nav.InternalLights")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=22" onClick={close}>{translate("nav.toolKits")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=23" onClick={close}>{translate("nav.sunCurtains")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=24" onClick={close}>{translate("nav.carSunShade")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=25" onClick={close}>{translate("nav.towingTools")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=16" onClick={close}>{translate("nav.bodyworkCleaningAndCare")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=14" onClick={close}>{translate("nav.carRefrigerator")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=15" onClick={close}>{translate("nav.childSeat")}</Link></li>

                    </ul>
                </li>
                <li className="has-children">
                    <a href="#">{translate("nav.carCare")}</a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">{translate("general.buttons.back")}</a></li>
                        <li><Link to="/listing?query=&page=1&category=34" onClick={close}>{translate("nav.motorCareLiquids")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=35" onClick={close}>{translate("nav.washCleanersAndPolishers")}</Link></li>
                    </ul>
                </li>

                <li><Link to="/listing?query=&page=1&category=36" onClick={close}>{translate("nav.sportsAndOutdoors")}</Link></li>
                <li className="sep"></li>
                <li className="nav-sm has-children">
                    <a href="#">{translate("nav.country")}</a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">{translate("general.buttons.back")}</a></li>
                        <li><a href="#">KSA</a></li>
                        <li><a href="#">Cairo</a></li>
                    </ul>
                </li>
                <li className="nav-sm">
                    <LanguageToggle
                        closeNav={close}
                        width={'100%'}
                        localize={localize}
                        translate={translate}
                        changeDefaultDirection={changeDefaultDirection}
                        getCountriesOnly={getCountriesOnly} /></li>
                <li className="sep"></li>
                <li className="nav-sm"><a href="#">{translate("nav.shippingAndDelivery")}</a></li>
                <li className="nav-sm"><a href="#">{translate("nav.returns")}</a></li>
                <li className="nav-sm"><a href="#">{translate("nav.contactUs")}</a></li>
                <li className="nav-sm"><a href="#">{translate("nav.privacyPolicy")}</a></li>
                <li className="nav-sm"><a href="#">{translate("nav.termsAndConditions")}</a></li>
                <li className="nav-sm"><a href="#" className="sponser">
                    <span><i></i></span><p>{translate("nav.oneOfTheIncubatedProjects")}</p>
                </a></li>
            </ul>
        </nav>
    );
}

const close = () => {
    closeNav();
}

export default Nav;
