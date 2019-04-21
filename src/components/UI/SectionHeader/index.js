import React, { Component, Fragment } from 'react';
import { LargeScreen, DownLargeScreen } from '../../../components/Device';
import Button from '../../UI/Button';

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
                <Button type="submit" className="btn" text={translate("setting.signout")} icon="icon-sign-out"/>
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
