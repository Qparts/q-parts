import React, { Component, Fragment, createRef } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from "react-router-dom";
import CustomLink from '../../../../components/UI/Link';

import SelectInput from '../../../../components/SelectInput/SelectInput';
import RenderField from '../../../../components/RenderField/RenderField';

import './SignupForm.css';

import * as validations from '../../../../utils';
import { right } from '../../../../utils';

import './SignupForm.css';
import Button from '../../../../components/UI/Button';

import ReactPasswordStrength from 'react-password-strength';

class SignupForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      passwordType: 'password',
      passwordText: 'Show',
      passwordIcon: 'icon-show-password',
    }
    this.passwordStrengthRef = createRef();
  }

  handleTogglePassword = () => {
    this.setState({
      passwordType: this.state.passwordType === 'password' ? 'text' : 'password',
      passwordText: this.state.passwordText === 'Show' ? 'Hide' : 'Show',
      passwordIcon: this.state.passwordIcon === 'icon-show-password' ? 'icon-hide-password' : 'icon-show-password',
    });
  }

  componentDidMount () {
    let passwordParent = this.passwordStrengthRef.current.reactPasswordStrengthInput.offsetParent;
    var passwordLabelText = document.createTextNode("Password");
    var label = document.createElement('label');
    label.appendChild(passwordLabelText);
    passwordParent.insertBefore(label, passwordParent.childNodes[1]);

    var barBg = document.createElement('p');
    passwordParent.insertBefore(barBg, passwordParent.childNodes[3]);
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

    const userCountry = [
    	{ value: 1, label: "KSA" },
    	{ value: 2, label: "Egypt" },
    	{ value: 3, label: "UAE" },
    ];
    const groupedCountry = [
    	{
    		options: userCountry,
    	},
    ];
    const formatCountryLabel = () => (
    	<div className="placeholder">
    		<span>Select Country</span>
    	</div>
    );
    const userCity = [
      { value: 1, label: "Cairo" },
      { value: 2, label: "Giza" },
      { value: 3, label: "Qalyubia" },
    ];
    const groupedCity = [
      {
        options: userCity,
      },
    ];
    const formatCityLabel = () => (
      <div className="placeholder">
        <span>Select Country</span>
      </div>
    );
    return (
      <form onSubmit={this.props.handleSubmit} className="gray-input">
        <div className="input-sec">
          <div className="form-row">
            <div className="col">
              <div className="has-float-label error">
                <input name="firstName" type="text" className="form-control" placeholder={translate("form.signup.firstName")} />
                <label>{translate("form.signup.firstName")}</label>
                <p className="error-text">Enter {translate("form.signup.firstName")}</p>
              </div>
            </div>
            <div className="col">
              <div className="has-float-label">
                <input name="lastName" type="text" className="form-control" placeholder={translate("form.signup.lastName")} />
                <label>{translate("form.signup.lastName")}</label>
              </div>
            </div>
          </div>
          <div className="has-float-label">
            <input name="email" type="email" className="form-control" placeholder={translate("form.signup.email")} />
            <label>{translate("form.signup.email")}</label>
          </div>
          <div className="has-float-label warning email-validate">
            <input name="email" type="email" className="form-control" placeholder={translate("form.signup.email")} />
            <label>{translate("form.signup.email")}</label>
            <i className="icon-alert"></i>
            <span className="validate-text">The email you entered is invalid</span>
          </div>
          <div className="has-float-label email-validate true">
            <input name="email" type="email" className="form-control" placeholder={translate("form.signup.email")} />
            <label>{translate("form.signup.email")}</label>
            <i className="icon-checked"></i>
          </div>
          <div className="form-row">
            <div className="col">
              <div className="float-label">
                <Field
                  label={translate("form.signup.country")}
                  name="country"
                  placeholder={" "}
                  component={SelectInput}
                  options={groupedCountry}
                  formatGroupLabel={formatCountryLabel}
                  />
              </div>
            </div>
            <div className="col">
              <div className="float-label">
                <Field
                  label="City"
                  name="city"
                  placeholder=" "
                  component={SelectInput}
                  options={groupedCity}
                  formatGroupLabel={formatCityLabel}
                  />
              </div>
            </div>
          </div>
          <div className="password">
            <ReactPasswordStrength
              ref={this.passwordStrengthRef}
              className="has-float-label"
              minLength={5}
              minScore={2}
              scoreWords={['weak', 'okay', 'good', 'strong', 'stronger']}
              inputProps={{ name: "password_input", autoComplete: "off", className: "form-control",  placeholder: "password" }}
              />
              <CustomLink
                className="toggle-password"
                to="#"
                text={this.state.passwordText}
                icon={this.state.passwordIcon}
                isReverseOrder
                onClick={this.handleTogglePassword}
              />
          </div>
        </div>
        <div className="form-row submit-row">
          <div className="col-md">
            <p>{translate("form.signup.cp.title")} <Link to="/">{translate("form.signup.cp.linkOne")}</Link> {translate("general.and")} <Link to="/"> {translate("form.signup.cp.linkTwo")}.</Link>
            </p>
          </div>
          <div className="col-md-auto">
            <Button
              className="btn btn-primary"
              type="submit"
              text={translate("form.signup.button")}
              icon={`icon-arrow-${right(direction)}`} />
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
    passwordScore: state.customer.passwordScore
  })
)(SignupForm)

export default SignupForm;
