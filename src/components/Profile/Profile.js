import React, { Fragment, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import RenderField from '../RenderField/RenderField';
import RenderFileInput from '../RenderFileInput/RenderFileInput';
import SelectInput from '../SelectInput/SelectInput';
import * as validations from '../../utils';
import { right } from '../../utils';
import { AR, EN } from '../../constants';
import CustomerService from '../CustomerService/CustomerService';
import Checkbox from '../UI/Checkbox';
import { Link } from "react-router-dom";
import { SmallScreen, MediumScreen } from '../../components/Device/index.js';

class profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkNotif_email: false,
      checkNotif_phone: false,
      checkRecive_email: false
    }
  }
  render() {
    const { translate, direction } = this.props;
    const editEmail = 'email'
    const editPassword = 'password'
    const languagesOptions = [
      { value: AR, label: translate("setting.accountSetting.arabic") },
      { value: EN, label: translate("setting.accountSetting.english") }
    ];

    return (
      <Fragment>
          <form className="gray-input account-setting" onSubmit={this.props.handleSubmit}>
            <ul className="list-unstyled">
              <li>
                <h5>{translate("setting.accountSetting.info.title")}</h5>
                <div className="input-sec">
                  <div className="user-img">
                    <figure>
                      <i className="icon-user"></i>
                    </figure>
                    <div className="upload">
                      <i className="icon-upload-photo"></i>
                      Upload Image
                      <Field
                         name="vin num"
                         component={RenderFileInput}
                         image="image"
                       />
                    </div>
                  </div>
                  <div className="form-row first-col">
                    <div className="col">
                      <div className="has-float-label">
                        <input name="firstName" type="text" className="form-control" placeholder={translate("form.signup.firstName")} />
                        <label>{translate("setting.accountSetting.info.fNamePlaceholder")}</label>
                      </div>
                    </div>
                    <div className="col">
                      <div className="has-float-label">
                        <input name="lastName" type="text" className="form-control" placeholder={translate("form.signup.lastName")} />
                        <label>{translate("form.signup.lastName")}</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-auto">
                      <input className="form-control phone-code" value={"+966"} type="text" readOnly />
                    </div>
                    <div className="col">
                      <div className="has-float-label">
                        <input name="line1" type="text" className="form-control" placeholder={translate("form.address.phoneNumber")} />
                        <label>{translate("form.address.phoneNumber")}</label>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <h5>{translate("setting.accountSetting.access.title")}</h5>
                <div className="input-sec">
                  <div className="has-float-label">
                    <input name="firstName" type="text" className="form-control" placeholder={translate("setting.accountSetting.access.email")} />
                    <label>{translate("setting.accountSetting.access.email")}</label>
                  </div>
                  <Link to="#" className="btn btn-gray change-password" onClick={this.props.onShowEditDialog.bind(this, editPassword)} >
                    <i className="icon-change-password"></i> {translate("setting.accountSetting.access.passwordButton")}
                  </Link>
                </div>
              </li>
              <li>
                <h5>{translate("setting.accountSetting.notification.title")}</h5>
                <div className="input-sec">
                  <div className="float-label change-lang">
										<Field
											label={translate("setting.accountSetting.notification.placeholder")}
											name="defaultLang"
											placeholder={" "}
											component={SelectInput}
											options={languagesOptions}
										/>
									</div>
                  <Checkbox name="check-email" onChange={e => this.setState({checkNotif_email: !this.state.checkNotif_email })} checked={this.state.checkNotif_email} label="Send Notification by E-mail" />
                  <Checkbox name="check-phone" onChange={e => this.setState({ checkNotif_phone: !this.state.checkNotif_phone })} checked={this.state.checkNotif_phone} label="Send Notification by phone number" />
                </div>
              </li>
              <li>
                <h5>Email Subscription</h5>
                <div className="input-sec">
                  <Checkbox onChange={e => this.setState({checkRecive_email: !this.state.checkRecive_email})} checked={this.state.checkRecive_email} label="I would like to receive emails on upcoming promotions" />
                </div>
              </li>
            </ul>
            <div className="profile-footer row">
              <div className="col-md-7 offset-md-5">
                <div className="row">
                  <div className="action-shadow"></div>
                  <div className="col-auto">
                    <button type="reset" className="btn btn-light">{translate("setting.accountSetting.cancel")}</button>
                  </div>
                  <div className="col">
                    <button type="submit" className="btn btn-primary">{translate("setting.accountSetting.save")}<i className={`icon-arrow-${right(direction)}`} /></button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {/*<form className="profile gray-input user-profile" onSubmit={this.props.handleSubmit}>
            <div className="Profile-container">
              <div className="Profile-info-box border rounded">
                <div className="info-title">
                  <p>{translate("setting.accountSetting.info.title")}</p>
                </div>
                <div className="info-body">
                  <div className="user-img">
                    <img className="main-img" alt="user" src="/img/user.svg" />
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
                        hasFloatLabel
                        validate={[validations.required]} />
                    </div>
                    <div className="col-6 last-name">
                      <Field
                        label={translate("setting.accountSetting.info.label")}
                        name="lastName"
                        component={RenderField}
                        type="text"
                        placeholder={translate("setting.accountSetting.info.lNamePlaceholder")}
                        hasFloatLabel
                        validate={[validations.required]} />
                    </div>
                    <div className="country col-12">
                      <Field
                        name="country"
                        component={SelectInput}
                        options={[{ label: '1', value: '2' }]}
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
                            placeholder="+966"
                            validate={[validations.required]} />
                        </div>
                        <Field
                          name="phone-number"
                          component={RenderField}
                          placeholder="Phone Number"
                          validate={[validations.required]} />
                      </div>
                      <div className="alternate-phone-number col-6">
                        <div className="first">
                          <Field
                            name="alternate-phone"
                            component={RenderField}
                            placeholder="+966"
                            validate={[validations.required]} />
                        </div>
                        <Field
                          name="alternate-phone-number"
                          component={RenderField}
                          placeholder="Phone Number"
                          validate={[validations.required]} />
                      </div>
                    </div>
                  </div>
                </div>
                 <div className="Profile-info-box_item">
            <Field label="Mobile number" name="mobile" component={RenderField} type="text" placeholder="Your mobile number" />
           </div>
              </div>
              <br />
              <div className="Profile-access-box border rounded">
                <div className="access-title">
                  <p>{translate("setting.accountSetting.access.title")}</p>
                </div>
                <div className="Profile-access-box_item">
                  <Field
                    disabled
                    label={translate("setting.accountSetting.access.email")}
                    name="email"
                    component={RenderField}
                    type="text"
                    placeholder={translate("setting.accountSetting.access.email")}
                    hasFloatLabel />
                  <Link to="#" className="btn btn-secondary col-7" onClick={this.props.onShowEditDialog.bind(this, editPassword)} ><p><i className={`icon-arrow-${right(direction)}`} />{translate("setting.accountSetting.access.passwordButton")}</p></Link>
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
                        options={languagesOptions}
                        placeholder={translate("setting.accountSetting.notification.placeholder")}
                        validate={[validations.required]} />
                    </div>
                    <div className="col-12 notification">
                      <Checkbox
                        name="check-email"
                        onChange={e => this.setState({
                          checkNotif_email: !this.state.checkNotif_email
                        })}
                        checked={this.state.checkNotif_email}
                        label="Send Notification by E-mail"
                      />
                    </div>
                    <div className="col-12 notification">
                      <Checkbox
                        name="check-phone"
                        onChange={e => this.setState({
                          checkNotif_phone: !this.state.checkNotif_phone
                        })}
                        checked={this.state.checkNotif_phone}
                        label="Send Notification by phone number"
                      />
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
                      <Checkbox onChange={e => this.setState({checkRecive_email: !this.state.checkRecive_email})} checked={this.state.checkRecive_email} label="I would like to receive emails on upcoming promotions" />
                    </div>
                  </div>
                </div>
              </div>
              <br />

            </div>
          </form>*/}
      </Fragment>
    );
  }
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
