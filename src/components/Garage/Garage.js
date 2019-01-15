import React, { Component } from 'react';
import Button from '../UI/Button';
import Checkbox from '../UI/Checkbox';
import './Garage.css'

class Garage extends Component {
 constructor(props){
   super(props);
   this.state={
     check: false
   }
 }
 render() {
  const { translate } = this.props;
  let garage;
  if(this.props.vehiclesFormat.length>0){
    garage = <div id="Garage-container">
     <div className="Garage-add justify-content-between">
       <p>Add View, manage and find parts for the vehicles in your garage</p>
      <Button className="btn btn-secondary" onClick={this.props.onShowVehicleDialog.bind(this, 'garage')} text={translate("setting.garage.add")} icon="icon-add-vehicle" isReverseOrder/>
     </div>
     <span className="seperator"></span>
     {
      this.props.vehiclesFormat.map((vehicle, idx) => {
       return <div key={idx} className="Garage-box border rounded row">
        <div className="Garage-box_item col-6">
          <Checkbox
            onChange={e => this.setState({
              check: !this.state.check
            })}
            checked={this.state.check}
            label="Default Vehicles"
          />
        <div className="Garage-box_item-label">
          <p>{vehicle.label}</p>
          <p>{vehicle.vin}</p>
         </div>
         <div className="Garage-footer">
          <Button type="button" className="btn btn-link" text="Edit" icon="icon-edit" isReverseOrder/>
         </div>
        </div>
        <div className="col-1">
          <span className="seperator"></span>
        </div>
        <div className="Garage-box_item col-5">
          <Checkbox
            onChange={e => this.setState({
              check: !this.state.check
            })}
            checked={this.state.check}
            label="Default Vehicles"
          />
        <div className="Garage-box_item-label">
          <p>{vehicle.label}</p>
         </div>
         <div className="Garage-footer">
          <Button type="button" className="btn btn-link" text="Edit" icon="icon-edit" isReverseOrder/>
          <Button type="button" className="btn btn-delete" text={translate("setting.garage.delete")} icon="icon-trash" onClick={this.props.onDeleteVehicle.bind(this, vehicle)} isReverseOrder/>
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
   <div className="col-10">
     {garage}
   </div>
  )
 }
}

export default Garage;
