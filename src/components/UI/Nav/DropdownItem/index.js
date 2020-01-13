/* eslint-disable jsx-a11y/href-no-hash */
import React, { Fragment } from 'react';
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


export default DropdownItem;
