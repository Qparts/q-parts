import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Products from "../Products/Products";
import Button from "../UI/Button";

class HomeDetails extends Component {

  render() {
    const { products, getOffers, addRecentViewedProducts, onRecentlyViewedProducts, translate } = this.props;
    return (
      <section className="home-details container-fluid">
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
                <div className="col-lg-12">
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
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 ml-4">
              <header>
                <h2>Start Now</h2>
                <div className="ellipse">
                  <i className="icon-arrow-down" />
                </div>
              </header>
              <div className="col-12">
                <form className="form-inline d-flex p-2 justify-content-center rounded-rectangle">
                  <div className="mr-2 flex-fill input-group upload-file">
                    <input type="text" className="form-control boarder-left-radius" placeholder="Part Name, Number or image" />
                    <div className="input-group-prepend">
                      <span className="ellipse">
                        <i>
                          <input type="file" ref={ref => this.fileInput = ref} />
                          <Button
                            text={<img className="upload-img" src="img/upload-img.svg" alt="upload-img" />}
                            type="reset" onClick={() => this.fileInput.click()} />
                        </i>
                      </span>
                    </div>
                  </div>
                  <div className="mr-2 flex-fill input-group upload-file">
                    <input type="text" className="form-control boarder-right-bottom-radius" placeholder="Vin Number or Vechile ID image" />
                    <div className="input-group-prepend">
                      <span className="ellipse">
                        <i>
                          <input type="file" ref={ref => this.fileInput = ref} />
                          <Button
                            text={<img className="upload-img" src="img/upload-img.svg" alt="upload-img" />}
                            type="reset" onClick={() => this.fileInput.click()} />
                        </i>
                      </span>
                    </div>
                  </div>
                  <div className="mr-2 w-sm-100">
                    <Button
                      type="submit"
                      className="btn-primary w-sm-100"
                      text={
                        <Fragment>
                          <span>{translate("general.send")}</span>
                          <i className="icon-arrow-right"></i>
                        </Fragment>
                      }
                    />
                  </div>
                </form>
              </div>
            </div>
            <section id="catagory-imgs">
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
                  <h1><p>OUR SALES MORE THAN 50,000 ITEM</p>VENDOR ! Join Qetaa.com</h1>
                  <a href="#">
                    Join <i className="icon-arrow-right" />
                  </a>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Products
          products={products}
          getOffers={getOffers}
          addRecentViewedProducts={addRecentViewedProducts}
          onRecentlyViewedProducts={onRecentlyViewedProducts}
          translate={translate}
        />
      </section>
    );
  }
}
export default HomeDetails;
