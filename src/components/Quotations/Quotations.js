import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { TAB_ONE, PENDING, REPLIED, colors } from '../../constants';

import ListGroupCollapse from '../UI/ListGroupCollapse';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

class Quotations extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: TAB_ONE,
      selectedProduct: {}
    };

    props.getPendingRequests(props.customer.id);
    props.getCompletedRequests(props.customer.id);
  }

  setSelectedProduct = (selectedProduct) => {
    return new Promise((resolve, reject) => {
      this.setState({
        selectedProduct
      });
      resolve();
    });
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

  addToCart = ({ quantity }) => {
    const item = { ...this.state.selectedProduct, quantity };
    this.props.addToCart(item);
  }

  getCollapseIcon = (collapse) => {
    return this.state[collapse] ? 'icon-minus' : 'icon-plus';
  }

  renderQuotationList = (array, idx, type) => {
    const created = moment(array.created).format('MMM Do');
    return <Fragment key={idx}>
      <Link
        to="#"
        onClick={this.handleCollaps}
        data-toggle="collapse"
        data-target={`#${array.id}`}
        aria-expanded="false"
        aria-controls={array.id}
        key={array.id}>
        <li className="bg-white">
          <figure className="row">
            <div className="col-3">
              <label>Request Number</label>
              <h4>#{array.id}</h4>
            </div>
            <figcaption className="col-9">
              <div className="row">
                <div className="col-md-9 item-dis">
                </div>
                <div className="col-md-3">
                  <p>sent <span>{created}</span></p>
                  <p>Number of pieces: <span>{array.quotationItems.length}</span></p>
                </div>
              </div>
            </figcaption>
          </figure>
        </li>
      </Link>
      {
        array.quotationItems.map((quotationItem, idx) => {
          return <ListGroupCollapse
            key={idx}
            id={array.id}
            type={type}
            onChangeQuantity={this.handleClick}
            quotationItem={quotationItem}
            setSelectedProduct={this.setSelectedProduct}
            onSubmit={this.addToCart} />
        })
      }
    </Fragment>
  }

  render() {

    const { quotations } = this.props;

    return (
      <div className="Quotations-container col-10">
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                Pending
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                Replayed
            </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <div className="col-12">
                  <ul className="cart-items list-unstyled">
                    {
                      quotations.pending.map((pending, idx) => {
                        return this.renderQuotationList(pending, idx, PENDING)
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
                      quotations.completed.map((reply, idx) => {
                        return this.renderQuotationList(reply, idx, REPLIED)
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