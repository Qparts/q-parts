import React, { Fragment } from 'react';

const Button = props => (
    <button {...props}>
        {
            props.isReverseOrder ? <Fragment>
                <i className={props.icon}></i>
                <span>{props.text}</span>
            </Fragment> :

                <Fragment>
                    <span>{props.text}</span>
                    <i className={props.icon}></i>
                </Fragment>
        }
    </button>
)

export default Button;