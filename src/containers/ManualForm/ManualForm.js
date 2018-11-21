import React, { Component, Fragment } from "react"; // eslint-disable-line no-unused-vars
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { getTranslate } from "react-localize-redux";
import {
	Field,
	reduxForm,
	getFormValues,
	change as changeFieldValue
} from "redux-form";
import Button from "../../components/UI/Button";
import { Dialog } from "primereact/components/dialog/Dialog";
import SelectInput from "../../components/SelectInput/SelectInput";
import RenderField from "../../components/RenderField/RenderField";
import Vehicles from "../../components/Vehicles/Vehicles";

import {
	findSelectedPart,
	setCurrentVehicleSearch
} from "../../actions/baseFormAction";
import { addToCart } from "../../actions/cartAction";
import { completeOrder } from "../../actions/customerAction";

import _ from "lodash";
import * as validations from "../../utils";
import { isAuth } from "../../utils";
import { TAB_ONE, ADD_VEHICLE } from "../../constants";

import "./ManualForm.scss";

export class ManualForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newOrOldVechile: TAB_ONE,
			visible: false
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			prevProps.vehiclesFormat !== this.props.vehiclesFormat &&
			this.state.visible
		) {
			this.onHide();
		}
	}

	componentWillUnmount() {
		this.props.completeOrder(false);
	}

	handleSubmit = ({ partNo, maker }) => {
		this.props.setCurrentVehicleSearch(maker, partNo);
		this.props.history.push(`/order/part/${partNo}/makeId/${maker.id}`);
	};

	onHide = event => {
		this.props.changeFieldValue("ManualForm", "maker", "");
		this.setState({
			visible: false,
			newOrOldVechile: TAB_ONE
		});
	};

	handleAddVehicle = value => {
		if (value.value === ADD_VEHICLE) {
			this.setState({
				visible: true
			});
		}
	};

	handleChange = (event, value) => {
		this.setState({
			newOrOldVechile: value
		});
	};

	handleTrackOrder = () => {
		this.props.history.push("/setting/orders/1");
	};

	render() {
		const { handleSubmit, vehicles, translate } = this.props;
		const makerData = vehicles.map(vehicle => {
			return {
				...vehicle,
				label: vehicle.name,
				value: vehicle.id
			};
		});

		const modelData = _.has(this.props.formValues, "maker.models")
			? this.props.formValues.maker.models.map(model => {
				return {
					...model,
					label: model.name,
					value: model.id
				};
			})
			: [];

		const yearData = _.has(this.props.formValues, "model.modelYears")
			? this.props.formValues.model.modelYears.map(modelYear => {
				return {
					...modelYear,
					label: modelYear.year,
					value: modelYear.id
				};
			})
			: [];

		const dropdownList = this.props.vehiclesFormat.slice(0);
		dropdownList.unshift({
			value: ADD_VEHICLE,
			label: (
				<i className="fas fa-plus-circle ManualForm-add_vehcile">Add Vehicle</i>
			)
		});

		const dialog = (
			<Dialog
				header={translate("dialog.vehicle.title")}
				maximizable={true}
				visible={this.state.visible}
				positionTop={0}
				minWidth={1000}
				modal={true}
				onHide={this.onHide}
			>
				<Vehicles
					newOrOldVechile={this.state.newOrOldVechile}
					onTabChange={this.handleChange}
				/>
			</Dialog>
		);

		const alertOrderCompleted = this.props.isOrderCompleted && (
			<div className="alert alert-success" role="alert">
				{translate("form.order.trackOrder")}{" "}
				<Button
					type="button"
					className="btn btn-link"
					text={translate("form.order.trackButton")}
					onClick={this.handleTrackOrder}
				/>
			</div>
		);

		return (
			<section id="manual-form">
				<div className="manual-form-image" />
				<div className="container-fluid manual-form__content">

					<div className="row">
						<header className="col">
							<h1>{translate("form.order.title")}</h1>
							<p>{translate("form.order.subTitle")}</p>
						</header>

					</div>
					<form onSubmit={handleSubmit(this.handleSubmit)}>
						<div className="row no-gutters">
							<div className="col-lg-4 col-md-6 col-sm-6 manual-form-textbox-container">
								<Field
									label={translate("form.order.partNo")}
									name="partNo"
									className="form-control mr-sm-2 h-100 manual-form-textbox"
									component={RenderField}
									type="text"
									placeholder={translate("form.order.placeholder.partNo")}
									validate={[validations.required]}
								/>
							</div>
							{!isAuth(this.props.token) ? (
								<Fragment>
									<div className="col-lg-6 col-md-12 col-sm-12 manual-form__dropdown">
										<div className="col-xs-12 dropdown-label-container">
											<span className="dropdown-label">{translate("form.order.make")}</span>
										</div>
										<div className="form-inline">
											<div className="make-select-container col-lg-3 col-md-12 col-sm-12">
												<Field
													className=""
													name="maker"
													placeholder="make"
													component={SelectInput}
													options={makerData}
													validate={[validations.required]}
												/>
											</div>
											<div className="col-lg-1 w3-hide-small w3-hide-medium">
												<div className="seperator" />
											</div>
											<div className="col-sm-12 w3-hide-large">
												<div className="h-seperator" />
											</div>
											<div className="make-select-container col-lg-3 col-md-12 col-sm-12">
												<Field
													className="mob-maker"
													name="model"
													placeholder="model"
													component={SelectInput}
													options={modelData}
													validate={[validations.required]}
												/>
											</div>
											<div className="col-lg-1 w3-hide-small w3-hide-medium">
												<div className="seperator" />
											</div>
											<div className="col-sm-12 w3-hide-large">
												<div className="h-seperator" />
											</div>
											<div className="make-select-container col-lg-4 col-md-12 col-sm-12">
												<Field
													className="manual-mob-maker"
													name="year"
													placeholder="year"
													component={SelectInput}
													options={yearData}
													validate={[validations.required]}
												/>
											</div>

										</div>
									</div>
								</Fragment>
							) : (
									<div className="col-lg-6  col-md-12 col-sm-12 manual-form__dropdown">
										<label>{translate("form.order.make")}</label>
										<div className="form-inline row">
											<Field
												className="col-lg-6 col-xl-6 col-md-12 col-sm-12"
												name="maker"
												component={SelectInput}
												options={dropdownList}
												onChange={this.handleAddVehicle}
												validate={[validations.required]}
											/>
										</div>
									</div>
								)}
							<div className="col-lg-1 col-md-12 col-sm-12">
								<Button
									type="submit"
									className="btn-primary manual-general-search-btn"
									text={
										<Fragment>
											<span>{translate("general.searchButton")}</span>
											<i className="icon-arrow-right"></i>
										</Fragment>
									}
								/>
							</div>
						</div>
					</form>
				</div>
				{dialog}
			</section>
		);
	}
}

const mapStateToProps = state => {
	return {
		part: state.manualOrder.part,
		vehicles: state.api.vehicles,
		formValues: getFormValues("ManualForm")(state),
		translate: getTranslate(state.localize),
		token: state.customer.token,
		// vehiclesFormat: customer.vehicles,
		vehiclesFormat: state.customer.vehiclesFormat,
		isOrderCompleted: state.customer.isOrderCompleted
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			findSelectedPart,
			addToCart,
			setCurrentVehicleSearch,
			completeOrder,
			changeFieldValue
		},
		dispatch
	);
};

ManualForm = reduxForm({
	form: "ManualForm"
})(ManualForm);

const withManualForm = withRouter(ManualForm);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withManualForm);
