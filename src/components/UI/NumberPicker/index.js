import React, { Component } from 'react';
import { change as changeFieldValue } from 'redux-form';
import { connect } from 'react-redux';
import Button from '../Button';
import * as constant from '../../../constants';

import './index.css';

const DECREMENT = 'decrement';
const INCREMENT = 'increment';

class NumberPicker extends Component {

 handleClick = (event) => {
  event.preventDefault();

  const { value, onChange } = this.props.input;
  const max = 20;
  const min = 1;
  let newQuanValue = parseInt(value, constant.RADIX);

  if (event.target.value === DECREMENT) {
   const decQuantity = newQuanValue !== min ? newQuanValue -= 1 : newQuanValue;
   onChange(decQuantity);
  } else {
   const incQuantity = newQuanValue !== max ? newQuanValue += 1 : newQuanValue;
   onChange(incQuantity);
  }
 }

 render() {
  return <div>
   <Button text="-" value={DECREMENT} onClick={(value) => this.handleClick(value)} />
   <input
    readOnly
    {...this.props.input}
   />
   <Button text="+" value={INCREMENT} onClick={(value) => this.handleClick(value)} />
  </div>
 }
}

const mapDispatchToProps = dispatch => {
 return {
  changeFieldValue: (format, field, value) => dispatch(changeFieldValue(format, field, value))
 }
}

export default connect(null, mapDispatchToProps)(NumberPicker);