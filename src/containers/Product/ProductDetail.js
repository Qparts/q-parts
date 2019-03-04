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
import { addRecentViewedProducts, addWishlist } from '../../actions/customerAction';
import Stars from 'react-stars';
import moment from 'moment';
import {
  Card, CardBody,
  CardTitle, ListGroupItem, ListGroup
} from 'reactstrap';

import * as validations from '../../utils';
import { right } from '../../utils';
import _ from 'lodash';

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
import { DownLargeScreen, LargeScreen, UpSmallScreen, DownSmallScreen } from '../../components/Device';
import { ClipLoader } from 'react-spinners';
import { getProduct } from '../../utils/api';
import {starsRating } from '../../constants';
import Swiper from 'react-id-swiper';
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
      modal: false,
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
    this.setState({
      modal: !this.state.modal
    })
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
        return <AddProduct data={this.state.data} direction={this.props.direction} />
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
        <Link to="#" className="btn btn-primary" icon="icon-heart" />
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
      <Modal contentClassName="container-fluid" className="product-checkout_popup" isOpen={this.state.modal} toggle={this.togglePopup}>
        <ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
        <ModalBody>
          {this.getDialogComponent()}
        </ModalBody>
      </Modal>
    );


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
      //related Products
  		const swiperParams = {
  			containerClass: `swiper-container products-list`,
  			slidesPerView: 5,
  			spaceBetween: 30,
  			grabCursor: true,
  			lazy: true,
  			navigation: {
  				nextEl: '.swiper-button-next',
  				prevEl: '.swiper-button-prev'
  			},
  			breakpoints: {
  				1200: {
  					slidesPerView: 4,
  					spaceBetween: 30
  				},
  				992: {
  					slidesPerView: 4,
  					spaceBetween: 15
  				},
  				768: {
  					slidesPerView: 3,
  					spaceBetween: 15
  				},
  				576: {
  					slidesPerView: 2,
  					spaceBetween: 15
  				},
  			}
  		}
    return (
      <Switch>
        <Route path={'/products/:productId'} exact >
          <section className="product-details">
            <div className="pro-main-info">
              <div className="pro-img-bg"></div>
                <div className="container-fluid">
                  <div className="row">
                    <nav aria-label="breadcrumb" className="col">
                      <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="#">Home</a></li>
                        <li class="breadcrumb-item"><a href="#">Tyres</a></li>
                        <li class="breadcrumb-item"><a href="#">Nexen</a></li>
                        <li class="breadcrumb-item active" aria-current="page">ROADIAN AT PRO RA8</li>
                      </ol>
                    </nav>
                  </div>
                  <LargeScreen>
                    <div className="row">
                      <div className="col">
                        <header className="pro-heading">
                          <div className="row">
                            <div className="col-6 d-flex align-items-center">
                              <a href="#" className="btn back"><i className="icon-back"></i>Back to Tyers</a>
                            </div>
                            <div className="col-lg-6">
                              <div className="row">
                                <div className="col">
                                  <h1>{product.desc}</h1>
                                  <ul className="list-inline">
                                    <li>By {product.brand.name}</li>
                                    <li>Product Number: # {product.productNumber}</li>
                                  </ul>
                                </div>
                                <div className="col-auto">
                                  <a href="#" className="btn add-fav"><i className="icon-heart"></i></a>
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
                        <img alt="product Name" src={product.image} />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <DownLargeScreen>
                        <header className="pro-heading ">
                          <div className="row">
                            <div className="col">
                              <h1>{product.desc}</h1>
                              <ul className="list-inline">
                                <li>By {product.brand.name}</li>
                                <li>Product Number: # {product.productNumber}</li>
                              </ul>
                            </div>
                            <UpSmallScreen>
                              <div className="col-auto">
                                <a href="#" className="btn add-fav"><i className="icon-heart"></i></a>
                              </div>

                            </UpSmallScreen>
                          </div>
                        </header>

                      </DownLargeScreen>
                      <ul className="list-unstyled summery">
                        <li className="pro-review">
                          <Stars value={getLength(product.reviews)} {...constant.starsRating} />
                          <span>{getLength(product.reviews)} review</span>
                          <p>Made in Coria</p>
                        </li>
                        <li className="availability">
                          <i className="in-icon"></i> In Stock (16) - Ships in 24 to 48 hrs
                        </li>
                        <li className="price">
                          <p>{product.salesPrice.toFixed(2)}<span>SR</span> <label> / each</label></p>
                          <p>47.6<span>SR</span> <label> / Set</label></p>
                        </li>
                        <li className="pro-options">
                          <h5>Specifications</h5>
                          <div className="d-table">
                            <div className="d-table-row">
                              <div className="d-table-cell">
                                Tire Type:
                              </div>
                              <div className="d-table-cell">
                                Truck / SUV
                              </div>
                            </div>
                            <div className="d-table-row">
                              <div className="d-table-cell">
                                Tire Size:
                              </div>
                              <div className="d-table-cell">
                                245 / 60 R18
                              </div>
                            </div>
                            <div className="d-table-row">
                              <div className="d-table-cell">
                                Speed Rating:
                              </div>
                              <div className="d-table-cell">
                                H = 130 mph
                              </div>
                            </div>
                            <div className="d-table-row">
                              <div className="d-table-cell">
                                Load Index:
                              </div>
                              <div className="d-table-cell">
                                109 = 2271 lbs/tire
                              </div>
                            </div>
                          </div>
                          <p>
                            RPX800 Tires by Radar®. Season: Summer. Type: Performance, Truck / SUV. The RPX 800/800+ is a sport touring tire that has been designed for compact and mid-size cars. This range offers drivers good control on both dry and wet roads, ensuring a comfortable driving experience. It combines real-world performance with outstanding good looks. This range incorporates most of the popular run-flat sizes in this segment.
                          </p>
                        </li>
                        <li className="add-cart row">
                          <div className="col-sm-auto col-12">
                            <h5 className="d-sm-none d-inline-block">Quantity</h5>
                            <Field
                              className="col-auto"
                              type="text"
                              name="quantity"
                              component={NumberPicker}
                            />
                          </div>
                          <DownSmallScreen>
                            <div className="col-auto fav-mob">
                              <a href="#" className="btn add-fav"><i className="icon-heart"></i></a>
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
                          <a href="#"  className="media chat-div">
              								<img src="/img/whatsapp-logo.svg" alt="whatsapp"/>
              								<div className="media-body">
              									<p>
              										<span>Have a Question?</span>
              										Ask a Specialis, In-House Experts. We know our products
              									</p>
              								</div>
              							</a>
                        </li>
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
                        <p>RPX800 Tires by Radar®. Season: Summer. Type: Performance, Truck / SUV. The RPX 800/800+ is a sport touring tire that has been designed for compact and mid-size cars. This range offers drivers good control on both dry and wet roads, ensuring a comfortable driving experience. It combines real-world performance with outstanding good looks. This range incorporates most of the popular run-flat sizes in this segment.</p>
                        <div className="d-table">
                            <div className="d-table-row">
                              <div className="d-table-cell">
                                Tire Type:
                              </div>
                              <div className="d-table-cell">
                                Truck / SUV
                              </div>
                            </div>
                            <div className="d-table-row">
                              <div className="d-table-cell">
                                Tire Size:
                              </div>
                              <div className="d-table-cell">
                                245 / 60 R18
                              </div>
                            </div>
                            <div className="d-table-row">
                              <div className="d-table-cell">
                                Speed Rating:
                              </div>
                              <div className="d-table-cell">
                                H = 130 mph
                              </div>
                            </div>
                            <div className="d-table-row">
                              <div className="d-table-cell">
                                Load Index:
                              </div>
                              <div className="d-table-cell">
                                109 = 2271 lbs/tire
                              </div>
                            </div>
                          </div>
                      </li>
                      <li>
                        <h4>Features</h4>
                        <ul>
                          <li>Balanced tread compound</li>
                          <li>High performance tread  compound combined with an innovative asymmetric pattern design</li>
                          <li>Optimized tread pitch sequence</li>
                        </ul>
                      </li>
                    </ul>
                  <div className="pt-sec">
                      <h2 className="details-heading">{translate("product.titleReviews")}</h2>
                      <div className="list-unstyled review-details">
                          <div className="row">
                            <div className="col totla-main">
                              <Stars value={product.averageRating} {...constant.starsRating} className="star"/>
                              <p className="result">{`0 ${translate("product.ratingRange")} 5`}</p>
                              <p className="review-num">
                                  <span>{getLength(product.reviews)}</span>
                                  <span>{translate("product.reviews")}</span>
                                </p>
                            </div>
                              <a class="apply-review col-md-auto" data-toggle="collapse" href="#addReview" role="button" aria-expanded="false" aria-controls="addReview">
                                <div className="d-flex align-items-center">
                                 Rate this product <i className="icon-arrow-right"></i>
                                 <Field
                                   name="rating"
                                   component={RenderRating}
                                   className="d-none d-md-block"
                                 />
                              </div>
                             </a>
                          </div>
                          <form onSubmit={this.props.handleSubmit(this.submitReview)} class="collapse" id="addReview">
                            <div className="apply-review">
                              Rate this product
                              <Field
                                name="rating"
                                component={RenderRating}
                              />
                            </div>
                            <div className="write-review">
                              <textarea class="form-control input" id="exampleFormControlTextarea1" rows="1" placeholder={translate("product.writeReview.placeholder")}>

                              </textarea>
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
                            <li className="media">
                                <span className="user-img">
                                  <img className="default" src="/img/user.svg" />
                                </span>
                                <div class="media-body">
                                  <div className="row">
                                    <div className="col">
                                      <h5>D. Finnell</h5>
                                      <Stars values={1} {...starsRating} />
                                    </div>
                                    <div className="col-auto">
                                      <span className="review-date">June 22, 2018</span>
                                    </div>
                                  </div>
                                  <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
                                </div>
                            </li>
                            <li className="media">
                                <span className="user-img">
                                  <img className="default" src="/img/user.svg" />
                                </span>
                                <div class="media-body">
                                  <div className="row">
                                    <div className="col">
                                      <h5>D. Finnell</h5>
                                      <Stars values={1} {...starsRating} />
                                    </div>
                                    <div className="col-auto">
                                      <span className="review-date">June 22, 2018</span>
                                    </div>
                                  </div>
                                </div>
                            </li>
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
  								<h3>The last thing you viewed</h3>
  								<Swiper {...swiperParams}>
  									<div>
  										<Link to="/" className="card">
  											<img src="/img/product-1.jpg" className="card-img-top" alt="..." />
  											<div className="card-body">
  												<h5 className="card-title">Air Fuel Ratio Sensor</h5>
  												<ul className="list-inline product-info">
  													<li><strong>Bosch</strong></li>
  													<li>#Part Num</li>
  												</ul>
  												<div className="rating">
  													<Stars values={1} {...starsRating} />
  													<span>0 review</span>
  												</div>
  												<p className="price">20 <span>sr</span></p>
  											</div>
  										</Link>
  									</div>
  									<div>
  										<Link to="/" className="card">
  											<img src="/img/product-2.jpg" className="card-img-top" alt="..." />
  											<div className="card-body">
  												<h5 className="card-title">8100 Synthetic Motor Oil</h5>
  													<ul className="list-inline product-info">
  														<li><strong>Motul USA</strong></li>
  														<li>#Part Num</li>
  													</ul>
  													<div className="rating">
  														<Stars values={1} {...starsRating} />
  														<span>0 review</span>
  													</div>
  												<p className="price">263 <span>sr</span></p>
  											</div>
  										</Link>
  									</div>
  									<div>
  										<Link to="/" className="card">
  											<img src="/img/product-3.jpg" className="card-img-top" alt="..." />
  											<div className="card-body">
  												<h5 className="card-title">GM Original Equipment EGR....</h5>
  													<ul className="list-inline product-info">
  														<li><strong>ACDelco</strong></li>
  														<li>#Part Num</li>
  													</ul>
  													<div className="rating">
  														<Stars values={1} {...starsRating} />
  														<span>0 review</span>
  													</div>
  												<p className="price">263 <span>sr</span></p>
  											</div>
  										</Link>
  									</div>
  									<div>
  										<Link to="/" className="card">
  											<img src="/img/product-4.jpg" className="card-img-top" alt="..." />
  											<div className="card-body">
  												<h5 className="card-title">NT05</h5>
  													<ul className="list-inline product-info">
  														<li><strong>NITTO</strong></li>
  														<li>#Part Num</li>
  													</ul>
  												<div className="rating">
  													<Stars values={1} {...starsRating} />
  													<span>0 review</span>
  												</div>
  												<p className="price">500 <span>sr</span></p>
  											</div>
  										</Link>
  									</div>
  									<div>
  										<Link to="/" className="card">
  											<img src="/img/product-4.jpg" className="card-img-top" alt="..." />
  											<div className="card-body">
  												<h5 className="card-title">NT05</h5>
  													<ul className="list-inline product-info">
  														<li><strong>NITTO</strong></li>
  														<li>#Part Num</li>
  													</ul>
  												<div className="rating">
  													<Stars values={1} {...starsRating} />
  													<span>0 review</span>
  												</div>
  												<p className="price">500 <span>sr</span></p>
  											</div>
  										</Link>
  									</div>
  									<div>
  										<Link to="/" className="card">
  											<img src="/img/product-1.jpg" className="card-img-top" alt="..." />
  											<div className="card-body">
  												<h5 className="card-title">Air Fuel Ratio Sensor</h5>
  												<ul className="list-inline product-info">
  													<li><strong>Bosch</strong></li>
  													<li>#Part Num</li>
  												</ul>
  												<div className="rating">
  													<Stars values={1} {...starsRating} />
  													<span>0 review</span>
  												</div>
  												<p className="price">20 <span>sr</span></p>
  											</div>
  										</Link>
  									</div>
  									<div>
  										<Link to="/" className="card">
  											<img src="/img/product-4.jpg" className="card-img-top" alt="..." />
  											<div className="card-body">
  												<h5 className="card-title">NT05</h5>
  													<ul className="list-inline product-info">
  														<li><strong>NITTO</strong></li>
  														<li>#Part Num</li>
  													</ul>
  												<div className="rating">
  													<Stars values={1} {...starsRating} />
  													<span>0 review</span>
  												</div>
  												<p className="price">500 <span>sr</span></p>
  											</div>
  										</Link>
  									</div>
  								</Swiper>
  								<div className="swiper-left"></div>
  							</div>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
    addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
    addWishlist: (product) => dispatch(addWishlist(product)),
  }
}

ProductDetail = reduxForm({
  form: 'Product'
})(ProductDetail)

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
// <div id="product">
//   <div className="component-background">
//     <div className="container-fluid">
//         <MediumScreen>
//           <div className="row top-row">
//             <div className="col-5 group-header-opacity_first">
//               <div className="btn btn-back">
//                 <Link to="#" className="btn btn-primary" text={"back"} icon="icon-back" isReverseOrder />
//               </div>
//             </div>
//             <div className="col-7">
//               {this.renderTopRow()}
//             </div>
//           </div>
//         </MediumScreen>
//         <form className="row" onSubmit={this.props.handleSubmit(this.submit)}>
//         {
//           product && <Fragment>
//             <div className="col-12 col-md-5 product-item_image">
//               <img
//                 style={commonStyles.cursor}
//                 src={product.image}
//                 onClick={this.showLightbox}
//                 alt=""
//               />
//               <Lightbox
//                 currentImage={this.state.currentImage}
//                 images={[{ src: "/img/product-4.jpg" }, { src: "/img/product-3.jpg" }]}
//                 isOpen={this.state.lightboxIsOpen}
//                 onClose={this.closeLightbox}
//                 onClickNext={this.goToNext}
//                 onClickPrev={this.gotoPrevious}
//               />
//             </div>
//             <div className="col-12 col-md-7">
//               <div className="product-item_detail">
//                 <div className="row">
//                   <SmallScreen>
//                     <div className="col-12">
//                       {this.renderTopRow()}
//                     </div>
//                   </SmallScreen>
//                   <div className="col-12 product-review_list">
//                     <Stars value={getLength(product.reviews)} {...constant.starsRating} />
//                     <span>{getLength(product.reviews)} review</span>
//                   </div>
//
//                   <div className="col-12 product-item_sales-price">
//                     <span>{product.salesPrice.toFixed(2)}</span>
//                     <span>SR</span>
//                   </div>
//                   <div className="col-12">
//                     <span className="h-seperator" />
//                   </div>
//                   <div className="col-12 product-item_specs">
//                     <span>Specifications</span>
//                     {this.renderSpecs()}
//                   </div>
//                   <div className="col-12 d-flex product-item_buttons">
//                     <Field
//                       type="text"
//                       name="quantity"
//                       component={NumberPicker}
//                     />
//                     <Button
//                       type="submit"
//                       className="btn btn-primary"
//                       text={translate("product.buttons.addToCart")}
//                       icon="icon-cart" />
//                   </div>
//                   <div className="col-12 product-item_detail_footer">
//                     <span className="h-seperator" />
//                     <CustomerService
//                       messages={["Have a Question? Ask a Specialis, In-House Experts.", "We know our products"]}
//                       url="" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Fragment>
//         }
//       </form>
//         <div className="row ">
//           <div className="col-12 col-md-8 ">
//             <div className="row">
//               <div className="col-12 product-details">
//                 <h4>{translate("product.detail")}</h4>
//                 <Card className="border">
//                   <CardBody>
//                     <CardTitle>
//                       RPX800 Tires by Radar®. Season: Summer. Type: Performance, Truck / SUV. The RPX 800/800+ is a sport touring tire that has been designed for compact and mid-size cars.
//                       This range offers drivers good control on both dry and wet roads, ensuring a comfortable driving experience. It combines real-world performance
//                   </CardTitle>
//                     <ListGroup className="product-details-specs">
//                       {this.renderSpecs(true)}
//                     </ListGroup>
//                   </CardBody>
//                 </Card>
//               </div>
//               <div className="col-12 product-reviews">
//                 <h4>{translate("product.titleReviews")}</h4>
//                 <Card style={styles.averageRatingCard} className="border average-rating-card">
//                   <div className="average-rating">
//                     <div className="average-rating_header">
//                       <div className="sm-block">
//                         <div className="d-flex">
//                           <Stars className="average-rating_stars" value={product.averageRating} {...constant.starsRating} />
//                           <span style={styles.averageRating}>{`${product.averageRating} ${translate("product.ratingRange")} 5`}</span>
//                         </div>
//                         <div className="average-rating_count">
//                           <span>{getLength(product.reviews)}</span>
//                           <span>{translate("product.reviews")}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div style={styles.productReviews.btnLinkParent} className="btn-link_parent">
//                       <span className={this.state.canWriteReview ? "h-seperator" : "sm-seperator"} />
//                       <Link
//                         to="#"
//                         style={this.state.canWriteReview ? commonStyles.hide : commonStyles.show}
//                         className="btn-link"
//                         text={translate("product.writeReview.title")}
//                         onClick={this.handleWriteReview.bind(this, true)}
//                         icon={`icon-arrow-${right(this.props.direction)}`} />
//                       {
//                         this.state.canWriteReview && <form onSubmit={this.props.handleSubmit(this.submitReview)}>
//                           <div className="review-form_header">
//                             <span>{translate("product.writeReview.title")}</span>
//                             <Field
//                               name="rating"
//                               cancel={false}
//                               component={RenderRating}
//                               validate={[validations.required]}
//                             />
//                           </div>
//                           <div className="group-shadow-input group-shadow-div">
//                             <Field
//                               name="review"
//                               component={RenderField}
//                               type="text"
//                               placeholder={translate("product.writeReview.placeholder")}
//                               validate={[validations.required]} />
//                             <div className="group-buttons">
//                               <Button
//                                 type="reset"
//                                 className="btn btn-secondary"
//                                 text={translate("product.writeReview.cancel")}
//                                 onClick={this.handleWriteReview.bind(this, false)} />
//                               <Button
//                                 type="submit"
//                                 className="btn btn-primary"
//                                 text={translate("product.writeReview.sumbit")} />
//                             </div>
//                           </div>
//                         </form>
//                       }
//                     </div>
//                   </div>
//                 </Card>
//                 <Card className="border customers-reviews-card">
//                   <ListGroup>
//                     {
//                       product.reviews.map((review, idx) => {
//                         return <ListGroupItem>
//                           <div className="customers-reviews" style={styles.customerReviews.div} key={idx}>
//                             <div className="d-flex flex-row">
//                               <div>
//                                 <span className="user-img">
//                                   <img alt="user" src="/img/user.svg" />
//                                 </span>
//                               </div>
//                               <div>
//                                 <span style={styles.customerReviews.name}>{review.customerName}</span>
//                                 <Stars value={review.rating} {...constant.starsRating} />
//                                 <span style={styles.customerReviews.text}>{review.text}</span>
//                               </div>
//                             </div>
//                             <div>
//                               <span style={styles.customerReviews.date}>{moment(review.created).format('MM/DD/YYYY')}</span>
//                             </div>
//                           </div>
//                         </ListGroupItem>
//                       })
//                     }
//                   </ListGroup>
//                 </Card>
//               </div>
//
//             </div>
//           </div>
//
//         </div>
//         {dialog}
//     </div>
//   </div>
// </div>
