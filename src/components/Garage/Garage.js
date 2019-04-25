import React, { Fragment, Component } from 'react';
import Button from '../UI/Button';
import './Garage.css';
import { SmallScreen, MediumScreen } from '../../components/Device';
import { getTranslatedObject } from '../../utils';
import Radio from '../UI/Radio';
class Garage extends Component {
  handleChange = (index, e) => {
    this.props.changeDefaultVehicle(index);
  }

  render() {
    const { translate, vehicles, defaultLang } = this.props;
    let garage;
    if (vehicles.length > 0) {
      garage = <div>
        <MediumScreen>
          <header>
            <div className="row">
              <div className="col">
                <h5>{translate("setting.garage.title")}</h5>
              </div>
              <div className="col-auto">
                <Button className="btn btn-primary" onClick={this.props.onShowVehicleDialog.bind(this, 'garage')} text={translate("setting.garage.add")} icon="icon-add-vehicle" isReverseOrder />
              </div>
            </div>
          </header>
        </MediumScreen>
        <SmallScreen>
          <header className="header-sm">
            <div className="row">
              <div className="col">
                <h5 className="header-sm">{translate("setting.garage.garage")}</h5>
              </div>
              <div className="col-auto">
                <Button className="btn btn-primary" onClick={this.props.onShowVehicleDialog.bind(this, 'garage')} icon="icon-add-vehicle" isReverseOrder />
              </div>
            </div>
          </header>
        </SmallScreen>
        <div className="info-list">
          <ul className="row list-unstyled">
            {
              this.props.vehicles.map((vehicle, idx) => {
                return <li className="col-md-6 radio-custom" key={idx}>
                  <Radio
                    onChange={this.handleChange.bind(this, idx)}
                    checked={vehicle.defaultVehicle}
                    label={translate("setting.garage.defaultVehicle")}
                    type="radio"
                    id={vehicle.id}
                    name="radioGroup"
                  />
                  <p>{getTranslatedObject(vehicle.vehicle.make, defaultLang, 'name', 'nameAr')} {getTranslatedObject(vehicle.vehicle.model, defaultLang, 'name', 'nameAr')} {vehicle.vehicle.year}</p>
                  {
                    vehicle.vin && <p>{translate("form.vehicle.vin")} ({vehicle.vin})</p>
                  }
                  {/*<div className="actions">
                   <Button type="button"  className="btn btn-gray" text={translate("general.buttons.edit")} icon="icon-edit" isReverseOrder/>
                 </div>*/}
                </li>
              })
            }
          </ul>
        </div>
      </div>

      {/*<div id="Garage-container">
     <div className="Garage-add justify-content-between">
       <p>{translate("setting.garage.title")}</p>
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
            label={translate("setting.garage.defaultVehicle")}
          />
        <div className="Garage-box_item-label">
          <p>{vehicle.label}</p>
          <p>{vehicle.vin}</p>
         </div>
         <div className="Garage-footer">
          <Button disabled type="button" className="isDisabled btn btn-gray" text={translate("general.buttons.edit")} icon="icon-edit" isReverseOrder/>
          <Button disabled type="button" className="isDisabled btn btn-delete" text={translate("setting.garage.delete")} icon="icon-trash" onClick={this.props.onDeleteVehicle.bind(this, vehicle)} isReverseOrder/>
         </div>
        </div>
       </div>
      })
     }
    </div>*/}
    } else {
      garage =
        <div className="empty">
          <header>
            <h5>{translate("dialog.vehicle.subTitle")}</h5>
          </header>
          <figure>
            <i className="icon-vehicle"></i>
            <p className="rotate">0<span>{translate("setting.garage.vehicle")}</span></p>
          </figure>
          <figcaption>
            <p>{translate("setting.garage.noVehicle")}</p>
            <a className="btn btn-primary" href="#" onClick={this.props.onShowVehicleDialog.bind(this, 'garage')} isReverseOrder><i className="icon-add"> </i> {translate("setting.garage.add")}</a>
          </figcaption>
        </div>
    }
    return (
      <Fragment>
        {garage}
      </Fragment>
    )
  }
}

export default Garage;
