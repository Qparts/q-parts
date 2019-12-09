import React, { Component, Fragment } from 'react';
import {
	Field,
	reduxForm,
	change as changeFieldValue,
	FieldArray,
	getFormValues,
	formValueSelector
} from 'redux-form';
import Link from '../../components/UI/Link';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SelectInput from '../SelectInput/SelectInput';
import Button from '../UI/Button';
import RenderPartInfo from '../RenderPartInfo/RenderPartInfo';
import { getTranslatedObject, renderTopIfError } from '../../utils';
import { isAuth } from '../../utils';
import { right } from '../../utils';
import { getRegions } from '../../actions/apiAction';
import { addPaymentMethod } from '../../actions/cartAction';
import {
	setQuotationOrder,
	setCheckLoginQuotationOrder,
	setQuotationOrderInfo,
	completePayment,
	setValidCredit,
	setLoading,
	setQuotationValues
} from '../../actions/customerAction';
import { throwNetworkError } from '../../actions/networkError';
import _ from 'lodash';
import { getTranslate } from 'react-localize-redux';
import './QuotationRequest.css';
import Title from '../UI/Title';
import Vehicles from '../Vehicles/Vehicles';
import Login from '../../containers/Authentication/Login/Login';
import {
	postQuotation,
	postWireTransferQuotation,
	postCCQuotation
} from '../../utils/api';
import { getFormattedVehicles } from '../../utils/components';
import * as validations from '../../utils';
import * as normalizing from '../../utils';
import RenderFileInput from '../RenderFileInput/RenderFileInput';
import RenderField from '../RenderField/RenderField';
import { styles } from '../../constants';
import { ClipLoader } from 'react-spinners';
import Radio from '../UI/Radio';
import { LargeScreen} from '../../components/Device';
import CheckoutPayment from '../CheckoutPayment/CheckoutPayment';
import { Alert } from 'reactstrap';
import { W, V } from '../../constants';
const vehicles = 'vehicles';
const signin = 'signin';
class QuotationRequest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
			dialogType: signin,
			garage: null,
			loading: false,
			loadedFromGarage: false,
			paymentMethod: 'V'
		};

		if (isAuth(this.props.token)) {
			this.props.getRegions(this.props.customer.countryId);
		}
	}
	componentDidMount = () => {
		this.props.setCheckLoginQuotationOrder(false);
		this.props.setQuotationOrderInfo([]);
		this.fillVehicleInfo();
	};

	componentWillUnmount = () => {
		this.props.setValidCredit(true);
	};

	componentDidUpdate = (prevProps, prevState) => {
		const { submitFailed } = this.props;
		if (
			_.has(this.props.formValues, 'garage') &&
			prevProps.formValues &&
			this.props.formValues.garage !== prevProps.formValues.garage
		) {
			const selectedVehicle = this.props.formValues.garage.vehicle;
			const vin = this.props.formValues.garage.vin;

			this.setGarage(selectedVehicle, vin);
		}

		if (submitFailed !== prevProps.submitFailed && submitFailed) {
			renderTopIfError(submitFailed);
		}
	};
	fillVehicleInfo = () => {
		const { initialValues } = this.props;

		const make = _.has(initialValues, 'make') ? initialValues.make : null;
		const model = _.has(initialValues, 'model')
			? initialValues.model
			: null;
		const year = _.has(initialValues, 'year') ? initialValues.year : null;
		const vin = _.has(initialValues, 'vin') ? initialValues.vin : null;
		const hasSelectedFromGarage = _.has(initialValues, 'garage')
			? initialValues.garage
			: null;

		if (hasSelectedFromGarage) {
			this.props.changeFieldValue(
				'QuotationRequest',
				'garage',
				initialValues.garage
			);
			this.setGarage(
				initialValues.garage.vehicle,
				initialValues.garage.vin
			);
		} else {
			this.props.changeFieldValue('QuotationRequest', 'make', make);
			this.props.changeFieldValue('QuotationRequest', 'model', model);
			this.props.changeFieldValue('QuotationRequest', 'year', year);
			this.props.changeFieldValue('QuotationRequest', 'vin', vin);
		}
	};
	setGarage = (selectedVehicle, vin) => {
		const { defaultLang } = this.props;
		this.setState(
			{
				garage: [
					{
						value: 1,
						label: getTranslatedObject(
							selectedVehicle.make,
							defaultLang,
							'name',
							'nameAr'
						)
					},
					{
						value: 2,
						label: getTranslatedObject(
							selectedVehicle.model,
							defaultLang,
							'name',
							'nameAr'
						)
					},
					{ value: 3, label: selectedVehicle.year },
					{ vin }
				],
				loadedFromGarage: true
			},
			() => {
				this.handleFillValues();
			}
		);
	};

	setPaymentMethod = paymentMethod => {
		this.setState({ paymentMethod });
	};

	handleSubmit = values => {
		this.props.setQuotationValues({
			make: values.make,
			year: values.year,
			garage: values.garage,
			vin: values.vin,
			vinImage: values.vinImage,
			quotationItems: values.quotationItems,
			region: values.region,
			city: values.city,
			mobile: values.mobile,
			paymentMethod: this.state.paymentMethod
		});
		this.setState({
			loading: true
		});
		let {
			make: { id: makeId },
			year: { id: vehicleYearId },
			garage,
			vin,
			vinImage,
			quotationItems: quotationItemsTemp,
			city: { id: cityId },
			mobile
		} = values;
		const customerVehicleId = garage ? garage.id : null;
		const imageAttached = vinImage ? true : false;
		const { paymentMethod } = this.state;
		vin = customerVehicleId ? null : _.isUndefined(vin) ? null : vin;
		vinImage = vinImage ? vinImage : false;
		makeId = customerVehicleId ? garage.vehicle.make.id : makeId;
		vehicleYearId = customerVehicleId ? null : vehicleYearId;

		const quotationItems = !_.isEmpty(quotationItemsTemp)
			? quotationItemsTemp.map(quotationCartItem => {
					return {
						...quotationCartItem,
						hasImage: quotationCartItem.image ? true : false
					};
			  })
			: undefined;
		mobile = `${966}${mobile}`;
		if (!isAuth(this.props.token)) {
			this.props.setCheckLoginQuotationOrder(true);
			this.setState({
				dialogType: signin
			});
			this.props.setQuotationOrderInfo(values);
			this.togglePopup();
		} else if (paymentMethod === W) {
			postWireTransferQuotation({
				cityId,
				makeId,
				customerVehicleId,
				quotationItems,
				vehicleYearId,
				vin,
				imageAttached,
				vinImage,
				mobile,
				paymentMethod
			}).then(res => {
				this.props.setQuotationOrder(false);
				return this.props.history.push(
					`/quotation-order/confirmation?quotationId=${
						res.data.quotationId
					}`
				);
			});
		} else if (paymentMethod === V) {
			const ccMonth = this.props.cardHolder.ccMonth.value;
			const ccYear = this.props.cardHolder.ccYear.value;
			const creditCardValues = {
				...this.props.cardHolder,
				ccMonth,
				ccYear
			};

			postCCQuotation({
				cityId,
				makeId,
				customerVehicleId,
				quotationItems,
				vehicleYearId,
				vin,
				imageAttached,
				vinImage,
				mobile,
				paymentMethod,
				cardHolder: creditCardValues
			})
				.then(res => {
					if (res.status === 202) {
						this.props.setQuotationOrder(false);
						window.location = res.data.transactionUrl;
					} else if (res.status === 200) {
						this.props.setQuotationOrder(false);
						return this.props.history.push(
							`/quotation-order/confirmation?quotationId=${
								res.data.quotationId
							}`
						);
					}
				})
				.catch(error => {
					this.props.setValidCredit(false);
					this.props.setLoading(false);
					this.props.throwNetworkError(error);
				});
		}
	};
	handleVehicle = event => {
		event.preventDefault();
		this.setState({
			dialogType: vehicles
		});
		this.togglePopup();
	};
	togglePopup = () => {
		this.setState({
			modal: !this.state.modal,
			loading: false
		});
	};
	handleLogin = e => {
		e.preventDefault();
		this.props.setCheckLoginQuotationOrder(true);
		this.setState({
			dialogType: signin
		});
		this.togglePopup();
	};
	getDialogProps = () => {
		const { translate } = this.props;
		const { dialogType } = this.state;

		switch (dialogType) {
			case vehicles:
				return {
					header: (
						<Title
							header={translate('dialog.vehicle.title')}
							subHeader={translate('dialog.vehicle.subTitle')}
						/>
					),
					className: 'garage-popup'
				};
			case signin:
				return {
					header: <Title header={translate('dialog.signin.title')} />,
					className: ''
				};
			default:
				break;
		}
	};
	getDialogComponent = () => {
		const { dialogType } = this.state;
		const { direction, defaultLang } = this.props;

		switch (dialogType) {
			case vehicles:
				return (
					<Vehicles
						toggle={this.togglePopup}
						direction={direction}
						defaultLang={defaultLang}
					/>
				);

			case signin:
				return (
					<Login toggle={this.togglePopup} data={this.state.data} />
				);

			default:
				break;
		}
	};
	handleFillValues = () => {
		const { garage } = this.state;

		this.props.changeFieldValue('QuotationRequest', 'make', garage[0]);
		this.props.changeFieldValue('QuotationRequest', 'model', garage[1]);
		this.props.changeFieldValue('QuotationRequest', 'year', garage[2]);
		this.props.changeFieldValue('QuotationRequest', 'vin', garage[3].vin);
		this.props.changeFieldValue('QuotationRequest', 'vinImage', null);
	};
	render() {
		const {
			handleSubmit,
			translate,
			direction,
			defaultLang,
			vehicles,
			cusVehicles
		} = this.props;

		const makeData = vehicles.map(vehicle => {
			return {
				...vehicle,
				label: getTranslatedObject(
					vehicle,
					defaultLang,
					'name',
					'nameAr'
				),
				value: vehicle.id
			};
		});

		const dialog = (
			<Modal
				dir={direction}
				contentClassName='container-fluid'
				className={this.getDialogProps().className}
				isOpen={this.state.modal}
				toggle={this.togglePopup}
			>
				<ModalHeader toggle={this.togglePopup}>
					{this.getDialogProps().header}
				</ModalHeader>
				<ModalBody>{this.getDialogComponent()}</ModalBody>
			</Modal>
		);

		const yearData = _.has(this.props.formValues, 'model.modelYears')
			? this.props.formValues.model.modelYears.map(modelYear => {
					return {
						...modelYear,
						label: modelYear.year,
						value: modelYear.id
					};
			  })
			: [];
		const groupedvehicleYear = [
			{
				options: yearData
			}
		];
		const formatvehicleYearLabel = () => (
			<div className='placeholder'>
				<span>{translate('general.vehicle.year')}</span>
			</div>
		);
		const groupedvehicleMake = [
			{
				options: makeData
			}
		];
		const formatvehicleMakeLabel = () => (
			<div className='placeholder'>
				<span>{translate('general.vehicle.make')}</span>
			</div>
		);
		const modelData = _.has(this.props.formValues, 'make.models')
			? this.props.formValues.make.models.map(model => {
					return {
						...model,
						label: getTranslatedObject(
							model,
							defaultLang,
							'name',
							'nameAr'
						),
						value: model.id
					};
			  })
			: [];
		const groupedvehicleModel = [
			{
				options: modelData
			}
		];
		const formatvehicleModelLabel = () => (
			<div className='placeholder'>
				<span>{translate('general.vehicle.model')}</span>
			</div>
		);

		const country = [{ value: 1, label: translate('general.ksa') }];
		const regions = this.props.regions
			? this.props.regions.map(region => {
					return {
						...region,
						value: region.id,
						label: getTranslatedObject(
							region,
							defaultLang,
							'name',
							'nameAr'
						)
					};
			  })
			: [];
		const groupedRegion = [
			{
				options: regions
			}
		];
		const formatRegionLabel = () => (
			<div className='placeholder'>
				<span>{translate('quotationOrder.shipping.region')}</span>
			</div>
		);
		const cities = _.has(this.props.formValues, 'region.cities')
			? this.props.formValues.region.cities.map(city => {
					return {
						...city,
						label: getTranslatedObject(
							city,
							defaultLang,
							'name',
							'nameAr'
						),
						value: city.id
					};
			  })
			: [];
		const groupedCity = [
			{
				options: cities
			}
		];
		const formatCityLabel = () => (
			<div className='placeholder'>
				<span>{translate('quotationOrder.shipping.city')}</span>
			</div>
		);
		const vehiclesFormat = getFormattedVehicles(
			cusVehicles,
			defaultLang,
			translate
		);
		const groupedGarageList = [
			{
				options: vehiclesFormat
			}
		];
		const formatGarageListLabel = () => (
			<div className='placeholder'>
				<i className='icon-vehicle' />
				<h6>
					{translate('quotationOrder.garage.title')}
					<p>{translate('quotationOrder.garage.subTitle')}</p>
				</h6>
			</div>
		);
		if (this.state.loading)
			return (
				<div style={styles.loading}>
					<ClipLoader
						css={styles.spinner}
						sizeUnit={'px'}
						size={150}
						loading={this.state.loading}
					/>
				</div>
			);

		return (
			<Fragment>
				<section className='hero qutaion-h'>
					<picture className='hero-img'>
						<source
							media='(max-width: 480px)'
							srcSet='/img/custom-req-xxs.jpg'
						/>
						<source
							media='(max-width: 767px)'
							srcSet='/img/custom-req-xs.jpg'
						/>
						<img
							src='/img/custom-req-xl.jpg'
							alt='OUR SALES MORE THAN 50,000 ITEM'
						/>
					</picture>
					<div className='hero-content'>
						<div className='row'>
							<header className='col'>
								<h1>{translate('quotationOrder.title')}</h1>
								<p>{translate('quotationOrder.request')}</p>
							</header>
						</div>
					</div>
				</section>
				<section className='custom-order-form container-fluid'>
					<div className="row">
						<div className="col-lg">
							<div className='title-container'>
								<Title
									header={translate(
										'quotationOrder.steps.requestParts.title'
									)}
									subHeader={translate(
										'quotationOrder.steps.requestParts.subTitle'
									)}
								/>
							</div>
							<form
								className='gray-input'
								onSubmit={handleSubmit(this.handleSubmit)}>
								<div className='sec-shadow add-new-vehicle'>
									<div className='row'>
										<h3 className='col'>
											{translate('quotationOrder.vehicle.title')}
										</h3>
										<div className="col-auto garage-select">
											<a href="#" className="btn btn-gray-secondary dropdown-toggle" role="button" id="garage-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
												<img className="icon-garage" alt="garage" src="/img/garage.svg"/> Garage
												<span className="vec-count">2</span>
											</a>
											<div class="dropdown-menu garage-dropdown" aria-labelledby="garage-dropdown">
													<div class="media">
														<i className="icon-vehicle-history"></i>
														<div class="media-body">
															<h5>Selected Vehicle History </h5>
															<p>View, manage and find parts for the vehicles in your garage</p>
														</div>
													</div>
												<ul className="list-unstyled">
													<li  className="radio-custom" key="1">
														<a href="#" className="row">
															<div className="col-auto">
																<Radio
																	checked="true"
																	type="radio"
																	id="1"
																	name="radioGroup"
																/>
															</div>
															<p className="col">
															2016 Ford Focus
															<span>VIN(000 000 000 000 11)</span>
														</p>
															<div className="col-auto vec-actions">
															<a href="#" className="btn btn-primary"><i className="icon-catalog"></i>Catalog</a>
															<a href="#" className="link">Save</a>
														</div>
														</a>
													</li>
													<li  className="radio-custom" key="1">
														<a href="#" className="row">
															<div className="col-auto">
																<Radio
																	checked="true"
																	type="radio"
																	id="1"
																	name="radioGroup"
																/>
															</div>
															<p className="col">
															2016 Ford Focus
														</p>
															<div className="col-auto vec-actions">
															<a href="#" className="btn btn-primary"><i className="icon-catalog"></i>Catalog</a>
															<a href="#" className="link">Save</a>
														</div>
														</a>
													</li>
												</ul>
												<div className="vec-list-actions">
													<div className="main-action">
														<a className="btn btn-gray">
															<i className="icon-add-vehicle"></i>
															Add Vehicle
														</a>
													</div>
													<a href="#" className="link">
														<i className="icon-clear"></i>
														Clear History
													</a>
												</div>
											</div>
										</div>
										{isAuth(this.props.token) && (
											<div className='col-auto open-garage'>
												<Field
													name='garage'
													placeholder={' '}
													component={SelectInput}
													options={groupedGarageList}
													formatGroupLabel={
														formatGarageListLabel
													}
												/>
												<Link
													to={'#'}
													isReverseOrder
													className='btn btn-gray'
													text={translate(
														'form.vehicle.title'
													)}
													icon='icon-vehicle'
												/>
												<p>{cusVehicles.length}</p>
											</div>
										)}
									</div>
									<div className='vehicle-info input-list'>
										<div className='float-label'>
											<Field
												label={translate('form.vehicle.make')}
												name='make'
												placeholder={' '}
												component={SelectInput}
												options={groupedvehicleMake}
												formatGroupLabel={
													formatvehicleMakeLabel
												}
												validate={[validations.required]}
												isDisabled={this.state.loadedFromGarage}
											/>
										</div>
										<div className='float-label'>
											<Field
												label={translate('form.vehicle.model')}
												name='model'
												placeholder={' '}
												component={SelectInput}
												options={groupedvehicleModel}
												formatGroupLabel={
													formatvehicleModelLabel
												}
												validate={[validations.required]}
												isDisabled={this.state.loadedFromGarage}
											/>
										</div>
										<div className='float-label'>
											<Field
												label={translate('form.vehicle.year')}
												name='year'
												placeholder={' '}
												component={SelectInput}
												options={groupedvehicleYear}
												formatGroupLabel={
													formatvehicleYearLabel
												}
												validate={[validations.required]}
												isDisabled={this.state.loadedFromGarage}
											/>
										</div>
										<div className='add-file'>
												<Field
													name='vin'
													type='text'
													hasFloatLabel
													label={translate(
														'quotationOrder.vin'
													)}
													placeholder={translate(
														'quotationOrder.vin'
													)}
													component={RenderField}
													maxLength='17'
													normalize={normalizing.upper}
													validate={
														_.has(
															this.props.formValues,
															'vinImage'
														)
															? []
															: [
																	validations.required,
																	validations.vin,
																	validations.match17Digits,
																	validations.allUpperCase
															  ]
													}
													disabled={
														this.state.loadedFromGarage
													}
												/>
												<Field
													removeImage={_.has(
														this.props.formValues,
														'garage'
													)}
													name='vinImage'
													component={RenderFileInput}
													image='image'
													disabled={_.has(
														this.props.formValues,
														'garage'
													)}
												/>
											</div>
									</div>
								</div>
								<div className='sec-shadow add-new-vehicle'>
									<div className='row'>
										<h3 className='col'>
											{translate('quotationOrder.vehicle.title')}
										</h3>
										<div className="col-auto garage-select">
											<a href="#" className="btn btn-gray-secondary dropdown-toggle" role="button" id="garage-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
												<img className="icon-garage" alt="garage" src="/img/garage.svg"/> Garage
												<span className="vec-count">2</span>
											</a>
											<div class="dropdown-menu garage-dropdown" aria-labelledby="garage-dropdown">
													<div class="media">
														<i className="icon-vehicle-history"></i>
														<div class="media-body">
															<h5>Selected Vehicle History </h5>
															<p>View, manage and find parts for the vehicles in your garage</p>
														</div>
													</div>
												<ul className="list-unstyled">
													<li  className="radio-custom" key="1">
														<a href="#" className="row">
															<div className="col-auto">
																<Radio
																	checked="true"
																	type="radio"
																	id="1"
																	name="radioGroup"
																/>
															</div>
															<p className="col">
															2016 Ford Focus
															<span>VIN(000 000 000 000 11)</span>
														</p>
															<div className="col-auto vec-actions">
															<a href="#" className="btn btn-primary"><i className="icon-catalog"></i>Catalog</a>
															<a href="#" className="link">Save</a>
														</div>
														</a>
													</li>
													<li  className="radio-custom" key="1">
														<a href="#" className="row">
															<div className="col-auto">
																<Radio
																	checked="true"
																	type="radio"
																	id="1"
																	name="radioGroup"
																/>
															</div>
															<p className="col">
															2016 Ford Focus
														</p>
															<div className="col-auto vec-actions">
															<a href="#" className="btn btn-primary"><i className="icon-catalog"></i>Catalog</a>
															<a href="#" className="link">Save</a>
														</div>
														</a>
													</li>
												</ul>
												<div className="vec-list-actions">
													<div className="main-action">
														<a className="btn btn-gray">
															<i className="icon-add-vehicle"></i>
															Add Vehicle
														</a>
													</div>
													<a href="#" className="link">
														<i className="icon-clear"></i>
														Clear History
													</a>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col">
											<div className="selected-vehicle-info">
												<div className="media">
													<i className="icon-vehicle"></i>
													<div className="media-body">
														<p>2016 Ford Focus</p>
														<p>VIN Number(000 000 000 000 11)</p>
													</div>
												</div>
											</div>
										</div>

									</div>
									<div className="row">
										<div className="col add-part">
											<button className="btn">
												<i className="icon-plus"></i>
												<span> Add Another Part </span>
											</button>
										</div>
									</div>

								</div>
								<div className='sec-shadow part-array'>
									<div className='row'>
										<div className='col-lg'>
											<h3>
												{translate(
													'quotationRequest.partInfo.title'
												)}
											</h3>
										</div>
									</div>
									<FieldArray
										name='quotationItems'
										component={RenderPartInfo}
										add={translate('quotationRequest.partInfo.add')}
										deleteIcon='icon-trash'
										placeholder={translate(
											'quotationRequest.placeholder.carInfo.vin'
										)}
									/>
								</div>
								<div className='sec-shadow ship-info'>
									<div className='row'>
										<div className='col-lg'>
											<h3>
												{translate(
													'quotationOrder.shipping.title'
												)}
											</h3>
										</div>
									</div>
									<div className="input-list">
										<div className='float-label disabled'>
												<Field
													isDisabled={true}
													label={translate('general.country')}
													name='country'
													defaultValue={country[0]}
													component={SelectInput}
												/>
											</div>
											<div className="row">
												<div className='col-md float-label'>
													<Field
														label={translate('general.region')}
														name='region'
														placeholder=' '
														component={SelectInput}
														options={groupedRegion}
														formatGroupLabel={formatRegionLabel}
														validate={[validations.required]}
													/>
												</div>
												<div className='col-md float-label city-filed'>
													<Field
														label={translate('general.city')}
														name='city'
														placeholder=' '
														component={SelectInput}
														options={groupedCity}
														formatGroupLabel={formatCityLabel}
														validate={[validations.required]}
													/>
												</div>
											</div>
											<div className='phone-input'>
												<span>(+962)</span>
												<Field
													hasFloatLabel
													name='mobile'
													component={RenderField}
													label={translate(
														'form.address.phoneNumber'
													)}
													errorMessage={`${translate(
														'general.validationMessages.mobile'
													)}`}
													validate={[
														validations.required,
														validations.mobileCodeNumber
													]}
												/>
											</div>
									</div>
								</div>
								<div className='submit-qout'>
									<p>
										{translate(
											'quotationOrder.agreement.title'
										)}{' '}
										<Link
											to='#'
											text={translate(
												'quotationOrder.agreement.linkOne'
											)}
											/>{' '}
											{translate('general.and')}{' '}
											<Link
												to='/privacyPolicy'
												text={translate(
													'quotationOrder.agreement.linkTwo'
												)}
												/>
										</p>
										<Button
											type='submit'
											className='btn btn-primary'
											text={translate('general.send')}
											icon={"icon-arrow-right"}
											/>
								</div>
							</form>
						</div>
						<LargeScreen>
							<div className="col-lg">
								<div className="qutaion-steps">
									<h5>{translate('quotationOrder.steps.title')}</h5>
									<div className="d-flex">
										<span className="num">3</span>
										<span className="icon">
											<i className="icon-arrow-r"></i>
											<i className="icon-arrow-r"></i>
										</span>
										<p>{translate('quotationOrder.steps.subTitle')}</p>
									</div>
									<ul className="unstyled-list steps-list">
										<li class="media active">
											<figure>
												<img className="request" src="/img/request.svg" alt="..."/>
											</figure>
											<div class="media-body">
												<h5>{translate('quotationOrder.steps.requestParts.title')}</h5>
												<p>{translate('quotationOrder.steps.requestParts.subTitle')}</p>
											</div>
											<div className="arrow">
												<i className="icon-arrow-left"></i>
											</div>
										</li>
										<li class="media">
											<figure>
												<img className="price" src="/img/check-price-gs.svg" alt="..."/>
											</figure>
											<div class="media-body">
												<h5>{translate('orderSteps.price.title')}</h5>
												<p>{translate('orderSteps.price.subtitle')}</p>
											</div>
										</li>
										<li class="media">
											<figure>
												<img className="cart" src="/img/add-to-cart-gs.svg" alt="..."/>
											</figure>
											<div class="media-body">
												<h5>{translate('orderSteps.cart.title')}</h5>
												<p>{translate('orderSteps.cart.subtitle')}</p>
											</div>
										</li>

										<li class="media">
											<figure>
												<img className="delivery" src="/img/delivery-product-gs.svg" alt="..."/>
											</figure>
											<div class="media-body">
												<h5>{translate('orderSteps.receive.title')}</h5>
												<p>{translate('orderSteps.receive.subtitle')}</p>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</LargeScreen>
					</div>
						<div className='sec-shadow'>
							<CheckoutPayment
								paymentTitle
								direction={this.props.direction}
								translate={translate}
								addPaymentMethod={this.props.addPaymentMethod}
								completePayment={this.props.completePayment}
								checkout={this.props.checkout}
								setValidCredit={this.props.setValidCredit}
								hidePaymentButton={true}
								onChangePaymentMethod={this.setPaymentMethod}
							/>
						</div>
					
						<div className='row submit-qout'>
							<div className='col-lg'>
								<p>
									{translate(
										'quotationOrder.agreement.title'
									)}{' '}
									<Link
										to='#'
										text={translate(
											'quotationOrder.agreement.linkOne'
										)}
									/>{' '}
									{translate('general.and')}{' '}
									<Link
										to='/privacyPolicy'
										text={translate(
											'quotationOrder.agreement.linkTwo'
										)}
									/>
									.
								</p>
							</div>
							<div className='col-lg-auto'>
								<Button
									type='submit'
									className='btn btn-primary'
									text={translate('general.send')}
									icon={`icon-arrow-${right(direction)}`}
								/>
							</div>
						</div>
				</section>
				{dialog}
			</Fragment>
		);
	}
}

QuotationRequest = reduxForm({
	form: 'QuotationRequest'
})(QuotationRequest);

const mapStateToProps = state => {
	const customerObj = state.customer;
	const selector = formValueSelector('CheckoutPayment');

	const { ccNumber, ccMonth, ccYear, ccCvc, ccName } = selector(
		state,
		'ccNumber',
		'ccMonth',
		'ccYear',
		'ccCvc',
		'ccName'
	);

	return {
		initialValues:
			getFormValues('QuotationRequest')(state) ||
			customerObj.quotationValues,
		customer: customerObj.detail,
		token: state.customer.token,
		cusVehicles: customerObj.detail.vehicles,
		vehicles: state.api.vehicles,
		regions: state.api.regions,
		formValues: getFormValues('QuotationRequest')(state),
		translate: getTranslate(state.localize),
		direction: state.customer.direction,
		quotationOrderInfo: state.customer.quotationOrderInfo,
		checkout: state.cart.checkout,
		isValidcreditCard: state.customer.isValidcreditCard,
		cardHolder: {
			ccNumber,
			ccMonth,
			ccYear,
			ccCvc,
			ccName
		}
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			changeFieldValue,
			getRegions,
			setQuotationOrder,
			setCheckLoginQuotationOrder,
			setQuotationOrderInfo,
			addPaymentMethod,
			completePayment,
			setValidCredit,
			setLoading,
			throwNetworkError,
			setQuotationValues
		},
		dispatch
	);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(QuotationRequest);
