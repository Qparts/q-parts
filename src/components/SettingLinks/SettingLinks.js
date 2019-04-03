import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { accountSetting, addressBook, garage, helpCenter, orders, quotations, socialMedia, wishlist, payment } from '../../constants';
import CustomerService from '../../components/CustomerService/CustomerService';
class profileLinks extends Component{

  settingLink = (link) =>{
    this.props.history.push(`${this.props.match.url}/${link}`)
  }
  render(){
    const { match, translate } = this.props;
    const links = [
        { url: 'quotations', name: translate(`setting.links.${quotations}`) },
        // { url: 'orders', name: translate(`setting.links.${orders}`) },
        // { url: 'help_center', name: translate(`setting.links.${helpCenter}`) },
        { url: 'wishlist', name: translate(`setting.links.${wishlist}`) },
        { url: 'garage', name: translate(`setting.links.${garage}`) },
        // { url: 'profile', name: translate(`setting.links.${accountSetting}`) },
        { url: 'addresses', name: translate(`setting.links.${addressBook}`) },
        // { url: 'connect', name: translate(`setting.links.${socialMedia}`) },
        // { url: 'payment', name: payment },
    ]
    const chatMessages = [
      translate("customerService.setting.whatsApp.header"),
      translate("customerService.setting.whatsApp.subHeader")
    ];

    return(
      <Fragment>
        <div className="col-lg-3">
          <CustomerService
            messages={chatMessages}
            url="//wa.me/966508448856/" />
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

      </Fragment>
    )
  }
}

export default profileLinks;
