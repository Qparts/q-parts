import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { RadioButton } from 'primereact/components/radiobutton/RadioButton';
import { Button } from 'primereact/components/button/Button';

import { selectVehicleGarage } from '../../actions/customerAction';

import './GaragePopup.css';


class GaragePopup extends Component {

 handleChange = (vehcile, e) => {
  this.props.selectVehicleGarage(vehcile)

 }

 render() {
  const { vehiclesFormat, onAddVechile, selectedVehicle, translate } = this.props;
  return (
   <Fragment>
    <div className={this.props.className}>
     <h5>{translate("dropdown.garage.title")}</h5>
     <p>{translate("dropdown.garage.subTitle")}</p>
     {
      vehiclesFormat.map((vehicle, index) =>
       <div className="GaragePopup-container" key={index}>
        <div>
         <RadioButton value={selectedVehicle} name="vehcile" onChange={this.handleChange.bind(this, vehicle)} checked={vehicle.id === selectedVehicle.id} />
         <label htmlFor="rb1">{vehicle.label}</label>
        </div>
        <Button label="Browse Catalog"/>
        <Button label="X"/>
       </div>
      )
     }
     <div className="GaragePopup-footer">
      <Button label={translate("general.vehicleButton.add")} onClick={onAddVechile}/>
      <Button label={translate("general.vehicleButton.remove")}/>
     </div>
    </div>
   </Fragment>
  )
 }
}

const mapStateToProps = state => {
 return {
  vehiclesFormat: state.customer.vehiclesFormat,
  selectedVehicle: state.customer.selectedVehicle,
 }
}

const mapDispatchToProps = dispatch => {
 return {
  selectVehicleGarage: (vehicle) => dispatch(selectVehicleGarage(vehicle))
 }
}

export default connect(mapStateToProps, mapDispatchToProps)(GaragePopup);