import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import ScrollToTop from '../../ScrollToTop';
import { right } from '../../../utils';

import { Collapse } from 'reactstrap';

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: false,
      collapse2: false,
      collapse3: false,
      collapse4: false,
    };
  }
  toggle = (collapse) => {
    this.setState({ [collapse]: !this.state[collapse] });
  }
  render() {
    return (
      <section id="mobile-footer">
        <ScrollToTop />
        <div className="container-fluid">
          <li>
            <Link to="#" onClick={this.toggle.bind(this, 'collapse1')}>CUSTOMER SERVICE</Link>
          </li>
          <Collapse isOpen={this.state.collapse1}>
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
          </Collapse>
          <li>
            <Link to="#" onClick={this.toggle.bind(this, 'collapse2')}>INFORMATION</Link>
          </li>
          <Collapse isOpen={this.state.collapse2}>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
            <li>
              <a href="#">Careers</a>
            </li>
          </Collapse>
          <li>
            <Link to="#" onClick={this.toggle.bind(this, 'collapse3')}>POLICIES & TERMS</Link>
          </li>
          <Collapse isOpen={this.state.collapse3}>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms & Conditions</a>
            </li>
          </Collapse>
          <li>
            <Link to="#" onClick={this.toggle.bind(this, 'collapse4')}>SIGN UP FOR OUR NEWSLETTER</Link>
          </li>
          <Collapse isOpen={this.state.collapse4}>
            <div className="row">
              <div className="col-12">
                <p>to stay up-to-date on our promotions, discounts, sales,
                        special offers and more
                </p>
              </div>
              <div className="col-12">
                <form className="form-inline">
                  <div className="col-6">
                    <input type="text" className="form-control" placeholder="Enter Email" />
                  </div>
                  <div className="col-6">
                    <button type="submit" className="btn btn-primary">
                      Subscribe <i className={`icon-arrow-${right(this.props.direction)}`} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Collapse>
          <div className="col-12">
            <ul className="list-unstyled">
              <li className="contact-us">
                <a href="#">
                  <i className="btn btn-primary icon-email" />
                </a>
                <a href="#">
                  <i className="btn btn-primary icon-facebook-logo" />
                </a>
                <a href="#">
                  <i className="btn btn-primary icon-linked-in-logo" />
                </a>
              </li>
            </ul>
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
          </div>
        </div>
      </section>
    );
  }
}
export default Footer;
