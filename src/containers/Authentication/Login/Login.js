import React, { Component, Fragment } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import Button from '../../../components/UI/Button';

import RenderField from '../../../components/RenderField/RenderField';
import SocialMedia from '../SocialMedia/SocialMedia';
import PrivateRoute from '../../../components/PrivateRoute';
import ResetPassword from '../../../components/ResetPassword/ResetPassword';

import { login, sendSmsCode, resetPassword, socialMediaButton } from '../../../actions/customerAction';
import WithSocialMedia from '../../../hoc/WithSocialMedia';

import * as validations from '../../../utils';
import { getComponentName } from '../../../utils';


import { ON_SOCIAL_MEDIA_AUTH } from '../../../constants';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showResetPassword: false,
      rememberMe: ''
    }
  }


  handleSubmit = values => {
    const serverErrorField = "password"
    return this.props.login(values.email, values.password, serverErrorField, this.props.currentLanguage)
      .then(() => {
        this.props.toggle()
      });
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
  renderLogin = (login) => {
    const { translate } = this.props;

    return <Fragment>
      <div>
        {login}
        <SocialMedia
          title={translate("form.signin.socialMedia")}
          handleResponse={this.props.handleResponse}
          handleFailure={this.props.handleFailure} />
        <div id="sign-up-link">
          <p>{translate("form.signin.signup")}</p>
          <Button className="btn-link" text={translate("form.signin.joinUs")} onClick={this.handleChange} />
          <p>{translate("form.signin.here")}</p>
        </div>
      </div>
    </Fragment>
  }
  handleForgotPassword = () => {
    this.props.toggle();
  }

  render() {
    const { translate } = this.props;
    let login = (
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
            <label className="label-form">{translate("form.signin.rememberMe")}</label>
          </div>
          <Link
            className="label-form"
            to="/password/forgot-password"
            onClick={this.handleForgotPassword}>
            {translate("form.signin.forgotPassword")}
          </Link>
        </div>
        <Button className="btn-signin" text={translate("form.signin.button")} icon="icon-arrow-right" />
      </form>
    )
    return (
      <section id="login">
        {
          this.renderLogin(login)
        }
        <PrivateRoute
          path="/login/reset-password"
          fakeAuth={this.state.showResetPassword}
          translate={translate}
          component={ResetPassword}
          showPhoneNo={true}
          onSubmit={this.onResetPassword}
          redirectTo="/login" />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.customer.token,
    translate: getTranslate(state.localize),
    component: getComponentName(ON_SOCIAL_MEDIA_AUTH),
    currentLanguage: getActiveLanguage(state.localize).code,
    selectedCountry: state.customer.selectedCountry
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