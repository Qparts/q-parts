import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { getTranslate } from "react-localize-redux";

import Vehicle from './Vehicle/Vehicle';




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
      <section id="vehicles" className="container-fluid">
        <Vehicle translate={translate} />
      </section>
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