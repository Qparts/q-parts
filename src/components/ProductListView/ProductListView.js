import React, { Component } from 'react';
import Stars from 'react-stars';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import { withRouter } from 'react-router-dom';
import Link from '../UI/Link';
import {
	ListGroupItem, CardImg
} from 'reactstrap';
import parse from 'html-react-parser';
import { MediumScreen } from '../Device';
import { handleImageFallback, getTranslatedObject, l } from '../../utils';
import _ from 'lodash';

class ProductListView extends Component {

	render() {
		const { product, location: { pathname, search }, translate, currentLanguage, direction } = this.props
		return <ListGroupItem className="row">
			<div className="col-3">
				<CardImg onError={handleImageFallback} src={product.image} alt="no product" />
			</div>
			<div className="col-9 col-md-5">
				<h5 className="product-title">{product.desc}</h5>
				<div>
					<span className="product-manufacturer">{getTranslatedObject(product.brand, currentLanguage, 'name', 'nameAr')}</span>
				</div>
				<div className="product-review_list">
					<Stars values={product.averageRating} {...starsRating} />
					<span className="product-review">{getLength(product.reviews)} {translate("product.reviews")}</span>
				</div>
				<div>
					<span className="product-details">
						{parse(_.isNull(product.details) ? "" : product.details)}
					</span>
				</div>
			</div>
			<div className={`col-9 col-md-4 m${l(direction)}-auto last-col`}>
				<div className="price-container">
					<span className="product-price">{product.salesPrice.toFixed(2)}</span>
					<span className="product-currency">{translate("general.currency")}</span>
				</div>
				<MediumScreen>
					<div className="product-buttons">
						<Link to={`products/${product.id}`} className="btn btn-primary btn-detail" text={translate("general.viewDetails")} />
						<Link to={`${pathname}${search}`} className="btn btn-primary btn-cart isDisabled" icons={["icon-cart", "icon-plus"]} />
					</div>
				</MediumScreen>
			</div>
		</ListGroupItem>
	}
}

export default withRouter(ProductListView);
