import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Accordion, AccordionTab } from 'primereact/components/accordion/Accordion';
import ScrollToTop from '../../ScrollToTop';
import { right } from '../../../utils';

class Footer extends Component {
  render() {
    return (
      <section id="mobile-footer">
        <ScrollToTop />
        <div className="container-fluid">
          <Accordion>
            <AccordionTab header="CUSTOMER SERVICE" headerClassName="accordion-header">
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
            </AccordionTab>
            <AccordionTab header="INFORMATION" headerClassName="accordion-header">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
            </AccordionTab>
            <AccordionTab header="POLICIES & TERMS" headerClassName="accordion-header">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
            </AccordionTab>
            <AccordionTab header="SIGN UP FOR OUR NEWSLETTER" headerClassName="accordion-header">
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
            </AccordionTab>
          </Accordion>

          <div className="col-12">
            <ul className="list-unstyled">
              <li className="contact-us">
                <a href="#">
                  <i className="icon-email" />
                </a>
                <a href="#">
                  <i className="icon-facebook-logo" />
                </a>
                <a href="#">
                  <i className="icon-linked-in-logo" />
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
