import React from 'react';

const checkbox = props => (
        <label className="checkbox-container">
            {props.label}
            <input type="checkbox" {...props} />
            <span className={props.checked ? 'checkmark icon-checked' : 'checkmark'} />
        </label>
)

export default checkbox;