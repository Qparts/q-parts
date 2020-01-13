/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component } from 'react';
import moment from 'moment';
import { handleImageFallback, getTranslatedObject } from '../../utils';
import { DownMediumScreen, MediumScreen } from '../../components/Device';

import Link from '../../components/UI/Link';



import _ from 'lodash';

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlist: this.getWishlist()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.direction !== this.props.direction || prevProps.wishlist !== this.props.wishlist) {
      this.setState({
        wishlist: this.getWishlist()
      })
    }
  }

  getWishlist = () => {
    let result = [];
    const { translate, moveWishlistToCart, deleteWishlist } = this.props
    this.props.wishlist.forEach((list, idx) => {
      const created = moment(list.created).format('MM/DD/YYYY');
      const tempWishlist = {
        ...list,
        desc: list.desc,
        salesPrice: list.salesPrice.toFixed(2),
        currency: translate("general.currency"),
        created,
        actions: [
          <div key={idx} className="item-actions">
            <a href="#" className="btn btn-gray"  onClick={moveWishlistToCart.bind(this, list)}>
              <i className="icon-cart"></i> {translate("setting.wishlist.addToCart")}
            </a>
            <a href="#" className="btn" onClick={deleteWishlist.bind(this, list)}><i className="icon-trash"></i></a>
          </div>
        ],
        image: list.image,
        productNumber: list.productNumber,
        brand: list.brand
      }
      result.push(tempWishlist)
    });
    return result.length > 0 ? result : [{}];
  }

  render() {
    const { currentLanguage, translate } = this.props;
    return (
      <section className="wishlist">
        {
          _.isEmpty(this.props.wishlist) ? (
            <div className="empty">
              <figure><i className="icon-heart"></i></figure>
              <figcaption>
                <p>{translate("setting.wishlist.noWishlist")}</p>
                <span>
                  {translate("offers.subTitle")}
                </span>
                <Link
                  to={'/'}
                  className='btn btn-primary'
                  text={translate("setting.wishlist.startShopping")}
                  icon="icon-arrow-right"
                />
              </figcaption>
            </div>
          ) : (

            <div className="card">
              <header>
                <h2>{translate("setting.wishlist.wishlist")}<label>({this.state.wishlist.length} {translate("setting.wishlist.items")})</label></h2>
              </header>
              <ul className="list-unstyled">
            {
              this.state.wishlist.map((item, idx) => (

                <li className="media" key={idx}>
                  <a href={`/products/${item.id}`} className="media-img"><img onError={handleImageFallback} src={item.image} alt="no wishList" /></a>
                  <div className="media-body">
                    <div className="col">
                      <h5><a href={`/products/${item.id}`}>{getTranslatedObject(item, currentLanguage, 'desc', 'descAr')}</a></h5>
                      <ul className="list-inline">
                        <li><strong>{getTranslatedObject(item.brand, currentLanguage, 'name', 'nameAr')}</strong></li>
                        <li>#{item.productNumber}</li>
                      </ul>
                      <DownMediumScreen>
                        <p className="date">{translate("setting.wishlist.date")}:<span> {item.created}</span></p>
                      </DownMediumScreen>
                      <p className="price">{item.salesPrice} <span>{item.currency}</span></p>
                    </div>
                    <div className="col-md-auto">
                      <MediumScreen>
                        <p className="date">{translate("setting.wishlist.date")}:<span> {item.created}</span></p>
                      </MediumScreen>
                      {item.actions}
                    </div>
                  </div>
                </li>
            ))}
            </ul>
          </div>
        )}
      </section>
    )
  }
}

// const styles = {
//   addedDate: {
//     color: colors.charcoalGrey,
//   },
//   partText: {
//     color: colors.charcoalGrey
//   }
// }

export default Wishlist;
