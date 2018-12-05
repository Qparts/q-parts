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
      <section id="garagePopup">
        <div className="dropdown-garage">
          <div className="row garage-header">
            <div className="col-3">
              <a href="#"><i className="icon-vehicle" /></a>
            </div>
            <div className="col-9">
              <h5>{translate("dropdown.garage.title")}</h5>
              <p>{translate("dropdown.garage.subTitle")}</p>
            </div>
          </div>
          <hr />
          {
            vehiclesFormat.map((vehicle, index) =>
              <div key={index}>
                <div className="garage-content">
                  <div className="d-flex justify-content-between">
                    <div className="div-left">
                      <RadioButton value={selectedVehicle} name="vehcile" onChange={this.handleChange.bind(this, vehicle)} checked={vehicle.id === selectedVehicle.id} />
                      <label htmlFor="rb1">{vehicle.label}</label>
                    </div>
                    <div className="div-right">
                      <Button className="btn-primary" label="Save" />
                      <a className="circle">
                        <i className="icon-close" />
                      </a>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            )
          }
          <div className="garage-footer">
            <div className="d-flex justify-content-between">
              <button onClick={onAddVechile} className="btn-primary">
                <i className="icon-add-vehicle" />
                <p>{translate("general.vehicleButton.add")}</p>
              </button>
              <div className="div-right">
                <a className="circle">
                  <i className="icon-close" />
                </a>
                <a className="clear-history">{translate("general.vehicleButton.remove")}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
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