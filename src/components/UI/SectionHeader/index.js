import React, { Component, Fragment } from 'react';
import Button from '../../UI/Button';

class SectionHeader extends Component{
  render(){
    const { translate } = this.props;
    return(
      <section className="d-h-bg default-header-bg">
        <div className="container-fluid">
          <div className="row">
            <header className="col justify-content-between">
              <div className="user-profile">
                <img className="main-img" alt="user" src="/img/user.svg" />
                <h1>{this.props.text}</h1>
              </div>
              <div className="signout">
                <Button type="submit" className="btn btn-primary" text={translate("setting.signout")} icon="icon-sign-out"/>
              </div>
            </header>
          </div>
        </div>
      </section>
    )
  }
}

SectionHeader.defaultProps = {
    className: ""
}

export default SectionHeader;
