import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ProductGridView from '../../components/ProductGridView/ProductGridView';
import { addRecentViewedProducts } from '../../actions/customerAction';
import { getSortedProducts } from '../../actions/apiAction';
import Select from 'react-select';
// import Button from '../../components/UI/Button';
import Button from '../../components/UI/Button';
import { styles as commonStyles, categorySortOptions, colors } from '../../constants';
import WithProductView from '../../hoc/WithProductView';
import Checkbox from '../../components/UI/Checkbox';
import queryString from 'qs';
import {
	Collapse, Card, CardBody, CardTitle, ListGroup, InputGroup, InputGroupAddon, Input
} from 'reactstrap';
import { ClipLoader } from 'react-spinners';

import { isEmpty, replaceAll } from '../../utils';
import * as constant from '../../constants';
import _ from 'lodash';
import ProductListView from '../../components/ProductListView/ProductListView';
import { MediumScreen, SmallScreen } from '../../components/Device';
import { getGeneralSearch } from '../../utils/api';
import { getActiveLanguage } from 'react-localize-redux';

import { right, getQuery, replaceQuery} from '../../utils';
const GRID = 'GRID';
const LIST = 'LIST';

class SearchResult extends Component {

	constructor(props) {
		super(props);
		this.state = {
			collapse1: false,
			collapse2: false,
			collapse3: false,
			collapse4: false,
			collapse5: false,
			collapse6: false,
			selectedView: GRID,
			searchGeneral: [],
			loading: true,
			resultSize: 0,
			startSize: 1,
			endSize: 18,
		};


	}
	quantityProducts = () => {
		const params = getQuery(this.props.location);
		let pageNumber = Number(params.page);
		if(this.state.endSize === this.state.resultSize && this.state.startSize !==1){
			this.setState({ startSize:  this.state.resultSize})
		}else{
			let size = pageNumber * 18 - 17
			this.setState({
				startSize: size,
				endSize: size + 18 - 1
			})
		}
	}
	setGeneralSearch = (search) => {
		this.quantityProducts();
		getGeneralSearch(search).then(res => {
			if(res.data.products.length<18){
				this.setState({endSize: res.data.resultSize})
			}
			this.setState({
				searchGeneral: res.data,
				loading: false,
				resultSize: res.data.resultSize,
			})
		});
	}

	toggle = (collapse) => {
		this.setState({ [collapse]: !this.state[collapse] });
	}

	changeView = (selectedView) => {
		this.setState({ selectedView })
	}

	nextPage = (e) => {
    const params = getQuery(this.props.location);
		let pageNumber = Number(params.page) + 1;
		if(this.state.startSize === this.state.resultSize){
			this.setState({ startSize:  this.state.resultSize})
		}else{
			let size = pageNumber * 18 - 17;
			this.setState({
				startSize: size,
				endSize: size + 18 - 1
			})
		}
			this.props.history.push(replaceQuery(this.props.location,"nextPage"));
	}
	prevPage = (e) =>{
    const params = getQuery(this.props.location);
		let pageNumber = Number(params.page)-1;
		if(pageNumber <= 1 ){
			pageNumber = 1;
		}
		let size = pageNumber * 18 - 17
			this.setState({
				startSize: size,
				endSize: size + 18 - 1
			})
				this.props.history.push(replaceQuery(this.props.location,"prePage"));
	}
	componentDidMount() {

		const { location: { search } } = this.props;

		let key = this.props.currentLanguage === constant.EN ? 'filterTitle' : 'filterTitleAr';
		this.setGeneralSearch(search);

		const { searchGeneral: { filterObjects } } = this.state;

		const query = queryString.parse(search.slice(1));
		// const keys = Object.keys(query);

		const filters = !_.isUndefined(filterObjects) ? filterObjects.map(filterObject => {
			const lastIndex = query[key].length - 1;
			const newArray = Array.isArray(query[key]) ? query[key] : [query[key]]
			const queryValues = replaceAll(newArray, '_', ' ');
			const values = queryValues.length > 1 ? [...new Set(queryValues)] : [];

			return {
				filterTitle: key,
				Checkbox,
				values
			}
		}) : [];

		this.quantityProducts();

		const newParams = search.slice(1).split(/[&]/).filter(param => !param.includes(','));

		this.props.onSetParams(newParams)
	}

	componentDidUpdate(prevProps, prevState) {
		const { location: { search }, history, match } = this.props;

		if (search !== prevProps.location.search) {
			this.setGeneralSearch(search);

		} else if (this.props.params !== prevProps.params) {
			history.push(`${match.url}${this.props.params}`);
		}
	}

	getCollapseIcon = (collapse) => {
		return this.state[collapse] ? 'icon-minus' : 'icon-plus';
	}

	renderProducts = () => (
		this.state.searchGeneral.products.map((product, idx) => (
			this.state.selectedView === GRID ? (
				<ProductGridView key={idx} product={product} />
			)
				:
				<Card key={idx} className="product-list-view col-12">
					<ListGroup>
						<ProductListView product={product} />
					</ListGroup>
				</Card>
		))
	)

	renderIcons = (styles) => (
		<Fragment>
			<MediumScreen>
				<i style={styles.iconList} className="icon-list" onClick={this.changeView.bind(this, LIST)} />
				<i style={styles.iconGrid} className="icon-grid" onClick={this.changeView.bind(this, GRID)} />
			</MediumScreen>
			<SmallScreen>
				{
					this.state.selectedView === GRID ?
						<i style={styles.iconList} className="icon-list" onClick={this.changeView.bind(this, LIST)} /> :

						<i style={styles.iconGrid} className="icon-grid" onClick={this.changeView.bind(this, GRID)} />
				}
				<span className="seperator" />
				<i className="icon-filter" onClick={this.changeView.bind(this, GRID)} />
			</SmallScreen>
		</Fragment>
	)

	render() {
		const styles = {
			iconGrid: {
				opacity: this.state.selectedView === GRID ? 1 : 0.3
			},
			iconList: {
				opacity: this.state.selectedView === LIST ? 1 : 0.3
			},
			show: {
				display: 'flex',
				height: '41px'
			},
			loading: {
				textAlign: 'center'
			}
		}
		const { isChecked, renderSearch, filtration, onFilter, onRemoveItem, onClear, onFilterRadio, currentLanguage } = this.props;
		const { location: { pathname, search } } = this.props;
		const { searchGeneral: { filterObjects } } = this.state;
		let key = this.props.currentLanguage === constant.EN ? 'filterTitle' : 'filterTitleAr';


		const override = `
            border-color: ${colors.brandColor} !important;
            border-bottom-color: transparent !important;
        `;
		if (_.isEmpty(filterObjects))
			return (
				<div className="container-fluid" style={styles.loading}>
					<ClipLoader
						css={override}
						sizeUnit={"px"}
						size={150}
						loading={this.state.loading}
					/>
				</div>
			)

			let btnNext = <button onClick={this.nextPage} className="btn btn-primary btn-next col-6 col-md-3">
					<span>Next Page</span>
					<i className="icon-arrow-right"/>
			</button>
			let btnPrev = <button onClick={this.prevPage} className="btn btn-primary col-6 col-md-3">
					<i className="icon-arrow-left"/>
					<span>Previous Page</span>
			</button>

			if(this.state.startSize <=1){
				btnPrev ="";
			}
			if(this.state.endSize === this.state.resultSize){
				btnNext ="";
			}
		return (
			<Fragment>
				<section id="results-container">
					<div className="container-fluid d-flex">
						<MediumScreen>

							<div className="filter-container col-3">
								{
									filterObjects.map((filterObject, idx) => {
										return <div key={idx} className="filter-category card col-12">
											<div className="row">
												<div className="col-9 title">
													<p>{filterObject[key]}</p>
												</div>
												<div className="col-3 dropdown-icon">
													<Link to={`${pathname}${search}`} onClick={this.toggle.bind(this, 'collapse1')}>
														<i className={this.getCollapseIcon('collapse1')} />
													</Link>
												</div>
											</div>
											<Collapse isOpen={this.state.collapse1}>
												<Card className="filter-body">
													<CardBody>
														<InputGroup>
															<InputGroupAddon addonType="prepend">
																<i className="icon-search" />
															</InputGroupAddon>
															<Input className="search-box" type="text" placeholder="Search" />
														</InputGroup>
														{renderSearch(filterObject, Checkbox, onFilter, isChecked, currentLanguage)}
													</CardBody>
												</Card>
											</Collapse>
											<span className="h-seperator" />
										</div>
									})
								}
								{/* <div className="filter-category card col-12">
									<div className="row">
										<div className="col-9 title">
											<p>{filterObject['price']}</p>
										</div>
										<div className="col-3 dropdown-icon">
											<Link to="#" onClick={this.toggle.bind(this, 'collapse1')}>
												<i className={this.getCollapseIcon('collapse1')} />
											</Link>
										</div>
									</div>
									<Collapse isOpen={this.state.collapse1}>
										<Card className="filter-body">
											<CardBody>
												<InputGroup>
													<InputGroupAddon addonType="prepend">
														<i className="icon-search" />
													</InputGroupAddon>
													<Input className="search-box" type="text" placeholder="Search" />
												</InputGroup>
												{renderSearch(filterObject, Checkbox, onFilter, isChecked, currentLanguage)}
											</CardBody>
										</Card>
									</Collapse>
									<span className="h-seperator" />
								</div>
								<div className="filter-category card col-12">
									<div className="row">
										<div className="col-9 title">
											<p>{filterObject.rating.label}</p>
										</div>
										<div className="col-3 dropdown-icon">
											<Link to="#" onClick={this.toggle.bind(this, 'collapse6')}>
												<i className={this.getCollapseIcon('collapse6')} />
											</Link>
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
							 */}
							</div>
						</MediumScreen>
						<div className="products-container col-12 col-md-9">
							<div className="search-control-panel row">
								<Card className="col-12">
									<CardTitle className="d-flex justify-content-between">
										<MediumScreen>
											<label htmlFor="">{this.state.startSize} - {this.state.endSize} of {this.state.resultSize} results</label>
										</MediumScreen>
										<SmallScreen>
											<Select
												className="select__container"
												classNamePrefix="select"
												isSearchable={false}
												defaultValue={categorySortOptions[0]}
												options={categorySortOptions}
												onChange={this.props.handleSelectChange} />
										</SmallScreen>
										<div className="right-side-selection">
											<MediumScreen>
												<div style={{display: "none"}}>
													<label htmlFor="">Sort by</label>
													<Select
														className="select__container"
														classNamePrefix="select"
														isSearchable={false}
														defaultValue={categorySortOptions[0]}
														options={categorySortOptions}
														onChange={this.props.handleSelectChange} />
												</div>
											</MediumScreen>
											<SmallScreen>
												<span className="seperator" />
											</SmallScreen>
											{this.renderIcons(styles)}
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
									<Button text="Clear all" className="btn btn-gray-secondary" onClick={onClear} />
								</div>
							</div>
							<div className="products-panel row">
								{this.renderProducts()}
								<div className="footer-button col-12">
									{btnPrev}
									{btnNext}
								</div>
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
		products: state.api.products,
		currentLanguage: getActiveLanguage(state.localize).code,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
		getSortedProducts: () => dispatch(getSortedProducts())
	}
}

const withTyresSearch = WithProductView(SearchResult);

export default connect(mapStateToProps, mapDispatchToProps)(withTyresSearch);
