import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

class HomdeDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div class="container-fluid">
        <div class="row">
          <header class="col heading">
            <h1>
              <span>Custom</span> Order
            </h1>
            <p>
              We move fast. Send us request and we will replay by price and all
              details
            </p>
          </header>
        </div>
        <div class="row">
          <div class="col-lg-3">
            <div>
              <img src="img/request.svg" />
            </div>
            <figcaption>
              <h3>Request</h3>
              <p>Fill in your vehicle data and the parts you want</p>
            </figcaption>
          </div>
          <div class="col-lg-3">
            <div>
              <img src="img/check-price.svg" />
            </div>
            <figcaption>
              <h3>Check Price</h3>
              <p>The price will deliver to you within 24 hours</p>
            </figcaption>
          </div>
          <div class="col-lg-3">
            <div>
              <img src="img/add-to-cart.svg" />
            </div>
            <figcaption>
              <h3>Add To Cart</h3>
              <p>choose Sipping Address and payment method</p>
            </figcaption>
          </div>
          <div class="col-lg-3">
            <figure>
              <img src="img/delivery-product.svg" />
            </figure>
            <figcaption>
              <h3>Receive Order</h3>
              <p>Your order for your workshop or anywher you love</p>
            </figcaption>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <header>
              <h2>
                <span>
                  <i class="icon-arroe-down" />
                </span>
                Start Now
              </h2>
            </header>
            <form>
              <div class="row">
                <div class="col-lg-5">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Part Name, Number or image"
                  />
                  <div class="custom-file">
                    <i>
                      <img src="img/upload-img.svg" />
                    </i>
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFile"
                    />
                  </div>
                </div>
                <div class="col-lg-5">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Vin Number or Vechile ID image"
                  />
                  <div class="custom-file">
                    <i>
                      <img src="img/upload-img.svg" />
                    </i>
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFile"
                    />
                  </div>
                </div>
                <div class="col-lg-2">
                  <button type="submit" class="btn btn-primary">
                    Send <i class="icon-arrow=right" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4">
            <a href="#">
              <figure>
                <img src="img/vehicle-part-lg.png" />
              </figure>
              <figcaption>
                <h3>Vehicle Part</h3>
              </figcaption>
            </a>
          </div>
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12 col-md-6">
                <a href="#">
                  <figure>
                    <img src="img/maotor-oil.png" />
                  </figure>
                  <figcaption>
                    <h3>Motor Oil</h3>
                  </figcaption>
                </a>
              </div>
              <div class="col-lg-12 col-md-6">
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
          <div class="col-lg-4">
            <div class="row">
              <div class="col-lg-12 col-md-6">
                <a href="#">
                  <figure>
                    <img src="img/tools.png" />
                  </figure>
                  <figcaption>
                    <h3>Tools</h3>
                  </figcaption>
                </a>
              </div>
              <div class="col-lg-12 col-md-6">
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
        <div class="col">
          <div>
            <source media="(max-width: 576px)" srcset="img/vendor-xs.jpg" />
            <img src="img/vendor.png" alt="Flowers" />
          </div>
          <div class="align-self-center">
            <h1>
              <p>OUR SALES MORE THAN 50,000 ITEM</p>
              VENDOR ! Join Qetaa.com
            </h1>
            <a href="#">
              Join <i class="icon-arrow-right" />
            </a>
          </div>
        </div>
        <div class="bg-light-gray">
          <div class="container-fluid">
            <div class="row">
              <header class="col heading">
                <h1>
                  <span>Recommended </span> For You
                </h1>
                <p>A wide selection of items for you to choose from</p>
              </header>
              <ul
                class="nav nav-pills list-inline"
                id="pills-tab"
                role="tablist"
              >
                <li>
                  <a
                    class="active"
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
          </div>
        </div>
      </div>
    );
  }
}
export default HomdeDetails;
