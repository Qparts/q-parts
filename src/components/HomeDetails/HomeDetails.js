import React from 'react';
import { getTranslatedObject, getFormattedVehicles } from '../../utils';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm, getFormValues, change as changeFieldValue } from 'redux-form';
import _ from 'lodash';
import Swiper from 'react-id-swiper';
import { getTranslate } from 'react-localize-redux';
import Stars from 'react-stars';
import { swiperParams } from '../../constants';
import { getBestSeller } from '../../utils/api';
import { handleImageFallback } from '../../utils';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import SelectInput from '../../components/SelectInput/SelectInput';
import RenderField from '../../components/RenderField/RenderField';
import * as validations from '../../utils';
import { DownLargeScreen, LargeScreen } from '../../components/Device';
import { Field } from 'redux-form';
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import TiresForm from './tires-form';
import './shop-tires.css';


const { Component, Fragment, createRef } = React;

class HomeDetails extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			garage: null,
			modal: false,
			open: false,
			vin: 'JTHBJ46G9B2420251',
			vinInput: "",
			selectedVehicle: {
				id: null
			},
			bestSeller: [],
		};
		this.vinFieldRef = createRef(null);
		this.loadBestSeller()
	}

	loadBestSeller = () => {
		getBestSeller()
			.then(res => {
				this.setState({
					bestSeller: res.data,
					isLoading: true
				})
			});
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

	handleClick = (e) => {
		this.setState({ open: !this.state.open });
	}

	handleClose = (e) => {
		this.setState({ open: false });
	}

	submit = values => {

	}

	render() {
		const { bestSeller } = this.state;
		const {
			translate,
			direction,
			currentLanguage,
			vehicles,
			cusVehicles,
		} = this.props;

		console.log(this.props.selectedVehicles,">>>>>>>>>");

		const tireWidth = [
			{ value: 1, label: "15" },
			{ value: 2, label: "115" },
			{ value: 3, label: "125" },
			{ value: 4, label: "15" },
			{ value: 5, label: "115" },
			{ value: 6, label: "125" }
		];
		const groupedWidthTiresOptions = [
			{
				options: tireWidth,
			},
		];
		const formatWidthTiresGroupLabel = () => (
			<div className="placeholder">
				<span>{translate("general.select")} {translate("tires.placeholders.width")}</span>
			</div>
		);
		const tireHeight = [
			{ value: 1, label: "35" },
			{ value: 2, label: "40" },
			{ value: 3, label: "45" }
		];
		const groupedHeightTiresOptions = [
			{
				options: tireHeight,
			},
		];

		const formatHeightTiresGroupLabel = () => (
			<div className="placeholder">
				<span>{translate("general.select")} {translate("tires.placeholders.height")}</span>
			</div>
		);

		const tireDiameter = [
			{ value: 1, label: "14" },
			{ value: 2, label: "15" },
			{ value: 3, label: "16" }
		];
		const groupedDiameterTiresOptions = [
			{
				options: tireDiameter,
			},
		];
		const formatDiameterTiresGroupLabel = () => (
			<div className="placeholder">
				<span>{translate("general.select")} {translate("tires.placeholders.diameter")}</span>
			</div>
		);


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
									{this.props.isVehicleSelected ?

									<Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg vin-modal">
										<ModalHeader toggle={this.toggle}>
											{this.props.translate('general.browseCataloge.vehicleVinNumber')}
										</ModalHeader>
										<ModalBody>
											<div className="row veh-main-info">
												<div className="col">
													<p>
														<label className="header-label">{this.props.translate('general.browseCataloge.vehcileSelectedLabel')}:</label>
														{currentLanguage === "ar" ?
															this.props.selectedVehicles.nameAr + " " + this.props.selectedVehicleModel.nameAr + " " + this.props.selectedVehicleYear.label
															:
															this.props.selectedVehicles.name + " " + this.props.selectedVehicleModel.name + " " + this.props.selectedVehicleYear.label
														}
													</p>
												</div>
											</div>
											<form className="gray-input vin-input">
												<Field
													onChange={
														e => this.setState(() => ({
															vinInput: e.target.value,
														}))
													}
													hasFloatLabel
													name="VIN/Frame"
													type="text"
													placeholder={this.props.translate("general.VINInput.placeholder")}
													label={this.props.translate("general.VINInput.label")}
													errorMessage={`${this.props.translate("general.enter")} ${this.props.translate("general.VINInput.label")}`}
													component={(props) => <RenderField {...props} value={this.state.vinInput} />}
													validate={[validations.required]}
												/>
												<div className="VIN-info">
													<p onClick={() => this.setState(prevState => ({ vinInput: prevState.vin }))}>{this.props.translate("vehicleInfo.VINNumberEx")}: <Link to="#">{this.state.vin}</Link></p>
													<p className="id-img" id="UncontrolledPopover" type="text">
														<i className="icon-info"></i> {this.props.translate("vehicleInfo.carId")}
													</p>
													<UncontrolledPopover placement="top" target="UncontrolledPopover">
														<PopoverBody><img alt="" src="/img/vin-ex.jpg" /></PopoverBody>
													</UncontrolledPopover>
												</div>
												<div className="actions two-actions">
													<div className="row">
														<div className="col-auto">
															<button type="submit" className='btn btn-gray' onClick={this.toggle}>{this.props.translate('general.buttons.cancel')}</button>
														</div>
														<div className="col-md-auto col">
															<button type="submit" className='btn btn-primary'>{this.props.translate('general.browseCataloge.browseButton')}<i className="icon-arrow-right"></i></button>
														</div>
													</div>
												</div>
											</form>
										</ModalBody>
									</Modal>
								       :
									   <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-xl vin-modal" backdrop="false" >
									   <ModalHeader toggle={this.toggle}>
										   {translate('vehicleInfo.popupVinNumTitle')}
										   <LargeScreen><span>{translate('vehicleInfo.popupVinNumSubTitle')}</span></LargeScreen>
									   </ModalHeader>
									   <ModalBody>
										   <form className="gray-input row">
											   <div className="col-md-auto float-label make">
												   <Field
													   onChange={e => this.setState(() => ({
														   selectedVehicle: e.name,
													   }))}
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
													   onChange={
														   e => this.setState(() => ({
															   vinInput: e.target.value,
														   }))
													   }
													   ref={this.vinFieldRef}
													   value={this.state.vinInput}
													   hasFloatLabel
													   name="VIN/Frame"
													   type="text"
													   placeholder={translate("general.VINInput.placeholder")}
													   label={translate("general.VINInput.label")}
													   errorMessage={`${translate("general.enter")} ${translate("general.VINInput.label")}`}
													   component={(props) => <RenderField {...props} value={this.state.vinInput} />}
													   validate={[validations.required]}
												   />
												   <div className="VIN-info">
													   <p onClick={()=>this.setState(prevState => ({vinInput: prevState.vin}))}>{translate("vehicleInfo.VINNumberEx")}:{this.state.vin}</p>

														   <p className="id-img" id="UncontrolledPopover" type="text">
															   <i className="icon-info"></i> {translate("vehicleInfo.carId")}
														   </p>
														   <UncontrolledPopover placement="top" target="UncontrolledPopover">
															   <PopoverBody><img alt="" src="/img/vin-ex.jpg" /></PopoverBody>
														   </UncontrolledPopover>

												   </div>
											   </div>
											   <div className="col-lg-auto actions">
												   <div className="row">
													   <DownLargeScreen>
														   <div className="col-auto">
															   <button type="submit" className='btn btn-gray' onClick={this.handleClose}>{translate("general.buttons.cancel")}</button>
														   </div>
													   </DownLargeScreen>
													   <div className="col-md-auto col">
														   <Link to="">
															   <button type="submit" className='btn btn-primary' >{translate("vehicleInfo.browseCatalogueBtn")}<i className="icon-arrow-right"></i></button>
														   </Link>
													   </div>
												   </div>
											   </div>
										   </form>
									   </ModalBody>
								   </Modal>
									   }
							</Link>
							</li>
							<li className="col-md-4 col-6">
								<Link to='/accessories'>
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
					<section className="vendor d-none">
						<div className="shop-tires">
							<div className="shop-tires-details">
								<header>{translate("tires.title")}
								</header>
								<hr />
								<h5>{translate("tires.selectTiresSize.header")}  | </h5>
                                 <TiresForm vehicles={this.vehicles}/>
							</div>
							<img alt="" src="/img/tire-ex.png" className="tires-img" />
						</div>
					</section>
					<section className="tires-filter">
						<picture>
							<source media="(max-width: 760px)" srcset="/img/tire-bg-sm.jpg" />
							<img alt="" src="/img/tire-bg.jpg" />
						</picture>
						<div className="d-flex">
							<div className="col">
								<header className="cat-header">
									<h1><p>Shop</p> Tires</h1>
								</header>
								<div className="tire-ex">
									<h5>Select your Tire Size</h5>
									<ul className="list-inline">
										<li>
											<p>225</p>
											<label>width</label>
										</li>
										<li>/</li>
										<li>
											<p>45</p>
											<label>Height</label>
										</li>
										<li>
											<p>R17</p>
											<label>Diameter</label>
										</li>
									</ul>
								</div>
								<form className="form-row select-white">
									<div className="col float-label">
										<Field
										label={translate("tires.placeholders.width")}
										name="make"
										placeholder={' '}
										component={SelectInput}
										options={groupedWidthTiresOptions}
										formatGroupLabel={
											formatWidthTiresGroupLabel
										}
										/>
									</div>
									<div className="col float-label">
										<Field
										label={translate("tires.placeholders.height")}
										name="height"
										placeholder={' '}
										component={SelectInput}
										options={groupedHeightTiresOptions}
										formatGroupLabel={
											formatHeightTiresGroupLabel
										}
										/>
									</div>
									<div className="col float-label">
										<Field
										label={translate("tires.placeholders.diameter")}
										name="diameter"
										placeholder={' '}
										component={SelectInput}
										options={groupedDiameterTiresOptions}
										formatGroupLabel={
											formatDiameterTiresGroupLabel
										}
										/>
									</div>
									<div className="col-md-auto">
										<button className="btn btn-primary">Search</button>
									</div>
								</form>
							</div>
							<LargeScreen>
								<aside className="col-lg-auto col-md-5 img-ex">
									<img alt="" src="/img/tire-ex.png" />
								</aside>
							</LargeScreen>
						</div>

					</section>
				</div>
				<section className="top-selling">
					<div className="gray-bg pb-sec">
					<div className="container-fluid">
						<div className="row">
							<div className="col products-list">
								<header className="sec-head">
									<h2>
										Top Selling

									</h2>
								</header>
								<Swiper {...swiperParams(direction)}>
									{

										bestSeller.map((product, idx) => (
											<div key={idx}>
												<Link to={`/products/${product.id}`} className="card">
													<img onError={handleImageFallback} src={product.image} className="card-img-top" alt="no product" />
													<div className="card-body">
														<h5 className="card-title">{getTranslatedObject(product, currentLanguage, 'desc', 'descAr')}</h5>
														<ul className="list-inline product-info">
															<li><strong>{getTranslatedObject(product.brand, currentLanguage, 'name', 'nameAr')}</strong></li>
															<li>{product.number}</li>
														</ul>
														<div className="rating">
															<Stars values={product.averageRating ? product.averageRating : 0} {...starsRating} />
															<span>{getLength(product.reviews)} 0 Review(s)</span>
														</div>
														<p className="price">{product.salesPrice.toFixed(2)} <span>RS</span></p>
													</div>
												</Link>
											</div>
										))
									}
								</Swiper>
								<div className="swiper-left"></div>
							</div>
						</div>
					</div>
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
		formValues: getFormValues('QuotationRequest')(state),
		translate: getTranslate(state.localize),
		selectedVehicle : state.api.selectedVehicle,
		isVehicleSelected: state.api.isVehicleSelected,
		selectedVehicleModel: state.api.selectedVehicleModel,
		selectedVehicleYear: state.api.selectedVehicleYear,
		selectedVehicles: state.api.selectedVehicles,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		changeFieldValue: (format, field, value) =>
			dispatch(changeFieldValue(format, field, value)),
	};
};

const withHomeDetails = withRouter(HomeDetails);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withHomeDetails);
