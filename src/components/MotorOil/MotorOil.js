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

import { isEmpty, upperCaseFirstChar, replaceAll, addKey } from '../../utils';

import './MotorOil.css';

const viscosity_grade = 'viscosity_grade';
const volume = 'volume';
const brand = 'brand';
const price = 'price';
const rating = 'rating';

class MotorOil extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filtration: [],
			params: ''
		}
	}

	componentDidMount() {
		const { location: { search } } = this.props;
		const query = queryString.parse(search.slice(1));
		const keys = Object.keys(query);

		const filters = keys.map(key => {
			const newArray = [query[key]];
			const queryValues = replaceAll(newArray.join().split(','), '_', ' ');
			const values = [...new Set(queryValues)];

			return {
				label: key,
				values
			}
		});

		this.setState({ params: search });
		return this.addToFilter(filters);

	}

	componentDidUpdate(prevProps, prevState) {
		const { location: { search }, history, match } = this.props;

		if (search !== prevProps.location.search) {

		} else if (this.state.params !== prevState.params) {
			history.push(`${match.url}${this.state.params}`);
		}
	}

	addToFilter = (filters) => {
		let params = [];
		const { filterObject } = this.props;

		filters.forEach(data => {
			data.values.forEach(value => {
				const matchValues = filterObject[data.label] ? filterObject[data.label].values.includes(value) : null;
				const keyExists = filterObject[data.label];
				if (matchValues && keyExists) {
					params.push(`${upperCaseFirstChar(data.label).replace('_', ' ')} ${value}`);
				}
			});
		});


		this.setState({ filtration: params })
	}

	filter = (item, event) => {
		const { value, checked } = event;
		const index = this.state.filtration.indexOf(value);
		const itemValue = item.value.replace(/ /, '_');

		if (checked && index === -1) {
			const newParams = this.state.params.includes('?') ? this.state.params.concat(`&${item.key}=${itemValue}`) : this.state.params.concat(`?${item.key}=${itemValue}`);
			this.setState({
				filtration: [...this.state.filtration, value],
				params: newParams
			});
		} else if (index !== -1) {
			const clone = [...this.state.filtration];
			const newParams = this.state.params.slice(1).split(/[&]/);

			clone.splice(index, 1);
			newParams.splice(index, 1);
			this.setState({
				filtration: clone,
				params: '?'.concat(newParams.join('&'))
			});
		}
	}

	removeItem = (index, event) => {
		event.preventDefault();
		const clone = [...this.state.filtration];
		const newParams = this.state.params.slice(1).split(/[&]/);

		clone.splice(index, 1);
		newParams.splice(index, 1);
		
		this.setState({
			filtration: clone,
			params: '?'.concat(newParams.join('&'))
		});
	}

	isChecked = (value) => {
		const check = this.state.filtration.find(result => result === value);

		return check ? true : false;
	}

	handleClear = () => {
		this.setState({
			filtration: []
		})
	}

	render() {
		const buttonsStyle = {
			price: {
				width: '5em'
			}
		}
		const { filterObject } = this.props;

		return (
			<Fragment>
				<div style={styles.grey} className="MotorOil-title">
					<h4>Motor Oil</h4>
				</div>
				<div className="MotorOil-sort_by">
					<label htmlFor="">Sort by</label>
					<Select options={categorySortOptions} onChange={this.props.handleSelectChange} />
				</div>
				<div style={isEmpty(this.state.filtration) ? styles.hide : styles.grey}>
					{
						this.state.filtration.map((item, index) => (
							<label key={index} style={{ ...styles.listingPage.searchResult, ...styles.rightSpace }} onClick={this.removeItem.bind(this, index)}>{item}</label>
						))
					}
				</div>
				<div className="MotorOil-container">
					<div className="MotorOil-filter border rounded card">
						<p>{filterObject.viscosity_grade.label}</p>
						<input className="form-control" type="text" name="" id="" placeholder="Search" />
						{this.props.renderSearch({ filtration: filterObject.viscosity_grade, key: viscosity_grade }, Checkbox, this.filter, this.isChecked)}
						<hr />
						<p>{filterObject.volume.label}</p>
						{this.props.renderSearch({ filtration: filterObject.volume, key: volume }, Checkbox, this.filter, this.isChecked)}
						<hr />
						<p>{filterObject.brand.label}</p>
						{this.props.renderSearch({ filtration: filterObject.brand, key: brand }, Checkbox, this.filter, this.isChecked)}
						<hr />
						<p>{filterObject.price.label}</p>
						{this.props.renderSearch({ filtration: filterObject.price, key: price }, Checkbox, this.filter, this.isChecked)}
						<div className="MotorOil-filter_price">
							<input style={buttonsStyle.price} className="form-control" type="text" placeholder="Min" name="" id="" />
							<input style={buttonsStyle.price} className="form-control" type="text" placeholder="Max" name="" id="" />
							<Button text="Go" className="btn btn-secondary" />
						</div>
						<hr />
						<p>{filterObject.rating.label}</p>
						{this.props.renderSearch({ filtration: filterObject.rating, key: rating }, Checkbox, this.filter, this.isChecked)}
						<hr />
						<Button text="Clear all" className="btn btn-secondary" onClick={this.handleClear} />
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