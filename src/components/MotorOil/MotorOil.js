import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addRecentViewedProducts } from '../../actions/customerAction';
import { getSortedProducts } from '../../actions/apiAction';
import Slider from 'react-slick';
import Stars from 'react-stars';
import Title from '../UI/Title';
import Manufacturers from '../Manufacturers/Manufacturers';
import Ads from '../Ads/Ads';
import {
	Field,
	reduxForm,
	getFormValues,
} from "redux-form";
import Button from '../UI/Button';

import * as validations from "../../utils";

import SelectInput from '../SelectInput/SelectInput';
import { getTranslate } from 'react-localize-redux';
import { sliderSetting, starsRating } from '../../constants';

class MotorOil extends Component {
	handleSubmit = values => {

	}

	goToProduct = () => {

	}

	getReviewsLength = () => {

	}
	render() {
		const { translate, handleSubmit, products, viscosity, brand } = this.props;
		return (
			<Fragment>
				<section id="motor-oil">
					<div className="oil-image" />
					<div className="container-fluid oil-content">
						<div className="row oil-title">
							<header className="col">
								<h1>{translate("navBar.motorOil")}</h1>
							</header>
						</div>
						<form onSubmit={handleSubmit(this.handleSubmit)}>
							<div className="row no-gutters">
								<div className="col-12 subtitle-container">
									<h2>{translate("motorOilPage.selectViscosity")}</h2>
									<p>Make sure it fits! Search by viscosity grade</p>
								</div>
								<div className="col-12 oil-dropdown">
									<div className="form-inline">
										<div className="col-md-8 size-selection-container">
											<div className="row">
												<div className="col-md-6 viscosity-field-container">
													<Field
														name="viscosity"
														className="form-control viscosity-field"
														placeholder="viscosity"
														component={SelectInput}
														options={viscosity}
														validate={[validations.required]}
													/>
												</div>
												<div className="col-12 w3-hide-large w3-hide-medium">
													<div className="h-seperator" />
												</div>
												<div className="col-md-6 brand-field-container">
													<Field
														name="brand"
														className="form-control brand-field"
														placeholder="brand"
														component={SelectInput}
														options={brand}
														validate={[validations.required]}
													/>
												</div>
											</div>
										</div>
										<div className="col-md-3 btn-container">
											<Button type="submit"
												className="btn-primary"
												text={
													<Fragment>
														<span>{translate("general.search")}</span>
														<i className="icon-arrow-right"></i>
													</Fragment>
												}
											/>
										</div>
									</div>
								</div>

							</div>
						</form>
					</div>
				</section>
				<div className="component-background">
					<section id="oil-best-sellers" className="container-fluid">
						<Title
							header={translate("offers.recommendation.bestSeller")}
							subHeader={translate("offers.subTitle")}
						/>
						<Slider {...sliderSetting}>
							{
								this.props.products.map((product, idx) => (
									<a href="" key={idx} className="card" onClick={this.goToProduct.bind(this, product)}>
										<img className="card-img-top" src="/img/product-2.jpg" alt="product" />
										<div className="card-body">
											<h5 className="card-title">{product.desc}</h5>
											<p className="product-brand">{product.manufacturer.name}</p>
											<div className="product-review">
												<Stars values={product.averageRating} {...starsRating} />
												<span className="total-review">{this.getReviewsLength(product.reviews)} review</span>
											</div>
											<p className="price">
												{product.salesPrice.toFixed(2)} <span className="currency">SR</span>
											</p>
										</div>
									</a>
								))
							}
						</Slider>
					</section>
					<section id="oil-top-brands" className="container-fluid">
						<Title
							header={translate("offers.recommendation.topBrands")}
							subHeader={translate("offers.subTitle")}
						/>
						<Manufacturers products={products} />
					</section>
					<section id="oil-ads" className="container-fluid">
						<Ads />
					</section>
					<section id="oil-grades" className="container-fluid">
						<Title
							header={translate("motorOilPage.popularGrades")}
							subHeader={translate("offers.subTitle")}
						/>
						<Slider {...sliderSetting}>
							{
								this.props.products.map((product, idx) => (
									<a href="" key={idx} className="card" onClick={this.goToProduct.bind(this, product)}>
										<img className="card-img-top" src="/img/product-2.jpg" alt="product" />
										<div className="card-body">
											<h5 className="card-title">{product.desc}</h5>
											<p className="product-brand">{product.manufacturer.name}</p>
											<div className="product-review">
												<Stars values={product.averageRating} {...starsRating} />
												<span className="total-review">{this.getReviewsLength(product.reviews)} review</span>
											</div>
											<p className="price">
												{product.salesPrice.toFixed(2)} <span className="currency">SR</span>
											</p>
										</div>
									</a>
								))
							}
						</Slider>
					</section>
				</div>
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		products: state.api.products,
		translate: getTranslate(state.localize),
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
		getSortedProducts: () => dispatch(getSortedProducts())
	}
}

MotorOil = reduxForm({
	form: "MotorOil"
})(MotorOil);

MotorOil.defaultProps = {
	viscosity: [
		{ value: 'SAE_OW', label: 'SAE OW' },
		{ value: 'SAE_OW-5', label: 'SAE OW-5' },
		{ value: 'SAE_OW-10', label: 'SAE OW-10' }
	],
	brand: [
		{ value: 'ACDelco', label: 'ACDelco' },
		{ value: 'Amalie_oil', label: 'Amalie oil' },
		{ value: 80, label: '80' }
	]
}

export default connect(mapStateToProps, mapDispatchToProps)(MotorOil);