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
import { getTranslatedObject } from '../../utils';
import { isAuth } from '../../utils';
import { right } from '../../utils';
import { getRegions } from '../../actions/apiAction';
import { setQuotationOrder } from '../../actions/customerAction';
import _ from 'lodash';
import { getTranslate } from 'react-localize-redux';
import './QuotationRequest.css';
import Title from '../UI/Title';
import OrderSteps from '../OrderSteps';
import Vehicles from '../Vehicles/Vehicles';
import Login from '../../containers/Authentication/Login/Login';
import { postQuotation } from '../../utils/api';
import { getFormattedVehicles } from '../../utils/components';
//static HTML
import RenderFileInput from '../RenderFileInput/RenderFileInput';
const vehicleYear = [
	{ value: 1, label: "2010" },
	{ value: 2, label: "2011" },
	{ value: 3, label: "2012" },
];
const groupedvehicleYear = [
	{
		options: vehicleYear,
	},
];
const formatvehicleYearLabel = () => (
	<div className="placeholder">
		<span>Select Year</span>
	</div>
);
const vehicleMake = [
	{ value: 1, label: "BMW" },
	{ value: 2, label: "KIA" },
	{ value: 3, label: "Ford" },
];
const groupedvehicleMake = [
	{
		options: vehicleMake,
	},
];
const formatvehicleMakeLabel = () => (
	<div className="placeholder">
		<span>Select vehicle Make</span>
	</div>
);
const vehicleModel = [
	{ value: 1, label: "Rio" },
	{ value: 2, label: "Focus" },
	{ value: 3, label: "20CS" },
];
const groupedvehicleModel = [
	{
		options: vehicleModel,
	},
];
const formatvehicleModelLabel = () => (
	<div className="placeholder">
		<span>Select vehicle Model</span>
	</div>
);

const country = [
	{ value: 1, label: "KSA" }
];
const Region = [
	{ value: 1, label: "Riyadh" },
	{ value: 2, label: "Tabuk" },
	{ value: 3, label: "Jazan" },
	{ value: 4, label: "Medina" }
];
const groupedRegion = [
	{
		options: Region,
	},
];
const formatRegionLabel = () => (
	<div className="placeholder">
		<span>Select Region</span>
	</div>
);
const City = [
	{ value: 1, label: "Riyadh" }
];
const groupedCity = [
	{
		options: City,
	},
];
const formatCityLabel = () => (
	<div className="placeholder">
		<span>Select City</span>
	</div>
);
//END static HTML


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
				<section className="hero qutaion-h">
					<picture className="hero-img">
						<source media="(max-width: 480px)" srcSet="/img/custom-req-xxs.jpg" />
						<source media="(max-width: 767px)" srcSet="/img/custom-req-xs.jpg" />
						<img src="/img/custom-req-xl.jpg" alt="OUR SALES MORE THAN 50,000 ITEM" />
					</picture>
					<div className="hero-content">
						<div className="row">
							<header className="col">
								<h1>{translate("quotationOrder.title")}</h1>
								<p>{translate("quotationOrder.title")} {translate("quotationOrder.request")}</p>
							</header>
						</div>
					</div>
				</section>
				<section className="steps-title">
					<div className="total-bg gray-bg"></div>
						<div className="container-fluid">
							<div className="row">
								<div className="col-lg-6 col-auto steps-num">
									<p>3</p>
									<span>
										<i className="icon-arrow-r"></i>
										<i className="icon-arrow-r"></i>
									</span>
								</div>
								<div className="col-lg-6 col steps-cap">
									<p>
										<span>{translate("quotationOrder.steps.title")}</span>
										{translate("quotationOrder.steps.subTitle")}
									</p>
								</div>
							</div>
						</div>
				</section>
				<section className="step-active">
					<div className="container-fluid">
						<OrderSteps grey="-gs" translate={translate} direction={direction} />
					</div>
				</section>
				<section className="custom-order-form container-fluid">
					<div className="title-container">
						<div className="step-num">
							1
							<span>
								<i className="icon-arrow-r"></i>
								<i className="icon-arrow-r"></i>
							</span>
						</div>
						<Title header={translate("quotationOrder.steps.requestParts.title")}
							subHeader={translate("quotationOrder.steps.requestParts.subTitle")} />
					</div>
					<form className="gray-input" onSubmit={handleSubmit(this.handleSubmit)}>
						<div className="sec-shadow  vehicle-not-empty">
								<div className="row">
									<h3 className="col">{translate("quotationOrder.vehicle.title")}</h3>
									<div className="col-auto open-garage">
										<Link
											to={'#'}
											isReverseOrder
											className='btn btn-gray'
											text={translate("form.vehicle.title")}
											icon='icon-vehicle'
											onClick={this.handleVehicle}
										/>
									<p>2</p>
									</div>
								</div>
								<div className="row vehicle-info">
									<div className="col-lg col-md-6 float-label">
										<Field
											label="Make"
											name="make"
											placeholder={" "}
											component={SelectInput}
											options={groupedvehicleMake}
											formatGroupLabel={formatvehicleMakeLabel}
										/>
									</div>
									<div className="col-lg col-md-6 float-label">
											<Field
												label="Model"
												name="model"
												placeholder={" "}
												component={SelectInput}
												options={groupedvehicleModel}
												formatGroupLabel={formatvehicleModelLabel}
											/>
									</div>
									<div className="col-lg-auto col-md-6 float-label">
											<Field
												label="Year"
												name="year"
												placeholder={" "}
												component={SelectInput}
												options={groupedvehicleYear}
												formatGroupLabel={formatvehicleYearLabel}
											/>
									</div>
									<div className="col-lg col-md-6">
										<div className="has-float-label add-file">
											<input type="text" className="form-control" placeholder={translate("quotationOrder.vin")} />
											<label>{translate("quotationOrder.vin")}</label>
												<Field
		                       name="vin num"
		                       component={RenderFileInput}
		                       image="image"
		                     />
									</div>
									</div>
								</div>
						</div>
						<div className="sec-shadow part-array">
								<div className="row">
									<div className="col-lg">
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
						<div className="sec-shadow">
							<div className="row">
								<div className="col-lg">
									<h3>{translate("quotationOrder.shipping.title")}</h3>
								</div>
							</div>
							<div className="row ship-info">
								<div className="col-md float-label disabled">
									<Field
										isDisabled={true}
										label="Country"
										name="Country"
										defaultValue={country[0]}
										component={SelectInput}
									/>
								</div>
								<div className="col-md float-label">
									<Field
										label="Region"
										name="Region"
										placeholder=" "
										component={SelectInput}
										options={groupedRegion}
										formatGroupLabel={formatRegionLabel}
									/>
								</div>
								<div className="col-md float-label">
									<Field
										label="City"
										name="city"
										placeholder=" "
										component={SelectInput}
										options={groupedCity}
										formatGroupLabel={formatCityLabel}
									/>
								</div>
							</div>
						</div>
						<div className="row submit-qout">
							<div className="col-lg">
								<p>{translate("quotationOrder.agreement.title")} <a href="#">{translate("quotationOrder.agreement.linkOne")} </a> {translate("general.and")} <a href="#">{translate("quotationOrder.agreement.linkTwo")}</a>.</p>
							</div>
							<div className="col-lg-auto">
								{
									isAuth(this.props.token) ?
											<Button type="submit" className="btn btn-primary" text={
												<Fragment>
													<span>{translate("general.send")}</span>
													<i className={`icon-arrow-${right(direction)}`}></i>
												</Fragment>
											} />
										 :
											<Link
												to={"#"}
												className="btn btn-primary"
												text={translate("general.send")}
												icon={`icon-arrow-${right(direction)}`}
												onClick={this.handleLogin} />

								}
							</div>
						</div>
					</form>
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


// <section  id="custom-details">
// 	<div className="container-fluid">
// 		<form onSubmit={handleSubmit(this.handleSubmit)}>
// 			{
// 				isAuth(this.props.token) &&
// 				<div className="custom-container col-12">
// 					<div className="row d-flex">
// 						<div className="col-6">
// 							<h3>{translate("quotationOrder.vehicle.title")}</h3>
// 						</div>
// 						<div className="col-6 garage-btn-container">
// 							<Link
// 								to={'#'}
// 								isReverseOrder
// 								className='btn btn-gray'
// 								text={translate("form.vehicle.title")}
// 								icon='icon-vehicle'
// 								onClick={this.handleVehicle}
// 							/>
// 						</div>
// 					</div>
// 					<div className="row">
// 						<div className="col-12 select-field-make-container">
// 							<Field
// 								name="vehicleForm"
// 								placeholder={translate("form.select")}
// 								component={SelectInput}
// 								options={vehiclesFormat}
// 								validate={[validations.required]}
// 							/>
//
// 						</div>
// 					</div>
// 				</div>
// 			}
//
// 			{
// 				isAuth(this.props.token) &&
// 				<div className="custom-container col-12">
// 					<div className="row d-flex">
// 						<div className="col-6">
// 							<h3>{translate("quotationOrder.shipping.title")}</h3>
// 						</div>
// 					</div>
// 					<div className="row">
// 						<div className="col-md-6 col-12 select-region-field-container padding-md-right-0">
// 							<Field
// 								name="region"
// 								placeholder={translate("form.select")}
// 								component={SelectInput}
// 								options={regions}
// 								validate={[validations.required]}
// 							/>
//
// 						</div>
// 						<div className="col-md-6 col-12 select-city-field-container padding-md-left-6 padding-md-right-0">
// 							<Field
// 								name="city"
// 								placeholder={translate("form.select")}
// 								component={SelectInput}
// 								options={cities}
// 								validate={[validations.required]}
// 							/>
//
// 						</div>
// 					</div>
// 				</div>
// 			}
//
// 			<div className="col-12 padding-right-0" style={styles.footer}>
// 				<div className="row d-flex">
// 					<div className="col-md-6 col-12 links">
//
// 					</div>
//
// 				</div>
// 			</div>
// 		</form>
// 	</div>
// </section>
