import React, { Component, Fragment } from 'react';
import { right, getQuery } from '../../utils';
import Title from '../UI/Title';
import Link from '../UI/Link';

class SendRequest extends Component {
  render() {
    const params = getQuery(this.props.location);
    return (
      <Fragment>
        <section className="send-request">
          <div className="container-fluid">
            <div className="d-flex justify-content-center">
              <div className="send-request_content">
                <img className="upload-img" src="/img/under-processing.svg" alt="under-processing" />
                <Title
                  header={"Thank You"} />
                <h5>Your Request Price number is <b>{params.quotationId}</b> has been sent,<span>we will reply as soon as possible</span></h5>
                <Link to="#" className="btn btn-light" text="Continue Shopping"/>
                <Link to="#" className="btn btn-primary" text="Requests" icon={`icon-arrow-${right(this.props.direction)}`}/>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}

export default SendRequest;
