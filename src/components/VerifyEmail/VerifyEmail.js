import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { onAccountVerify, resetPasswordToken } from '../../actions/customerAction';
import { getQuery } from '../../utils';

import './VerifyEmail.css';


const verified = 'V';
const activateAccountUrl = '/activate-email';
const resetPasswordUrl = '/reset-password';

class VerifyEmail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paramsKeys: Object.keys(getQuery(this.props.location)),
            verified: null
        }

        if (this.props.match.url === activateAccountUrl) {
            this.props.onAccountVerify(getQuery(this.props.location));
        } else {
            this.props.resetPasswordToken(getQuery(this.props.location));
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.customer.status !== prevProps.customer.status) {
            this.setState({
                verified: this.props.customer.status === verified
            })
        }
    }

    hasValidKeys = (keys) => {
        const bool = keys.length <= 1 ? this.state.paramsKeys.includes(keys[0]) : keys.reduce((prev, curr) => (
            this.state.paramsKeys.includes(prev) && this.state.paramsKeys.includes(curr)
        ));

        return bool;
    }

    renderAccountValidated = (verified) => {
        if (verified) {
            return (
                <div className="VerifyEmail-container">
                    <p>Your account has been successfully verified</p>
                </div>
            );
        } else {
            return <Redirect to="/" />;
        }

    };

    render() {
        if (this.props.match.url === activateAccountUrl) {
            return (
                this.hasValidKeys(['code', 'email']) ? this.renderAccountValidated(this.state.verified) : <Redirect to="/" />
            )
        } else {
            return (
                this.hasValidKeys(['code']) ? this.renderAccountValidated(true) : <Redirect to="/" />
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        customer: state.customer.detail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAccountVerify: (query) => dispatch(onAccountVerify(query)),
        resetPasswordToken: (token) => dispatch(resetPasswordToken(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);