import React from 'react';

import './index.css';

const Header = props => (
 <div className={props.className}>
  {props.text}
 </div>
)

Header.defaultProps = {
 className: "Header bg-light navbar-nav"
}

export default Header;