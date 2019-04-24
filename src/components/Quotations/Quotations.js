import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';


import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import PendingRequest from './PendingRequest/PendingRequest';
import CompletedRequest from './CompletedRequest/CompletedRequest';
import { DownLargeScreen, LargeScreen } from '../../components/Device';
import _ from 'lodash';
import { right } from '../../utils';

class Quotations extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "pending",
    };

    props.getPendingRequests(props.customer.id);
    props.getCompletedRequests(props.customer.id);
  }

  toggle(tab) {
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

  render() {

    const {
      quotations, translate, currentLanguage, direction, addToCart, incrementQuantity,
      decrementQuantity, token, customer, regions
    } = this.props;

    return (
      <div className="requests-main">
        <DownLargeScreen>
          <h2 className="sec-title-sm">{translate("setting.quotations.title")}</h2>
        </DownLargeScreen>
        {
          (_.isEmpty(quotations.pending || quotations.completed)) && (
            <div className="empty">
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
          )
        }
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'pending' })}
              onClick={() => { this.toggle('pending'); }}>
              {translate("quotationRequest.pending")}
            </NavLink>
          </NavItem>
          <NavItem className="new">
            <NavLink
              className={classnames({ active: this.state.activeTab === 'replayed' })} onClick={() => { this.toggle('replayed'); }} >
              {translate("quotationRequest.replied")} <span></span>
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
          <TabPane tabId="replayed">
            <ul className="list-unstyled" id="replayed-list">
              {
                quotations.completed.map(reply => {
                  return <CompletedRequest
                    key={reply.id}
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
                  />
                })
              }
            </ul>
          </TabPane>
        </TabContent>
      </div>
    )
  }
}


export default Quotations;