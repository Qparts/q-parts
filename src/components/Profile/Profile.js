import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import RenderField from '../RenderField/RenderField';
import SelectInput from '../SelectInput/SelectInput';
import * as validations from '../../utils';
import { AR, EN } from '../../constants';

import './Profile.css';

let profile = props => {

  const { translate } = props;
  const editEmail = 'email'
  const editPassword = 'password'
  const languagesOptions = [
    { value: AR, label: translate("setting.accountSetting.arabic") },
    { value: EN, label: translate("setting.accountSetting.english") }
  ];

  return (
    <form onSubmit={props.handleSubmit}>
      <div className="Profile-container">
        <div className="Profile-info-box border rounded">
          {translate("setting.accountSetting.info.title")}
          <div className="Profile-info-box_item Profile-name">
            <Field
              label={translate("setting.accountSetting.info.label")}
              name="firstName"
              component={RenderField}
              type="text"
              placeholder={translate("setting.accountSetting.info.fNamePlaceholder")}
              validate={[validations.required]} />
            <Field
              name="lastName"
              component={RenderField}
              type="text"
              placeholder={translate("setting.accountSetting.info.lNamePlaceholder")}
              validate={[validations.required]} />
          </div>
          {/* <div className="Profile-info-box_item">
      <Field label="Mobile number" name="mobile" component={RenderField} type="text" placeholder="Your mobile number" />
     </div> */}
        </div>
        <br />
        <div className="Profile-info-box border rounded">
          {translate("setting.accountSetting.access.title")}
          <div className="Profile-info-box_item">
            <label>{translate("setting.accountSetting.access.email")}</label>
            <button className="btn btn-secondary" onClick={props.onShowEditDialog.bind(this, editEmail)} >{translate("setting.accountSetting.access.emailButton")}</button>
          </div>
          <div className="Profile-info-box_item">
            <label>{translate("setting.accountSetting.access.password")}</label>
            <button className="btn btn-secondary" onClick={props.onShowEditDialog.bind(this, editPassword)} >{translate("setting.accountSetting.access.passwordButton")}</button>
          </div>
        </div>
        <br />
        <div className="Profile-info-box border rounded">
          {translate("setting.accountSetting.notification.title")}
          <div className="Profile-info-box_item">
            <Field
              name="defaultLang"
              className="Profile-languages"
              component={SelectInput}
              options={languagesOptions}
              placeholder={translate("setting.accountSetting.notification.placeholder")} />
          </div>
          <div className="Profile-info-box_item">
          </div>
          <div className="Profile-info-box_item">
          </div>
        </div>
        <br />
        <div className="Profile-footer">
          <button type="reset" className="btn btn-light">{translate("setting.accountSetting.cancel")}</button>
          <button type="submit" className="btn btn-secondary">{translate("setting.accountSetting.save")}</button>
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