import React, { Component } from 'react';
import Table from '../UI/Table';
import Button from '../UI/Button';
import moment from 'moment';

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
    created: moment(list.created).format('MM/DD/YYYY'),
    actions: [
     <Button key={0} text={this.props.translate("setting.wishlist.table.addToCart")} className="btn btn-secondary" onClick={this.props.moveWishlistToCart.bind(this, list)} />,
     <Button key={1} text={this.props.translate("setting.wishlist.table.delete")} className="btn btn-light" onClick={this.props.deleteWishlist.bind(this, list)} />
    ]
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
   <section id="wish-list">
    {/* <div className="border rounded card">
     <Table headers={headers}
      columns={this.state.wishlist}
     />
    </div> */}
    <div className="component-background-color">

    </div>
   </section>
  )
 }
}

export default Wishlist;