import React, { Component, Fragment } from "react"; // eslint-disable-line no-unused-vars
import { Field, reduxForm } from 'redux-form';
import SelectInput from '../../components/SelectInput/SelectInput';
import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { getTranslatedObject } from '../../utils';
import _ from 'lodash';
import { withRouter } from "react-router-dom";
import * as validations from '../../utils';
import { DownLargeScreen, LargeScreen, MediumScreen } from '../../components/Device';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import RenderField from '../../components/RenderField/RenderField';
import { Link } from "react-router-dom";
import { UncontrolledPopover, PopoverBody } from 'reactstrap';
import Radio from '../../components/UI/Radio';





export class ManualForm extends Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.toggleChangeVehivle = this.toggleChangeVehivle.bind(this);

		this.state = {
			vehicle: [],
			selectedVehicle: {
				id: null
			},
			selectedVehicleModel: {
				id: null
			},
			selectedVehicleYear: {
				id: null
			},
			isVehicleSelected: false,
			modal: false,
			vin: "JTHBJ46G9B2420251",
			vinInput: "",
			open: false,
			changeVehcileModal: false
		}
	}

	toggle() {
		this.setState(prevState => ({
			modal: !prevState.modal
		}));
	}

	toggleChangeVehivle() {
		this.setState(prevState => ({
			changeVehcileModal: !prevState.changeVehcileModal
		}));
	}

	handleSubmit = () => {
		this.setState({ isVehicleSelected: true })
		// this.props.history.push(`/selected-vehicle?make=${this.state.selectedVehicle.name}&model=${this.state.selectedVehicleModel.label}&year=${this.state.selectedVehicleYear.label}`);
	};


	render() {
		const { vehicles, currentLanguage  } = this.props;
		const { isVehicleSelected } = this.state;
		let selectedVechileModule;

		console.log(isVehicleSelected , ">>>>>>>>>");
		 

		
		const vehicleMake = vehicles.map(vehicle => {
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
		})

		const groupedvehicleMake = [
			{
				options: vehicleMake,
			},
		];

		const formatvehicleMakeLabel = () => (
			<div className="placeholder">
				<span>{this.props.translate('form.vehicle.make')}</span>
			</div>
		);



		let vehicleModels = null
		let selectedVehicle = vehicles.find(vehicle => vehicle.models.some(model => model.makeId === this.state.selectedVehicle.id))
		if (selectedVehicle) {
			vehicleModels = selectedVehicle.models.map(model => {
				return {
					...model,
					label: getTranslatedObject(
						model,
						currentLanguage,
						'name',
						'nameAr'
					),
					value: model.id,
					years: model.modelYears
				}
			})
		}
		else {
			vehicleModels = [{ value: "no options", label: "no options", years: [{}] }]
		}


		const groupedvehicleModel = [
			{
				options: vehicleModels
			},
		];

		const formatvehicleModelLabel = () => (
			<div className="placeholder">
				<span>{this.props.translate('form.vehicle.model')}</span>
			</div>
		);


		let vehicleYears = null;
		if (vehicleModels && this.state.selectedVehicleModel && this.state.selectedVehicleModel.years) {
			vehicleYears = vehicleModels.find(model => model.id === this.state.selectedVehicleModel.id).years.map(year => {
				return {
					label: getTranslatedObject(
						year,
						currentLanguage,
						'year',
						'year'

					),
					value: year.id,
					imageLarge: year.imageLarge,
					imageSmall: year.imageSmall
				}
			});
		}
		else {
			vehicleYears = [{ value: "no options", label: "no options" }]
		}


		const groupedvehicleYear = [
			{
				options: vehicleYears,
			},
		];


		const formatvehicleYearLabel = () => (
			<div className="placeholder">
				<span>{this.props.translate('form.vehicle.year')}</span>
			</div>
		);





		if (isVehicleSelected) {
			selectedVechileModule =
				<div>
					<section className="select-vehicle">
						<picture>
							<source media="(max-width: 650px)" srcset={this.state.selectedVehicleYear.imageLarge} />
							<source media="(max-width: 465px)" srcset={this.state.selectedVehicleYear.imageSmall} />
							<img alt="" src={this.state.selectedVehicleYear.imageLarge} />
						</picture>
						<div className="container-fluid">
							<div className="selected-vehicle-details">
								<header >
									<label className="header-label">{this.props.translate('general.selectedVehcile')}: </label>
									<h3 className="header-h3">
										{currentLanguage === "ar" ?
											this.state.selectedVehicle.nameAr + " " + this.state.selectedVehicleModel.nameAr + " " + this.state.selectedVehicleYear.label
											:
											this.state.selectedVehicle.name + " " + this.state.selectedVehicleModel.name + " " + this.state.selectedVehicleYear.label
										}
									</h3>
								</header>
								<div className="col-auto">
									<a className="btn btn-primary" onClick={this.toggle}><i className="icon-catalog"></i><MediumScreen>{this.props.translate('general.browseCataloge.browseButton')}</MediumScreen></a>
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
															this.state.selectedVehicle.nameAr + " " + this.state.selectedVehicleModel.nameAr + " " + this.state.selectedVehicleYear.label
															:
															this.state.selectedVehicle.name + " " + this.state.selectedVehicleModel.name + " " + this.state.selectedVehicleYear.label
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
									<a className="btn btn-black" onClick={this.toggleChangeVehivle}><i className="icon-vehicle"></i><MediumScreen> {this.props.translate('general.vehicle.changeVehcile')}</MediumScreen></a>
									<Modal isOpen={this.state.changeVehcileModal} toggle={this.toggleChangeVehivle} className="modal-lg vin-modal">
										<ModalHeader toggle={this.toggleChangeVehivle}>
											{this.props.translate('general.changeVehicle.modalHeader')} <LargeScreen><span>{this.props.translate('general.changeVehicle.modalHeaderSpan')}</span></LargeScreen>
										</ModalHeader>
										<ModalBody className="add-new-vehicle">
											<header>
												<h4>{this.props.translate('general.changeVehicle.addNewVehicle')} </h4>
												<div className="garage-select">
													<MediumScreen>
														<label>{this.props.translate('form.vehicle.placeholder.select')}</label>
													</MediumScreen>
													<a href="#" className="btn btn-gray-secondary dropdown-toggle" role="button" id="garage-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
														<img className="icon-garage" alt="garage" src="/img/garage.svg" /> {this.props.translate('form.vehicle.title')}
														<span className="vec-count">2</span>
													</a>
													<div class="dropdown-menu garage-dropdown" aria-labelledby="garage-dropdown">
														<div class="media">
															<i className="icon-vehicle-history"></i>
															<div class="media-body">
																<h5>تاريخ المركبة المختار </h5>
																<p>عرض وإدارة والعثور على قطع غيار للسيارات في المرآب الخاص بك</p>
															</div>
														</div>
														<ul className="list-unstyled">
															<li className="radio-custom" key="1">
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
																		<a href="#" className="btn btn-primary"><i className="icon-catalog"></i>{this.props.translate('searchResult.buttons.catalog')}</a>
																		<a href="#" className="link">{this.props.translate('setting.accountSetting.save')}</a>
																	</div>
																</a>
															</li>
															<li className="radio-custom" key="1">
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
											                        	<a href="#" className="btn btn-primary"><i className="icon-catalog"></i>{this.props.translate('searchResult.buttons.catalog')}</a>
												                        <a href="#" className="link">{this.props.translate('setting.accountSetting.save')}</a>
																	</div>
																</a>
															</li>
														</ul>
														<div className="vec-list-actions">
															<div className="main-action">
																<a className="btn btn-gray">
																	<i className="icon-add-vehicle"></i>
																	{this.props.translate('general.vehicleButton.add')}
                                                                    </a>
															</div>
															<a href="#" className="link">
																<i className="icon-clear"></i>
																{this.props.translate('general.vehicleButton.remove')}
                                                                </a>
														</div>
													</div>
												</div>
											</header>
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
														<p onClick={() => this.setState(prevState => ({ vinInput: prevState.vin }))}>{this.props.translate("vehicleInfo.VINNumberEx")}:{this.state.vin}</p>

														<p className="id-img" id="UncontrolledPopover" type="text">
															<i className="icon-info"></i> {this.props.translate("vehicleInfo.carId")}
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
																<button type="submit" className='btn btn-gray'>Cancel</button>
															</div>
														</DownLargeScreen>
														<div className="col-md-auto col">
															<button type="submit" className='btn btn-primary'>{this.props.translate('general.buttons.go')}<i className="icon-arrow-right"></i></button>
														</div>
													</div>
												</div>
											</form>
										</ModalBody>
									</Modal>
								</div>
							</div>
						</div>
					</section>
				</div>
		} else {
			selectedVechileModule = <section className="select-vechile">
				<picture>
					<source media="(max-width: 650px)" srcset="/img/hero-xs.jpg" />
					<source media="(max-width: 465px)" srcset="/img/hero-xxs.jpg" />
					<img alt="" src="/img/hero-lg.jpg" />
				</picture>
				<div className="form-main">
					<div className="container-fluid">
						<header>
							<h1> {this.props.translate('form.order.title')} </h1>
							<p>{this.props.translate('form.order.subTitle')} </p>
						</header>
						<form
							onSubmit={this.props.handleSubmit(
								this.handleSubmit
							)}
							className="select-vechile-form">
							<div className="row">
								<div className="col-md float-label">
									<Field
										value={this.state.selectedVehicle}
										onChange={e => this.setState(() => ({
											selectedVehicle: e,
											selectedVehicleModel: ''
										}))}
										label={this.props.translate('form.vehicle.make')}
										name="make"
										placeholder={' '}
										component={SelectInput}
										options={groupedvehicleMake}
										validate={[validations.required]}
										formatGroupLabel={
											formatvehicleMakeLabel
										}
									/>
								</div>
								<div className="col-md float-label">
									<Field

										onChange={e =>
											this.setState(() => ({

												selectedVehicleModel: e
											}))
										}
										label={this.props.translate('form.vehicle.model')}
										name="model"
										placeholder={' '}
										component={SelectInput}
										options={groupedvehicleModel}
										validate={[validations.required]}
										formatGroupLabel={
											formatvehicleModelLabel
										}
									/>
								</div>
								<div className="col-md float-label">
									<Field
										onChange={e => this.setState(() => ({
											selectedVehicleYear: e
										}))}
										label={this.props.translate('form.vehicle.year')}
										name="year"
										placeholder={' '}
										component={SelectInput}
										options={groupedvehicleYear}
										validate={[validations.required]}
										formatGroupLabel={
											formatvehicleYearLabel
										}
									/>
								</div>
								<div className="col-md-auto">
									<button type="submit" className='btn btn-primary'>{this.props.translate('general.buttons.go')} <i className="icon-arrow-right"></i></button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</section>
		}
		return (
			<div>
				{selectedVechileModule}
			</div>
		);
	}
}


const mapStateToProps = state => ({
	translate: getTranslate(state.localize)
});


// const mapDispatchToProps = dispatch => {
// 	return {
// 		getVehicleService: () =>
// 			dispatch(getVehicleService())
// 	};
// };

ManualForm = reduxForm({
	form: 'ManualForm'
})(ManualForm);

const withManualForm = withRouter(ManualForm);

export default connect(
	mapStateToProps,
	// mapDispatchToProps
)(withManualForm);
