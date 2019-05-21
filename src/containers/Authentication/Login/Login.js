import React, { Component, Fragment } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, getFormSubmitErrors } from 'redux-form';
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import Button from '../../../components/UI/Button';
import { Alert } from 'reactstrap';

import RenderField from '../../../components/RenderField/RenderField';
import SocialMedia from '../SocialMedia/SocialMedia';
import PrivateRoute from '../../../components/PrivateRoute';
import ResetPassword from '../../../components/ResetPassword/ResetPassword';

import { login, sendSmsCode, resetPassword, socialMediaButton, setCheckLoginCheckout, setCheckLoginQuotationOrder, setQuotationOrder } from '../../../actions/customerAction';
import WithSocialMedia from '../../../hoc/WithSocialMedia';

import * as validations from '../../../utils';
import { getComponentName, right } from '../../../utils';


import { ON_SOCIAL_MEDIA_AUTH } from '../../../constants';
import Radio from '../../../components/UI/Radio';

import { postQuotation } from '../../../utils/api';
import _ from 'lodash';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showResetPassword: false,
			rememberMe: false
		}
	}


	handleSubmit = values => {
		const serverErrorField = "password"

		const { match } = this.props;
		if (match.url !== '/login' && match.url !== '/loginCheckout') {
			return this.props.login(values.email, values.password, serverErrorField, this.props.currentLanguage)
				.then(() => {
					this.props.toggle()
					if (this.props.checkLoginCheckout) {
						window.location.pathname = "/checkout";
						this.props.setCheckLoginCheckout(false);
					} else if (this.props.checkLoginQuotationOrder) {
						let {
							make: { id: makeId }, year: { id: vehicleYearId }, garage, vin, vinImage, quotationItems: quotationItemsTemp, city: { id: cityId }, mobile
						} = this.props.quotationOrderInfo;
						const customerVehicleId = garage ? garage.id : null;
						const imageAttached = vinImage ? true : false;
						vin = customerVehicleId ? null : _.isUndefined(vin) ? null : vin;
						vinImage = vinImage ? vinImage : false;
						makeId = customerVehicleId ? garage.vehicle.make.id : makeId;
						vehicleYearId = customerVehicleId ? null : vehicleYearId;

						const quotationItems = !_.isEmpty(quotationItemsTemp) ?
							quotationItemsTemp.map(quotationCartItem => {
								return { ...quotationCartItem, hasImage: quotationCartItem.image ? true : false }
							}) : undefined;

						this.props.setCheckLoginQuotationOrder(false);
						const mobileNumber = `${966}${mobile}`;
						postQuotation({ cityId, makeId, customerVehicleId, quotationItems, vehicleYearId, vin, imageAttached, vinImage, mobileNumber })
							.then(res => {
								this.props.setQuotationOrder(false);
								return this.props.history.push(`/quotation-order/confirmation?quotationId=${res.data.quotationId}`);
							})
					}
				});
		} else {
			return this.props.login(values.email, values.password, serverErrorField, this.props.currentLanguage);
		}
	}

	handleChange = (event) => {
		let screenSize = window.innerWidth;
		if (screenSize > 992) {
			this.props.toggle();
		}
		this.props.history.push('/signup')
	};

	onConfirmDialog = values => {
		return this.props.sendSmsCode(values, this.props.currentLanguage)
			.then(() => {
				this.props.onHide();
				this.setState({
					showResetPassword: true
				});
				this.props.history.push('/login/reset-password');
			});
	}

	handleRememberMe = e => {
		this.setState({ rememberMe: !this.state.rememberMe })
	}

	onResetPassword = values => {
		const serverErrorField = "code"
		return this.props.resetPassword(values, serverErrorField)
			.then(() => {
				this.props.history.push('/');
			});
	}
	renderLogin = (login) => {
		const { translate, submitErrors } = this.props;

		return <Fragment>
			<div>
				{
					submitErrors.password &&
					<Alert color="danger">
						{submitErrors.password}
					</Alert>
				}
				{login}
				<SocialMedia
					title={translate("form.signin.socialMedia")}
					handleResponse={this.props.handleResponse}
					handleFailure={this.props.handleFailure} />
				<p className="sign-up-link">
					{translate("form.signin.signup")}
					<Button className="btn-link" text={translate("form.signin.joinUs")} onClick={this.handleChange} />
					{translate("form.signin.here")}
				</p>
			</div>
		</Fragment>
	}
	handleForgotPassword = () => {
		this.props.toggle();
	}

	render() {
		const { translate, direction, submitting } = this.props;
		let login = (
			<form className="gray-input" onSubmit={this.props.handleSubmit(this.handleSubmit)}>
				<Field
					hasFloatLabel
					name="email"
					type="email"
					placeholder={translate("form.signin.email")}
					label={translate("form.signin.email")}
					component={RenderField}
				/>
				<Field
					hasFloatLabel
					name="password"
					type="password"
					placeholder={translate("form.signin.password")}
					label={translate("form.signin.password")}
					component={RenderField}
				/>
				<div className="row forger-password">
					<div className="col checkbox">
						<input type="checkbox" id="O1" />
						<label htmlFor="O1">{translate("form.signin.rememberMe")}</label>
					</div>
					<div className="col-auto">
						<Link
							to="/password/forgot-password"
							onClick={this.handleForgotPassword}>
							{translate("form.signin.forgotPassword")}
						</Link>
					</div>
				</div>
				<Button disabled={submitting} className="btn btn-primary" text={translate("form.signin.button")} icon={`icon-arrow-${right(direction)}`} />
			</form>
		)
		return (
			<section className="login">
				{
					this.renderLogin(login)
				}
				<PrivateRoute
					path="/login/reset-password"
					fakeAuth={this.state.showResetPassword}
					translate={translate}
					component={ResetPassword}
					showPhoneNo={true}
					onSubmit={this.onResetPassword}
					redirectTo="/login" />
			</section>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.customer.token,
		translate: getTranslate(state.localize),
		component: getComponentName(ON_SOCIAL_MEDIA_AUTH),
		currentLanguage: getActiveLanguage(state.localize).code,
		selectedCountry: state.customer.selectedCountry,
		direction: state.customer.direction,
		submitErrors: getFormSubmitErrors('Login')(state),
		checkLoginCheckout: state.customer.checkLoginCheckout,
		checkLoginQuotationOrder: state.customer.checkLoginQuotationOrder,
		quotationOrderInfo: state.customer.quotationOrderInfo
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		login,
		sendSmsCode,
		resetPassword,
		socialMediaButton,
		setCheckLoginCheckout,
		setCheckLoginQuotationOrder,
		setQuotationOrder
	}, dispatch)
}

Login = reduxForm({
	form: 'Login'
})(Login)

const WithLogin = withRouter(WithSocialMedia(Login));
export default connect(mapStateToProps, mapDispatchToProps)(WithLogin);
