import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ProductGridView from '../../components/ProductGridView/ProductGridView';
import { addRecentViewedProducts } from '../../actions/customerAction';
import { getSortedProducts } from '../../actions/apiAction';
import Select from 'react-select';
import Button from '../../components/UI/Button';
import { styles, categorySortOptions } from '../../constants';
import WithProductView from '../../hoc/WithProductView';
import { Checkbox } from 'primereact/components/checkbox/Checkbox';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';
import queryString from 'qs';

import { isEmpty, replaceAll } from '../../utils';

const diameter = 'diameter';
const profile = 'profile';
const width = 'width';
const brand = 'brand';
const price = 'price';
const rating = 'rating';
const Radio = 'Radio'

class TyresSearch extends Component {

	componentDidMount() {
		const { location: { search }, filterObject } = this.props;
		const query = queryString.parse(search.slice(1));
		const keys = Object.keys(query);

		const filters = keys.map(key => {
			const componentType = filterObject[key].componentType;
			const lastIndex = query[key].length - 1;
			const newArray = Array.isArray(query[key]) ? query[key] : [query[key]]
			const queryValues = replaceAll(newArray, '_', ' ');
			const values = queryValues.length > 1 && componentType === Radio ? [query[key][lastIndex]] : [...new Set(queryValues)];

			return {
				label: key,
				componentType,
				values
			}
		});

		const newParams = search.slice(1).split(/[&]/).filter(param => !param.includes(','));

		this.props.onSetParams(newParams)
		this.props.onSetRadioButton(filters)
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
		const { filterObject, isChecked, renderSearch, filtration, onFilter, onRemoveItem, onClear, onFilterRadio } = this.props;

		return (
			<section id="search-result">
				<div className="Tyres-sort_by">
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
				<div className="Tyres-container">
					<div className="Tyres-filter border rounded card">
						<p>{filterObject.diameter.label}</p>
						<input className="form-control" type="text" name="" id="" placeholder="Search" />
						{renderSearch({ filtration: filterObject.diameter, key: diameter }, RadioButton, onFilterRadio, isChecked)}
						<hr />
						<p>{filterObject.profile.label}</p>
						{renderSearch({ filtration: filterObject.profile, key: profile }, Checkbox, onFilter, isChecked)}
						<hr />
						<p>{filterObject.width.label}</p>
						<input className="form-control" type="text" name="" id="" placeholder="Search" />
						{renderSearch({ filtration: filterObject.width, key: width }, Checkbox, onFilter, isChecked)}
						<hr />
						<p>{filterObject.brand.label}</p>
						{renderSearch({ filtration: filterObject.brand, key: brand }, Checkbox, onFilter, isChecked)}
						<hr />
						<p>{filterObject.price.label}</p>
						{renderSearch({ filtration: filterObject.price, key: price }, Checkbox, onFilter, isChecked)}
						<div className="Tyres-filter_price">
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
					<div className="Tyres-contents">
						<ProductGridView currentProducts={this.props.currentProducts} />
					</div>
				</div>
			</section>
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

TyresSearch.defaultProps = {
	filterObject: {
		[diameter]: {
			componentType: 'Radio',
			label: 'Diameter',
			values: ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
		},
		[profile]: {
			componentType: 'Checkbox',
			label: 'Profile',
			values: ['35', '40', '45', '50', '55', '60', '65', '70', '75', '80']
		},
		[width]: {
			componentType: 'Checkbox',
			label: 'Tyre width',
			values: ['165', '175', '185', '205', '215', '225', '235', '245', '255']
		},
		[brand]: {
			componentType: 'Checkbox',
			label: 'Brand',
			values: ['Nexen', 'Toyo']
		},
		[price]: {
			componentType: 'Checkbox',
			label: 'Price',
			values: ['> 50', '50-100', '100-300']
		},
		[rating]: {
			componentType: 'Checkbox',
			label: 'Rating',
			values: ['4 and up more', '3 and up more', 'Not yet rated']
		}
	}
}

const withTyresSearch = WithProductView(TyresSearch);

export default connect(mapStateToProps, mapDispatchToProps)(withTyresSearch);