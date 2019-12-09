import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getQuery } from '../../utils/index.js';
import { quotationPaymentResponse } from '../../utils/api';
import * as constant from '../../constants';
import {
	setValidCredit,
	setQuotationValues
} from '../../actions/customerAction';

import { Redirect } from 'react-router-dom';

class QuotationPaymentResponse extends Component {
	constructor(props) {
		super(props);

		quotationPaymentResponse(props.location.search);
	}

	render() {
		const { location } = this.props;
		const params = getQuery(location);

		if (params.status === constant.paymentStatus.failed) {
			this.props.setValidCredit(false);
			return <Redirect to='/quotation-order' />;
		}

		this.props.setValidCredit(true);
		this.props.setQuotationValues({});

		return (
			<Redirect
				to={`/quotation-order/confirmation?quotationId=${
					params.quotationId
				}`}
			/>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			setValidCredit,
			setQuotationValues
		},
		dispatch
	);
};

export default connect(
	null,
	mapDispatchToProps
)(QuotationPaymentResponse);
