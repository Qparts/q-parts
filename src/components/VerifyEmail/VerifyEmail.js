import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { onAccountVerify, resetPasswordToken } from '../../actions/customerAction';
import { getQuery } from '../../utils';

import './VerifyEmail.css';
import ForgotPassword from '../../containers/Authentication/ForgotPassword/ForgotPassword';


const activateAccountUrl = '/activate-email';
const resetPasswordUrl = '/password/reset-password';

class VerifyEmail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paramsKeys: Object.keys(getQuery(this.props.location)),
        }

        if (this.isActivateAccountUrl()) {
            this.props.onAccountVerify(getQuery(this.props.location));
        } else if (this.isResetPasswordUrl()) {
            this.props.resetPasswordToken(getQuery(this.props.location));
        }

    }

    isActivateAccountUrl = () => {
        return this.props.match.url === activateAccountUrl ? this.hasValidKeys(['code', 'email']) : false;
    }

    isResetPasswordUrl = () => {
        return this.props.match.url === resetPasswordUrl ? this.hasValidKeys(['code', 'email']) : false;
    }

    hasValidKeys = (keys) => {
        const bool = keys.length <= 1 ? this.state.paramsKeys.includes(keys[0]) : keys.reduce((prev, curr) => (
            this.state.paramsKeys.includes(prev) && this.state.paramsKeys.includes(curr)
        ));

        return bool;
    }

    render() {
        
        if (this.isActivateAccountUrl()) {
            return <Redirect to="/" />
        } else if (this.isResetPasswordUrl()) {
            return <ForgotPassword direction={this.props.direction} />
        } else {
            return <Redirect to="/" />
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAccountVerify: (query) => dispatch(onAccountVerify(query)),
        resetPasswordToken: (code) => dispatch(resetPasswordToken(code))
    }
}

export default connect(null, mapDispatchToProps)(VerifyEmail);