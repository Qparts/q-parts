import React, { Component, Fragment, createRef } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, getFormValues } from 'redux-form';
import NumberPicker from '../../components/UI/NumberPicker';
import Button from '../../components/UI/Button';
import Link from '../../components/UI/Link';
import RenderRating from '../../components/RenderRating/RenderRating';
import RenderProducts from '../../components/RenderProducts/RenderProducts';
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import CustomerService from '../../components/CustomerService/CustomerService';
import { addToCart } from '../../actions/cartAction';
import { addRecentViewedProducts, addWishlist, modalAddToCart } from '../../actions/customerAction';
import Stars from 'react-stars';
import moment from 'moment';
import Title from "../../components/UI/Title";

import { getTranslatedObject, getTranslatedString, right, isAuth } from '../../utils';
import { handleImageFallback } from '../../utils';
import _ from 'lodash';
import parse from 'html-react-parser';

//dialog
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import AddProduct from "./AddProductPopup/AddProduct"

//Router
import PrivateRoute from '../../components/PrivateRoute/index.js'
import { Switch, Route } from 'react-router-dom';

import * as constant from '../../constants';
import { colors } from '../../constants';
import { getLength } from '../../utils/array';
import { DownLargeScreen, LargeScreen, UpSmallScreen, DownSmallScreen, MediumScreen } from '../../components/Device';
import { ClipLoader } from 'react-spinners';
import { getProduct } from '../../utils/api';
import { starsRating } from '../../constants';
import Swiper from 'react-id-swiper';
class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canWriteReview: false,
      dialogType: 'addProduct',
      data: [],
      auth: false,
      modal: true,
      loading: true,
      product: {},
      hasLeftSwiperMoved: false
    }

    this.swiperLeftHidden = createRef();
    this.recentViewed = createRef();

    getProduct(this.props)
      .then(res => {
        this.setState({
          product: res.data,
          loading: false
        });
      })
  }
  handleDialog = (dialogType, data) => {
    this.setState({
      dialogType,
      data: data
    });
    this.togglePopup();
  };

  togglePopup = () => {
    this.props.modalAddToCart(this.state.modal);
    this.setState({ modal: !this.state.modal })
  }

  getDialogProps = () => {
    const { dialogType } = this.state;
    const { translate } = this.props;
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
          currentLanguage={currentLanguage} />
      default:
        break;
    }
  }

  componentDidMount = () => {
    this.setState({
      auth: !this.state.auth
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { match: { params: { productId } } } = this.props;
    const nextProductId = prevProps.match.params.productId;

    if (nextProductId !== productId) {
      getProduct(this.props)
        .then(res => {
          this.setState({
            product: res.data,
            loading: false
          });
        })
    }

    if (this.recentViewed.current && !this.state.hasLeftSwiperMoved) {
      this.recentViewed.current.swiper.el.appendChild(this.swiperLeftHidden.current);
      this.setState({
        hasLeftSwiperMoved: true
      });
    }
  }
  componentWillMount() {
    getProduct(this.props)
      .then(res => {
        this.setState({
          data: res.data
        })
        this.props.addRecentViewedProducts(res.data);
      })
    this.props.modalAddToCart(false);
  }

  submit = ({ quantity }) => {
    //width screen
    let width = window.innerWidth;
    const item = { ...this.state.product, quantity };
    this.props.addToCart(item);
    if (width > 992) {
      this.handleDialog('addProduct', item)
    } else {
      const { match: { params } } = this.props
      this.setState({
        data: item
      });
      this.props.history.push({
        pathname: `/products/${params.productId}/addProduct`,
        state: { data: item }
      });
    }
  }

  submitReview = ({ review, rating }) => {
    const { firstName, lastName } = this.props.customer;
    this.setState({
      canWriteReview: false
    });
  }

  handleWriteReview = (canWriteReview) => {
    this.setState({
      canWriteReview
    });
  }

  handleAddWishlist = () => {
    const newDate = moment();
    const { quantity } = this.props.formValues;
    const item = { ...this.state.product, quantity, created: newDate };

    this.props.addWishlist(item);
  }

  renderSpecs = (isProductDetail = false) => {
    const { specs } = this.state.product;
    const { translate, currentLanguage } = this.props

    if (specs.length < 1) return null;

    else {
      const key = getTranslatedString(currentLanguage, 'specKey', 'specKeyAr');
      const value = getTranslatedString(currentLanguage, 'specValue', 'specValueAr');

      return (
        <Fragment>
          {
            isProductDetail && <h5>{translate("product.specs.title")}</h5>
          }
          <div className="d-table">
            {
              specs.map((item, idx) => (
                <div key={idx} className="d-table-row">
                  <div className="d-table-cell">
                    {item[key]}:
                </div>
                  <div className="d-table-cell">
                    {item[value]}
                  </div>
                </div>
              ))}
          </div>
        </Fragment>
      )
    }
  }

  getWishlistActive = () => {
    const { wishlist } = this.props;
    const { product } = this.state;
    const wishlistMatch = wishlist.find(wishlist => wishlist.id === product.id);

    return wishlistMatch ? 'active' : '';
  }

  render() {
    const styles = {
      loading: {
        textAlign: 'center'
      }
    };
    const { translate, match: { params }, direction, currentLanguage, recentViewedProducts } = this.props;
    const { product } = this.state;
    const compareHeaders = [
      translate("compareProduct.prices"),
      translate("compareProduct.customerRating.title")
    ];
    const dialog = (
      <Modal dir={direction} contentClassName="container-fluid" className="product-checkout_popup" isOpen={this.props.isModalAddToCart} toggle={this.togglePopup}>
        <ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
        <ModalBody>
          {this.getDialogComponent()}
        </ModalBody>
      </Modal>
    );

    const chatMessages = [
      translate("customerService.product.whatsApp.header"),
      translate("customerService.product.whatsApp.subHeader")
    ];


    const override = `
            border-color: ${colors.brandColor} !important;
            border-bottom-color: transparent !important;
        `;

    if (_.isEmpty(this.state.product))
      return (
        <div className="container-fluid" style={styles.loading}>
          <ClipLoader
            css={override}
            sizeUnit={"px"}
            size={150}
            loading={this.state.loading}
          />
        </div>
      )
    return (
      <section className="product-details">
        <div className="pro-main-info">
          <div className="pro-img-bg"></div>
          <div className="container-fluid">
            <div className="row">
              <nav aria-label="breadcrumb" className="col">
                <ol className="breadcrumb">
                  {/* <li className="breadcrumb-item"><a href="#">Home</a></li>
                      <li className="breadcrumb-item"><a href="#">Tyres</a></li>
                      <li className="breadcrumb-item"><a href="#">Nexen</a></li>
                      <li className="breadcrumb-item active" aria-current="page">ROADIAN AT PRO RA8</li> */}
                </ol>
              </nav>
            </div>
            <LargeScreen>
              <div className="row">
                <div className="col">
                  <header className="pro-heading">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        {/* <a href="#" className="btn back"><i className="icon-back"></i>{Back to Tyers}</a> */}
                      </div>
                      <div className="col-lg-6">
                        <div className="row">
                          <div className="col">
                            <h1>{product.desc}</h1>
                            <ul className="list-inline">
                              <li>{translate("general.by")} {getTranslatedObject(product.brand, currentLanguage, 'name', 'nameAr')}</li>
                              <li>{translate("product.number")} {product.productNumber}</li>
                            </ul>
                          </div>
                          <div className="col-auto">
                            <Link to="#" className={`btn add-fav ${this.getWishlistActive()}`} icon="icon-heart" onClick={this.handleAddWishlist} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>
                </div>
              </div>
            </LargeScreen>

            <div className="row">
              <div className="col-lg-6">
                <div className="pro-img">
                  <img alt="product Name" src={product.image} onError={handleImageFallback} />
                </div>
              </div>
              <div className="col-lg-6">
                <DownLargeScreen>
                  <header className="pro-heading ">
                    <div className="row">
                      <div className="col">
                        <h1>{product.desc}</h1>
                        <ul className="list-inline">
                          <li>{translate("general.by")} {getTranslatedObject(product.brand, currentLanguage, 'name', 'nameAr')}</li>
                          <li>{translate("product.detail")} {product.productNumber}</li>
                        </ul>
                      </div>
                      <UpSmallScreen>
                        <div className="col-auto">
                          <Link to="#" className={`btn add-fav ${this.getWishlistActive()}`} icon="icon-heart" onClick={this.handleAddWishlist} />
                        </div>

                      </UpSmallScreen>
                    </div>
                  </header>

                </DownLargeScreen>
                <ul className="list-unstyled summary">
                  <form onSubmit={this.props.handleSubmit(this.submit)}>
                    <li className="pro-review">
                      <Stars value={getLength(product.reviews)} {...constant.starsRating} />
                      <span className="review">{getLength(product.reviews)} {translate("product.reviews")}</span>
                      {/* <p>Made in Coria</p> */}
                    </li>
                    {/* <li className="availability">
                          <i className="in-icon"></i> In Stock (16) - Ships in 24 to 48 hrs
                        </li> */}
                    <li className="price">
                      <p>{product.salesPrice.toFixed(2)}<span>{translate("general.currency")}</span> {/*<label> / each</label>*/}</p>
                      {/* <p>47.6<span>{translate("general.currency")}</span> <label> / Set</label></p> */}
                    </li>
                    <li className="pro-options">
                      {this.renderSpecs(true)}
                      {parse(_.isNull(product.details) ? "" : product.details)}
                    </li>
                    <li className="add-cart row">
                      <div className="col-sm-auto col-12">
                        <h5 className="d-sm-none d-inline-block">{translate("general.quantity")}</h5>
                        <Field
                          className="col-auto"
                          type="text"
                          name="quantity"
                          component={NumberPicker}
                        />
                      </div>
                      <DownSmallScreen>
                        <div className="col-auto fav-mob">
                          <Link to="#" className={`btn add-fav ${this.getWishlistActive()}`} icon="icon-heart" onClick={this.handleAddWishlist} />
                        </div>
                      </DownSmallScreen>
                      <div className="col">
                        <Button
                          type="submit"
                          className="btn btn-primary"
                          text={translate("product.buttons.addToCart")}
                          icon="icon-cart" />
                      </div>

                    </li>
                    <li className="support">
                      <CustomerService
                        messages={chatMessages}
                        url="//wa.me/966508448856/" />
                    </li>
                  </form>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row pt-sec">
            <div className="col">
              <h2 className="details-heading">{translate("product.detail")}</h2>
              <ul className="list-unstyled pro-details">
                <li>
                  {parse(_.isNull(product.details) ? "" : product.details)}
                  {this.renderSpecs()}
                </li>
                {/* <li>
                      <h4>Features</h4>
                      <ul>
                        <li>Balanced tread compound</li>
                        <li>High performance tread  compound combined with an innovative asymmetric pattern design</li>
                        <li>Optimized tread pitch sequence</li>
                      </ul>
                    </li> */}
              </ul>
              <div className="pt-sec">
                <h2 className="details-heading">{translate("product.titleReviews")}</h2>
                <div className="list-unstyled review-details">
                  <div className="row">
                    <div className="col totla-main">
                      <Stars value={product.averageRating} {...constant.starsRating} className="star" />
                      <p className="result">{`0 ${translate("product.ratingRange")} 5`}</p>
                      <p className="review-num">
                        <span>{getLength(product.reviews)}</span>
                        <span>{translate("product.reviews")}</span>
                      </p>
                    </div>
                    <a className="apply-review col-md-auto" data-toggle="collapse" href="#addReview" role="button" aria-expanded="false" aria-controls="addReview">
                      <div className="d-flex align-items-center">
                        {translate("product.writeReview.title")} <i className={`icon-arrow-${right(direction)}`}></i>
                        <MediumScreen>
                          <Field
                            name="rating"
                            component={RenderRating}
                          />
                        </MediumScreen>
                      </div>
                    </a>
                  </div>
                  <form onSubmit={this.props.handleSubmit(this.submitReview)} className="collapse" id="addReview">
                    <div className="apply-review">
                      {translate("product.writeReview.title")}
                      <Field
                        name="rating"
                        component={RenderRating}
                      />
                    </div>
                    <div className="write-review">
                      <Field
                        className="form-control input"
                        id="exampleFormControlTextarea1"
                        rows="1"
                        name="review"
                        component="textarea"
                        placeholder={translate("product.writeReview.placeholder")} />

                      <div className="group-buttons">
                        <Button
                          type="reset"
                          className="btn btn-secondary"
                          text={translate("product.writeReview.cancel")}
                          onClick={this.handleWriteReview.bind(this, false)}
                          data-toggle="collapse"
                          data-target="#addReview"
                          aria-expanded="false"
                          aria-controls="addReview" />
                        <Button
                          type="submit"
                          className="btn btn-primary"
                          text={translate("product.writeReview.sumbit")}
                          data-toggle="collapse"
                          data-target="#addReview"
                          aria-expanded="false"
                          aria-controls="addReview" />
                      </div>
                    </div>
                  </form>
                  <ul className="users-review list-unstyled">
                    {
                      product.reviews.map((review, idx) => {
                        return <li className="media">
                          <span className="user-img">
                            <img className="default" src="/img/user.svg" />
                          </span>
                          <div className="media-body">
                            <div className="row">
                              <div className="col">
                                <h5>{review.customerName}</h5>
                                <Stars values={review.rating} {...starsRating} />
                              </div>
                              <div className="col-auto">
                                <span className="review-date">{moment(review.created).format('MM/DD/YYYY')}</span>
                              </div>
                            </div>
                            <p>{review.text}</p>
                          </div>
                        </li>
                      })
                    }
                  </ul>
                </div>
              </div>
            </div>
            <aside className="col-auto side-banner d-none d-lg-block">
              <img src="/img/160-banner.jpg" />
            </aside>
          </div>
          <div className="row pt-sec">
            <div className="col products-list">
              <h3>{translate("offers.recommendation.recentViewed")}</h3>
              <Swiper {...constant.swiperParams(direction)} ref={this.recentViewed}>
                {

                  recentViewedProducts.map((product, idx) => (
                    <RenderProducts
                      key={idx}
                      translate={translate}
                      direction={direction}
                      currentLanguage={currentLanguage}
                      isListView={false}
                      product={product} />
                  ))
                }
              </Swiper>
              <div className="swiper-left" ref={this.swiperLeftHidden} />
            </div>
            {dialog}
          </div>
        </div>

      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    initialValues: { quantity: 1 },
    products: state.api.products,
    recentViewedProducts: state.customer.recentViewedProducts,
    customer: state.customer.detail,
    wishlist: state.customer.wishlist,
    formValues: getFormValues('Product')(state),
    translate: getTranslate(state.localize),
    currentLanguage: getActiveLanguage(state.localize).code,
    direction: state.customer.direction,
    isModalAddToCart: state.customer.isModalAddToCart,
    token: state.customer.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
    addWishlist: (product) => dispatch(addWishlist(product)),
    modalAddToCart: (check) => dispatch(modalAddToCart(check)),
  }
}

ProductDetail = reduxForm({
  form: 'Product'
})(ProductDetail)

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
