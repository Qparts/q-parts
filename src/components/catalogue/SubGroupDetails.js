import React, { Component , Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { MediumScreen , LargeScreen , DownLargeScreen , DownMediumScreen} from '../../components/Device';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class SubGroupDetails extends Component {
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
          <div className="breadcrumb-main">
            <div className="container-fluid">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item"><a href="#">Tyres</a></li>
                  <li className="breadcrumb-item"><a href="#">Nexen</a></li>
                  <li className="breadcrumb-item active" aria-current="page">ROADIAN AT PRO RA8</li>
                </ol>
              </nav>
            </div>
          </div>
          <section className="gray-bg pb-sec">
            <div className="container-fluid">
              <DownLargeScreen>
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
              </DownLargeScreen>
              <div className="row">
                <div className="col">
                  <div className="catalogue-listing group-details">
                    <header>
                      <h2>Standard Tool</h2>
                    </header>
                    <div className="row">
                      <div className="col-md">
                        <div className="part-img">
                          <img src="http://img.parts-catalogs.com/toyota_2018_06/general/741895C.png"></img>
                        </div>
                      </div>
                      <div className="col-md">
                        <div className="parts-list">
                          <ul className="list-unstyled" id="parts-liast">
                          <li>
                            <h5>JACK ASSY</h5>
                              <div class="accordion">
                                <div className="part-details">
                                  <ul className="list-unstyled">
                                    <li>
                                      <div className="parts">
                                        <p>
                                          09110 <span>- 09111-33030</span>
                                        </p>
                                        <div className="actions">
                                          <a className="btn btn-gray">Check Price</a>
                                          <a href="#" data-target="#part1" className="details collapsed" data-toggle="collapse" aria-expanded="true" aria-controls="part1">
                                            <i className="icon-less"></i>
                                          </a>
                                        </div>
                                      </div>
                                      <div id="part1" class="collapse" data-parent="#parts-liast">
                                        <div className="d-table">
                                          <div className="d-table-row">
                                            <div className="d-table-cell">Prod date</div>
                                            <div className="d-table-cell">Models</div>
                                            <div className="d-table-cell">Replacements</div>
                                            <div className="d-table-cell">QTY</div>
                                          </div>
                                          <div className="d-table-row">
                                            <div className="d-table-cell">08/2010-06/2012</div>
                                            <div className="d-table-cell">ACV40,GSV40</div>
                                            <div className="d-table-cell">09111-76010</div>
                                            <div className="d-table-cell">01</div>
                                          </div>
                                        </div>
                                    </div>
                                    </li>
                                    <li>
                                      <div className="parts">
                                        <p>
                                          09110 <span>- 09111-33030</span>
                                        </p>
                                        <div className="actions">
                                          <a className="btn btn-gray">Check Price</a>
                                          <a href="#" data-target="#part2" className="details collapsed" data-toggle="collapse" aria-expanded="true" aria-controls="part2">
                                            <i className="icon-less"></i>
                                          </a>
                                        </div>
                                      </div>
                                      <div id="part2" class="collapse" data-parent="#parts-liast">
                                        <div className="d-table">
                                          <div className="d-table-row">
                                            <div className="d-table-cell">Prod date</div>
                                            <div className="d-table-cell">Models</div>
                                            <div className="d-table-cell">Replacements</div>
                                            <div className="d-table-cell">QTY</div>
                                          </div>
                                          <div className="d-table-row">
                                            <div className="d-table-cell">08/2010-06/2012</div>
                                            <div className="d-table-cell">ACV40,GSV40</div>
                                            <div className="d-table-cell">09111-76010</div>
                                            <div className="d-table-cell">01</div>
                                          </div>
                                        </div>
                                    </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                          </li>
                          <li className="active">
                            <h5>HANDLE, JACK</h5>
                              <div class="accordion">
                                <div className="part-details">
                                  <ul className="list-unstyled">
                                    <li>
                                      <div className="parts">
                                        <p>
                                          09110 <span>- 09111-33030</span>
                                        </p>
                                        <div className="actions">
                                          <a className="btn btn-gray" onClick={this.toggle} >Check Price</a>
                                            <Modal isOpen={this.state.modal} toggle={this.toggle} className="vin-modal modal-xl price-modal">
                                                <ModalHeader toggle={this.toggle}>
                                                  #09111-33030 <span>- JACK ASSY</span>
                                                </ModalHeader>
                                                <ModalBody>
                                                      <div className="d-table">
                                                        <div className="d-table-row">
                                                          <div className="d-table-cell">Make</div>
                                                          <MediumScreen>
                                                            <div className="d-table-cell">Number</div>
                                                            <div className="d-table-cell">Name</div>
                                                            <div className="d-table-cell">Weight</div>
                                                          </MediumScreen>
                                                          <div className="d-table-cell">Price</div>
                                                          <div className="d-table-cell"></div>
                                                        </div>
                                                        <div className="d-table-row">
                                                          <div className="d-table-cell">Skoda</div>
                                                          <MediumScreen>
                                                            <div className="d-table-cell">#09111-33030</div>
                                                            <div className="d-table-cell">JACK ASSY</div>
                                                            <div className="d-table-cell">0.05</div>
                                                          </MediumScreen>
                                                          <div className="d-table-cell">22.00 RS</div>
                                                          <div className="d-table-cell">
                                                            <div class="input-group">
                                                              <MediumScreen>
                                                                <input type="text" class="form-control"  value="1" />
                                                              </MediumScreen>
                                                              <div class="input-group-append">
                                                                <button class="btn btn-primary" type="button">
                                                                  Add To Cart<MediumScreen><i className="icon-cart"></i></MediumScreen>
                                                                </button>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    <div className="substitute">
                                                      <h5>Substitutions</h5>
                                                          <div className="d-table">
                                                            <div className="d-table-row">
                                                              <div className="d-table-cell">Make</div>
                                                                <MediumScreen>
                                                                  <div className="d-table-cell">Number</div>
                                                                  <div className="d-table-cell">Name</div>
                                                                  <div className="d-table-cell">Weight</div>
                                                                </MediumScreen>
                                                                <div className="d-table-cell">Price</div>
                                                              <div className="d-table-cell"></div>
                                                            </div>
                                                            <div className="d-table-row">
                                                              <div className="d-table-cell">Skoda</div>
                                                              <MediumScreen>
                                                                <div className="d-table-cell">#09111-33030</div>
                                                                <div className="d-table-cell">JACK ASSY</div>
                                                                <div className="d-table-cell">0.05</div>
                                                              </MediumScreen>
                                                              <div className="d-table-cell">22.00 RS</div>
                                                              <div className="d-table-cell">
                                                                <div class="input-group">
                                                                  <MediumScreen>
                                                                    <input type="text" class="form-control"  value="1" />
                                                                  </MediumScreen>
                                                                  <div class="input-group-append">
                                                                    <button class="btn btn-primary" type="button">
                                                                      Add To Cart <MediumScreen><i className="icon-cart"></i></MediumScreen>
                                                                    </button>
                                                                  </div>
                                                                </div>

                                                              </div>
                                                            </div>
                                                          </div>
                                                    </div>
                                                </ModalBody>
                                            </Modal>
                                          <a href="#" data-target="#part3" className="details collapsed" data-toggle="collapse" aria-expanded="true" aria-controls="part3">
                                            <i className="icon-less"></i>
                                          </a>
                                        </div>
                                      </div>
                                      <div id="part3" class="collapse" data-parent="#parts-liast">
                                        <div className="d-table">
                                          <div className="d-table-row">
                                            <div className="d-table-cell">Prod date</div>
                                            <div className="d-table-cell">Models</div>
                                            <div className="d-table-cell">Replacements</div>
                                            <div className="d-table-cell">QTY</div>
                                          </div>
                                          <div className="d-table-row">
                                            <div className="d-table-cell">08/2010-06/2012</div>
                                            <div className="d-table-cell">ACV40,GSV40</div>
                                            <div className="d-table-cell">09111-76010</div>
                                            <div className="d-table-cell">01</div>
                                          </div>
                                        </div>
                                    </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                          </li>
                          <li>
                              <div class="accordion">
                                <div className="part-details">
                                  <ul className="list-unstyled">
                                    <li>
                                      <div className="parts">
                                        <p>
                                          09110 <span>- 09111-33030</span>
                                        </p>
                                        <div className="actions">
                                          <a className="btn btn-gray" onClick={this.toggle}>Check Price</a>
                                            <Modal isOpen={this.state.modal} toggle={this.toggle} className="vin-modal modal-lg price-modal">
                                                <ModalHeader toggle={this.toggle}>
                                                  #09111-33030 <span>- JACK ASSY</span>
                                                </ModalHeader>
                                                <ModalBody>
                                                  <div className="qoutation">
                                                    <img src="/img/no-products.svg"></img>
                                                    <p>
                                                      <span>Unfortunately the product with number #06H103011AN  is temporarily unavailable</span>
                                                      Send Us Your Order and We Will Respond With the Best Prices and Necessary Details
                                                    </p>
                                                    <a href="#" className="btn btn-primary">Make a Quotation Order <i className="icon-send"></i></a>
                                                  </div>

                                                </ModalBody>
                                            </Modal>
                                          <a href="#" data-target="#part4" className="details collapsed" data-toggle="collapse" aria-expanded="true" aria-controls="part4">
                                            <i className="icon-less"></i>
                                          </a>
                                        </div>
                                      </div>
                                      <div id="part4" class="collapse" data-parent="#parts-liast">
                                        <div className="d-table">
                                          <div className="d-table-row">
                                            <div className="d-table-cell">Prod date</div>
                                            <div className="d-table-cell">Models</div>
                                            <div className="d-table-cell">Replacements</div>
                                            <div className="d-table-cell">QTY</div>
                                          </div>
                                          <div className="d-table-row">
                                            <div className="d-table-cell">08/2010-06/2012</div>
                                            <div className="d-table-cell">ACV40,GSV40</div>
                                            <div className="d-table-cell">09111-76010</div>
                                            <div className="d-table-cell">01</div>
                                          </div>
                                        </div>
                                    </div>
                                    </li>

                                  </ul>
                                </div>
                              </div>
                          </li>
                        </ul>
                        </div>
                      </div>
                    </div>
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
export default withRouter(SubGroupDetails);
