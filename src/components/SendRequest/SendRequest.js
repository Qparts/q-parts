import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { right, getQuery } from '../../utils';
import { setQuotationOrder } from '../../actions/customerAction';
import Title from '../UI/Title';
import Link from '../UI/Link';

class SendRequest extends Component {
  componentWillUnmount() {
    this.props.setQuotationOrder(true);
  }
  render() {
    const params = getQuery(this.props.location);
    if (this.props.isQuotationorderCompleted) {
      return <Redirect to="/"/>
    }
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
                <Link to="/setting/quotations" className="btn btn-light" text="Continue Shopping" />
                <Link to="/" className="btn btn-primary" text="Requests" icon={`icon-arrow-${right(this.props.direction)}`} />
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    isQuotationorderCompleted: state.customer.isQuotationorderCompleted
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setQuotationOrder: (isCompleted) => dispatch(setQuotationOrder(isCompleted)),
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(SendRequest);
