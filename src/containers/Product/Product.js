import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Lightbox from 'react-images';
import { Field, reduxForm, getFormValues } from 'redux-form';
import { Rating } from 'primereact/components/rating/Rating';
import NumberPicker from '../../components/UI/NumberPicker';
import Button from '../../components/UI/Button';
import { addToCart } from '../../actions/cartAction';
import { addRecentViewedProducts, addWishlist } from '../../actions/customerAction';
import CompareProducts from '../../components/CompareProducts/CompareProducts';
import RenderField from '../../components/RenderField/RenderField';
import RenderRating from '../../components/RenderRating/RenderRating';
import RecentViewedProducts from '../../components/RecentViewedProducts/RecentViewedProducts';
import { getTranslate } from "react-localize-redux";
import moment from 'moment';

import * as validations from '../../utils';
import _ from 'lodash';

import './Product.css';
import * as constant from '../../constants';
import { styles } from '../../constants';

class Product extends Component {
  constructor(props) {
    const { match: { params: { productId } }, products } = props;
    super(props);
    this.state = {
      lightboxIsOpen: false,
      product: products.find(product => product.id === parseInt(productId, constant.RADIX)),
      canWriteReview: false,
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

  componentDidUpdate(prevProps, prevState) {

    const { match: { params: { productId } }, products } = this.props;
    const nextProductId = prevProps.match.params.productId;

    if (nextProductId !== productId) {
      this.setState({
        product: products.find(product => product.id === parseInt(productId, constant.RADIX))
      })
    }
  }

  closeLightbox = () => {
    this.setState({
      lightboxIsOpen: false,
    });
  }

  submit = ({ quantity }) => {
    const item = { ...this.state.product, quantity };

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
    const item = { ...this.state.product, quantity, created: newDate };

    this.props.addWishlist(item);
  }

  render() {
    const { translate } = this.props;
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
              <p>{product.desc}</p>
              <p>{product.manufacturers}</p>
            </div>
          </Fragment>
        })
      }
    </div>

    return (
      <div className="Product-container">
        <form onSubmit={this.props.handleSubmit(this.submit)}>
          {
            this.state.product && <div className="Product-item">
              <img
                style={styles.cursor}
                src={this.state.product.image}
                onClick={this.showLightbox}
                alt=""
              />
              <Lightbox
                images={[{ src: this.state.product.image }]}
                isOpen={this.state.lightboxIsOpen}
                onClose={this.closeLightbox}
              />
              <div className="Product-item_detail">
                <p>{this.state.product.desc}</p>
                <p>{this.state.product.manufacturers}</p>
                <p>{`${this.state.product.salesPrice.toFixed(2).toString()} SR`}</p>
                <div className="Product-item_buttons">
                  <Field
                    name="quantity"
                    component={NumberPicker}
                  />
                  <Button type="submit" className="btn btn-secondary" text={translate("product.buttons.addToCart")} />
                  <i style={styles.cursor} className="far fa-heart fa-3x" onClick={this.handleAddWishlist}></i>
                </div>
              </div>
            </div>
          }
        </form>
        <h4>{translate("product.compare")}</h4>
        <CompareProducts
          headers={compareHeaders}
          products={this.props.products}
          goToProduct={this.goToProduct}
          reviewText={translate("compareProduct.customerRating.review")} />
        <div>
          {!_.isEmpty(this.state.relatedProduct) && renderRelatedProduct}
          <h4>{translate("product.detail")}</h4>
          {
            this.state.product && <div className="Product-item">
              <p>{this.state.product.description}</p>
            </div>
          }
          <div>
            {/* <h4>{translate("product.reviews")}({this.state.product.reviews.length})</h4> */}
            <div className="Product-reviews_header">
              <Rating value={5} readonly cancel={false} />
              <p style={styles.rightSpace}>{`${translate("product.rating")}: 5 ${translate("product.ratingRange")} 5`}</p>
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
          {/* {
      this.state.product.reviews.map((review, idx) => {
       return <div key={idx}>
        <div className="Product-reviews">
         <p>{review.reviewer}</p>
         <p style={styles.rightSpace}>{review.date}</p>
        </div>
        <div className="Product-reviews">
         <Rating value={review.rating} readonly cancel={false} />
         <p style={styles.rightSpace}>{`${translate("product.rating")}: ${review.rating} ${translate("product.ratingRange")} 5`}</p>
        </div>
        <p style={styles.grey}>{review.detail}</p>
        <hr />
       </div>
      })
     } */}
        </div>
        <RecentViewedProducts
          title={translate("product.recentViewed")}
          products={this.props.recentViewedProducts}
          goToProduct={this.goToProduct} />
      </div>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
    addWishlist: (product) => dispatch(addWishlist(product))
  }
}

Product = reduxForm({
  form: 'Product'
})(Product)

export default connect(mapStateToProps, mapDispatchToProps)(Product);