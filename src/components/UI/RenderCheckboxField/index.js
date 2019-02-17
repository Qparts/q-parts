import React from 'react';

const renderCheckboxField = props => {
    return (
        <label className="checkbox-container">
            {props.label}
            <input
                type="checkbox"
                {...props.input}
                {...props} />
            <span className={props.input.value ? 'checkmark icon-checked' : 'checkmark'} />
        </label>
    )
}

export default renderCheckboxField;