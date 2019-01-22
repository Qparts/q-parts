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

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.setState({
      data: this.props.data
    })
  }
  render() {
    const dataMobile = this.props;
    const width = window.innerWidth;
    return (
      <Fragment>
        {width > 992 ? (
          <section id="AddProduct" className="container-fluid">
            <form className="row" onSubmit={this.props.handleSubmit}>
              <div className="vehicle-information col-12">
                <p> Vehicle Information </p>
                <div className="row">
                  <div className="form-group">
                    <div className="first-formGroup">
                      <Field
                        boxShadow={true}
                        name="year"
                        component={SelectInput}
                        options={['1', '2']}
                        placeholder="Select Year"
                        validate={[validations.required]} />
                    </div>
                  </div>
                  <div className="form-group">
                    <Field
                      name="make"
                      component={SelectInput}
                      options={[{ label: '1', value: '2' }]}
                      placeholder="Select Make"
                      validate={[validations.required]} />
                  </div>
                  <div className="form-group">
                    <Field
                      name="modla"
                      component={SelectInput}
                      options={[1, 2]}
                      placeholder="Select Modal"
                      validate={[validations.required]} />
                  </div>
                  <div className="col-md-3 div-last-rounded m-sm">
                    <Field
                      name="vin"
                      placeholder="Vin Number or Vehicle ID image"
                      component={RenderField}
                      type="text"
                      validate={[validations.vin, validations.match17Digits, validations.allUpperCase]} />
                    <Field
                      name="vinImage"
                      component={RenderFileInput}
                      image='image'
                    />
                  </div>
                </div>
              </div>

              {this.props.data ? (<div className="row item">
                <img
                  src={"/img/product-4.jpg"}
                  alt=""
                />
                <div className="text-item">
                  <div>
                    <span className="product-item_desc">{this.props.data.desc}</span>
                  </div>
                  <div style={{ display: 'inline-block' }}>
                    <span className="product-Name">By</span>
                    <span className="product-Name"> {this.props.data.manufacturer.name} </span>
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
                <div className="group-shadow-input"></div>
                <button className="check-out w3-right">Check Out<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
                <button className="btn-primary w3-right">Continue Shopping</button>
              </div>
            </form>
          </section>
        ) : (
            <section id="AddProduct-mobile" className="container-fluid">
              <div id="product" className="container-fluid">
                <div className="title">

                  <p><span><i className="icon-heart" />{dataMobile.location.state.data.quantity} Item </span>Added To Cart</p>
                </div>
                <form onSubmit={this.props.handleSubmit}>
                  <div className="row">
                    <div className="vehicle-information col-12">
                      <p > Vehicle Information </p>
                      <div>
                        <div className="form-group ">
                          <div className="first-formGroup">
                            <Field
                              boxShadow={true}
                              name="year"
                              component={SelectInput}
                              options={['1', '2']}
                              placeholder="Select Year"
                              validate={[validations.required]} />
                          </div>
                        </div>
                        <div className="form-group">
                          <Field
                            name="make"
                            component={SelectInput}
                            options={[{ label: '1', value: '2' }]}
                            placeholder="Select Make"
                            validate={[validations.required]} />
                        </div>
                        <div className="form-group">
                          <Field
                            name="modla"
                            component={SelectInput}
                            options={[1, 2]}
                            placeholder="Select Modal"
                            validate={[validations.required]} />
                        </div>
                      </div>
                      <div className="col-md-12 div-last-rounded m-sm">
                        <Field
                          name="vin"
                          placeholder="Vin Number or Vehicle ID image"
                          component={RenderField}
                          type="text"
                          validate={[validations.vin, validations.match17Digits, validations.allUpperCase]} />
                        <Field
                          name="vinImage"
                          component={RenderFileInput}
                          image='image'
                        />
                      </div>
                    </div>
                    <div className="row item">
                      <img
                        src={"/img/product-4.jpg"}
                        alt=""
                      />
                      <div className="text-item">
                        <div className="col-12">
                          <span className="product-item_desc">{dataMobile.location.state.data.desc}</span>
                          <div className="product-item_manufacturer">
                            <span className="product-Name"> <b>{dataMobile.location.state.data.manufacturer.name}</b> </span>
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
                    <button className="continue ">Continue Shopping</button>
                    <button className="check-out">Check Out<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
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
export default AddProduct;
