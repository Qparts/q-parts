import React, { Component} from 'react';
import { getTranslatedObject } from '../../../utils';
import { handleImageFallback } from '../../../utils';
import { right } from '../../../utils';
import { getLength } from '../../../utils/array';
import Stars from 'react-stars';
import * as constant from '../../../constants';
import _ from 'lodash';

import { isAuth } from '../../../utils'
import { withRouter, Redirect } from 'react-router-dom';
import { MediumScreen, SmallScreen } from '../../../components/Device';

import Login from "../../Authentication/Login/Login";
import Title from '../../../components/UI/Title';

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }
  componentDidMount() {
    this.setState({
      data: this.props.data
    })
  }
  continueShoppingMoblile = () => {
    const { match: { params } } = this.props
    this.props.history.push({
      pathname: `/products/${params.productId}`,
    })
  }
  continueShopping = (values) => {
    values.preventDefault();
    this.props.togglePopup();
  }
  handleSubmit = values => {
    values.preventDefault();
    if (isAuth(this.props.token)) {
      this.props.history.push('/checkout');
    } else {
      this.props.history.push('/login')
    }
  }

  getbackground = () => {
    if (window.innerWidth <= 767) {
      return {
        background: constant.colors.basicWhite
      }
    } else 
    return {
      background: ''
    }
  }

  render() {
    if (_.isEmpty(this.props.data)) return <Redirect to="/" />

    const { translate, currentLanguage } = this.props;

    return <section id="AddProduct" className="container-fluid">
      <SmallScreen>
        <Title number={this.props.data.quantity} header={translate("dialog.addToCart.title")} />
      </SmallScreen>
      <form className="row">
        <div className="row item">
          <img
            src={this.props.data.image}
            onError={handleImageFallback}
            alt=""
          />
          <div className="text-item">
            <div>
              <span className="product-item_desc">{this.props.data.desc}</span>
            </div>
            <div>
              <span className="product-Name">{translate("general.by")}</span>
              <span className="product-Name">{getTranslatedObject(this.props.data.brand, currentLanguage, 'name', 'nameAr')}</span>
              <span className="product-Number"> {this.props.data.productNumber} </span>
              <div className="product-rate">
                <Stars values={this.props.data.averageRating} {...constant.starsRating} />
                {getLength(this.props.data.reviews)} {translate("product.reviews")}
              </div>
            </div>
            <div >
              <span className="product-price">{this.props.data.salesPrice.toFixed(2)}</span>
              <sub className="product-price-sr">{translate("general.currency")}</sub>
            </div>
            <div>
              <span className="product-quantity">{translate("general.quantity")}: {this.props.data.quantity} </span>
            </div>
          </div>
        </div>
        <div style={this.getbackground()} className="btn-primary col-9"><span>{translate("general.subtotal")} ({this.props.data.quantity} {translate("dialog.addToCart.items")})</span></div>
        <div style={this.getbackground()} className="btn-primary sale-price col-2">
          <p>{this.props.data.salesPrice.toFixed(2)}<sub>{translate("general.currency")}</sub></p>
        </div>

        <div className="btn-footer col-12">
          <div className="group-shadow-input group-shadow-div"></div>
          <MediumScreen>
            <button className="btn btn-primary" onClick={this.continueShopping}>{translate("general.buttons.continueShopping")}</button>
            <button onClick={this.handleSubmit} className="btn check-out">{translate("general.buttons.checkout")}<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
          </MediumScreen>
          <SmallScreen>
            <button style={this.getbackground()} className="btn btn-primary" onClick={this.continueShoppingMoblile}>{translate("general.buttons.continueShopping")}</button>
            <button onClick={this.handleSubmit} className="btn check-out">{translate("general.buttons.checkout")}<i className={`icon-arrow-${right(this.props.direction)}`} /></button>
          </SmallScreen>
        </div>
      </form>
    </section>
  }
}

const withAddProduct = withRouter(AddProduct);

export default withAddProduct;
