import React from 'react';
import { Link } from "react-router-dom";
import { styles } from '../../../constants';
import Button from '../Button';

const Nav = ({ translate }) => {
    return (
        <nav className="cd-nav">
            <ul id="cd-primary-nav" className="cd-primary-nav">
                <li className="nav-sm has-children">
                    <a className="user-account-sm" href="#">
                        <span className="rounded-circle ">
                            <img alt="user" src="/img/user.svg" />
                        </span>
                        <p>Sign in<i></i>Join</p>
                    </a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <h6>Welcome Back</h6>
                        <div className="signin-list">
                            <li><a className="btn" href="#" >{translate("general.signin")} <i className={`icon-arrow-right`} /></a></li>
                            <li><a href="#"><i className="icon-facebook" /></a></li>
                            <li><a href="#"><img src="/img/google-icon.svg"></img></a></li>
                        </div>
                        <p>
                            {translate("dropdown.signup.message")}
                            <Link to="/signup">
                                {translate("dropdown.signup.link")}
                                <i className={`icon-arrow-right`} style={styles.arrow_right} />
                            </Link>
                        </p>
                    </ul>
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
                <li>
                    <Link to="/quotation-order">
                        {translate("nav.quotationOrder")}
                    </Link>

                </li>
                <li className="has-children">
                    <a href="#">{translate("nav.consumableParts")}</a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><Link to="/listing?query=&page=1&category=2">{translate("nav.oilFilter")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=3">{translate("nav.airFilter")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=6">{translate("nav.brakePads")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=4">{translate("nav.acFilter")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=5">{translate("nav.sparkPlugs")}</Link></li>
                    </ul>
                </li>
                <li className="has-children">

                    <Link to="/setting/addresses">
                        {translate("nav.oil")}
                    </Link>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><Link to="/listing?query=&page=1&category=7">{translate("nav.motorOil")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=8">{translate("nav.gearOil")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=27">{translate("nav.coolant")}</Link></li>
                    </ul>
                </li>

                <li><Link to="/listing?query=&page=1&category=13">{translate("nav.tires")}</Link></li>
                <li className="has-children">
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><Link to="/listing?query=&page=1&category=29">{translate("nav.handTools")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=30">{translate("nav.electricalTools")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=31">{translate("nav.tyreInflator")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=33">{translate("nav.repairEquipment")}</Link></li>
                    </ul>
                </li>
                <li className="has-children">
                    <a href="#">{translate("nav.accessorise")}</a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><Link to="/listing?query=&page=1&category=11">{translate("nav.carAccessorise")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=20">{translate("nav.exteriorAccessorise")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=17">{translate("nav.carMats")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=12">{translate("nav.wiresAndCables")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=18">{translate("nav.Covers")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=19">{translate("nav.carFirstAidKit")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=21">{translate("nav.InternalLights")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=22">{translate("nav.toolKits")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=23">{translate("nav.sunCurtains")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=24">{translate("nav.carSunShade")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=25">{translate("nav.towingTools")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=16">{translate("nav.bodyworkCleaningAndCare")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=14">{translate("nav.carRefrigerator")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=15">{translate("nav.childSeat")}</Link></li>

                    </ul>
                </li>
                <li className="has-children">
                    <a href="#">{translate("nav.carCare")}</a>
                    <ul className="cd-secondary-nav is-hidden">
                        <li className="go-back"><a href="#0">Back</a></li>
                        <li><Link to="/listing?query=&page=1&category=34">{translate("nav.motorCareLiquids")}</Link></li>
                        <li><Link to="/listing?query=&page=1&category=34">{translate("nav.washCleanersAndPolishers")}</Link></li>
                    </ul>
                </li>

                <li><Link to="/listing?query=&page=1&category=36">{translate("nav.sportsAndOutdoors")}</Link></li>
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