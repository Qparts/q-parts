import React, { Component, Fragment } from 'react';
import Stars from 'react-stars';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import Link from '../UI/Link';
import { SmallScreen, MediumScreen } from '../Device/index.js';
import { withRouter } from 'react-router-dom';
import { getProduct } from '../../utils/api';
import { addToCart } from '../../actions/cartAction';
import { connect } from 'react-redux';

class ProductGridView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovering: false,
      product: {},
			loading: true,
    }

	}

	handleMouseHover = () => {
		this.setState({
			isHovering: !this.state.isHovering
		})
	}
	handleClick = (productId) => {
		this.props.history.push(`/products/${productId}`)
	}
	submit = (product) => {
		var  quantity  = this.props.initialValues.quantity;
    const item = { product, quantity };
		console.log(item)
    this.props.addToCart(item);
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
								<img src={product.image} alt="no product" />
								{
									this.state.isHovering &&
									<div className="product-buttons">
										<Link to={`products/${product.id}`} className="btn btn-primary btn-detail" text="View Details" />
										<i className="btn btn-primary btn-cart" onClick={()=>this.submit(product)}><i className="icon-cart"/><i className="icon-plus"/></i>
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
								<img src={product.image} alt="no product" />
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

const mapStateToProps = state => {
  return {
    initialValues: { quantity: 1 },
    products: state.api.products,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  }
}

ProductGridView = withRouter(ProductGridView);

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridView);
