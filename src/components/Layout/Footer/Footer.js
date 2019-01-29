import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

class Footer extends Component {
  render() {
    return (

      <section className="main-footer">

        <div className="container-fluid">
          <ul className="qparts-benefit">
            <li className="col-auto media">
              <i className="icon-pricing" />
              <div className="media-body">
                <h5>Low Prices</h5>
                <p>Price match guarantee</p>
            </div>
            </li>
            <li className="col-auto media">
              <i className="icon-whatsapp" />
              <div className="media-body">
                <h5>In-House Experts</h5>
                <p>Have a Question? Ask a Specialis</p>
            </div>
            </li>
            <li className="col-auto media">
              <i className="icon-delivery" />
              <div className="media-body">
                <h5>Great Delivery</h5>
                <p>From one to three days</p>
            </div>
            </li>
            <li className="col-auto media">
              <i className="icon-wallet" />
              <div className="media-body">
                <h5>Easy To Pay</h5>
                <p>Cash on dilevry, Credit Card <span>and Bank transefear</span></p>
            </div>
            </li>
          </ul>
          <ul className="site-map list-unstyled row">
            <li className="col-auto">
              <ul className="list-unstyled">
                <li>
                  <h5>CUSTOMER SERVICE</h5>
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
            </li>
            <li className="col-auto">
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
            </li>
            <li className="col-auto">
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
            </li>
            <li className="col subscribe">
              <h5>Sign Up FOR OUR NEWSLETTER</h5>
                <p>
                  to stay up-to-date on our promotions, discounts, sales, special offers and more
              </p>
              <form className="form-inline">
                <input type="text" className="form-control col"   placeholder="Enter Email" />
                <button type="submit col-auto" className="btn-primary">
                  <i className="icon-email"></i>
                  <span>Subscribe <i className="icon-arrow-right" /></span>
                </button>
              </form>
            </li>
          </ul>
          <div className="row copy-rights">
            <div className="col sponser">
              <span><i/></span>
              <p>
                One of the <br/>
                incubated proiects
            </p>
            </div>
            <div className="col ">
              <p className="text-center">@2018 Qetaa.com</p>
            </div>
              <ul className="col social-footer">
                <li><a href="#"><i className="icon-twitter"></i></a></li>
                  <li><a href="#"><i className="icon-facebook"></i></a></li>
                <li><a href="#"><i className="icon-linked-in"></i></a></li>
              </ul>
          </div>
        </div>
      </section>

    );
  }
}
export default Footer;
