import React, { Component, Fragment } from 'react';
import { TabView, TabPanel } from 'primereact/components/tabview/TabView';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import { TAB_ONE } from '../../constants';

import './Quotations.css';
import Button from '../UI/Button';
import Table from '../UI/Table';

class Quotations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: TAB_ONE,
    }
  }


  componentWillMount() {
    const { customer, getQuotation, getRepliedQuotation } = this.props;
    getQuotation(customer.id);
    getRepliedQuotation(customer.id)
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

  addToCart = ({ quantity, product }) => {
    const item = { ...product, quantity }
    this.props.addToCart(item);
  }

  render() {
    const { quotationsCart, repliedQuotations, translate } = this.props;
    const pendingRequestHeaders = [translate("setting.quotations.pendingRequest.table.requestNo"), translate("setting.quotations.pendingRequest.table.status"), translate("setting.quotations.pendingRequest.table.dateOfSend")];
    const pendingRequestSubHeaders = [translate("setting.quotations.pendingRequest.table.details.itemNo"), translate("setting.quotations.pendingRequest.table.details.quantity"), translate("setting.quotations.pendingRequest.table.details.itemName")];

    return (
      <div>
        <p>{translate("setting.quotations.title")}</p>
        <div className="Quotations-container border rounded">
          <TabView className="Quotations-tabview" activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: e.index })}>
            <TabPanel header={translate("setting.quotations.pendingRequest.tab")}>
              {
                quotationsCart.map((quotationCart, quotationKey) => {
                  const date = new Date(quotationCart.created);
                  const filteredArray = [{ id: quotationCart.id, status: quotationCart.status, created: moment(date).format('MM/DD/YYYY') }];
                  const filteredcartItems = quotationCart.cartItems.map(cart => {
                    return {
                      ...cart, cartId: undefined
                    }
                  });
                  return (
                    <Fragment key={quotationKey}>
                      <div className="card card-body">
                        <Table
                          headers={pendingRequestHeaders}
                          columns={filteredArray}
                        />
                        <div>
                          {
                            !_.isEmpty(quotationCart.cartItems) && <Fragment>

                              <p>
                                <Button
                                  className="btn btn-primary"
                                  text={translate("setting.quotations.pendingRequest.table.details.button")}
                                  data-toggle="collapse"
                                  data-target={`#${quotationKey}`}
                                  aria-expanded="false"
                                  aria-controls={quotationKey} />
                              </p>
                              <div className="collapse" id={quotationKey}>
                                <Table
                                  headers={pendingRequestSubHeaders}
                                  columns={filteredcartItems}
                                />
                              </div>
                            </Fragment>
                          }
                          {
                            !_.isEmpty(quotationCart.reviews) && this.renderReviews(quotationCart.reviews)
                          }
                        </div>
                      </div>
                    </Fragment>
                  )
                })
              }
            </TabPanel>
            <TabPanel header={translate("setting.quotations.repliedRequest.tab")}>
              {
                repliedQuotations.map((repliedRequest, repliedKey) => {
                  const date = new Date(repliedRequest.created);
                  const filteredArray = [{ id: repliedRequest.id, status: repliedRequest.status, created: moment(date).format('MM/DD/YYYY') }];

                  return (
                    <Fragment key={repliedKey}>
                      <div className="card card-body">
                        <Table
                          headers={['Items', 'Status', 'Date of send']}
                          columns={filteredArray}
                        />
                        <p>
                          <Button
                            className="btn btn-primary"
                            text={"Quotation items"}
                            data-toggle="collapse"
                            data-target={`#${repliedKey}`}
                            aria-expanded="false"
                            aria-controls={repliedKey} />
                        </p>
                        <div className="collapse" id={repliedKey}>
                          {
                            !_.isEmpty(repliedRequest.quotationItems) && repliedRequest.quotationItems.map((quotationItem, qtKey) => {
                              const filteredItem = [{ id: quotationItem.id, quantity: quotationItem.quantity, desc: quotationItem.desc }];
                              const products = quotationItem.products.map(product => {
                                return {
                                  ...product, id: product.id, salesPrice: `${product.salesPrice.toFixed(2)} SR`, productNumber: product.productNumber, makeId: undefined,
                                  addToCart:
                                    <Button type="submit" className="btn btn-secondary" text={translate("product.buttons.addToCart")}
                                      onClick={this.addToCart.bind(this, { quantity: quotationItem.quantity, product })} />
                                }
                              });
                              return (
                                <Fragment key={qtKey}>
                                  <Table
                                    headers={['Item', 'Quantity', 'Description']}
                                    columns={filteredItem}
                                  />
                                  {
                                    !_.isEmpty(products) && <Fragment>
                                      <p>
                                        <Button
                                          className="btn btn-primary"
                                          text={'Products'}
                                          data-toggle="collapse"
                                          data-target={`#${quotationItem.id}`}
                                          aria-expanded="false"
                                          aria-controls={quotationItem.id} />
                                      </p>
                                      <div className="collapse" id={quotationItem.id}>
                                        <Table
                                          headers={['Item', 'Price', 'Item number', '']}
                                          columns={products}
                                        />
                                      </div>
                                    </Fragment>
                                  }
                                  {
                                    !_.isEmpty(repliedRequest.reviews) && this.renderReviews(repliedRequest.reviews)
                                  }
                                </Fragment>
                              )
                            })
                          }
                        </div>
                      </div>
                    </Fragment>
                  )
                })
              }
            </TabPanel>
          </TabView>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  quotationsCart: state.cart.quotationsCart,
  repliedQuotations: state.cart.repliedQuotations
});


export default connect(mapStateToProps, null)(Quotations);