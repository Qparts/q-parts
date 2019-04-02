import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from "react-localize-redux";

class PrivacyPolicy extends Component {
  render () {
    const { translate } = this.props;
    return(
      <div id="terms-and-conditions" className="container-fluid">
        <div>
          <h4>Q-Parts Privacy Policyaa</h4>
        </div>
        <h3>
          {translate('terms.privacyPolicy.welcome')}
        </h3>
        <p>
          {translate('terms.privacyPolicy.welcomeStatus')}
        </p>
        <h3>
          {translate('terms.privacyPolicy.accountObligations')}
        </h3>
        <p>
          {translate('terms.privacyPolicy.accountObligationsStatus')}
        </p>
        <h3>
          {translate("terms.privacyPolicy.informationCollect.header")}
        </h3>
        <p>
          {translate("terms.privacyPolicy.informationCollect.status")}
        </p>
        <ol type="a">
          <li>
            {translate("terms.privacyPolicy.informationCollect.statusA")}
          </li>
          <li>
            {translate("terms.privacyPolicy.informationCollect.statusB")}
          </li>
          <li>
            {translate("terms.privacyPolicy.informationCollect.statusC")}
          </li>
          <li>
            {translate("terms.privacyPolicy.informationCollect.statusD")}
          </li>
          <li>
            {translate("terms.privacyPolicy.informationCollect.statusE")}
          </li>
          <li>
            {translate("terms.privacyPolicy.informationCollect.statusF")}
          </li>
          <li>
            {translate("terms.privacyPolicy.informationCollect.statusG")}
          </li>
          <li>
            {translate("terms.privacyPolicy.informationCollect.statusH")}
          </li>
          <li>
            {translate("terms.privacyPolicy.informationCollect.statusI")}
          </li>
          <li>
            {translate("terms.privacyPolicy.informationCollect.statusJ")}
          </li>
        </ol>
        <h3>
          {translate("terms.privacyPolicy.cardDetails.header")}
        </h3>
        <p>
        {translate("terms.privacyPolicy.cardDetails.status")}
       </p>
        <h3>
          {translate("terms.privacyPolicy.useOfYourInformation.header")}
        </h3>
        <p>
          {translate("terms.privacyPolicy.useOfYourInformation.status")}
        </p>
        <ul>
          <li>
            {translate("terms.privacyPolicy.useOfYourInformation.statusA")}
          </li>
          <li>
            {translate("terms.privacyPolicy.useOfYourInformation.statusB")}
          </li>
          <li>
            {translate("terms.privacyPolicy.useOfYourInformation.statusC")}
          </li>
          <li>
            {translate("terms.privacyPolicy.useOfYourInformation.statusD")}
          </li>
          <li>
            {translate("terms.privacyPolicy.useOfYourInformation.statusE")}
          </li>
          <li>
            {translate("terms.privacyPolicy.useOfYourInformation.statusF")}
          </li>
          <li>
            {translate("terms.privacyPolicy.useOfYourInformation.statusG")}
          </li>
          <li>
            {translate("terms.privacyPolicy.useOfYourInformation.statusH")}
          </li>
          <li>
            {translate("terms.privacyPolicy.useOfYourInformation.statusI")}
          </li>
          <li>
            {translate("terms.privacyPolicy.useOfYourInformation.statusJ")}
          </li>
        </ul>
        <h3>
          {translate("terms.privacyPolicy.discloseOfYourInformation.header")}
        </h3>
        <p>
          {translate("terms.privacyPolicy.discloseOfYourInformation.status")}
        </p>
        <ul>
          <li>
            {translate("terms.privacyPolicy.discloseOfYourInformation.statusA")}
          </li>
          <li>
            {translate("terms.privacyPolicy.discloseOfYourInformation.statusB")}
          </li>
          <li>
            {translate("terms.privacyPolicy.discloseOfYourInformation.statusC")}
          </li>
          <li>
            {translate("terms.privacyPolicy.discloseOfYourInformation.statusD")}
          </li>
        </ul>
        <h3>
          {translate("terms.privacyPolicy.authentication.header")}
        </h3>
        <p>
          {translate("terms.privacyPolicy.authentication.status")}
        </p>
        <h3>
          {translate("terms.privacyPolicy.securityMeasures.header")}
        </h3>
        <p>
          {translate("terms.privacyPolicy.securityMeasures.status")}
        </p>
        <h3>
          {translate("terms.privacyPolicy.informationCanAccess.header")}
        </h3>
        <p>
          {translate("terms.privacyPolicy.informationCanAccess.status")}
        </p>
        <h3>
          {translate("terms.privacyPolicy.changOurPrivacy.header")}
        </h3>
        <p>
          {translate("terms.privacyPolicy.changOurPrivacy.status")}
        </p>
        <h3>
          {translate("terms.privacyPolicy.consent.header")}
        </h3>
        <p>
          {translate("terms.privacyPolicy.consent.status")}
        </p>
        <h3>
          {translate("terms.privacyPolicy.contact.header")}
        </h3>
        <p>
          {translate("terms.privacyPolicy.contact.status")}
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

export default connect(mapStateToProps, null)(PrivacyPolicy);
