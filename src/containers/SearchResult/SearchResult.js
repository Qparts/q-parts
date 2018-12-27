import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ProductGridView from '../../components/ProductGridView/ProductGridView';
import { addRecentViewedProducts } from '../../actions/customerAction';
import { getSortedProducts } from '../../actions/apiAction';
import Select from 'react-select';
import Button from '../../components/UI/Button';
import { styles as commonStyles, categorySortOptions } from '../../constants';
import WithProductView from '../../hoc/WithProductView';
import Checkbox from '../../components/UI/Checkbox';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';
import queryString from 'qs';
import { Collapse, Card, CardBody, CardTitle } from 'reactstrap';

import { isEmpty, replaceAll } from '../../utils';
import ProductListView from '../../components/ProductListView/ProductListView';

const diameter = 'diameter';
const profile = 'profile';
const width = 'width';
const brand = 'brand';
const price = 'price';
const rating = 'rating';
const Radio = 'Radio'
const GRID = 'GRID';
const LIST = 'LIST';

class TyresSearch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			collapse1: false,
			collapse2: false,
			collapse3: false,
			collapse4: false,
			collapse5: false,
			collapse6: false,
			selectedView: GRID
		};
	}

	toggle = (collapse) => {
		this.setState({ [collapse]: !this.state[collapse] });
	}

	changeView = (selectedView) => {
		this.setState({ selectedView })
	}

	componentDidMount() {
		const { location: { search }, filterObject } = this.props;
		const query = queryString.parse(search.slice(1));
		const keys = Object.keys(query);

		const filters = keys.map(key => {
			const componentType = filterObject[key] ? filterObject[key].componentType : null;
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

	getCollapseIcon = (collapse) => {
		return this.state[collapse] ? 'icon-minus' : 'icon-plus';
	}

	renderProducts = () => (
		this.state.selectedView === GRID ? (
			<ProductGridView currentProducts={this.props.currentProducts} />
		) :
			<ProductListView currentProducts={this.props.currentProducts} />
	)

	render() {
		console.log(this.state.selectedView === GRID);

		const styles = {
			iconGrid: {
				opacity: this.state.selectedView === GRID ? 1 : 0.3
			},
			iconList: {
				opacity: this.state.selectedView === LIST ? 1 : 0.3
			},
			show: {
				display: 'flex'
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
									<div className="col-3 dropdown-icon">
										<a onClick={this.toggle.bind(this, 'collapse1')}>
											<i className={this.getCollapseIcon('collapse1')} />
										</a>
									</div>
								</div>
								<Collapse isOpen={this.state.collapse1}>
									<Card className="filter-body">
										<CardBody>
											<input className="form-control search-box" type="text" placeholder="5" />
											{renderSearch({ filtration: filterObject.diameter, key: diameter }, Checkbox, onFilter, isChecked)}
										</CardBody>
									</Card>
								</Collapse>
								<span className="h-seperator" />
							</div>
							<div className="filter-category card col-12">
								<div className="row">
									<div className="col-9 title">
										<p>{filterObject.profile.label}</p>
									</div>
									<div className="col-3 dropdown-icon">
										<a onClick={this.toggle.bind(this, 'collapse2')}>
											<i className={this.getCollapseIcon('collapse2')} />
										</a>
									</div>
								</div>
								<Collapse isOpen={this.state.collapse2}>
									<Card className="filter-body">
										<input className="form-control search-box" type="text" name="" id="" placeholder="Search" />
										<CardBody>
											{renderSearch({ filtration: filterObject.profile, key: profile }, Checkbox, onFilter, isChecked)}
										</CardBody>
									</Card>
								</Collapse>
							</div>
							<div className="filter-category card col-12">
								<div className="row">
									<div className="col-9 title">
										<p>{filterObject.width.label}</p>
									</div>
									<div className="col-3 dropdown-icon">
										<a onClick={this.toggle.bind(this, 'collapse3')}>
											<i className={this.getCollapseIcon('collapse3')} />
										</a>
									</div>
								</div>
								<Collapse isOpen={this.state.collapse3}>
									<Card className="filter-body">
										<CardBody>
											<input className="form-control search-box" type="text" name="" id="" placeholder="Search" />
											{renderSearch({ filtration: filterObject.width, key: width }, Checkbox, onFilter, isChecked)}
										</CardBody>
									</Card>
								</Collapse>
							</div>

							<div className="filter-category card col-12">
								<div className="row">
									<div className="col-9 title">
										<p>{filterObject.brand.label}</p>
									</div>
									<div className="col-3 dropdown-icon">
										<a onClick={this.toggle.bind(this, 'collapse4')}>
											<i className={this.getCollapseIcon('collapse4')} />
										</a>
									</div>
								</div>
								<Collapse isOpen={this.state.collapse4}>
									<Card className="filter-body">
										<CardBody>
											<input className="form-control search-box" type="text" name="" id="" placeholder="Search" />
											{renderSearch({ filtration: filterObject.brand, key: brand }, Checkbox, onFilter, isChecked)}
										</CardBody>
									</Card>
								</Collapse>
							</div>

							<div className="filter-category card col-12">
								<div className="row">
									<div className="col-9 title">
										<p>{filterObject.price.label}</p>
									</div>
									<div className="col-3 dropdown-icon">
										<a onClick={this.toggle.bind(this, 'collapse5')}>
											<i className={this.getCollapseIcon('collapse5')} />
										</a>
									</div>
								</div>
								<Collapse isOpen={this.state.collapse5}>
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
							</div>

							<div className="filter-category card col-12">
								<div className="row">
									<div className="col-9 title">
										<p>{filterObject.rating.label}</p>
									</div>
									<div className="col-3 dropdown-icon">
										<a onClick={this.toggle.bind(this, 'collapse6')}>
											<i className={this.getCollapseIcon('collapse6')} />
										</a>
									</div>
								</div>
								<Collapse isOpen={this.state.collapse6}>
									<Card className="filter-body">
										<CardBody>
											{renderSearch({ filtration: filterObject.rating, key: rating }, Checkbox, onFilter, isChecked)}
										</CardBody>
									</Card>
								</Collapse>
							</div>
						</div>

						<div className="products-container col-9">
							<div className="search-control-panel row">
								<Card className="col-12">
									<CardTitle className="d-flex justify-content-between">
										<label htmlFor="">1 - 60 of 200 results</label>
										<div className="right-side-selection">
											<label htmlFor="">Sort by</label>
											<Select
												className="select__container"
												classNamePrefix="select"
												isSearchable={false}
												defaultValue={categorySortOptions[0]}
												options={categorySortOptions}
												onChange={this.props.handleSelectChange} />
											<i style={styles.iconList} className="icon-list" onClick={this.changeView.bind(this, LIST)} />
											<i style={styles.iconGrid} className="icon-grid" onClick={this.changeView.bind(this, GRID)} />
										</div>
									</CardTitle>
								</Card>
							</div>
							<div className="selected-filters-panel row">
								<div className="col-12" style={isEmpty(filtration) ? commonStyles.hide : styles.show}>
									{
										filtration.map((item, index) => (
											<label key={index}>{item}<i className="icon-close" onClick={onRemoveItem.bind(this, index)} /></label>
										))
									}
									<Button text="Clear all" className="btn-gray-secondary" onClick={onClear} />
								</div>
							</div>
							<div className="products-panel row">
								{this.renderProducts()}
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