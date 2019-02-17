import React, { Component, Fragment } from 'react';
import Stars from 'react-stars';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import Link from '../UI/Link';
import { handleImageFallback } from '../../utils';
import { SmallScreen, MediumScreen } from '../Device/index.js';
import { withRouter } from 'react-router-dom';

class ProductGridView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovering: false
		};
	}

	handleMouseHover = () => {
		this.setState({
			isHovering: !this.state.isHovering
		})
	}
	handleClick = (productId) => {
		this.props.history.push(`/products/${productId}`)
	}
	render() {
		const { product } = this.props;
		return(
			<Fragment>
				<MediumScreen>
					<div className="product-grid-view col-6 col-md-4" >
						<div
							className=" product-holder"
							onMouseEnter={this.handleMouseHover}
							onMouseLeave={this.handleMouseHover}>
							<div className="image-container" align="center">
								<img onError={handleImageFallback} src={product.image} alt="no product" />
								{
									this.state.isHovering &&
									<div className="product-buttons">
										<Link to={`products/${product.id}`} className="btn btn-primary btn-detail" text="View Details" />
										<Link to='#' className="btn btn-primary btn-cart" icons={["icon-cart", "icon-plus"]} />
									</div>
								}
							</div>
							<div className="details-holder">
								<span className="part-text">{product.desc}</span><br />
								<span className="manufacturer-text">{product.brand.name}</span>
								<div className="product-review_slide">
									<Stars values={product.averageRating} {...starsRating} />
									<span className="product-review">{getLength(product.reviews)} review</span>
								</div>
								<span className="product-price">{product.salesPrice.toFixed(2)}</span>
								<span className="product-currency">SR</span>
							</div>
						</div>
					</div>
				</MediumScreen>
				<SmallScreen>
					<div className="product-grid-view col-6 col-md-4" >
						<div
							className=" product-holder"
							onClick={() => this.handleClick(product.id)}>
							<div className="image-container" align="center">
								<img onError={handleImageFallback} src={product.image} alt="no product" />
							</div>
							<div className="details-holder">
								<span className="part-text">{product.desc}</span><br />
								<span className="manufacturer-text">{product.brand.name}</span>
								<div className="product-review_slide">
									<Stars values={product.averageRating} {...starsRating} />
									<span className="product-review">{getLength(product.reviews)} review</span>
								</div>
								<span className="product-price">{product.salesPrice.toFixed(2)}</span>
								<span className="product-currency">SR</span>
							</div>
						</div>
					</div>
				</SmallScreen>
			</Fragment>
		)
	}
}

export default withRouter(ProductGridView);
