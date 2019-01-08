import React, { Fragment, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../RenderField/RenderField';
import Button from '../UI/Button';

import * as validations from '../../utils';
import { withRouter } from 'react-router-dom';

import { Link } from "react-router-dom";

import './ResetPassword.css';
class resetPassword extends Component {
  forgotPassword = (event) =>{
    this.props.history.push('/password/forgot-password')
  }
  onCancle = () =>{
    this.props.toggle();
  }
 render() {
  const { handleSubmit, showPhoneNo, translate } = this.props;
  const updateBtn = <p>{translate("resetPassword.update")}<i className="icon-arrow-right"></i></p>
  const cancelBtn = <p>{translate("resetPassword.cancel")}</p>
  return (
    <form className="ResetPassword-container" onSubmit={handleSubmit}>
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
              <div className="content-password">
                <div>
                  <Field name="oldPassword" component={RenderField} type="password" placeholder={translate("resetPassword.placeholder.oldPassword")} validate={[validations.required]} />
                </div>
                <div>
                  <Link className="btn-primary" to="/password/forgot-password">Forgot it?</Link>
                  <Field name="newPassword" component={RenderField} type="password" placeholder={translate("resetPassword.placeholder.confirmPassword")} validate={[validations.required, validations.confirmPassword]} />
                </div>
              </div>
            </Fragment>
          )
      }

      <div className="footer-password row">
        <div className="shadow">
        </div>
          {
            !showPhoneNo && <Button className="btn btn-light col-3" type="reset" text={cancelBtn} onClick={this.onCancle} />
          }
          <Button className="btn btn-secondary col-8" text={updateBtn}/>
      </div>
    </form>
  )
}
}

resetPassword = reduxForm({
  form: 'resetPassword'
})(resetPassword)

const WithResetPassword = withRouter(resetPassword);
export default WithResetPassword;
