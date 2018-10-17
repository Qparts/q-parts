import React, { Component, Fragment } from 'react';
import { filterObject } from '../../utils';
import RenderImages from '../RenderImages';

import { styles } from '../../constants';

import './CompareProducts.css';

class CompareProducts extends Component {

 renderComparision = (productToCompare, header) => {
  const key = Object.keys(productToCompare[0]);
  return <div className="CompareProducts-box border rounded">
   <div className="CompareProducts-box_item">
    {header}
   </div>
   {
    productToCompare.map((product, idx) => {
     return <Fragment key={idx}>
      <div className="CompareProducts-box_item">
       {product[key]}
      </div>
     </Fragment>
    })
   }
  </div>
 }

 renderImages = (products) => {
  return <div className="CompareProducts-box">
   {
    products.map((product, idx) => {
     return <Fragment key={idx}>
      <div>
       <img style={styles.cursor} src={product.image} alt="" onClick={this.props.goToProduct.bind(this, product)} />
       <p>{product.desc}</p>
      </div>
     </Fragment>
    })
   }
  </div>
 }

 render() {
  const { headers, reviewText } = this.props;
  const prices = filterObject(this.props.products, 'salesPrice');
  // const reviews = filterObject(this.props.products, 'reviews');
  const countReviews = [];

  // reviews.forEach(review => {
  //  countReviews.push({
  //   reviews: `${reviewText}(${review.reviews.length})`
  //  })
  // });

  return (
   <div>
    <RenderImages products={this.props.products} goToProduct={this.props.goToProduct} />
    {/* {this.renderComparision(prices, headers[0])} */}
    {/* {this.renderComparision(countReviews, headers[1])} */}
   </div>
  )
 }
}

export default CompareProducts;