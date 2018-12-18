import React, { Component, Fragment } from 'react';
import { Field } from 'redux-form'
import RenderField from '../RenderField/RenderField';
import Button from '../UI/Button';
import * as validations from '../../utils';
import NumberPicker from '../UI/NumberPicker';
import RenderImage from '../RenderImage/RenderImage';
// import './RenderCartItem.css';

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
                        <div class="row">
                            <div className="col-3 col-md-2">
                                <Field
                                    name={`${cartItem}.image`}
                                    component={RenderImage}
                                />
                            </div>
                            <div className="col-9 col-md-5 pt">
                                <div className="cart_product-details">
                                    <Field
                                        className="part-text"
                                        name={`${cartItem}.itemName`}
                                        type="text"
                                        component={RenderField}
                                        readOnly
                                    />
                                    <Field
                                        className="manufacturer-text"
                                        name={`${cartItem}.manufacturerName`}
                                        type="text"
                                        component={RenderField}
                                        readOnly
                                    />
                                    <Field
                                        className="part-text w-sm-100"
                                        name={`${cartItem}.productNumber`}
                                        type="text"
                                        component={RenderField}
                                        readOnly
                                    />
                                    <div className="q-display-small quantity-small">
                                        <Field
                                            className="part-text"
                                            name={`${cartItem}.quantityLabel`}
                                            type="text"
                                            component={RenderField}
                                            readOnly
                                        />
                                        <Field
                                            name={`${cartItem}.quantity`}
                                            component={NumberPicker}
                                        />
                                    </div>
                                    <div className="w-100">
                                        <Field
                                            className="sales-price"
                                            name={`${cartItem}.price`}
                                            readOnly
                                            component={RenderField}
                                        />
                                        <Field
                                            className="currency"
                                            name={`${cartItem}.currency`}
                                            readOnly
                                            component={RenderField}
                                        />
                                    </div>
                                    <Button
                                        isReverseOrder={true}
                                        type="button"
                                        className="btn-secondary"
                                        text={"Move to wishlist"}
                                        icon="icon-heart"
                                    />
                                    <Button
                                        type="button"
                                        className="btn-secondary"
                                        text={deleteText}
                                        onClick={() => fields.remove(idx)}
                                    />
                                </div>
                            </div>
                            <div className="col-md-5 pt q-hide-small">
                                <Field
                                    className="part-text"
                                    name={`${cartItem}.quantityLabel`}
                                    type="text"
                                    component={RenderField}
                                    readOnly
                                />
                                <Field
                                    name={`${cartItem}.quantity`}
                                    component={NumberPicker}
                                />
                            </div>
                        </div>
                    </div>
                }
                )}
            </Fragment>
        )
    }
}