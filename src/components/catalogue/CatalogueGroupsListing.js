import React, { Component , Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { MediumScreen , LargeScreen , DownMediumScreen} from '../../components/Device';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';

class CatalogueGroupsListing extends Component {
  constructor(props){
    super(props)
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }


  render() {
    return (
      <Fragment>
        <section className="selected-vechile catalogue">
          <section className="default-header-bg">
            <div className="container-fluid">
              <div className="row">
                <header className="col">
                  <h3>
                    Skoda Octavia 2012 <span className="vin-num"><MediumScreen>,</MediumScreen> VIN(JTHBJ46G9B2420251)</span>
                  </h3>
                  <LargeScreen>
                      <ul className="list-inline vehicle-info">
                          <li>
                            <label>Model :</label>
                            <p>350 - GSV40L-BETGKV</p>
                          </li>
                          <li>
                            <label>Engine :</label>
                            <p>CDAB</p>
                          </li>
                          <li>
                            <label>Region :</label>
                            <p>North East</p>
                          </li>
                          <li>
                            <label>Steering :</label>
                            <p>Left hand</p>
                          </li>
                    </ul>
                  </LargeScreen>
                </header>
                <div className="col-auto">
                  <a href="#" className="btn btn-primary"><i className="icon-vehicle"></i>Change<MediumScreen> Vehicle</MediumScreen></a>
              </div>
              </div>
            </div>
          </section>
          <section className="gray-bg pb-sec">
            <div className="container-fluid">
              <DownMediumScreen>
                <a className="btn btn-gray-secondary info-btn" onClick={this.toggle}>
                  <p>
                    <span>Model designation</span>
                    Es240 / 350 - GSV40L-BETGKV
                  </p>
                  <i className="icon-info"></i>
                </a>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="vin-modal">
                  <ModalHeader toggle={this.toggle}>
                    Additional information
                  </ModalHeader>
                  <ModalBody>
                      <table class="table info table-borderless">
                        <tbody>
                          <tr>
                            <th scope="row">Engine</th>
                            <td>CDAB</td>
                          </tr>
                          <tr>
                            <th scope="row">Region</th>
                            <td>North East</td>
                          </tr>
                          <tr>
                            <th scope="row">Steering</th>
                            <td>Left hand</td>
                          </tr>
                        </tbody>
                      </table>
                  </ModalBody>
                </Modal>
              </DownMediumScreen>
              <div className="row">
                <LargeScreen>
                  <div className="col-3">
                    <div className="side-list">
                      <header>
                        <h5>All Groups</h5>
                      </header>
                        <ul className="list-unstyled">
                          <li><a href="#">أداة / محرك / الوقود</a></li>
                          <li><a href="#">Power Train/Chassis</a></li>
                          <li><a href="#">Body</a></li>
                          <li><a href="#">Electrical</a></li>
                        </ul>
                    </div>
                  </div>
                </LargeScreen>

                <div className="col-lg-9">
                  <div className="catalogue-listing">
                    <header>
                      <h2>Select Group</h2>
                    </header>
                    <ul className="list-unstyled row groups">
                      <li className="col-md-4">
                        <div>
                          <a href="#">
                            <figure>
                              <img src="/img/catalogue/engine.jpg"></img>
                            </figure>
                            <figcaption>
                              <h3>أداة / محرك / الوقود</h3>
                            </figcaption>
                          </a>
                            <MediumScreen>
                              <ul className="list-unstyled">
                                <li>
                                    <a href="#">أداة قياسية</a>
                                </li>
                                <li><a href="#">تجميع محرك جزئي</a></li>
                                <li><a href="#">الجمعية كتلة قصيرة</a></li>
                                <li><a href="#">محرك إصلاح طوقا كيت</a></li>
                                <li><a href="#">الاسطوانة</a></li>
                              </ul>
                              <a href="#" className="btn btn-gray">
                                View More <i className="icon-plus"></i>
                              </a>
                            </MediumScreen>
                        </div>
                      </li>
                      <li className="col-md-4">
                        <div>
                          <a href="#">
                            <figure>
                              <img src="/img/catalogue/chassis.jpg"></img>
                            </figure>
                            <figcaption>
                              <h3>Power Train/Chassis</h3>
                            </figcaption>
                          </a>
                            <MediumScreen>
                              <ul className="list-unstyled">
                                <li>
                                  <a href="#">Shift lever & retainer</a>
                                </li>
                                <li>
                                  <a href="#">Transaxle or transmission assy & gasket kit (atm)</a>
                                </li>
                                <li>
                                  <a href="#">Torque converter, front oil pump & chain (atm)</a>
                                </li>
                                <li>
                                  <a href="#">Transmission case & oil pan (atm)</a>
                                </li>
                                <li>
                                  <a href="#">Overdrive gear (atm)</a>
                                </li>
                              </ul>
                              <a href="#" className="btn btn-gray">
                                View More <i className="icon-plus"></i>
                              </a>
                            </MediumScreen>
                        </div>
                      </li>
                      <li className="col-md-4">
                        <div>
                          <a href="#">
                            <figure>
                              <img src="/img/catalogue/body.jpg"></img>
                            </figure>
                            <figcaption>
                              <h3>body</h3>
                            </figcaption>
                          </a>
                            <MediumScreen>
                              <ul className="list-unstyled">
                                <li>
                                  <a href="#">Suspension crossmember & under cover</a>
                                </li>
                                <li>
                                  <a href="#">Spare wheel carrier</a>
                                </li>
                                <li>
                                  <a href="#">Front bumper & bumper stay</a>
                                </li>
                                <li>
                                  <a href="#">Rear bumper & bumper stay</a>
                                </li>
                                <li>
                                  <a href="#">Radiator grille</a>
                                </li>
                              </ul>
                              <a href="#" className="btn btn-gray">
                                View More <i className="icon-plus"></i>
                              </a>
                            </MediumScreen>
                        </div>
                      </li>
                      <li className="col-md-4">
                        <div>
                          <a href="#">
                            <figure>
                              <img src="/img/catalogue/electrical-.jpg"></img>
                            </figure>
                            <figcaption>
                              <h3>Electrical</h3>
                            </figcaption>
                          </a>
                            <MediumScreen>
                              <ul className="list-unstyled">
                                <li>
                                  <a href="#">Electrical</a>
                                </li>
                                <li>
                                  <a href="#">headlamp</a>
                                </li>
                                <li>
                                  <a href="#">fog lamp</a>
                                </li>
                                <li>
                                  <a href="#">side turn signal lamp </a>
                                </li>
                                <li>
                                  <a href="#">rear combination lamp</a>
                                </li>
                                <li>
                                  <a href="#">rear license plate lamp</a>
                                </li>
                              </ul>
                              <a href="#" className="btn btn-gray">
                                View More <i className="icon-plus"></i>
                              </a>
                            </MediumScreen>
                        </div>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

            </div>
          </section>
        </section>
      </Fragment>
    );
  }
}
export default withRouter(CatalogueGroupsListing);
