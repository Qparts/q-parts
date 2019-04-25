import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { PENDING, INCREMENT, DECREMENT, RADIX } from '../../../constants';
import Button from '../../UI/Button';
import { handleImageFallback, getTranslatedObject, isAuth } from '../../../utils';

//dialog
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddProduct from '../../../containers/Product/AddProductPopup/AddProduct';

export class ListGroupCollapse extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: {},
            modal: false,
        }
    }


    togglePopup = () => {
        this.setState({ modal: !this.state.modal })
    }

    handleAddToCart = (quotationItem, e) => {
        e.preventDefault();
        const product = quotationItem.products;
        const item = { ...product, quantity: quotationItem.quantity }
        this.setState({
            product: item
        });

        this.props.onAddtoCart(item);

        //width screen
        let width = window.innerWidth;
        if (width > 992) {
            this.togglePopup();
        } else {
            this.props.history.push({
                pathname: `/products/${item.id}/addProduct`,
                state: { data: item }
            })
        }
    }

    handleClick = (action, value, quotationItem, e) => {
        e.preventDefault();


        const { incrementQuantity, decrementQuantity, requestNumber, completedIndex, quotationItemIndex } = this.props;

        const max = 20;
        const min = 1;
        let newQuanValue = parseInt(value, RADIX);

        if (action === DECREMENT) {
            const decQuantity = newQuanValue !== min ? newQuanValue -= 1 : newQuanValue;
            decrementQuantity({ quotationItem, decQuantity, requestNumber, completedIndex, quotationItemIndex });
        } else {
            const incQuantity = newQuanValue !== max ? newQuanValue += 1 : newQuanValue;
            incrementQuantity({ quotationItem, incQuantity, requestNumber, completedIndex, quotationItemIndex });
        }
    }

    renderNumberPicker = (quotationItem) => (
        <div className="input-group quantity">
            <div className="input-group-prepend">
                <button
                    className="btn btn-gray"
                    type="button"
                    onClick={this.handleClick.bind(this, DECREMENT, quotationItem.quantity, quotationItem)}>
                    <i className="minus"></i></button>
            </div>
            <input disabled className="form-control" value={quotationItem.quantity} type="text" />
            <div className="input-group-append">
                <button
                    className="btn btn-gray" type="button"
                    onClick={this.handleClick.bind(this, INCREMENT, quotationItem.quantity, quotationItem)}>
                    <i className="icon-plus"></i>
                </button>
            </div>
        </div>
    )
    render() {
        const { quotationItem, requestNumber, type, translate, currentLanguage, direction, token } = this.props;

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

        return (
            type === PENDING ?
                <li className="d-table-row">
                    <div className="d-table-cell">{quotationItem.name}</div>
                    <div className="d-table-cell">{quotationItem.quantity}</div>
                </li> :
                <Fragment>
                    <li className="media">
                        <Link to={`/products/${quotationItem.products.id}`}>
                            <img onError={handleImageFallback} src={quotationItem.products.image} alt="no images" />
                        </Link>
                        <figcaption className="media-body">
                            <div className="row">
                                <div className="col">
                                    <h5><Link to={`/products/${quotationItem.products.id}`}>{getTranslatedObject(quotationItem.products, currentLanguage, 'desc', 'descAr')}</Link></h5>
                                    <ul className="list-inline product-info">
                                        <li><strong>{getTranslatedObject(quotationItem.products.brand, currentLanguage, 'name', 'nameAr')}</strong></li>
                                        <li>#{quotationItem.products.productNumber}</li>
                                    </ul>
                                </div>
                                <div className="col-lg-auto price">
                                    <label>{translate("general.price")}</label>
                                    <p>{quotationItem.products.salesPrice} <span>{translate("general.currency")}</span></p>
                                </div>
                            </div>
                            <span className="seperator"></span>
                            <div className="row">
                                <div className="col total-price">
                                    <p>{translate("general.quantity")}</p>
                                    {this.renderNumberPicker(quotationItem)}
                                    <div className="price">
                                        <label>{translate("quotationRequest.totalPrice")}</label>
                                        <p>{quotationItem.products.salesPrice * quotationItem.quantity} <span>{translate("general.currency")}</span></p>
                                    </div>
                                </div>
                                <div className="col-lg-auto add-cart">
                                    <Button
                                        onClick={this.handleAddToCart.bind(this, quotationItem)}
                                        isReverseOrder
                                        type="button"
                                        className="btn btn-primary"
                                        text={translate("product.buttons.addToCart")}
                                        icon="icon-cart" />
                                    {/* <Link to="#" className="btn" onClick={() => this.deleteCart(purchasedItem)}><i className="icon-trash"></i><span>{translate("general.buttons.delete")}</span></Link> */}
                                </div>
                            </div>
                        </figcaption>
                    </li>
                    {dialog}
                </Fragment>

        )
    }
}

export default withRouter(ListGroupCollapse);
