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
  const btn_add =<p><i className="icon-add-vehicle"/><p>{translate("setting.garage.add")}</p></p>
  const btn_delete =<p><i className="icon-trash"/>{translate("setting.garage.delete")}</p>
  const btn_edit =<p><i className="icon-edit"/>Edit</p>
  const btn_add_vehivle =<p><i className="icon-add"/><p>{translate("setting.garage.add")}</p></p>
  let garage;
  if(this.props.vehiclesFormat.length>0){
    garage = <div id="Garage-container">
     <div className="Garage-add">
       <p>Add View, manage and find parts for the vehicles in your garage</p>
      <Button className="btn btn-secondary" onClick={this.props.onShowVehicleDialog.bind(this, 'garage')} text={btn_add} />
     </div>
     <span class="seperator"></span>
     {
      this.props.vehiclesFormat.map((vehicle, idx) => {
       return <div key={idx} className="Garage-box border rounded row">
        <div className="Garage-box_item col-6">
          <Checkbox
            onChange={e => this.setState({
              check: !this.state.check
            })}
            checked={this.state.check}
            label="Default Address"
          />
        <div className="Garage-box_item-label">
          <p>{vehicle.label}</p>
          <p>{vehicle.vin}</p>
         </div>
         <div className="Garage-footer">
          <Button type="button" className="btn btn-link" text={btn_edit}  />
         </div>
        </div>
        <div className="col-1">
          <span class="seperator"></span>
        </div>
        <div className="Garage-box_item col-5">
          <Checkbox
            onChange={e => this.setState({
              check: !this.state.check
            })}
            checked={this.state.check}
            label="Default Address"
          />
        <div className="Garage-box_item-label">
          <p>{vehicle.label}</p>
         </div>
         <div className="Garage-footer">
          <Button type="button" className="btn btn-link" text={btn_edit} />
          <Button type="button" className="btn btn-delete" text={btn_delete} onClick={this.props.onDeleteVehicle.bind(this, vehicle)} />
         </div>
        </div>
       </div>
      })
     }
    </div>
  }else{
    garage = <div id="garage-no-vehicle">
      <p>Store vehicles in your garage and Get product recommendations</p>
      <span class="seperator"></span>
      <div className="add-vehicle">
        <i className="icon-add-vehicle main-icon"/>
        <p className="vehicle-text">No Saved Vehicles</p>
        <Button className="btn btn-secondary" onClick={this.props.onShowVehicleDialog.bind(this, 'garage')} text={btn_add_vehivle} />
      </div>
      </div>
  }
  return (
   <div style={{width:'70%'}}>
     {garage}
   </div>
  )
 }
}

export default Garage;
