import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslate } from "react-localize-redux";

class ShippingAndDeliveryPolicy extends Component {
  render () {
    const { translate } = this.props;
    return(
      <div id="terms-and-conditions" className="container-fluid">
        <h4>
          {translate('terms.shippingAndDeliveryPolicy.shippingAndDelivery')}
        </h4>
        <h3>
          {translate('terms.shippingAndDeliveryPolicy.countriesAreasShipTo.header')}
        </h3>
        <p>
          {translate('terms.shippingAndDeliveryPolicy.countriesAreasShipTo.status')}
        </p>
        <h3>
          {translate('terms.shippingAndDeliveryPolicy.deliverOrder.header')}
        </h3>
        <p>
          {translate('terms.shippingAndDeliveryPolicy.deliverOrder.status')}
        </p>
        <ul>
          <li>
            {translate('terms.shippingAndDeliveryPolicy.deliverOrder.statusA')}
          </li>
          <li>
            {translate('terms.shippingAndDeliveryPolicy.deliverOrder.statusB')}
          </li>
          <li>
            {translate('terms.shippingAndDeliveryPolicy.deliverOrder.statusC')}
          </li>
          <li>
            {translate('terms.shippingAndDeliveryPolicy.deliverOrder.statusD')}
          </li>
          <li>
            {translate('terms.shippingAndDeliveryPolicy.deliverOrder.statusE')}
          </li>
        </ul>
        <h3>
          {translate('terms.shippingAndDeliveryPolicy.receiveConfirmation.header')}
        </h3>
        <p>
          {translate('terms.shippingAndDeliveryPolicy.receiveConfirmation.status')}
        </p>
        <h3>
          {translate('terms.shippingAndDeliveryPolicy.multipleShipments.header')}
        </h3>
        <p>
          {translate('terms.shippingAndDeliveryPolicy.multipleShipments.status')}
        </p>
        <h3>
          {translate('terms.shippingAndDeliveryPolicy.chargedForDelivery.header')}
        </h3>
        <p>
          {translate('terms.shippingAndDeliveryPolicy.chargedForDelivery.status')}
        </p>
        <h3>
          {translate('terms.shippingAndDeliveryPolicy.estimatedTime.header')}
        </h3>
        <p>
          {translate('terms.shippingAndDeliveryPolicy.estimatedTime.status')}
        </p>
        <h3>
          {translate('terms.shippingAndDeliveryPolicy.payAfterReceiving.header')}
        </h3>
        <p>
          {translate('terms.shippingAndDeliveryPolicy.payAfterReceiving.status')}
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.localize)
  }
}

export default connect(mapStateToProps, null)(ShippingAndDeliveryPolicy);
