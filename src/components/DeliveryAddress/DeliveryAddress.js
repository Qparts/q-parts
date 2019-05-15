import React, { Component } from 'react';
import Button from '../UI/Button';

import './DeliveryAddress.css';
import { getCity, getRegion } from '../../utils/components';
import { getTranslatedObject } from '../../utils';
import { getCountry } from '../../utils/api';

class DeliveryAddress extends Component {
  constructor(props) {
      super(props)
      this.state = {
          addressInfo: getRegion(props.regions, props.deliveryAddress.cityId),
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
      let city = getCity(this.state.addressInfo.cities, this.props.deliveryAddress.cityId);

      this.setState({
          city: getTranslatedObject(city, this.props.currentLanguage, 'name', 'nameAr')
      });
  }
 render() {
   const { translate, deliveryAddress } = this.props
   const { country, city } = this.state
  return (
   <div>
    <div className="DeliveryAddress_subheader">
     <h4>{this.props.title}</h4>
       <div className="addresses-box_item">
        <div className="addresses-box_item-label">
           <p>{deliveryAddress.title}</p>
         </div>
         <div className="about-the-person">
           <p>{deliveryAddress.line1}, {deliveryAddress.line2}</p>
           {country && city && <p>{country}, {city}</p>}
           <p>{deliveryAddress.mobile}</p>
         </div>
         <div className="addresses-footer">
          <Button disabled type="button" className="isDisabled btn btn-gray" text={translate("setting.addressBook.edit")} icon="icon-edit" isReverseOrder/>
         </div>
         {/* <span className="seperator"></span>
         <p className="footer-delivery">{translate("checkout.payment.cash.estimatedDelivery")}: 6 Aug 2018</p> */}
        </div>
    </div>
   </div>
  )
 }
}

export default DeliveryAddress;
