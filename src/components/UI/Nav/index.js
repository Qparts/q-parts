/* eslint-disable jsx-a11y/href-no-hash */
import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { closeNav } from '../../../utils';
import LanguageToggle from '../../LanguageToggle';
import GarageDropDownMenueSm from '../../GarageDropDownMenueSm/GarageDropDownMenueSm';

const Nav = (
    {
        translate, isLoggedIn, fullName, localize, changeDefaultDirection,
        getCountriesOnly, quotations
    }) => {

    const getReplayCounter = () => {
        return quotations.completed.filter(reply => !reply.read).length;
    }

    let hasNoNewReply = quotations.completed.every(reply => reply.read);

    const userSettingPages = isLoggedIn ? <Fragment>
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
                        <GarageDropDownMenueSm/>
                <li className="nav-sm">
                    <Link className={hasNoNewReply ? '' : 'notification'} to="/setting/quotations" onClick={close}>
                        <i className="icon-send"></i> {translate("navBar.quotations")}
                        {getReplayCounter() > 0 && <span>{getReplayCounter()}</span>}
                    </Link>
                </li>
                <li className="nav-sm">
                    <Link to="/setting/wishlist" onClick={close}>
                        <i className="icon-heart"></i> {translate("navBar.wishlist")}
                    </Link>
                </li>
                {userSettingPages}
                <li className="sep"></li>
                <li>
                  <Link to="#" onClick={close}>{translate("nav.vehicleParts")}</Link>
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
                        <li><Link to="/listing?query=&page=1&category=34" onClick={close}>{translate("nav.motorCareLiquids")}</Link></li>
                    </ul>
                </li>
                <li className="has-children">
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">{translate("general.buttons.back")}</a></li>
                        <li><Link to="/listing?query=&page=1&category=29" onClick={close}>{translate("nav.handTools")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=30" onClick={close}>{translate("nav.electricalTools")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=31" onClick={close}>{translate("nav.tyreInflator")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=33" onClick={close}>{translate("nav.repairEquipment")}</Link></li>
                    </ul>
                </li>

                <li >
                    <a href="#">{translate("nav.tires")}</a>
                </li>

                <li className="has-children">
                    <a href="#">{translate("nav.accessorise")}</a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">{translate("general.buttons.back")}</a></li>
                        <li><Link to="/listing?query=&page=1&category=12" onClick={close}>{translate("nav.wiresAndCables")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=19" onClick={close}>{translate("nav.carFirstAidKit")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=17" onClick={close}>{translate("nav.carMats")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=16" onClick={close}>{translate("nav.bodyworkCleaningAndCare")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=15" onClick={close}>{translate("nav.childSeat")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=35" onClick={close}>{translate("nav.washCleanersAndPolishers")}</Link></li>
                    </ul>
                </li>

                <li>
                    <a href="#">{translate("nav.sportsAndOutdoors")}</a>
                </li>

                <li>
                    <a href="#">{translate("nav.quotationOrder")}</a>
                </li>
                <li className="sep"></li>
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
                <li className="nav-sm"><a href="#">{translate("nav.privacyPolicy")}</a></li>
                <li className="nav-sm"><a href="#">{translate("nav.termsAndConditions")}</a></li>
                <li className="sep"></li>
                <li className="nav-sm">
                </li>
                <li className="nav-sm social-footer">
                  <span>{translate("footer.socialMediaContact.title")}</span>
                  <a href="#"><i className="icon-twitter"></i></a>
                  <a href="#"><i className="icon-facebook"></i></a>
                  <a href="#"><i className="icon-linked-in"></i></a>
                </li>

            </ul>
        </nav>
    );
}

const close = () => {
    closeNav();
}

export default Nav;
