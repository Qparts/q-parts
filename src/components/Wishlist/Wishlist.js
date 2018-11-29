import React, { Component } from 'react';
import Table from '../UI/Table';
import Button from '../UI/Button';
import moment from 'moment';
import { colors } from '../../constants';

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

        this.props.wishlist.forEach(list => {
            const tempWishlist = {
                desc: list.desc,
                salesPrice: `${list.salesPrice.toFixed(2)} SR`,
                created: `Added: ${moment(list.created).format('MM/DD/YYYY')}`,
                actions: [
                    <Button key={0} text={this.props.translate("setting.wishlist.table.addToCart")} className="btn-secondary" onClick={this.props.moveWishlistToCart.bind(this, list)} />,
                    <Button key={1} text={this.props.translate("setting.wishlist.table.delete")} className="btn btn-light" onClick={this.props.deleteWishlist.bind(this, list)} />
                ],
                image: 'https://images-na.ssl-images-amazon.com/images/I/61z0QXd06sL._SL1024_.jpg',
                productNumber: list.productNumber,
                manufacturerName: list.manufacturer.name
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
            <section id="wish-list" className="col-md-10">
                {
                    this.state.wishlist.map(item => (
                        <div className="border rounded card">
                            <div className="row">
                                <div className="col-md-2">
                                    <img style={{ height: '165px' }} src={item.image} alt="no vehicle found" />
                                </div>
                                <div className="col-md-3">
                                    <div className="wish-list_product-details">
                                        <span>{item.desc}</span>
                                        <span>{item.manufacturerName}</span>
                                        <span>{item.productNumber}</span>
                                        <span>{item.salesPrice}</span>
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <span style={styles.addedDate}>{item.created}</span>
                                    <div>
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
        color: colors.charcoalGrey
    }
}

export default Wishlist;