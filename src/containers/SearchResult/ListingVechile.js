/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from "react";
import SelectInput from '../../components/SelectInput/SelectInput';
import { Field , reduxForm } from 'redux-form';
import {  MediumScreen , SmallScreen } from '../../components/Device';
import Radio from '../../components/UI/Radio';

class listingVechile extends Component{
  render(){
    const vehicleMake = [
      { value: 1, label: "BMW" },
      { value: 2, label: "KIA" },
      { value: 3, label: "Ford" },
    ];
    const groupedvehicleMake = [
      {
        options: vehicleMake,
      },
    ];
    const formatvehicleMakeLabel = () => (
      <div className="placeholder">
        <span>Select vehicle Make</span>
      </div>
    );
    const vehicleModel = [
      { value: 1, label: "Rio" },
      { value: 2, label: "Focus" },
      { value: 3, label: "20CS" },
    ];
    const groupedvehicleModel = [
      {
        options: vehicleModel,
      },
    ];
    const formatvehicleModelLabel = () => (
      <div className="placeholder">
        <span>Select vehicle Model</span>
      </div>
    );
    const vehicleYear = [
        { value: 1, label: "2010" },
        { value: 2, label: "2011" },
        { value: 3, label: "2012" },
      ];
      const groupedvehicleYear = [
        {
          options: vehicleYear,
        },
      ];
      const formatvehicleYearLabel = () => (
        <div className="placeholder">
          <span>Select Year</span>
        </div>
      );
    return(
      <div className="selected-vechile">
      {/*user SELECT a vehicle from home page */}
        <section className="default-header-bg">
          <div className="container-fluid">
            <div className="row">
              <header className="col">
                <label className="header-label">Your selected vehicle:</label>
                <h3>
                  Skoda Octavia 2012
                </h3>
                <p>VIN(JTHBJ46G9B2420251)</p>
              </header>
              <div className="col-md-auto btn-group">
                <a href="#" className="btn btn-primary"><i className="icon-catalog"></i>Browse Catalog</a>
                <a href="#" className="btn btn-black"><i className="icon-vehicle"></i>Change Vehicle</a>
            </div>
            </div>
          </div>
        </section>

        <br></br>
        <br></br>
        {/*user did not select a vehicle from home page and have vehicle in garage*/}
        <section className="default-header-bg ">
          <div className="container-fluid">
            <div className="add-new-vehicle row">
              <header className="col-md-auto">
                  <h4>Select Vehicle</h4>
              </header>
              <MediumScreen>
                  <div className="garage-select col">
                      <label>Select from</label>
                    <a href="#" className="btn btn-gray-overlay dropdown-toggle" role="button" id="garage-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img className="icon-garage" alt="garage" src="/img/garage-white.svg"/> Garage
                      <span className="vec-count">2</span>
                    </a>
                    <div class="dropdown-menu garage-dropdown" aria-labelledby="garage-dropdown">
                        <div class="media">
                          <i className="icon-vehicle-history"></i>
                          <div class="media-body">
                            <h5>Selected Vehicle History </h5>
                            <p>View, manage and find parts for the vehicles in your garage</p>
                          </div>
                        </div>
                      <ul className="list-unstyled">
                        <li  className="radio-custom" key="1">
                          <a href="#" className="row">
                            <div className="col-auto">
                              <Radio
                                checked="true"
                                type="radio"
                                id="1"
                                name="radioGroup"
                              />
                            </div>
                            <p className="col">
                            2016 Ford Focus
                            <span>VIN(000 000 000 000 11)</span>
                          </p>
                            <div className="col-auto vec-actions">
                            <a href="#" className="btn btn-primary"><i className="icon-catalog"></i>Catalog</a>
                            <a href="#" className="link">Save</a>
                          </div>
                          </a>
                        </li>
                        <li  className="radio-custom" key="1">
                          <a href="#" className="row">
                            <div className="col-auto">
                              <Radio
                                checked="true"
                                type="radio"
                                id="1"
                                name="radioGroup"
                              />
                            </div>
                            <p className="col">
                            2016 Ford Focus
                          </p>
                            <div className="col-auto vec-actions">
                            <a href="#" className="btn btn-primary"><i className="icon-catalog"></i>Catalog</a>
                            <a href="#" className="link">Save</a>
                          </div>
                          </a>
                        </li>
                      </ul>
                      <div className="vec-list-actions">
                        <div className="main-action">
                          <a className="btn btn-gray">
                            <i className="icon-add-vehicle"></i>
                            Add Vehicle
                          </a>
                        </div>
                        <a href="#" className="link">
                          <i className="icon-clear"></i>
                          Clear History
                        </a>
                      </div>
                    </div>
                  </div>
              </MediumScreen>
            </div>
            <SmallScreen>
              <div class="accordion" id="select-vehicle-accordion">
                <div className="">
                  <div className="row garage-select">
                    <div className="col">
                      <a className="btn btn-primary collapsed" data-toggle="collapse" href="#garage-accordion" role="button" aria-expanded="false" aria-controls="garage-accordion">
                    <img className="icon-garage" alt="garage" src="/img/garage-white.svg"/> From Garage
                    <span className="vec-count">2</span>
                  </a>
                    </div>
                    <div className="col">
                      <a className="btn btn-gray-overlay collapsed" data-toggle="collapse" href="#select-vechile-form" role="button" aria-expanded="false" aria-controls="select-vechile-form"><i className="icon-add-vehicle"></i>Add New</a>
                    </div>
                  </div>
                      <div class=" collapse" aria-labelledby="garage-accordion" data-parent="#select-vehicle-accordion" id="garage-accordion">
                        <div className="accordion-show garage-dropdown">
                          <div class="media">
                          <i className="icon-vehicle-history"></i>
                          <div class="media-body">
                            <h5>Selected Vehicle History </h5>
                            <p>View, manage and find parts for the vehicles in your garage</p>
                          </div>
                        </div>
                          <ul className="list-unstyled">
                            <li  className="radio-custom" key="1">
                              <a href="#" className="row">
                                <div className="col-auto">
                                  <Radio
                                    checked="true"
                                    type="radio"
                                    id="1"
                                    name="radioGroup"
                                  />
                                </div>
                                <p className="col">
                                2016 Ford Focus
                                <span>VIN(000 000 000 000 11)</span>
                              </p>
                                <div className="col-auto vec-actions">
                                <a href="#" className="btn btn-primary"><i className="icon-catalog"></i>Catalog</a>
                                <a href="#" className="link">Save</a>
                              </div>
                              </a>
                            </li>
                            <li  className="radio-custom" key="1">
                              <a href="#" className="row">
                                <div className="col-auto">
                                  <Radio
                                    checked="true"
                                    type="radio"
                                    id="1"
                                    name="radioGroup"
                                  />
                                </div>
                                <p className="col">
                                2016 Ford Focus
                              </p>
                                <div className="col-auto vec-actions">
                                <a href="#" className="btn btn-primary"><i className="icon-catalog"></i>Catalog</a>
                                <a href="#" className="link">Save</a>
                              </div>
                              </a>
                            </li>
                        </ul>


                        </div>
                  </div>

                    <form id="select-vechile-form" className="select-vechile-form collapse" data-parent="#select-vehicle-accordion">
                      <div className="row">
                        <div className="col-md float-label">
                          <Field
                            label="Make"
                            name="make"
                            placeholder={' '}
                            component={SelectInput}
                            options={groupedvehicleMake}
                            formatGroupLabel={
                              formatvehicleMakeLabel
                            }
                            />
                        </div>
                        <div className="col-md float-label">
                          <Field
                            label="Model"
                            name="model"
                            placeholder={' '}
                            component={SelectInput}
                            options={groupedvehicleModel}
                            formatGroupLabel={
                              formatvehicleModelLabel
                            }
                            />
                        </div>
                        <div className="col-md float-label">
                          <Field
                            label="Year"
                            name="year"
                            placeholder={' '}
                            component={SelectInput}
                            options={groupedvehicleYear}
                            formatGroupLabel={
                              formatvehicleYearLabel
                            }
                            />
                        </div>
                        <div className="col-md-auto">
                          <button type="submit" className='btn btn-primary'>Go <i className="icon-arrow-right"></i></button>
                        </div>
                      </div>
                  </form>
              </div>
              </div>
            </SmallScreen>
            <div>
              <MediumScreen>
                <form className="select-vechile-form">
                <div className="row">
                  <div className="col-md float-label">
                    <Field
                      label="Make"
                      name="make"
                      placeholder={' '}
                      component={SelectInput}
                      options={groupedvehicleMake}
                      formatGroupLabel={
                        formatvehicleMakeLabel
                      }
                      />
                  </div>
                  <div className="col-md float-label">
                    <Field
                      label="Model"
                      name="model"
                      placeholder={' '}
                      component={SelectInput}
                      options={groupedvehicleModel}
                      formatGroupLabel={
                        formatvehicleModelLabel
                      }
                      />
                  </div>
                  <div className="col-md float-label">
                    <Field
                      label="Year"
                      name="year"
                      placeholder={' '}
                      component={SelectInput}
                      options={groupedvehicleYear}
                      formatGroupLabel={
                        formatvehicleYearLabel
                      }
                      />
                  </div>
                  <div className="col-md-auto">
                    <button type="submit" className='btn btn-primary'>Go <i className="icon-arrow-right"></i></button>
                  </div>
                </div>
              </form>
              </MediumScreen>
            </div>

          </div>
        </section>

        <br></br>
        <br></br>
        {/*user did not select a vehicle from home page and do not have vehicle in garage*/}
        <section className="default-header-bg ">
          <div className="container-fluid">
            <div className="add-new-vehicle row">
              <header className="col-md-auto">
                  <h4>Select Vehicle</h4>
              </header>
            </div>
                <form className="select-vechile-form">
                <div className="row">
                  <div className="col-md float-label">
                    <Field
                      label="Make"
                      name="make"
                      placeholder={' '}
                      component={SelectInput}
                      options={groupedvehicleMake}
                      formatGroupLabel={
                        formatvehicleMakeLabel
                      }
                      />
                  </div>
                  <div className="col-md float-label">
                    <Field
                      label="Model"
                      name="model"
                      placeholder={' '}
                      component={SelectInput}
                      options={groupedvehicleModel}
                      formatGroupLabel={
                        formatvehicleModelLabel
                      }
                      />
                  </div>
                  <div className="col-md float-label">
                    <Field
                      label="Year"
                      name="year"
                      placeholder={' '}
                      component={SelectInput}
                      options={groupedvehicleYear}
                      formatGroupLabel={
                        formatvehicleYearLabel
                      }
                      />
                  </div>
                  <div className="col-md-auto">
                    <button type="submit" className='btn btn-primary'>Go <i className="icon-arrow-right"></i></button>
                  </div>
                </div>
              </form>
          </div>
        </section>

      </div>
    );
  }
}
listingVechile = reduxForm({
	form: 'listingVechile'
})(listingVechile);
export default listingVechile;
