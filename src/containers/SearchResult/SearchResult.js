import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ProductGridView from '../../components/ProductGridView/ProductGridView';
import { addRecentViewedProducts } from '../../actions/customerAction';
import { getSortedProducts } from '../../actions/apiAction';
import Select from 'react-select';
// import Button from '../../components/UI/Button';
import Button from '../../components/UI/Button';
import WithProductView from '../../hoc/WithProductView';
import Checkbox from '../../components/UI/Checkbox';
import queryString from 'qs';
import { Card, ListGroup, CardBody,InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { isEmpty, replaceAll } from '../../utils';
import * as constant from '../../constants';
import { colors, styles, styles as commonStyles } from '../../constants';
import _ from 'lodash';
import ProductListView from '../../components/ProductListView/ProductListView';
import { getGeneralSearch } from '../../utils/api';
import { getActiveLanguage, getTranslate } from 'react-localize-redux';
//mobile filter
import { LargeScreen, DownLargeScreen } from '../../components/Device';
import Sidebar from "react-sidebar";
import { right, getQuery, replaceQuery } from '../../utils';
//HTML Component
import Stars from 'react-stars';
import { starsRating } from '../../constants';
import { ClipLoader } from "react-spinners";

import { handleImageFallback, getTranslatedObject } from '../../utils';
import { getLength } from '../../utils/array';

const GRID = 'GRID';
const LIST = 'LIST';



const sortOptions = [
	{ value: 1, label: "Best Match" },
	{ value: 2, label: "Price: Low to High" },
	{ value: 3, label: "Price: High to Low" }
];
const tireWidth = [
	{ value: 1, label: "15" },
	{ value: 2, label: "115" },
	{ value: 3, label: "125" },
	{ value: 4, label: "15" },
	{ value: 5, label: "115" },
	{ value: 6, label: "125" }
];
const groupedWidthTiresOptions = [
	{
		options: tireWidth,
	},
];
const formatWidthTiresGroupLabel = () => (
	<div className="placeholder">
		<span>Select Width</span>
	</div>
);
const tireHeight = [
	{ value: 1, label: "35" },
	{ value: 2, label: "40" },
	{ value: 3, label: "45" }
];
const groupedHeightTiresOptions = [
	{
		options: tireHeight,
	},
];
const formatHeightTiresGroupLabel = () => (
	<div className="placeholder">
		<span>Select Height</span>
	</div>
);

const tireDiameter = [
	{ value: 1, label: "14" },
	{ value: 2, label: "15" },
	{ value: 3, label: "16" }
];
const groupedDiameterTiresOptions = [
	{
		options: tireDiameter,
	},
];
const formatDiameterTiresGroupLabel = () => (
	<div className="placeholder">
		<span>Select Diameter</span>
	</div>
);
//END HTML Component
class SearchResult extends Component {
	static defaultProps = {
					filterObjects: [
							{
									filterTitle: "Brands",
									filterTitleAr: "الماركة",
									options: [
											{
													id: 1,
													value: "Toyota",
													valueAr: "تويوتا"
											},
											{
													id: 2,
													value: "kia",
													valueAr: "تويوتا"
											}
									]
							},
							{
									filterTitle: "Volume",
									filterTitleAr: "الماركة",
									options: [
											{
													id: 1,
													value: "8 oz",
													valueAr: "8 oz"
											}
									]
							}
					]
			}
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
			isHidden: 'is-hidden',
			movesOut: '',
			resultSize: 0,
			startSize: 1,
			endSize: 18,
		};
		this.header = createRef();
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}

	onSetSidebarOpen(open) {
		this.setState({ sidebarOpen: open });
	}
	quantityProducts = () => {
		const params = getQuery(this.props.location);
		let pageNumber = Number(params.page);
		if (this.state.endSize === this.state.resultSize && this.state.startSize !== 1) {
			this.setState({ startSize: this.state.resultSize })
		} else {
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
			if (res.data.products.length < 18) {
				this.setState({ endSize: res.data.resultSize })
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
		if (this.state.startSize === this.state.resultSize) {
			this.setState({ startSize: this.state.resultSize })
		} else {
			let size = pageNumber * 18 - 17;
			this.setState({
				startSize: size,
				endSize: size + 18 - 1
			})
		}
		this.props.history.push(replaceQuery(this.props.location, "nextPage"));
	}
	prevPage = (e) => {
		const params = getQuery(this.props.location);
		let pageNumber = Number(params.page) - 1;
		if (pageNumber <= 1) {
			pageNumber = 1;
		}
		let size = pageNumber * 18 - 17
		this.setState({
			startSize: size,
			endSize: size + 18 - 1
		})
		this.props.history.push(replaceQuery(this.props.location, "prePage"));
	}
	componentDidMount() {

		const { location: { search } } = this.props;

		let key = this.props.currentLanguage === constant.EN ? 'filterTitle' : 'filterTitleAr';
		this.setGeneralSearch(search);

		const { searchGeneral: { filterObjects } } = this.state;

		const query = queryString.parse(search.slice(1));
		// const keys = Object.keys(query);
		const filters = !_.isUndefined(filterObjects) ? filterObjects.map(filterObject => {
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

	renderProducts = () => {
		const { translate, currentLanguage, direction } = this.props;
		return this.state.searchGeneral.products.map((product, idx) => (
			this.state.selectedView === GRID ? (
				<ProductGridView
					key={idx}
					product={product}
					currentLanguage={currentLanguage}
					translate={translate} />
			)
				:
				<Card key={idx} className="product-list-view col-12">
					<ListGroup>
						<ProductListView product={product}
							currentLanguage={currentLanguage}
							translate={translate}
							direction={direction} />
					</ListGroup>
				</Card>
		));
	}

	//filters
	setFilter = (filter) => {
		console.log(filter);
	}
	//END Filter
	handleClick = () => {
		if (this.state.isHidden === 'is-hidden') {
			this.setState({
				isHidden: '',
				movesOut: 'moves-out'
			})
		}
	}

	handleBack = () => {
		this.setState({
			isHidden: 'is-hidden',
			movesOut: ''
		})
	}
	render() {
		//sidebar
		const { isChecked, renderSearch, filtrationChecked, onFilter, onRemoveItem, onClear, onFilterRadio, currentLanguage } = this.props;
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

			let btnNext = <a href="#" onClick={this.nextPage} className="btn btn-primary ">
				Next Page
				<i className="icon-arrow-right"></i>
			</a>

			let btnPrev = <a href="#" onClick={this.prevPage} className="btn btn-primary ">
				Previous Page
				<i className="icon-arrow-left"></i>
			</a>

			if(this.state.startSize <=1){
				btnPrev ="";
			}
			if(this.state.endSize === this.state.resultSize){
				btnNext ="";
			}

		const params = {
			rootClassName: `sidebar-main`,
			sidebarClassName: `sidebar-content`,
			overlayClassName: "sidebar-overlay",
			pullRight: "true",
		}
		//END sidebar
		return (
			<section className="results-container gray-bg">
				<DownLargeScreen>
					<div className={this.state.sidebarOpen ? "sidebar-container" : "none-active"}>
						<Sidebar
							sidebarClassName={`sidebar side-filter ${this.state.movesOut}`}
							sidebar={
								<aside>
									<header>
										<div className="row">
											<div className="col-auto">
												<button type="button" className="btn reset" disabled>
													<i className="icon-reset"></i>
												</button>
											</div>
											<div className="col">
												<h3>Filter <span><h2 className="col">{/*Motor Oil*/} <span>{this.state.startSize} - {this.state.endSize} of {this.state.resultSize} results</span></h2></span></h3>
											</div>
											<div className="col-auto">
												<button type="button" className="btn btn-primary" onClick={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })}>Done</button>
											</div>
										</div>
									</header>
									<ul className="filter" ref={this.setFilter}>
										<li onClick={this.handleClick} className="have-child" >
											<div className="row">
												<label className="col-auto">Tyer Size</label>
												<p className="col">255, 55, 16 <i className="icon-arrow-right"></i></p>
											</div>
											<div className={`d-none filte-items ${this.state.isHidden}`}>
												<header>
													<div className="row">
														<div className="col-auto">
															<button type="button" onClick={this.handleBack} className="btn reset">
																<i className="icon-arrow-left"></i>

															</button>
														</div>
														<div className="col">
															<h4>Tyer Size</h4>
														</div>
														<div className="col-auto">
															<button type="button" className="btn btn-primary" onClick={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })}>Done</button>
														</div>
													</div>
												</header>
												<div>
													<div className="tires-filte">
														<form>
															<div className="d-table">
																<div className="d-table-row">
																	<label>width</label>
																	<div className="select-main">
																		<Select
																			className="select"
																			classNamePrefix="select"
																			isSearchable={false}
																			defaultValue={tireWidth[0]}
																			options={groupedWidthTiresOptions}
																			formatGroupLabel={formatWidthTiresGroupLabel}
																		/>
																	</div>

																</div>
																<div className="d-table-row">
																	<label>Height</label>
																	<div className="select-main">
																		<Select
																			className="select"
																			defaultValue={tireHeight[0]}
																			classNamePrefix="select"
																			isSearchable={false}
																			options={groupedHeightTiresOptions}
																			formatGroupLabel={formatHeightTiresGroupLabel}
																		/>
																	</div>
																</div>
																<div className="d-table-row">
																	<label>Diameter</label>
																	<div className="select-main">
																		<Select
																			className="select"
																			defaultValue={tireDiameter[0]}
																			classNamePrefix="select"
																			isSearchable={false}
																			options={groupedDiameterTiresOptions}
																			formatGroupLabel={formatDiameterTiresGroupLabel}
																		/>
																	</div>
																</div>
															</div>
														</form>
													</div>
												</div>
											</div>
										</li>
										<li onClick={this.handleClick} className="have-child">
											<div className="row">
												<label className="col-auto">Viscosity Grade</label>
												<p className="col">SAE 0W-15, SAE.... <a href="#" className="clear"><i className="icon-close"></i></a></p>
											</div>
											<div className={`d-none filte-items ${this.state.isHidden}`}>
												<header>
													<div className="row">
														<div className="col-auto">
															<button type="button" onClick={this.handleBack} className="btn reset">
																<i className="icon-arrow-left"></i>
															</button>
														</div>
														<div className="col">
															<h4>Viscosity Grade</h4>
														</div>
														<div className="col-auto">
															<button type="button" className="btn btn-primary" onClick={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })}>Done</button>
														</div>
													</div>
												</header>
												<div>
													<div className="filter-search">
														<i class="icon-search"></i>
														<input type="text" class="form-control" placeholder="Search" aria-label="Username" />
													</div>
													<ul className="options-list">
														<li>
															<div class="checkbox">
																<input type="checkbox" id="O1" />
																<label for="O1">Option 1</label>
															</div>
														</li>
														<li>
															<div class="checkbox">
																<input type="checkbox" id="O2" />
																<label for="O2">Option 2</label>
															</div>
														</li>
														<li>
															<div class="checkbox">
																<input type="checkbox" id="O3" />
																<label for="O3">Option 3</label>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</li>
										<li onClick={this.handleClick} className="have-child">
											<div className="row">
												<label className="col-auto">Volume</label>
												<p className="col">All</p>
											</div>
											<div className={`d-none filte-items ${this.state.isHidden}`}>
												<header>
													<div className="row">
														<div className="col-auto">
															<button type="button" onClick={this.handleBack} className="btn reset">
																<i className="icon-arrow-left"></i>
															</button>
														</div>
														<div className="col">
															<h4>Volume</h4>
														</div>
														<div className="col-auto">
															<button type="button" className="btn btn-primary" onClick={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })}>Done</button>
														</div>
													</div>
												</header>
												<div>
													<div className="filter-search">
														<i class="icon-search"></i>
														<input type="text" class="form-control" placeholder="Search" aria-label="Username" />
													</div>
													<ul className="options-list">
														<li className="radio-custom">
															<input type="radio" id="test1" name="radio-group" />
															<label for="test1">Apple</label>
														</li>
														<li className="radio-custom">
															<input type="radio" id="test2" name="radio-group" />
															<label for="test2">Peach</label>
														</li>
														<li className="radio-custom">
															<input type="radio" id="test3" name="radio-group" />
															<label for="test3">Orange</label>
														</li>
													</ul>
												</div>
											</div>

										</li>
										<li>
											<div className="row">
												<label className="col-auto">Price</label>
												<div className="col">
													<form class="form-row price-filter">
														<div className="col">
															<input type="text" class="form-control" placeholder="From" />
														</div>
														<div className="col">
															<input type="text" class="form-control" placeholder="To" />
														</div>
													</form>
												</div>
											</div>
										</li>
										<li onClick={this.handleClick} className="have-child">
											<div className="row">
												<label className="col-auto">Rating</label>
												<p className="col">
													<div className="rating">
														<Stars values={1} {...starsRating} />
													</div> & Up
													 	</p>
											</div>
											<div className={`filte-items ${this.state.isHidden}`}>
												<header>
													<div className="row">
														<div className="col-auto">
															<button type="button" onClick={this.handleBack} className="btn reset">
																<i className="icon-arrow-left"></i>
															</button>
														</div>
														<div className="col">
															<h4>Rating

																	</h4>
														</div>
														<div className="col-auto">
															<button type="button" className="btn btn-primary" onClick={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })}>Done</button>
														</div>
													</div>
												</header>
												<div>
													<ul className="options-list">
														<li>
															<div class="checkbox">
																<input type="checkbox" id="O10" />
																<label for="O10">
																	<div className="rating">
																		<Stars values={1} {...starsRating} />
																	</div>
																	3 review
																		 </label>
															</div>
														</li>
														<li>
															<div class="checkbox">
																<input type="checkbox" id="O10" />
																<label for="O10">Not Yet Rated</label>
															</div>
														</li>
													</ul>
												</div>
											</div>
										</li>
									</ul>
								</aside>
							}
							open={this.state.sidebarOpen}
							onClick={this.handleClick}
							onSetOpen={this.onSetSidebarOpen}
							pullRight={true}
						>
						</Sidebar>
					</div>
				</DownLargeScreen>


				<div className="container-fluid">
					<div className="row">
						<LargeScreen>
							<div className="filter-col">
								<ul className="filter" ref={this.setFilter}>
									{
									this.props.filterObjects.map((filterObject, idx) => {
										return <li key={idx}>
											<h5>
												<a href={`#${filterObject.filterTitle}`} data-toggle="collapse" role="button" aria-expanded="false">{filterObject[key]} <span className="minus"></span></a>
											</h5>
											<div class="collapse show" id={`${filterObject.filterTitle}`}>
												<Card className="filter-body">
													<CardBody>
														<div className="filter-search">
															<i class="icon-search"></i>
															<input type="text" class="form-control" placeholder="Search" aria-label="Username" />
														</div>
														{renderSearch(filterObject, Checkbox, onFilter, isChecked, currentLanguage)}
													</CardBody>
												</Card>
												{/*<ul className="options-list">
													<li>
														<div class="checkbox">
															<input type="checkbox" id="O1" />
															<label for="O1">Option 1</label>
														</div>
													</li>
													<li>
														<div class="checkbox">
															<input type="checkbox" id="O2" />
															<label for="O2">Option 2</label>
														</div>
													</li>
													<li>
														<div class="checkbox">
															<input type="checkbox" id="O3" />
															<label for="O3">Option 3</label>
														</div>
													</li>
												</ul>*/}
												{/*<a href="#" className="btn btn-gray">
													View More <i className="icon-plus"></i>
												</a>*/}
											</div>
										</li>
									})}
									{/*<li className="tires-filte">
										<h5>
											Tyer Search
										</h5>
										<form>
											<div className="d-table">
												<div className="d-table-row">
													<label>width</label>
													<div className="select-main">
														<Select
															className="select"
															classNamePrefix="select"
															isSearchable={false}
															defaultValue={tireWidth[0]}
															options={groupedWidthTiresOptions}
															formatGroupLabel={formatWidthTiresGroupLabel}
														/>
													</div>

												</div>
												<div className="d-table-row">
													<label>Height</label>
													<div className="select-main">
														<Select
															className="select"
															defaultValue={tireHeight[0]}
															classNamePrefix="select"
															isSearchable={false}
															options={groupedHeightTiresOptions}
															formatGroupLabel={formatHeightTiresGroupLabel}
														/>
													</div>
												</div>
												<div className="d-table-row">
													<label>Diameter</label>
													<div className="select-main">
														<Select
															className="select"
															defaultValue={tireDiameter[0]}
															classNamePrefix="select"
															isSearchable={false}
															options={groupedDiameterTiresOptions}
															formatGroupLabel={formatDiameterTiresGroupLabel}
														/>
													</div>
												</div>
											</div>
											<button type="button" class="btn btn-primary">Search <i className="icon-arrow-right"></i></button>
										</form>
									</li>*/}
									{/*<li>
										<h5>
											<a href="#Volume" data-toggle="collapse" role="button" aria-expanded="false">Volume<span className="minus"></span></a>
										</h5>
										<div class="collapse show" id="Volume">
											<div className="filter-search">
												<i class="icon-search"></i>
												<input type="text" class="form-control" placeholder="Search" aria-label="Username" />
											</div>
											<ul className="options-list">
												<li className="radio-custom">
													<input type="radio" id="test1" name="radio-group" />
													<label for="test1">Apple</label>
												</li>
												<li className="radio-custom">
													<input type="radio" id="test2" name="radio-group" />
													<label for="test2">Peach</label>
												</li>
												<li className="radio-custom">
													<input type="radio" id="test3" name="radio-group" />
													<label for="test3">Orange</label>
												</li>
											</ul>
											<a href="#" className="btn btn-gray">
												View less <i className="minus"></i>
											</a>
										</div>
									</li>
									<li>
										<h5>
											<a href="#price" data-toggle="collapse" role="button" aria-expanded="false">Price<span className="minus"></span></a>
										</h5>
										<div class="collapse show" id="price">
											<ul className="options-list">
												<li>
													<div class="checkbox">
														<input type="checkbox" id="O7" />
														<label for="O7">> 50</label>
													</div>
												</li>
												<li>
													<div class="checkbox">
														<input type="checkbox" id="O8" />
														<label for="O8">500-700</label>
													</div>
												</li>
												<li>
													<form class="form-row price-filter">
														<div className="col">
															<input type="text" class="form-control" placeholder="From" />
														</div>
														<div className="col">
															<input type="text" class="form-control" placeholder="To" />
														</div>
														<div className="col-auto">
															<button type="submit" class="btn btn-primary">Go</button>
														</div>
													</form>
												</li>
											</ul>
										</div>
									</li>
									<li>
										<h5>
											<a href="#rating" data-toggle="collapse" role="button" aria-expanded="false">Rating<span className="minus"></span></a>
										</h5>
										<div class="collapse show" id="rating">
											<ul className="options-list">
												<li>
													<div class="checkbox">
														<input type="checkbox" id="O10" />
														<label for="O10">
															<div className="rating">
																<Stars values={1} {...starsRating} />
															</div>
															3 review
														 </label>
													</div>
												</li>
												<li>
													<div class="checkbox">
														<input type="checkbox" id="O10" />
														<label for="O10">Not Yet Rated</label>
													</div>
												</li>
											</ul>
										</div>
									</li>*/}
								</ul>
							</div>

						</LargeScreen>
						<div className="col">
							<div className="search-result">
								<div className="total-result row">
									<h2 className="col">{/*Motor Oil*/} <span>{this.state.startSize} - {this.state.endSize} of {this.state.resultSize} </span></h2>
									<div className="col-auto">
										<div className="result-sort">
											<LargeScreen><label>Sort by</label></LargeScreen>
											<DownLargeScreen>
												<i className="icon-sorting"></i>
											</DownLargeScreen>
											<Select
												classNamePrefix="select"
												isSearchable={false}
												defaultValue={sortOptions[0]}
												options={sortOptions} />
										</div>
										<DownLargeScreen>
											<div className="side-bar-compnent-btn">
												<button className="btn filter-btn" onClick={() => this.setState({ sidebarOpen: !this.state.sidebarOpen })}>
													<i className="icon-filter"></i>
												</button>
											</div>
										</DownLargeScreen>
									</div>
								</div>
								<LargeScreen>
									<div className="filter-result" style={isEmpty(filtrationChecked) ? commonStyles.hide : styles.show}>
										<ul className="list-inline">
												{
													filtrationChecked.map((item, index) => (

														<li key={index}>{item} <a href="#"><i className="icon-close" onClick={onRemoveItem.bind(this, index,item)}></i></a></li>
													))
												}
												<a className="btn btn-gray" onClick={onClear}>Clear All</a>
										</ul>
									</div>
								</LargeScreen>
								<ul className="result-list products-list row">
									{this.renderProducts()}
								</ul>
								<div className="row justify-content-center">
									<div className="col-12 more-result">
										<div className="col-lg-5 col">
											{btnPrev}
										</div>
										<div className="col-lg-5 col">
											{btnNext}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
	}
}

	const mapStateToProps = state => {
		return {
			products: state.api.products,
			currentLanguage: getActiveLanguage(state.localize).code,
			translate: getTranslate(state.localize),
			direction: state.customer.direction
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

	// this.props.filterObjects.map((filterObject, idx) => {
	// 	return <div key={idx} className="filter-category card col-12">


// </CardTitle>
// </Card>
// </div>
// <div className="selected-filters-panel row">
// <div className="col-12" style={isEmpty(filtrationChecked) ? commonStyles.hide : styles.show}>
// {
// 	filtrationChecked.map((item, index) => (
// 		<label key={index}>{item}<i className="icon-close" onClick={onRemoveItem.bind(this, index,item)} /></label>
// 	))
// }
// <Button text="Clear all" className="btn btn-gray-secondary" onClick={onClear} />
