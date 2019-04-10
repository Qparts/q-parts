import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTranslate } from "react-localize-redux";

import { routes } from '../../config/routes';
import RouteWithSubRoutes from '../../hoc/RouteWithSubRoutes';
import Layout from '../../components/Layout/Layout';
import DirectionProvider from 'react-with-direction/dist/DirectionProvider';

import { isAuth } from '../../utils'
import loadStyle from '../../config/app-style';
import { loadGoogleAnalytics } from '../../config/google';
import NetworkError from '../../components/NetworkError';
import { getVehicles, InitializeDefaultLang, getCountriesOnly, getRegions } from '../../actions/apiAction';
import { selectCountry, onLogout } from '../../actions/customerAction';
import { changeDefaultDirection } from '../../actions/customerAction';
import RouterScrollToTop from '../../components/RouterScrollToTop';
import Nav from '../../components/UI/Nav';
import moment from 'moment';
import { clearCart } from '../../actions/cartAction';

class Routes extends Component {
    constructor(props) {
        super(props);

        const defaultLanguage = props.defaultLang || props.customer.defaultLang;

        props.InitializeDefaultLang(defaultLanguage)
        props.getVehicles();
        props.getCountriesOnly(defaultLanguage);
        props.changeDefaultDirection(defaultLanguage);
        props.getRegions(1);
        loadStyle(this.props.direction);
        loadGoogleAnalytics();
    }
    componentDidUpdate = (prevProps, prevState) => {
        const dateNow = moment();
        const expiredDate = moment(this.props.tokenExpire);
        const dateDiff = dateNow.diff(expiredDate, 'minutes');
        const oneHourLeft = -60;        

        if (dateDiff >= oneHourLeft) {
            this.props.onLogout()
            .then(() => {
                this.props.clearCart();
            })
        }

        if (prevProps.direction !== this.props.direction) {
            loadStyle(this.props.direction);
        }


    }

    getNavLeftStyle = () => {
        return this.props.direction === 'ltr'? 'nav-on-left': '';
    }

    render() {
        const { translate } = this.props
        return (
            <Router>
                <DirectionProvider direction={this.props.direction}>
                    <RouterScrollToTop>
                        <Fragment>
                            <NetworkError error={this.props.error} />
                            <main className={this.getNavLeftStyle()}>
                                <Layout
                                    isLoggedIn={isAuth(this.props.token)}
                                    fullName={`${this.props.customer.firstName} ${this.props.customer.lastName}`}
                                    vehicles={this.props.vehicles}
                                    localize={this.props.localize}
                                    translate={this.props.translate}
                                    selectedVehicle={this.props.selectedVehicle}
                                    countriesOnly={this.props.countriesOnly}
                                    getCountriesOnly={this.props.getCountriesOnly}
                                    selectCountry={this.props.selectCountry}
                                    changeDefaultDirection={this.props.changeDefaultDirection}
                                    direction={this.props.direction}
                                    cart={this.props.cart}
                                >
                                    <Switch>
                                        {routes(isAuth(this.props.token), this.props.direction, this.props.defaultLang, this.props.translate).map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                                    </Switch>
                                </Layout>
                                <div className="overlay-lg"></div>
                                <Link target="_blank" to="//wa.me/966508448856/" className="live-chat">
                                    <img className="whatsapp" src="/img/whatsapp-logo.svg" alt="whatsapp" />
                                    <p className="media-body">{translate("customerService.root.whatsApp.header")} <span>{translate("customerService.root.whatsApp.subHeader")}</span></p>
                                </Link>
                            </main>
                            <Nav
                                localize={this.props.localize}
                                changeDefaultDirection={this.props.changeDefaultDirection}
                                getCountriesOnly={this.props.getCountriesOnly}
                                direction={this.props.direction}
                                translate={this.props.translate}
                                isLoggedIn={isAuth(this.props.token)}
                                fullName={`${this.props.customer.firstName} ${this.props.customer.lastName}`} />
                        </Fragment>
                    </RouterScrollToTop>
                </DirectionProvider>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    const customer = state.customer.detail;
    return {
        customer,
        token: state.customer.token,
        tokenExpire: state.customer.tokenExpire,
        vehicles: customer.vehicles,
        selectedVehicle: state.customer.selectedVehicle,
        defaultLang: state.customer.defaultLang,
        localize: state.localize,
        translate: getTranslate(state.localize),
        countriesOnly: state.api.countriesOnly,
        error: state.networkError.error,
        direction: state.customer.direction,
        cart: state.cart.purchasedItems
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeDefaultDirection: (lang) => dispatch(changeDefaultDirection(lang)),
        InitializeDefaultLang: (defaultLanguage) => dispatch(InitializeDefaultLang(defaultLanguage)),
        getVehicles: () => dispatch(getVehicles()),
        getRegions: (countryId) => dispatch(getRegions(countryId)),
        getCountriesOnly: (defaultLanguage) => dispatch(getCountriesOnly(defaultLanguage)),
        selectCountry: (country) => dispatch(selectCountry(country)),
        onLogout: () => dispatch(onLogout()),
        clearCart: () => dispatch(clearCart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
