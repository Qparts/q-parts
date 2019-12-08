import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { right } from '../../../utils';

class Footer extends Component {
  render() {
    const { translate } = this.props
    return (

      <section className="main-footer">

        <div className="container-fluid">
          <ul className="qparts-benefit">
            <li className="col-auto media">
              <i className="icon-pricing" />
              <div className="media-body">
                <h5>{translate("footer.pricing.header")}</h5>
                <p>{translate("footer.pricing.subHeader")}</p>
            </div>
            </li>
            <li className="col-auto media">
              <i className="icon-whatsapp" />
              <div className="media-body">
                <h5>{translate("footer.whatsApp.header")}</h5>
                <p>{translate("footer.whatsApp.subHeader")}</p>
            </div>
            </li>
            <li className="col-auto media">
              <i className="icon-delivery" />
              <div className="media-body">
                <h5>{translate("footer.delivery.header")}</h5>
                <p>{translate("footer.delivery.subHeader")}</p>
            </div>
            </li>
            <li className="col-auto media">
              <i className="icon-wallet" />
              <div className="media-body">
                <h5>{translate("footer.wallet.header")}</h5>
                <p>{translate("footer.wallet.subHeader")} <span>{translate("footer.wallet.span")}</span></p>
            </div>
            </li>
          </ul>
          <ul className="site-map list-unstyled row">
            <li className="col-auto">
              <ul className="list-unstyled">
                <li>
                  <h5>{translate("footer.customerService.title")}</h5>
                </li>
                <li>
                  <Link to="/shippingAndDeliveryPolicy">{translate("footer.customerService.linkOne")}</Link>
                </li>
                <li>
                  <Link to="/returnPolicy">{translate("footer.customerService.linkTwo")}</Link>
                </li>
                <li>
                  <a href="#">{translate("footer.customerService.linkThree")}</a>
                </li>
                <li>
                  <a href="#">{translate("footer.customerService.linkFour")}</a>
                </li>
                <li>
                  <a href="#">{translate("footer.customerService.linkFive")}</a>
                </li>
              </ul>
            </li>
            <li className="col-auto">
              <ul className="list-unstyled">
                <li>
                  <h5>{translate("footer.info.title")}</h5>
                </li>
                <li>
                  <a href="#">{translate("footer.info.linkOne")}</a>
                </li>
                <li>
                  <a href="#">{translate("footer.info.linkTwo")}</a>
                </li>
                <li>
                  <a href="#">{translate("footer.info.linkThree")}</a>
                </li>
              </ul>
            </li>
            <li className="col-auto">
              <ul className="list-unstyled">
                <li>
                  <h5>{translate("footer.pt.title")}</h5>
                </li>
                <li>
                  <Link to="/privacyPolicy">{translate("footer.pt.linkOne")}</Link>
                </li>
                <li>
                  <a href="#">{translate("footer.pt.linkTwo")}</a>
                </li>
              </ul>
            </li>
            <li className="col subscribe">
              <h5>{translate("footer.newsLetter.header")}</h5>
                <p>
                {translate("footer.newsLetter.subHeader")}
              </p>
              <form className="form-inline">
                <input type="text" className="form-control col"   placeholder={translate("footer.newsLetter.placeholder")} />
                <button type="submit col-auto" className="btn btn-primary">
                  <span>{translate("footer.newsLetter.subscribe")} <i className="icon-arrow-right" /></span>
                </button>
              </form>
            </li>
          </ul>
          <div className="row copy-rights">
            <div className="col sponser">
              <span><i/></span>
              <p>
              {translate("footer.copyRight.header")} <br/>
              {translate("footer.copyRight.subHeader")}
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
