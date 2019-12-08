import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Field, reduxForm, getFormSubmitErrors } from 'redux-form';
import { Link } from "react-router-dom";

import RenderField from '../../../../components/RenderField/RenderField';

import './SignupForm.css';

import * as validations from '../../../../utils';
import { right } from '../../../../utils';

import './SignupForm.css';
import Button from '../../../../components/UI/Button';

class SignupForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      passwordType: 'password',
      passwordText: props.translate("general.buttons.show"),
      passwordIcon: 'icon-show-password',
    }
  }

  handleTogglePassword = () => {
    const { translate } = this.props
    this.setState({
      passwordType: this.state.passwordType === 'password' ? 'text' : 'password',
      passwordText: this.state.passwordText === translate("general.buttons.show") ? translate("general.buttons.hide") : translate("general.buttons.show"),
      passwordIcon: this.state.passwordIcon === 'icon-show-password' ? 'icon-hide-password' : 'icon-show-password',
    });
  }

  render() {
    const { translate, direction, setPasswordScore, currentLanguage } = this.props;
    const scoreWords = [
      translate("form.signup.passwordStrength.scoreWords.tooShort"),
      translate("form.signup.passwordStrength.scoreWords.weak"),
      translate("form.signup.passwordStrength.scoreWords.okay"),
      translate("form.signup.passwordStrength.scoreWords.good"),
      translate("form.signup.passwordStrength.scoreWords.strong"),
    ];

    return (
      <form onSubmit={this.props.handleSubmit} className="gray-input">
        <div className="input-sec">
          <div className="form-row">
            <div className="col">
              <Field
                hasFloatLabel
                name="firstName"
                type="text"
                placeholder={translate("form.signup.firstName")}
                label={translate("form.signup.firstName")}
                errorMessage={`${translate("general.enter")} ${translate("form.signup.firstName")}`}
                component={RenderField}
                validate={[validations.required]}
              />
            </div>
            <div className="col">
              <Field
                hasFloatLabel
                name="lastName"
                type="text"
                placeholder={translate("form.signup.lastName")}
                label={translate("form.signup.lastName")}
                errorMessage={`${translate("general.enter")} ${translate("form.signup.lastName")}`}
                component={RenderField}
                validate={[validations.required]}
              />
            </div>
          </div>
          <Field
            hasFloatLabel
            name="email"
            type="email"
            hasWarning={'email-validate'}
            errorMessage={this.props.submitErrors.email || null}
            warningMessage={'The email you entered is invalid'}
            placeholder={translate("form.signup.email")}
            label={translate("form.signup.email")}
            component={RenderField}
            validate={[validations.required, validations.email]}
          />
          <div className="password">
            <Field
              hasPasswordStrength={true}
              currentLanguage={currentLanguage}
              title={translate("form.signup.passwordStrength.title")}
              scoreWords={scoreWords}
              tooShortWord={translate("form.signup.passwordStrength.scoreWords.tooShort")}
              label={translate("form.signup.password")}
              name="password"
              component={RenderField}
              type={this.state.passwordType}
              text={this.state.passwordText}
              icon={this.state.passwordIcon}
              placeholder={translate("form.signup.placeholders.password")}
              onTogglePassword={this.handleTogglePassword}
              setPasswordScore={setPasswordScore}
              validate={[validations.required, validations.passwordScore]} />
          </div>
        </div>
        <div className="form-row submit-row">
          <div className="col-md">
            <p>{translate("form.signup.cp.title")} <Link to="/">{translate("form.signup.cp.linkOne")}</Link> {translate("general.and")} <Link to="/privacyPolicy"> {translate("form.signup.cp.linkTwo")}.</Link>
            </p>
          </div>
          <div className="col-md-auto">
            <Button
              className="btn btn-primary"
              type="submit"
              text={translate("form.signup.button")}
              icon={"icon-arrow-right"} />
          </div>
        </div>
      </form>
    );
  }
}

SignupForm = reduxForm({
  form: 'SignupForm'
})(SignupForm)

SignupForm = connect(
  state => ({
    passwordScore: state.customer.passwordScore,
    submitErrors: getFormSubmitErrors('SignupForm')(state)
  })
)(SignupForm)

export default SignupForm;
