import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import ManualForm from '../../containers/ManualForm/ManualForm';
import HomeDetails from '../HomeDetails/HomeDetails';
import { isAuth } from '../../utils'

export class Home extends Component {
 constructor(props){
     super(props);
     this.state={
        isVehicleSelected : false
     }
 }

 render() {
        return (
            <Fragment>
                <ManualForm direction={this.props.direction} currentLanguage={this.props.currentLanguage} vehicles={this.props.vehicles}  isLoggedIn={isAuth(this.props.token)}/>

                <HomeDetails
                    products={this.props.products}
                    recentViewedProducts={this.props.recentViewedProducts}
                    translate={this.props.translate}
                    direction={this.props.direction}
                    currentLanguage={this.props.currentLanguage}
					vehicles={this.props.vehicles}
					cusVehicles={this.props.cusVehicles}
                    token={this.props.token}
                    selectedVehicle={this.props.selectedVehicle}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        translate: getTranslate(state.localize),
        recentViewedProducts: state.customer.recentViewedProducts,
        direction: state.customer.direction,
		currentLanguage: getActiveLanguage(state.localize).code,
		vehicles: state.api.vehicles,
		cusVehicles: state.customer.detail.vehicles,
		token: state.customer.token
    }
}

export default connect(mapStateToProps, null)(Home);
