import React, { Component, Fragment } from 'react';
import moment from 'moment';


import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import PendingRequest from './PendingRequest/PendingRequest';
import CompletedRequest from './CompletedRequest/CompletedRequest';
import { DownLargeScreen, LargeScreen } from '../../components/Device';
import _ from 'lodash';

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

    const { quotations, translate, currentLanguage, direction, addToCart, incrementQuantity, decrementQuantity, token } = this.props;

    return (
      <div className="requests-main">
        <DownLargeScreen>
          <h2 className="sec-title-sm">Quotation Order</h2>
        </DownLargeScreen>
        {
          (_.isEmpty(quotations.pending || quotations.completed)) && (
            <div className="empty">
              <LargeScreen>
                <header>
                  <h5>3 STEPS To Get Your Parts Anywhere You Like</h5>
                </header>
              </LargeScreen>
              <figure>
                <img src="/img/request.svg" />
              </figure>
              <figcaption>
                <p>No Qutation Order Yet </p>
                <a className="btn btn-primary" href="#" >Start Qutaation Order <i className="icon-arrow-right"></i></a>
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
                quotations.pending.map(pendings => {
                  return <PendingRequest
                    key={pendings.id}
                    pendings={pendings}
                    translate={translate}
                    currentLanguage={currentLanguage} />
                })
              }
            </ul>
          </TabPane>
          <TabPane tabId="replayed">
            <ul className="list-unstyled" id="replayed-list">
              {
                quotations.completed.map(replies => {
                  return <CompletedRequest
                    key={replies.id}
                    replies={replies}
                    translate={translate}
                    currentLanguage={currentLanguage}
                    addToCart={addToCart}
                    incrementQuantity={incrementQuantity}
                    decrementQuantity={decrementQuantity}
                    direction={direction}
                    token={token}
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