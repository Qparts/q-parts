import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Stars from 'react-stars';
import * as constant from '../../constants';
import { getLength } from '../../utils/array';
import {
  Card, CardTitle, ListGroupItem, ListGroup, CardImg
} from 'reactstrap';
import Title from '../UI/Title';
import { handleImageFallback, getTranslatedObject } from '../../utils';

export default class RenderProducts extends Component {

  extras = (product) => {
    return true ? (
      <Fragment>
        <span className="seperator" />
        <span className="product-extras">Size(215/60 R17)</span>
      </Fragment>
    ) : null;
  }

  render() {
    const { product, currentLanguage, translate } = this.props
    return (
      <section className={this.props.className}>
        {
          this.props.isListView ? (
            <Fragment>
              <Card className={this.props.cardClass}>
                <CardTitle>
                  <Title header={this.props.header} />
                </CardTitle>
                <ListGroup>
                  {
                    this.props.products.map((product, idx) => (
                      <ListGroupItem key={idx}>
                        <div className={this.props.imageClass}>
                          <CardImg src="/img/product-2.jpg" alt="car image" />
                        </div>
                        <div>
                          <h5 className="product-title">{product.desc}</h5>
                          <div>
                            <span className="product-manufacturer">{product.brand.name}</span>
                            {this.extras(product)}
                          </div>
                          <div className="product-review_list">
                            <Stars values={product.averageRating} {...constant.starsRating} />
                            <span className="product-review">{getLength(product.reviews)} review</span>
                          </div>
                          <span className="product-price">{product.salesPrice.toFixed(2)}</span>
                          <span className="product-currency">SR</span>
                        </div>
                      </ListGroupItem>
                    ))
                  }
                </ListGroup>
              </Card>
            </Fragment>
          ) :
            <Fragment>
              <div>
                <Link to={`/products/${product.id}`} className="card">
                  <img onError={handleImageFallback} src={product.image} className="card-img-top" alt="no product" />
                  <div className="card-body">
                    <h5 className="card-title">{product.desc}</h5>
                    <ul className="list-inline product-info">
                      <li><strong>{getTranslatedObject(product.brand, currentLanguage, 'name', 'nameAr')}</strong></li>
                      <li>{product.number}</li>
                    </ul>
                    <div className="rating">
                      <Stars values={product.averageRating ? product.averageRating : 0} {...constant.starsRating} />
                      <span>{getLength(product.reviews)} {translate("product.reviews")}</span>
                    </div>
                    <p className="price">{product.salesPrice.toFixed(2)} <span>{translate("general.currency")}</span></p>
                  </div>
                </Link>
              </div>
            </Fragment>
        }
      </section>
    )
  }
}