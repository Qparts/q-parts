import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { getTranslate } from "react-localize-redux";
import { withRouter } from 'react-router-dom';

import Vehicle from './Vehicle/Vehicle';
import Title from '../UI/Title';




class Vehicles extends Component {


  handleAddNewVehicle = (event) => {
    event.preventDefault();

    const { url } = this.props.match;
    this.props.history.push(`${url}/new_vehicle`);
  }

  handleSubmit = values => {

  }


  render() {
    const { translate, match: { url } } = this.props;
    console.log(this);

    return (
      <section id="vehicles" className="container-fluid">
        {
          url === '/vehicles' ? (
            <Title
              header={translate("dialog.vehicle.title")}
              subHeader={translate("dialog.vehicle.subTitle")} />
          ) : null
        }
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

const withVehicles = withRouter(Vehicles)

export default connect(mapStateToProps, mapDispatchToProps)(withVehicles);