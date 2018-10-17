import React, { Component, Fragment } from 'react';
import Button from '../UI/Button';
import { withRouter } from 'react-router-dom';

import './Products.css';
import { BEST_SELLER, OFFERS } from '../../constants';

class Products extends Component {

 goToProduct = (product, event) => {
  this.props.addRecentViewedProducts(product);
  this.props.history.push(`/products/${product.id}`)
 }

 render() {
  const styles = {
   grey: {
    backgroundColor: '#f8f9fa',
   },
   white: {
    backgroundColor: 'white'
   },
   rightSpace: {
    marginLeft: '50px'
   }
  }
  const { translate } = this.props;
  return (
   <div style={styles.grey} className="Products-container">
    <h3>{translate("offers.title")}</h3>
    <div className="Garage-footer">
     <Button type="button" className="btn btn-link" text={translate("offers.recommendation.bestSeller")} onClick={this.props.getOffers.bind(this, BEST_SELLER)} /> |
     <Button type="button" className="btn btn-link" text={translate("offers.recommendation.offers")} onClick={this.props.getOffers.bind(this, OFFERS)} /> |
     <Button type="button" className="btn btn-link" text={translate("offers.recommendation.recentViewed")} onClick={this.props.onRecentlyViewedProducts} />
    </div>
    <div className="Products-items">
     {
      this.props.products.map((product, idx) => {
       return <Fragment key={idx}>
        <div style={{ ...styles.white, ...styles.rightSpace }} className="Products-item" onClick={this.goToProduct.bind(this, product)}>
         <img src={product.image} alt="" />
         <p>{product.desc}</p>
         <p>{product.manufacturers}</p>
         {/* <p>{product.reviews.length} reviews </p> */}
         <p>{`${product.salesPrice.toFixed(2).toString()} SR`}</p>
        </div>
       </Fragment>
      })
     }
    </div>
    <br />
   </div>
  );
 }
}

export default withRouter(Products);