import React, { Component } from "react";
import { Link } from "react-router-dom";
import { swiperParams } from '../../constants';
import Swiper from 'react-id-swiper';
import { handleImageFallback, getTranslatedObject } from '../../utils';
import { getBestSeller, getPopularOilBrands } from '../../utils/api';
import Stars from 'react-stars';
import { starsRating } from '../../constants';
import { getLength } from '../../utils/array';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import SelectInput from '../../components/SelectInput/SelectInput';
import RenderField from '../../components/RenderField/RenderField';
import * as validations from '../../utils';
import { Field , reduxForm } from 'redux-form';
import { DownLargeScreen, LargeScreen , MediumScreen} from '../../components/Device';
import Radio from '../UI/Radio';
import { withRouter } from 'react-router-dom';
class selectedVehicle extends Component{
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this);
    this.toggleNested = this.toggleNested.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.state = {
      bestSeller: [],
      popularOilBrands: [],
      modal: false,
      nestedModal: false,
      closeAll: false
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
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  toggleNested() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: false
    });
  }
  toggleAll() {
    this.setState({
      nestedModal: !this.state.nestedModal,
      closeAll: true
    });
  }
  render(){
    const { translate, direction, currentLanguage } = this.props;
    const { bestSeller } = this.state
    const vehicleMake = [
      { value: 1, label: "BMW" },
      { value: 2, label: "KIA" },
      { value: 3, label: "Ford" },
    ];
    const groupedvehicleMake = [
      {
        options: vehicleMake,
      },
    ];
    const formatvehicleMakeLabel = () => (
      <div className="placeholder">
        <span>Select vehicle Make</span>
      </div>
    );
    return(
      <div className="selected-vechile">
        <section className="default-header-bg">
          <div className="container-fluid">
            <div className="row">
              {/*<header className="col">
                <label className="header-label">Your selected vehicle:</label>
                <h3>
                  Skoda Octavia 2012
                </h3>
              </header>*/}
              <header className="col">
                <label className="header-label">سيارتك المختارة:</label>
                <h3>
                  سكودا اوكتافيا 2012
                </h3>
              </header>
              <div className="col-auto">
                {/*<a href="#" className="btn btn-black"><i className="icon-vehicle"></i>Change<MediumScreen> Vehicle</MediumScreen></a>*/}
                <a href="#" className="btn btn-black"><i className="icon-vehicle"></i>لتغير<MediumScreen> السيارة</MediumScreen></a>
            </div>
            </div>
          </div>
        </section>
        <section className="container-fluid">
          <article className="pb-sec">
            <header className="row sec-head">
              <h2 className="col">لدينا الأجزاء التي تحتاجها</h2>
              <div className="col-md-auto">
                <a href="#" className="btn btn-primary" onClick={this.toggle}><i className="icon-catalog"></i>تصفح الكتالوج</a>
                  <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-lg vin-modal">
                    <ModalHeader toggle={this.toggle}>
                      Enter Your Vehicle VIN Number
                    </ModalHeader>
                    <ModalBody>
                      <div className="row veh-main-info">
                        <div className="col">
                          <p>
                            <label className="header-label">Your selected vehicle:</label>
                            Skoda Octavia 2012
                          </p>
                        </div>
                        <div className="col-auto">
                          <a href="#" className="btn btn-gray-secondary" onClick={this.toggle}><i className="icon-vehicle"></i>Change Vehicle</a>
                            <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-xl vin-modal">
                              <ModalHeader toggle={this.toggle}>
                                My Vehicle (S) <LargeScreen><span>Store vehicles in your garage and Get product recommendations</span></LargeScreen>
                              </ModalHeader>
                              <ModalBody className="add-new-vehicle">
                                <header>
                                  <h4>إضافة سيارة جديدة </h4>
                                  <div className="garage-select">
                                    <MediumScreen>
                                      <label>اختر من</label>
                                    </MediumScreen>
                                    <a href="#" className="btn btn-gray-secondary dropdown-toggle" role="button" id="garage-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                      <img className="icon-garage" alt="garage" src="/img/garage.svg"/> Garage
                                      <span className="vec-count">2</span>
                                    </a>
                                    <div class="dropdown-menu garage-dropdown" aria-labelledby="garage-dropdown">
                                        <div class="media">
                                          <i className="icon-vehicle-history"></i>
                                          <div class="media-body">
                                            <h5>تاريخ المركبة المختار </h5>
                                            <p>عرض وإدارة والعثور على قطع غيار للسيارات في المرآب الخاص بك</p>
                                          </div>
                                        </div>
                                      <ul className="list-unstyled">
                                        <li  className="radio-custom" key="1">
                                          <a href="#" className="row">
                                            <div className="col-auto">
                                              <Radio
                                                checked="true"
                                                type="radio"
                                                id="1"
                                                name="radioGroup"
                                              />
                                            </div>
                                            <p className="col">
                                            2016 Ford Focus
                                            <span>VIN(000 000 000 000 11)</span>
                                          </p>
                                            <div className="col-auto vec-actions">
                                            <a href="#" className="btn btn-primary"><i className="icon-catalog"></i>Catalog</a>
                                            <a href="#" className="link">Save</a>
                                          </div>
                                          </a>
                                        </li>
                                        <li  className="radio-custom" key="1">
                                          <a href="#" className="row">
                                            <div className="col-auto">
                                              <Radio
                                                checked="true"
                                                type="radio"
                                                id="1"
                                                name="radioGroup"
                                              />
                                            </div>
                                            <p className="col">
                                            2016 Ford Focus
                                          </p>
                                            <div className="col-auto vec-actions">
                                            <a href="#" className="btn btn-primary"><i className="icon-catalog"></i>كاتالوج</a>
                                            <a href="#" className="link">Save</a>
                                          </div>
                                          </a>
                                        </li>
                                      </ul>
                                      <div className="vec-list-actions">
                                        <div className="main-action">
                                          <a className="btn btn-gray">
                                            <i className="icon-add-vehicle"></i>
                                            Add Vehicle
                                          </a>
                                        </div>
                                        <a href="#" className="link">
                                          <i className="icon-clear"></i>
                                          Clear History
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </header>
                                <form className="gray-input row">
          												<div className="col-md-auto float-label make">
          													<Field
          														label="Make"
          														name="make"
          														placeholder={' '}
          														component={SelectInput}
          														options={groupedvehicleMake}
          														formatGroupLabel={
          															formatvehicleMakeLabel
          														}
          														/>
          												</div>
          												<div className="col">
          													<Field
          														hasFloatLabel
                                      name="VIN/Frame"
                                      type="text"
                                      placeholder="Enter: VIN/Frame"
                                      label="Enter: VIN/Frame"
                                      errorMessage="Enter VIN/Frame Number"
          														component={RenderField}
          														validate={[validations.required]}
          													/>
          													<div className="VIN-info">
          														<p>VIN Number EX: <Link to="#">JTHBJ46G9B2420251</Link></p>
          														<p className="id-img"><Link to="#"><i className="icon-info"></i> Where is my VIN?</Link></p>
          													</div>
          												</div>
          												<div className="col-lg-auto actions">
          													<div className="row">
          														<DownLargeScreen>
          															<div className="col-auto">
          																<button type="submit" className='btn btn-gray'>Cancel</button>
          															</div>
          														</DownLargeScreen>
          														<div className="col-md-auto col">
          															<button type="submit" className='btn btn-primary'>Go<i className="icon-arrow-right"></i></button>
          														</div>
          													</div>
          												</div>
          											</form>
                              </ModalBody>
                            </Modal>
                        </div>
                      </div>
                      <form className="gray-input vin-input">
                          <Field
                            hasFloatLabel
                            name="VIN/Frame"
                            type="text"
                            placeholder="Enter: VIN/Frame"
                            label="Enter: VIN/Frame"
                            errorMessage="Enter VIN/Frame Number"
                            component={RenderField}
                            validate={[validations.required]}
                          />
                          <div className="VIN-info">
                            <p>VIN Number EX: <Link to="#">JTHBJ46G9B2420251</Link></p>
                            <p className="id-img"><Link to="#"><i className="icon-info"></i> Where is my VIN?</Link></p>
                          </div>
                        <div className="actions two-actions">
                          <div className="row">
                              <div className="col-auto">
                                <button type="submit" className='btn btn-gray'>Cancel</button>
                              </div>
                            <div className="col-md-auto col">
                              <button type="submit" className='btn btn-primary'>Browse Catalogue<i className="icon-arrow-right"></i></button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </ModalBody>
                  </Modal>
              </div>
            </header>
            <ul className="list-unstyled category-list gray row">
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/body.jpg"></img></figure>
                  <figcaption>الجسم</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/CHASSIS.jpg"></img></figure>
                  <figcaption>chassis</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/ELECTRICAL.jpg"></img></figure>
                  <figcaption>electrical</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/ENGINE.jpg"></img></figure>
                  <figcaption>engine</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/fuel.jpg"></img></figure>
                  <figcaption>Fuel, exhaust and cooling</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/TRANSMISSION.jpg"></img></figure>
                  <figcaption>transition</figcaption>
                </a>
              </li>
            </ul>
          </article>
          <article className="pb-sec">
            <header className="sec-head">
              <h2>Top Categories</h2>
            </header>
            <ul className="list-unstyled row category-list">
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/oil-filter.jpg"></img></figure>
                  <figcaption>Oil Filters</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/air-filter.jpg"></img></figure>
                  <figcaption>Air Filters</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/ac-filter.jpg"></img></figure>
                  <figcaption>AC Filters</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/brake-pads.jpg"></img></figure>
                  <figcaption>Brake Pads</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/spark-pugs.jpg"></img></figure>
                  <figcaption>Spark Plugs</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/motor-oil.jpg"></img></figure>
                  <figcaption>Motor Oils</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/gear-oil.jpg"></img></figure>
                  <figcaption>Gear Oils</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/coolant.jpg"></img></figure>
                  <figcaption>Coolant</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/bodywork.jpg"></img></figure>
                  <figcaption>Bodywork Cleaning & Care</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/car-mats.jpg"></img></figure>
                  <figcaption>Car Mats</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/wire-cable.jpg"></img></figure>
                  <figcaption>Wires & Cables</figcaption>
                </a>
              </li>
              <li className="col-lg-2 col-md-3 col-4 ">
                <a href="#">
                  <figure><img src="/img/categories/refrigerator.jpg"></img></figure>
                  <figcaption>Refrigerator</figcaption>
                </a>
              </li>
            </ul>
          </article>
        </section>
        <div className="gray-bg pb-sec">
          <div className="container-fluid">
            <div className="row">
              <div className="col products-list">
                <header className="sec-head">
                  <h2>
                    Top Selling
                    <label>Your Selected vehicle: <span>Kia Rio 2015</span></label>
                  </h2>
                </header>
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
                                <span>{getLength(product.reviews)} 0 Review(s)</span>
                              </div>
                              <p className="price">{product.salesPrice.toFixed(2)} <span>RS</span></p>
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
        </div>
      </div>
    );
  }
}


selectedVehicle = reduxForm({
	form: 'selectedVehicle'
})(selectedVehicle);
const WithSelectedVehicle = withRouter(selectedVehicle);
export default WithSelectedVehicle;
