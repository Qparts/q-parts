import React, { Component, Fragment } from 'react'
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { PENDING, DECREMENT, INCREMENT } from '../../../constants';
import Button from '../../UI/Button';
import NumberPicker from '../NumberPicker';

export class ListGroupCollapse extends Component {
    submit = (products, event) => {

        event.preventDefault();
        this.props.setSelectedProduct(products)
        .then(() => {
            this.props.handleSubmit();
        })
    }
    render() {
        const { quotationItem, id, type } = this.props;

        return (
            <div className="collapse" id={id}>
                <div className="d-table product-options">
                    {
                        type === PENDING ?
                            <Fragment>
                                <div className="d-table-row">
                                    <div className="d-table-cell"><span>Name </span></div>
                                    <div className="d-table-cell">{quotationItem.name}</div>
                                </div>
                                <div className="d-table-row">
                                    <div className="d-table-cell"><span>Quantity</span></div>
                                    <div className="d-table-cell">{quotationItem.quantity}</div>
                                </div>
                            </Fragment> :
                            <form onSubmit={this.submit.bind(this, quotationItem.products)}>
                                <div className="d-table-row">
                                    <div className="d-table-cell"><span>Name </span></div>
                                    <div className="d-table-cell">{quotationItem.name}</div>
                                </div>
                                <div className="d-table-cell cart-quantity d-block d-lg-none">
                                    <h5>Quantity</h5>
                                    <Field
                                        type="text"
                                        name="quantity"
                                        component={NumberPicker}
                                    />
                                </div>
                                <div className="d-table-cell">
                                    <p>{quotationItem.products.salesPrice.toFixed(2)} <span>SR</span></p>
                                </div>
                                <div className="d-table-cell">
                                    <Button
                                        isReverseOrder
                                        type="submit"
                                        className="btn btn-primary"
                                        text={'Add to cart'}
                                        icon="icon-cart" />
                                </div>
                            </form>
                    }
                </div>
            </div>
        )
    }
}

ListGroupCollapse = reduxForm({
    form: 'ListGroupCollapse'
})(ListGroupCollapse);

ListGroupCollapse = connect(
    state => {
        return {
            initialValues: { quantity: 1 }
        }
    }
)(ListGroupCollapse)

export default ListGroupCollapse;
