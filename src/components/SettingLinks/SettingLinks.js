import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { accountSetting, addressBook, garage, helpCenter, orders, quotations, socialMedia, wishlist, payment } from '../../constants';
import CustomerService from '../../components/CustomerService/CustomerService';
import { LargeScreen } from '../../components/Device/index.js';
class profileLinks extends Component {
  settingLink = (link) => {
    this.props.history.push(`${this.props.match.url}/${link}`)
  }
  render() {
    const { match, translate } = this.props;
    const links = [
      { url: 'quotations', name: translate(`setting.links.${quotations}`) },
      { url: 'orders', name: translate(`setting.links.${orders}`) },
      // { url: 'help_center', name: translate(`setting.links.${helpCenter}`) },
      { url: 'wishlist', name: translate(`setting.links.${wishlist}`) },
      { url: 'garage', name: translate(`setting.links.${garage}`) },
      { url: 'addresses', name: translate(`setting.links.${addressBook}`) },
      { url: 'profile', name: translate(`setting.links.${accountSetting}`) },
      // { url: 'connect', name: translate(`setting.links.${socialMedia}`) },
      // { url: 'payment', name: payment },
    ]
    const chatMessages = [
      translate("customerService.setting.whatsApp.header"),
      translate("customerService.setting.whatsApp.subHeader")
    ];

    return (
      <Fragment>
        <LargeScreen>
          <div className="col-lg-3">
            <CustomerService
              messages={chatMessages}
              url="//wa.me/966547074452/" />
            <ul className="setting-tabs-link">
              {links.map((link, idx) => {
                return (
                  <li>
                    <Link
                      key={idx}
                      data-toggle="list"
                      to="#"
                      onClick={() => this.settingLink(link.url)}>
                      {link.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </LargeScreen>


      </Fragment>
    )
  }
}

export default profileLinks;
