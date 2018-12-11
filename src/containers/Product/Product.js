import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-images';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { Rating } from 'primereact/components/rating/Rating';
import NumberPicker from '../../components/UI/NumberPicker';
import Button from '../../components/UI/Button';
import CompareProducts from '../../components/CompareProducts/CompareProducts';
import RenderField from '../../components/RenderField/RenderField';
import RenderRating from '../../components/RenderRating/RenderRating';
import RecentViewedProducts from '../../components/RecentViewedProducts/RecentViewedProducts';
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import CustomerService from '../../components/CustomerService/CustomerService';
import { addToCart } from '../../actions/cartAction';
import { getProduct } from '../../actions/apiAction';
import { addRecentViewedProducts, addWishlist } from '../../actions/customerAction';
import Stars from 'react-stars';
import moment from 'moment';

import * as validations from '../../utils';
import _ from 'lodash';

import * as constant from '../../constants';
import { styles } from '../../constants';
import { getLength } from '../../utils/array';

class Product extends Component {
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
      ]
    }
  }

  componentDidMount = () => {
    const { match: { params } } = this.props

    this.props.getProduct(params.productId)
  }

  componentDidUpdate(prevProps, prevState) {
    const { match: { params: { productId } }, products } = this.props;
    const nextProductId = prevProps.match.params.productId;

    if (nextProductId !== productId) {
      this.props.getProduct(productId);
    }
  }

  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false,
    });
  }

  submit = ({ quantity }) => {
    const item = { ...this.props.product, quantity };

    this.props.addToCart(item);

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
    const item = { ...this.props.product, quantity, created: newDate };

    this.props.addWishlist(item);
  }

  renderSpecs = () => {
    // const keys = this.props.currentLanguage === constant.EN ?
    //   Object.keys(this.props.product.specs) : Object.keys(this.props.product.specsAr);
    // const specs = this.props.currentLanguage === constant.EN ?
    //   this.props.product.specs : this.props.product.specsAr;
    // return (
    //   <Fragment>
    //     {
    //       keys.map((key, idx) => (
    //         <div key={idx} className="Product-item_specs">
    //           <span>{key}</span>:
    //             <span style={styles.rightSpace}>{specs[key]}</span>
    //         </div>
    //       ))
    //     }
    //   </Fragment>
    // )
    return <div>
      <span className="specs-key">Tire Type:</span>
      <span className="specs-value">Truck / SUV</span>
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
    const { translate, product } = this.props;
    const compareHeaders = [
      translate("compareProduct.prices"),
      translate("compareProduct.customerRating.title")
    ]
    const renderRelatedProduct = <div>
      <h4>{translate("product.related")}</h4>
      {
        this.state.relatedProduct.map((product, idx) => {
          return <Fragment key={idx}>
            <div style={styles.cursor} className="Product-related_products" onClick={this.goToProduct.bind(this, product)}>
              <img src={product.image} alt="" />
              <span>{product.desc}</span>
              <span>{product.manufacturers}</span>
            </div>
          </Fragment>
        })
      }
    </div>

    if (_.isEmpty(this.props.product)) return null;

    return (
      <section id="product">
        <div className="component-background">
          <div className="container-fluid">
            <form className="row" onSubmit={this.props.handleSubmit(this.submit)}>
              {
                this.props.product && <Fragment>
                  <div className="col-5 product-item_image">
                    <img
                      style={styles.cursor}
                      src={"/img/product-4.jpg"}
                      onClick={this.showLightbox}
                      alt=""
                    />
                    <Lightbox
                      currentImage={this.state.currentImage}
                      images={[{ src: "/img/product-4.jpg" }, { src: "/img/product-3.jpg" }]}
                      isOpen={this.state.lightboxIsOpen}
                      onClose={this.closeLightbox}
                      onClickNext={this.goToNext}
                      onClickPrev={this.gotoPrevious}
                    />
                  </div>
                  <div className="col-7 product-item_detail">
                    <div className="row">
                      <div className="col-9">
                        <span className="product-item_desc">{product.desc}</span>
                        <div className="product-item_manufacturer">
                          <span>By</span>
                          <span>{product.manufacturer.name}</span>
                          <span>{product.productNumber}</span>
                        </div>

                      </div>
                      <div className="col-3 btn-wishlist">
                        <Button className="btn-primary" icon="icon-heart" />
                      </div>
                      <div className="col-12 product-review">
                        <Stars values={product.averageRating} {...constant.starsRating} />
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
                          name="quantity"
                          component={NumberPicker}
                        />
                        <Button
                          type="submit"
                          className="btn-primary"
                          text={translate("product.buttons.addToCart")}
                          icon="icon-cart" />
                      </div>
                      <div className="col-12">
                        <span className="h-seperator" />
                      </div>
                    </div>
                  </div>
                </Fragment>
              }
            </form>
            <CustomerService
              messages={["Have a Question? Ask a Specialis, In-House Experts.", "We know our products"]}
              url="" />
            {/* <h4>{translate("product.compare")}</h4> */}
            {/* <CompareProducts
          headers={compareHeaders}
          products={this.props.products}
          goToProduct={this.goToProduct}
          reviewText={translate("compareProduct.customerRating.review")} /> */}
            {/* <div>
          {!_.isEmpty(this.state.relatedProduct) && renderRelatedProduct}
          <h4>{translate("product.detail")}</h4>
          {
            this.props.product && <div className="Product-item">
              <span>{this.props.product.desc}</span>
            </div>
          }
          <div className="border rounded">
            {this.renderSpecs()}
          </div>
          <div>
            <h4>{translate("product.reviews")}({getLength(this.props.product.reviews)})</h4>
            <div className="Product-reviews_header">
              <Rating value={5} readonly cancel={false} />
              <p style={styles.rightSpace}>{`${translate("product.rating")}: 5 ${translate("product.ratingRange")} 5`}</span>
            </div>
            <Button style={this.state.canWriteReview ? styles.hide : styles.show} type="submit" className="btn btn-secondary" text={translate("product.writeReview.title")} onClick={this.handleWriteReview.bind(this, true)} />
            {
              this.state.canWriteReview && <form onSubmit={this.props.handleSubmit(this.submitReview)}>
                <Field
                  name="rating"
                  cancel={false}
                  component={RenderRating}
                  validate={[validations.required]}
                />
                <Field
                  name="review"
                  component={RenderField}
                  type="text"
                  placeholder={translate("product.writeReview.placeholder")}
                  validate={[validations.required]} />
                <Button type="reset" className="btn btn-light" text={translate("product.writeReview.cancel")} onClick={this.handleWriteReview.bind(this, false)} />
                <Button type="submit" className="btn btn-secondary" text={translate("product.writeReview.sumbit")} />
              </form>
            }
            <hr />
          </div>
          {
            this.props.product.reviews.map((review, idx) => {
              return <div key={idx}>
                <div className="Product-reviews">
                  <span>{review.customerName}</span>
                  <p style={styles.rightSpace}>{moment(review.created).format('MM/DD/YYYY')}</span>
                </div>
                <div className="Product-reviews">
                  <Rating value={review.rating} readonly cancel={false} />
                  <p style={styles.rightSpace}>{`${translate("product.rating")}: ${review.rating} ${translate("product.ratingRange")} ${this.props.products.averageRating}`}</span>
                </div>
                <p style={styles.grey}>{review.text}</span>
                <hr />
              </div>
            })
          }
        </div> */}
            {/* <RecentViewedProducts
          title={translate("product.recentViewed")}
          products={this.props.recentViewedProducts}
          goToProduct={this.goToProduct} /> */}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    initialValues: { quantity: 1 },
    product: state.api.product,
    recentViewedProducts: state.customer.recentViewedProducts,
    customer: state.customer.detail,
    formValues: getFormValues('Product')(state),
    translate: getTranslate(state.localize),
    currentLanguage: getActiveLanguage(state.localize).code,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
    addWishlist: (product) => dispatch(addWishlist(product)),
    getProduct: (productId) => dispatch(getProduct(productId))
  }
}

Product = reduxForm({
  form: 'Product'
})(Product)

export default connect(mapStateToProps, mapDispatchToProps)(Product);