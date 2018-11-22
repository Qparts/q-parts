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
    const { translate } = this.props;
    return (
      <Vehicle translate={translate}/>
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