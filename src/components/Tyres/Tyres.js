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
import WithProductView from '../../hoc/WithProductView';

import * as validations from "../../utils";

import SelectInput from '../SelectInput/SelectInput';
import { getTranslate } from 'react-localize-redux';
import { sliderSetting, starsRating } from '../../constants';


class Tyres extends Component {

	handleSubmit = values => {

	}

	goToProduct = () => {

	}

	getReviewsLength = () => {

	}

	render() {
		const { translate, handleSubmit, products, width, height, diameter } = this.props;
		return (
			<Fragment>
				<section id="tyres">
					<div className="tyres-image" />
					<div className="container-fluid tyres-content">
						<div className="row tyres-title">
							<header className="col">
								<h1>{translate("navBar.tyres")}</h1>
							</header>
						</div>
						<form onSubmit={handleSubmit(this.handleSubmit)}>
							<div className="row no-gutters">
								<div className="col-12 subtitle-container">
									<h2>{translate("tyresPage.selectTyreSize")}</h2>
									<p>Make sure it fits! Search by size</p>
								</div>
								<div className="col-12 tyres-dropdown">
									<div className="form-inline">
										<div className="col-md-9 size-selection-container">
											<div className="row">
												<div className="col-md-4 width-field-container">
													<Field
														name="width"
														className="form-control width-field"
														placeholder="width"
														component={SelectInput}
														options={width}
														validate={[validations.required]}
													/>
												</div>
												<div className="col-12 w3-hide-large w3-hide-medium">
													<div className="h-seperator" />
												</div>
												<div className="col-md-4 height-field-container">
													<Field
														name="height"
														className="form-control height-field"
														placeholder="height"
														component={SelectInput}
														options={height}
														validate={[validations.required]}
													/>
												</div>
												<div className="col-12 w3-hide-large w3-hide-medium">
													<div className="h-seperator" />
												</div>
												<div className="col-md-4 diameter-field-container">
													<Field
														name="diameter"
														className="form-control diameter-field"
														placeholder="diameter"
														component={SelectInput}
														options={diameter}
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
					<section id="tyres-best-sellers" className="container-fluid">
						<Title
							header={translate("offers.recommendation.bestSeller")}
							subHeader={translate("offers.subTitle")}
						/>
						<Slider {...sliderSetting}>
							{
								this.props.products.map((product, idx) => (
									<a href="" key={idx} className="card" onClick={this.goToProduct.bind(this, product)}>
										<img className="card-img-top" src="img/product-2.jpg" alt="product" />
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
					<section id="tyres-top-brands" className="container-fluid">
						<Title
							header={translate("offers.recommendation.topBrands")}
							subHeader={translate("offers.subTitle")}
						/>
						<Manufacturers products={products} />
					</section>
					<section id="tyres-ads" className="container-fluid">
						<Ads />
					</section>
					<section id="tyres-sizes" className="container-fluid">
							<Title
								header={translate("tyresPage.popularSizes")}
								subHeader={translate("offers.subTitle")}
							/>
							<Slider {...sliderSetting}>
								{
									this.props.products.map((product, idx) => (
										<a href="" key={idx} className="card" onClick={this.goToProduct.bind(this, product)}>
											<img className="card-img-top" src="img/product-2.jpg" alt="product" />
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

Tyres = reduxForm({
	form: "Tyres"
})(Tyres);

Tyres.defaultProps = {
	width: [
		{ value: 115, label: '115' },
		{ value: 125, label: '125' },
		{ value: 135, label: '135' }
	],
	height: [
		{ value: 70, label: '70' },
		{ value: 77, label: '77' },
		{ value: 80, label: '80' }
	],
	diameter: [
		{ value: 10, label: '10' },
		{ value: 11, label: '11' },
		{ value: 12, label: '12' }
	]
}

export default connect(mapStateToProps, mapDispatchToProps)(Tyres);