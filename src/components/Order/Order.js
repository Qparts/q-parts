import React, { Component } from 'react';
import Table from '../UI/Table';
import Button from '../UI/Button';
import OrderSummary from '../OrderSummary/OrderSummary';
import DeliveryAddress from '../DeliveryAddress/DeliveryAddress';
import PaymentMethod from '../PaymentMethod/PaymentMethod';

import './Order.css'

class Order extends Component {
 render() {
  const { checkout, translate } = this.props;
  const mockItems = [
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
  const styles = {
   grey: {
    backgroundColor: '#f8f9fa'
   },
   space: {
    padding: '2em 0em 0em 0em'
   }
  }
  const headers = [
   translate("setting.order.orderDetail.table.items"),
   translate("setting.order.orderDetail.table.quantity"),
   translate("setting.order.orderDetail.table.price")
  ];
  return (
   <div className="Order-container">
    <div style={styles.grey} className="Order_header">
     <div>
      <p>{translate("setting.order.orderNo")}</p>
      <p>#XXX12XX</p>
     </div>
     <div>
      <p>{translate("setting.order.orderPlaced")}</p>
      <p>10/2/2018</p>
     </div>
     <div>
      <p>{translate("setting.order.shippedTo")}</p>
      <p>This address</p>
     </div>
     <div>
      <Button type="reset" className="btn btn-secondary" text={translate("setting.order.buttons.returnEx")} />
     </div>
     <div>
      <Button type="reset" className="btn btn-secondary" text={translate("setting.order.buttons.cancel")} />
     </div>
    </div>
    <div style={styles.space} className="Order-return_conditions">
     <p>{translate("setting.order.returnCondition")}</p>
     <div>
      <Button type="reset" className="btn btn-secondary" text={translate("setting.order.buttons.returnCondition")} />
     </div>
     <div>
      <Button type="reset" className="btn btn-secondary" text={translate("setting.order.buttons.shippingCondition")} />
     </div>
    </div>
    <div style={styles.space}>
     <h4>{translate("setting.order.orderDetail.title")}</h4>
     <div className="border rounded card">
      <Table
       headers={headers}
       columns={mockItems}
      />
     </div>
    </div>
    <div style={styles.space} className="Order-summary">
     <h4>{translate("setting.order.orderSummary")}</h4>
     <OrderSummary translate={translate} sumbitButton={translate("orderSummary.checkout")} removeHeader />
    </div>
    <div style={styles.space} className="Order-footer">
     <DeliveryAddress
      deliveryAddress={checkout.deliveryAddress}
      title={translate("deliveryAddress.title")}
      change={translate("deliveryAddress.change")} />

     <PaymentMethod
      paymentMethod={checkout.paymentMethod}
      title={translate("paymentMethod.title")}
      change={translate("paymentMethod.change")} />
    </div>
   </div>
  )
 }
}

export default Order;