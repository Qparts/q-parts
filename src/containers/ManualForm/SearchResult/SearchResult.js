
// TODO: remove part form logic from this class

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button';
import Select from 'react-select';
import { findSelectedPart } from '../../../actions/baseFormAction';
import { addToCart } from '../../../actions/cartAction';

import { generateQuantity } from '../../../utils';
import { isAuth } from '../../../utils';
import Header from '../../../components/UI/Header';
import { getTranslate } from 'react-localize-redux';

import './SearchResult.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPartQuantity: "",
      isAvailable: null
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.part !== this.props.part) {
      this.handleSetAvailableProduct(this.props.part.price !== null)
    }
  }


  handleSetAvailableProduct = (isAvailable) => {
    this.setState({ isAvailable });
  }

  handleChange = (value) => {
    this.setState({ selectedPartQuantity: value })
  }

  componentWillMount() {
    const { partNo, makeId } = this.props.match.params;
    this.props.findSelectedPart(partNo, makeId);
  }

  handleClick = (event) => {
    event.preventDefault();
    const { part } = this.props;
    const { selectedPartQuantity } = this.state;

    this.props.addToCart({ selectedPart: part, selectedPartQuantity });

  }

  handleMakeOrder = () => {
    if (!isAuth(this.props.token)) {
      this.props.history.push('/login');
    } else {
      this.props.history.push('/order/quotation-request');
    }
  }

  render() {
    const { isAvailable } = this.state;
    const { part, currentSearchVehicle, translate } = this.props

    if (!isAvailable) {
      return (
        <Fragment>
          <Header text={`${translate("searchResult.title")} ${currentSearchVehicle.name}`} />
          <div className="SearchResult-not_found">
            <p>{`${translate("searchResult.partAvailability")} ${currentSearchVehicle.name} ${translate("searchResult.notAvailable")}`}</p>
            <div className="SearchResult-buttons">
              <Button onClick={this.handleMakeOrder} className="btn btn-secondary" text={translate("searchResult.buttons.makeOrder")} />
              <Button className="btn btn-secondary" text={translate("searchResult.buttons.browse")} />
            </div>
          </div>
        </Fragment>
      )
    }

    let price = part.price ? part.price : 'the price is not available'
    const quantity = generateQuantity(20);
    const data = quantity.map(data => {
      return {
        value: data,
        label: data
      }
    });
    return (
      <Fragment>
        <div>
          <Fragment>
            <p>{part.partNumber}</p>
            <p>{price}</p>
            <Select
              data-testid="select"
              placeholder="please select a quantity"
              value={this.state.selectedPartQuantity}
              options={data}
              onChange={this.handleChange} />
            <Button disabled={!this.state.selectedPartQuantity} data-testid="submit" onClick={this.handleClick}>Add to cart</Button>
          </Fragment>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    part: state.manualOrder.part,
    currentSearchVehicle: state.manualOrder.currentSearchVehicle,
    token: state.customer.token,
    translate: getTranslate(state.localize),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    findSelectedPart: (partNo, makeId) => dispatch(findSelectedPart(partNo, makeId)),
    addToCart: (item) => dispatch(addToCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult);