import React, { Component, Fragment } from 'react';
import {
	Field, reduxForm, change as changeFieldValue, FieldArray, getFormValues
} from 'redux-form';
import Link from '../../components/UI/Link';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import SelectInput from '../SelectInput/SelectInput';
import Button from '../UI/Button';
import RenderPartInfo from '../RenderPartInfo/RenderPartInfo';
import * as validations from '../../utils';
import { getTranslatedObject } from '../../utils';
import { isAuth } from '../../utils';
import { right } from '../../utils';
import { getRegions } from '../../actions/apiAction';
import { setQuotationOrder } from '../../actions/customerAction';
import _ from 'lodash';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import './QuotationRequest.css';
import Title from '../UI/Title';
import OrderSteps from '../OrderSteps';
import Vehicles from '../Vehicles/Vehicles';
import Login from '../../containers/Authentication/Login/Login';
import { postQuotation } from '../../utils/api';
import { getFormattedVehicles } from '../../utils/components';

const vehicles = 'vehicles';
const signin = 'signin';

class QuotationRequest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
			dialogType: signin
		}

		if (isAuth(this.props.token)) {
			this.props.getRegions(this.props.customer.countryId);
		}
	}

	handleSubmit = values => {
		const { vehicleForm: {
			vehicle: { make: { id: makeId } }, id: customerVehicleId }, quotationItems: quotationItemsTemp, city: { id: cityId } } = values;

		const quotationItems = !_.isEmpty(quotationItemsTemp) ?
			quotationItemsTemp.map(quotationCartItem => {
				return { ...quotationCartItem, hasImage: quotationCartItem.image ? true : false }
			}) : undefined;

		postQuotation({ cityId, makeId, customerVehicleId, quotationItems })
			.then(res => {
				this.props.setQuotationOrder(false);
				return this.props.history.push(`/quotation-order/confirmation?quotationId=${res.data.quotationId}`);
			})
	}

	handleVehicle = (event) => {
		event.preventDefault();
		this.setState({
			dialogType: vehicles
		});
		this.togglePopup();
	}

	togglePopup = () => {
		this.setState({
			modal: !this.state.modal
		})
	}

	handleLogin = e => {
		e.preventDefault();
		this.setState({
			dialogType: signin
		});
		this.togglePopup();
	}

	getDialogProps = () => {
		const { translate } = this.props;
		const { dialogType } = this.state;

		switch (dialogType) {
			case vehicles:
				return {
					header: <Title
						header={translate("dialog.vehicle.title")}
						subHeader={translate("dialog.vehicle.subTitle")} />,
					className: 'garage-popup'
				}
			case signin:
				return {
					header: <Title header={translate("dialog.signin.title")} />,
					className: ''
				}
			default:
				break;
		}
	}
	getDialogComponent = () => {
		const { dialogType } = this.state;
		const { direction, defaultLang } = this.props

		switch (dialogType) {
			case vehicles:
				return <Vehicles
					toggle={this.togglePopup}
					direction={direction}
					defaultLang={defaultLang}
				/>

			case signin:
				return <Login toggle={this.togglePopup} />

			default:
				break;
		}
	}

	render() {
		const { handleSubmit, translate, direction, defaultLang, vehicles } = this.props;
		const dialog = <Modal dir={direction} contentClassName="container-fluid" className={this.getDialogProps().className} isOpen={this.state.modal} toggle={this.togglePopup} >
			<ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
			<ModalBody>
				{this.getDialogComponent()}
			</ModalBody>
		</Modal>

		const vehiclesFormat = getFormattedVehicles(vehicles, defaultLang);
		const regions = this.props.regions ? this.props.regions.map(region => {
			return {
				...region,
				value: region.id,
				label: getTranslatedObject(region, defaultLang, 'name', 'nameAr'),
			}
		}) : [];
		const cities = _.has(this.props.formValues, 'region.cities') ?
			this.props.formValues.region.cities.map(city => {
				return {
					...city,
					label: getTranslatedObject(city, defaultLang, 'name', 'nameAr'),
					value: city.id
				}
			}) : [];

		const styles = {
			footer: {
				marginTop: isAuth(this.props.token) ? '' : '56px'
			}
		}
		return (
			<Fragment>
				<section id="custom-header">
					<div className="container-fluid custom-header-content">
						<div className="row custom-header-title">
							<header className="col">
								<h1>{translate("quotationOrder.title")}</h1>
								<p>{translate("quotationOrder.title")} {translate("quotationOrder.request")}</p>
							</header>
						</div>
					</div>
				</section>
				<section id="custom-title">
					<div className="container-fluid">
						<div className="row">
							<div className="col-md-6 col-3 title-left">
								<h1>3</h1>
							</div>
							<div className="col-md-6 col-9 title-right">
								<h1>{translate("quotationOrder.steps.title")}</h1>
								<p>{translate("quotationOrder.steps.subTitle")}</p>
							</div>
						</div>
					</div>
				</section>
				<section id="custom-details">
					<div className="container-fluid">
						<OrderSteps grey="-gs" translate={translate} direction={direction} />
						<div className="title-container">
							<Title header={translate("quotationOrder.steps.requestParts.title")}
								subHeader={translate("quotationOrder.steps.requestParts.subTitle")} />
						</div>
						<form onSubmit={handleSubmit(this.handleSubmit)}>
							{
								isAuth(this.props.token) &&
								<div className="custom-container col-12">
									<div className="row d-flex">
										<div className="col-6">
											<h3>{translate("quotationOrder.vehicle.title")}</h3>
										</div>
										<div className="col-6 garage-btn-container">
											<Link
												to={'#'}
												isReverseOrder
												className='btn btn-gray'
												text={translate("form.vehicle.title")}
												icon='icon-vehicle'
												onClick={this.handleVehicle}
											/>
										</div>
									</div>
									<div className="row">
										<div className="col-12 select-field-make-container">
											<Field
												name="vehicleForm"
												placeholder={translate("form.select")}
												component={SelectInput}
												options={vehiclesFormat}
												validate={[validations.required]}
											/>

										</div>
									</div>
								</div>
							}

							<div className="custom-container col-12">
								<div className="row d-flex">
									<div className="col-6">
										<h3>{translate("quotationRequest.partInfo.title")}</h3>
									</div>
								</div>
								<FieldArray
									name="quotationItems"
									component={RenderPartInfo}
									add={translate("quotationRequest.partInfo.add")}
									deleteIcon="icon-trash"
									placeholder={translate("quotationRequest.placeholder.carInfo.vin")}
								/>
							</div>
							{
								isAuth(this.props.token) &&
								<div className="custom-container col-12">
									<div className="row d-flex">
										<div className="col-6">
											<h3>{translate("quotationOrder.shipping.title")}</h3>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6 col-12 select-region-field-container padding-md-right-0">
											<Field
												name="region"
												placeholder={translate("form.select")}
												component={SelectInput}
												options={regions}
												validate={[validations.required]}
											/>

										</div>
										<div className="col-md-6 col-12 select-city-field-container padding-md-left-6 padding-md-right-0">
											<Field
												name="city"
												placeholder={translate("form.select")}
												component={SelectInput}
												options={cities}
												validate={[validations.required]}
											/>

										</div>
									</div>
								</div>
							}

							<div className="col-12 padding-right-0" style={styles.footer}>
								<div className="row d-flex">
									<div className="col-md-6 col-12 links">
										<p>{translate("quotationOrder.agreement.title")} <a href="#">{translate("quotationOrder.agreement.linkOne")} </a> {translate("general.and")} <a href="#">{translate("quotationOrder.agreement.linkTwo")}</a>.</p>
									</div>
									{
										isAuth(this.props.token) ?
											<div className="col-md-6 col-12 garage-btn-container padding-md-right-0">
												<Button type="submit" className="btn btn-primary btn-footer" text={
													<Fragment>
														<span>{translate("general.send")}</span>
														<i className={`icon-arrow-${right(direction)}`}></i>
													</Fragment>
												} />
											</div> :
											<div className="col-md-6 col-12 btn-continue">
												<Link
													to={"#"}
													className="btn btn-primary btn-footer"
													text={translate("dialog.continue")}
													onClick={this.handleLogin} />
											</div>
									}
								</div>
							</div>
						</form>
					</div>
				</section>
				{dialog}
			</Fragment>
		)
	}
}

QuotationRequest = reduxForm({
	form: 'QuotationRequest'
})(QuotationRequest)

const mapStateToProps = (state) => {
	const customerObj = state.customer;

	return {
		customer: customerObj.detail,
		token: state.customer.token,
		vehicles: customerObj.detail.vehicles,
		selectedVehicle: customerObj.selectedVehicle,
		regions: state.api.regions,
		formValues: getFormValues('QuotationRequest')(state),
		translate: getTranslate(state.localize),
		direction: state.customer.direction,
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		changeFieldValue,
		getRegions,
		setQuotationOrder
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotationRequest);