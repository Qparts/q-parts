import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addRecentViewedProducts } from '../../actions/customerAction';
import { getSortedProducts } from '../../actions/apiAction';
import { Paginator } from 'primereact/components/paginator/Paginator';
import Select from 'react-select';
import Button from '../UI/Button';
import { styles, categorySortOptions } from '../../constants';
import ProductGridView from '../ProductGridView/ProductGridView';
import WithProductView from '../../hoc/WithProductView';

import './Accessories.css';

class Accessories extends Component {

  render() {
    const buttonsStyle = {
      price: {
        width: '5em'
      }
    }

    return (
      <Fragment>
        <div style={styles.grey} className="Accessories-title">
          <h4>Accessories</h4>
        </div>
        <div className="Accessories-sort_by">
          <label htmlFor="">Sort by</label>
          <Select options={categorySortOptions} onChange={this.props.handleSelectChange} />
        </div>
        <div className="Accessories-container">
          <div className="Accessories-filter border rounded card">
            <p>Categories</p>
            <input className="form-control" type="text" name="" id="" placeholder="Search" />
            <div>
              <input type="checkbox" name="vehicle1" value="Bike" />
              <label>ATD</label>
            </div>
            <hr />
            <p>Made In</p>
            <input className="form-control" type="text" name="" id="" placeholder="Search" />
            <div>
              <input type="checkbox" name="vehicle1" value="Bike" />
              <label>China</label>
            </div>
            <hr />
            <p>Brand</p>
            <input className="form-control" type="text" name="" id="" placeholder="Search" />
            <div>
              <input type="checkbox" name="vehicle1" value="Bike" />
              <label>ATD</label>
            </div>
            <hr />
            <p>Price</p>
            <div>
              <input type="checkbox" name="vehicle1" value="Bike" />
              <label>{"< 50"}</label>
            </div>
            <div className="Accessories-filter_price">
              <input style={buttonsStyle.price} className="form-control" type="text" placeholder="Min" name="" id="" />
              <input style={buttonsStyle.price} className="form-control" type="text" placeholder="Max" name="" id="" />
              <Button text="Go" className="btn btn-secondary" />
            </div>
            <hr />
            <p>Rating</p>
            <div>
              <input type="checkbox" name="vehicle1" value="Bike" />
              <label>{"4 andf up more"}</label>
            </div>
            <div>
              <input type="checkbox" name="vehicle1" value="Bike" />
              <label>{"3 andf up more"}</label>
            </div>
            <hr />
            <Button text="Clear all" className="btn btn-secondary" />
          </div>
          <div className="Accessories-contents">
            {/* <ProductGridView product={this.props.currentProducts}/> */}
            <div className="Accessories-footer">
              <Paginator
                first={this.props.first}
                rows={this.props.rows}
                totalRecords={this.props.products.length}
                onPageChange={this.props.onPageChange.bind(this)}
                template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink">
              </Paginator>
            </div>
          </div>
        </div>
      </Fragment >
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.api.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
    getSortedProducts: () => dispatch(getSortedProducts())
  }
}

const withAccessories = WithProductView(Accessories)

export default connect(mapStateToProps, mapDispatchToProps)(withAccessories);