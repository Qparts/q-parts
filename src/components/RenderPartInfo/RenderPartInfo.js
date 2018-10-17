import React from 'react';
import { Field } from 'redux-form'
import RenderField from '../RenderField/RenderField';
import Button from '../UI/Button';
import * as validations from '../../utils';
import NumberPicker from '../UI/NumberPicker';
import RenderFileInput from '../RenderFileInput/RenderFileInput';

export default ({ fields, meta: { error, submitFailed }, ...props }) => (
 <div>
  <Button type="reset" className="btn" text={props.add}
  onClick={() => fields.push({
   itemName: '',
   image: '',
   // condition: '',
   quantity: 1
  })}
  />
  {submitFailed && error && <span>{error}</span>}
  {fields.map((partInfo, idx) => (
   <div key={idx} className="QuotationRequest-box_item">
    <Field
     name={`${partInfo}.image`}
     image={`${partInfo}.image`}
     component={RenderFileInput}
    />
    <Field
     name={`${partInfo}.itemName`}
     type="text"
     component={RenderField}
     placeholder={props.placeholder}
     validate={[validations.required]}
    />
    {/* <Field
     name={`${partInfo}.condition`}
     className="QuotationRequest-selectInput"
     component={SelectInput}
     options={[
      { value: 'genuine', label: 'Genuine' },
      { value: 'nonGenuine ', label: 'Non-genuine' },
      { value: 'all ', label: 'All' }
     ]}
    /> */}
    <Field
     name={`${partInfo}.quantity`}
     component={NumberPicker}
    />
    <Button
     type="button"
     className="btn btn-light"
     text={props.deleteButton}
     onClick={() => fields.remove(idx)}
    />
   </div>
  ))}
 </div>
)