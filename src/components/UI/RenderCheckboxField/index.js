import React from 'react';

const renderCheckboxField = props => {
    return (
        <div class={props.className}>
            <input
                {...props} 
                {...props.input} />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default renderCheckboxField;