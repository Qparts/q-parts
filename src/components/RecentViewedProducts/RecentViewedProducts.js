import React, { Component } from 'react';

import './RecentViewedProducts.css';
import RenderImages from '../RenderImages';


class RecentViewedProducts extends Component {

 render() {
  // const prices = filterObject(this.props.products, 'price');
  // const reviews = filterObject(this.props.products, 'reviews');
  // const countReviews = [];

  // reviews.forEach(review => {
  //  countReviews.push({
  //   reviews: `Review(${review.reviews.length})`
  //  })
  // });

  return (
   <div>
    <h4>{this.props.title}</h4>
    <RenderImages products={this.props.products} goToProduct={this.props.goToProduct} />
   </div>
  )
 }
}

export default RecentViewedProducts;