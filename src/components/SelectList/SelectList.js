import React from 'react';

import { ListBox } from 'primereact/components/listbox/ListBox';

import './SelectList.css';

export default props => {
 return (
  <div>
   <label>{props.label}</label> <br />
   <sub>{props.sub}</sub>
   <div>
    <ListBox
     {...props}
     value={props.input.value}
     onChange={(value) => props.input.onChange(value.value)}
     onBlur={() => props.input.onBlur(props.input.value)}
     options={props.options}
    />
    <div className="SelectList-required">
     {props.meta.touched &&
      ((props.meta.error && <span><i className="fas fa-exclamation-circle"></i>{props.meta.error}</span>) ||
       (props.meta.warning && <span>{props.meta.warning}</span>))}
    </div>
   </div>
  </div>
 )
}