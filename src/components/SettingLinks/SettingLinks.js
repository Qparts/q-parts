import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { accountSetting, addressBook, garage, helpCenter, orders, quotations, socialMedia, wishlist, payment } from '../../constants';
import CustomerService from '../../components/CustomerService/CustomerService';
import { LargeScreen } from '../../components/Device/index.js';
class profileLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: ''
    }
  }
  settingLink = (link) => {
    this.props.history.push(`${this.props.match.url}/${link}`)
  }

  handleClick = (link, e) => {
    e.preventDefault();
    this.setState({
      active: link.url
    });

    if (this.props.onSetSidebarOpen) {
      this.props.onSetSidebarOpen(false);
    }
    this.settingLink(link.url);
  }
  componentDidMount(){
    const urlActive = window.location.href.split("/")[window.location.href.split("/").length-1];
    this.setState({
      active: urlActive
    });
  }
  componentDidUpdate(prevProps,prevState){
    if(prevProps.location.pathname.split("/")[prevProps.location.pathname.split("/").length-1] !== prevState.active){
      const urlActive = window.location.href.split("/")[window.location.href.split("/").length-1];
      this.setState({
        active: urlActive
      });
    }

  }
  render() {
    const { match, translate } = this.props;
    const links = [
      { url: 'quotations', name: translate(`setting.links.${quotations}`) },
      // { url: 'orders', name: translate(`setting.links.${orders}`) },
      // { url: 'help_center', name: translate(`setting.links.${helpCenter}`) },
      { url: 'wishlist', name: translate(`setting.links.${wishlist}`) },
      { url: 'garage', name: translate(`setting.links.${garage}`) },
      { url: 'addresses', name: translate(`setting.links.${addressBook}`) },
      // { url: 'profile', name: translate(`setting.links.${accountSetting}`) },
      // { url: 'connect', name: translate(`setting.links.${socialMedia}`) },
      // { url: 'payment', name: payment },
    ]

    const chatMessages = [
      translate("customerService.setting.whatsApp.header"),
      translate("customerService.setting.whatsApp.subHeader")
    ];

    return (
      <Fragment>
        <div className="col-lg-3">
          <LargeScreen>
            <CustomerService
              messages={chatMessages}
              url="//wa.me/966547074452/" />
          </LargeScreen>
          <ul className="setting-tabs-link">
            {links.map((link, idx) => {
              return (
                <li key={idx}>
                  <Link
                    className={this.state.active === link.url ? 'active' : ''}
                    data-toggle="list"
                    to="#"
                    onClick={this.handleClick.bind(this, link)}>
                    {link.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default profileLinks;
