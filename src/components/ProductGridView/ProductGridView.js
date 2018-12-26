import React, { Component, Fragment } from 'react';
import Stars from 'react-stars';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import update from 'immutability-helper';
import Link from '../UI/Link';

class ProductGridView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isProductsHovering: new Array(this.props.currentProducts.length).fill(false)
		};
	}

	handleMouseHover = (idx) => {
		this.setState({
			isProductsHovering: update(this.state.isProductsHovering, {
				[idx]: { $set: !this.state.isProductsHovering[idx] }
			})
		})
	}
	render() {
		return this.props.currentProducts.map((product, idx) => {
			return <Fragment key={idx}>
				<div className="col-4" >
					<div
						className=" product-holder"
						onMouseEnter={this.handleMouseHover.bind(this, idx)}
						onMouseLeave={this.handleMouseHover.bind(this, idx)}>
						<div className="image-container" align="center">
							<img src={"/img/product-3.jpg"} alt="" />
							{
								this.state.isProductsHovering[idx] &&
								<div className="hover-buttons">
									<Link to={`products/${product.id}`} className="btn-detail" text="View Details" />
									<Link to='#' className="btn-cart" icons={["icon-cart", "icon-plus"]} />
								</div>
							}
						</div>
						<div className="details-holder">
							<span className="part-text">{product.desc}</span><br />
							<span className="manufacturer-text">{product.manufacturer.name}</span>
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