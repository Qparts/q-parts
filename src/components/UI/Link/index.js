import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import _ from 'lodash'

const link = props => (
    <Link {...props}>
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
    </Link>
)

link.defaultProps = {
    icons: []
}

export default link;