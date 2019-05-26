import React, { Component } from 'react';
import { LargeScreen } from '../../../components/Device';
import Link from '../../UI/Link';

class SectionHeader extends Component{
  render(){
    const { translate } = this.props;
    return(
      <section className="default-header-bg profile-header">
        <div className="container-fluid">
          <div className="row">
            <header className="col">
              <figure><img className="default" alt="user" src="/img/user.svg" /></figure>
              <h1>{this.props.text}</h1>
            </header>
            <LargeScreen>
              <div className="sign-out col-auto">
                <Link to="/logout" className="btn" text={translate("setting.signout")} icon="icon-sign-out"/>
              </div>
            </LargeScreen>
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
