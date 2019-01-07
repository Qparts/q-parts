import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTranslate } from "react-localize-redux";

import { routes } from '../../config/routes';
import RouteWithSubRoutes from '../../hoc/RouteWithSubRoutes';
import Layout from '../../components/Layout/Layout';

import { isAuth } from '../../utils'
import NetworkError from '../../components/NetworkError';
import { getVehicles, InitializeDefaultLang, getCountriesOnly } from '../../actions/apiAction';
import { LOCAL_LANGUAGES } from '../../constants';
import { selectCountry } from '../../actions/customerAction';
// import { changeDefaultDirection } from '../../actions/customerAction';

class Routes extends Component {
    constructor(props) {
        super(props);


        const defaultLanguage = props.customer.defaultLang || LOCAL_LANGUAGES[0].code;

        props.InitializeDefaultLang(defaultLanguage);
        props.getVehicles();
        props.getCountriesOnly(defaultLanguage);
    }
    render() {
        return (
            <Router>
                <Fragment>
                    <NetworkError error={this.props.error} />
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
                    // changeDefaultDirection={this.props.changeDefaultDirection}
                    >
                        <Switch>
                            {routes(isAuth(this.props.token)).map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                        </Switch>
                    </Layout>
                </Fragment>
            </Router>
        )
    }
}

const mapStateToProps = state => {
    const customer = state.customer.detail;
    return {
        customer,
        token: state.customer.token,
        vehicles: customer.vehicles,
        vehiclesFormat: state.customer.vehiclesFormat,
        selectedVehicle: state.customer.selectedVehicle,
        localize: state.localize,
        translate: getTranslate(state.localize),
        countriesOnly: state.api.countriesOnly,
        error: state.networkError.error,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // changeDefaultDirection: (lang) => dispatch(changeDefaultDirection(lang))
        InitializeDefaultLang: (defaultLanguage) => dispatch(InitializeDefaultLang(defaultLanguage)),
        getVehicles: () => dispatch(getVehicles()),
        getCountriesOnly: (defaultLanguage) => dispatch(getCountriesOnly(defaultLanguage)),
        selectCountry: (country) => dispatch(selectCountry(country))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
