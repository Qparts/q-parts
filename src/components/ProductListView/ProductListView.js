import React, { Component, Fragment } from 'react';
import Stars from 'react-stars';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import update from 'immutability-helper';
import Link from '../UI/Link';
import {
	Card, CardTitle, ListGroupItem, ListGroup, CardImg
} from 'reactstrap';

class ProductListView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isProductsHovering: new Array(this.props.currentProducts.length).fill(false)
		};
	}

	render() {
		return <Card className="product-list-view col-12">
			<ListGroup>
				{
					this.props.currentProducts.map((product, idx) => (
						<ListGroupItem key={idx}>
							<div className="image-container">
								<CardImg src="/img/product-2.jpg" alt="car image" />
							</div>
							<div>
								<h5 className="product-title">{product.desc}</h5>
								<div>
									<span className="product-manufacturer">{product.manufacturer.name}</span>
								</div>
								<div className="product-review_list">
									<Stars values={product.averageRating} {...starsRating} />
									<span className="product-review">{getLength(product.reviews)} review</span>
								</div>
								<div>
									<span className="product-details">
										Motor Oil by ACDelco®. Hot, cold, hard, gentle, fast or slow, ACDelco Engine Oils protect engines under many driving conditions.
										Using quality base stocks and adhering to the latest American Petroleum Institute (API) more details on - https://www.carid.com/search/motor+oil/code-2d47a51285c634127181a1b18e15919f?queryId=#products
									</span>
								</div>
							</div>
							<div className="last-col">
								<div className="price-container">
									<span className="product-price">{product.salesPrice.toFixed(2)}</span>
									<span className="product-currency">SR</span>
								</div>
								<div className="product-buttons">
									<Link to={`products/${product.id}`} className="btn-detail" text="View Details" />
									<Link to='#' className="btn-cart" icons={["icon-cart", "icon-plus"]} />
								</div>
							</div>
						</ListGroupItem>
					))
				}
			</ListGroup>
		</Card>
	}
}

export default ProductListView;