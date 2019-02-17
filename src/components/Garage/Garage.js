import React, { Fragment, Component } from 'react';
import Button from '../UI/Button';
import Checkbox from '../UI/Checkbox';
import './Garage.css'
import { SmallScreen, MediumScreen } from '../../components/Device/index.js';

class Garage extends Component {
  handleChange = (index, e) => {
    this.props.changeDefaultVehicle(index);
  }

 render() {
  const { translate, vehicles } = this.props;
  let garage;
  if(vehicles.length>0){
    garage = <div id="Garage-container">
     <div className="Garage-add justify-content-between">
       <p>Add View, manage and find parts for the vehicles in your garage</p>
      <Button className="btn btn-secondary" onClick={this.props.onShowVehicleDialog.bind(this, 'garage')} text={translate("setting.garage.add")} icon="icon-add-vehicle" isReverseOrder/>
     </div>
     <span className="seperator"></span>
     {
      this.props.vehicles.map((vehicle, idx) => {
       return <div key={idx} className="Garage-box border rounded row">
        <div className="Garage-box_item col-12">
          <Checkbox
             onChange={this.handleChange.bind(this, idx)}
             checked={vehicle.defaultVehicle}
            label="Default Vehicles"
          />
        <div className="Garage-box_item-label">
          <p>{vehicle.label}</p>
          <p>{vehicle.vin}</p>
         </div>
         <div className="Garage-footer">
          <Button disabled type="button" className="isDisabled btn btn-gray" text="Edit" icon="icon-edit" isReverseOrder/>
          <Button disabled type="button" className="isDisabled btn btn-delete" text={translate("setting.garage.delete")} icon="icon-trash" onClick={this.props.onDeleteVehicle.bind(this, vehicle)} isReverseOrder/>
         </div>
        </div>
       </div>
      })
     }
    </div>
  }else{
    garage = <div id="garage-no-vehicle">
      <p>Store vehicles in your garage and Get product recommendations</p>
      <span className="seperator"></span>
      <div className="add-vehicle">
        <div className="icon-content">
          <p className="icon-vehicle"/>
          <span className="vehi-rotate"><span>Vehicle</span></span>
        </div>
        <p className="vehicle-text">No Saved Vehicles</p>
        <Button className="btn btn-secondary" onClick={this.props.onShowVehicleDialog.bind(this, 'garage')} text={translate("setting.garage.add")} icon="icon-add-vehicle" isReverseOrder />
      </div>
      </div>
  }
  return (
    <Fragment>
      <MediumScreen>
       <div className="col-10">
         {garage}
       </div>
      </MediumScreen>
      <SmallScreen>
       <div className="col-12 garage-mobile">
         {garage}
       </div>
      </SmallScreen>
    </Fragment>
  )
 }
}

export default Garage;
