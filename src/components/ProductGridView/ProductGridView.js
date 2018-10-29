import React, { Component, Fragment } from 'react';

import './ProductGridView.css';

class ProductGridView extends Component {
	render() {
		return this.props.currentProducts.map((product, idx) => {
			return <Fragment key={idx}>
				<div className="Accessories-items" >
					<img src={product.image} alt="" />
					<p>{product.desc}</p>
					<p>{product.manufacturers}</p>
					{/* <p>{product.reviews.length} reviews </p> */}
					<p>{`${product.salesPrice.toFixed(2)} SR`}</p>
				</div>
			</Fragment>
		})
	}
}

export default ProductGridView;