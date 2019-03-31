import React, { Component, Fragment } from 'react';
import moment from 'moment';

import { TAB_ONE, PENDING, REPLIED } from '../../constants';

import ListGroupCollapse from '../UI/ListGroupCollapse';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import PendingRequest from './PendingRequest/PendingRequest';
import CompletedRequest from './CompletedRequest/CompletedRequest';

class Quotations extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
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

  getCollapseIcon = (collapse) => {
    return this.state[collapse] ? 'icon-minus' : 'icon-plus';
  }

  render() {

    const { quotations, translate, currentLanguage, direction, addToCart, incrementQuantity, decrementQuantity, token } = this.props;

    return (
      <div className="requests-main">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'pending' })}
                onClick={() => { this.toggle('pending'); }}>
                Pending
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === 'replayed' })} onClick={() => { this.toggle('replayed'); }} >
                Replayed
            </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="pending">
                  <ul className="list-unstyled">
                  <li>
                    <a className="row" data-toggle="collapse" href="#request-id" role="button" aria-expanded="false" aria-controls="request-id">
                      <div className="col-lg-auto">
                        <label>Request Num</label>
                        <p>#xxx11xx</p>
                      </div>
                      <div className="col-lg">
                        <p>VIN Num: (000 000 000 000 11)</p>
                        <span><i className="icon-add"></i> Hide Details</span>
                      </div>
                      <div className="col-lg-auto r-info">
                        <p className="date"><span>Sent</span> Jul 28</p>
                        <p>Num of pieces:  2</p>
                      </div>
                    </a>
                    <div class="collapse" id="collapseExample">

                    </div>
                  </li>
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
              replayed
                  <ul className="cart-items list-unstyled">
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
