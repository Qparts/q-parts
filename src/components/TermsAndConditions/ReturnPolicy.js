import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTranslate } from "react-localize-redux";

class ReturnPolicy extends Component {
  render () {
    const { translate } = this.props;
    return(
      <div id="terms-and-conditions" className="container-fluid">
        <h4>
          {translate('terms.returnPolicy.return')}
        </h4>
        <h3>
          {translate('terms.returnPolicy.header')}
        </h3>
        <p>
          {translate('terms.returnPolicy.status')}
        </p>
        <h3>
          {translate('terms.returnPolicy.authenticityGuarantee.header')}
        </h3>
        <p>
          {translate('terms.returnPolicy.authenticityGuarantee.status')}
        </p>
        <h3>
          {translate('terms.returnPolicy.quantityGuarantee.header')}
        </h3>
        <p>
          {translate('terms.returnPolicy.quantityGuarantee.header')}
        </p>
        <h3>
          {translate('terms.returnPolicy.returns.header')}
        </h3>
        <ul>
          <li>
            {translate('terms.returnPolicy.returns.statusA')}
          </li>
          <li>
            {translate('terms.returnPolicy.returns.statusB')}
          </li>
          <li>
            {translate('terms.returnPolicy.returns.statusC')}
          </li>
          <li>
            {translate('terms.returnPolicy.returns.statusD')}
          </li>
          <li>
            {translate('terms.returnPolicy.returns.statusE')}
          </li>
          <li>
            {translate('terms.returnPolicy.returns.statusF')}
          </li>
          <li>
            {translate('terms.returnPolicy.returns.statusG')}
          </li>
        </ul>
        <h3>
          {translate('terms.returnPolicy.returnProcess.header')}
        </h3>
        <ol>
          <li>
            {translate('terms.returnPolicy.returnProcess.statusA')}
          </li>
          <li>
            {translate('terms.returnPolicy.returnProcess.statusB')}
          </li>
          <li>
            {translate('terms.returnPolicy.returnProcess.statusC')}
          </li>
          <li>
            {translate('terms.returnPolicy.returnProcess.statusD')}
          </li>
          <li>
            {translate('terms.returnPolicy.returnProcess.statusE')}
          </li>
        </ol>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    translate: getTranslate(state.localize)
  }
}

export default connect(mapStateToProps, null)(ReturnPolicy);
