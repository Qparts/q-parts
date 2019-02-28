import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { right, getQuery } from '../../utils';
import { setQuotationOrder } from '../../actions/customerAction';
import Title from '../UI/Title';
import Link from '../UI/Link';
import { getTranslate } from 'react-localize-redux';

class SendRequest extends Component {
  componentWillUnmount() {
    this.props.setQuotationOrder(true);
  }
  render() {
    const { translate } = this.props
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
                  header={translate("general.thankYou")} />
                <h5>{translate("sendRequest.confirmation.textOne")} <b>{params.quotationId}</b> {translate("sendRequest.confirmation.textTwo")}<span>{translate("sendRequest.confirmation.textThree")}</span></h5>
                <Link to="/setting/quotations" className="btn btn-light" text={translate("general.buttons.continueShopping")} />
                <Link to="/" className="btn btn-primary" text={translate("general.buttons.requests")} icon={`icon-arrow-${right(this.props.direction)}`} />
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
    isQuotationorderCompleted: state.customer.isQuotationorderCompleted,
    translate: getTranslate(state.localize),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setQuotationOrder: (isCompleted) => dispatch(setQuotationOrder(isCompleted)),
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(SendRequest);
