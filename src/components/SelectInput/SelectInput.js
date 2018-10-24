import React, { Fragment } from 'react';
import Select from 'react-select';

import './SelectInput.css';
import { styles } from '../../constants';

export default props => {
    return (
        <Fragment>
            <label>{props.label}</label> <br />
            <sub>{props.sub}</sub>
            <Fragment>
                <Select
                    {...props}
                    {...props.input}
                    isSearchable={true}
                    styles={styles.select}
                    value={props.input.value || props.defaultValue}
                    onChange={(value) => props.input.onChange(value)}
                    onBlur={() => props.input.onBlur(props.input.value)}
                    options={props.options}
                    className={props.className}
                />
                <div className="SelectInput-required">
                    {props.meta.touched &&
                        ((props.meta.error && <span><i className="fas fa-exclamation-circle"></i>{props.meta.error}</span>) ||
                            (props.meta.warning && <span>{props.meta.warning}</span>))}
                </div>
            </Fragment>
        </Fragment>
    );
}