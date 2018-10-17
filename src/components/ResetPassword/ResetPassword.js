import React, { Fragment } from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../RenderField/RenderField';
import Button from '../UI/Button';

import * as validations from '../../utils';

import './ResetPassword.css';

let resetPassword = props => {
  const { handleSubmit, showPhoneNo, onHide, translate } = props;
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
              <div>
                <Field name="oldPassword" component={RenderField} type="password" placeholder={translate("resetPassword.placeholder.oldPassword")} validate={[validations.required]} />
              </div>
              <div>
                <Field name="password" component={RenderField} type="password" placeholder={translate("resetPassword.placeholder.newPassword")} validate={[validations.required]} />
                <Field name="newPassword" component={RenderField} type="password" placeholder={translate("resetPassword.placeholder.confirmPassword")} validate={[validations.required, validations.confirmPassword]} />
              </div>
            </Fragment>
          )
      }
      <div>
        {
          !showPhoneNo && <Button className="btn btn-light" type="reset" text={translate("resetPassword.cancel")} onClick={onHide} />
        }
        <Button className="btn btn-secondary" text={translate("resetPassword.update")} />
      </div>
    </form>
  )
}

resetPassword = reduxForm({
  form: 'resetPassword'
})(resetPassword)

export default resetPassword;