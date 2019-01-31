import React, { Component, Fragment } from 'react';
import { reduxForm, FieldArray } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Button from '../UI/Button';
import Table from '../UI/Table';
import RenderCartItem from '../RenderCartItem/RenderCartItem';
import DeliveryAddress from '../DeliveryAddress/DeliveryAddress';
import PaymentMethod from '../PaymentMethod/PaymentMethod';
import { SmallScreen, MediumScreen } from '../Device/index.js'
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import CustomerService from '../CustomerService/CustomerService';
import { onRegistered } from '../../actions/customerAction.js';

import _ from 'lodash';
import { right } from '../../utils/index.js';
class CheckoutConfirmation extends Component {

  handleClick = () => {
    this.props.completeOrder(true);
    this.props.history.push('/');
  }

  render() {
    const { checkout, translate } = this.props;
    const mockCart = [
      {
        name: "Test from the client",
        quantity: 1,
        price: "200 SR"
      },
      {
        name: "Test from the client",
        quantity: 2,
        price: "200 SR"
      }
    ];
    return (
      <Fragment>
        <MediumScreen>
          <section id="confirm-order">
            <div className="content">
              <i className="icon-delivered-step upload-img" />
              <p className="p"><span>Thank </span>You!</p>
              <h5>Your order has been placed <br />Please check your email for order confirmation and detailed delivery information.</h5>
              <button className="btn btn-open-G">Track You Order<i className={'icon-arrow-right'} /></button>
            </div>
            <div className="CheckoutConfirmation_items card">
              <p className="title">{translate("checkout.confirm.table.items")}</p>
                  <ul className=" item-list list-unstyled">
                    <li>
                      <figure className="row">
                        <a href="#" className="col-3 item-img">
                          <img src="/img/oil-img-3.jpg"/>
                        </a>
                        <figcaption className="col-9">
                          <div className="row">
                            <div className="col-md-9 item-dis">
                              <header>
                                <h3><a href="#">8100 synthetic motor oil</a></h3>
                                <h4>Motul USA <span>#Part Number</span></h4>
                              </header>
                              <div className="d-table product-options">
                                <div className="d-table-row">
                                  <div className="d-table-cell"><span>Viscosity Grade</span></div>
                                  <div className="d-table-cell">SAE -50</div>
                                </div>
                                <div className="d-table-row">
                                  <div className="d-table-cell"><span>Volume</span></div>
                                  <div className="d-table-cell">1.32 Gallon</div>
                                </div>
                              </div>
                            </div>
                            <div className="quantity-div col-3">
                              <div className="product-price">
                                <p className="price">11.19 <span>SR</span></p>
                                <p className="quantity">Quantity <span>4</span></p>
                              </div>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </li>
                    <li>
                      <figure className="row">
                        <a href="#" className="col-3 item-img">
                          <img src="/img/product-1.jpg"/>
                        </a>
                        <figcaption className="col-9">
                          <div className="row">
                            <div className="col-md-9 item-dis">
                              <header>
                                <h3><a href="#">#Part Number</a></h3>
                                <h4>Product Brand <span>Product Name</span></h4>
                              </header>
                              <div className="d-table product-options">
                                <div className="d-table-row">
                                  <div className="d-table-cell"><span>Vechile Info</span></div>
                                  <div className="d-table-cell">
                                    2015 Ford Focus<br/>
                                    VIN number (000 000 000 000 11)
                                  </div>
                                </div>
                                <div className="d-table-row">
                                  <div className="d-table-cell"><span>Fitment</span></div>
                                  <div className="d-table-cell"><i className="icon-checked"></i> Verified</div>
                                </div>
                                <div className="d-table-row">
                                  <div className="d-table-cell"><span>Made in </span></div>
                                  <div className="d-table-cell">China</div>
                                </div>
                                <div className="d-table-row">
                                  <div className="d-table-cell"><span>Condition</span></div>
                                  <div className="d-table-cell">New</div>
                                </div>
                              </div>
                            </div>
                            <div className="quantity-div col-3">
                              <div className="product-price">
                                <p className="price">11.19 <span>SR</span></p>
                                <p className="quantity">Quantity <span>4</span></p>
                              </div>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </li>
                  </ul>
                  <div className="estimation">
                    <p className="title">Estimation</p>
                    <div className="estimation-table">
                      <div className="d-table product-options">
                        <div className="d-table-row">
                          <div className="d-table-cell first-row"><span>Subtotal</span></div>
                          <div className="d-table-cell first-row">
                            11.19 <span>SR</span>
                          </div>
                        </div>
                        <div className="d-table-row">
                          <div className="d-table-cell"><span>Shipping Cost</span></div>
                          <div className="d-table-cell">11.19 <span>SR</span></div>
                        </div>
                        <div className="d-table-row">
                          <div className="d-table-cell"><span>Total</span></div>
                          <div className="d-table-cell">11.19 <span>SR</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 delivery-address">
                      <DeliveryAddress
                        title={translate("deliveryAddress.title")}
                        change={translate("deliveryAddress.change")} deliveryAddress={checkout.deliveryAddress} translate={translate} />
                    </div>
                      <div className="col-6 payment-method">
                        <PaymentMethod
                          title={translate("paymentMethod.title")}
                          change={translate("paymentMethod.change")} paymentMethod={checkout.paymentMethod} translate={translate} />
                      </div>
                  </div>
            </div>
          </section>
        </MediumScreen>
        <SmallScreen>
          <section id="confirm-order-mobile">
            <div className="content">
              <i className="icon-delivered-step upload-img" />
              <p className="p"><span>Thank </span>You!</p>
              <h5>Your order has been placed <br />Please check your email for order confirmation and detailed delivery information.</h5>
              <button className="btn btn-open-G">Track You Order<i className={'icon-arrow-right'} /></button>
            </div>
            <div className="CheckoutConfirmation_items card">
              <p className="title">{translate("checkout.confirm.table.items")}</p>
                  <ul className=" item-list list-unstyled">
                    <li>
                      <figure className="row">
                        <a href="#" className="col-3 item-img">
                          <img src="/img/oil-img-3.jpg"/>
                        </a>
                        <figcaption className="col-9">
                          <div className="row">
                            <div className="col-md-9 item-dis">
                              <header>
                                <h3><a href="#">8100 synthetic motor oil</a></h3>
                                <h4>Motul USA <span>#Part Number</span></h4>
                              </header>
                              <div className="d-table product-options">
                                <div className="d-table-row">
                                  <div className="d-table-cell"><span>Viscosity Grade</span></div>
                                  <div className="d-table-cell">SAE -50</div>
                                </div>
                                <div className="d-table-row">
                                  <div className="d-table-cell"><span>Volume</span></div>
                                  <div className="d-table-cell">1.32 Gallon</div>
                                </div>
                              </div>
                            </div>
                            <div className="quantity-div col-12">
                              <div className="product-price">
                                <p className="price">11.19 <span>SR</span></p>
                                <p className="quantity">Quantity <span>4</span></p>
                              </div>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </li>
                    <li>
                      <figure className="row">
                        <a href="#" className="col-3 item-img">
                          <img src="/img/product-1.jpg"/>
                        </a>
                        <figcaption className="col-9">
                          <div className="row">
                            <div className="col-md-9 item-dis">
                              <header>
                                <h3><a href="#">#Part Number</a></h3>
                                <h4>Product Brand <span>Product Name</span></h4>
                              </header>
                              <div className="d-table product-options">
                                <div className="d-table-row">
                                  <div className="d-table-cell"><span>Vechile Info</span></div>
                                  <div className="d-table-cell">
                                    2015 Ford Focus<br/>
                                    VIN number (000 000 000 000 11)
                                  </div>
                                </div>
                                <div className="d-table-row">
                                  <div className="d-table-cell"><span>Fitment</span></div>
                                  <div className="d-table-cell"><i className="icon-checked"></i> Verified</div>
                                </div>
                                <div className="d-table-row">
                                  <div className="d-table-cell"><span>Made in </span></div>
                                  <div className="d-table-cell">China</div>
                                </div>
                                <div className="d-table-row">
                                  <div className="d-table-cell"><span>Condition</span></div>
                                  <div className="d-table-cell">New</div>
                                </div>
                              </div>
                            </div>
                            <div className="quantity-div col-12">
                              <div className="product-price">
                                <p className="price">11.19 <span>SR</span></p>
                                <p className="quantity">Quantity <span>4</span></p>
                              </div>
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </li>
                  </ul>
                  <div className="estimation">
                    <p className="title">Estimation</p>
                    <div className="estimation-table">
                      <div className="d-table product-options">
                        <div className="d-table-row">
                          <div className="d-table-cell first-row"><span>Subtotal</span></div>
                          <div className="d-table-cell first-row">
                            11.19 <span>SR</span>
                          </div>
                        </div>
                        <div className="d-table-row">
                          <div className="d-table-cell"><span>Shipping Cost</span></div>
                          <div className="d-table-cell">11.19 <span>SR</span></div>
                        </div>
                        <div className="d-table-row">
                          <div className="d-table-cell"><span>Total</span></div>
                          <div className="d-table-cell">11.19 <span>SR</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 delivery-address">
                      <DeliveryAddress
                        title={translate("deliveryAddress.title")}
                        change={translate("deliveryAddress.change")} deliveryAddress={checkout.deliveryAddress} translate={translate} />
                    </div>
                      <div className="col-12 payment-method">
                        <PaymentMethod
                          title={translate("paymentMethod.title")}
                          change={translate("paymentMethod.change")} paymentMethod={checkout.paymentMethod} translate={translate} />
                      </div>
                  </div>
            </div>
          </section>
        </SmallScreen>
      </Fragment>
    )
  }
}

CheckoutConfirmation = reduxForm({
  form: 'CheckoutConfirmation',
})(CheckoutConfirmation)

const mapStateToProps = state => ({
	translate: getTranslate(state.localize),
  checkout: state.customer.checkout,
});


export default connect(mapStateToProps, null)(CheckoutConfirmation);
