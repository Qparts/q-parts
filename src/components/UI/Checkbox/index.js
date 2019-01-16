import React from 'react';

const Button = props => (
        <label className="container">
            {props.label}
            <input type="checkbox" {...props} />
            <span className={props.checked ? 'checkmark icon-checked' : 'checkmark'} />
        </label>
)

export default Button;