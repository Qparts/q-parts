import React, { Component,Fragment } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Button from '../UI/Button';
import SelectInput from '../SelectInput/SelectInput';
import { Map, GoogleApiWrapper } from 'google-maps-react'
import AutoComplete from '../../containers/Autocomplete/Autocomplete';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';
import RenderField from '../RenderField/RenderField';
import * as validations from '../../utils';
import Checkbox from '../UI/Checkbox';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { SmallScreen, MediumScreen } from '../Device/index.js';

class CheckoutShipping extends Component {
  constructor(props){
    super(props);
    this.state = {
      check: false,
      hasNewAddress: false
    }
  }
  componentWillMount() {
    this.props.getCountry(this.props.customer.countryId);
    this.props.getRegions(this.props.customer.countryId);
    this.props.completeShipping(false);
  }

  onAddressSelected = (e) => {
    e.preventDefault();

    this.props.onShowGoogleMap();
    this.props.findCity(this.props.address.city, this.props.customer.countryId);

    if (this.props.address.city === undefined) {
      this.props.onCityFound(false);
    } else {
      this.props.onCityFound(true);
    }
  }
 handleDelivery = values => {
  values.preventDefault();
  this.props.completeShipping(true);
  this.props.history.push('/checkout/payment');

 }
 handleAddNewAddress = () => {
   this.setState({ hasNewAddress: true });
 }
 handleSubmit = () => {
   this.setState({ hasNewAddress: false });
 }
 cancle = () => {
   this.setState({ hasNewAddress: false });
 }
 render() {
   const { handleSubmit, regions, formValues, translate, onShowGoogleMap, address, onHide, defaultAddress, onDefaultAddress, isDelivery, addresses } = this.props;

   const regionsData = regions ?
     regions.map(region => {
       return {
         ...region,
         value: region.id,
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
     let addressItem;
     if(true){
       addressItem = <div id="addresses-container">
        <div className="addresses-box border rounded  row" style={{marginRight:"0px"}}>
          {
            this.props.addresses.map((address, idx) =>{
              return <div className="addresses-box_item col-6" key={idx}>
                 <Checkbox
                   onChange={e => this.setState({
                     check: !this.state.check
                   })}
                   checked={this.state.check}
                   label={translate("setting.addressBook.defaultAddress")}
                 />
               <div className="addresses-box_item-label">
                  <p>{address.title}</p>
                </div>
                <div className="about-the-person">
                  <p>{address.cityId} {address.line1} {address.line2}</p>
                  <p>{address.mobile}</p>
                </div>
                <div className="addresses-footer">
                 <Button type="button" className="btn btn-link" text={translate("setting.addressBook.edit")} icon="icon-edit" isReverseOrder/>
                 <Button type="button" className="btn btn-delete" text={translate("setting.addressBook.delete")} icon="icon-trash" isReverseOrder/>
                </div>
               </div>
            })}
        </div>
       </div>
     }else{
       addressItem = <div></div>
     }
   const renderCityRegion = !this.props.cityFound ?
     <Fragment>
       <MediumScreen>
         <div className="col-md-4 div-rounded-first">
           <Field
             disabled
             name="name"
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
             options={regionsData}
             validate={[validations.required]} />
         </div>
       </MediumScreen>
       <SmallScreen>
         <div style={{display:"flex", paddingLeft:"0px"}} className="col-12">
           <div className="col-md-6 div-rounded-first">
             <Field
               disabled
               name="name"
               placeholder={translate("form.address.country")}
               component={RenderField}
               validate={[validations.required]} />
           </div>
           <div className="col-md-6 div-rounded">
             <Field
               name="region"
               placeholder={translate("form.address.region")}
               component={SelectInput}
               options={regionsData}
               validate={[validations.required]} />
           </div>
         </div>
         <div className="col-md-12 div-rounded-last">
           <Field
             name="city"
             placeholder={translate("form.address.city")}
             component={SelectInput}
             options={citiesData}
             validate={[validations.required]} />
         </div>
       </SmallScreen>
     </Fragment> :
     <Fragment>
       <div>
         <label>{translate("form.address.city")}</label>
         <input
           className="form-control"
           value={address.city}
           type="text"
           readOnly />
       </div>
     </Fragment>

   let renderButtons =
     <Fragment>
       <div>
         <Checkbox
           onChange={e => this.setState({
             check: !this.state.check
           })}
           checked={this.state.check}
           label={translate("form.address.buttons.defaultAddress")}
         />
       </div>
       <div className="footer">
         <Button onClick={onHide} type="button" className="btn btn-light" text={translate("form.address.buttons.cancel")} />
         <Button type="button" className="btn btn-primary" text={translate("form.address.buttons.confirm")} />
       </div>
     </Fragment>

   if (isDelivery) {
     renderButtons = <Button type="submit" className="btn btn-secondary" text={translate("form.address.buttons.deliver")} icon="icon-arrow-right" onClick={this.handleDelivery}/>
   }

   return (
     <Fragment>
       <MediumScreen>
         {
           this.props.showGoogleMap ? (
             <div className="Address-map">
               <Map className="map" google={this.props.google} visible={false}>
                 {
                   this.props.country && <AutoComplete onAddressSelected={this.onAddressSelected} {...this.props} />
                 }
               </Map>
             </div>
           ) :
             <div className="Address-container">
                 <div className="addresses-header justify-content-between ">
                   <p>{translate("setting.addressBook.shippingItem")}</p>
                   <Button type="button" className="btn btn-primary" icon="icon-add" text={translate("setting.addressBook.add")} onClick={this.handleAddNewAddress} isReverseOrder/>
                 </div>
               <form onSubmit={this.handleDelivery}>
                 {(
                   this.state.hasNewAddress && <div className="row no-gutters">
                     <div className="col-12 title-address">
                       <Field
                         label={translate("setting.addressBook.title")}
                         name="title"
                         component={RenderField}
                         type="text"
                         placeholder={translate("setting.addressBook.title")}
                         hasFloatLabel
                         validate={[validations.required]} />
                     </div>
                       <div className="col-12 google-map">
                         <Link to="#" onClick={onShowGoogleMap}>
                           <img className="main-img" alt="user" src="/img/google-map.svg"/>
                           <p>{translate("form.address.selectAddress")}</p>
                         </Link>
                     </div>
                     <div className="col-md-12 address-title">
                       <Field
                         label={`*${translate("setting.addressBook.addressLine1")}`}
                         name="line1"
                         component={RenderField}
                         type="text"
                         placeholder={translate("setting.addressBook.addressLine1")}
                         hasFloatLabel
                         validate={[validations.required]} />
                     </div>
                     <div className="col-12 address-title">
                       <Field
                         label={translate("setting.addressBook.addressLine2")}
                         name="line2"
                         component={RenderField}
                         type="text"
                         placeholder={translate("setting.addressBook.addressLine2")}
                         hasFloatLabel />
                     </div>
                     {renderCityRegion}
                     <div className="phone-info col-12">
                       <div className="row">
                         <div className="phone-number col-6">
                           <div className="first">
                             <Field
                               name="phone"
                               component={RenderField}
                               placeholder="+966"
                               validate={[validations.required]} />
                           </div>
                           <Field
                             name="mobile"
                             component={RenderField}
                             placeholder={translate("form.address.phoneNumber")}
                             validate={[validations.required]} />
                         </div>
                         <div className="zipCode col-6">
                           <Field
                             name="zipCode"
                             component={RenderField}
                             placeholder={translate("form.address.zipCode")}
                             validate={[validations.required]} />
                         </div>
                       </div>
                     </div>
                     <div className="col-12 shipping-style">
                       <Field
                         name="shipping"
                         component={RenderField}
                         type="text"
                         placeholder={translate("form.address.shippingNote")} />
                     </div>
                     <div className="footer col-12">
                       <Button type="button" className="btn btn-primary col-3" text={translate("setting.addressBook.add")} icon="icon-arrow-right" onClick={this.props.onSubmit}/>
                       <Button onClick={onHide} type="reset" className="btn btn-light col-4" onClick={this.cancle} text={translate("form.address.buttons.cancel")} />
                     </div>
                   </div>
                 )}
                 {addressItem}
                 {renderButtons}
               </form>
             </div>
         }
       </MediumScreen>
       <SmallScreen>
         {
           this.props.showGoogleMap ? (
             <div className="Address-map">
               <Map className="map" google={this.props.google} visible={false}>
                 {
                   this.props.country && <AutoComplete onAddressSelected={this.onAddressSelected} {...this.props} />
                 }
               </Map>
             </div>
           ) :
             <div className="Address-container">
               <div className="addresses-header">
                 <p>{translate("setting.addressBook.shippingItem")}</p>
               </div>
               <form onSubmit={this.handleDelivery}>
                 <div className="row no-gutters">
                   <div className="col-12 title-address">
                     <Field
                       label={translate("setting.addressBook.title")}
                       name="title"
                       component={RenderField}
                       type="text"
                       placeholder={translate("setting.addressBook.title")}
                       hasFloatLabel
                       validate={[validations.required]} />
                   </div>
                     <div className="col-12 google-map">
                       <Link to="#" onClick={onShowGoogleMap}>
                         <img className="main-img" alt="user" src="/img/google-map.svg"/>
                         <p>{translate("form.address.selectAddress")}</p>
                       </Link>
                   </div>
                   <div className="col-md-12 address-title">
                     <Field
                       label={`*${translate("setting.addressBook.addressLine1")}`}
                       name="line1"
                       component={RenderField}
                       type="text"
                       placeholder={translate("setting.addressBook.addressLine1")}
                       hasFloatLabel
                       validate={[validations.required]} />
                   </div>
                   <div className="col-12 address-title">
                     <Field
                       label={translate("setting.addressBook.addressLine2")}
                       name="line2"
                       component={RenderField}
                       type="text"
                       placeholder={translate("setting.addressBook.addressLine2")}
                       hasFloatLabel />
                   </div>
                   {renderCityRegion}
                   <div className="phone-info col-12">
                     <div className="row">
                       <div className="phone-number col-12">
                         <div className="first">
                           <Field
                             name="phone"
                             component={RenderField}
                             placeholder="+966"
                             validate={[validations.required]} />
                         </div>
                         <Field
                           name="mobile"
                           component={RenderField}
                           placeholder={translate("form.address.phoneNumber")}
                           validate={[validations.required]} />
                       </div>
                       <div className="zipCode col-12">
                         <Field
                           name="zipCode"
                           component={RenderField}
                           placeholder={translate("form.address.zipCode")}
                           validate={[validations.required]} />
                       </div>
                     </div>
                   </div>
                   <div className="col-12 shipping-style">
                     <Field
                       name="shipping"
                       component={RenderField}
                       type="text"
                       placeholder={translate("form.address.shippingNote")} />
                   </div>
                 </div>
                 {renderButtons}
               </form>
             </div>
         }
       </SmallScreen>
     </Fragment>
   )
 }
}

CheckoutShipping = reduxForm({
 form: 'CheckoutShipping',
})(CheckoutShipping)

CheckoutShipping = connect(
  state => {
    return {
      initialValues: state.api.country,
      formValues: getFormValues('Address')(CheckoutShipping),
    }
  }
)(CheckoutShipping)

export default withRouter(CheckoutShipping);
