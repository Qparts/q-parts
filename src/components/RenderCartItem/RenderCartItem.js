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
                {submitFailed && error && <span>{error}</span>}
                {fields.map((cartItem, idx) => {
                    return <div key={idx} className="border card">
                        <div className="row item">
                        <img
                          src={"/img/product-4.jpg"}
                          alt=""
                        />
                      <div className="text-item row">
                        <div className="d-flex justify-content-between col-12" style={{display:'flex'}}>
                          <div style={{display:'inline-block',paddingLeft:'0px'}} className="col-8">
                            <span className="product-Name">By</span>
                            <span className="product-Name"> {cartItem.name} </span>
                            <span className="product-Number"> #{cartItem.productNumber} </span>
                          </div>
                          <div className="product-quantity col-4">
                            <p>Quantity</p>
                            <Field
                                name={`${cartItem}.quantity`}
                                component={NumberPicker}
                            />
                          </div>
                          </div>
                        <div className="col-12">
                          <span className="product-price">{cartItem.salesPrice}</span>
                          <sub className="product-price-sr">SR</sub>
                          </div>
                          <div className="col-12">
                            <Button
                                isReverseOrder={true}
                                type="button"
                                className="btn-secondary"
                                text={"Move to wishlist"}
                                icon="icon-heart"
                            />
                            <Button
                                type="button"
                                className="btn-delete"
                                text={deleteText}
                                onClick={() => fields.remove(idx)}
                                icon="icon-trash"
                                isReverseOrder
                            />
                          </div>
                        </div>
                        </div>
                    </div>
                }
                )}
            </Fragment>
        )
    }
}
