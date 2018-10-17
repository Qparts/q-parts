import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { formValueSelector } from 'redux-form';
import propTypes from 'prop-types';
import { Growl } from 'primereact/components/growl/Growl';

import './Catalog.css';

import SearchVin from '../../components/SearchVin/SearchVin';
import Group from '../../components/Group/Group';
import Subgroup from '../../components/Subgroup/Subgroup';
import {
  fetchUserSearch, fetchMakerData, fetchSubgroupSearch, fetchPartsSearch, findSelectedPart, cleanSelectedPart
} from '../../actions/catalogAction';
import Parts from '../../components/Parts/Parts';

import { addToCart } from '../../actions/cartAction';

class Catalog extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedPartQuantity: ""
    }
  }

  componentWillMount() {
    this.props.fetchMakerData();
  }


  submit = value => {
    this.props.fetchUserSearch(value.makerName.value, value.vin);
  }

  handleGroupSubmit = (groupId, event) => {
    const { makerName, carId } = this.props;
    this.props.fetchSubgroupSearch(makerName.value, carId, groupId);
  }

  handleSubgroupSubmit = (parentId) => {
    const { makerName, carId } = this.props;
    this.props.fetchPartsSearch(makerName.value, carId, parentId)
  }

  handleShowPartDetails = (positionId) => { //TODO: ask if we have more than one partGroup. If so, I need to loop through the parts instead of getting the first value

    this.props.findSelectedPart(positionId);

    this.setState({
      selectedPartQuantity: ""
    });

  }

  handleSelectedPartQuantity = (selectedPartQuantity) => {
    this.setState({ selectedPartQuantity })
  }

  handleAddToCart = (item) => {
    const numberOfItem = item.selectedPartQuantity.value;
    this.props.addToCart(item);
    this.props.cleanSelectedPart();
    this.growl.show({ severity: 'success', summary: 'Success', detail: `${numberOfItem} Item added to the cart` })

  }

  renderField = ({ label, type, placeholder, input, meta: { touched, error } }) => {

    return (
      <div>
        <label htmlFor={label}></label>
        <input
          type={type}
          placeholder={placeholder}
          {...input} />
        {touched && error}
      </div>
    );
  }

  render() {
    return (
      <div className="Catalog-container">
        <Growl ref={(el) => { this.growl = el; }}></Growl>
        <SearchVin makerData={this.props.makerData} onSubmit={this.submit} renderField={this.renderField} />
        <Group vehicleGroups={this.props.vehicleGroups} handleGroupSubmit={this.handleGroupSubmit} />
        <Subgroup vehicleSubgroups={this.props.vehicleSubgroups} handleSubgroupSubmit={this.handleSubgroupSubmit} />
        <Parts
          renderField={this.renderField}
          selectedPart={this.props.selectedPart}
          parts={this.props.parts}
          selectedPartQuantity={this.state.selectedPartQuantity}
          handleSelectedPartQuantity={this.handleSelectedPartQuantity}
          onPartClick={this.handleShowPartDetails}
          handleAddToCart={this.handleAddToCart} />
      </div>
    );
  }
}

Catalog.propTypes = {
  vehicleGroups: propTypes.array.isRequired,
  parts: propTypes.shape({
    img: propTypes.string,
    imgDescription: propTypes.string,
    partGroup: propTypes.arrayOf(propTypes.shape({
      number: propTypes.number,
      name: propTypes.string,
      description: propTypes.string,
      part: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string,
        price: propTypes.number,
        name: propTypes.string,
        notice: propTypes.string,
        description: propTypes.string,
        quantity: propTypes.string,
        positionNumber: propTypes.string,
        url: propTypes.string
      })),
    })),
    purchasedItems: propTypes.array,
    cartId: propTypes.string
  })
}

const mapStateToProps = (state) => {
  const selector = formValueSelector('SearchVin')
  return {
    vehicleGroups: state.catalog.vehicleGroups,
    vehicleSubgroups: state.catalog.vehicleSubgroups,
    makerData: state.catalog.makerData,
    carId: state.catalog.carId,
    parts: state.catalog.parts,
    selectedPart: state.catalog.selectedPart,
    makerName: selector(state, 'makerName')
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchUserSearch,
    fetchMakerData,
    fetchSubgroupSearch,
    fetchPartsSearch,
    addToCart,
    findSelectedPart,
    cleanSelectedPart
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);