import React, { Component, Fragment, createRef } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";

import SelectInput from '../../../../components/SelectInput/SelectInput';
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
      passwordText: 'Show',
      passwordIcon: 'icon-show-password',
    }
  }

  handleTogglePassword = () => {
    this.setState({
      passwordType: this.state.passwordType === 'password' ? 'text' : 'password',
      passwordText: this.state.passwordText === 'Show' ? 'Hide' : 'Show',
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
      <form onSubmit={this.props.handleSubmit}>
        <div className="row signup-form__two-inputs no-gutters">
          <div className="group-shadow-input group-shadow-div"></div>
          <div className="col-6">
            <div className="form-group">
              <Field
                label={translate("form.signup.firstName")}
                name="firstName"
                component={RenderField}
                type="text"
                placeholder={translate("form.signup.placeholders.firstName")}
                validate={[validations.required]} />
            </div>
          </div>
          <div className="col-6">
            <div className="form-group">
              <Field
                label={translate("form.signup.lastName")}
                name="lastName"
                component={RenderField}
                type="text"
                placeholder={translate("form.signup.placeholders.lastName")}
                validate={[validations.required]} />
            </div>
          </div>
        </div>
        <div className="one_shadow-input form-group">
          <Field
            label={translate("form.signup.email")}
            name="email"
            type="email"
            component={RenderField}
            placeholder={translate("form.signup.placeholders.email")}
            validate={[validations.required, validations.email]} />
        </div>
        <div id="country-city" className="row signup-form__two-inputs">
          <div className="col-12">
            <div className="form-group">
              <Field
                boxShadow={true}
                label={translate("form.signup.country")}
                name="countryId"
                component={SelectInput}
                options={validations.getFormattedSelect(this.props.countries, currentLanguage)}
                placeholder={translate("form.signup.placeholders.country")}
                validate={[validations.required]} />
            </div>
          </div>
        </div>
        <div className="form-group one_shadow-input password-strength">
          <Field
            hasPasswordStrength={true}
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
        <div id="bottom">
          <p>{translate("form.signup.cp.title")}
            <span>
              <Link className="btn-gray" to="/">{translate("form.signup.cp.linkOne")}</Link> {translate("general.and")}
              <Link className="btn-gray" to="/privacyPolicy"> {translate("form.signup.cp.linkTwo")}.</Link></span>
          </p>
          <Button
            className="btn btn-primary"
            type="submit"
            text={translate("form.signup.button")}
            icon={`icon-arrow-${right(direction)}`} />
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
    passwordScore: state.customer.passwordScore
  })
)(SignupForm)

export default SignupForm;
