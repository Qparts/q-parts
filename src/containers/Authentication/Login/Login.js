import React, { Component, Fragment } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import { Dialog } from 'primereact/components/dialog/Dialog';
import Button from '../../../components/UI/Button';

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
import Title from '../../../components/UI/Title';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginOrSignUp: 1,
      showResetPassword: false,
      rememberMe: ''
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

  handleRememberMe = e => {
    this.setState({ rememberMe: e.value })
  }

  onResetPassword = values => {
    const serverErrorField = "code"
    return this.props.resetPassword(values, serverErrorField)
      .then(() => {
        this.props.history.push('/');
      });
  }
  renderLogin = (login, dialog) => {
    const { loginOrSignUp } = this.state;
    const { translate } = this.props;
    const { match } = this.props;

    return <Fragment>
      {
        match.url === '/' ? null :
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
      }
      {
        loginOrSignUp === 1 &&
        <Fragment>
          <div>
            {login}
            <SocialMedia
              title={translate("form.signin.socialMedia")}
              handleResponse={this.props.handleResponse}
              handleFailure={this.props.handleFailure} />
            <div id="sign-up">
              <p>{translate("form.signin.signup")}</p>
              <Button className="btn-link" text={translate("form.signin.joinUs")} onClick={this.handleChange} />
              <p>{translate("form.signin.here")}</p>
            </div>
          </div>
          {dialog}
        </Fragment>
      }
    </Fragment>
  }

  render() {
    const { translate } = this.props;
    let login = (
      <Fragment>
        <Title header={translate("dialog.signin.title")} />
        <form className="d-flex flex-column" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
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
            <div>
              <RadioButton value={true} name="rememberMe" onChange={this.handleRememberMe} checked={true === this.state.rememberMe} />
              <label>{translate("form.signin.rememberMe")}</label>
            </div>
            <button
              onClick={this.props.onShowDialog}
              type="button"
              className="btn-link">
              {translate("form.signin.forgotPassword")}
            </button>
          </div>
          <Button className="btn-primary" text={translate("form.signin.button")} icon="icon-arrow-right" />
        </form>
      </Fragment>
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
        <section id="login">
          <div className="container-fluid">
            <Route path="/login" exact={true} render={() => {
              return (
                this.renderLogin(login, dialog)
              )
            }} />
            <Route path="/" exact={true} render={() => {
              return (
                this.renderLogin(login, dialog)
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
          </div>
        </section>
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

const WithLogin = withRouter(WithSocialMedia(Login));
export default connect(mapStateToProps, mapDispatchToProps)(WithLogin);