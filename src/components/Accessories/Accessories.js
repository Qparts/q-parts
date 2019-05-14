import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addRecentViewedProducts } from '../../actions/customerAction';
import { getSortedProducts } from '../../actions/apiAction';
import Stars from 'react-stars';

import { Link } from "react-router-dom";
import {	reduxForm } from "redux-form";
import { getTranslate } from 'react-localize-redux';


import { swiperParams } from '../../constants';
import Swiper from 'react-id-swiper';
import { getBestSeller, getPopularOilBrands } from '../../utils/api';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import { handleImageFallback, getTranslatedObject } from '../../utils';
import { MediumScreen, SmallScreen } from '../Device';

class Accessories extends Component {
	constructor(props) {
    super(props)

    this.state = {
      bestSeller: [],
			popularOilBrands: [],
    }

    this.loadBestSeller()
		getPopularOilBrands()
		.then(res =>{
			this.setState({
				popularOilBrands: res.data
			})
		})
  }

  loadBestSeller = () => {
    getBestSeller()
      .then(res => {
        this.setState({
          bestSeller: res.data,
          isLoading: true
        })
      });
  }
	render() {
		const { translate, direction, currentLanguage } = this.props;
    const { bestSeller } = this.state
		return (
			<Fragment>
				<section id="accessorise">
					<div className="accessorise-img">
						<section className="main-cat container-fluid">
              <SmallScreen>
                <header className="header-category">
    							<h1>{translate("accessories.category")}</h1>
    						</header>
              </SmallScreen>
							<ul className="row">
								<li className="col-lg-4 col-12 wires"><div><img src="/img/wires&cables.jpg" alt="wires&cables"/> <span><h4>{translate("nav.wires")}</h4></span></div></li>
								<li className="col-lg-4 col-6 refrigerator"><div><img src="/img/refrigerator.jpg" alt="refrigerator"/> <span><h4>{translate("nav.refrigerator")}</h4></span></div></li>
								<li className="col-lg-4 col-6 mats"><div><img src="/img/car-mats.jpg" alt="car-mats"/> <span><h4>{translate("nav.mats")}</h4></span></div></li>
								<li className="col-lg-8 col-12 cleaning"><div><img src="/img/cleaning&care-.jpg" alt="cleaning&care"/> <span><h4>{translate("nav.cleaning")}</h4></span></div></li>
								<li className="col-lg-4 col-12 children"><div><img src="/img/children-seats.jpg" alt="children-seats"/> <span><h4>{translate("nav.children")}</h4></span></div></li>
							</ul>
						</section>
					</div>
					<div className="popular-accessorise container-fluid">
						<header>
							<h1>{translate("accessories.popularBrands")}</h1>
						</header>
						{/*<section className="main-cat">
							<div className="row">
								{
									this.state.popularOilBrands.map((product,idx) => (
											<Link to={`/listing?query=&page=1&category=9&Brands=${product.id}`} className="col-2" key={idx}>
													<img src={product.image} alt={getTranslatedObject(product, currentLanguage, 'name', 'nameAr')} />
											</Link>
									))
								}
							</div>
						</section>*/}
            <section className="popular-img">
							<div className="row">
								<Link to={`/listing?query=&page=1&category=9&Brands=1`} className="col-lg-2 col-4">
									<div><img src="img/kanex.jpg"  /></div>
								</Link>
                <Link to={`/listing?query=&page=1&category=9&Brands=1`} className="col-lg-2 col-4">
										<div><img src="img/kenu.jpg"  /></div>
								</Link>
                <Link to={`/listing?query=&page=1&category=9&Brands=1`} className="col-lg-2 col-4">
										<div><img src="img/STP.jpg"  /></div>
								</Link>
                <Link to={`/listing?query=&page=1&category=9&Brands=1`} className="col-lg-2 col-4">
										<div><img src="img/SONY.jpg"  /></div>
								</Link>
                <Link to={`/listing?query=&page=1&category=9&Brands=1`} className="col-lg-2 col-4">
										<div><img src="img/huawei.jpg"  /></div>
								</Link>
                <Link to={`/listing?query=&page=1&category=9&Brands=1`} className="col-lg-2 col-4">
										<div><img src="img/iottie.jpg"  /></div>
								</Link>
							</div>
						</section>
					</div>
					<div className="best-seller container-fluid">
						<header>
							<h1>
							{translate("accessories.accessBestSeller")}
							</h1>
						</header>

						<section className="products-sec">
			        <div>
			          <div className="tab-content">
			            <div className="tab-pane fade show active" id="best-seller" role="tabpanel">
			              <h3>{translate("offers.recommendation.bestSeller")}</h3>
			              <Swiper {...swiperParams(direction)}>
			                {

			                  bestSeller.map((product, idx) => (
			                    <div key={idx}>
			                      <Link to={`/products/${product.id}`} className="card">
			                        <img onError={handleImageFallback} src={product.image} className="card-img-top" alt="no product" />
			                        <div className="card-body">
			                          <h5 className="card-title">{getTranslatedObject(product, currentLanguage, 'desc', 'descAr')}</h5>
			                          <ul className="list-inline product-info">
			                            <li><strong>{getTranslatedObject(product.brand, currentLanguage, 'name', 'nameAr')}</strong></li>
			                            <li>{product.number}</li>
			                          </ul>
			                          <div className="rating">
			                            <Stars values={product.averageRating ? product.averageRating : 0} {...starsRating} />
			                            <span>{getLength(product.reviews)} {translate("product.reviews")}</span>
			                          </div>
			                          <p className="price">{product.salesPrice.toFixed(2)} <span>{translate("general.currency")}</span></p>
			                        </div>
			                      </Link>
			                    </div>
			                  ))
			                }
			              </Swiper>
			              <div className="swiper-left"></div>
			            </div>
			          </div>
			        </div>

			      </section>
					</div>
				</section>
			</Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		products: state.api.products,
		translate: getTranslate(state.localize),
		direction: state.customer.direction,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
		getSortedProducts: () => dispatch(getSortedProducts())
	}
}

Accessories = reduxForm({
	form: "Accessories"
})(Accessories);


export default connect(mapStateToProps, mapDispatchToProps)(Accessories);




// import React, { Component, Fragment } from 'react';
// import { connect } from 'react-redux';
// import { addRecentViewedProducts } from '../../actions/customerAction';
// import { getSortedProducts } from '../../actions/apiAction';
// import Select from 'react-select';
// import Button from '../UI/Button';
// import { styles, categorySortOptions } from '../../constants';
// import ProductGridView from '../ProductGridView/ProductGridView';
// import WithProductView from '../../hoc/WithProductView';
//
// import './Accessories.css';
//
// class Accessories extends Component {
//
//   render() {
//     const buttonsStyle = {
//       price: {
//         width: '5em'
//       }
//     }
//
//     return (
//       <Fragment>
//         <div style={styles.grey} className="Accessories-title">
//           <h4>Accessories</h4>
//         </div>
//         <div className="Accessories-sort_by">
//           <label htmlFor="">Sort by</label>
//           <Select options={categorySortOptions} onChange={this.props.handleSelectChange} />
//         </div>
//         <div className="Accessories-container">
//           <div className="Accessories-filter border rounded card">
//             <p>Categories</p>
//             <input className="form-control" type="text" name="" id="" placeholder="Search" />
//             <div>
//               <input type="checkbox" name="vehicle1" value="Bike" />
//               <label>ATD</label>
//             </div>
//             <hr />
//             <p>Made In</p>
//             <input className="form-control" type="text" name="" id="" placeholder="Search" />
//             <div>
//               <input type="checkbox" name="vehicle1" value="Bike" />
//               <label>China</label>
//             </div>
//             <hr />
//             <p>Brand</p>
//             <input className="form-control" type="text" name="" id="" placeholder="Search" />
//             <div>
//               <input type="checkbox" name="vehicle1" value="Bike" />
//               <label>ATD</label>
//             </div>
//             <hr />
//             <p>Price</p>
//             <div>
//               <input type="checkbox" name="vehicle1" value="Bike" />
//               <label>{"< 50"}</label>
//             </div>
//             <div className="Accessories-filter_price">
//               <input style={buttonsStyle.price} className="form-control" type="text" placeholder="Min" name="" id="" />
//               <input style={buttonsStyle.price} className="form-control" type="text" placeholder="Max" name="" id="" />
//               <Button text="Go" className="btn btn-secondary" />
//             </div>
//             <hr />
//             <p>Rating</p>
//             <div>
//               <input type="checkbox" name="vehicle1" value="Bike" />
//               <label>{"4 andf up more"}</label>
//             </div>
//             <div>
//               <input type="checkbox" name="vehicle1" value="Bike" />
//               <label>{"3 andf up more"}</label>
//             </div>
//             <hr />
//             <Button text="Clear all" className="btn btn-secondary" />
//           </div>
//           <div className="Accessories-contents">
//             {/* <ProductGridView product={this.props.currentProducts}/> */}
//           </div>
//         </div>
//       </Fragment >
//     )
//   }
// }
//
// const mapStateToProps = state => {
//   return {
//     products: state.api.products
//   }
// }
//
// const mapDispatchToProps = dispatch => {
//   return {
//     addRecentViewedProducts: (product) => dispatch(addRecentViewedProducts(product)),
//     getSortedProducts: () => dispatch(getSortedProducts())
//   }
// }
//
// const withAccessories = WithProductView(Accessories)
//
// export default connect(mapStateToProps, mapDispatchToProps)(withAccessories);
