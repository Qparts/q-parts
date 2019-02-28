import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { getTranslatedObject, l, right } from '../../utils';
import { handleImageFallback } from '../../utils';
import * as constant from '../../constants';

export default class extends Component {
  static defaultProps = {
    divCol: 'col-lg-9'
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
    const { purchasedItems, removeButton, divCol, direction, translate, currentLanguage } = this.props;

    return (
      <Fragment>
        <div className={`render-cart-item ${divCol}`}>
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
                            <h4>{getTranslatedObject(purchasedItem.brand, currentLanguage, 'name', 'nameAr')} <span>{purchasedItem.productNumber}</span></h4>
                          </header>
                          <div className="cart-quantity d-block d-lg-none">
                            <h5>{translate("general.quantity")}</h5>
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
                            <p className="price">{purchasedItem.salesPrice} <span>{translate("general.currency")}</span></p>
                          </div>
                          <div className="cart-actions">
                            <Link to="#" className="isDisabled btn btn-gray"><i className="icon-heart"></i><span>{translate("general.buttons.wishlist")}</span></Link>
                            <Link to="#" className="isDisabled delete-btn"><i className="icon-trash"></i><span>{translate("general.buttons.delete")}</span></Link>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="cart-quantity d-none d-lg-block">
                            <h5>{translate("general.quantity")}</h5>
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
            <div className={`col-md-6 m${l(direction)}-md-auto`}>
              {
                !removeButton && <Link to="/" className="btn cart-back">{translate("general.buttons.continueShopping")}<i className={`icon-arrow-${right(direction)}`}></i></Link>
              }
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}
