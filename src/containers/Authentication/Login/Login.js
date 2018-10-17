import React, { Component, Fragment } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import { Button } from 'primereact/components/button/Button';
import { Dialog } from 'primereact/components/dialog/Dialog';

import RenderField from '../../../components/RenderField/RenderField';
import TabContainer from '../../../components/UI/TabContainer';
import SocialMedia from '../SocialMedia/SocialMedia';
import VerificationNumber from '../../../components/VerificationNumber/VerificationNumber';
import PrivateRoute from '../../../components/PrivateRoute';
import ResetPassword from '../../../components/ResetPassword/ResetPassword';

import { login, sendSmsCode, resetPassword, socialMediaButton } from '../../../actions/customerAction';
import WithSocialMedia from '../../../hoc/WithSocialMedia';

import * as validations from '../../../utils';
import { getComponentName } from '../../../utils';


import './Login.css';
import { ON_SOCIAL_MEDIA_LOGIN } from '../../../constants';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginOrSignUp: 1,
      showResetPassword: false
    }
  }


  handleSubmit = values => {
    const serverErrorField = "password"
    return this.props.login(values.email, values.password, serverErrorField, this.props.currentLanguage);
  }

  handleChange = (event) => {
    this.props.history.push('/signup')
  };

  onConfirmDialog = values => {
    return this.props.sendSmsCode(values, this.props.currentLanguage)
      .then(() => {
        this.props.onHide();
        this.setState({
          showResetPassword: true
        });
        this.props.history.push('/login/reset-password');
      });
  }

  onResetPassword = values => {
    const serverErrorField = "code"
    return this.props.resetPassword(values, serverErrorField)
      .then(() => {
        this.props.history.push('/');
      });
  }

  render() {
    const { loginOrSignUp } = this.state;
    const { translate } = this.props;
    let login = (
      <form className="Login-container" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
        <div>
          <div className="form-group">
            <Field
              label={translate("form.signin.email")}
              name="email"
              component={RenderField}
              type="text" placeholder={translate("form.signin.placeholders.email")}
              validate={[validations.required, validations.email]} />
          </div>
          <div className="form-group">
            <Field
              label={translate("form.signin.password")}
              name="password"
              component={RenderField}
              type="password" placeholder={translate("form.signin.placeholders.password")}
              validate={[validations.required]} />
          </div>
          <div>
            <Button label={translate("form.signin.button")} icon="" />
            <button
              onClick={this.props.onShowDialog}
              type="button"
              className="btn btn-sm btn-link">
              {translate("form.signin.forgotPassword")}
            </button>
          </div>
        </div>
      </form>
    )
    const dialog =
      <Dialog header={translate("dialog.passwordRecovery.title")} visible={this.props.visible} minWidth={500} modal={true} onHide={this.props.onHide}>
        <div className="Signup-verification_number">
          <VerificationNumber
            label={translate("dialog.passwordRecovery.subTitle")}
            name="mobile"
            placeholder="Mobile number"
            submitButton={translate("general.buttons.confirm")}
            onSubmit={this.onConfirmDialog}
          />
        </div>
      </Dialog>
    return (
      <Switch>
        <Route path="/login" exact={true} render={() => {
          return (
            <Fragment>
              <Paper>
                <Tabs
                  value={loginOrSignUp}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={this.handleChange}
                  fullWidth
                  centered >
                  <Tab label={translate("form.signin.tabs.tabOne")} />
                  <Tab label={translate("form.signin.tabs.tabTwo")} />
                </Tabs>
              </Paper>
              {
                loginOrSignUp === 1 &&
                <TabContainer>
                  <div className="Login-container">
                    {login}
                    <hr />
                    <SocialMedia
                      handleResponse={this.props.handleResponse}
                      handleFailure={this.props.handleFailure} />
                  </div>
                  {dialog}
                </TabContainer>
              }
            </Fragment>
          )
        }} />

        <PrivateRoute
          path="/login/reset-password"
          fakeAuth={this.state.showResetPassword}
          translate={translate}
          component={ResetPassword}
          showPhoneNo={true}
          onSubmit={this.onResetPassword}
          redirectTo="/login" />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.customer.token,
    translate: getTranslate(state.localize),
    component: getComponentName(ON_SOCIAL_MEDIA_LOGIN),
    currentLanguage: getActiveLanguage(state.localize).code,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login,
    sendSmsCode,
    resetPassword,
    socialMediaButton
  }, dispatch)
}

Login = reduxForm({
  form: 'Login'
})(Login)

const WithLogin = WithSocialMedia(Login);
export default connect(mapStateToProps, mapDispatchToProps)(WithLogin);