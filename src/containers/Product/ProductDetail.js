import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-images';
import { Field, reduxForm, getFormValues } from 'redux-form';
import NumberPicker from '../../components/UI/NumberPicker';
import Button from '../../components/UI/Button';
import Link from '../../components/UI/Link';
import RenderField from '../../components/RenderField/RenderField';
import RenderRating from '../../components/RenderRating/RenderRating';
import RenderProducts from '../../components/RenderProducts/RenderProducts';
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import CustomerService from '../../components/CustomerService/CustomerService';
import { addToCart } from '../../actions/cartAction';
import { addRecentViewedProducts, addWishlist, modalAddToCart } from '../../actions/customerAction';
import Stars from 'react-stars';
import moment from 'moment';
import {
  Card, CardBody,
  CardTitle, ListGroupItem, ListGroup
} from 'reactstrap';

import * as validations from '../../utils';
import { handleImageFallback } from '../../utils';
import { right } from '../../utils';
import _ from 'lodash';
import parse from 'html-react-parser';

//dialog
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddProduct from "./AddProductPopup/AddProduct"

//Router
import PrivateRoute from '../../components/PrivateRoute/index.js'
import { Switch, Route } from 'react-router-dom';

import * as constant from '../../constants';
import { colors } from '../../constants';
import { styles as commonStyles } from '../../constants';
import { getLength } from '../../utils/array';
import { fontSize } from '../../utils/font';
import { MediumScreen, SmallScreen } from '../../components/Device';
import { ClipLoader } from 'react-spinners';
import { getProduct } from '../../utils/api';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lightboxIsOpen: false,
      canWriteReview: false,
      currentImage: 0,
      relatedProduct: [
        {
          id: 3,
          image: 'https://www.n7autoparts.com/photos/We-Source--Supply/Car%20Parts%20Image%206.jpg',
          name: 'This is from offers',
          manufacturers: 'ACDelco',
          reviews: [],
          price: 100
        },
        {
          id: 4,
          image: 'https://www.n7autoparts.com/photos/We-Source--Supply/Car%20Parts%20Image%206.jpg',
          name: 'This is based on your recent views',
          manufacturers: 'ACDelco',
          reviews: [],
          price: 100
        }
      ],
      dialogType: 'addProduct',
      data: [],
      auth: false,
      modal: true,
      loading: true,
      product: {}
    }

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
    switch (dialogType) {
      case 'addProduct':
        return {
          header:
            <span><span>{this.state.data.quantity} Item</span> Added To Cart</span>
        }
      default:
        break;
    }
  }

  getDialogComponent = () => {
    const { dialogType } = this.state;

    switch (dialogType) {
      case 'addProduct':
        return <AddProduct data={this.state.data} direction={this.props.direction} modalAddToCart={this.props.modalAddToCart} token={this.props.token} togglePopup={this.togglePopup} />
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
  }
  componentWillMount() {
    getProduct(this.props)
      .then(res => {
        this.setState({
          data: res.data
        })
      })
    this.props.modalAddToCart(false);
  }

  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false,
    });
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
      this.props.history.push({
        pathname: `/products/${params.productId}/AddProduct`,
        state: { data: item }
      })
    }
  }

  submitReview = ({ review, rating }) => {
    const { firstName, lastName } = this.props.customer;
    this.setState({
      canWriteReview: false
    });
  }

  showLightbox = () => {
    this.setState({
      lightboxIsOpen: true,
    });
  }

  handleWriteReview = (canWriteReview) => {
    this.setState({
      canWriteReview
    });
  }

  goToProduct = (product, event) => {
    this.props.addRecentViewedProducts(product);
    this.props.history.push(`/products/${product.id}`);
  }

  handleAddWishlist = () => {
    const newDate = moment();
    const { quantity } = this.props.formValues;
    const item = { ...this.state.product, quantity, created: newDate };

    this.props.addWishlist(item);
  }

  renderSpecs = (isList = false) => {
    const { specs } = this.state.product;
    let Component = isList ? ListGroupItem : Fragment;

    if (specs.length < 1) return <div>
      <span>no spec for this product</span>
    </div>

    else {
      const key = this.props.currentLanguage === constant.EN ? 'specKey' : 'specKeyAr';
      const value = this.props.currentLanguage === constant.EN ? 'specValue' : 'specValueAr';
      return <div>
        {
          specs.map((item, idx) => (
            <Component key={idx}>
              <span className="specs-key">{item[key]}:</span>
              <span className="specs-value">{item[value]}</span>
            </Component>
          ))
        }
      </div>

    }
  }

  renderTopRow = () => {
    const { product } = this.state;
    return <div className="row group-header-opacity_second">
      <div className="col-9 pt-18">
        <span className="product-item_desc">{product.desc}</span>
        <div className="product-item_manufacturer">
          <span>By</span>
          <span>{product.brand.name}</span>
          <span>{product.productNumber}</span>
        </div>
      </div>
      <div className="col-3 btn btn-wishlist pt-18">
        <Link to="#" className="isDisabled btn btn-primary" icon="icon-heart" />
      </div>
    </div>
  }

  goToNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  }

  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  }

  render() {
    const styles = {
      averageRating: {
        fontFamily: 'Roboto',
        fontSize: fontSize(20),
        color: colors.basicBlack,
        fontWeight: 'normal',
      },
      averageRatingCard: {
        paddingBottom: this.state.canWriteReview ? '50px' : 'inherit'
      },
      customerReviews: {
        div: {
          display: 'flex',
          justifyContent: 'space-between',
        },
        name: {
          fontFamily: 'Roboto',
          fontSize: fontSize(17),
          fontWeight: 'normal',
        },
        text: {
          fontSize: fontSize(13),
          fontWeight: 'normal',
        },
        date: {
          opacity: '0.5',
          fontFamily: 'Roboto',
          fontSize: fontSize(13),
          fontWeight: 'normal',
          color: colors.lighterGrey,
        }
      },
      productReviews: {
        btnLinkParent: {
          float: this.state.canWriteReview ? 'none' : right(this.props.direction)
        }
      },
      loading: {
        textAlign: 'center'
      }
    };
    const { translate, match: { params } } = this.props;
    const { product } = this.state;
    const compareHeaders = [
      translate("compareProduct.prices"),
      translate("compareProduct.customerRating.title")
    ];
    const dialog = (
      <Modal contentClassName="container-fluid" className="product-checkout_popup" isOpen={this.props.isModalAddToCart} toggle={this.togglePopup}>
        <ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
        <ModalBody>
          {this.getDialogComponent()}
        </ModalBody>
      </Modal>
    );
    const renderRelatedProduct = <Fragment>
      <MediumScreen>
        <RenderProducts
          cardClass="border related-products"
          imageClass="img-container"
          isListView={true}
          className="product-related_list"
          header={translate("product.related")}
          products={this.props.products}
          goToProduct={this.goToProduct} />
      </MediumScreen>
      <SmallScreen>
        <RenderProducts
          isListView={false}
          className="product-related_list"
          header={translate("product.related")}
          products={this.props.products}
          goToProduct={this.goToProduct} />
      </SmallScreen>
    </Fragment>

    const renderRecentProduct = <Fragment>
      <RenderProducts
        isListView={false}
        className="product-recent-viewed_list"
        header={translate("offers.recommendation.recentViewed")}
        products={this.props.products}
        goToProduct={this.goToProduct} />
    </Fragment>
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
      <Switch>
        <Route path={'/products/:productId'} exact >
          <section id="product">
            <div className="component-background">
              <div className="container-fluid">
                <MediumScreen>
                  <div className="row top-row">
                    <div className="col-5 group-header-opacity_first">
                      <div className="btn btn-back">
                        <Link to="#" className="btn btn-primary" text={"back"} icon="icon-back" isReverseOrder />
                      </div>
                    </div>
                    <div className="col-7">
                      {this.renderTopRow()}
                    </div>
                  </div>
                </MediumScreen>
                <form className="row" onSubmit={this.props.handleSubmit(this.submit)}>
                  {
                    product && <Fragment>
                      <div className="col-12 col-md-5 product-item_image">
                        <img
                          style={commonStyles.cursor}
                          src={product.image}
                          onClick={this.showLightbox}
                          onError={handleImageFallback}
                          alt=""
                        />
                        {/* <Lightbox
                          currentImage={this.state.currentImage}
                          images={[{ src: "/img/product-4.jpg" }, { src: "/img/product-3.jpg" }]}
                          isOpen={this.state.lightboxIsOpen}
                          onClose={this.closeLightbox}
                          onClickNext={this.goToNext}
                          onClickPrev={this.gotoPrevious}
                        /> */}
                      </div>
                      <div className="col-12 col-md-7">
                        <div className="product-item_detail">
                          <div className="row">
                            <SmallScreen>
                              <div className="col-12">
                                {this.renderTopRow()}
                              </div>
                            </SmallScreen>
                            <div className="col-12 product-review_list">
                              <Stars value={getLength(product.reviews)} {...constant.starsRating} />
                              <span>{getLength(product.reviews)} review</span>
                            </div>

                            <div className="col-12 product-item_sales-price">
                              <span>{product.salesPrice.toFixed(2)}</span>
                              <span>SR</span>
                            </div>
                            <div className="col-12">
                              <span className="h-seperator" />
                            </div>
                            <div className="col-12 product-item_specs">
                              <span>Specifications</span>
                              {this.renderSpecs()}
                            </div>
                            <div className="col-12 d-flex product-item_buttons">
                              <Field
                                type="text"
                                name="quantity"
                                component={NumberPicker}
                              />
                              <Button
                                type="submit"
                                className="btn btn-primary"
                                text={translate("product.buttons.addToCart")}
                                icon="icon-cart" />
                            </div>
                            <div className="col-12 product-item_detail_footer">
                              <span className="h-seperator" />
                              <CustomerService
                                messages={["Have a Question? Ask a Specialis, In-House Experts.", "We know our products"]}
                                url="" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  }
                </form>
                <div className="row">
                  <div className="col-12 col-md-8">
                    <div className="row">
                      <div className="col-12 product-details">
                        <h4>{translate("product.detail")}</h4>
                        <Card className="border">
                          <CardBody>
                            <CardTitle>
                              {parse(_.isNull(product.details) ? "" : product.details)}
                            </CardTitle>
                            <ListGroup className="product-details-specs">
                              {this.renderSpecs(true)}
                            </ListGroup>
                          </CardBody>
                        </Card>
                      </div>
                      <div className="col-12 product-reviews">
                        <h4>{translate("product.titleReviews")}</h4>
                        <Card style={styles.averageRatingCard} className="border average-rating-card">
                          <div className="average-rating">
                            <div className="average-rating_header">
                              <div className="sm-block">
                                <div className="d-flex">
                                  <Stars className="average-rating_stars" value={product.averageRating} {...constant.starsRating} />
                                  <span style={styles.averageRating}>{`${product.averageRating} ${translate("product.ratingRange")} 5`}</span>
                                </div>
                                <div className="average-rating_count">
                                  <span>{getLength(product.reviews)}</span>
                                  <span>{translate("product.reviews")}</span>
                                </div>
                              </div>
                            </div>
                            <div style={styles.productReviews.btnLinkParent} className="btn-link_parent">
                              <span className={this.state.canWriteReview ? "h-seperator" : "sm-seperator"} />
                              <Link
                                to="#"
                                style={this.state.canWriteReview ? commonStyles.hide : commonStyles.show}
                                className="btn-add_review"
                                text={translate("product.writeReview.title")}
                                onClick={this.handleWriteReview.bind(this, true)}
                                icon={`icon-arrow-${right(this.props.direction)}`} />
                              {
                                this.state.canWriteReview && <form onSubmit={this.props.handleSubmit(this.submitReview)}>
                                  <div className="review-form_header">
                                    <span>{translate("product.writeReview.title")}</span>
                                    <Field
                                      name="rating"
                                      cancel={false}
                                      component={RenderRating}
                                      validate={[validations.required]}
                                    />
                                  </div>
                                  <div className="group-shadow-input group-shadow-div">
                                    <Field
                                      name="review"
                                      component={RenderField}
                                      type="text"
                                      placeholder={translate("product.writeReview.placeholder")}
                                      validate={[validations.required]} />
                                    <div className="group-buttons">
                                      <Button
                                        type="reset"
                                        className="btn btn-secondary"
                                        text={translate("product.writeReview.cancel")}
                                        onClick={this.handleWriteReview.bind(this, false)} />
                                      <Button
                                        type="submit"
                                        className="btn btn-primary"
                                        text={translate("product.writeReview.sumbit")} />
                                    </div>
                                  </div>
                                </form>
                              }
                            </div>
                          </div>
                        </Card>
                        <Card className="border customers-reviews-card">
                          <ListGroup>
                            {
                              product.reviews.map((review, idx) => {
                                return <ListGroupItem>
                                  <div className="customers-reviews" style={styles.customerReviews.div} key={idx}>
                                    <div className="d-flex flex-row">
                                      <div>
                                        <span className="user-img">
                                          <img alt="user" src="/img/user.svg" />
                                        </span>
                                      </div>
                                      <div>
                                        <span style={styles.customerReviews.name}>{review.customerName}</span>
                                        <Stars value={review.rating} {...constant.starsRating} />
                                        <span style={styles.customerReviews.text}>{review.text}</span>
                                      </div>
                                    </div>
                                    <div>
                                      <span style={styles.customerReviews.date}>{moment(review.created).format('MM/DD/YYYY')}</span>
                                    </div>
                                  </div>
                                </ListGroupItem>
                              })
                            }
                          </ListGroup>
                        </Card>
                      </div>
                      <div className="col-12 q-hide-small">
                        {!_.isEmpty(this.state.relatedProduct) && renderRecentProduct}
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-4" style={{ display: "none" }}>
                    {!_.isEmpty(this.state.relatedProduct) && renderRelatedProduct}
                  </div>
                  <div className="col-12 q-display-small">
                    {!_.isEmpty(this.state.relatedProduct) && renderRecentProduct}
                  </div>
                </div>
                {dialog}
              </div>
            </div>
          </section>
        </Route>
        <PrivateRoute
          path={'/products/:productId/AddProduct'}
          component={AddProduct}
          exact
          fakeAuth={this.state.auth}
          redirectTo="/" />
      </Switch >
    );
  }
}

const mapStateToProps = state => {
  return {
    initialValues: { quantity: 1 },
    products: state.api.products,
    recentViewedProducts: state.customer.recentViewedProducts,
    customer: state.customer.detail,
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
