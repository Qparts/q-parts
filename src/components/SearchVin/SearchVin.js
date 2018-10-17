import React from 'react';
import { Field, reduxForm } from 'redux-form';
import SelectInput from '../../components/SelectInput/SelectInput';

let SearchVin = props => {
  const { handleSubmit, renderField, makerData } = props;
  const data = makerData.map(data => {
    return {
      value: data.id,
      label: data.nameAr
    }
  });
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field name="vin" component={renderField} type="text" label="Select a vin number" placeholder="Select a vin number" />
        <Field name="makerName" component={SelectInput} options={data} />
      </div>
      <button type="submit">Search</button>
    </form>
  );
}

const validate = values => {
  const errors = {};
  if (!values.vin) errors.vin = 'Required';
  if (!values.makerName) errors.makerName = 'Required';

  return errors;
}

SearchVin = reduxForm({
  form: 'SearchVin',
  validate
})(SearchVin)

export default SearchVin;