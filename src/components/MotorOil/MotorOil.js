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
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import queryString from 'qs';

import { isEmpty, replaceAll } from '../../utils';

import './MotorOil.css';

const viscosity_grade = 'viscosity_grade';
const volume = 'volume';
const brand = 'brand';
const price = 'price';
const rating = 'rating';

class MotorOil extends Component {

	componentDidMount() {
		const { location: { search }, filterObject } = this.props;
		const query = queryString.parse(search.slice(1));
		const keys = Object.keys(query);

		const filters = keys.map(key => {
			const newArray = Array.isArray(query[key]) ? query[key] : [query[key]]
			const queryValues = replaceAll(newArray, '_', ' ');
			const values = [...new Set(queryValues)];

			return {
				label: key,
				values
			}
		});

		const newParams = search.slice(1).split(/[&]/).filter(param => !param.includes(','));

		this.props.onSetParams(newParams)
		return this.props.onAddToFilter(filters, filterObject);

	}

	componentDidUpdate(prevProps, prevState) {
		const { location: { search }, history, match } = this.props;

		if (search !== prevProps.location.search) {

		} else if (this.props.params !== prevProps.params) {
			history.push(`${match.url}${this.props.params}`);
		}
	}

	render() {
		const buttonsStyle = {
			price: {
				width: '5em'
			}
		}
		const { filterObject, isChecked, renderSearch, filtration, onFilter, onRemoveItem, onClear } = this.props;

		return (
			<Fragment>
				<div style={styles.grey} className="MotorOil-title">
					<h4>Motor Oil</h4>
				</div>
				<div className="MotorOil-sort_by">
					<label htmlFor="">Sort by</label>
					<Select options={categorySortOptions} onChange={this.props.handleSelectChange} />
				</div>
				<div style={isEmpty(filtration) ? styles.hide : styles.grey}>
					{
						filtration.map((item, index) => (
							<label key={index} style={{ ...styles.listingPage.searchResult, ...styles.rightSpace }} onClick={onRemoveItem.bind(this, index)}>{item}</label>
						))
					}
				</div>
				<div className="MotorOil-container">
					<div className="MotorOil-filter border rounded card">
						<p>{filterObject.viscosity_grade.label}</p>
						<input className="form-control" type="text" name="" id="" placeholder="Search" />
						{renderSearch({ filtration: filterObject.viscosity_grade, key: viscosity_grade }, Checkbox, onFilter, isChecked)}
						<hr />
						<p>{filterObject.volume.label}</p>
						{renderSearch({ filtration: filterObject.volume, key: volume }, Checkbox, onFilter, isChecked)}
						<hr />
						<p>{filterObject.brand.label}</p>
						{renderSearch({ filtration: filterObject.brand, key: brand }, Checkbox, onFilter, isChecked)}
						<hr />
						<p>{filterObject.price.label}</p>
						{renderSearch({ filtration: filterObject.price, key: price }, Checkbox, onFilter, isChecked)}
						<div className="MotorOil-filter_price">
							<input style={buttonsStyle.price} className="form-control" type="text" placeholder="Min" name="" id="" />
							<input style={buttonsStyle.price} className="form-control" type="text" placeholder="Max" name="" id="" />
							<Button text="Go" className="btn btn-secondary" />
						</div>
						<hr />
						<p>{filterObject.rating.label}</p>
						{renderSearch({ filtration: filterObject.rating, key: rating }, Checkbox, onFilter, isChecked)}
						<hr />
						<Button text="Clear all" className="btn btn-secondary" onClick={onClear} />
					</div>
					<div className="MotorOil-contents">
						<ProductGridView currentProducts={this.props.currentProducts} />
						<div className="MotorOil-footer">
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
			</Fragment>
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

MotorOil.defaultProps = {
	filterObject: {
		[viscosity_grade]: {
			label: 'Viscosity grade',
			values: ['SAE OW', 'SAE OW-5', 'SAE OW-10', 'SAE OW-15', 'SAE OW-20', 'SAE OW-30', 'SAE OW-40', 'SAE OW-42', 'SAE OW-50']
		},
		[volume]: {
			label: 'Volume',
			values: ['8 oz', '1 quart', '1.05 quart', '5 gllons', '15 oz']
		},
		[brand]: {
			label: 'Brand',
			values: ['ACDelco', 'Amalie oil']
		},
		[price]: {
			label: 'Price',
			values: ['> 50', '50-100', '100-300']
		},
		[rating]: {
			label: 'Rating',
			values: ['4 and up more', '3 and up more', 'Not yet rated']
		}
	}
}

const withMotorOil = WithProductView(MotorOil);

export default connect(mapStateToProps, mapDispatchToProps)(withMotorOil);