import React from 'react';
import propTypes from 'prop-types';

const Nav = props => {
 return (
//   <nav className="navbar navbar-expand-lg navbar-light">
//    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target={`#${props.id}`} aria-controls={props.id} aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//    </button>
//    <div className="collapse navbar-collapse" id={props.id}>
//     <ul className="Layout navbar-nav mr-auto">
     props.children
//     </ul>
//    </div>
//   </nav>
 );
}

Nav.propTypes = {
 children: propTypes.node.isRequired
}

export default Nav;