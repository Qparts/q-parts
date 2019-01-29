import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { addRecentViewedProducts } from '../../actions/customerAction';
import { getOffers, getRecentlyViewedProducts } from "../../actions/apiAction";
import { BEST_SELLER } from '../../constants';
import { getTranslate } from 'react-localize-redux';
import ManualForm from '../../containers/ManualForm/ManualForm';
import HomeDetails from '../HomeDetails/HomeDetails';
export class Home extends Component {
    componentWillMount() {
        this.props.getOffers(BEST_SELLER)
    }
    getRecentlyViewedProducts = () => {
        this.props.getRecentlyViewedProducts(this.props.recentViewedProducts)
    }

    render() {
        return (
            <Fragment>
                <ManualForm />
                <HomeDetails
                    products={this.props.products}
                    getOffers={this.props.getOffers}
                    addRecentViewedProducts={this.props.addRecentViewedProducts}
                    onRecentlyViewedProducts={this.getRecentlyViewedProducts}
                    translate={this.props.translate}
                    direction={this.props.direction}
                />
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        products: state.api.products,
        translate: getTranslate(state.localize),
        recentViewedProducts: state.customer.recentViewedProducts,
        direction: state.customer.direction
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOffers: (offerType) => dispatch(getOffers(offerType)),
        addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
        getRecentlyViewedProducts: (products) => dispatch(getRecentlyViewedProducts(products))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
