import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form';
import {SmallScreen, MediumScreen} from '../../../components/Device/index.js'
import RenderField from '../../../components/RenderField/RenderField';
import * as validations from '../../../utils';
//Router
import PrivateRoute from '../../../components/PrivateRoute/index.js'
import { Switch,Route } from 'react-router-dom';

import ConfirmSignUp from './ConfirmSignUp/ConfirmSignUp'
import CustomerService from '../../../components/CustomerService/CustomerService';

class ForgotPassword extends Component {
  constructor(props){
    super(props);
    this.state={
      auth: false
    }
  }
  componentDidMount = () => {
    this.setState({
      auth: !this.state.auth
    })
  }
  confirmPass = () => {
    console.log('raeda')
    this.props.history.push('/forgotPassword/confirm')
  }
  render () {
    return(
      <Switch>
        <Route path={'/forgotPassword'} exact >
          <Fragment>
            <MediumScreen>
              <section id="forgot-password">
                  <div className="content">
                      <img className="upload-img" src="/img/upload-img.svg" alt="upload-img" />
                      <p className="p"><span>Password </span> Recovery</p>
                      <h5>You can recover your lost account information using the form below.Please enter <br/>valid e-mail address, your account information will be mailed to you shortly</h5>
                      <form onSubmit={this.confirmPass}>
                          <div className="form-group">
                            <Field
                              label="Email"
                              name="email"
                              component={RenderField}
                              type="text"
                              placeholder="mail@user.com"
                              validate={[validations.required]} />
                            <button type="submit" className="btn-primary">Send<i className="icon-arrow-right" /></button>
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
                    <form onSubmit={this.confirmPass}>
                        <div className="form-group">
                          <Field
                            label="Email"
                            name="email"
                            component={RenderField}
                            type="text"
                            placeholder="mail@user.com"
                            validate={[validations.required]} />
                          <button type="submit" className="btn-primary">Send<i className="icon-arrow-right" /></button>
                        </div>
                    </form>
                </div>
                <a className="bg-whatsapp">
                  <img src="/img/whatsapp-logo.svg" alt="whatsapp"/>
                </a>
              </section>
            </SmallScreen>
          </Fragment>
        </Route>
        <PrivateRoute
          path={'/forgotPassword/confirm'}
          component={ConfirmSignUp}
          exact
          fakeAuth={this.state.auth}
          redirectTo="/" />
      </Switch>
    )
  }
}

ForgotPassword = reduxForm({
  form: 'ForgotPassword',
  enableReinitialize: true
})(ForgotPassword)
export default ForgotPassword;
