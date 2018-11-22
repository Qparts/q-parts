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
					<div className="container-fluid">
						<div className="row">
							<header className="col">
								<h1>{translate("form.order.title")}</h1>
								<p>{translate("form.order.subTitle")}</p>
							</header>
						</div>
						<form className="row no-gutters" onSubmit={handleSubmit(this.handleSubmit)}>
							<div className="col-lg-3 col-md-12 col-sm-12">
								<Field
									name="width"
									placeholder="width"
									component={SelectInput}
									options={width}
									validate={[validations.required]}
								/>
							</div>
							<div className="col-lg-1 w3-hide-small w3-hide-medium">
								<div className="seperator" />
							</div>
							<div className="col-sm-12 w3-hide-large">
								<div className="h-seperator" />
							</div>
							<div className="col-lg-3 col-md-12 col-sm-12">
								<Field
									name="height"
									placeholder="height"
									component={SelectInput}
									options={height}
									validate={[validations.required]}
								/>
							</div>
							<div className="col-lg-1 w3-hide-small w3-hide-medium">
								<div className="seperator" />
							</div>
							<div className="col-sm-12 w3-hide-large">
								<div className="h-seperator" />
							</div>
							<div className="col-lg-3 col-md-12 col-sm-12">
								<Field
									name="diameter"
									placeholder="diameter"
									component={SelectInput}
									options={diameter}
									validate={[validations.required]}
								/>
							</div>
							<div className="col-lg-3 col-md-12 col-sm-12">
								<Button
									type="submit"
									className="btn-primary"
									text={
										<Fragment>
											<span>{translate("general.searchButton")}</span>
											<i className="icon-arrow-right"></i>
										</Fragment>
									}
								/>
							</div>
						</form>
					</div>
				</section>
				<div className="component-background">
					<section id="tyres-best-sellers" className="container-fluid">
						<Title
							header={translate("offers.title")}
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
							header={translate("offers.title")}
							subHeader={translate("offers.subTitle")}
						/>
						<Manufacturers products={products} />
					</section>
					<section id="ads" className="container-fluid">
						<Ads />
					</section>
					<section id="tyres-sizes" className="container-fluid">
						<section id="tyres-best-sellers" className="container-fluid">
							<Title
								header={translate("offers.title")}
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