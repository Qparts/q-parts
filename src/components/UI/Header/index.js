import React from 'react';

const Header = props => (
    <section id="header">
        <div className="component-background-color" />
        <div className="header-container">
            <span>{props.text}</span>
        </div>
    </section>
)

Header.defaultProps = {
    className: ""
}

export default Header;