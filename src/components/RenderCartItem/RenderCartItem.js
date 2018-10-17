import React, { Component } from 'react';
import { Field } from 'redux-form'
import RenderField from '../RenderField/RenderField';
import Button from '../UI/Button';
import * as validations from '../../utils';
import NumberPicker from '../UI/NumberPicker';

import './RenderCartItem.css';

export default class extends Component {

 componentWillMount() {
  const { fields, purchasedItems } = this.props;

  purchasedItems.map(cartItem => {
   return fields.push({
    itemName: cartItem.desc,
    quantity: cartItem.quantity,
    price: cartItem.price,
   })
  })
 }


 render() {
  const { fields, meta: { error, submitFailed }, deleteText } = this.props;
  return (
   <div>
    {submitFailed && error && <span>{error}</span>}
    {fields.map((cartItem, idx) => (
     <div key={idx} className="RenderCartItem-box_item card card-body">
      <Field
       className="RenderCartItem-input"
       name={`${cartItem}.itemName`}
       type="text"
       component={RenderField}
       readOnly
       validate={[validations.required]}
      />
      <Field
       name={`${cartItem}.quantity`}
       component={NumberPicker}
      />
      <Field
       className="RenderCartItem-input"
       name={`${cartItem}.price`}
       readOnly
       component={RenderField}
      />
      <Button
       type="button"
       className="btn btn-light"
       text={deleteText}
       onClick={() => fields.remove(idx)}
      />
     </div>
    ))}
   </div>
  )
 }
}