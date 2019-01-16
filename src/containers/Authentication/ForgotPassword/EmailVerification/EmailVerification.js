import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'

class EmailVerification extends Component {
  constructor(props){
    super(props);
    this.state={
      hidecomp: true
    }
  }
  // componentDidMount() {
  //   var that= this;
  //   setTimeout(function(){that.setState({
  //     hidecomp: !that.state.hidecomp
  //   }) }, 10000);
  // }
  render () {
    const style = this.state.hidecomp ?{display: 'none'} : {};
    return(
      <section id ="email-verification" style={style}>
        <div className="email-verification-content">
          <div>
            <h5>Email Verification: </h5>
            <p>We've sent an email to <span>your@domain.com</span> Please click the link in that message to activate your account</p>
            <button className="btn-primary">Resend</button>
            <button className="btn btn-open-G">Open In GMAI</button>
          </div>
        </div>
      </section>
    )
  }
}

export default EmailVerification;
