import React from 'react';

const SectionHeader = props => (
    <section id="section-header">
        <div className="component-background-color" />
        <div className="header-container">
            <span>{props.text}</span>
        </div>
    </section>
)

SectionHeader.defaultProps = {
    className: ""
}

export default SectionHeader;