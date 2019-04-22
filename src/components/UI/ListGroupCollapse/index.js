import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { PENDING, INCREMENT, DECREMENT, RADIX } from '../../../constants';
import Button from '../../UI/Button';
import { handleImageFallback, getTranslatedObject, isAuth } from '../../../utils';
import { CustomScreen, UpSmallScreen, DownLargeScreen } from '../../Device';

//dialog
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddProduct from '../../../containers/Product/AddProductPopup/AddProduct';
import Title from '../Title';

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


        const { incrementQuantity, decrementQuantity, requestNumber } = this.props;

        const max = 20;
        const min = 1;
        let newQuanValue = parseInt(value, RADIX);

        if (action === DECREMENT) {
            const decQuantity = newQuanValue !== min ? newQuanValue -= 1 : newQuanValue;
            decrementQuantity({ quotationItem, decQuantity, requestNumber });
        } else {
            const incQuantity = newQuanValue !== max ? newQuanValue += 1 : newQuanValue;
            incrementQuantity({ quotationItem, incQuantity, requestNumber });
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
            <Modal dir={direction} contentClassName="container-fluid" className="product-checkout_popup" isOpen={this.state.modal} toggle={this.togglePopup}>
                <ModalHeader toggle={this.togglePopup}>
                    <Title number={this.state.product.quantity} header={translate("dialog.addToCart.title")} />
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
                <div className={`collapse ${requestNumber}`} id={quotationItem.id}>
                    <artical className="request-details" >
                        <ul className="list-inline vehicle-info">

                            <li><i className="icon-vehicle"></i> VIN Num: (000 000 000 000 11)</li>
                            <DownLargeScreen>
                                <li className="r-id-small">
                                    <label>{translate("quotationRequest.name")}</label> #xxx11xx
                                </li>
                            </DownLargeScreen>
                            <li className="ship-info"><i className="icon-location"></i> KSA, Jeddah, Jeddah</li>
                        </ul>
                        <div className="parts-list">
                            <ul className="d-table list-unstyled">
                                <li className="d-table-row">
                                    <div className="d-table-cell">{translate("quotationRequest.name")}</div>
                                    <div className="d-table-cell">{translate("quotationRequest.quantity")}</div>
                                </li>
                                <li className="d-table-row">
                                    <div className="d-table-cell">{quotationItem.name}</div>
                                    <div className="d-table-cell">{quotationItem.quantity}</div>
                                </li>
                            </ul>
                        </div>
                        <div className="request-actions">
                            <a className="btn white-btn"><i className="icon-edit"></i></a>
                            <a className="btn white-btn">{translate("general.buttons.cancel")}</a>
                        </div>
                    </artical>
                </div> :
                <Fragment>
                    <li className="media">
                        <Link to="#">
                            <img onError={handleImageFallback} src={quotationItem.products.image} alt="no images" />
                        </Link>
                        <figcaption className="media-body">
                            <div className="row">
                                <div className="col">
                                    <h5><a href="#">{quotationItem.products.desc}</a></h5>
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
                                        <p>{quotationItem.products.salesPrice} <span>{translate("general.currency")}</span></p>
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
                                    <a href="#" className="btn"><i className="icon-trash"></i></a>
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
