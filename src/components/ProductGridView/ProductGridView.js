import React, { Component, Fragment } from 'react';
import Stars from 'react-stars';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import Link from '../UI/Link';
import { handleImageFallback, getTranslatedObject } from '../../utils';
import { SmallScreen, MediumScreen } from '../Device/index.js';
import { withRouter } from 'react-router-dom';
import { addToCart } from '../../actions/cartAction';
import { connect } from 'react-redux';

//dialog
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddProduct from "../../containers/Product/AddProductPopup/AddProduct";
import { modalAddToCart } from '../../actions/customerAction';
import Title from '../UI/Title';

class ProductGridView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovering: false,
			product: {},
			loading: true,
			modal: true,
			data: [],
			dialogType: "addProduct"
		}

	}
	componentWillMount() {
		this.props.modalAddToCart(false);
	}
	handleDialog = (dialogType, data) => {
		this.setState({
			dialogType,
			data: data
		});
		this.togglePopup(data);
	};

	togglePopup = (data) => {
		this.props.modalAddToCart(this.state.modal);
		this.setState({ modal: !this.state.modal })

	}

	getDialogProps = () => {
		const { dialogType } = this.state;
		const { translate } = this.props
		switch (dialogType) {
			case 'addProduct':
				return {
					header:
					<Title number={this.state.data.quantity} header={translate("dialog.addToCart.title")} />
				}
			default:
				break;
		}
	}

	getDialogComponent = () => {
		const { dialogType } = this.state;
		const { translate, currentLanguage } = this.props

		switch (dialogType) {
			case 'addProduct':
				return <AddProduct
					data={this.state.data}
					direction={this.props.direction}
					modalAddToCart={this.props.modalAddToCart}
					token={this.props.token}
					togglePopup={this.togglePopup}
					translate={translate}
					currentLanguage={currentLanguage} />
			default:
				break;
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
		var quantity = this.props.initialValues.quantity;
		const item = { ...product, quantity };
		this.props.addToCart(item);
		this.handleDialog('addProduct', item)
	}
	render() {
		const { product, location: { pathname, search }, direction, translate, currentLanguage } = this.props;
		let dialog;
		if (this.state.data.quantity) {
			dialog = (
				<Modal dir={direction} contentClassName="container-fluid" className="product-checkout_popup" isOpen={this.props.isModalAddToCart} toggle={this.togglePopup}>
					<ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
					<ModalBody>
						{this.getDialogComponent()}
					</ModalBody>
				</Modal>
			);
		}
		// <ul className="result-list products-list row">
		// 	<li className="col-xl-3 col-md-4 col-6">
		// 		<Link to="/" className="card">
		// 			<img onError={handleImageFallback} src={product.image} alt="no product" className="card-img-top" />
		// 			<div className="card-body">
		// 				<h5 className="card-title">{product.desc}</h5>
		// 				<ul className="list-inline product-info">
		// 					<li><strong>{getTranslatedObject(product.brand, currentLanguage, 'name', 'nameAr')}</strong></li>
		// 					<li>#Part Num</li>
		// 				</ul>
		// 				<div className="rating">
		// 					<Stars values={product.averageRating} {...starsRating} />
		// 					<span>{getLength(product.reviews)} {translate("product.reviews")}</span>
		// 				</div>
		// 				<p>Made in Germany</p>
		// 				<p className="price">{product.salesPrice.toFixed(2)} <span className="product-currency">{translate("general.currency")}</span> </p>
		// 			</div>
		// 		</Link>
		// 	</li>
		// </ul>
		//
		// 	<Link to={`products/${product.id}`} className="btn btn-primary btn-detail" text={translate("general.viewDetails")} />
		// 	<Link to={`${pathname}${search}`} onClick={() => this.submit(product)} className="btn btn-primary btn-cart" icons={["icon-cart", "icon-plus"]} />
		//
		// 		{dialog}
		return (
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
										<Link to={`products/${product.id}`} className="btn btn-primary btn-detail" text={translate("general.viewDetails")} />
										<Link to={`${pathname}${search}`} onClick={() => this.submit(product)} className="btn btn-primary btn-cart" icons={["icon-cart", "icon-plus"]} />
									</div>
								}
							</div>
							<div className="details-holder">
								<span className="part-text">{product.desc}</span><br />
								<span className="manufacturer-text">{getTranslatedObject(product.brand, currentLanguage, 'name', 'nameAr')}</span>
								<div className="product-review_slide">
									<Stars values={product.averageRating} {...starsRating} />
									<span className="product-review">{getLength(product.reviews)} {translate("product.reviews")}</span>
								</div>
								<span className="product-price">{product.salesPrice.toFixed(2)}</span>
								<span className="product-currency">{translate("general.currency")}</span>
							</div>
						</div>
						{dialog}
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
								<span className="manufacturer-text">{getTranslatedObject(product.brand, currentLanguage, 'name', 'nameAr')}</span>
								<div className="product-review_slide">
									<Stars values={product.averageRating} {...starsRating} />
									<span className="product-review">{getLength(product.reviews)} {translate("product.reviews")}</span>
								</div>
								<span className="product-price">{product.salesPrice.toFixed(2)}</span>
								<span className="product-currency">{translate("general.currency")}</span>
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
		direction: state.customer.direction,
		isModalAddToCart: state.customer.isModalAddToCart,
		token: state.customer.token
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addToCart: (item) => dispatch(addToCart(item)),
		modalAddToCart: (check) => dispatch(modalAddToCart(check)),
	}
}

ProductGridView = withRouter(ProductGridView);

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridView);
