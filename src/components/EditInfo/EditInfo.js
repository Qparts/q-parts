import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import Button from '../../components/UI/Button';
import RenderField from '../RenderField/RenderField';

import './EditInfo.css';

let editInfo = props => {
  const { handleSubmit, label, type, placeholder, name, onHide, cancel, update } = props;

  return (
    <div className="EditInfo-container">
      <form onSubmit={handleSubmit}>
        <div>
          <Field label={label}
            name={name}
            component={RenderField}
            type={type}
            placeholder={placeholder} />
        </div>
        <div className="EditInfo-item">
          <Button className="btn btn-light" type="reset" text={cancel} onClick={onHide} />
          <Button className="btn btn-secondary" text={update} />
        </div>
      </form>
    </div>
  )
}

const validate = values => {
  const errors = {};

  if (!values.name) errors.name = 'Required';

  return errors;
}

editInfo = reduxForm({
  form: 'editInfo',
  validate
})(editInfo)

editInfo = connect(
  state => ({
    initialValues: state.customer.detail
  })
)(editInfo)

export default editInfo;