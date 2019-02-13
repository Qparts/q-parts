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
import { isAuth } from '../../utils';
import { right } from '../../utils';
import { getRegions } from '../../actions/apiAction';
import { postQuotation } from '../../actions/customerAction';
import _ from 'lodash';
import { getTranslate } from 'react-localize-redux';
import './QuotationRequest.css';
import Title from '../UI/Title';
import OrderSteps from '../OrderSteps';
import Vehicles from '../Vehicles/Vehicles';

class QuotationRequest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modal: false,
		}

		if (isAuth(this.props.customer.token)) {
			this.props.getRegions(this.props.customer.countryId);
		}
	}

	handleSubmit = values => {
		const { vehicleForm: {
			vehicle: { make: { id: makeId } } }, quotationItems: quotationItemsTemp, city: { id: cityId } } = values;
		const vinImage = "";

		const quotationItems = !_.isEmpty(quotationItemsTemp) ?
			quotationItemsTemp.map(quotationCartItem => {
				return { ...quotationCartItem, image: quotationCartItem.image ? quotationCartItem.image : "" }
			}) : undefined;

		return this.props.postQuotation({ cityId, makeId, vinImage, quotationItems });
	}

	handleClick = (event) => {
		event.preventDefault();
		this.togglePopup();
	}

	togglePopup = () => {
		this.setState({
			modal: !this.state.modal
		})
	}

	render() {
		const { handleSubmit, translate, direction } = this.props;
		const dialog = <Modal contentClassName="container-fluid" className="garage-popup" isOpen={this.state.modal} toggle={this.togglePopup} >
			<ModalHeader toggle={this.togglePopup}>
				<Title
					header={translate("dialog.vehicle.title")}
					subHeader={"Store vehicles in your garage and Get product recommendations"} />
			</ModalHeader>
			<ModalBody>
				<Vehicles
					toggle={this.togglePopup}
					direction={this.props.direction}
				/>
			</ModalBody>
		</Modal>
		const regions = this.props.regions.map(region => {
			return {
				...region,
				value: region.id,
				label: region.name
			}
		});
		const cities = _.has(this.props.formValues, 'region.cities') ?
			this.props.formValues.region.cities.map(city => {
				return {
					...city,
					label: city.name,
					value: city.id
				}
			}) : [];
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
				<section id="custom-details">
					<div className="container-fluid">
						<OrderSteps grey="-gs" />
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
										<Link
											to={'#'}
											isReverseOrder
											className='btn btn-gray'
											text='Garage'
											icon='icon-vehicle'
											onClick={this.handleClick}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-12 select-field-make-container">
										<Field
											name="vehicleForm"
											component={SelectInput}
											options={this.props.vehiclesFormat}
											validate={[validations.required]}
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
									name="quotationItems"
									component={RenderPartInfo}
									add={translate("quotationRequest.partInfo.add")}
									deleteIcon="icon-trash"
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
									<div className="col-md-6 col-12 select-region-field-container padding-md-right-0">
										<Field
											name="region"
											component={SelectInput}
											options={regions}
											validate={[validations.required]}
										/>

									</div>
									<div className="col-md-6 col-12 select-city-field-container padding-md-left-6 padding-md-right-0">
										<Field
											name="city"
											component={SelectInput}
											options={cities}
											validate={[validations.required]}
										/>

									</div>
								</div>
							</div>

							<div className="col-12 padding-right-0">
								<div className="row d-flex">
									<div className="col-md-6 col-12 links">
										<p>By clicking on send button you agree to <a href="#">Qetaa Usage Agreement</a> and <a href="#">Privacy Policies</a>.</p>
									</div>
									<div className="col-md-6 col-12 garage-btn-container padding-md-right-0">
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
		vehiclesFormat: customerObj.vehiclesFormat,
		selectedVehicle: customerObj.selectedVehicle,
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
		postQuotation
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(QuotationRequest);