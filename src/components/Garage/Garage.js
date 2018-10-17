import React, { Component } from 'react';
import Button from '../UI/Button';

import './Garage.css'

class Garage extends Component {

 render() {
  const { translate } = this.props;
  return (
   <div className="Garage-container">
    <div className="Garage-button">
     <Button className="btn btn-secondary" onClick={this.props.onShowVehicleDialog.bind(this, null)} text={translate("setting.garage.add")} />
    </div>
    <h4>{translate("setting.garage.title")}</h4>
    {
     this.props.vehiclesFormat.map((vehicle, idx) => {
      return <div key={idx} className="Garage-box border rounded">
       <div className="Garage-box_item">
        {vehicle.label}
       </div>
       <div className="Garage-box_item">
        {vehicle.vin}
       </div>
       <div className="Garage-footer">
        <Button type="button" className="btn btn-link" text={translate("setting.garage.delete")} onClick={this.props.onDeleteVehicle.bind(this, vehicle)} />
       </div>
      </div>
     })
    }
   </div>
  )
 }
}

export default Garage;