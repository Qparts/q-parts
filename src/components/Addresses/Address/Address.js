import React, { Component } from 'react'
import Radio from '../../UI/Radio';
import { getCity, getRegion } from '../../../utils/components';
import { getTranslatedObject } from '../../../utils';
import { getCountry } from '../../../utils/api';

export default class Address extends Component {
    constructor(props) {
        super(props)

        this.state = {
            addressInfo: getRegion(props.regions, props.address.cityId),
            country: null,
            city: null
        }
    }

    componentDidMount = async () => {
        await this.getCountry().then(res => this.setState({ country: res }));
        await this.getCity();
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.currentLanguage !== this.props.currentLanguage) {
            await this.getCountry().then(res => this.setState({ country: res }));
            await this.getCity();
        }
    }


    getCountry = async () => {
        let country = await getCountry(this.state.addressInfo.countryId);

        return getTranslatedObject(country.data, this.props.currentLanguage, 'name', 'nameAr');
    }

    getCity = () => {
        let city = getCity(this.state.addressInfo.cities, this.props.address.cityId);

        this.setState({
            city: getTranslatedObject(city, this.props.currentLanguage, 'name', 'nameAr')
        });
    }

    render() {
        const { address, translate, addressIndex, onClickDefaultAddress } = this.props
        const { country, city } = this.state
        return (
            <li className="col-md-6 radio-custom" >
                <Radio
                    onChange={onClickDefaultAddress.bind(this, addressIndex)}
                    checked={address.defaultAddress}
                    label={translate("setting.garage.defaultVehicle")}
                    type="radio"
                    id={address.id}
                    name="radioGroup"
                />
                <h6>{address.title}</h6>
                <address>
                    <p>{address.line1} {address.line2}</p>
                    <p>{country}, {city}</p>
                    <p>{address.mobile}</p>
                </address>
                {/*<div className="actions">
                    <Button type="button"  className="btn btn-gray" text={translate("general.buttons.edit")} icon="icon-edit" isReverseOrder/>
                </div>*/}
            </li>
        )
    }
}
