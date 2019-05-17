import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import ListGroupCollapse from '../../UI/ListGroupCollapse';
import { REPLIED } from '../../../constants';
import { LargeScreen, DownLargeScreen } from '../../Device';
import { getVehicleVin, getVehicleInfo, getRegion, getCity } from '../../../utils/components';
import { getCountry } from '../../../utils/api';
import { getTranslatedObject, isAuth } from '../../../utils';
import Button from '../../UI/Button';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddProduct from '../../../containers/Product/AddProductPopup/AddProduct';

export class CompletedRequest extends Component {
	constructor(props) {
		super(props)

		this.state = {
			shippingInfo: getRegion(props.regions, props.reply.cityId),
			region: null,
			country: null,
			city: null,
			product: [],
			modal: false,
		}
	}
	togglePopup = () => {
		this.setState({ modal: !this.state.modal })
	}

	componentDidMount = async () => {
		this.scrollToDiv()
		await this.getRegion();
		await this.getCountry().then(res => this.setState({ country: res }));
		await this.getCity();
	}

	componentDidUpdate = async (prevProps, prevState) => {
		if (prevProps.currentLanguage !== this.props.currentLanguage) {
			await this.getRegion();
			await this.getCountry().then(res => this.setState({ country: res }));
			await this.getCity();
		}
	}


	getCountry = async () => {
		let country = await getCountry(this.state.shippingInfo.countryId);

		return getTranslatedObject(country.data, this.props.currentLanguage, 'name', 'nameAr');
	}

	getCity = () => {
		let city = getCity(this.state.shippingInfo.cities, this.props.reply.cityId);

		this.setState({
			city: getTranslatedObject(city, this.props.currentLanguage, 'name', 'nameAr')
		});
	}

	getRegion = () => {
		this.setState({
			region: getTranslatedObject(this.state.shippingInfo, this.props.currentLanguage, 'name', 'nameAr')
		})
	}

	addToCart = (item) => {
		this.props.addToCart(item);
	}

	handleClick = event => {
		const { reply, completedIndex, putCompletedRequestRead } = this.props
		event.preventDefault();
		if (!reply.read) {
			putCompletedRequestRead(reply.id, completedIndex);
		}
	}

	show = () => {
		const { reply, show } = this.props;

		return reply.id === show ? 'show' : '';
	}

	scrollToDiv = () => {
		if (this.props.show) {
			window.location = `#${this.props.show}`;
		}
	}

		handleAddToCart = async (quotationItem, e) => {
			e.preventDefault();
			const hasOneProduct = quotationItem.length === 1;
			let products = [];

			for (var i = 0; i < quotationItem.length; i++) {
				const product = quotationItem[i].products;
				const item = { ...product, quantity: quotationItem[i].quantity }
				products.push(item);
			}
			await this.setState({
				product: hasOneProduct ? products[0] : products
			})
			this.togglePopup();
			products.forEach(product => {
				this.addToCart(product);
		});
	}
	render() {
		const {
			reply, translate, currentLanguage, incrementQuantity, decrementQuantity, token,
			direction, vehicles, completedIndex
		} = this.props;
		const { country, city, region } = this.state;
		const created = moment(reply.created).format('MMM Do');
		let ids = [];
		let hasShippingInfo = (country && region && city);

		reply.quotationItems.forEach(quotationItem => ids.push(quotationItem.id));
		const dialog = (
			<Modal dir={direction} className="cart-popup modal-lg" isOpen={this.state.modal} toggle={this.togglePopup}>
				<ModalHeader toggle={this.togglePopup}>
					<p><i className="icon-checked"></i></p> {translate("dialog.addToCart.title")}
				</ModalHeader>
				<ModalBody>
					<AddProduct
						data={this.state.product}
						direction={direction}
						token={isAuth(token)}
						togglePopup={this.togglePopup}
						translate={translate}
						currentLanguage={currentLanguage} />
				</ModalBody>
			</Modal>
		);
		let screenSize = window.innerWidth;

		return <li key={reply.id}>
			<Link
				to="#"
				className={`collapsed ${!reply.read ? 'new' : ''}`}
				data-toggle="collapse"
				data-target={`.${reply.id}`}
				aria-expanded="false"
				aria-controls={ids.join(' ')}
				onClick={this.handleClick}>
				<LargeScreen>
					<div className="col-lg-auto">
						<label>{translate("quotationRequest.requestNo")}</label>
						<p>#{reply.id}</p>
					</div>
				</LargeScreen>
				<div className="col-lg">
					{
						getVehicleInfo(vehicles, reply.customerVehicleId, currentLanguage) && (
							<p>{getVehicleInfo(vehicles, reply.customerVehicleId, currentLanguage)}</p>
						)
					}
					<span className="details-toggle"><i className="icon-"></i></span>
				</div>
				<div className="col-lg-auto r-info">
					<p className="date"><span>{translate("quotationRequest.sent")}</span> {created} </p>
					<p>{translate("quotationRequest.itemsQuantity")}:  {reply.quotationItems.length}</p>
				</div>
			</Link>
			<div className={`collapse ${reply.id} ${this.show()}`} id={reply.id}>
				<article className="request-details" >
					<ul className="list-inline vehicle-info" style={screenSize > 992 ? styles.vehicleInfo : {}}>
						{
							getVehicleVin(vehicles, reply.customerVehicleId) && (
								<li><i className="icon-vehicle"></i> {translate("general.vin")}: ({getVehicleVin(vehicles, reply.customerVehicleId)})</li>
							)
						}
						<DownLargeScreen>
							<li className="r-id-small">
								<label>{translate("quotationRequest.requestNo")}</label> #{reply.id}
							</li>
						</DownLargeScreen>
						{
							<li className="ship-info"><i className={hasShippingInfo ? 'icon-location' : ''}></i> {hasShippingInfo ? `${country}, ${region}, ${city}` : ''}</li>
						}
						<li className="add-all-to-cart">
							<div className="col-lg-auto">
								<Button
									onClick={this.handleAddToCart.bind(this, reply.quotationItems)}
									isReverseOrder
									type="button"
									className="btn btn-primary"
									text={translate("quotationRequest.addAllToCart")}
									icon="icon-cart" />
								{/* <Link to="#" className="btn" onClick={() => this.deleteCart(purchasedItem)}><i className="icon-trash"></i><span>{translate("general.buttons.delete")}</span></Link> */}
							</div>
						</li>
					</ul>
					<ul className="replayed-parts-list ">
						{
							reply.quotationItems.map((quotationItem, quotationItemIndex) => {
								return <ListGroupCollapse
									key={quotationItemIndex}
									completedIndex={completedIndex}
									quotationItemIndex={quotationItemIndex}
									requestNumber={reply.id}
									type={REPLIED}
									quotationItem={quotationItem}
									translate={translate}
									currentLanguage={currentLanguage}
									onSelectedProduct={this.setSelectedProduct}
									incrementQuantity={incrementQuantity}
									decrementQuantity={decrementQuantity}
									onAddtoCart={this.addToCart}
									direction={direction}
									token={token}
								/>
							})
						}
					</ul>
				</article>
				{
					reply.comments.length !== 0 &&
					<article className="request-comments">
						<div className="parts-list">
							<ul className="d-table list-unstyled">
								<li className="d-table-row">
									<div className="d-table-cell">{translate("quotationRequest.comment")}</div>
								</li>
								{
									reply.comments.map((comment, idx) => (
										<li className="d-table-row" key={idx}>
											<div className="d-table-cell">{comment.text}</div>
										</li>
									))
								}
							</ul>
						</div>
					</article>
				}
			</div>
			{dialog}
		</li>
	}
}

const styles = {
	vehicleInfo: {
		display: 'flex',
		justifyContent: 'space-between'
	}
}


export default withRouter(CompletedRequest);
