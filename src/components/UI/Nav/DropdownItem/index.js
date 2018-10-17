import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import DropdownMenu from '../DropdownMenu';

const DropdownItem = props => {
 return (
  <Fragment>
   <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href="" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
     {props.header}
    </a>
    <DropdownMenu>
     {props.children}
    </DropdownMenu>
   </li>
  </Fragment>
 );
}

DropdownItem.propTypes = {
 children: propTypes.element.isRequired
}

export default DropdownItem;