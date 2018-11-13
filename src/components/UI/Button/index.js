import React from 'react';

const Button = props => (
    <button {...props}>
        <span>{props.text}</span>
        <i className={props.icon}></i>
    </button>
)

export default Button;