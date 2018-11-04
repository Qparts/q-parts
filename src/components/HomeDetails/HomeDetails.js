import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Products from "../Products/Products";

class HomeDetails extends Component {

  render() {
    const { products, getOffers, addRecentViewedProducts, onRecentlyViewedProducts, translate } = this.props;
    return (
      <div className="home-details container-fluid">
        <div className="row">
          <div className="col col-lg-12 col-md-12 col-sm-12 col-xl-12 col-12">
            <h1>Custom Order</h1>
            <div className="row d-flex align-items-baseline">
              <hr className="col-2 red-line ml-3" />
              <p className="col">
                We move fast. Send us request and we will replay by price and all
                details
            </p>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 ml-4">
              <div className="row">
                <div className="col-lg-3">
                  <img className="request" src="img/request.svg" alt="request" />
                  <figcaption>
                    <h3>Request</h3>
                    <p>Fill in your vehicle data and the parts you want</p>
                  </figcaption>
                </div>
                <div className="col-lg-3">
                  <img className="check-price" src="img/check-price.svg" alt="check-price" />
                  <figcaption>
                    <h3>Check Price</h3>
                    <p>The price will deliver to you within 24 hours</p>
                  </figcaption>
                </div>
                <div className="col-lg-3">
                  <img className="add-to-cart" src="img/add-to-cart.svg" alt="add-to-cart" />
                  <figcaption>
                    <h3>Add To Cart</h3>
                    <p>choose Sipping Address and payment method</p>
                  </figcaption>
                </div>
                <div className="col-lg-3">
                  <img className="delivery-product" src="img/delivery-product.svg" alt="delivery-product" />
                  <figcaption>
                    <h3>Receive Order</h3>
                    <p>Your order for your workshop or anywher you love</p>
                  </figcaption>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 ml-4">
              <header>
                <h2>
                  <span>
                    <i className="icon-arrow-down" />
                  </span>
                  Start Now
              </h2>
              </header>
              <form>
                <div className="row">
                  <div className="">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Part Name, Number or image"
                    />
                    <div className="custom-file">
                      <i>
                        <img className="upload-img" src="img/upload-img.svg" alt="upload-img" />
                      </i>
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile1"
                      />
                    </div>
                  </div>
                  <div className="">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Vin Number or Vechile ID image"
                    />
                    <div className="custom-file">
                      <i>
                        <img className="upload-img" src="img/upload-img.svg" alt="upload-img" />
                      </i>
                      <input
                        type="file"
                        className="custom-file-input"
                        id="customFile2"
                      />
                    </div>
                  </div>
                  <div className="">
                    <button type="submit" className="btn-primary">
                      Send <i className="icon-arrow=right" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-xl-4 col-md-12 col-sm-12">
            <a href="#">
              <figure>
                <img src="img/vehicle-part-lg.png" />
              </figure>
              <figcaption>
                <h3>Vehicle Part</h3>
              </figcaption>
            </a>
          </div>
          <div className="col-lg-4 col-xl-4 col-md-12 col-sm-12">
            <div className="row">
              <div className="col-lg-12 col-xl-12  col-md-6 col-sm-6">
                <a href="#">
                  <figure>
                    <img src="img/maotor-oil.png" />
                  </figure>
                  <figcaption>
                    <h3>Motor Oil</h3>
                  </figcaption>
                </a>
              </div>
              <div className="col-lg-12 col-xl-12  col-md-6 col-sm-6">
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
          <div className="col-lg-4 col-xl-4 col-md-12 col-sm-12">
            <div className="row">
              <div className="col-lg-12 col-xl-12  col-md-6 col-sm-6">
                <a href="#">
                  <figure>
                    <img src="img/tools.png" />
                  </figure>
                  <figcaption>
                    <h3>Tools</h3>
                  </figcaption>
                </a>
              </div>
              <div className="col-lg-12 col-xl-12  col-md-6 col-sm-6">
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
        <div className="col-lg-12 col-xl-12  col-md-6 col-sm-6">
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
        <Products
          products={products}
          getOffers={getOffers}
          addRecentViewedProducts={addRecentViewedProducts}
          onRecentlyViewedProducts={onRecentlyViewedProducts}
          translate={translate}
        />
      </div>
    );
  }
}
export default HomeDetails;
