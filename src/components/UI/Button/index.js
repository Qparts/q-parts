import React, { Fragment } from 'react';
import _ from 'lodash'

const Button = props => (
    <button {...props}>
        {
            props.isReverseOrder ? <Fragment>
                <i className={props.icon}></i>
                <span>{props.text}</span>
            </Fragment> :

                <Fragment>
                    <span>{props.text}</span>
                    {
                        _.isEmpty(props.icons) ?
                            <i className={props.icon}></i> :
                            props.icons.map((icon, idx) => (
                                <i key={idx} className={icon}></i>
                            ))
                    }
                </Fragment>
        }
    </button>
)

Button.defaultProps = {
    icons: []
}

export default Button;