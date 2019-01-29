import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { SmallScreen, MediumScreen } from '../../../components/Device/index.js'
import RenderField from '../../../components/RenderField/RenderField';
import { connect } from 'react-redux';
import * as validations from '../../../utils';
import { right } from '../../../utils';
import { getQuery } from '../../../utils';
//Router
import PrivateRoute from '../../../components/PrivateRoute/index.js'
import { Switch, Route } from 'react-router-dom';

import ConfirmSignUp from './ConfirmSignUp/ConfirmSignUp'
import CustomerService from '../../../components/CustomerService/CustomerService';
import { resetPassword, updatePassword } from '../../../actions/customerAction.js';

const forgotPasswordUrl = '/password/forgot-password';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    }
  }
  componentDidMount = () => {
    this.setState({
      auth: !this.state.auth
    })
  }
  confirmPass = values => {
    const { match: { url } } = this.props;

    if (url === forgotPasswordUrl) {
      this.props.resetPassword(values)
        .then(() => {
          this.props.history.push('/');
        });
    } else {
      const data = { ...values, query: getQuery(this.props.location) }
      this.props.updatePassword(data)
        .then(() => {
          this.props.history.push('/');
        })
    }
  }

  getLabel = (forgotLabel, updateLabel) => {
    const { match: { url } } = this.props;
    return url === forgotPasswordUrl ? forgotLabel : updateLabel
  }

  renderPageContent = () => {
    return (
      <Fragment>
        <MediumScreen>
          <section id="forgot-password">
            <div className="content">
              <img className="upload-img" src="/img/upload-img.svg" alt="upload-img" />
              <p className="p"><span>Password </span> Recovery</p>
              <h5>You can recover your lost account information using the form below.Please enter <br />valid e-mail address, your account information will be mailed to you shortly</h5>
              <form onSubmit={this.props.handleSubmit(this.confirmPass)}>
                <div className="form-group">
                  <Field
                    label={this.getLabel('Email', 'Password')}
                    name={this.getLabel('email', 'password')}
                    component={RenderField}
                    type={this.getLabel('text', 'password')}
                    placeholder={this.getLabel('mail@user.com', 'new password')}
                    validate={[validations.required]} />
                  <button type="submit" className="btn-primary">Send<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
                </div>
              </form>
              <div>
                <a className="bg-whatsapp">
                  <CustomerService
                    messages={["Have a Question?", "Ask a Special"]}
                    url="" />
                </a>

              </div>
            </div>
          </section>
        </MediumScreen>
        <SmallScreen>
          <section id="forgot-password-mobile">
            <div className="content">
              <img className="upload-img" src="/img/upload-img.svg" alt="upload-img" />
              <p className="p"><span>Password </span> Recovery</p>
              <h5>You can recover your lost account information using the form below.Please enter valid e-mail address, your account information will be mailed to you shortly</h5>
              <form onSubmit={this.props.handleSubmit(this.confirmPass)}>
                <div className="form-group">
                  <Field
                    label={this.getLabel('Email', 'Password')}
                    name={this.getLabel('email', 'password')}
                    component={RenderField}
                    type={this.getLabel('text', 'password')}
                    placeholder={this.getLabel('mail@user.com', 'new password')}
                    validate={[validations.required]} />
                  <button type="submit" className="btn-primary">Send<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
                </div>
              </form>
            </div>
            <a className="bg-whatsapp">
              <img src="/img/whatsapp-logo.svg" alt="whatsapp" />
            </a>
          </section>
        </SmallScreen>
      </Fragment>
    )
  }
  render() {
    return (
      <Switch>
        <Route path={'/password/forgot-password'} >
          {this.renderPageContent()}
        </Route>
        <Route path={'/password/reset-password'} >
          {this.renderPageContent()}
        </Route>
        <PrivateRoute
          path={'/password/forgot-password/confirm'}
          component={ConfirmSignUp}
          exact
          fakeAuth={this.state.auth}
          redirectTo="/" />
      </Switch>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: (email) => dispatch(resetPassword(email)),
    updatePassword: (data) => dispatch(updatePassword(data)),
  }
}

ForgotPassword = reduxForm({
  form: 'ForgotPassword',
  enableReinitialize: true
})(ForgotPassword)

export default connect(null, mapDispatchToProps)(withRouter(ForgotPassword));
