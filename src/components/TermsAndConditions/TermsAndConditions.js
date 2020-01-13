import React, { Component } from 'react'
import PrivacyPolicy from './PrivacyPolicy'
import ReturnPolicy from './ReturnPolicy'
import ShippingAndDeliveryPolicy from './ShippingAndDeliveryPolicy'
import { connect } from 'react-redux';
import { getTranslate } from "react-localize-redux";

class TermsAndConditions extends Component {
  render () {
    const { translate } = this.props;
    return(
      <div id="terms-and-conditions" className="container-fluid">
        <h1 className="header">
          {translate("terms.header")}
        </h1>
        <PrivacyPolicy translate={translate}/>
        <ReturnPolicy translate={translate}/>
        <ShippingAndDeliveryPolicy translate={translate} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.localize)
  }
}

export default connect(mapStateToProps, null)(TermsAndConditions);
