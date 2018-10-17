import React, { Component } from 'react';
import {
	Field, reduxForm, change as changeFieldValue, FieldArray, getFormValues
} from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import RenderField from '../RenderField/RenderField';
import SelectInput from '../SelectInput/SelectInput';
import Button from '../UI/Button';
import Header from '../UI/Header';
import RenderPartInfo from '../RenderPartInfo/RenderPartInfo';
import RenderFileInput from '../RenderFileInput/RenderFileInput';
import { Dialog } from '../../../node_modules/primereact/components/dialog/Dialog';
import ShippingCity from '../ShippingCity/ShippingCity';
import * as validations from '../../utils';
import { getRegions } from '../../actions/apiAction';
import { addQuotationToCart } from '../../actions/cartAction';
import _ from 'lodash';
import { getTranslate } from 'react-localize-redux';

import './QuotationRequest.css';

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
		const { handleSubmit, selectedVehicle, translate } = this.props;
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
			<div className="QuotationRequest-container">
				{dialog}
				<Header text={`${translate("quotationRequest.title")} ${this.props.itemName}`} />
				<form onSubmit={handleSubmit(this.handleSubmit)}>
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
				</form>
			</div>
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