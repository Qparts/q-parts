import React from 'react';

const SectionHeader = props => (
    <section className="d-h-bg">
      <div className="container-fluid">
        <div className="row">
          <header className="col">
              <h1>{props.text}</h1>
          </header>
        </div>
      </div>
    </section>
)

SectionHeader.defaultProps = {
    className: ""
}

export default SectionHeader;
