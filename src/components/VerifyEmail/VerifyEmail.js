import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { onAccountVerify } from '../../actions/customerAction';
import queryString from 'qs';

import './VerifyEmail.css';

const verified = 'V';

class VerifyEmail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            paramsKeys: Object.keys(this.getQuery()),
            verified: null
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.customer.status !== prevProps.customer.status) {
            this.setState({
                verified: this.props.customer.status === verified
            })
        }
    }

    componentWillMount = () => {
        this.props.onAccountVerify(this.getQuery());
    }


    getQuery = () => (
        queryString.parse(this.props.location.search.slice(1))
    );

    renderAccountValidated = () => {
        if (this.state.verified) {
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
        const isValidKey = this.state.paramsKeys.includes('code') && this.state.paramsKeys.includes('email');
        return (
            isValidKey ? this.renderAccountValidated() : <Redirect to="/" />
        )
    }
}

const mapStateToProps = state => {
    return {
        customer: state.customer.detail
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAccountVerify: (query) => dispatch(onAccountVerify(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);