import React, { Component, Fragment } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'primereact/components/button/Button';
import { getTranslate } from "react-localize-redux";

import SelectInput from '../../../../components/SelectInput/SelectInput';
import RenderField from '../../../../components/RenderField/RenderField';

import './SignupForm.css';

import * as validations from '../../../../utils';

import './SignupForm.css';

class SignupForm extends Component {
  render() {
    const { translate } = this.props;
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <div className="form-group">
            <Field
              label={translate("form.signup.firstName")}
              name="firstName"
              component={RenderField}
              type="text"
              placeholder={translate("form.signup.placeholders.firstName")}
              validate={[validations.required]} />
          </div>
          <div className="form-group">
            <Field
              label={translate("form.signup.lastName")}
              name="lastName"
              component={RenderField}
              type="text"
              placeholder={translate("form.signup.placeholders.lastName")}
              validate={[validations.required]} />
          </div>
          <div className="form-group">
            <Field
              label={translate("form.signup.email")}
              name="email"
              type="email"
              component={RenderField}
              placeholder={translate("form.signup.placeholders.email")}
              validate={[validations.required, validations.email]} />
          </div>
          <div className="form-group">
            <Field
              label={translate("form.signup.country")}
              name="countryId"
              component={SelectInput}
              clearable={false}
              options={this.props.countries}
              placeholder={translate("form.signup.placeholders.country")}
              validate={[validations.required]} />
          </div>
          <div className="form-group">
            <Field
              label={translate("form.signup.mobile")}
              type="number"
              name="mobile"
              component={RenderField}
              placeholder={translate("form.signup.placeholders.mobile")}
              validate={[validations.required, validations.mobileCountryCode]} />
          </div>
          {
            this.props.showPassword && (
              <Fragment>
                <div className="form-group">
                  <Field
                    label={translate("form.signup.password")}
                    name="password"
                    component={RenderField}
                    type="password" placeholder={translate("form.signup.placeholders.password")}
                    validate={[validations.required]} />
                </div>
                <div className="form-group">
                  <Field
                    label={translate("form.signup.confirmPassword")}
                    name="confirmPassword"
                    component={RenderField}
                    type="password" placeholder={translate("form.signup.placeholders.confirmPassword")}
                    validate={[validations.required, validations.confirmPassword]} />
                </div>
              </Fragment>
            )
          }
          <Button type="submit" label={translate("form.signup.button")}/>
        </form>
      </div>
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