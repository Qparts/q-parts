import React, { Component, Fragment } from 'react';
import moment from 'moment';

import { TabContent, TabPane, Nav, NavItem, NavLink, Row } from 'reactstrap';
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
      <div className="Quotations-container col-10" >
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                {translate("quotationRequest.pending")}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                {translate("quotationRequest.replied")}
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <div className="col-12">
                  <ul className="cart-items list-unstyled">
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
                </div>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <div className="col-12">
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
                </div>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    )
  }
}


export default Quotations;