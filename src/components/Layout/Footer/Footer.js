import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

class Footer extends Component {
  render() {
    return (
      <section id="footer">
        <div className="container-fluid">
          <ul className="list-unstyled row">
            <li className="media col">
              <i className="icon-pricing" />
              <div className="media-body">
                <h5 className="mt-0 mb-1">Low Prices</h5>
                Price match guarantee
            </div>
            </li>
            <li className="media col">
              <i className="icon-whatsapp" />
              <div className="media-body">
                <h5 className="mt-0 mb-1">In-House Experts</h5>
                Have a Question? Ask a Specialis
            </div>
            </li>
            <li className="media col">
              <i className="icon-delivery" />
              <div className="media-body">
                <h5 className="mt-0 mb-1">Great Delivery</h5>
                From one to three days
            </div>
            </li>
            <li className="media col">
              <i className="icon-wallet" />
              <div className="media-body">
                <h5 className="mt-0 mb-1">Easy To Pay</h5>
                Cash on dilevry, Credit Card and Bank transefear
            </div>
            </li>
          </ul>
          <hr />
          <div className="d-flex flex-row site-map">
            <div className="p-2">
              <ul className="list-unstyled">
                <li>
                  <span>CUSTOMER SERVICE</span>
                </li>
                <li>
                  <a href="#">Shipping & Delivery</a>
                </li>
                <li>
                  <a href="#">Returns</a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Track Order</a>
                </li>
              </ul>
            </div>
            <div className="p-2">
              <ul className="list-unstyled">
                <li>
                  <h5>INFORMATION</h5>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Careers</a>
                </li>
              </ul>
            </div>
            <div className="p-2">
              <ul className="list-unstyled">
                <li>
                  <h5>POLICIES & TERMS</h5>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
              </ul>
            </div>
            <div className="p-2">
              <ul className="list-unstyled">
                <li>
                  <h5>Sign Up FOR OUR NEWSLETTER</h5>
                  <p>
                    to stay up-to-date on our promotions, discounts, sales,
                    special offers and more
                </p>
                </li>
                <li>
                  <form className="form-inline">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Email"
                    />
                    <button type="submit" className="btn-primary">
                      Subscribe <i className="icon-arrow-right" />
                    </button>
                  </form>
                </li>
                <li className="contact-us">
                  <a href="#">
                    <i className="icon-email" />
                  </a>
                  <a href="#">
                    <i className="icon-facebook-logo" />
                  </a>
                  <a href="#">
                    <i className="icon-twitter" />
                  </a>
                  <a href="#">
                    <i className="icon-linked-in-logo" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <div className="">
              <i className="bader-logo" />
              <p>
                One of the
              <br />
                incubated proiects
            </p>
            </div>
            <div className="align-self-end">
              <p>@2018 Qetaa.com</p>
            </div>
            <div className="align-self-end apps-link">
              <div className="d-flex">
                <p>Download Our App</p>
                <a href="">
                  <i className="icon-apple" />
                </a>
                <a href="" className="">
                  <i className="icon-play-store" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
export default Footer;
