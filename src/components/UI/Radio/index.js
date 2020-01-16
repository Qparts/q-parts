/* eslint-disable no-unused-vars */
import React from 'react';

const radio = props => {  
  
    const { labelClassName, ...radiorops } = props;
    return <div className="radio-custom">
      <input {...props}/>
      <label htmlFor={props.id}>{props.label} </label>
    </div>
}

export default radio;
