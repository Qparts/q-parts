import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { SmallScreen, MediumScreen } from '../../../../components/Device/index.js';
import CustomerService from '../../../../components/CustomerService/CustomerService';
import { onRegistered } from '../../../../actions/customerAction.js';

import _ from 'lodash';
import { right } from '../../../../utils/index.js';
import { getTranslate } from 'react-localize-redux';

class ConfirmSignUp extends Component {
  componentWillUnmount() {
    this.props.onRegistered();
   }
  render() {
    return (
      <Fragment>
        {
          this.props.token && _.isNull(!this.props.registered)? (
            <Fragment>
              <MediumScreen>
                <section id="confirm-signup">
                  <div className="content">
                    <img className="upload-img" src="/img/user.svg" alt="upload-img" />
                    <p className="p"><span>Thank </span>You!</p>
                    <h5>We&apos;ve sent an email to <span>your@domain.com</span> <br />Please click the link in that message to activate your account</h5>
                    <button className="btn-primary">{this.props.translate("general.buttons.continueShopping")}</button>
                    <button className="btn btn-open-G">Open In GMAIL<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
                    <div>
                      <a className="bg-whatsapp">
                        <CustomerService
                          messages={["Have a Question?", "Ask a Special"]}
                          url="" />
                      </a>
                    </div>
                  </div>
                </section>
              </MediumScreen>
              <SmallScreen>
                <section id="confirm-signup-mobile">
                  <div className="content">
                    <img className="upload-img" src="/img/user.svg" alt="upload-img" />
                    <p className="p"><span>Thank </span>You!</p>
                    <h5>We&apos;ve sent an email to <span>your@domain.com</span> <br />Please click the link in that message to activate your account</h5>
                    <button className="btn-primary">{this.props.translate("general.buttons.continueShopping")}</button>
                    <button className="btn btn-open-G">Open In GMAIL<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
                    <div>
                      <a className="bg-whatsapp">
                        <CustomerService
                          messages={["Have a Question?", "Ask a Special"]}
                          url="" />
                      </a>
                    </div>
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

const mapStateToProps = state => {
  return {
    token: state.customer.token,
    registered: state.customer.registered,
    direction: state.customer.direction,
    translate: getTranslate(state.localize),
  }
}

const mapDispatchToProps = dispatch => {
  return {
   onRegistered: () => dispatch(onRegistered())
  }
 }

ConfirmSignUp = reduxForm({
  form: 'ForgotPassword',
  enableReinitialize: true
})(ConfirmSignUp)
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmSignUp);
