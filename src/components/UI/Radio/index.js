import React from 'react';

const radio = props => {
    const { labelClassName, ...radioProps } = props;
    return <label className="radio-container">
        <label className={props.labelClassName}>{props.label}</label>
        <input type="radio" {...radioProps} />
        <span className={props.checked ? 'checkmark icon-checked' : 'checkmark'} />
    </label>

}

export default radio;