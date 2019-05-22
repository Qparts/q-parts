import React, { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import ProductGridView from '../../components/ProductGridView/ProductGridView';
import { addRecentViewedProducts } from '../../actions/customerAction';
import { getSortedProducts, getFlage } from '../../actions/apiAction';
import WithProductView from '../../hoc/WithProductView';
import queryString from 'qs';
import { Card, ListGroup } from 'reactstrap';
import { isEmpty } from '../../utils';
import * as constant from '../../constants';
import { getCategoryId } from '../../constants';
import { styles, styles as commonStyles } from '../../constants';
import _ from 'lodash';
import ProductListView from '../../components/ProductListView/ProductListView';
import { getGeneralSearch } from '../../utils/api';
import { getActiveLanguage, getTranslate } from 'react-localize-redux';
//mobile filter
import { LargeScreen, DownLargeScreen } from '../../components/Device';
import Sidebar from "react-sidebar";
import { getQuery, replaceQuery } from '../../utils';
//HTML Component
import { ClipLoader } from "react-spinners";

import { getTranslatedObject } from '../../utils';
import { binarySearch } from '../../utils/array';
import ResultNotFound from './ResultNotFound';
import { r, l, left } from '../../utils/directional';
import Footer from '../../components/Layout/Footer/Footer';
const GRID = 'GRID';


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
				id: 1,
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
						valueAr: "كيا"
					}
				]
			},
			{
				id: 2,
				filterTitle: "Volume",
				filterTitleAr: "الصوت",
				options: [
					{
						id: 1,
						value: "8 oz",
						valueAr: "8 أوقية"
					}
				]
			}
		]
	}
	constructor(props) {
		super(props);
		this.state = {
			selectedView: GRID,
			searchGeneral: [],
			loading: true,
			isHidden: 'is-hidden',
			movesOut: '',
			resultSize: 0,
			startSize: 1,
			endSize: 16,
			item: '',
			keyPressed: 0,
			currentSearchId: -1,
			scroll: null,
			newScrollPosition: 0
		};
		this.header = createRef();
		this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);

	}

	componentDidMount() {
		const { location: { search } } = this.props;
		this.props.getFlage(false);
		this.setGeneralSearch(search, this.runCallbacks);
		this.quantityProducts();
	}

	componentDidUpdate(prevProps, prevState) {

		const { location: { search } } = this.props;
		if (search !== prevProps.location.search) {
			this.props.getFlage(false);
			this.resetLoading();
			this.setGeneralSearch(search, this.runCallbacks);
		}


		window.onpopstate = (event) => {
			this.setGeneralSearch(search, this.runCallbacks);
		}
	}

	componentWillUnmount() {
		if (this.state.scroll) {
			this.state.scroll.removeEventListener('scroll', this.handleScroll)
		}
	}

	handleScroll = (event) => {
		const currentPosition = this.state.scroll.scrollTop;
		const { newScrollPosition } = this.state;
		const header = document.getElementById('header-fixed');
		const hasReachedTargetPosition = currentPosition > 80;

		if (newScrollPosition < currentPosition && hasReachedTargetPosition) {
			header.classList.remove('slideDown');
			header.classList.add('slideUp');


		} else if (newScrollPosition > currentPosition) {
			header.classList.remove('slideUp');
			header.classList.add('slideDown');
		}

		this.setState({ newScrollPosition: currentPosition })
	}

	setSidebarRef = async element => {
		const contentId = document.getElementById("contentId");


		await this.setState({ scroll: contentId })
		this.state.scroll.addEventListener('scroll', this.handleScroll)

	}

	onSetSidebarOpen (open) {
		this.setState({
			sidebarOpen: open,
			isHidden: 'is-hidden',
			movesOut: '',
		});
	}
	quantityProducts = () => {
		const params = getQuery(this.props.location);
		let pageNumber = Number(params.page);
		if (this.state.endSize === this.state.resultSize && this.state.startSize !== 1) {
			this.setState({ startSize: this.state.resultSize })
		} else {
			let size = pageNumber * 16 - 15
			this.setState({
				startSize: size,
				endSize: size + 16 - 1
			})
		}
	}
	setGeneralSearch = async (search, callback = null) => {
		this.quantityProducts();
		await getGeneralSearch(search).then(res => {
			if (res.data.products.length < 16 && res.data.products.length !== 0) {
				this.setState({ endSize: res.data.resultSize })
			} else if (res.data.products.length === 0) {
				this.props.getFlage(true);
			}
			this.setState({
				searchGeneral: res.data,
				loading: false,
				resultSize: res.data.resultSize,
			})
			if (callback) {
				callback(res.data);
			}
		});
	}
	toggle = (collapse) => {
		this.setState({ [collapse]: !this.state[collapse] });
	}
	changeView = (selectedView) => {
		this.setState({ selectedView })
	}

	nextPage = (e) => {
		e.preventDefault();
		const params = getQuery(this.props.location);
		let pageNumber = Number(params.page) + 1;
		if (this.state.startSize === this.state.resultSize) {
			this.setState({ startSize: this.state.resultSize })
		} else {
			let size = pageNumber * 16 - 15;
			this.setState({
				startSize: size,
				endSize: size + 16 - 1
			})
		}
		this.props.history.push(replaceQuery(this.props.location, "nextPage"));
	}
	prevPage = (e) => {
		e.preventDefault();
		const params = getQuery(this.props.location);
		let pageNumber = Number(params.page) - 1;
		if (pageNumber <= 1) {
			pageNumber = 1;
		}
		let size = pageNumber * 16 - 15
		this.setState({
			startSize: size,
			endSize: size + 16 - 1
		})
		this.props.history.push(replaceQuery(this.props.location, "prePage"));
	}
	generateSelectedOptions = (data) => {
		var newObj = [];
		for (var i = 0; i < data.filterObjects.length; i++) {
			newObj.push({
				filterTitle: data.filterObjects[i]['filterTitle'],
				filterTitleAr: data.filterObjects[i]['filterTitleAr'],
				selectedOptions: []
			})
		}
		this.props.onSetInitialSelectedOptions(newObj, data.filterObjects);
	}

	resetLoading = () => {
		this.setState({
			loading: true
		})
	}

	runCallbacks = (data) => {
		this.generateSelectedOptions(data);
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
	handleClick = (item) => {
		var that = this;
		setTimeout(function () {
			if (item === "clear") {
				that.setState({
					item: '',
					isHidden: 'is-hidden',
					movesOut: ''
				})
			}
		}, 50);
		if (item === "clear") {
			this.setState({
				item: ''
			})
		} else {
			if (this.state.isHidden === 'is-hidden') {
				this.setState({
					isHidden: '',
					movesOut: 'moves-out',
					item: item
				})
			}
		}
	}
	handleBack = () => {
		this.setState({
			isHidden: 'is-hidden',
			movesOut: ''
		})
	}
	openSidebar = () => {
		this.setState({ sidebarOpen: !this.state.sidebarOpen })
	}
	done = (e) => {
		this.setState({ sidebarOpen: !this.state.sidebarOpen, isHidden: 'is-hidden', movesOut: '' })
	}

	getCategoryName = () => {
		let categoryId = queryString.parse(window.location.search.slice(1)).category;
		let query = queryString.parse(window.location.search.slice(1)).query;

		return categoryId ? getCategoryId(this.props.translate).get(parseInt(categoryId, constant.RADIX)) : query;
	}

	handleChange = async (currentFilterObject, event) => {
		const { location: { search } } = this.props;
		const { keyPressed } = this.state;
		const searchKeyword = event.target.value;

		await this.setCurrentSearchId(currentFilterObject.id);

		if (keyPressed === 8 || keyPressed === 46) {
			await this.setGeneralSearch(search)
			this.setSearchFilter(searchKeyword);

		} else {
			this.setSearchFilter(searchKeyword);
		}
	}

	handleKeyDown = (event) => {
		const keyPressed = event.keyCode || event.charCode;

		this.setState({
			keyPressed
		})

	}

	setSearchFilter = async (searchKeyword) => {

		const { location: { search }, currentLanguage } = this.props;
		const { searchGeneral: { filterObjects }, currentSearchId } = this.state;
		const getCurrentFilterObject = await binarySearch(filterObjects, currentSearchId);

		let filterOptions = getCurrentFilterObject.options.filter(option => {
			const value = getTranslatedObject(option, currentLanguage, 'value', 'valueAr');
			return value.toLowerCase().startsWith(searchKeyword.toLowerCase());
		});
		const newFilterObjects = filterObjects.map(filterObject => {

			if (filterObject.id === getCurrentFilterObject.id) {
				return {
					...filterObject,
					options: filterOptions
				}
			} else {
				return { ...filterObject }
			}
		});

		this.setState({
			searchGeneral: {
				...this.state.searchGeneral,
				filterObjects: newFilterObjects
			}
		});

		if (_.isEmpty(searchKeyword)) {
			this.setGeneralSearch(search);
		}
	}

	setCurrentSearchId = (currentSearchId) => {
		this.setState({
			currentSearchId
		})
	}

	render() {

		//sidebar
		const { isChecked, renderSearch, filtrationChecked, onFilter, onRemoveItem, onClear, currentLanguage, selectedOptions, flage, direction, translate } = this.props;
		const { searchGeneral: { filterObjects }, loading } = this.state;
		let key = this.props.currentLanguage === constant.EN ? 'filterTitle' : 'filterTitleAr';
		if (flage) {
			return (
				<ResultNotFound />
			)
		}
		if (loading)
			return (
				<div style={styles.loading}>
					<ClipLoader
						css={styles.spinner}
						sizeUnit={"px"}
						size={150}
						loading={this.state.loading}
					/>
				</div>
			)

		let btnNext = <li className="next">
			<Link to="#" onClick={this.nextPage}>
				<i className={`icon-arrow-${r(direction)}`}></i>
			</Link>
		</li>
		let btnPrev = <li className="prev">
			<Link to="#" onClick={this.prevPage}>
				<i className={`icon-arrow-${l(direction)}`}></i>
			</Link>
		</li>

		if (this.state.startSize <= 1) {
			btnPrev = <li className="disabled">
				<Link to="/" onClick={(e) => e.preventDefault()}><i className={`icon-arrow-${l(direction)}`}></i></Link>
			</li>;
		}
		if (this.state.endSize === this.state.resultSize) {
			btnNext = <li className="disabled">
				<Link to="/" onClick={(e) => e.preventDefault()}><i className={`icon-arrow-${r(direction)}`}></i></Link>
			</li>;
		}
		const paramsN = getQuery(this.props.location);
		let pageNumber = Number(paramsN.page);

		return (
			<Fragment>
				<LargeScreen>
					<section className="results-container gray-bg">
						<div className="container-fluid">
							<div className="row">
								<div className="filter-col">
									<ul className="filter">
										{
											filterObjects.map((filterObject, idx) => {
												return <li key={idx}>
													<h5>
														<a href={`#${filterObject.filterTitle}`} data-toggle="collapse" role="button" aria-expanded="false">{filterObject[key]} <span className="minus"></span></a>
													</h5>
													<div className="collapse show" id={`${filterObject.filterTitle}`}>
														<div className="filter-search">
															<i className="icon-search"></i>
															<input type="text"
																onChange={this.handleChange.bind(this, filterObject)}
																onKeyDown={this.handleKeyDown}
																className="form-control"
																placeholder={this.props.translate("general.buttons.search")} />
														</div>
														{renderSearch(filterObject, onFilter, isChecked, currentLanguage)}
														{/*<ul className="options-list">
													<li>
														<div className="checkbox">
															<input type="checkbox" id="O1" />
															<label for="O1">Option 1</label>
														</div>
													</li>
													<li>
														<div className="checkbox">
															<input type="checkbox" id="O2" />
															<label for="O2">Option 2</label>
														</div>
													</li>
													<li>
														<div className="checkbox">
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
											<button type="button" className="btn btn-primary">Search <i className="icon-arrow-right"></i></button>
										</form>
									</li>*/}
										{/*<li>
										<h5>
											<a href="#Volume" data-toggle="collapse" role="button" aria-expanded="false">Volume<span className="minus"></span></a>
										</h5>
										<div className="collapse show" id="Volume">
											<div className="filter-search">
												<i className="icon-search"></i>
												<input type="text" className="form-control" placeholder="Search" aria-label="Username" />
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
										<div className="collapse show" id="price">
											<ul className="options-list">
												<li>
													<div className="checkbox">
														<input type="checkbox" id="O7" />
														<label for="O7">> 50</label>
													</div>
												</li>
												<li>
													<div className="checkbox">
														<input type="checkbox" id="O8" />
														<label for="O8">500-700</label>
													</div>
												</li>
												<li>
													<form className="form-row price-filter">
														<div className="col">
															<input type="text" className="form-control" placeholder="From" />
														</div>
														<div className="col">
															<input type="text" className="form-control" placeholder="To" />
														</div>
														<div className="col-auto">
															<button type="submit" className="btn btn-primary">Go</button>
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
										<div className="collapse show" id="rating">
											<ul className="options-list">
												<li>
													<div className="checkbox">
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
													<div className="checkbox">
														<input type="checkbox" id="O10" />
														<label for="O10">Not Yet Rated</label>
													</div>
												</li>
											</ul>
										</div>
									</li>*/}
									</ul>
								</div>
								<div className="col">
									<div className="search-result">
										<div className="total-result row">
										<h2 className="col">{this.getCategoryName()} <span>({this.state.resultSize} {translate("general.results")})</span></h2>
											<div className="col-auto">
												{/*<div className="result-sort">
											<LargeScreen><label>Sort by</label></LargeScreen>
											<DownLargeScreen>
												<i className="icon-sorting"></i>
											</DownLargeScreen>
											<Select
												classNamePrefix="select"
												isSearchable={false}
												defaultValue={sortOptions[0]}
												options={sortOptions} />
										</div>*/}
											</div>
										</div>
										<div className="filter-result" style={isEmpty(filtrationChecked) ? commonStyles.hide : styles.show}>
											<ul className="list-inline">
												{
													filtrationChecked.map((item, index) => (
														<li key={index}>{getTranslatedObject(item, currentLanguage, 'title', 'titleAr')} <a href="#" onClick={onRemoveItem.bind(this, index, item)}><i className="icon-close"></i></a></li>
													))
												}
											</ul>
											<a className="btn btn-gray" onClick={onClear}>{this.props.translate("general.clearAll")}</a>
										</div>
										<ul className="result-list products-list row">
											{this.renderProducts()}
										</ul>
									</div>
									<div className="row ">
										<div className="col d-flex justify-content-center">
											<ul className="more-result list-inline">
												{btnPrev}
												<li>
													<span>{this.props.translate("general.page")} {pageNumber} {this.props.translate("general.of")} {Math.ceil(this.state.resultSize / 16)}</span>
												</li>
												{btnNext}
											</ul>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>

				</LargeScreen>
				<DownLargeScreen>
					<Sidebar
						ref={this.setSidebarRef}
						sidebarClassName={`sidebar side-filter ${this.state.movesOut}`}
						contentClassName="content-sidebar"
						overlayClassName="sidebar-overlay"
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
											<h3>{this.props.translate("general.filter")}<span>{this.state.resultSize} {this.props.translate("general.results")}</span></h3>
										</div>
										<div className="col-auto">
											<button type="button" className="btn btn-primary" onClick={this.done}>{this.props.translate("general.done")}</button>
										</div>
									</div>
								</header>
								<ul className="filter">
									{
										filterObjects.map((filterObject, idx) => {
											return <li key={idx} onClick={() => this.handleClick(filterObject.filterTitle)} className="have-child">
												<div className="row">
													<label className="col-auto">{filterObject[key]}</label>
													<div className="col">{selectedOptions.map((item, index) => (
														(item[key] === filterObject[key] && item.selectedOptions.length !== 0 ? <p key={index}>{item.selectedOptions.length}</p> : <p key={index}>{this.props.translate("general.all")}</p>)
													))}</div>

												</div>
												<div className={(this.state.item === filterObject.filterTitle ? `filte-items ${this.state.isHidden}` : `filte-items is-hidden`)}>
													<header>
														<div className="row">
															<div className="col-auto">
																<button type="button" onClick={this.handleBack} className="btn reset">
																	<i className={`icon-arrow-${left(direction)}`}></i>
																</button>
															</div>
															<div className="col">
																<h4>{filterObject[key]}</h4>
															</div>
															<div className="col-auto">
																<button type="button" className="btn btn-primary" onClick={this.done}>{this.props.translate("general.done")}</button>
															</div>
														</div>
													</header>
													<div>
														<div className="filter-search">
															<i className="icon-search"></i>
															<input type="text"
																onChange={this.handleChange.bind(this, filterObject)}
																onKeyDown={this.handleKeyDown}
																className="form-control"
																placeholder={this.props.translate("general.buttons.search")} />
														</div>
														{renderSearch(filterObject, onFilter, isChecked, currentLanguage)}
													</div>
												</div>
											</li>
										})}
								</ul>
							</aside>
						}
						children={
							<Fragment>
								<section className="results-container gray-bg">
									<div className="container-fluid">
										<div className="row">
											<div className="col">
												<div className="search-result">
													<div className="total-result row">
														<h2 className="col">{this.getCategoryName()} <span>({this.state.resultSize} {translate("general.results")})</span></h2>
														<div className="col-auto">
															{/*<div className="result-sort">
											<LargeScreen><label>Sort by</label></LargeScreen>
											<DownLargeScreen>
												<i className="icon-sorting"></i>
											</DownLargeScreen>
											<Select
												classNamePrefix="select"
												isSearchable={false}
												defaultValue={sortOptions[0]}
												options={sortOptions} />
										</div>*/}
															<div className="side-bar-compnent-btn">
																<button className="btn filter-btn" onClick={() => this.openSidebar()}>
																	<i className="icon-filter"></i>
																</button>
															</div>
														</div>
													</div>
													<div className="filter-result" style={isEmpty(filtrationChecked) ? commonStyles.hide : styles.show}>
														<ul className="list-inline">
															{
																filtrationChecked.map((item, index) => (
																	<li key={index}>{getTranslatedObject(item, currentLanguage, 'title', 'titleAr')} <a href="#" onClick={onRemoveItem.bind(this, index, item)}><i className="icon-close"></i></a></li>
																))
															}
														</ul>
														<a className="btn btn-gray" onClick={onClear}>{this.props.translate("general.clearAll")}</a>
													</div>
													<ul className="result-list products-list row">
														{this.renderProducts()}
													</ul>
												</div>
												<div className="row ">
													<div className="col d-flex justify-content-center">
														<ul className="more-result list-inline">
															{btnPrev}
															<li>
																<span>{this.props.translate("general.page")} {pageNumber} {this.props.translate("general.of")} {Math.ceil(this.state.resultSize / 16)}</span>
															</li>
															{btnNext}
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</section>

								<Footer translate={translate} />
							</Fragment>
						}
						open={this.state.sidebarOpen}
						onClick={this.handleClick}
						onSetOpen={this.onSetSidebarOpen}
						contentId="contentId"
						pullRight={true}
					>
					</Sidebar>
				</DownLargeScreen>
			</Fragment>

		)
	}
}

const mapStateToProps = state => {
	return {
		products: state.api.products,
		currentLanguage: getActiveLanguage(state.localize).code,
		translate: getTranslate(state.localize),
		direction: state.customer.direction,
		flage: state.api.flage
	}
}
const mapDispatchToProps = dispatch => {
	return {
		addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
		getSortedProducts: () => dispatch(getSortedProducts()),
		getFlage: (flage) => dispatch(getFlage(flage))
	}
}
const withTyresSearch = WithProductView(SearchResult);
export default connect(mapStateToProps, mapDispatchToProps)(withTyresSearch);

	// filterObjects.map((filterObject, idx) => {
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
