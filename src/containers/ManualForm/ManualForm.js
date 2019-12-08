import React, { Component, Fragment } from "react"; // eslint-disable-line no-unused-vars
import { Field, reduxForm } from 'redux-form';
import SelectInput from '../../components/SelectInput/SelectInput';

export class ManualForm extends Component {
	render() {
			const vehicleMake = [
				{ value: 1, label: "BMW" },
				{ value: 2, label: "KIA" },
				{ value: 3, label: "Ford" },
			];
			const groupedvehicleMake = [
				{
					options: vehicleMake,
				},
			];
			const formatvehicleMakeLabel = () => (
				<div className="placeholder">
					<span>اختر نوع السيارة</span>
				</div>
			);
			const vehicleModel = [
				{ value: 1, label: "Rio" },
				{ value: 2, label: "فوكس" },
				{ value: 3, label: "20CS" },
			];
			const groupedvehicleModel = [
				{
					options: vehicleModel,
				},
			];
			const formatvehicleModelLabel = () => (
				<div className="placeholder">
					<span>Select vehicle Model</span>
				</div>
			);
			const vehicleYear = [
					{ value: 1, label: "2010" },
					{ value: 2, label: "2011" },
					{ value: 3, label: "2012" },
				];
				const groupedvehicleYear = [
					{
						options: vehicleYear,
					},
				];
				const formatvehicleYearLabel = () => (
					<div className="placeholder">
						<span>Select Year</span>
					</div>
				);

			const { translate } = this.props;
		return (

			<section className="select-vechile">
				<picture>
				  <source media="(max-width: 650px)" srcset="/img/hero-xs.jpg" />
				  <source media="(max-width: 465px)" srcset="/img/hero-xxs.jpg" />
				  <img src="/img/hero-lg.jpg" />
				</picture>
				<div className="form-main">
					<div className="container-fluid">
						<header>
							{/*<h1>Shop By Vechile</h1>
							<p>More than 20,000,000 products (original pieces, commercial parts, replacement parts, sports pieces, accessories)</p>*/}
							<h1>تسوق حسب السيارة</h1>
							<p>أكثر من 20،000،000 منتج (قطع أصلية ، قطع غيار تجارية ، قطع غيار ، قطع رياضية ، إكسسوارات)</p>
						</header>
						<form className="select-vechile-form">
							<div className="row">
								<div className="col-md float-label">
									<Field
										label="اختر السيارة"
										name="make"
										placeholder={' '}
										component={SelectInput}
										options={groupedvehicleMake}
										formatGroupLabel={
											formatvehicleMakeLabel
										}
										/>
								</div>
								<div className="col-md float-label">
									<Field
										label="Model"
										name="model"
										placeholder={' '}
										component={SelectInput}
										options={groupedvehicleModel}
										formatGroupLabel={
											formatvehicleModelLabel
										}
										/>
								</div>
								<div className="col-md float-label">
									<Field
										label="year"
										name="year"
										placeholder={' '}
										component={SelectInput}
										options={groupedvehicleYear}
										formatGroupLabel={
											formatvehicleYearLabel
										}
										/>
								</div>
								<div className="col-md-auto">
									<button type="submit" className='btn btn-primary'>go <i className="icon-arrow-right"></i></button>
								</div>
							</div>
						</form>
					</div>
				</div>

			</section>
		);
	}
}
ManualForm = reduxForm({
	form: 'ManualForm'
})(ManualForm);
export default ManualForm;
