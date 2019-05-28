import React, { Component, Fragment } from 'react';
import Products from '../Products/Products';
import Title from '../UI/Title';
import {
	right,
	getTranslatedObject,
	getFormattedVehicles,
	isAuth
} from '../../utils';
import * as validations from '../../utils';
import OrderSteps from '../OrderSteps';
import { Link, withRouter } from 'react-router-dom';
import DefaultLink from '../UI/Link';
import { LargeScreen } from '../Device';
import { connect } from 'react-redux';
import {
	Field,
	reduxForm,
	getFormValues,
	change as changeFieldValue
} from 'redux-form';
import SelectInput from '../SelectInput/SelectInput';
import _ from 'lodash';

class HomeDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			garage: null
		};
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { currentLanguage, formValues } = this.props;
		const prevFormValues = _.has(prevProps, 'formValues.garage')
			? prevProps.formValues.garage
			: null;

		if (
			_.has(formValues, 'garage') &&
			formValues.garage !== prevFormValues
		) {
			const selectedVehicle = formValues.garage.vehicle;
			const vin = formValues.garage.vin;

			this.setState(
				{
					garage: [
						{
							value: 1,
							label: getTranslatedObject(
								selectedVehicle.make,
								currentLanguage,
								'name',
								'nameAr'
							)
						},
						{
							value: 2,
							label: getTranslatedObject(
								selectedVehicle.model,
								currentLanguage,
								'name',
								'nameAr'
							)
						},
						{ value: 3, label: selectedVehicle.year },
						vin
					]
				},
				() => {
					this.handleFillValues();
				}
			);
		}
	};

	handleFillValues = () => {
		const { garage } = this.state;

		this.props.changeFieldValue('QuotationRequest', 'make', garage[0]);
		this.props.changeFieldValue('QuotationRequest', 'model', garage[1]);
		this.props.changeFieldValue('QuotationRequest', 'year', garage[2]);
		this.props.changeFieldValue('QuotationRequest', 'vin', garage[3]);
	};

	handleSubmit = () => {
		this.props.history.push('/quotation-order');
	};

	render() {
		const {
			recentViewedProducts,
			translate,
			direction,
			currentLanguage,
			vehicles,
			cusVehicles,
			token
		} = this.props;
		const makeData = vehicles.map(vehicle => {
			return {
				...vehicle,
				label: getTranslatedObject(
					vehicle,
					currentLanguage,
					'name',
					'nameAr'
				),
				value: vehicle.id
			};
		});

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
							currentLanguage,
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

		const vehiclesFormat = getFormattedVehicles(
			cusVehicles,
			currentLanguage,
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

		return (
			<Fragment>
				<section className='start-custom-order container-fluid'>
					<Title
						header={translate('quotationOrder.title')}
						subHeader={translate('quotationOrder.weMoveFast')}
						caption={translate('quotationOrder.request')}
					/>
					<OrderSteps translate={translate} direction={direction} />

					<div className='order-form'>
						<header className='row'>
							<h2 className='col-lg-10 mx-auto'>
								<span className='arrow'>
									<i className='icon-arrow-down' />
								</span>
								{translate('quotationOrder.startNow')}
							</h2>
						</header>
						<div className='form-details'>
							<form
								onSubmit={this.props.handleSubmit(
									this.handleSubmit
								)}
								className='col-lg-10 offset-lg-1 box-shadow gray-input'
							>
								<div className='form-row'>
									{isAuth(token) && (
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
											<DefaultLink
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
								<div className='form-row'>
									<div className='col float-label'>
										<Field
											label={translate(
												'form.vehicle.make'
											)}
											name='make'
											placeholder={' '}
											component={SelectInput}
											options={groupedvehicleMake}
											formatGroupLabel={
												formatvehicleMakeLabel
											}
											validate={[validations.required]}
											isDisabled={_.has(
												this.props.formValues,
												'garage'
											)}
										/>
									</div>
									<div className='col float-label'>
										<Field
											label={translate(
												'form.vehicle.model'
											)}
											name='model'
											placeholder={' '}
											component={SelectInput}
											options={groupedvehicleModel}
											formatGroupLabel={
												formatvehicleModelLabel
											}
											validate={[validations.required]}
											isDisabled={_.has(
												this.props.formValues,
												'garage'
											)}
										/>
									</div>
									<div className='col float-label'>
										<Field
											label={translate(
												'form.vehicle.year'
											)}
											name='year'
											placeholder={' '}
											component={SelectInput}
											options={groupedvehicleYear}
											formatGroupLabel={
												formatvehicleYearLabel
											}
											validate={[validations.required]}
											isDisabled={_.has(
												this.props.formValues,
												'garage'
											)}
										/>
									</div>
									<div className='col-auto'>
										<button
											type='submit'
											className='btn btn-primary'
										>
											<span>
												{translate('general.send')}
											</span>
											<i
												className={`icon-arrow-${right(
													direction
												)}`}
											/>
										</button>
									</div>
								</div>
							</form>
						</div>
					</div>
					{/*<div className="row">
							<div className="col col-lg-6 offset-lg-3">
								<Button
								className="btn btn-primary"
								to={'/quotation-order'}
								text={translate("quotationOrder.startHere")}
								icon={`icon-arrow-${right(direction)}`}
								/>
							</div>
						</div>*/}
				</section>
				<section className='main-cat container-fluid'>
					<header className='row cat-header'>
						<h3 className='col'>{translate('nav.oil')}</h3>
					</header>
					<ul className='list-unstyled row'>
						<li className='col'>
							<Link to='/listing?query=&page=1&category=7'>
								<figure>
									<img
										src='/img/motor-oil-cat-lg.jpg'
										alt='Motor Oil'
									/>
									<figcaption>
										<h4>{translate('nav.motorOil')}</h4>
									</figcaption>
									<span>
										{translate('quotationOrder.shopNow')}
									</span>
								</figure>
							</Link>
						</li>
						<li className='col'>
							<Link to='/listing?query=&page=1&category=8'>
								<figure>
									<img
										src='/img/gear-oil-cat-lg.jpg'
										alt='Gear Oil'
									/>
									<figcaption>
										<h4>{translate('nav.gearOil')}</h4>
									</figcaption>
									<span>
										{translate('quotationOrder.shopNow')}
									</span>
								</figure>
							</Link>
						</li>
						<li className='col'>
							<Link to='/listing?query=&page=1&category=27'>
								<figure>
									<img
										src='/img/coolant-lg.jpg'
										alt='Coolant '
									/>
									<figcaption>
										<h4>{translate('nav.coolant')}</h4>
									</figcaption>
									<span>
										{translate('quotationOrder.shopNow')}
									</span>
								</figure>
							</Link>
						</li>
					</ul>
					{/*<div className="row">
						<Link to="/listing?query=&page=1&category=9" className="col-lg-4 col-6">
							<figure>
								<img src="/img/motor-oil.png" alt="Oil" />
								<figcaption>
									<h4>{translate("nav.oil")}</h4>
								</figcaption>
								<span>{translate("quotationOrder.shopNow")}</span>
							</figure>
						</Link>
						<Link to="/listing?query=&page=1&category=13" className="col-lg-4 col-6">
							<figure>
								<img src="/img/tyres.png" alt="Tires" />
								<figcaption>
									<h4>{translate("nav.tires")}</h4>
								</figcaption>
								<span>{translate("quotationOrder.shopNow")}</span>
							</figure>
						</Link>
						<Link to="/listing?query=&page=1&category=28" className="col-lg-4 col-6">
							<figure>
								<img src="/img/tools.png" alt="Tools" />
								<figcaption>
									<h4>{translate("quotationOrder.tools")}</h4>
								</figcaption>
								<span>{translate("quotationOrder.shopNow")}</span>
							</figure>
						</Link>
						<Link to="/listing?query=&page=1&category=10" className="col-lg-4 col-6">
							<figure>
								<img src="/img/accessories.png" alt="Accessories" />
								<figcaption>
									<h4>{translate("quotationOrder.accessories")}</h4>
								</figcaption>
								<span>{translate("quotationOrder.shopNow")}</span>
							</figure>
						</Link>
						<Link to="/listing?query=&page=1&category=36" className="col-lg-4 col-6">
							<figure>
								<img src="/img/outdoor-cat.jpg" alt="Outdoors" />
								<figcaption>
									<h4>{translate("quotationOrder.outdoors")}</h4>
								</figcaption>
								<span>{translate("quotationOrder.shopNow")}</span>
							</figure>
						</Link>
						<Link to="/listing?query=&page=1&category=26" className="col-lg-4 col-6">
							<figure>
								<img src="/img/car-care.jpg" alt=" Car Care" />
								<figcaption>
									<h4>{translate("quotationOrder.carCare")}</h4>
								</figcaption>
								<span>{translate("quotationOrder.shopNow")}</span>
							</figure>
						</Link>
					</div>*/}
				</section>
				<section className='main-parts container-fluid'>
					<header className='row'>
						<h1 className='col'>
							{translate('quotationOrder.mustHaves')}
						</h1>
					</header>
					<ul className='list-unstyled row'>
						<li className='oil col-md-6 col-lg-3'>
							<Link to='/listing?query=&page=1&category=2'>
								<img
									src='/img/oil-filter.svg'
									alt='Premium quality oil for your engine'
								/>
								<div className='media-body'>
									<h5>
										{translate('quotationOrder.oilFilter')}
									</h5>
									<p>{translate('quotationOrder.premium')}</p>
								</div>
							</Link>
						</li>
						<li className='air col-md-6 col-lg-3'>
							<Link to='/listing?query=&page=1&category=3'>
								<img
									src='/img/air-filter.svg'
									alt='Maximize engine  performance'
								/>
								<div className='media-body'>
									<h5>
										{translate('quotationOrder.airFilter')}
									</h5>
									<p>{translate('quotationOrder.max')}</p>
								</div>
							</Link>
						</li>
						<li className='brake col-md-6 col-lg-3'>
							<Link to='/listing?query=&page=1&category=6'>
								<img
									src='/img/disc-brake.svg'
									alt='Get trusted stopping power'
								/>
								<div className='media-body'>
									<h5>
										{translate('quotationOrder.brakePads')}
									</h5>
									<p>{translate('quotationOrder.trusted')}</p>
								</div>
							</Link>
						</li>
						<li className='spark col-md-6 col-lg-3'>
							<Link to='/listing?query=&page=1&category=5'>
								<img
									src='/img/spark-plug.svg'
									alt='Maintain Engine Efficiency'
								/>
								<div className='media-body'>
									<h5>{translate('nav.sparkPlugs')}</h5>
									<p>
										{translate(
											'quotationOrder.maintenance'
										)}
									</p>
								</div>
							</Link>
						</li>
					</ul>
				</section>
				<section className='container-fluid mt-sec-home'>
					<header className='row cat-header'>
						<h3 className='col'>
							<LargeScreen>
								{translate('category.accessories.top')}
							</LargeScreen>
						</h3>
					</header>
					<div className='accessories-cat'>
						<div className='row'>
							<div className='col-md-5 cables'>
								<Link to='/listing?query=&page=1&category=12'>
									<figure>
										<img
											src='/img/Wires&Cables-gray.jpg'
											alt='Wires & Cables'
										/>
									</figure>
									<figcaption>
										{translate('nav.wiresAndCables')}
									</figcaption>
								</Link>
							</div>
							<div className='col-6 col-md-3 refrigerator'>
								<Link to='/listing?query=&page=1&category=14'>
									<div>
										<figcaption>
											{translate('nav.carRefrigerator')}
										</figcaption>
										<figure>
											<img
												src='/img/refrigerator-gray.jpg'
												alt='Refrigerator'
											/>
										</figure>
									</div>
								</Link>
							</div>
							<div className='col-6 col-md-4 car-mats'>
								<Link to='/listing?query=&page=1&category=17'>
									<figure>
										<img
											src='/img/car-mats-gray.jpg'
											alt='Car Mats'
										/>
									</figure>
									<figcaption>
										{translate('nav.carMats')}
									</figcaption>
								</Link>
							</div>
						</div>
						<div className='row'>
							<div className='col-md-7 bodywork'>
								<Link to='/listing?query=&page=1&category=16'>
									<figcaption>
										<span>
											{translate(
												'category.bodyworkCleaningAndCare.title'
											)}
										</span>
										{translate(
											'category.bodyworkCleaningAndCare.subTitle'
										)}
									</figcaption>
									<figure>
										<img
											src='/img/bodywork-gray.jpg'
											alt='Bodywork Cleaning and Care'
										/>
									</figure>
								</Link>
							</div>
							<div className='col-md-5 children-seats'>
								<Link to='/listing?query=&page=1&category=15'>
									<figure>
										<img
											src='/img/children-seats-gray.jpg'
											alt='Children Seats'
										/>
									</figure>
									<figcaption>
										{translate('nav.childSeat')}
									</figcaption>
								</Link>
							</div>
						</div>
					</div>
				</section>
				{/* <section className="vendor container-fluid">
					<div className="row">
						<div className="col-12">
							<div className="vendor-details">
								<picture>
									<source media="(max-width: 991px)" srcSet="/img/vendor-xs.jpg" />
									<source media="(max-width: 992px)" srcSet="/img/vendor.png" />
									<img src="/img/vendor.png" alt="OUR SALES MORE THAN 50,000 ITEM" />
								</picture>
								<div className="d-flex justify-content-center">
									<h1>
										<span>{translate("quotationOrder.vendor.items")}</span>
										{translate("quotationOrder.vendor.joinUs")}
									</h1>
									<a className="btn btn-primary" href="#"><span>{translate("general.join")}</span><i className={`icon-arrow-${right(direction)}`}></i></a>
								</div>
							</div>

						</div>
					</div>
				</section> */}
				<Products
					recentViewedProducts={recentViewedProducts}
					translate={translate}
					direction={direction}
					currentLanguage={currentLanguage}
				/>
			</Fragment>
		);
	}
}

HomeDetails = reduxForm({
	form: 'QuotationRequest'
})(HomeDetails);

const mapStateToProps = state => {
	return {
		formValues: getFormValues('QuotationRequest')(state)
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeFieldValue: (format, field, value) =>
			dispatch(changeFieldValue(format, field, value))
	};
};

const withHomeDetails = withRouter(HomeDetails);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withHomeDetails);
