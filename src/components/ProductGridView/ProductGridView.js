import React, { Component, Fragment } from 'react';
import Stars from 'react-stars';
import { starsRating } from '../../constants';

class ProductGridView extends Component {
	getReviewsLength = (reviews) => (
		reviews ? reviews.length : 0
	)
	render() {
		return this.props.currentProducts.map((product, idx) => {
			return <Fragment key={idx}>
				<div className="Accessories-items" >
					<img src={"/img/product-3.jpg"} alt="" />
					<span>{product.desc}</span>
					<span>{product.manufacturer.name}</span>
					<span>{product.productNumber}</span>
					<div className="product-review">
						<Stars values={product.averageRating} {...starsRating} />
						<span className="total-review">{this.getReviewsLength(product.reviews)} review</span>
					</div>
					<span>{`${product.salesPrice.toFixed(2)} SR`}</span>
				</div>
			</Fragment>
		})
	}
}

export default ProductGridView;