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
import { getTranslatedObject, renderTopIfError } from '../../utils';
import { isAuth } from '../../utils';
import { right } from '../../utils';
import { getRegions } from '../../actions/apiAction';
import { setQuotationOrder, setCheckLoginQuotationOrder, setQuotationOrderInfo } from '../../actions/customerAction';
import _ from 'lodash';
import { getTranslate } from 'react-localize-redux';
import './QuotationRequest.css';
import Title from '../UI/Title';
import OrderSteps from '../OrderSteps';
import Vehicles from '../Vehicles/Vehicles';
import Login from '../../containers/Authentication/Login/Login';
import { postQuotation } from '../../utils/api';
import { getFormattedVehicles } from '../../utils/components';
import * as validations from '../../utils';
import * as normalizing from '../../utils';
import RenderFileInput from '../RenderFileInput/RenderFileInput';
import RenderField from '../RenderField/RenderField';
import { r } from '../../utils/directional';
import { styles } from '../../constants';
import { ClipLoader } from 'react-spinners';


const vehicles = 'vehicles';
const signin = 'signin';

class QuotationRequest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
			dialogType: signin,
			garage: null,
			loading: false
		}

		if (isAuth(this.props.token)) {
			this.props.getRegions(this.props.customer.countryId);
		}
	}

	componentDidMount = () => {

		this.props.setCheckLoginQuotationOrder(false);
		this.props.setQuotationOrderInfo([]);
		this.fillVehicleInfo();

	}

	componentDidUpdate = (prevProps, prevState) => {
		const { defaultLang, submitFailed } = this.props
		if (_.has(this.props.formValues, 'garage') && this.props.formValues.garage !== prevProps.formValues.garage) {
			const selectedVehicle = this.props.formValues.garage.vehicle;
			const vin = this.props.formValues.garage.vin;

			this.setState({
				garage: [
					{ value: 1, label: getTranslatedObject(selectedVehicle.make, defaultLang, 'name', 'nameAr') },
					{ value: 2, label: getTranslatedObject(selectedVehicle.model, defaultLang, 'name', 'nameAr') },
					{ value: 3, label: selectedVehicle.year },
					{ vin }
				]
			}, () => {
				this.handleFillValues()
			})
		};

		if ((submitFailed !== prevProps.submitFailed) && submitFailed) {
			renderTopIfError(submitFailed);
		}
	}

	fillVehicleInfo = () => {
		const { initialValues } = this.props;
		const make = _.has(initialValues, 'make') ? initialValues.make : null;
		const model = _.has(initialValues, 'model') ? initialValues.model : null;
		const year = _.has(initialValues, 'year') ? initialValues.year : null;
		
		this.props.changeFieldValue('QuotationRequest', 'make', make);
		this.props.changeFieldValue('QuotationRequest', 'model', model);
		this.props.changeFieldValue('QuotationRequest', 'year', year);
	}


	handleSubmit = values => {
		this.setState({
			loading: true
		});
		let {
			make: { id: makeId }, year: { id: vehicleYearId }, garage, vin, vinImage, quotationItems: quotationItemsTemp, city: { id: cityId }, mobile
		} = values;
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
		mobile = `${966}${mobile}`;
		if (!isAuth(this.props.token)) {
			this.props.setCheckLoginQuotationOrder(true);
			this.setState({
				dialogType: signin
			});
			this.props.setQuotationOrderInfo(values)
			this.togglePopup();
		} else {
			postQuotation({ cityId, makeId, customerVehicleId, quotationItems, vehicleYearId, vin, imageAttached, vinImage, mobile })
				.then(res => {
					this.props.setQuotationOrder(false);
					return this.props.history.push(`/quotation-order/confirmation?quotationId=${res.data.quotationId}`);
				})
		}
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
			modal: !this.state.modal,
			loading: false
		})
	}

	handleLogin = e => {
		e.preventDefault();
		this.props.setCheckLoginQuotationOrder(true);
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
				return <Login toggle={this.togglePopup} data={this.state.data} />

			default:
				break;
		}
	}

	handleFillValues = () => {
		const { garage } = this.state

		this.props.changeFieldValue('QuotationRequest', 'make', garage[0]);
		this.props.changeFieldValue('QuotationRequest', 'model', garage[1]);
		this.props.changeFieldValue('QuotationRequest', 'year', garage[2]);
		this.props.changeFieldValue('QuotationRequest', 'vin', garage[3].vin);
		this.props.changeFieldValue('QuotationRequest', 'vinImage', null);
	}

	render() {
		const { handleSubmit, translate, direction, defaultLang, vehicles, cusVehicles } = this.props;

		const makeData = vehicles.map(vehicle => {
			return {
				...vehicle,
				label: getTranslatedObject(vehicle, defaultLang, 'name', 'nameAr'),
				value: vehicle.id
			}
		});

		const dialog = <Modal dir={direction} contentClassName="container-fluid" className={this.getDialogProps().className} isOpen={this.state.modal} toggle={this.togglePopup} >
			<ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
			<ModalBody>
				{this.getDialogComponent()}
			</ModalBody>
		</Modal>

		const yearData = _.has(this.props.formValues, 'model.modelYears') ?
			this.props.formValues.model.modelYears.map(modelYear => {
				return {
					...modelYear,
					label: modelYear.year,
					value: modelYear.id
				}
			}) : [];
		const groupedvehicleYear = [
			{
				options: yearData,
			},
		];
		const formatvehicleYearLabel = () => (
			<div className="placeholder">
				<span>{translate("general.vehicle.year")}</span>
			</div>
		);
		const groupedvehicleMake = [
			{
				options: makeData,
			},
		];
		const formatvehicleMakeLabel = () => (
			<div className="placeholder">
				<span>{translate("general.vehicle.make")}</span>
			</div>
		);
		const modelData = _.has(this.props.formValues, 'make.models') ?
			this.props.formValues.make.models.map(model => {
				return {
					...model,
					label: getTranslatedObject(model, defaultLang, 'name', 'nameAr'),
					value: model.id
				}
			}) : [];
		const groupedvehicleModel = [
			{
				options: modelData,
			},
		];
		const formatvehicleModelLabel = () => (
			<div className="placeholder">
				<span>{translate("general.vehicle.model")}</span>
			</div>
		);

		const country = [
			{ value: 1, label: translate("general.ksa") }
		];
		const regions = this.props.regions ? this.props.regions.map(region => {
			return {
				...region,
				value: region.id,
				label: getTranslatedObject(region, defaultLang, 'name', 'nameAr'),
			}
		}) : [];
		const groupedRegion = [
			{
				options: regions,
			},
		];
		const formatRegionLabel = () => (
			<div className="placeholder">
				<span>{translate("quotationOrder.shipping.region")}</span>
			</div>
		);
		const cities = _.has(this.props.formValues, 'region.cities') ?
			this.props.formValues.region.cities.map(city => {
				return {
					...city,
					label: getTranslatedObject(city, defaultLang, 'name', 'nameAr'),
					value: city.id
				}
			}) : [];
		const groupedCity = [
			{
				options: cities,
			},
		];
		const formatCityLabel = () => (
			<div className="placeholder">
				<span>{translate("quotationOrder.shipping.city")}</span>
			</div>
		);
		const vehiclesFormat = getFormattedVehicles(cusVehicles, defaultLang, translate);
		const groupedGarageList = [
			{
				options: vehiclesFormat,
			},
		];
		const formatGarageListLabel = () => (
			<div className="placeholder">
				<i className="icon-vehicle"></i>
				<h6>{translate("quotationOrder.garage.title")}
					<p>{translate("quotationOrder.garage.subTitle")}</p>
				</h6>
			</div>
		);
		if (this.state.loading)
			return (
				<div style={styles.loading}>
					<ClipLoader
						css={styles.spinner}
						sizeUnit={"px"}
						size={150}
						loading={this.state.loading}
					/>
				</div>
			)

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
								<p>{translate("quotationOrder.request")}</p>
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
									<i className={`icon-arrow-${r(direction)}`}></i>
									<i className={`icon-arrow-${r(direction)}`}></i>
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

				{/* <section className="step-active">
					<div className="container-fluid">
						<OrderSteps grey="-gs" translate={translate} direction={direction} />
					</div>
				</section> */}
				<section className="custom-order-form container-fluid">
					<div className="title-container">
						<div className="step-num">
							1
							<span>
								<i className={`icon-arrow-${r(direction)}`}></i>
								<i className={`icon-arrow-${r(direction)}`}></i>
							</span>
						</div>
						<Title header={translate("quotationOrder.steps.requestParts.title")}
							subHeader={translate("quotationOrder.steps.requestParts.subTitle")} />
					</div>
					<form className="gray-input" onSubmit={handleSubmit(this.handleSubmit)}>
						<div className="sec-shadow  vehicle-not-empty">
							<div className="row">
								<h3 className="col">{translate("quotationOrder.vehicle.title")}</h3>
								{
									isAuth(this.props.token) && (
										<div className="col-auto open-garage">
											<Field
												name="garage"
												placeholder={" "}
												component={SelectInput}
												options={groupedGarageList}
												formatGroupLabel={formatGarageListLabel}
											/>
											<Link
												to={'#'}
												isReverseOrder
												className='btn btn-gray'
												text={translate("form.vehicle.title")}
												icon='icon-vehicle'
											/>
											<p>{cusVehicles.length}</p>
										</div>
									)
								}
							</div>
							<div className="row vehicle-info">
								<div className="col-lg col-md-6 float-label">
									<Field
										label={translate("form.vehicle.make")}
										name="make"
										placeholder={" "}
										component={SelectInput}
										options={groupedvehicleMake}
										formatGroupLabel={formatvehicleMakeLabel}
										validate={[validations.required]}
										isDisabled={_.has(this.props.formValues, 'garage')}
									/>
								</div>
								<div className="col-lg col-md-6 float-label">
									<Field
										label={translate("form.vehicle.model")}
										name="model"
										placeholder={" "}
										component={SelectInput}
										options={groupedvehicleModel}
										formatGroupLabel={formatvehicleModelLabel}
										validate={[validations.required]}
										isDisabled={_.has(this.props.formValues, 'garage')}
									/>
								</div>
								<div className="col-lg-auto col-md-6 float-label">
									<Field
										label={translate("form.vehicle.year")}
										name="year"
										placeholder={" "}
										component={SelectInput}
										options={groupedvehicleYear}
										formatGroupLabel={formatvehicleYearLabel}
										validate={[validations.required]}
										isDisabled={_.has(this.props.formValues, 'garage')}
									/>
								</div>
								<div className="col-lg col-md-6">
									<div className="add-file has-float-label">
										<Field
											name="vin"
											type="text"
											hasFloatLabel
											label={translate("quotationOrder.vin")}
											placeholder={translate("quotationOrder.vin")}
											component={RenderField}
											maxLength="17"
											normalize={normalizing.upper}
											validate={_.has(this.props.formValues, 'vinImage') ? [] : [validations.required, validations.vin, validations.match17Digits, validations.allUpperCase]}
											disabled={_.has(this.props.formValues, 'garage')} />
										<Field
											removeImage={_.has(this.props.formValues, 'garage')}
											name="vinImage"
											component={RenderFileInput}
											image="image"
											disabled={_.has(this.props.formValues, 'garage')} />
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
										label={translate("general.country")}
										name="country"
										defaultValue={country[0]}
										component={SelectInput}
									/>
								</div>
								<div className="col-md float-label">
									<Field
										label={translate("general.region")}
										name="region"
										placeholder=" "
										component={SelectInput}
										options={groupedRegion}
										formatGroupLabel={formatRegionLabel}
										validate={[validations.required]}
									/>
								</div>
								<div className="col-md float-label city-filed">
									<Field
										label={translate("general.city")}
										name="city"
										placeholder=" "
										component={SelectInput}
										options={groupedCity}
										formatGroupLabel={formatCityLabel}
										validate={[validations.required]}
									/>
								</div>
								<div className="phone-info col-12">
									<div className="row">
										<div className="phone-number col-12">
											<div className="first">
												<input
													className="form-control"
													value={"+966"}
													type="text"
													disabled
													readOnly />
											</div>
											<Field
												hasFloatLabel
												name="mobile"
												component={RenderField}
												label={translate("form.address.phoneNumber")}
												errorMessage={`${translate("general.validationMessages.mobile")}`}
												validate={[validations.required, validations.mobileCodeNumber]} />
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="row submit-qout">
							<div className="col-lg">
								<p>{translate("quotationOrder.agreement.title")} <Link to="#" text={translate("quotationOrder.agreement.linkOne")} /> {translate("general.and")} <Link to="/privacyPolicy" text={translate("quotationOrder.agreement.linkTwo")} />.</p>
							</div>
							<div className="col-lg-auto">
								<Button type="submit"
									className="btn btn-primary"
									text={translate("general.send")}
									icon={`icon-arrow-${right(direction)}`}
								/>
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
		initialValues: getFormValues('QuotationRequest')(state),
		customer: customerObj.detail,
		token: state.customer.token,
		cusVehicles: customerObj.detail.vehicles,
		vehicles: state.api.vehicles,
		regions: state.api.regions,
		formValues: getFormValues('QuotationRequest')(state),
		translate: getTranslate(state.localize),
		direction: state.customer.direction,
		quotationOrderInfo: state.customer.quotationOrderInfo
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		changeFieldValue,
		getRegions,
		setQuotationOrder,
		setCheckLoginQuotationOrder,
		setQuotationOrderInfo
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotationRequest);
