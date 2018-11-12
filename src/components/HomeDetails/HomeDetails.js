import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Products from "../Products/Products";
import AppsLink from '../AppsLink/AppsLink';
import Button from "../UI/Button";
import Title from '../UI/Title';

class HomeDetails extends Component {

  render() {
    const { products, getOffers, addRecentViewedProducts, onRecentlyViewedProducts, translate } = this.props;
    return (
      <Fragment>
        <section id="home-details" className="container-fluid">
          <Title
            header="Custom order"
            subHeader="We move fast. Send us request and we will replay by price and all details"
          />
          <div className="row">
            <div className="col col-lg-12 col-md-12 col-sm-12 col-xl-12 col-12">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row text-center">
                      <div className="col-lg-3">
                        <img className="request" src="img/request.svg" alt="request" />
                        <figcaption className="clearfix">
                          <h3>Request</h3>
                          <p>Fill in your vehicle data and the <span>parts you want</span></p>
                        </figcaption>
                      </div>
                      <div className="col-lg-3">
                        <img className="check-price" src="img/check-price.svg" alt="check-price" />
                        <figcaption>
                          <h3>Check Price</h3>
                          <p>The price will deliver to you <span>within 24 hours</span></p>
                        </figcaption>
                      </div>
                      <div className="col-lg-3">
                        <img className="add-to-cart" src="img/add-to-cart.svg" alt="add-to-cart" />
                        <figcaption>
                          <h3>Add To Cart</h3>
                          <p>choose Sipping Address <span>and payment method</span></p>
                        </figcaption>
                      </div>
                      <div className="col-lg-3">
                        <img className="delivery-product" src="img/delivery-product.svg" alt="delivery-product" />
                        <figcaption>
                          <h3>Receive Order</h3>
                          <p>Your order for your workshop or <span>anywher you love</span></p>
                        </figcaption>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
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
            </div>
          </div>
        </section>
        <section id="catagory-imgs" className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-xl-4 col-md-12 col-sm-12">
              <a href="">
                <figure>
                  <img className="vehicle-part-img" src="img/vehicle-part-lg.png" alt="vehicle-part" />
                </figure>
                <figcaption>
                  <h3>Vehicle Part</h3>
                </figcaption>
              </a>
            </div>
            <div className="col-lg-4 col-xl-4 col-md-12 col-sm-12">
              <div className="row">
                <div className="col-lg-12 col-xl-12 d-flex- col-md-6 col-sm-6">
                  <a href="">
                    <figure>
                      <img className="motor-oil-img" src="img/motor-oil.png" alt="motor-oil" />
                    </figure>
                    <figcaption>
                      <h3>Motor Oil</h3>
                    </figcaption>
                  </a>
                </div>
                <div className="col-lg-12 col-xl-12 mt-lg-3 col-md-6 col-sm-6">
                  <a href="">
                    <figure>
                      <img className="tyres-img" src="img/tyres.png" alt="tyres" />
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
                <div className="col-lg-12 col-xl-12 col-md-6 col-sm-6">
                  <a href="">
                    <figure>
                      <img className="tools-img" src="img/tools.png" alt="tools" />
                    </figure>
                    <figcaption>
                      <h3>Tools</h3>
                    </figcaption>
                  </a>
                </div>
                <div className="col-lg-12 col-xl-12 mt-lg-3 col-md-6 col-sm-6">
                  <a href="">
                    <figure>
                      <img className="accessories-img" src="img/accessories.png" alt="accessories" />
                    </figure>
                    <figcaption>
                      <h3>Accessories</h3>
                    </figcaption>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="join-us" className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div>
                <img className="vendor-img" src="img/vendor.png" alt="vendor" />
              </div>
              <div className="d-flex justify-content-center">
                <p>
                  OUR SALES MORE THAN 50,000 ITEM
                  <h1>VENDOR ! Join Qetaa.com</h1>
                </p>
                <Button
                  type="submit"
                  className="btn-primary"
                  text={
                    <Fragment>
                      <span>{translate("general.join")}</span>
                      <i className="icon-arrow-right"></i>
                    </Fragment>
                  }
                />
              </div>
            </div>
          </div>
        </section>
        <Products
          products={products}
          getOffers={getOffers}
          addRecentViewedProducts={addRecentViewedProducts}
          onRecentlyViewedProducts={onRecentlyViewedProducts}
          translate={translate}
        />
        <AppsLink />
      </Fragment>
    );
  }
}
export default HomeDetails;
