import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { PENDING, INCREMENT, DECREMENT, RADIX } from '../../../constants';
import Button from '../../UI/Button';
import { handleImageFallback, getTranslatedObject, isAuth } from '../../../utils';
import { CustomScreen, UpSmallScreen } from '../../Device';

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
        const { quotationItem, type, translate, currentLanguage, direction, token } = this.props;

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
                <div className="collapse multi-collapse" id={quotationItem.id}>
                    <div style={{ background: '#ebebeb' }} className="d-table product-options">

                        <div className="d-table-row">
                            <div className="d-table-cell"><span>{translate("quotationRequest.name")} </span></div>
                            <div className="d-table-cell">{quotationItem.name}</div>
                        </div>
                        <div className="d-table-row">
                            <div className="d-table-cell"><span>{translate("quotationRequest.quantity")}</span></div>
                            <div className="d-table-cell">{quotationItem.quantity}</div>
                        </div>
                    </div>
                </div> :
                <Fragment>
                    <div className="collapse multi-collapse" key={quotationItem.id} id={quotationItem.id}>
                        <div className="d-table product-options">
                            <div className={`render-cart-item col-12`}>
                                <ul className="cart-items list-unstyled">
                                    <li className="bg-white">
                                        <figure className="row">
                                            <Link to="#" className="col-3 item-img">
                                                <img onError={handleImageFallback} src={quotationItem.products.image} alt="no item" />
                                            </Link>
                                            <figcaption className="col-9">
                                                <div className="row">
                                                    <div className="col-md-9 item-dis">
                                                        <header>
                                                            <h3><Link to="#">{quotationItem.products.desc}</Link></h3>
                                                            <h4>{getTranslatedObject(quotationItem.products.brand, currentLanguage, 'name', 'nameAr')} <span>{quotationItem.products.productNumber}</span></h4>
                                                        </header>
                                                        <CustomScreen maxWidth={1300}>
                                                            <div className="cart-quantity d-block d-lg-none">
                                                                <UpSmallScreen>
                                                                    <h5>{translate("general.quantity")}</h5>
                                                                </UpSmallScreen>
                                                                {this.renderNumberPicker(quotationItem)}
                                                            </div>
                                                        </CustomScreen>
                                                        <div className="cart-product-price">
                                                            <p className="price">{quotationItem.products.salesPrice} <span>{translate("general.currency")}</span></p>
                                                        </div>
                                                        <div className="cart-actions">
                                                            <Button
                                                                onClick={this.handleAddToCart.bind(this, quotationItem)}
                                                                isReverseOrder
                                                                type="button"
                                                                className="btn btn-primary"
                                                                text={translate("product.buttons.addToCart")}
                                                                icon="icon-cart" />
                                                        </div>
                                                    </div>
                                                    <CustomScreen minWidth={1300}>
                                                        <div className="col-md-3">
                                                            <div className="cart-quantities d-none d-lg-block">
                                                                <h5>{translate("general.quantity")}</h5>
                                                                {this.renderNumberPicker(quotationItem)}
                                                            </div>
                                                        </div>
                                                    </CustomScreen>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {dialog}
                </Fragment>

        )
    }
}

export default withRouter(ListGroupCollapse);
