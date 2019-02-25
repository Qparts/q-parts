import React, { Component } from 'react';
import Button from '../UI/Button';
import moment from 'moment';
import { colors } from '../../constants';
import { handleImageFallback } from '../../utils';

class Wishlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wishlist: this.getWishlist()
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.wishlist !== this.props.wishlist) {
            this.setState({
                wishlist: this.getWishlist()
            })
        }
    }

    getWishlist = () => {
        let result = [];

        this.props.wishlist.forEach((list, idx) => {
            const tempWishlist = {
                ...list,
                desc: list.desc,
                salesPrice: list.salesPrice.toFixed(2),
                currency: 'SR',
                created: `Added: ${moment(list.created).format('MM/DD/YYYY')}`,
                actions: [
                    <div key={idx} className="cart-actions">
                        <Button
                            isReverseOrder={true}
                            className="btn btn-gray"
                            icon="icon-cart"
                            text={this.props.translate("setting.wishlist.table.addToCart")}
                            onClick={this.props.moveWishlistToCart.bind(this, list)} />
                        <Button
                            className="btn delete-btn"
                            icon="icon-trash"
                            onClick={this.props.deleteWishlist.bind(this, list)} />
                    </div>
                ],
                image: list.image,
                productNumber: list.productNumber,
                manufacturerName: list.brand.name
            }
            result.push(tempWishlist)
        });
        return result.length > 0 ? result : [{}];
    }

    render() {

        const { translate } = this.props;
        const headers = [
            translate("setting.wishlist.table.item"),
            translate("setting.wishlist.table.price"),
            translate("setting.wishlist.table.date"),
        ];
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
                                        <span className="manufacturer-text">{item.manufacturerName}</span>
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