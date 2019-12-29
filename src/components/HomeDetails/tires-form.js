import React, { Component, Fragment } from "react"; // eslint-disable-line no-unused-vars
import { Field, reduxForm } from 'redux-form';
import SelectInput from '../../components/SelectInput/SelectInput';
import { getTranslate } from 'react-localize-redux';
import { connect } from 'react-redux';
import { getTranslatedObject } from '../../utils';
import _ from 'lodash';
import { withRouter } from "react-router-dom";
import * as validations from '../../utils';
import { MediumScreen, DownMediumScreen } from '../../components/Device';




export class TiresForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vehicle: [],
			selectedTireWidth: {
				id: null
			},
			selectedTireHeigth: {
				id: null
			},
			selectedTireDiameter: {
				id: null
			}
		}
	}

	
	submit = values => {
		
		
	}
	
	render() {
		const { translate } = this.props
		const { currentLanguage } = this.props;
         

		const tires = [
			{ id: 1, label: 15 , heigths :[{widthId:1 , id:10 , label:35 , diameters :[{widthId:1 , id:12 , label:14 }]} ,{widthId:1 , id:11 , label:25 , diameters :[{widthId:1 , id:13 , label:16 }]},{widthId:1 , id:12 , label:33 , diameters :[{widthId:1 , id:14 , label:25 }]}  ]},
			{ id: 2, label: 115 , heigths :[{widthId:2 , id:13 , label:10 , diameters :[{widthId:2 , id:15 , label:20 }]} ,{widthId:2 , id:16 , label:56 , diameters :[{widthId:2 , id:17 , label:44 }]}]},
			{ id: 3, label: 125 , heigths :[{widthId:3 , id:40 , label:55 , diameters :[{widthId:3 , id:54 , label:239 }]} , {widthId:3 , id:23 , label:123 , diameters :[{widthId:3 , id:23 , label:46 }]}]},
		];

		
        const tireWidth = tires.map(tire => {
			console.log(tire.heigths.find(heigth => heigth.widthId === this.state.selectedTireWidth.id));
			return{
				...tire,
				label: getTranslatedObject(
					tire,
					currentLanguage,
					'label',
					),
					value: tire.id
				}
			})
			console.log(tires);
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


		let tireHeigths = null ;
		const selectedWidth = tires.find(tire => tire.heigths.some(heigth => heigth.widthId === this.state.selectedTireWidth.id))
        if(selectedWidth){
			tireHeigths = selectedWidth.heigths.map(heigth => {
				return {
					label: getTranslatedObject(
						heigth,
						currentLanguage,
						'label',
					),
					value: heigth.id,
					diameters: heigth.diameters 
				}
			})
		}else {
			tireHeigths = [{value : "no options" , label : "no options" , diameters : [{}]}]
		}


		const groupedHeightTiresOptions = [
			{
				options: tireHeigths,
			},
		];
		
		const formatHeightTiresGroupLabel = () => (
			<div className="placeholder">
				<span>{translate("general.select")} {translate("tires.placeholders.height")}</span>
			</div>
		);


		let tireDiameter = null ;
		if(tireHeigths && this.state.selectedTireHeigth && this.state.selectedTireHeigth.diameters){
			
			 tireDiameter = tireHeigths.find(heigth=> heigth.id === this.state.selectedTireHeigth.id).diameters.map(diameter => {
				return{
					label: getTranslatedObject(
						diameter,
						currentLanguage,
						'label',
					),
					value: diameter.id,
				}
			})
		}else{
			tireDiameter = [{value : "no options" , label : "no options"}]
		}


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
					{/* <picture className="hero-img">
						<source media="(max-width: 480px)" srcSet="/img/tyres-xxs.jpg" />
						<source media="(max-width: 767px)" srcSet="/img/tyres-xs.jpg" />
						<img src="/img/tire-bg.jpg" alt="OUR SALES MORE THAN 50,000 ITEM" />
					</picture> */}
					<div className="hero-content tire-set">
						<div className="container-fluid ">
							<div className="row">
								<div className=" offset-sm-1 offset-10 col offset-md-0 col-md-12">
									<MediumScreen>
										<form className="form-row tires-set-form" onSubmit={this.props.handleSubmit(this.submit)}>
											<div className="col-md col-12">
												<Field
													onChange={e =>
														this.setState(() => ({

															selectedTireWidth: e
														}))
													}
													name="width"
													placeholder={translate("tires.placeholders.width")}
													component={SelectInput}
													options={groupedWidthTiresOptions}
													formatGroupLabel={formatWidthTiresGroupLabel}
													// validate={[validations.required]}

												/>
											</div>
											<div className="col-md col-12">
												<Field
													onChange={e =>
														this.setState(() => ({

															selectedTireHeigth: e
														}))
													}
													name="height"
													placeholder={translate("tires.placeholders.height")}
													classNamePrefix="select"
													component={SelectInput}
													options={groupedHeightTiresOptions}
													formatGroupLabel={formatHeightTiresGroupLabel}
													// validate={[validations.required]}

												/>
											</div>
											<div className="col-md col-12">
												<Field
													onChange={e =>
														this.setState(() => ({

															selectedTireDiameter: e
														}))
													}
													name="diameter"
													placeholder={translate("tires.placeholders.diameter")}
													component={SelectInput}
													options={groupedDiameterTiresOptions}
													formatGroupLabel={formatDiameterTiresGroupLabel}
													// validate={[validations.required]}
												/>
											</div>
											<div className="col-md-auto col-12">
												<button type="submit" className="btn btn-primary">{translate("general.buttons.search")} <i className="icon-arrow-right"></i></button>
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
									<button type="submit" className="btn btn-primary">{translate("general.buttons.search")} <i className="icon-arrow-right"></i></button>
								</form>

							</div>
						</div>
					</section>
				</DownMediumScreen>
			</section>
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

TiresForm = reduxForm({
	form: 'ManualForm'
})(TiresForm);

const withManualForm = withRouter(TiresForm);

export default connect(
	mapStateToProps,
	// mapDispatchToProps
)(withManualForm);
