import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Slider from "react-slick";
import Stars from 'react-stars';

class HomeDetails extends Component {
  
  render() {
    const setting = {
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      centerMode: true,
      variableWidth: true
    }
    const rating = {
      edit: false,
      value: 4,
      color1: '#cfcfcf',
      color2: '#fabb12'
    }
    return (
      <div className="container-fluid">
        <div className="row">
          <header className="col heading">
            <h1>
              <span>Custom</span> Order
            </h1>
            <p>
              We move fast. Send us request and we will replay by price and all
              details
            </p>
          </header>
        </div>
        <div className="row">
          <div className="col-lg-3">
            <div>
              <img src="img/request.svg" />
            </div>
            <figcaption>
              <h3>Request</h3>
              <p>Fill in your vehicle data and the parts you want</p>
            </figcaption>
          </div>
          <div className="col-lg-3">
            <div>
              <img src="img/check-price.svg" />
            </div>
            <figcaption>
              <h3>Check Price</h3>
              <p>The price will deliver to you within 24 hours</p>
            </figcaption>
          </div>
          <div className="col-lg-3">
            <div>
              <img src="img/add-to-cart.svg" />
            </div>
            <figcaption>
              <h3>Add To Cart</h3>
              <p>choose Sipping Address and payment method</p>
            </figcaption>
          </div>
          <div className="col-lg-3">
            <figure>
              <img src="img/delivery-product.svg" />
            </figure>
            <figcaption>
              <h3>Receive Order</h3>
              <p>Your order for your workshop or anywher you love</p>
            </figcaption>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <header>
              <h2>
                <span>
                  <i className="icon-arroe-down" />
                </span>
                Start Now
              </h2>
            </header>
            <form>
              <div className="row">
                <div className="col-lg-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Part Name, Number or image"
                  />
                  <div className="custom-file">
                    <i>
                      <img src="img/upload-img.svg" />
                    </i>
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                    />
                  </div>
                </div>
                <div className="col-lg-5">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Vin Number or Vechile ID image"
                  />
                  <div className="custom-file">
                    <i>
                      <img src="img/upload-img.svg" />
                    </i>
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                    />
                  </div>
                </div>
                <div className="col-lg-2">
                  <button type="submit" className="btn btn-primary">
                    Send <i className="icon-arrow=right" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <a href="#">
              <figure>
                <img src="img/vehicle-part-lg.png" />
              </figure>
              <figcaption>
                <h3>Vehicle Part</h3>
              </figcaption>
            </a>
          </div>
          <div className="col-lg-4">
            <div className="row">
              <div className="col-lg-12 col-md-6">
                <a href="#">
                  <figure>
                    <img src="img/maotor-oil.png" />
                  </figure>
                  <figcaption>
                    <h3>Motor Oil</h3>
                  </figcaption>
                </a>
              </div>
              <div className="col-lg-12 col-md-6">
                <a href="#">
                  <figure>
                    <img src="img/tyres.png" />
                  </figure>
                  <figcaption>
                    <h3>Tyres</h3>
                  </figcaption>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="row">
              <div className="col-lg-12 col-md-6">
                <a href="#">
                  <figure>
                    <img src="img/tools.png" />
                  </figure>
                  <figcaption>
                    <h3>Tools</h3>
                  </figcaption>
                </a>
              </div>
              <div className="col-lg-12 col-md-6">
                <a href="#">
                  <figure>
                    <img src="img/accessories.png" />
                  </figure>
                  <figcaption>
                    <h3>Accessories</h3>
                  </figcaption>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div>
            <source media="(max-width: 576px)" srcSet="img/vendor-xs.jpg" />
            <img src="img/vendor.png" alt="Flowers" />
          </div>
          <div className="align-self-center">
            <h1>
              <p>OUR SALES MORE THAN 50,000 ITEM</p>
              VENDOR ! Join Qetaa.com
            </h1>
            <a href="#">
              Join <i className="icon-arrow-right" />
            </a>
          </div>
        </div>
        <div className="bg-light-gray">
          <div className="container-fluid">
            <div className="row">
              <header className="col heading">
                <h1>
                  <span>Recommended </span> For You
                </h1>
                <p>A wide selection of items for you to choose from</p>
              </header>
              <ul
                className="nav nav-pills list-inline"
                id="pills-tab"
                role="tablist"
              >
                <li>
                  <a
                    className="active"
                    id="best-seller-tab"
                    data-toggle="pill"
                    href="#best-seller"
                    role="tab"
                    aria-controls="best-seller"
                    aria-selected="true"
                  >
                    Best Seller
                  </a>
                </li>
                <li>
                  <a
                    id="offers-tab"
                    data-toggle="pill"
                    href="#offers"
                    role="tab"
                    aria-controls="offers"
                    aria-selected="false"
                  >
                    Offers
                  </a>
                </li>
                <li>
                  <a
                    id="recently-viewed-tab"
                    data-toggle="pill"
                    href="#recently-viewed"
                    role="tab"
                    aria-controls="recently-viewed"
                    aria-selected="false"
                  >
                    Recently Viewed
                  </a>
                </li>
              </ul>
            </div>
            <div className="row">
            <div className="tab-content col" id="pills-tabContent">
              <div className="tab-pane fade show active" id="best-seller" role="tabpanel" aria-labelledby="best-seller-tab">
                <Slider {...setting}>
                  <div>
                    <div className="card">
                      <a href="#">
                        <img className="card-img-top" src="img/product-2.jpg"/>
                        <div className="card-body">
                          <h5 className="card-title">Air Fuel Ratio Sensor</h5>
                          <p className="product-brand">Bosch</p>
                          <div className="product-review">
                            <Stars {...rating}/>
                            <span className="total-review">8 review</span>
                          </div>
                          <p className="price">
                            20 <span className="currency">SR</span>
                          </p>
                        </div>
                      </a>
                      </div>
                  </div>
                  <div>
                    <div className="card">
                      <a href="#">
                        <img className="card-img-top" src="img/product-3.jpg"/>
                        <div className="card-body">
                          <h5 className="card-title">8100 Synthetic Motor Oil</h5>
                          <p className="product-brand">Motul USA</p>
                          <div className="product-review">
                            <Stars {...rating}/>
                            <span className="total-review">2 review</span>
                          </div>
                          <p className="price">
                            1000 <span className="currency">SR</span>
                          </p>
                        </div>
                      </a>
                      </div>
                  </div>
                  <div>
                    <div className="card">
                      <a href="#">
                        <img className="card-img-top" src="img/product-4.jpg"/>
                        <div className="card-body">
                          <h5 className="card-title">NT05</h5>
                          <p className="product-brand">NITTO</p>
                          <div className="product-review">
                            <Stars {...rating}/>
                            <span className="total-review">8 review</span>
                          </div>
                          <p className="price">
                            500 <span className="currency">SR / each</span>
                          </p>
                        </div>
                      </a>
                      </div>
                  </div>
                  <div>
                    <div className="card">
                      <a href="#">
                        <img className="card-img-top" src="img/product-1.jpg"/>
                        <div className="card-body">
                          <h5 className="card-title">GM Original Equipment EGR..</h5>
                          <p className="product-brand">ACDelco</p>
                          <div className="product-review">
                            <Stars {...rating}/>
                            <span className="total-review">8 review</span>
                          </div>
                          <p className="price">
                            1000 <span className="currency">SR</span>
                          </p>
                        </div>
                      </a>
                      </div>
                  </div>
                  <div>
                    <div className="card">
                      <a href="#">
                        <img className="card-img-top" src="img/product-1.jpg"/>
                        <div className="card-body">
                          <h5 className="card-title">GM Original Equipment EGR..</h5>
                          <p className="product-brand">ACDelco</p>
                          <div className="product-review">
                            <Stars {...rating}/>
                            <span className="total-review">8 review</span>
                          </div>
                          <p className="price">
                            1000 <span className="currency">SR</span>
                          </p>
                        </div>
                      </a>
                      </div>
                  </div>
                </Slider>
              </div>
              <div className="tab-pane fade" id="offers" role="tabpanel" aria-labelledby="offers-tab">...</div>
              <div className="tab-pane fade" id="recently-viewed" role="tabpanel" aria-labelledby="recently-viewed-tab">...</div>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
export default HomeDetails;
