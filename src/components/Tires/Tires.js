import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-select';
import Swiper from 'react-id-swiper';
import Stars from 'react-stars';
import { starsRating, swiperParams } from '../../constants';
import { MediumScreen, DownMediumScreen } from '../../components/Device';
import { right } from '../../utils';
import SelectInput from '../SelectInput/SelectInput';


class Tires extends Component {
	submit = values => {
		console.log(values);
		
	}

	render() {
		const { direction, translate } = this.props
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

		return (
			<section className="tires">
				<section className="hero">
					<picture className="hero-img">
						<source media="(max-width: 480px)" srcSet="/img/tyres-xxs.jpg" />
						<source media="(max-width: 767px)" srcSet="/img/tyres-xs.jpg" />
						<img src="/img/tyers-lg.jpg" alt="OUR SALES MORE THAN 50,000 ITEM" />
					</picture>
					<div className="hero-content tire-set">
						<div className="container-fluid ">
							<div className="row">
								<div className="col-sm-10 offset-sm-1 offset-0 col offset-md-0 col-md-12">
									<header className="d-md-none d-lg-block">
										<h1>{translate("tires.title")}</h1>
									</header>
									<h5>{translate("tires.selectTiresSize.header")} <span>
										{translate("tires.selectTiresSize.subHeader1")} </span>
										{translate("tires.selectTiresSize.subHeader2")} <p>{translate("tires.selectTiresSize.p")}</p>
									</h5>
									<MediumScreen>
										<form className="form-row tires-set-form" onSubmit={this.props.handleSubmit(this.submit)}>
											<div className="col-md col-12">
												<Field
													name="width"
													placeholder={translate("tires.placeholders.width")}
													component={SelectInput}
													options={groupedWidthTiresOptions}
													formatGroupLabel={formatWidthTiresGroupLabel}
												/>
											</div>
											<div className="col-md col-12">
												<Field
													name="height"
													placeholder={translate("tires.placeholders.height")}
													classNamePrefix="select"
													component={SelectInput}
													options={groupedHeightTiresOptions}
													formatGroupLabel={formatHeightTiresGroupLabel}
												/>
											</div>
											<div className="col-md col-12">
												<Field
													name="diameter"
													placeholder={translate("tires.placeholders.diameter")}
													component={SelectInput}
													options={groupedDiameterTiresOptions}
													formatGroupLabel={formatDiameterTiresGroupLabel}
												/>
											</div>
											<div className="col-md-auto col-12">
												<button type="submit" className="btn btn-primary">{translate("general.buttons.search")} <i className={`icon-arrow-${right(direction)}`}></i></button>
											</div>
										</form>
									</MediumScreen>
								</div>
							</div>
						</div>
					</div>
				</section>
				<DownMediumScreen>
					<section className="tire-set-xs gray-bg">
						<div className="container-fluid">
							<div className="row">
								<form className="offset-0 col col-sm-10 offset-sm-1 offset-md-0 col-md-12 tires-set-form" onSubmit={this.props.handleSubmit(this.submit)}>
									<div className="input-container">
										<Field
											name="width"
											placeholder={translate("tires.placeholders.width")}
											component={SelectInput}
											options={groupedWidthTiresOptions}
											formatGroupLabel={formatWidthTiresGroupLabel}
										/>
										<Field
											name="height"
											placeholder={translate("tires.placeholders.height")}
											component={SelectInput}
											options={groupedHeightTiresOptions}
											formatGroupLabel={formatHeightTiresGroupLabel}
										/>
										<Field
											name="diameter"
											placeholder={translate("tires.placeholders.diameter")}
											component={SelectInput}
											options={groupedDiameterTiresOptions}
											formatGroupLabel={formatDiameterTiresGroupLabel}
										/>
									</div>
									<button type="submit" className="btn btn-primary">{translate("general.buttons.search")} <i className={`icon-arrow-${right(direction)}`}></i></button>
								</form>

							</div>
						</div>
					</section>
				</DownMediumScreen>
				<section className="gray-bg pt-sec">
					<div className="container-fluid">
						<div className="row">
							<div className="col products-list">
								<h3>{translate("tires.bestseller")}</h3>
								<Swiper {...swiperParams(direction)}>
									<div>
										<Link to="/" className="card">
											<img src="/img/thumb-tyre-1.jpg" className="card-img-top" alt="..." />
											<div className="card-body">
												<h5 className="card-title">SU318 H/T</h5>
												<ul className="list-inline product-info">
													<li><strong>Goodride</strong></li>
													<li>Size(215/60 R17)</li>
												</ul>
												<div className="rating">
													<Stars values={1} {...starsRating} />
													<span>0 review</span>
												</div>
												<p>Made in Coria</p>
												<p className="price">20 <span>sr</span></p>
											</div>
										</Link>
									</div>
									<div>
										<Link to="/" className="card">
											<img src="/img/thumb-tyre-2.jpg" className="card-img-top" alt="..." />
											<div className="card-body">
												<h5 className="card-title">Setula E-Pace RHO1</h5>
												<ul className="list-inline product-info">
													<li><strong>Setula</strong></li>
													<li>Size(215/60 R17)</li>
												</ul>
												<div className="rating">
													<Stars values={1} {...starsRating} />
													<span>0 review</span>
												</div>
												<p>Made in Coria</p>
												<p className="price">20 <span>sr</span></p>
											</div>
										</Link>
									</div>
								</Swiper>
								<div className="swiper-left"></div>
							</div>
						</div>
						<div className="row pt-sec">
							<div className="col products-brand">
								<h3>{translate("tires.popularBrands")}</h3>
								<div className="div-style">
									<ul className="row list-unstyled">
										<li className=" col-4 col-lg-2"><Link to="/"><img src="../img/michelin.png" alt="Michelin Tires" /></Link></li>
										<li className=" col-4 col-lg-2"><Link to="/"><img src="../img/bridgestone.png" alt="Bridgestone Tires" /></Link></li>
										<li className=" col-4 col-lg-2"><Link to="/"><img src="../img/goodyear.png" alt="Goodyear Tires" /></Link></li>
										<li className=" col-4 col-lg-2"><Link to="/"><img src="../img/pirelli.png" alt="Pirelli Tires" /></Link></li>
										<li className=" col-4 col-lg-2"><Link to="/"><img src="../img/yokohama.png" alt="Yokohama Tires" /></Link></li>
										<li className=" col-4 col-lg-2"><Link to="/"><img src="../img/hankook.png" alt="Hankook Tires" /></Link></li>
										<li className=" col-4 col-lg-2"><Link to="/"><img src="../img/dunlop.png" alt="Dunlop Tires" /></Link></li>
										<li className=" col-4 col-lg-2"><Link to="/"><img src="../img/toyo.png" alt="Toyo Tires" /></Link></li>
										<li className=" col-4 col-lg-2"><Link to="/"><img src="../img/nexen.png" alt="Nexen Tires" /></Link></li>
										<li className=" col-4 col-lg-2"><Link to="/"><img src="../img/maxxis.png" alt="Maxxis Tires" /></Link></li>
									</ul>
								</div>

							</div>
						</div>
						<div className="row pt-sec">
							<div className="col ">
								<div className="banner-728 banner">
									728X90 Banner
								</div>
							</div>
						</div>
						<div className="row pt-sec">
							<div className="col products-list">
								<h3>{translate("tires.popularSizes")}</h3>
								<Swiper {...swiperParams(direction)}>
									<div>
										<Link to="/" className="card">
											<img src="/img/thumb-tyre-1.jpg" className="card-img-top" alt="..." />
											<div className="card-body">
												<h5 className="card-title">SU318 H/T</h5>
												<ul className="list-inline product-info">
													<li><strong>Goodride</strong></li>
													<li>Size(215/60 R17)</li>
												</ul>
												<div className="rating">
													<Stars values={1} {...starsRating} />
													<span>0 review</span>
												</div>
												<p>Made in Coria</p>
												<p className="price">20 <span>sr</span></p>
											</div>
										</Link>
									</div>
									<div>
										<Link to="/" className="card">
											<img src="/img/thumb-tyre-2.jpg" className="card-img-top" alt="..." />
											<div className="card-body">
												<h5 className="card-title">Setula E-Pace RHO1</h5>
												<ul className="list-inline product-info">
													<li><strong>Setula</strong></li>
													<li>Size(215/60 R17)</li>
												</ul>
												<div className="rating">
													<Stars values={1} {...starsRating} />
													<span>0 review</span>
												</div>
												<p>Made in Coria</p>
												<p className="price">20 <span>sr</span></p>
											</div>
										</Link>
									</div>
								</Swiper>
								<div className="swiper-left"></div>
							</div>
						</div>
					</div>
				</section>
			</section>
		)
	}
}

Tires = reduxForm({
	form: 'Tires'
})(Tires)


export default Tires;
