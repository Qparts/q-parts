import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTranslate } from "react-localize-redux";

import { routes } from '../../config/routes';
import RouteWithSubRoutes from '../../hoc/RouteWithSubRoutes';
import Layout from '../../components/Layout/Layout';

import { isAuth } from '../../utils'
import loadStyle from '../../config/app-style';
import NetworkError from '../../components/NetworkError';
import { getVehicles, InitializeDefaultLang, getCountriesOnly } from '../../actions/apiAction';
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

        props.getVehicles();
        props.getCountriesOnly(defaultLanguage);
        props.changeDefaultDirection(defaultLanguage);
        loadStyle(this.props.direction);
    }
    componentDidUpdate = (prevProps, prevState) => {
        const dateNow = moment();
        const expireHours = moment(this.props.tokenExpire);
        const dateDiff = expireHours.diff(dateNow);
        const hoursLeft = moment(dateDiff).format("h");
        const oneHourLeft = 1;

        if (hoursLeft === oneHourLeft) {
            this.props.onLogout();
            this.props.clearCart();
        }        

        if (prevProps.direction !== this.props.direction) {
            loadStyle(this.props.direction);
        }


    }

    render() {
        return (
            <Router>
                <RouterScrollToTop>
                    <Fragment>
                        <NetworkError error={this.props.error} />
                        <main className="nav-on-left">
                            <Layout
                                isLoggedIn={isAuth(this.props.token)}
                                fullName={`${this.props.customer.firstName} ${this.props.customer.lastName}`}
                                vehicles={this.props.vehicles}
                                localize={this.props.localize}
                                translate={this.props.translate}
                                vehiclesFormat={this.props.vehiclesFormat}
                                selectedVehicle={this.props.selectedVehicle}
                                countriesOnly={this.props.countriesOnly}
                                getCountriesOnly={this.props.getCountriesOnly}
                                selectCountry={this.props.selectCountry}
                                changeDefaultDirection={this.props.changeDefaultDirection}
                                direction={this.props.direction}
                            >
                                <Switch>
                                    {routes(isAuth(this.props.token), this.props.direction).map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                                </Switch>
                            </Layout>
                            <div className="overlay-lg"></div>
                            <a href="#" className="live-chat">
                                <img className="whatsapp" src="/img/whatsapp-logo.svg" alt="whatsapp" />
                                <p className="media-body">Have a Question? <span>Ask a Specialis</span></p>
                            </a>
                        </main>
                        <Nav
                            translate={this.props.translate}
                            isLoggedIn={isAuth(this.props.token)}
                            fullName={`${this.props.customer.firstName} ${this.props.customer.lastName}`} />
                    </Fragment>
                </RouterScrollToTop>
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
        vehiclesFormat: state.customer.vehiclesFormat,
        selectedVehicle: state.customer.selectedVehicle,
        defaultLang: state.customer.defaultLang,
        localize: state.localize,
        translate: getTranslate(state.localize),
        countriesOnly: state.api.countriesOnly,
        error: state.networkError.error,
        direction: state.customer.direction,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeDefaultDirection: (lang) => dispatch(changeDefaultDirection(lang)),
        // InitializeDefaultLang: (defaultLanguage) => dispatch(InitializeDefaultLang(defaultLanguage)),
        getVehicles: () => dispatch(getVehicles()),
        getCountriesOnly: (defaultLanguage) => dispatch(getCountriesOnly(defaultLanguage)),
        selectCountry: (country) => dispatch(selectCountry(country)),
        onLogout: () => dispatch(onLogout()),
        clearCart: () => dispatch(clearCart()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
