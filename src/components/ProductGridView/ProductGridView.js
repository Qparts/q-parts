import React, { Component, Fragment } from 'react';
import Stars from 'react-stars';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import { Link } from 'react-router-dom'
import { handleImageFallback, getTranslatedObject, isAuth } from '../../utils';
import { SmallScreen, MediumScreen } from '../Device/index.js';
import { withRouter } from 'react-router-dom';
import { addToCart } from '../../actions/cartAction';
import { connect } from 'react-redux';

//dialog
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddProduct from "../../containers/Product/AddProductPopup/AddProduct";
import { modalAddToCart, setModalLogin, setCheckLoginCheckout } from '../../actions/customerAction';
import Title from '../UI/Title';

import Login from "../../containers/Authentication/Login/Login";

class ProductGridView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isHovering: false,
			product: {},
			loading: true,
			modal: true,
			data: [],
			dialogType: "addProduct",
			modalLogin: true
		}

	}
	componentWillMount() {
		this.props.modalAddToCart(false);
		this.props.setModalLogin(false);
	}
	componentDidMount() {
		this.props.setCheckLoginCheckout(false);
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
	togglePopupLogin = () => {
		this.props.setModalLogin(this.state.modalLogin);
		this.setState({ modalLogin: !this.state.modalLogin })
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
					token={isAuth(this.props.token)}
					togglePopup={this.togglePopup}
					translate={translate}
					currentLanguage={currentLanguage}
					togglePopupLogin={this.togglePopupLogin}
					setCheckLoginCheckout={this.props.setCheckLoginCheckout} />
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
				<Modal dir={direction} className="cart-popup modal-lg" isOpen={this.props.isModalAddToCart} toggle={this.togglePopup}>
					<ModalHeader toggle={this.togglePopup}>
						<p><i className="icon-checked"></i></p> {translate("dialog.addToCart.title")}
					</ModalHeader>
					<ModalBody>
						{this.getDialogComponent()}
					</ModalBody>
				</Modal>
			);
		}
		let dialogLogin;
		if (this.state.data.quantity) {
			dialogLogin = (
				<Modal dir={direction} contentClassName="container-fluid" isOpen={this.props.modalLogin} toggle={this.togglePopupLogin} >
					<ModalHeader toggle={this.togglePopupLogin}><Title header={translate("dialog.signin.title")} /></ModalHeader>
					<ModalBody>
						<Login toggle={this.togglePopupLogin} />
					</ModalBody>
				</Modal>
			)
		}
		return (
			<Fragment>
				<li className="col-xl-3 col-md-4 col-6">
					<Link to={`products/${product.id}`} className="card">
						<img onError={handleImageFallback} src={product.image} alt="no product" className="card-img-top" />
						<div className="card-body">
							<h5 className="card-title">{getTranslatedObject(product, currentLanguage, 'desc', 'descAr')}</h5>
							<ul className="list-inline product-info">
								<li><strong>{getTranslatedObject(product.brand, currentLanguage, 'name', 'nameAr')}</strong></li>
								<li>#{product.productNumber}</li>
							</ul>
							<div className="rating">
								<Stars values={product.averageRating} {...starsRating} />
								<span>{getLength(product.reviews)} {translate("product.reviews")}</span>
							</div>
							{/*<p>Made in Germany</p>*/}
							<p className="price">{product.salesPrice.toFixed(2)} <span className="product-currency">{translate("general.currency")}</span> </p>
						</div>
					</Link>
					<Link to={`${pathname}${search}`} onClick={() => this.submit(product)} className="in-cart">
						<i className="icon-cart"></i>
						<i className="icon-plus"></i>
					</Link>
				</li>
				{dialog}
				{dialogLogin}
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		initialValues: { quantity: 1 },
		direction: state.customer.direction,
		isModalAddToCart: state.customer.isModalAddToCart,
		token: state.customer.token,
		modalLogin: state.customer.modalLogin,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addToCart: (item) => dispatch(addToCart(item)),
		modalAddToCart: (check) => dispatch(modalAddToCart(check)),
		setModalLogin: (check) => dispatch(setModalLogin(check)),
		setCheckLoginCheckout: (check) => dispatch(setCheckLoginCheckout(check))
	}
}

ProductGridView = withRouter(ProductGridView);

export default connect(mapStateToProps, mapDispatchToProps)(ProductGridView);
