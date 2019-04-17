import React, { Fragment, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../RenderField/RenderField';
import Button from '../UI/Button';

import * as validations from '../../utils';
import { right } from '../../utils';
import { withRouter } from 'react-router-dom';

import { Link } from "react-router-dom";

import './ResetPassword.css';
class resetPassword extends Component {
  forgotPassword = (event) => {
    this.props.history.push('/password/forgot-password')
  }
  onCancle = () => {
    this.props.toggle();
  }
  render() {
    const { handleSubmit, showPhoneNo, translate, direction } = this.props;
    const updateBtn = <p>{translate("resetPassword.update")}<i className={`icon-arrow-${right(direction)}`}></i></p>
    const cancelBtn = <p>{translate("resetPassword.cancel")}</p>
    return (
      <form className="one-col gray-input" onSubmit={handleSubmit}>
        {
          showPhoneNo ? (
            <Fragment>
              <div>
                <Field name="mobile" component={RenderField} type="text" placeholder={translate("resetPassword.placeholder.mobile")} validate={[validations.required]} />
              </div>
              <div>
                <Field name="code" component={RenderField} type="text" placeholder={translate("resetPassword.placeholder.code")} validate={[validations.required]} />
              </div>
              <div>
                <Field name="password" component={RenderField} type="password" placeholder={translate("resetPassword.placeholder.newPassword")} validate={[validations.required]} />
              </div>
            </Fragment>
          ) : (

              <Fragment>
                <div className="input-groub">
                  <div className="has-float-label">
                    <input name="line1" type="password" className="form-control" placeholder={translate("resetPassword.placeholder.oldPassword")} />
                    <label>{translate("resetPassword.placeholder.oldPassword")}</label>
                  </div>
                  <Link  to="/password/forgot-password">Forgot it?</Link>

                  <div className="has-float-label">
                    <input name="line1" type="password" className="form-control" placeholder="New password" />
                    <label>New password</label>
                  </div>
                </div>
                {/*<div className="content-password">
                  <div>
                    <Field name="oldPassword" component={RenderField} type="password" placeholder={translate("resetPassword.placeholder.oldPassword")} validate={[validations.required]} />
                  </div>
                  <div>
                    <Link  to="/password/forgot-password">Forgot it?</Link>
                    <Field name="newPassword" component={RenderField} type="password" placeholder={translate("resetPassword.placeholder.confirmPassword")} validate={[validations.required]} />
                  </div>
                </div>*/}
              </Fragment>
            )
        }
        <div className="row form-submit">
          <div className="col-auto">
            <Button className="btn btn-gray" type="reset" text={translate("general.buttons.cancel")} onClick={this.onCancle} />
          </div>
          <div className="col">
            <Button className="btn btn-primary" text={translate("resetPassword.update")} icon={`icon-arrow-${right(direction)}`} />
          </div>
        </div>

        {/*<div className="footer-password row">

          <div className="shadow group-shadow-div">
          </div>
          {
            !showPhoneNo && <Button className="btn btn-light col-3" type="reset" text={cancelBtn} onClick={this.onCancle} />
          }
          <Button className="btn btn-secondary col-8" text={updateBtn} />
        </div>*/}
      </form>
    )
  }
}

resetPassword = reduxForm({
  form: 'resetPassword'
})(resetPassword)

const WithResetPassword = withRouter(resetPassword);
export default WithResetPassword;
