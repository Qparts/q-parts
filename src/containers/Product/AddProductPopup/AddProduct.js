import React, { Component, Fragment } from 'react';
import { Field, reduxForm, getFormValues } from 'redux-form';
import Button from '../../../components/UI/Button';
import RenderFileInput from '../../../components/RenderFileInput/RenderFileInput';
import RenderField from '../../../components/RenderField/RenderField';
import * as validations from '../../../utils';
import { right } from '../../../utils';
import SelectInput from '../../../components/SelectInput/SelectInput';
import { getLength } from '../../../utils/array';
import Stars from 'react-stars';
import * as constant from '../../../constants';

import { isAuth } from '../../../utils'
import { withRouter } from 'react-router-dom';

import Login from "../../Authentication/Login/Login";
import { getTranslate } from 'react-localize-redux';

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
    console.log(isAuth(this.props.token))
  }
  componentDidMount() {
    this.setState({
      data: this.props.data
    })
  }
  continueShoppingMoblile = () =>{
    const { match: { params } } = this.props
    this.props.history.push({
      pathname: `/products/${params.productId}`,
    })
  }
  continueShopping = () =>{
    this.props.modalAddToCart(false);
  }
  handleSubmit = values => {
    values.preventDefault();
    if (isAuth(this.props.token)) {
      this.props.history.push('/checkout');
    } else {
      this.props.history.push('/login')
    }
	}
  render() {
    const dataMobile = this.props;
    const width = window.innerWidth;
    return (
      <Fragment>
        {width > 992 ? (
          <section id="AddProduct" className="container-fluid">
            <form className="row">
              {this.props.data ? (<div className="row item">
                <img
                  src={this.props.data.image}
                  alt=""
                />
                <div className="text-item">
                  <div>
                    <span className="product-item_desc">{this.props.data.desc}</span>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <span className="product-Name">By</span>
                    <span className="product-Name"> {this.props.data.brand.name} </span>
                    <span className="product-Number"> #{this.props.data.productNumber} </span>
                    <div className="product-rate"> <Stars values={this.props.data.averageRating} {...constant.starsRating} /></div>

                    <span className="product-reviews"> {getLength(this.props.data.reviews)} review</span>
                  </div>
                  <div >
                    <span className="product-price">{this.props.data.salesPrice.toFixed(2)}</span>
                    <sub className="product-price-sr">SR</sub>
                  </div>
                  <div>
                    <span className="product-quantity">Quantity: {this.props.data.quantity} </span>
                  </div>
                </div>
              </div>
              ) : (
                  <div>
                  </div>
                )}
              <div className="btn-primary col-10"><span className="w3-right">Subtotal ({this.props.data.quantity} items in cart)</span></div>
              <div className="btn-primary sale-price col-2-sm">{this.props.data.salesPrice.toFixed(2)}<sub>SR</sub></div>

              <div className="btn-footer col-12">
                <div className="group-shadow-input group-shadow-div"></div>
                <button onClick={this.handleSubmit} className="btn check-out w3-right">Check Out<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
                <button className="btn btn-primary w3-right" onClick={this.continueShopping}>Continue Shopping</button>
              </div>
            </form>
          </section>
        ) : (
            <section id="AddProduct-mobile" className="container-fluid">
              <div id="product" className="container-fluid">
                <div className="title">

                  <p><span><i className="icon-heart" />{dataMobile.location.state.data.quantity} Item </span>Added To Cart</p>
                </div>
                <form onSubmit={this.handleSubmit}>
                  <div className="row">
                    <div className="row item">
                      <img
                        src={dataMobile.location.state.data.image}
                        alt=""
                      />
                      <div className="text-item">
                        <div className="col-12">
                          <span className="product-item_desc">{dataMobile.location.state.data.desc}</span>
                          <div className="product-item_manufacturer">
                            <span className="product-Name"> <b>{dataMobile.location.state.data.brand.name}</b> </span>
                            <span className="product-Name"> #{dataMobile.location.state.data.productNumber} </span>
                          </div>
                        </div>
                        <div className="col-12 product-review">
                          <Stars values={dataMobile.location.state.data.averageRating} {...constant.starsRating} />
                          <span>{getLength(dataMobile.location.state.data.reviews)} review</span>
                        </div>

                        <div className="col-12 product-item_sales-price">
                          <span>{dataMobile.location.state.data.salesPrice.toFixed(2)}</span>
                          <span className="SR">SR</span>
                        </div>
                        <div className="col-12 product-quantity">
                          <span>Quantity: {dataMobile.location.state.data.quantity} </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="subTotal col-12">
                    <div className="btn-primary"><span className="w3-right">Subtotal ({dataMobile.location.state.data.quantity} items in cart)</span></div>
                    <div className="btn-primary sale-price"><span className="w3-left">{dataMobile.location.state.data.salesPrice.toFixed(2)} <sub>SR</sub></span></div>
                  </div>
                  <div className="btn-footer col-12">
                    <button className="continue" onClick={this.continueShoppingMoblile}>Continue Shopping</button>
                    <button  type="submit" className="check-out">Check Out<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
                  </div>
                </form>
              </div>
            </section>
          )}</Fragment>)
  }
}
AddProduct = reduxForm({
  form: 'AddProduct',
  enableReinitialize: true
})(AddProduct)

const mapStateToProps = state => {
  return {
    translate: getTranslate(state.localize),
  }
}
const withAddProduct = withRouter(AddProduct);

export default withAddProduct;
