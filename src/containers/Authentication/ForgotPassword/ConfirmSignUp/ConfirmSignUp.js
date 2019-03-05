import React, { Component, Fragment } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { SmallScreen, MediumScreen } from '../../../../components/Device/index.js';

import _ from 'lodash';
import Title from '../../../../components/UI/Title/index.js';

class ConfirmSignUp extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       isRegistered: _.has(this.props.location.state, 'isRegistered') ? true : false,
       email: _.has(this.props.location.state, 'email') ? this.props.location.state.email : false
    }
  }

  componentWillUnmount() {
    this.setState({
      isRegistered: false
    })
  }
  
  render() {
    const { translate } = this.props
    const { email } = this.state
    return (
      <Fragment>
        {
          this.state.isRegistered ? (
            <Fragment>
              <MediumScreen>
                <section id="confirm-signup">
                  <div className="content">
                    <img className="upload-img" src="/img/user.svg" alt="upload-img" />
                    <Title header={translate("general.thankYou")} />
                    <h5>{translate("confirmSignUp.emailSent")} <span>{email}</span> <br />{translate("confirmSignUp.activateAccount")}</h5>
                    <Link to="/" className="btn btn-primary">{this.props.translate("general.buttons.continueShopping")}</Link>
                  </div>
                </section>
              </MediumScreen>
              <SmallScreen>
                <section id="confirm-signup-mobile">
                  <div className="content">
                    <img className="upload-img" src="/img/user.svg" alt="upload-img" />
                    <Title header={translate("general.thankYou")} />
                    <h5>{translate("confirmSignUp.emailSent")} <span>{email}</span> <br />{translate("confirmSignUp.activateAccount")}</h5>
                    <Link to="/" className="btn btn-primary">{this.props.translate("general.buttons.continueShopping")}</Link>
                  </div>
                </section>
              </SmallScreen>
            </Fragment>
          ) :
            <Redirect to="/" />
        }
      </Fragment>
    )
  }
}

export default ConfirmSignUp;
