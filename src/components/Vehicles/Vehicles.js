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

  render() {
    const { translate, match: { url } } = this.props;

    return (
      <section>
        {
          url === '/vehicles' ? (
            <Title
              header={translate("dialog.vehicle.title")}
              subHeader={translate("dialog.vehicle.subTitle")} />
          ) : null
        }
        <Vehicle translate={translate} toggle={this.props.toggle} direction={this.props.direction} defaultLang={this.props.defaultLang} />
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    vehicles: state.customer.detail.vehicles,
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
