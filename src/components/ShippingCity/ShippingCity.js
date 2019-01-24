import React, { Component } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import SelectInput from '../SelectInput/SelectInput';
import Button from '../UI/Button';

import * as validations from '../../utils';
import _ from 'lodash';

import './ShippingCity.css';
import Radio from '../UI/Radio';

class ShippingCity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            termsOfConditions: null
        }
    }

    handleChange = e => {
        this.setState({ termsOfConditions: e.value })
    }


    render() {
        const { handleSubmit, sub, label, error, regions, formValues, onHide, translate } = this.props;
        const regionsData = regions ?
            regions.map(region => {
                return {
                    ...region,
                    value: region.regionId,
                    label: region.nameAr
                }
            }) : [];

        const citiesData = _.has(formValues, 'region.cities') ?
            formValues.region.cities.map(city => {
                return {
                    ...city,
                    value: city.id,
                    label: city.nameAr
                }
            }) : [];

        return (
            <form onSubmit={handleSubmit}>
                <div className="ShippingCity-item">
                    <Field
                        sub={sub}
                        label={label}
                        name={'region'}
                        component={SelectInput}
                        options={regionsData}
                        placeholder={translate("shippingCity.placeholder.region")}
                        validate={[validations.required]} />

                    <Field
                        name={'city'}
                        component={SelectInput}
                        options={citiesData}
                        placeholder={translate("shippingCity.placeholder.city")}
                        validate={[validations.required]} />

                    <div>
                        <Radio
                            value='termsOfConditions'
                            label={translate("shippingCity.termsCondition")}
                            name="termsOfConditions"
                            onChange={this.handleChange}
                            checked={'termsOfConditions' === this.state.termsOfConditions} />
                    </div>
                </div>
                <div className="ShippingCity-footer">
                    <Button type="reset" className="btn btn-light" text={translate("general.buttons.cancel")} onClick={onHide} />
                    <Button disabled={!this.state.termsOfConditions} type="submit" className="btn btn-secondary" text={translate("general.buttons.send")} />
                </div>
                <div>
                    {error && <strong>{error}</strong>}
                </div>
            </form>
        )
    }
}

ShippingCity = reduxForm({
    form: 'ShippingCity',
})(ShippingCity)

ShippingCity = connect(
    state => {
        return {
            formValues: getFormValues('ShippingCity')(state),
        }
    }
)(ShippingCity)

export default ShippingCity;