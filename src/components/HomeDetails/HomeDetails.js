import React, { Component, Fragment } from 'react';
import {getTranslatedObject, getFormattedVehicles } from '../../utils';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues, change as changeFieldValue } from 'redux-form';
import _ from 'lodash';
import { swiperBrandParams } from '../../constants';
import Swiper from 'react-id-swiper';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import SelectInput from '../../components/SelectInput/SelectInput';
import RenderField from '../../components/RenderField/RenderField';
import * as validations from '../../utils';
import { DownLargeScreen, LargeScreen } from '../../components/Device';

class HomeDetails extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			garage: null,
			 modal: false,
		};
	}
	toggle() {
	this.setState(prevState => ({
		modal: !prevState.modal
	}));
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
				<div className="container-fluid">
					<section className='main-parts'>
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
					<section className='main-cat'>
						<header className='row cat-header'>
							<h1 className='col'>{translate('homePage.shopByCateg')}</h1>
						</header>
						<ul className='list-unstyled row'>
							<li className="col-md-8">
								<Link to='#' onClick={this.toggle}>
									<figure>
										<img
											src='/img/parts-cat.jpg'
											alt='Vehicle Parts'
											/>
										<figcaption>
											<h4>{translate('nav.vehicleParts')}</h4>
										</figcaption>
										<span>
											{translate('quotationOrder.shopNow')}
										</span>
									</figure>
									<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-xl vin-modal">
					          <ModalHeader toggle={this.toggle}>
											{translate('vehicleInfo.popupVinNumTitle')}
											<LargeScreen><span>{translate('vehicleInfo.popupVinNumSubTitle')}</span></LargeScreen>
										</ModalHeader>
					          <ModalBody>
											<form className="gray-input row">
												<div className="col-md-auto float-label make">
													<Field
														label="Make"
														name="make"
														placeholder={' '}
														component={SelectInput}
														options={groupedvehicleMake}
														formatGroupLabel={
															formatvehicleMakeLabel
														}
														/>
												</div>
												<div className="col">
													<Field
														hasFloatLabel
														name="VIN/Frame"
														type="text"
														placeholder={translate("general.VINInput.placeholder")}
														label={translate("general.VINInput.label")}
														errorMessage={`${translate("general.enter")} ${translate("general.VINInput.label")}`}
														component={RenderField}
														validate={[validations.required]}
													/>
													<div className="VIN-info">
														<p>{translate("vehicleInfo.VINNumberEx")}: <Link to="#">JTHBJ46G9B2420251</Link></p>
														<p className="id-img"><Link to="#"><i className="icon-info"></i> {translate("vehicleInfo.carId")}</Link></p>
													</div>
												</div>
												<div className="col-lg-auto actions">
													<div className="row">
														<DownLargeScreen>
															<div className="col-auto">
																<button type="submit" className='btn btn-gray'>{translate("general.buttons.cancel")}</button>
															</div>
														</DownLargeScreen>
														<div className="col-md-auto col">
															<button type="submit" className='btn btn-primary'>{translate("vehicleInfo.browseCatalogueBtn")}<i className="icon-arrow-right"></i></button>
														</div>
													</div>

												</div>
											</form>
					          </ModalBody>
					        </Modal>
								</Link>
							</li>
							<li className="col-md-4 col-6">
								<Link to='#'>
									<figure>
										<img
											src='/img/accessories-cat-lg.jpg'
											alt='Accessories'
											/>
										<figcaption>
											<h4>{translate('nav.accessorise')}</h4>
										</figcaption>
										<span>
											{translate('quotationOrder.shopNow')}
										</span>
									</figure>
								</Link>
							</li>
							<li className='col-md-4 col-6'>
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
							<li className='col-md-4 col-6'>
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
							<li className='col-md-4 col-6'>
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
					</section>
					<section className="vendor">
						<header>
							<h1>{translate("homePage.vendorHeader")}</h1>
							<p>{translate("homePage.vendorSubHeader")}</p>
						</header>
						<div className="action">
							<figure><img src="/img/vendor.svg"></img></figure>
							<Link to="#" className="btn btn-primary">{translate("homePage.vendorJoinUs")} <i className="icon-arrow-right"></i></Link>
						</div>
					</section>
				</div>
				<section className="shop-brand container-fluid">
					<header>
						<h1>{translate("homePage.shopBrandHeader")}</h1>
					</header>
							<div className="products-list">
									<Swiper {...swiperBrandParams(direction)}>
										<div><Link to="#"><img src="/img/brand-x-1.jpg"></img></Link></div>
										<div><Link to="#"><img src="/img/brand-x-2.jpg"></img></Link></div>
										<div><Link to="#"><img src="/img/brand-x-3.jpg"></img></Link></div>
										<div><Link to="#"><img src="/img/brand-x-4.jpg"></img></Link></div>
										<div><Link to="#"><img src="/img/brand-x-5.jpg"></img></Link></div>
										<div><Link to="#"><img src="/img/brand-x-6.jpg"></img></Link></div>

									</Swiper>
									<div className="swiper-left"></div>
							</div>
				</section>

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
