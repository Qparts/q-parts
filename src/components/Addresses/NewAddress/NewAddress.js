import React, { Component, Fragment } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import _ from 'lodash';
import Button from '../../UI/Button';
import { connect } from 'react-redux';
import SelectInput from '../../SelectInput/SelectInput';
import RenderCheckboxField from '../../UI/RenderCheckboxField';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import AutoComplete from '../../../containers/Autocomplete/Autocomplete';
import RenderField from '../../RenderField/RenderField';
import * as validations from '../../../utils';
import { getTranslatedObject } from '../../../utils';
import { right } from '../../../utils';

class Address extends Component {
	constructor(props) {
		super(props);
		this.state = {
			check: false
		};
	}
	componentWillMount() {
		this.props.getCountry(this.props.customer.countryId);
		this.props.getRegions(this.props.customer.countryId);
	}

	onAddressSelected = e => {
		e.preventDefault();

		this.props.onShowGoogleMap();
		this.props.findCity(
			this.props.address.city,
			this.props.customer.countryId
		);

		if (this.props.address.city === undefined) {
			this.props.onCityFound(false);
		} else {
			this.props.onCityFound(true);
		}
	};

	render() {
		const {
			handleSubmit,
			translate,
			onShowGoogleMap,
			address,
			isDelivery,
			direction,
			defaultLang
		} = this.props;
		const country = [{ value: 1, label: translate('general.ksa') }];
		const regions = this.props.regions
			? this.props.regions.map(region => {
					return {
						...region,
						value: region.id,
						label: getTranslatedObject(
							region,
							defaultLang,
							'name',
							'nameAr'
						)
					};
			  })
			: [];
		const groupedRegion = [
			{
				options: regions
			}
		];
		const formatRegionLabel = () => (
			<div className='placeholder'>
				<span>{translate('quotationOrder.shipping.region')}</span>
			</div>
		);
		const cities = _.has(this.props.formValues, 'region.cities')
			? this.props.formValues.region.cities.map(city => {
					return {
						...city,
						label: getTranslatedObject(
							city,
							defaultLang,
							'name',
							'nameAr'
						),
						value: city.id
					};
			  })
			: [];
		const groupedCity = [
			{
				options: cities
			}
		];
		const formatCityLabel = () => (
			<div className='placeholder'>
				<span>{translate('quotationOrder.shipping.city')}</span>
			</div>
		);
		const renderCityRegion = !this.props.cityFound ? (
			<Fragment>
				<div className='float-label disabled'>
					<Field
						isDisabled={true}
						label={translate('general.country')}
						name='country'
						defaultValue={country[0]}
						component={SelectInput}
					/>
				</div>
				<div className='form-row'>
					<div className='col-md float-label'>
						<Field
							label={translate('general.region')}
							name='region'
							placeholder=' '
							component={SelectInput}
							options={groupedRegion}
							formatGroupLabel={formatRegionLabel}
							validate={[validations.required]}
						/>
					</div>
					<div className='col-md float-label'>
						<Field
							label={translate('general.city')}
							name='city'
							placeholder=' '
							component={SelectInput}
							options={groupedCity}
							formatGroupLabel={formatCityLabel}
							validate={[validations.required]}
						/>
					</div>
				</div>
				{/*<div className="col-md-4 div-rounded-first">
          <Field
            disabled
            name={`${getTranslatedString(currentLanguage, 'name', 'nameAr')}`}
            placeholder={translate("form.address.country")}
            component={RenderField}
            validate={[validations.required]} />
        </div>
        <div className="col-md-4 div-rounded">
          <Field
            name="region"
            placeholder={translate("form.address.region")}
            component={SelectInput}
            options={regionsData}
            validate={[validations.required]} />
        </div>
        <div className="col-md-4 div-rounded-last">
          <Field
            name="city"
            placeholder={translate("form.address.city")}
            component={SelectInput}
            options={citiesData}
            validate={[validations.required]} />
        </div>*/}
			</Fragment>
		) : (
			<Fragment>
				<div>
					<label>{translate('form.address.city')}</label>
					<input
						className='form-control'
						value={address.city}
						type='text'
						readOnly
					/>
				</div>
			</Fragment>
		);

		let renderButtons = (
			<Fragment>
				<Field
					className='checkbox'
					type='checkbox'
					name='defaultAddress'
					id='defaultAddress'
					component={RenderCheckboxField}
					label={translate('form.address.buttons.defaultAddress')}
				/>
				<div className='row form-submit'>
					<div className='col-auto'>
						<Button
							className='btn btn-gray'
							type='reset'
							text={translate('general.buttons.cancel')}
							onClick={this.onCancle}
						/>
					</div>
					<div className='col'>
						<Button
							className='btn btn-primary'
							text={translate('form.address.buttons.confirm')}
							icon={`icon-arrow-${right(direction)}`}
						/>
					</div>
				</div>
				{/*<div className="Checkbox">
          <Field
            name="defaultAddress"
            id="defaultAddress"
            component={RenderCheckboxField}
            label={translate("form.address.buttons.defaultAddress")}
          />
        </div>
        <div className="row">
          <Button onClick={onHide} type="reset" className="btn btn-light col-3" text={translate("form.address.buttons.cancel")} />
          <Button type="submit" className="btn btn-primary col-8" text={translate("form.address.buttons.confirm")} />
        </div>*/}
			</Fragment>
		);

		if (isDelivery) {
			renderButtons = (
				<Button
					type='submit'
					className='btn btn-secondary'
					text={translate('form.address.buttons.deliver')}
				/>
			);
		}

		return (
			<Fragment>
				{this.props.showGoogleMap ? (
					<div className='Address-map'>
						<Map
							className='map'
							google={this.props.google}
							visible={false}
						>
							{this.props.country && (
								<AutoComplete
									onAddressSelected={this.onAddressSelected}
									{...this.props}
								/>
							)}
						</Map>
					</div>
				) : (
					<form
						onSubmit={handleSubmit}
						className='one-col gray-input'
					>
						<div className='input-groub'>
							{/* <div className="form-row">
                    <div className="col">
                      <div className="has-float-label">
                        <Field
                          hasFloatLabel
                          name="title"
                          label={translate("setting.addressBook.title")}
                          component={RenderField}
                          placeholder={translate("setting.addressBook.title")}
                          validate={[validations.required]}
                          />
                      </div>
                    </div>
                  </div> */}
							<div className='has-float-label'>
								<Field
									hasFloatLabel
									name='line1'
									label={translate(
										'setting.addressBook.addressLine1'
									)}
									component={RenderField}
									placeholder={translate(
										'setting.addressBook.addressLine1'
									)}
									validate={[validations.required]}
								/>
							</div>
							<div className='has-float-label'>
								<Field
									hasFloatLabel
									name='line2'
									label={translate(
										'setting.addressBook.addressLine2'
									)}
									component={RenderField}
									placeholder={translate(
										'setting.addressBook.addressLine2'
									)}
								/>
							</div>
							{renderCityRegion}
							<div className='form-row'>
								<div className='col-auto'>
									<input
										className='form-control phone-code'
										value={'+966'}
										type='text'
										readOnly
									/>
								</div>
								<div className='col'>
									<div className='has-float-label'>
										<Field
											hasFloatLabel
											name='mobile'
											label={translate(
												'form.address.phoneNumber'
											)}
											component={RenderField}
											placeholder={translate(
												'form.address.phoneNumber'
											)}
											validate={[
												validations.required,
												validations.mobileCodeNumber
											]}
										/>
									</div>
								</div>
							</div>
							<div className='has-float-label'>
								<Field
									hasFloatLabel
									name='zipCode'
									label={translate('form.address.zipCode')}
									component={RenderField}
									placeholder={translate(
										'form.address.zipCode'
									)}
								/>
							</div>
							{/* <div className="has-float-label textarea">
                    <Field
                      className="form-control"
                      name="shippingNote"
                      component={'textarea'}
                      placeholder={translate("form.address.shippingNote")}
                      />
                    <label>{translate("form.address.shippingNote")}</label>
                  </div> */}
						</div>
						{renderButtons}
					</form>
				)}
			</Fragment>
		);
	}
}
// <Button type="button" className="btn btn-light" text={translate("form.address.map")} onClick={onShowGoogleMap} />

Address = reduxForm({
	form: 'Address',
	enableReinitialize: true
})(Address);

Address = connect(state => {
	return {
		initialValues: state.api.country,
		formValues: getFormValues('Address')(state)
	};
})(Address);

export default Address;

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyApz-uE9jj33-kpEAGVMHkWz93hJfIuHfU',
//   libraries: ['places', 'visualization'],
// })(Address);
