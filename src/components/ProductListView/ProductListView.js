import React, { Component } from 'react';
import Stars from 'react-stars';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import Link from '../UI/Link';
import {
	ListGroupItem, CardImg
} from 'reactstrap';
import { MediumScreen } from '../Device';

class ProductListView extends Component {

	render() {
		const { product } = this.props
		return <ListGroupItem className="row">
			<div className="col-3">
				<CardImg src="/img/product-2.jpg" alt="car image" />
			</div>
			<div className="col-9 col-md-5">
				<h5 className="product-title">{product.desc}</h5>
				<div>
					<span className="product-manufacturer">{product.brand.name}</span>
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
			<div className="col-9 offset-3 col-md-4 offset-md-0 last-col">
				<div className="price-container">
					<span className="product-price">{product.salesPrice.toFixed(2)}</span>
					<span className="product-currency">SR</span>
				</div>
				<MediumScreen>
					<div className="product-buttons">
						<Link to={`products/${product.id}`} className="btn btn-primary btn-detail" text="View Details" />
						<Link to='#' className="btn btn-primary btn-cart" icons={["icon-cart", "icon-plus"]} />
					</div>
				</MediumScreen>
			</div>
		</ListGroupItem>
	}
}

export default ProductListView;