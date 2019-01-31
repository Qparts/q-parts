import React, { Component, Fragment } from 'react';
import { Field } from 'redux-form'
import RenderField from '../RenderField/RenderField';
import Button from '../UI/Button';
import * as validations from '../../utils';
import NumberPicker from '../UI/NumberPicker';
import RenderImage from '../RenderImage/RenderImage';
// import './RenderCartItem.css';
import { getLength } from '../../utils/array';
import * as constant from '../../constants'

export default class extends Component {

    componentWillMount() {
        const { fields, purchasedItems } = this.props;
        console.log(purchasedItems);


        purchasedItems.map(cartItem => {
            return fields.push({
                itemName: cartItem.desc,
                quantity: cartItem.quantity,
                quantityLabel: cartItem.quantityLabel,
                price: cartItem.price,
                currency: cartItem.currency,
                image: cartItem.image,
                productNumber: cartItem.productNumber,
                manufacturerName: cartItem.manufacturerName
            })
        })
    }


    render() {
        const { fields, meta: { error, submitFailed }, deleteText } = this.props;
        return (
            <Fragment>
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
                          <div className="product-price">
                            <p className="price">11.19 <span>sr</span></p>
                            <p className="availability"><i className="in-icon"></i>In Stock (16) - Ships in 24 to 48 hrs </p>
                          </div>
                          <div className="actions">
                            <a href="#" className="btn btn-gray"><i className="icon-heart"></i><span>Move to Wishlist</span></a>
                            <a href="#" className="delete-btn"><i className="icon-trash"></i><span>Delet</span></a>
                          </div>
                        </div>
                        <div className="col-md-3 quantity-div">
                          <h5>Quantity</h5>
                          <div className="input-group quantity">
                            <div className="input-group-prepend">
                              <button className="btn btn-gray" type="button" disabled><i className="minus"></i></button>
                            </div>
                            <input className="form-control" disabled value="1" type="text"/>
                              <div className="input-group-append">
                                <button className="btn btn-gray"  type="button" ><i className="icon-plus"></i></button>
                              </div>
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
                          <div className="product-price">
                            <p className="price">11.19 <span>sr</span></p>
                            <p className="availability"><i className="in-icon"></i>In Stock (16) - Ships in 24 to 48 hrs </p>
                          </div>
                          <div className="actions">
                            <a href="#" className="btn btn-gray"><i className="icon-heart"></i><span>Move to Wishlist</span></a>
                            <a href="#" className="delete-btn"><i className="icon-trash"></i><span>Delet</span></a>
                          </div>
                        </div>
                        <div className="col-md-3 quantity-div">
                          <h5>Quantity</h5>
                          <div className="input-group quantity">
                            <div className="input-group-prepend">
                              <button className="btn btn-gray" type="button" disabled><i className="minus"></i></button>
                            </div>
                            <input className="form-control" disabled value="1" type="text"/>
                              <div className="input-group-append">
                                <button className="btn btn-gray"  type="button" ><i className="icon-plus"></i></button>
                              </div>
                        </div>
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </li>
              </ul>
            </Fragment>
        )
    }
}
