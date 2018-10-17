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
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';

import { isEmpty } from '../../utils';

import './Tyres.css';

class Tyres extends Component {
	constructor(props) {
		super(props);
		this.state = {
			filtration: [],
			selectedRadio: null
		}
	}


	filter = (item, event) => {
		const { value, checked } = event;
		const index = this.state.filtration.indexOf(value);
		const { history, match } = this.props;

		if (checked && index === -1) {
			this.setState({
				filtration: [...this.state.filtration, value]
			});
		} else if (index !== -1) {
			const clone = [...this.state.filtration]
			clone.splice(index, 1);
			this.setState({
				filtration: clone
			});
		}
		history.push(`${match.url}?filter=${item}`);
	}

	filterRadio = (item, event) => {
		const { value } = event;
		const clone = [...this.state.filtration];
		const index = this.state.filtration.indexOf(this.state.selectedRadio);
		const { history, match } = this.props;

		if (index !== -1) {
			clone.splice(index, 1);
			this.setState({
				selectedRadio: value,
				filtration: [...clone, value]
			});
		} else {
			this.setState({
				selectedRadio: value,
				filtration: [...clone, value]
			});
		}
		history.push(`${match.url}?filter=${item}`);
	}

	removeItem = (index, event) => {
		event.preventDefault();
		const clone = [...this.state.filtration]
		clone.splice(index, 1);
		this.setState({
			filtration: clone
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
				<div style={styles.grey} className="Tyres-title">
					<h4>Tyres</h4>
				</div>
				<div className="Tyres-sort_by">
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
				<div className="Tyres-container">
					<div className="Tyres-filter border rounded card">
						<p>{filterObject.diameter.label}</p>
						<input className="form-control" type="text" name="" id="" placeholder="Search" />
						{this.props.renderSearch(filterObject.diameter, RadioButton, this.filterRadio, this.isChecked)}
						<hr />
						<p>{filterObject.profile.label}</p>
						{this.props.renderSearch(filterObject.profile, Checkbox, this.filter, this.isChecked)}
						<hr />
						<p>{filterObject.width.label}</p>
						<input className="form-control" type="text" name="" id="" placeholder="Search" />
						{this.props.renderSearch(filterObject.width, Checkbox, this.filter, this.isChecked)}
						<hr />
						<p>{filterObject.brand.label}</p>
						{this.props.renderSearch(filterObject.brand, Checkbox, this.filter, this.isChecked)}
						<hr />
						<p>{filterObject.price.label}</p>
						{this.props.renderSearch(filterObject.price, Checkbox, this.filter, this.isChecked)}
						<div className="Tyres-filter_price">
							<input style={buttonsStyle.price} className="form-control" type="text" placeholder="Min" name="" id="" />
							<input style={buttonsStyle.price} className="form-control" type="text" placeholder="Max" name="" id="" />
							<Button text="Go" className="btn btn-secondary" />
						</div>
						<hr />
						<p>{filterObject.rating.label}</p>
						{this.props.renderSearch(filterObject.rating, Checkbox, this.filter, this.isChecked)}
						<hr />
						<Button text="Clear all" className="btn btn-secondary" onClick={this.handleClear} />
					</div>
					<div className="Tyres-contents">
						<ProductGridView currentProducts={this.props.currentProducts} />
						<div className="Tyres-footer">
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

Tyres.defaultProps = {
	filterObject: {
		diameter: {
			label: 'Diameter',
			values: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
		},
		profile: {
			label: 'Profile',
			values: [35, 40, 45, 50, 55, 60, 65, 70, 75, 80]
		},
		width: {
			label: 'Tyre width',
			values: [165, 175, 185, 205, 215, 225, 235, 245, 255]
		},
		brand: {
			label: 'Brand',
			values: ['Nexen', 'Toyo']
		},
		price: {
			label: 'Price',
			values: ['> 50', '50-100', '100-300']
		},
		rating: {
			label: 'Rating',
			values: ['4 and up more', '3 and up more', 'Not yet rated']
		}
	}
}

const withTyres = WithProductView(Tyres);

export default connect(mapStateToProps, mapDispatchToProps)(withTyres);