import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form';
import {SmallScreen, MediumScreen} from '../../../../components/Device/index.js'
import RenderField from '../../../../components/RenderField/RenderField';
import * as validations from '../../../../utils';
import CustomerService from '../../../../components/CustomerService/CustomerService';

class ConfirmSignUp extends Component {
  render () {
    return(
      <Fragment>
        <MediumScreen>
          <section id="confirm-signup">
              <div className="content">
                  <img className="upload-img" src="/img/user.svg" alt="upload-img" />
                  <p className="p"><span>Thank </span>You!</p>
                  <h5>We&apos;ve sent an email to <span>your@domain.com</span> <br/>Please click the link in that message to activate your account</h5>
                  <button className="btn-primary">Continue Shopping</button>
                  <button className="btn btn-open-G">Open In GMAIL<i className="icon-arrow-right" /></button>
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
                  <h5>We&apos;ve sent an email to <span>your@domain.com</span> <br/>Please click the link in that message to activate your account</h5>
                  <button className="btn-primary">Continue Shopping</button>
                  <button className="btn btn-open-G">Open In GMAIL<i className="icon-arrow-right" /></button>
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
    )
  }
}

ConfirmSignUp = reduxForm({
  form: 'ForgotPassword',
  enableReinitialize: true
})(ConfirmSignUp)
export default ConfirmSignUp;
