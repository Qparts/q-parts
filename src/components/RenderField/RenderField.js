import React, { Fragment } from 'react';

import './RenderField.css';

const renderField = props => {
  return (
    <div className={props.className}>
      <label>{props.label}</label> <br />
      <sub>{props.sub}</sub>
      <div className="RenderField-container RenderField-required">
        <input
          type={props.type}
          placeholder={props.placeholder}
          {...props.input}
          {...props} />
        <Fragment>
          {props.meta.touched &&
            ((props.meta.error && <span><i className="fas fa-exclamation-circle"></i>{props.meta.error}</span>) ||
              (props.meta.warning && <span>{props.meta.warning}</span>))}
        </Fragment>
      </div>
    </div>
  );
}

renderField.defaultProps = {
  className: "form-control"
}

export default renderField;