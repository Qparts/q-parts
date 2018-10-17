import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { getTranslate } from "react-localize-redux";

import Vehicle from './Vehicle/Vehicle';
import TabContainer from '../UI/TabContainer';
import SelectInput from '../SelectInput/SelectInput';
import { Button } from 'primereact/components/button/Button';

import { TAB_ONE, TAB_TWO } from '../../constants';

import './Vehicles.css';


class Vehicles extends Component {


  handleAddNewVehicle = (event) => {
    event.preventDefault();

    const { url } = this.props.match;
    this.props.history.push(`${url}/new_vehicle`);
  }

  handleSubmit = values => {

  }


  render() {
    const { vehiclesFormat, newOrOldVechile, onTabChange, translate, displayTwoTabs } = this.props;
    return (
      <Fragment>
        <Paper>
          <Tabs
            value={newOrOldVechile}
            indicatorColor="primary"
            textColor="primary"
            onChange={onTabChange}
            fullWidth
            centered >
            <Tab label={translate("form.vehicle.tabs.tabOne")} />
            {
              displayTwoTabs && <Tab label={translate("form.vehicle.tabs.tabTwo")} />
            }
          </Tabs>
        </Paper>
        {
          newOrOldVechile === TAB_ONE && <TabContainer>
            <Vehicle translate={translate}/>
          </TabContainer>
        }
        {
          newOrOldVechile === TAB_TWO && <TabContainer>
            <div className="Vehicles-overall-layout">
              <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                <div className="Vehicles-container">
                  <Field
                    className="Vehicles-input"
                    name="vehicle"
                    component={SelectInput}
                    options={vehiclesFormat}
                  />
                  <div className="Vehicles-button">
                    <Button label={translate("form.vehicle.buttons.select")} icon="" />
                  </div>
                </div>
              </form>
            </div>
          </TabContainer>
        }
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vehiclesFormat: state.customer.vehiclesFormat,
    token: state.customer.token,
    translate: getTranslate(state.localize)
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch)
}

Vehicles = reduxForm({
  form: 'Vehicles'
})(Vehicles)

export default connect(mapStateToProps, mapDispatchToProps)(Vehicles);