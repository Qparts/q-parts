import React, { Component, Fragment } from 'react';
import Stars from 'react-stars';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';

class ProductGridView extends Component {
	getReviewsLength = (reviews) => (
		reviews ? reviews.length : 0
	)
	render() {
		return this.props.currentProducts.map((product, idx) => {
			return <Fragment key={idx}>
				<div className="col-4" >
					<div className=" product-holder">
						<div align="center">
							<img src={"/img/product-3.jpg"} alt="" /><br />
						</div>
						<div className="details-holder">
							<span className="part-text">{product.desc}</span><br />
							<span className="manufacturer-text">{product.manufacturer.name}</span>
							{/* <span>{product.productNumber}</span> */}
							<div className="product-review_slide">
								<Stars values={product.averageRating} {...starsRating} />
								<span className="product-review">{getLength(product.reviews)} review</span>
							</div>
							<span className="product-price">{product.salesPrice.toFixed(2)}</span>
							<span className="product-currency">SR</span>
						</div>
					</div>
				</div>
			</Fragment>
		})
	}
}

export default ProductGridView;