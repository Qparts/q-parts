import React, { Component } from 'react';
import Button from '../UI/Button';
import moment from 'moment';
import { colors } from '../../constants';
import { handleImageFallback, getTranslatedObject } from '../../utils';

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: this.getWishlist()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.direction !== this.props.direction) {
            this.setState({
                wishlist: this.getWishlist()
            })
        }
    }

    getWishlist = () => {
        let result = [];
        const { translate, moveWishlistToCart, deleteWishlist } = this.props

        this.props.wishlist.forEach((list, idx) => {
            const tempWishlist = {
                ...list,
                desc: list.desc,
                salesPrice: list.salesPrice.toFixed(2),
                currency: translate("general.currency"),
                created: `${translate("setting.wishlist.date")}: ${moment(list.created).format('MM/DD/YYYY')}`,
                actions: [
                    <div key={idx} className="cart-actions">
                        <Button
                            isReverseOrder={true}
                            className="btn btn-gray"
                            icon="icon-cart"
                            text={translate("setting.wishlist.addToCart")}
                            onClick={moveWishlistToCart.bind(this, list)} />
                        <Button
                            className="btn delete-btn"
                            icon="icon-trash"
                            onClick={deleteWishlist.bind(this, list)} />
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

        const { currentLanguage } = this.props;
        return (
            <section id="wish-list" className="col-md-10 col-12">
                {
                    this.state.wishlist.map((item, idx) => (
                        <div key={idx} className="border rounded card">
                            <div className="row">
                                <div className="col-5 col-md-2">
                                    <img 
                                    style={{ height: '165px' }} 
                                    src={item.image} 
                                    onError={handleImageFallback}
                                    alt="no wish list found" />
                                </div>
                                <div className="col-7 col-md-3 pt">
                                    <div className="wish-list_product-details">
                                        <span className="part-text" style={styles}>{item.desc}</span>
                                        <span className="manufacturer-text">{getTranslatedObject(item.brand, currentLanguage, 'name', 'nameAr')}</span>
                                        <span className="part-text">{item.productNumber}</span>
                                        <div className="w-100">
                                            <span className="sales-price">{item.salesPrice}</span>
                                            <span className="currency">{item.currency}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 col-md-7 pt">
                                    <div>
                                        <span className="added-date" style={styles.addedDate}>{item.created}</span>
                                        {item.actions}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </section>
        )
    }
}

const styles = {
    addedDate: {
        color: colors.charcoalGrey,
    },
    partText: {
        color: colors.charcoalGrey
    }
}

export default Wishlist;