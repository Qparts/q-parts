import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import RenderField from '../RenderField/RenderField';
import RenderFileInput from '../RenderFileInput/RenderFileInput';
import SelectInput from '../SelectInput/SelectInput';
import * as validations from '../../utils';
import { AR, EN } from '../../constants';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';
import './Profile.css';
import CustomerService from '../CustomerService/CustomerService';

let profile = props => {

  const { translate } = props;
  const editEmail = 'email'
  const editPassword = 'password'
  const languagesOptions = [
    { value: AR, label: translate("setting.accountSetting.arabic") },
    { value: EN, label: translate("setting.accountSetting.english") }
  ];

  return (
    <form className="col-md-9 w3-hide-small w3-hide-medium"onSubmit={props.handleSubmit}>
      <div className="Profile-container">
        <div className="Profile-info-box border rounded">
          <div className="info-title">
            <p>{translate("setting.accountSetting.info.title")}</p>
          </div>
          <div className="info-body">
            <div className="user-img">
                <img alt="user" src="/img/user.svg" />
                <div className="col-md-3 div-last-rounded">
                  <Field
                    name="profileImg"
                    component={RenderFileInput}
                    image='image'
                  />
                  <Field
                    name="image"
                    placeholder="Change picture"
                    component={RenderField}
                    type="text"
                    validate={[validations.vin, validations.match17Digits, validations.allUpperCase]} />
              </div>
            </div>
            <div className="Profile-info-box_item Profile-name row">
              <div className="col-6 first-Name">
                <Field
                  label={translate("setting.accountSetting.info.label")}
                  name="firstName"
                  component={RenderField}
                  type="text"
                  placeholder={translate("setting.accountSetting.info.fNamePlaceholder")}
                  validate={[validations.required]} />
              </div>
              <div className="col-6 last-name">
                <Field
                  label={translate("setting.accountSetting.info.label")}
                  name="lastName"
                  component={RenderField}
                  type="text"
                  placeholder={translate("setting.accountSetting.info.lNamePlaceholder")}
                  validate={[validations.required]} />
              </div>
              <div className="country col-12">
                <Field
                  name="country"
                  component={SelectInput}
                  clearable={false}
                  options={[{label:'1',value:'2'}]}
                  placeholder="Select country"
                  validate={[validations.required]} />
              </div>
              <div className="row col-12 phone-info">
                <p className="col-12">Alternate Phone Number</p>
              <div className="phone-number col-6">
                <div className="first">
                  <Field
                    name="phone"
                    component={RenderField}
                    clearable={false}
                    placeholder="+966"
                    validate={[validations.required]} />
                </div>
                  <Field
                    name="phone-number"
                    component={RenderField}
                    clearable={false}
                    placeholder="Phone Number"
                    validate={[validations.required]} />
              </div>
              <div className="alternate-phone-number col-6">
                <div className="first">
                  <Field
                    name="alternate-phone"
                    component={RenderField}
                    clearable={false}
                    placeholder="+966"
                    validate={[validations.required]} />
                </div>
                  <Field
                    name="alternate-phone-number"
                    component={RenderField}
                    clearable={false}
                    placeholder="Phone Number"
                    validate={[validations.required]} />
              </div>
              </div>
            </div>
          </div>
          {/* <div className="Profile-info-box_item">
      <Field label="Mobile number" name="mobile" component={RenderField} type="text" placeholder="Your mobile number" />
     </div> */}
        </div>
        <br />
        <div className="Profile-access-box border rounded">
          <div className="access-title">
            <p>{translate("setting.accountSetting.access.title")}</p>
          </div>
          <div className="Profile-access-box_item">
            <Field
              label={translate("setting.accountSetting.access.email")}
              name="email"
              component={RenderField}
              type="text"
              placeholder={translate("setting.accountSetting.access.email")}
              validate={[validations.required]} />
            <button className="btn btn-secondary col-7" onClick={props.onShowEditDialog.bind(this, editPassword)} ><p><i className="icon-arrow-right" />{translate("setting.accountSetting.access.passwordButton")}</p></button>
          </div>
        </div>
        <br />
        <div className="Profile-notification-box border rounded">
          <div className="notification-title">
            <p>{translate("setting.accountSetting.notification.title")}</p>
          </div>
          <div className="Profile-notification-box_item">
            <div className="row">
              <div className="col-12 languages">
                <Field
                  name="defaultLang"
                  component={SelectInput}
                  clearable={false}
                  options={languagesOptions}
                  placeholder={translate("setting.accountSetting.notification.placeholder")}
                  validate={[validations.required]} />
              </div>
              <div className="col-12 notification">
                <RadioButton  name="notification" />
                <label htmlFor="rb1">Send Notification by E-mail</label>
              </div>
              <div className="col-12 notification">
                <RadioButton  name="notification"  />
                <label htmlFor="rb1">Send Notification by phone number</label>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="Profile-email-box border rounded">
          <div className="email-title">
            <p>Email Subscription</p>
          </div>
          <div className="Profile-email-box_item">
            <div className="row">
              <div className="col-12 email-check">
                <RadioButton  name="receive-email" />
                <label htmlFor="rb1">I would like to receive emails on upcoming promotions</label>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="Profile-footer">
          <button type="reset" className="btn btn-light"><p>{translate("setting.accountSetting.cancel")}</p></button>
          <button type="submit" className="btn btn-secondary"><p>{translate("setting.accountSetting.save")}<i className="icon-arrow-right"/></p></button>
        </div>
        <div className="row">
          <a className="bg-whatsapp">
            <CustomerService
              messages={["Have a Question?", "Ask a Special"]}
              url="" />
          </a>
        </div>
      </div>
    </form>
  );
}

profile = reduxForm({
  form: 'profile'
})(profile)

profile = connect(
  state => ({
    initialValues: state.customer.detail
  })
)(profile)

export default profile
