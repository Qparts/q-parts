import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'
import moment from 'moment';
import queryString from 'qs';


import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import PendingRequest from './PendingRequest/PendingRequest';
import CompletedRequest from './CompletedRequest/CompletedRequest';
import { DownLargeScreen, LargeScreen } from '../../components/Device';
import _ from 'lodash';
import { right } from '../../utils';
import { RADIX, styles } from '../../constants';
import { ClipLoader } from "react-spinners";

class Quotations extends Component {
  constructor(props) {
    super(props);
    let query = queryString.parse(this.props.location.search.slice(1));

    this.state = {
      activeTab: '',
      noNewReply: '',
      show: parseInt(query.id, RADIX),
      loading: true
    };
  }

  componentDidMount() {
    this.props.getPendingRequests(this.props.customer.id)
    .then(() => {
      this.resetLoading();
    });
    this.props.getCompletedRequests(this.props.customer.id)
    .then(() => {
      this.resetLoading();
    });
    let query = queryString.parse(this.props.location.search.slice(1));

    this.setReadReplies();
    this.toggle(query.panel);
}

componentDidUpdate(prevProps, prevState) {
  const { completed } = this.props.quotations;
  const prevCompleted = prevProps.quotations.completed;

  if (completed !== prevCompleted) {
    this.setReadReplies();
  }
}

resetLoading = () => {
  this.setState({
    loading: false
  })
}


toggle = (tab = "pending") => {
  if (this.state.activeTab !== tab) {
    this.setState({
      activeTab: tab
    });
  }
}

renderReviews = (array) => {
  const { translate } = this.props;
  return <Fragment>
    <label htmlFor=""><b>{translate("setting.quotations.pendingRequest.table.comment")}</b></label> <br />
    {
      array.map((review, reviewKey) => {
        return (
          <Fragment key={reviewKey}>
            {moment(review.created).format('MM/DD/YYYY')} {review.reviewText} <br />
          </Fragment>
        )
      })
    }
  </Fragment>
}

setReadReplies = () => {
  let noNewReply = this.props.quotations.completed.every(reply => reply.read);

  this.setState({
    noNewReply: noNewReply ? '' : 'new'
  })
}

render() {

  const {
    quotations, translate, currentLanguage, direction, addToCart, incrementQuantity,
    decrementQuantity, token, customer, regions, putCompletedRequestRead
  } = this.props;

  let renderQuotation = null;

  if (this.state.loading) {
    return (
      <div style={styles.loading}>
        <ClipLoader
          css={styles.spinner}
          sizeUnit={"px"}
          size={150}
          loading={this.state.loading}
        />
      </div>
    )

  } else if (_.isEmpty(quotations.pending) && _.isEmpty(quotations.completed)) {
    renderQuotation = <div className="empty">
      <LargeScreen>
        <header>
          <h5>3 {translate("setting.quotations.steps")}</h5>
        </header>
      </LargeScreen>
      <figure>
        <img src="/img/request.svg" alt="no img" />
      </figure>
      <figcaption>
        <p>{translate("setting.quotations.empty")} </p>
        <Link className="btn btn-primary" to="/quotation-order" >{translate("quotationOrder.startHere")} <i className={`icon-arrow-${right(direction)}`}></i></Link>
      </figcaption>
    </div>

  } else {
    renderQuotation = <Fragment>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === 'pending' })}
            onClick={() => { this.toggle('pending'); }}>
            {translate("quotationRequest.pending")}
          </NavLink>
        </NavItem>
        <NavItem className={this.state.noNewReply}>
          <NavLink
            className={classnames({ active: this.state.activeTab === 'replied' })} onClick={() => { this.toggle('replied'); }} >
            {translate("quotationRequest.replied")} <span></span>
          </NavLink>
        </NavItem>
        <NavItem className={this.state.noNewReply}>
          <NavLink
            className={classnames({ active: this.state.activeTab === 'closed' })} onClick={() => { this.toggle('closed'); }} >
            {translate("quotationRequest.closed")} <span></span>
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="pending">
          <ul className="list-unstyled" id="request-list">
            {
              quotations.pending.map(pending => {
                return <PendingRequest
                  key={pending.id}
                  pending={pending}
                  translate={translate}
                  currentLanguage={currentLanguage}
                  vehicles={customer.vehicles}
                  regions={regions}
                />
              })
            }
          </ul>
        </TabPane>
        <TabPane tabId="replied">
          <ul className="list-unstyled" id="replied-list">
            {
              quotations.completed.map((reply, completedIndex) => {
                return <CompletedRequest
                  key={reply.id}
                  show={this.state.show}
                  completedIndex={completedIndex}
                  reply={reply}
                  translate={translate}
                  currentLanguage={currentLanguage}
                  addToCart={addToCart}
                  incrementQuantity={incrementQuantity}
                  decrementQuantity={decrementQuantity}
                  direction={direction}
                  token={token}
                  vehicles={customer.vehicles}
                  regions={regions}
                  putCompletedRequestRead={putCompletedRequestRead}
                />
              })
            }
          </ul>
        </TabPane>
        <TabPane tabId="closed">
          <ul className="list-unstyled" id="request-list">
            {
              quotations.pending.map(pending => {
                return <PendingRequest
                  key={pending.id}
                  pending={pending}
                  translate={translate}
                  currentLanguage={currentLanguage}
                  vehicles={customer.vehicles}
                  regions={regions}
                />
              })
            }
          </ul>
        </TabPane>
      </TabContent>
    </Fragment>
  }

  return (
    <div className="requests-main">
      <DownLargeScreen>
        <h2 className="sec-title-sm">{translate("setting.quotations.title")}</h2>
      </DownLargeScreen>
      {renderQuotation}
    </div>
  )
}
}


export default withRouter(Quotations);
