import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { addRecentViewedProducts } from '../../actions/customerAction';
import { getRecentlyViewedProducts } from "../../actions/apiAction";
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import ManualForm from '../../containers/ManualForm/ManualForm';
import HomeDetails from '../HomeDetails/HomeDetails';
export class Home extends Component {
    getRecentlyViewedProducts = () => {
        this.props.getRecentlyViewedProducts(this.props.recentViewedProducts)
    }

    render() {
        return (
            <Fragment>
                <ManualForm />
                <HomeDetails
                    products={this.props.products}
                    addRecentViewedProducts={this.props.addRecentViewedProducts}
                    onRecentlyViewedProducts={this.getRecentlyViewedProducts}
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

const mapDispatchToProps = dispatch => {
    return {
        addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
        getRecentlyViewedProducts: (products) => dispatch(getRecentlyViewedProducts(products))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
