import React from 'react';
import { Link } from "react-router-dom";

const Nav = ({ translate }) => {
    return (
        <nav className="cd-nav">
            <ul id="cd-primary-nav" className="cd-primary-nav">
                <li className="nav-sm">
                    <a className="user-account-sm" href="#">
                        <span className="rounded-circle ">
                            <img alt="user" src="/img/user.svg" />
                        </span>
                        <p>Sign in<i></i>Join</p>
                    </a>
                </li>
                <li className="nav-sm">
                    <a href="#">
                        <i className="icon-home"></i> home
  </a>
                </li>
                <li className="nav-sm">
                    <a href="#">
                        <i className="icon-send"></i> Requests
  </a>
                </li>
                <li className="nav-sm">
                    <a href="#">
                        <i className="icon-delivered-step"></i> Orders
  </a>
                </li>
                <li className="nav-sm">
                    <a href="#">
                        <i className="icon-heart"></i> Wish List
  </a>
                </li>
                <li className="sep"></li>
                <li><a href="#">{translate("nav.quotationOrder")}</a></li>
                <li className="has-children">
                    <a href="#">{translate("nav.consumableParts")}</a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><a href="#">{translate("nav.oilFilter")}</a></li>
                        <li><a href="#">{translate("nav.airFilter")}</a></li>
                        <li><a href="#">{translate("nav.brakePads")}</a></li>
                    </ul>
                </li>
                <li className="has-children">
                    {/* <a href="#">{translate("nav.oil")}</a> */}
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><a href="#">{translate("nav.motorOil")}</a></li>
                        <li><a href="#">{translate("nav.gearOil")}</a></li>
                        <li><a href="#">{translate("nav.grease")}</a></li>
                    </ul>
                </li>
                <li><a href="#">Tires</a></li>
                <li className="has-children">
                    <a href="#">{translate("nav.tools")}</a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><a href="#">{translate("nav.handTools")}</a></li>
                        <li><a href="#">{translate("nav.electricalTools")}</a></li>
                        <li><a href="#">{translate("nav.tyreInflator")}</a></li>
                        <li><a href="#">{translate("nav.repairEquipment")}</a></li>
                    </ul>
                </li>
                <li className="has-children">
                    <a href="#">{translate("nav.accessorise")}</a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><a href="#">{translate("nav.carAccessorise")}</a></li>
                        <li><a href="#">{translate("nav.exteriorAccessorise")}</a></li>
                        <li><a href="#">{translate("nav.carMats")}</a></li>
                        <li><a href="#">{translate("nav.wiresAndCables")}</a></li>
                        <li><a href="#">{translate("nav.Covers")}</a></li>
                        <li><a href="#">{translate("nav.carFirstAidKit")}</a></li>
                        <li><a href="#">{translate("nav.InternalLights")}</a></li>
                        <li><a href="#">{translate("nav.toolKits")}</a></li>
                        <li><a href="#">{translate("nav.sunCurtains")}</a></li>
                        <li><a href="#">{translate("nav.carSunShade")}</a></li>
                        <li><a href="#">{translate("nav.towingTools")}</a></li>
                        <li><a href="#">{translate("nav.bodyworkCleaningAndCare")}</a></li>
                        <li><a href="#">{translate("nav.carRefrigerator")}</a></li>
                        <li><a href="#">{translate("nav.childSeat")}</a></li>
                    </ul>
                </li>
                <li className="has-children">
                    <a href="#">{translate("nav.carCare")}</a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><a href="#">{translate("nav.motorCareLiquids")}</a></li>
                        <li><a href="#">{translate("nav.washCleanersAndPolishers")}</a></li>
                    </ul>
                </li>

                <li><a href="#">{translate("nav.sportsAndOutdoors")}</a></li>
                <li className="sep"></li>
                <li className="nav-sm has-children">
                    <a href="#">{translate("nav.country")}</a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><a href="#">KSA</a></li>
                        <li><a href="#">Cairo</a></li>
                    </ul>
                </li>
                <li className="nav-sm"><a className="lang" href="#">العربية</a></li>
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

export default Nav;