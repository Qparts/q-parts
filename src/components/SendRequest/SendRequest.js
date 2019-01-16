import React, { Component, Fragment } from 'react';

class SendRequest extends Component {
  render () {
    return(
      <Fragment>
        <div className="send-content">
            <img className="upload-img" src="/img/upload-img.svg" alt="upload-img" />
            <p className="p"><span>Thank</span> You</p>
            <h5>Your Request Price for <b>"POADIAN AT PRO RA8"</b> Have been sent,<pre>we will reply as soon as possible</pre></h5>
            <button className="btn-primary">Continue Shopping</button>
            <button className="btn btn-req">Requests<i className="icon-arrow-right" /></button>
            <div>
              <a className="bg-whatsapp">
                <img src="/img/whatsapp-logo.svg" alt="whatsapp"/>
                <a href="#">Have a Question?<br/>Ask a Special</a>
              </a>

            </div>
        </div>
      </Fragment>
    )
  }
}

export default SendRequest;
