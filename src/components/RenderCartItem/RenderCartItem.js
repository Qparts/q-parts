import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Field } from 'redux-form'
import RenderField from '../RenderField/RenderField';
import Button from '../UI/Button';
import * as validations from '../../utils';
import NumberPicker from '../UI/NumberPicker';
import RenderImage from '../RenderImage/RenderImage';
// import './RenderCartItem.css';
import { getLength, handleImageFallback } from '../../utils';
import * as constant from '../../constants';

export default class extends Component {
  static defaultProps = {
    divCol: 'col-lg-9'
  }

  componentWillMount() {
    // const { fields, purchasedItems } = this.props;
    // console.log(purchasedItems);


    // purchasedItems.map(cartItem => {
    //   return fields.push({
    //     itemName: cartItem.desc,
    //     quantity: cartItem.quantity,
    //     quantityLabel: cartItem.quantityLabel,
    //     price: cartItem.price,
    //     currency: cartItem.currency,
    //     image: cartItem.image,
    //     productNumber: cartItem.productNumber,
    //     manufacturerName: cartItem.manufacturerName
    //   })
    // })
  }

  handleClick = (action, value, purchasedItem, event) => {
    event.preventDefault();

    console.log(action === constant.DECREMENT);


    const { incrementQuantity, decrementQuantity } = this.props;
    const max = 20;
    const min = 1;
    let newQuanValue = parseInt(value, constant.RADIX);

    if (action === constant.DECREMENT) {
      const decQuantity = newQuanValue !== min ? newQuanValue -= 1 : newQuanValue;
      decrementQuantity({ purchasedItem, decQuantity });
    } else {
      const incQuantity = newQuanValue !== max ? newQuanValue += 1 : newQuanValue;
      incrementQuantity({ purchasedItem, incQuantity });
    }
  }


  render() {
    const { purchasedItems, removeButton, divCol, direction } = this.props;

    return (
      <Fragment>
        <div className={divCol}>
          <ul className="cart-items list-unstyled">
            {
              purchasedItems.map((purchasedItem, idx) => {
                return <li key={idx} className="bg-white">
                  <figure className="row">
                    <Link to="#" className="col-3 item-img">
                      <img onError={handleImageFallback} src={purchasedItem.image} alt="no item" />
                    </Link>
                    <figcaption className="col-9">
                      <div className="row">
                        <div className="col-md-9 item-dis">
                          <header>
                            <h3><Link to="#">{purchasedItem.desc}</Link></h3>
                            <h4>{purchasedItem.brand.name} <span>{purchasedItem.productNumber}</span></h4>
                          </header>
                          <div className="cart-quantity d-block d-lg-none">
                            <h5>Quantity</h5>
                            <div className="input-group quantity">
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-gray"
                                  type="button"
                                  onClick={this.handleClick.bind(this, constant.DECREMENT, purchasedItem.quantity, purchasedItem)}>
                                  <i className="minus"></i></button>
                              </div>
                              <input disabled className="form-control" value={purchasedItem.quantity} type="text" />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-gray" type="button"
                                  onClick={this.handleClick.bind(this, constant.INCREMENT, purchasedItem.quantity, purchasedItem)}>
                                  <i className="icon-plus"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="cart-product-price">
                            <p className="price">{purchasedItem.salesPrice} <span>sr</span></p>
                          </div>
                          <div className="cart-actions">
                            <Link to="#" className="isDisabled btn btn-gray"><i className="icon-heart"></i><span>Move to Wishlist</span></Link>
                            <Link to="#" className="isDisabled delete-btn"><i className="icon-trash"></i><span>Delete</span></Link>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="cart-quantity d-none d-lg-block">
                            <h5>Quantity</h5>
                            <div className="input-group quantity">
                              <div className="input-group-prepend">
                                <button
                                  className="btn btn-gray"
                                  type="button"
                                  onClick={this.handleClick.bind(this, constant.DECREMENT, purchasedItem.quantity, purchasedItem)}>
                                  <i className="minus"></i></button>
                              </div>
                              <input disabled className="form-control" value={purchasedItem.quantity} type="text" />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-gray"
                                  type="button"
                                  onClick={this.handleClick.bind(this, constant.INCREMENT, purchasedItem.quantity, purchasedItem)}>
                                  <i className="icon-plus" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </li>
              })
            }
          </ul>
          <div className="row">
            <div className={`col-md-6 ${direction === constant.ltr ? 'ml-md-auto' : 'mr-md-auto'}`}>
              {
                !removeButton && <Link to="/" className="btn cart-back">Continue Shopping<i className="icon-arrow-right"></i></Link>
              }
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
