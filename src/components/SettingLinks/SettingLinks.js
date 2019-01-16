import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { accountSetting, addressBook, garage, helpCenter, orders, quotations, socialMedia, wishlist, payment } from '../../constants';

class profileLinks extends Component{

  settingLink = (link) =>{
    this.props.history.push(`${this.props.match.url}/${link}`)
  }
  render(){
    const { match, translate } = this.props;
    const links = [
        { url: 'quotations', name: translate(`setting.links.${quotations}`) },
        { url: 'orders', name: translate(`setting.links.${orders}`) },
        { url: 'help_center', name: translate(`setting.links.${helpCenter}`) },
        { url: 'wishlist', name: translate(`setting.links.${wishlist}`) },
        { url: 'garage', name: translate(`setting.links.${garage}`) },
        { url: 'profile', name: translate(`setting.links.${accountSetting}`) },
        { url: 'addresses', name: translate(`setting.links.${addressBook}`) },
        { url: 'connect', name: translate(`setting.links.${socialMedia}`) },
        { url: 'payment', name: payment },
    ]

    return(
      <Fragment>
          <div className="col-md-2 w3-hide-small w3-hide-medium">
              <div class="list-group">
                  {links.map((link, idx) => {
                      return (
                          <Link
                              key={idx}
                              data-toggle="list"
                              className="list-group-item list-group-item-action"
                              to="#"
                              onClick={() => this.settingLink(link.url)}>
                              {link.name}
                          </Link>
                      )
                  })}
              </div>
          </div>
      </Fragment>
    )
  }
}

export default profileLinks;
