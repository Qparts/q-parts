import React, { Component, Fragment } from 'react';
import { reduxForm, FieldArray } from 'redux-form';
import { withRouter } from 'react-router-dom';
import Button from '../UI/Button';
import Table from '../UI/Table';
import RenderCartItem from '../RenderCartItem/RenderCartItem';
import DeliveryAddress from '../DeliveryAddress/DeliveryAddress';
import PaymentMethod from '../PaymentMethod/PaymentMethod';

import './CheckoutConfirmation.css';

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
    const headers = [
      translate("checkout.confirm.table.items"),
      translate("checkout.confirm.table.quantity"),
      translate("checkout.confirm.table.price"),
    ]
    return (
      <Fragment>
        <div className="border rounded card card-body">
          <div className="CheckoutConfirmation-container">
            <DeliveryAddress 
            title={translate("deliveryAddress.title")} 
            change={translate("deliveryAddress.change")} deliveryAddress={checkout.deliveryAddress} />
            
            <PaymentMethod 
            title={translate("paymentMethod.title")} 
            change={translate("paymentMethod.change")} paymentMethod={checkout.paymentMethod} />
          </div>
          <div className="CheckoutConfirmation_items card">
            <Table
              headers={headers}
              columns={[{}]}
            />
            <FieldArray
              deleteText={translate("cart.table.delete")}
              name="purchasedItems"
              purchasedItems={mockCart}
              component={RenderCartItem}
            />
          </div>
          <div>
            <Button type="button" className="btn btn-secondary" text={translate("checkout.confirm.placeOrder")} onClick={this.handleClick} />
          </div>
        </div>
      </Fragment>
    )
  }
}

CheckoutConfirmation = reduxForm({
  form: 'CheckoutConfirmation',
})(CheckoutConfirmation)

export default withRouter(CheckoutConfirmation);