import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'primereact/components/button/Button';
import RenderField from '../RenderField/RenderField';

import * as validations from '../../utils';

import './VerificationNumber.css';

let verificationNumber = props => {
 const { handleSubmit, sub, label, name, placeholder, error, submitButton } = props;
 return (
  <div className="Signup-verification_number">
   <form onSubmit={handleSubmit}>
    <Field
     sub={sub}
     label={label}
     name={name}
     component={RenderField}
     type="text"
     placeholder={placeholder}
     validate={[validations.required]} />
    <Button label={submitButton} />
    <div>
     {error && <strong>{error}</strong>}
    </div>
   </form>
  </div>
 )
}

verificationNumber = reduxForm({
 form: 'verificationNumber'
})(verificationNumber)

export default verificationNumber;