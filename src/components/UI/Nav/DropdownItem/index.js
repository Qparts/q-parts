import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import DropdownMenu from '../DropdownMenu';

const DropdownItem = props => {
    return (
        <Fragment>
            <div className="dropdown" id={props.dropdownItemId}>
                <a className="dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {props.header}
                </a>
                <DropdownMenu>
                    {props.children}
                </DropdownMenu>
            </div>
        </Fragment>
    );
}

DropdownItem.propTypes = {
    children: propTypes.element.isRequired
}

export default DropdownItem;
