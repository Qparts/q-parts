import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import ManualForm from '../../containers/ManualForm/ManualForm';
import HomeDetails from '../HomeDetails/HomeDetails';
export class Home extends Component {

    render() {
        return (
            <Fragment>
                <ManualForm direction={this.props.direction}/>
                <HomeDetails
                    products={this.props.products}
                    recentViewedProducts={this.props.recentViewedProducts}
                    translate={this.props.translate}
                    direction={this.props.direction}
                    currentLanguage={this.props.currentLanguage}
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
    }
}

export default connect(mapStateToProps, null)(Home);
