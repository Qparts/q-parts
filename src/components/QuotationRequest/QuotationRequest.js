import React, { Component, Fragment } from 'react';
import {
	Field, reduxForm, change as changeFieldValue, FieldArray, getFormValues
} from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import RenderField from '../RenderField/RenderField';
import SelectInput from '../SelectInput/SelectInput';
import Button from '../UI/Button';
import SectionHeader from '../UI/SectionHeader';
import RenderPartInfo from '../RenderPartInfo/RenderPartInfo';
import RenderFileInput from '../RenderFileInput/RenderFileInput';
import { Dialog } from '../../../node_modules/primereact/components/dialog/Dialog';
import ShippingCity from '../ShippingCity/ShippingCity';
import * as validations from '../../utils';
import { right } from '../../utils';
import { getRegions } from '../../actions/apiAction';
import { addQuotationToCart } from '../../actions/cartAction';
import _ from 'lodash';
import { getTranslate } from 'react-localize-redux';
import './QuotationRequest.css';
import Title from '../UI/Title';

class QuotationRequest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			visible: false,
		}
	}

	componentWillMount() {
		this.props.getRegions(this.props.customer.countryId);
		this.handleFillValues(this.props.selectedVehicle);
	}

	handleSubmit = values => {
		this.onShowDialog()
	}

	handleFillValues = (value) => {
		const make = value.vehicle ? value.vehicle.make.nameAr : '';
		const model = value.vehicle ? value.vehicle.model.nameAr : '';
		const year = value.vehicle ? value.vehicle.year : '';
		const vin = value.vin ? value.vin : '';

		this.props.changeFieldValue('QuotationRequest', 'make', make);
		this.props.changeFieldValue('QuotationRequest', 'model', model);
		this.props.changeFieldValue('QuotationRequest', 'year', year);
		this.props.changeFieldValue('QuotationRequest', 'vin', vin);
	}

	onHide = (event) => {
		this.setState({
			visible: false,
		});
	}

	onShowDialog = () => {
		this.setState({
			visible: true
		})
	}

	onConfirmDialog = values => {
		const { vehicleForm: {
			customerId, vehicle: {
				id: customerVehicleId, make: { id: makeId }, model: { id: modelYearId }
			} }, vin, vinImage, quotationCartItems: quotationCartItemsTemp } = this.props.formValues;
		const { city: { id: cityId } } = values;
		const imageAttached = vinImage ? true : false;

		const quotationCartItems = !_.isEmpty(quotationCartItemsTemp) ?
			quotationCartItemsTemp.map(quotationCartItem => {
				return { ...quotationCartItem, imageAttached: quotationCartItem.image ? true : false }
			}) : undefined;

		return this.props.addQuotationToCart(
			{ customerVehicleId, vinImage, customerId, cityId, imageAttached, makeId, modelYearId, vin, quotationCartItems })
			.then(() => {
				this.onHide();
			});

	}

	render() {
		const { handleSubmit, selectedVehicle, translate, direction } = this.props;
		const dialog = <Dialog header={translate("dialog.shippingCity.title")} visible={this.state.visible} minWidth={500} modal={true} onHide={this.onHide}>
			<div className="Signup-verification_number">
				<ShippingCity
					translate={translate}
					label={translate("dialog.shippingCity.label")}
					regions={this.props.regions}
					onHide={this.onHide}
					onSubmit={this.onConfirmDialog}
				/>
			</div>
		</Dialog>
		return (
			<Fragment>
				<section id="custom-header">
					<div className="container-fluid custom-header-content">
						<div className="row custom-header-title">
							<header className="col">
								<h1>Custom Order</h1>
								<p>We move fast. Send us request and we will reply by price and all details</p>
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
								<h1>STEPS</h1>
								<p>To get your parts anywhere you like</p>
							</div>
						</div>
					</div>
				</section>
				<section id="custom-steps">
					<div className="container-fluid">
						<div className="row steps-container" align="center">
							<div className="col-12">
								<div className="row text-center">
									<div className="col-3">
										<img className="request" src="/img/request.svg" alt="request" />
										<figcaption className="clearfix">
											<h3>Request</h3>
											<p>Fill in your vehicle data and the <span>parts you want</span></p>
										</figcaption>
									</div>
									<div className="col-3 disabled">
										<img className="check-price" src="/img/check-price.svg" alt="check-price" />
										<figcaption>
											<h3>Check Price</h3>
											<p>The price will deliver to you <span>within 24 hours</span></p>
										</figcaption>
									</div>
									<div className="col-3 disabled">
										<img className="add-to-cart" src="/img/add-to-cart.svg" alt="add-to-cart" />
										<figcaption>
											<h3>Add To Cart</h3>
											<p>choose Sipping Address <span>and payment method</span></p>
										</figcaption>
									</div>
									<div className="col-3 disabled">
										<img className="delivery-product" src="/img/delivery-product.svg" alt="delivery-product" />
										<figcaption>
											<h3>Receive Order</h3>
											<p>Your order for your workshop or <span>anywher you love</span></p>
										</figcaption>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<section id="custom-details">
					<div className="container-fluid">
						<div className="title-container">
							<Title header="Parts Request"
								subHeader="Fill in your vehicle data and the parts you want" />
						</div>
						<form onSubmit={handleSubmit(this.handleSubmit)}>
							<div className="custom-container col-12">
								<div className="row d-flex">
									<div className="col-6">
										<h3>Vehicle Information</h3>
									</div>
									<div className="col-6 garage-btn-container">
										Button
									</div>
								</div>
								<div className="row">
									<div className="col-12 col-md-3 select-field-make-container">
										<Field
											defaultValue={!_.isEmpty(selectedVehicle) ? selectedVehicle : ''}
											name="vehicleForm"
											className="select-field-make"
											component={SelectInput}
											onChange={(value) => this.handleFillValues(value)}
											options={this.props.vehiclesFormat}
										/>

									</div>
									<div className="col-12 col-md-3 select-field-model-container">
										<Field
											defaultValue={!_.isEmpty(selectedVehicle) ? selectedVehicle : ''}
											name="vehicleForm"
											className="select-field-model"
											component={SelectInput}
											onChange={(value) => this.handleFillValues(value)}
											options={this.props.vehiclesFormat}
										/>

									</div>
									<div className="col-12 col-md-2 select-field-year-container">
										<Field
											defaultValue={!_.isEmpty(selectedVehicle) ? selectedVehicle : ''}
											name="vehicleForm"
											className="select-field-year"
											component={SelectInput}
											onChange={(value) => this.handleFillValues(value)}
											options={this.props.vehiclesFormat}
										/>

									</div>
									<div className="col-12 col-md-4 vin-field-container padding-md-left-6">
										<Field
											defaultValue={!_.isEmpty(selectedVehicle) ? selectedVehicle : ''}
											name="vehicleForm"
											className="vin-field"
											component={SelectInput}
											onChange={(value) => this.handleFillValues(value)}
											options={this.props.vehiclesFormat}
										/>

									</div>
								</div>
							</div>


							<div className="custom-container col-12">
								<div className="row d-flex">
									<div className="col-6">
										<h3>{translate("quotationRequest.partInfo.title")}</h3>
									</div>
								</div>
								<FieldArray
									name="quotationCartItems"
									component={RenderPartInfo}
									add={translate("quotationRequest.partInfo.add")}
									deleteButton={
										<Fragment>
											<i className="icon-close"></i>
										</Fragment>
									}
									placeholder={translate("quotationRequest.placeholder.carInfo.vin")}
								/>
							</div>

							<div className="custom-container col-12">
								<div className="row d-flex">
									<div className="col-6">
										<h3>Shipping Information</h3>
									</div>
								</div>

								<div className="row">
									<div className="col-md-6 col-12 select-country-field-container padding-md-right-0">
										<Field
											defaultValue={!_.isEmpty(selectedVehicle) ? selectedVehicle : ''}
											name="vehicleForm"
											className="select-country-field"
											component={SelectInput}
											onChange={(value) => this.handleFillValues(value)}
											options={this.props.vehiclesFormat}
										/>

									</div>
									<div className="col-md-6 col-12 select-city-field-container padding-md-left-6">
										<Field
											defaultValue={!_.isEmpty(selectedVehicle) ? selectedVehicle : ''}
											name="vehicleForm"
											className="select-city-field"
											component={SelectInput}
											onChange={(value) => this.handleFillValues(value)}
											options={this.props.vehiclesFormat}
										/>
									</div>
								</div>
							</div>

							<div className="col-12 padding-right-0">
								<div className="row d-flex">
									<div className="col-6">
										<p>By clicking on send button you agree to <a href="#">Qetaa Usage Agreement</a> and <a href="#">Privacy Policies</a>.</p>
									</div>
									<div className="col-6 garage-btn-container padding-md-right-0">
										<Button type="submit" className="btn btn-primary" text={
											<Fragment>
												<span>{translate("general.send")}</span>
												<i className={`icon-arrow-${right(direction)}`}></i>
											</Fragment>
										} />
									</div>
								</div>
							</div>
						</form>
					</div>
				</section>
			</Fragment>

			/*
			<div className="QuotationRequest-container">
					<p>{translate("quotationRequest.subTitle")}</p>
					<div className="border rounded">
						<div className="QuotationRequest-box bg-light navbar-nav">
							<p>{translate("quotationRequest.carInfo.title")}</p>
							<div className="QuotationRequest-box_item">
								<p>{translate("quotationRequest.carInfo.select")}</p>
								<Field
									defaultValue={!_.isEmpty(selectedVehicle) ? selectedVehicle : ''}
									name="vehicleForm"
									className="QuotationRequest-selectInput"
									component={SelectInput}
									onChange={(value) => this.handleFillValues(value)}
									options={this.props.vehiclesFormat}
								/>
							</div>
							<div className="QuotationRequest-box_item form-group">
								<Field
									name="make"
									component={RenderField}
									type="text"
									placeholder={translate("quotationRequest.placeholder.carInfo.vehicle")}
									validate={[validations.required]}
								/>
								<Field
									name="model"
									component={RenderField}
									type="text"
									placeholder={translate("quotationRequest.placeholder.carInfo.model")}
									validate={[validations.required]}
								/>
								<Field
									name="year"
									component={RenderField}
									type="text"
									placeholder={translate("quotationRequest.placeholder.carInfo.year")}
									validate={[validations.required]}
								/>
								<Field
									name="vin"
									component={RenderField}
									type="text"
									placeholder={translate("quotationRequest.placeholder.carInfo.vin")}
								/>
								<Field
									name="vinImage"
									component={RenderFileInput}
									image='image'
								/>
							</div>
						</div>
						<div className="QuotationRequest-box bg-light navbar-nav">
							<p>{translate("quotationRequest.partInfo.title")}</p>
							<FieldArray
								name="quotationCartItems"
								component={RenderPartInfo}
								add={translate("quotationRequest.partInfo.add")}
								deleteButton={translate("quotationRequest.partInfo.delete")}
								placeholder={translate("quotationRequest.placeholder.carInfo.vin")}
							/>
						</div>
					</div>
					<div className="QuotationRequest-footer">
						<Button type="submit" className="btn btn-secondary" text={translate("quotationRequest.send")} />
					</div>
			</div>
			*/
		)
	}
}

QuotationRequest = reduxForm({
	form: 'QuotationRequest'
})(QuotationRequest)

const mapStateToProps = (state) => {
	const customerObj = state.customer;

	return {
		initialValues: state.manualOrder,
		customer: customerObj.detail,
		vehiclesFormat: customerObj.vehiclesFormat,
		selectedVehicle: customerObj.selectedVehicle,
		itemName: state.manualOrder.itemName,
		partsSelected: state.manualOrder.partsSelected,
		regions: state.api.regions,
		formValues: getFormValues('QuotationRequest')(state),
		translate: getTranslate(state.localize),
		direction: state.customer.direction
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		changeFieldValue,
		getRegions,
		addQuotationToCart
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotationRequest);