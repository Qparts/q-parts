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
import { Collapse, Card, CardBody } from 'reactstrap';

import { isEmpty, replaceAll } from '../../utils';

const diameter = 'diameter';
const profile = 'profile';
const width = 'width';
const brand = 'brand';
const price = 'price';
const rating = 'rating';
const Radio = 'Radio'

class TyresSearch extends Component {

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = { collapse: true };
	}

	toggle() {
		this.setState({ collapse: !this.state.collapse });
	}

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

			<Fragment>
				<section id="results-container">
					<div className="container-fluid d-flex">
						<div className="filter-container col-3">
							<div className="filter-category card col-12">
								<div className="row">
									<div className="col-9 title">
										<p>{filterObject.diameter.label}</p>
									</div>
									<div className="col-3">
										<a onClick={this.toggle}>
											<i className="icon-cart" />
										</a>
									</div>
								</div>
								<Collapse isOpen={this.state.collapse}>
									<Card className="filter-body">
										<CardBody>
											<input className="form-control search-box" type="text" name="" id="" placeholder="Search" />
											{renderSearch({ filtration: filterObject.diameter, key: diameter }, RadioButton, onFilterRadio, isChecked)}
										</CardBody>
									</Card>
								</Collapse>
								<hr />
							</div>
							<div className="filter-category card col-12">
								<div className="row">
									<div className="col-9 title">
										<p>{filterObject.profile.label}</p>
									</div>
									<div className="col-3">
										<a onClick={this.toggle}>
											<i className="icon-cart" />
										</a>
									</div>
								</div>
								<Collapse isOpen={this.state.collapse}>
									<Card className="filter-body">
										<input className="form-control search-box" type="text" name="" id="" placeholder="Search" />
										<CardBody>
											{renderSearch({ filtration: filterObject.profile, key: profile }, Checkbox, onFilter, isChecked)}
										</CardBody>
									</Card>
								</Collapse>
								<hr />
							</div>
							<div className="filter-category card col-12">
								<div className="row">
									<div className="col-9 title">
										<p>{filterObject.width.label}</p>
									</div>
									<div className="col-3">
										<a onClick={this.toggle}>
											<i className="icon-cart" />
										</a>
									</div>
								</div>
								<Collapse isOpen={this.state.collapse}>
									<Card className="filter-body">
										<CardBody>
											<input className="form-control search-box" type="text" name="" id="" placeholder="Search" />
											{renderSearch({ filtration: filterObject.width, key: width }, Checkbox, onFilter, isChecked)}
										</CardBody>
									</Card>
								</Collapse>
								<hr />
							</div>

							<div className="filter-category card col-12">
								<div className="row">
									<div className="col-9 title">
										<p>{filterObject.brand.label}</p>
									</div>
									<div className="col-3">
										<a onClick={this.toggle}>
											<i className="icon-cart" />
										</a>
									</div>
								</div>
								<Collapse isOpen={this.state.collapse}>
									<Card className="filter-body">
										<CardBody>
											<input className="form-control search-box" type="text" name="" id="" placeholder="Search" />
											{renderSearch({ filtration: filterObject.brand, key: brand }, Checkbox, onFilter, isChecked)}
										</CardBody>
									</Card>
								</Collapse>
								<hr />
							</div>

							<div className="filter-category card col-12">
								<div className="row">
									<div className="col-9 title">
										<p>{filterObject.price.label}</p>
									</div>
									<div className="col-3">
										<a onClick={this.toggle}>
											<i className="icon-cart" />
										</a>
									</div>
								</div>
								<Collapse isOpen={this.state.collapse}>
									<Card className="filter-body">
										<CardBody>
											{renderSearch({ filtration: filterObject.price, key: price }, Checkbox, onFilter, isChecked)}
											<div className="row d-flex">
												<div className="col-lg-4 col-md-6 search-box-min-container">
													<input className="form-control search-box-min" type="text" placeholder="Min" name="" id="" />
												</div>
												<div className="col-lg-4 col-md-6 search-box-max-container">
													<input className="form-control search-box-max" type="text" placeholder="Max" name="" id="" />
												</div>
												<div className="col-lg-4 col-md-12 search-box-btn-container">
													<Button text="Go" className="btn btn-primary" />
												</div>
											</div>
										</CardBody>
									</Card>
								</Collapse>
								<hr />
							</div>

							<div className="filter-category card col-12">
								<div className="row">
									<div className="col-9 title">
										<p>{filterObject.rating.label}</p>
									</div>
									<div className="col-3">
										<a onClick={this.toggle}>
											<i className="icon-cart" />
										</a>
									</div>
								</div>
								<Collapse isOpen={this.state.collapse}>
									<Card className="filter-body">
										<CardBody>
											{renderSearch({ filtration: filterObject.rating, key: rating }, Checkbox, onFilter, isChecked)}
											<Button text="Clear all" className="btn btn-secondary" onClick={onClear} />
										</CardBody>
									</Card>
								</Collapse>
								<hr />
							</div>
						</div>

						<div className="products-container col-9">
							<div className="search-control-panel row">
								<div className="col-12">
									<label htmlFor="">Sort by</label>
									<Select options={categorySortOptions} onChange={this.props.handleSelectChange} />
								</div>
							</div>
							<div className="selected-filters-panel row">
								<div className="col-12" style={isEmpty(filtration) ? styles.hide : styles.grey}>
									{
										filtration.map((item, index) => (
											<label key={index} style={{ ...styles.listingPage.searchResult, ...styles.rightSpace }} onClick={onRemoveItem.bind(this, index)}>{item}</label>
										))
									}
								</div>
							</div>

							<div className="selected-compare-panel row">
								<div className="col-12" style={isEmpty(filtration) ? styles.hide : styles.grey}>
									{
										filtration.map((item, index) => (
											<label key={index} style={{ ...styles.listingPage.searchResult, ...styles.rightSpace }} onClick={onRemoveItem.bind(this, index)}>{item}</label>
										))
									}
								</div>
							</div>
							<div className="products-panel row">
								<ProductGridView currentProducts={this.props.currentProducts} />
							</div>
						</div>
					</div>
				</section>
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