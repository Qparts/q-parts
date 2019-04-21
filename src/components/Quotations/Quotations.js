import React, { Component, Fragment } from 'react';
import moment from 'moment';

import { TAB_ONE, PENDING, REPLIED } from '../../constants';

import ListGroupCollapse from '../UI/ListGroupCollapse';
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

  getCollapseIcon = (collapse) => {
    return this.state[collapse] ? 'icon-minus' : 'icon-plus';
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
              <li>
                <a className="collapsed new" data-toggle="collapse" href="#replayed-id1" role="button" aria-expanded="false" aria-controls="replayed-id1">
                  <LargeScreen>
                    <div className="col-lg-auto">
                      <label>Request Num</label>
                      <p>#xxx11xx</p>
                    </div>
                  </LargeScreen>
                  <div className="col-lg">
                    <p>Ford Focus 2015</p>
                    <span className="details-toggle"><i className="icon-"></i></span>
                  </div>
                  <div className="col-lg-auto r-info">
                    <p className="date"><span>Sent</span> Jul 28 <span>Replay</span> Jul 30</p>
                    <p>Num of pieces:  2</p>
                  </div>
                </a>
                <div class="collapse" id="replayed-id1" data-parent="#replayed-list">
                  <artical className="request-details" >
                    <ul className="list-inline vehicle-info">
                      <li><i className="icon-vehicle"></i> VIN Num: (000 000 000 000 11)</li>
                      <DownLargeScreen>
                        <li className="r-id-small">
                          <label>Request Num</label> #xxx11xx
                                </li>
                      </DownLargeScreen>
                      <li className="ship-info"><i className="icon-location"></i> KSA, Jeddah, Jeddah</li>
                    </ul>
                    <ul className="replayed-parts-list ">
                      <li className="media">
                        <a href="#"><img src="https://s3.eu-central-1.amazonaws.com/q-product-test/1.png" /></a>
                        <figcaption className="media-body">
                          <div className="row">
                            <div className="col">
                              <h5><a href="#">Product Name</a></h5>
                              <ul className="list-inline product-info">
                                <li><strong>Product Brand</strong></li>
                                <li>#Product Num</li>
                              </ul>
                            </div>
                            <div className="col-lg-auto price">
                              <label>Price</label>
                              <p>11.19 <span>SR</span></p>
                            </div>
                          </div>
                          <span className="seperator"></span>
                          <div className="row">
                            <div className="col total-price">
                              <p>Quantity</p>
                              <div class="input-group quantity">
                                <div class="input-group-prepend">
                                  <button class="btn btn-gray" type="button"><i class="minus"></i></button>
                                </div>
                                <input class="form-control" readonly="" disabled="" name="quantity" value="1" />
                                <div class="input-group-append">
                                  <button class="btn btn-gray" type="button"><i class="icon-plus"></i></button>
                                </div>
                              </div>
                              <div className="price">
                                <label>Total Price</label>
                                <p>11.19 <span>SR</span></p>
                              </div>
                            </div>
                            <div className="col-lg-auto add-cart">
                              <a href="#" className="btn btn-primary"><i className="icon-cart"></i> Add to Cart</a>
                              <a href="#" className="btn"><i className="icon-trash"></i></a>
                            </div>
                          </div>
                        </figcaption>
                      </li>
                      <li className="media">
                        <a href="#"><img src="https://s3.eu-central-1.amazonaws.com/q-product-test/1.png" /></a>
                        <figcaption className="media-body">
                          <div className="row">
                            <div className="col">
                              <h5><a href="#">Product Name</a></h5>
                              <ul className="list-inline product-info">
                                <li><strong>Product Brand</strong></li>
                                <li>#Product Num</li>
                              </ul>
                            </div>
                            <div className="col-lg-auto price">
                              <label>Price</label>
                              <p>11.19 <span>SR</span></p>
                            </div>
                          </div>
                          <span className="seperator"></span>
                          <div className="row">
                            <div className="col total-price">
                              <p>Quantity</p>
                              <div class="input-group quantity">
                                <div class="input-group-prepend">
                                  <button class="btn btn-gray" type="button"><i class="minus"></i></button>
                                </div>
                                <input class="form-control" readonly="" disabled="" name="quantity" value="1" />
                                <div class="input-group-append">
                                  <button class="btn btn-gray" type="button"><i class="icon-plus"></i></button>
                                </div>
                              </div>
                              <div className="price">
                                <label>Total Price</label>
                                <p>11.19 <span>SR</span></p>
                              </div>
                            </div>
                            <div className="col-lg-auto add-cart">
                              <a href="#" className="btn btn-primary"><i className="icon-cart"></i> Add to Cart</a>
                              <a href="#" className="btn"><i className="icon-trash"></i></a>
                            </div>
                          </div>
                        </figcaption>
                      </li>
                    </ul>
                  </artical>
                </div>
              </li>

              <li>
                <a className="collapsed" data-toggle="collapse" href="#replayed-id2" role="button" aria-expanded="false" aria-controls="replayed-id1">
                  <LargeScreen>
                    <div className="col-lg-auto">
                      <label>Request Num</label>
                      <p>#xxx11xx</p>
                    </div>
                  </LargeScreen>
                  <div className="col-lg">
                    <p>Ford Focus 2015</p>
                    <span className="details-toggle"><i className="icon-"></i></span>
                  </div>
                  <div className="col-lg-auto r-info">
                    <p className="date"><span>Sent</span> Jul 28 <span>Replay</span> Jul 30</p>
                    <p>Num of pieces:  2</p>
                  </div>
                </a>
                <div class="collapse" id="replayed-id2" data-parent="#replayed-list">
                  <artical className="request-details" >
                    <ul className="list-inline vehicle-info">
                      <li><i className="icon-vehicle"></i> VIN Num: (000 000 000 000 11)</li>
                      <DownLargeScreen>
                        <li className="r-id-small">
                          <label>Request Num</label> #xxx11xx
                                </li>
                      </DownLargeScreen>
                      <li className="ship-info"><i className="icon-location"></i> KSA, Jeddah, Jeddah</li>
                    </ul>
                    <ul className="replayed-parts-list ">
                      <li className="media">
                        <a href="#"><img src="https://s3.eu-central-1.amazonaws.com/q-product-test/1.png" /></a>
                        <figcaption className="media-body">
                          <div className="row">
                            <div className="col">
                              <h5><a href="#">Product Name</a></h5>
                              <ul className="list-inline product-info">
                                <li><strong>Product Brand</strong></li>
                                <li>#Product Num</li>
                              </ul>
                            </div>
                            <div className="col-lg-auto price">
                              <label>Price</label>
                              <p>11.19 <span>SR</span></p>
                            </div>
                          </div>
                          <span className="seperator"></span>
                          <div className="row">
                            <div className="col total-price">
                              <p>Quantity</p>
                              <div class="input-group quantity">
                                <div class="input-group-prepend">
                                  <button class="btn btn-gray" type="button"><i class="minus"></i></button>
                                </div>
                                <input class="form-control" readonly="" disabled="" name="quantity" value="1" />
                                <div class="input-group-append">
                                  <button class="btn btn-gray" type="button"><i class="icon-plus"></i></button>
                                </div>
                              </div>
                              <div className="price">
                                <label>Total Price</label>
                                <p>11.19 <span>SR</span></p>
                              </div>
                            </div>
                            <div className="col-lg-auto add-cart">
                              <a href="#" className="btn btn-primary"><i className="icon-cart"></i> Add to Cart</a>
                              <a href="#" className="btn"><i className="icon-trash"></i></a>
                            </div>
                          </div>
                        </figcaption>
                      </li>
                      <li className="media">
                        <a href="#"><img src="https://s3.eu-central-1.amazonaws.com/q-product-test/1.png" /></a>
                        <figcaption className="media-body">
                          <div className="row">
                            <div className="col">
                              <h5><a href="#">Product Name</a></h5>
                              <ul className="list-inline product-info">
                                <li><strong>Product Brand</strong></li>
                                <li>#Product Num</li>
                              </ul>
                            </div>
                            <div className="col-lg-auto price">
                              <label>Price</label>
                              <p>11.19 <span>SR</span></p>
                            </div>
                          </div>
                          <span className="seperator"></span>
                          <div className="row">
                            <div className="col total-price">
                              <p>Quantity</p>
                              <div class="input-group quantity">
                                <div class="input-group-prepend">
                                  <button class="btn btn-gray" type="button"><i class="minus"></i></button>
                                </div>
                                <input class="form-control" readonly="" disabled="" name="quantity" value="1" />
                                <div class="input-group-append">
                                  <button class="btn btn-gray" type="button"><i class="icon-plus"></i></button>
                                </div>
                              </div>
                              <div className="price">
                                <label>Total Price</label>
                                <p>11.19 <span>SR</span></p>
                              </div>
                            </div>
                            <div className="col-lg-auto add-cart">
                              <a href="#" className="btn btn-primary"><i className="icon-cart"></i> Add to Cart</a>
                              <a href="#" className="btn"><i className="icon-trash"></i></a>
                            </div>
                          </div>
                        </figcaption>
                      </li>
                    </ul>
                  </artical>
                </div>
              </li>

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