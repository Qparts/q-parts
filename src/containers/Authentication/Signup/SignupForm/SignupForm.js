import React, { Component, Fragment } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getTranslate } from "react-localize-redux";
import { Link } from "react-router-dom";

import SelectInput from '../../../../components/SelectInput/SelectInput';
import RenderField from '../../../../components/RenderField/RenderField';

import './SignupForm.css';

import * as validations from '../../../../utils';

import './SignupForm.css';
import Button from '../../../../components/UI/Button';

class SignupForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      passwordType: 'password',
      passwordText: 'Show',
      passwordIcon: 'icon-show-password'
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
    const { translate } = this.props;
    return (
      <form onSubmit={this.props.handleSubmit}>
        <div className="row signup-form__two-inputs">
          <div className="group-shadow-input"></div>
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
                clearable={false}
                options={this.props.countries}
                placeholder={translate("form.signup.placeholders.country")}
                validate={[validations.required]} />
            </div>
          </div>
        </div>
        <div className="form-group one_shadow-input password-strength">
          <Field
            hasPasswordStrength={true}
            label={translate("form.signup.password")}
            name="password"
            component={RenderField}
            type={this.state.passwordType}
            text={this.state.passwordText}
            icon={this.state.passwordIcon}
            placeholder={translate("form.signup.placeholders.password")}
            onTogglePassword={this.handleTogglePassword}
            validate={[validations.required]} />
          <label>Password Strength</label>
        </div>
        <div id="bottom">
          <p>By creating an account, you agree to
            <span>
              <Link to="/">Qetaa's Conditions of Use</Link> and
              <Link to="/"> Privacy Notice.</Link></span>
          </p>
          <Button
            className="btn-primary"
            type="submit"
            text={translate("form.signup.button")}
            icon="icon-arrow-right" />
        </div>
      </form>
    );
  }
}

SignupForm = reduxForm({
  form: 'SignupForm',
  enableReinitialize: true
})(SignupForm)

SignupForm = connect(
  state => ({
    initialValues: state.customer.detail,
    translate: getTranslate(state.localize),
  })
)(SignupForm)

export default SignupForm;