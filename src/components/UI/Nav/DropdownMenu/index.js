import React from 'react';

const DropdownMenu = props => {
 return (
  <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
   {props.children}
  </div>
 );
}

export default DropdownMenu;