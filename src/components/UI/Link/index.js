import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import _ from 'lodash';

const link = props => {
    const { isReverseOrder, ...linkProps } = props;

    return <Link {...linkProps}>
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
                            <span> {
                                props.icons.map((icon, idx) => (
                                    <i key={idx} className={icon}></i>
                                ))
                            }
                            </span>
                    }
                </Fragment>
        }
    </Link>
}

link.defaultProps = {
    icons: []
}

export default link;