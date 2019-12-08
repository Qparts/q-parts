import React, { Component , Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { MediumScreen , LargeScreen , DownLargeScreen} from '../../components/Device';
import { Modal, ModalHeader, ModalBody, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';

class CatalogueGroupsListing extends Component {
  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      modal: false,
      popoverOpen: false
    };
  }

  toggle() {
    this.setState(prevState => {
      console.log(prevState);
      return ({
        modal: !prevState.modal,
        popoverOpen: !prevState.popoverOpen
      })
    });
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
                <a href="#" className="back-groups">
                  <i className="icon-arrow-l"></i>All Groups
                </a>
              </DownLargeScreen>
              <div className="row">
                <LargeScreen>
                  <div className="col-3">
                    <div className="side-list sec-level">
                      <a href="#"><i className="icon-arrow-l"></i>All Groups</a>
                      <header>
                        <h5>Tool/Engine/Fuel</h5>
                      </header>
                        <ul className="list-unstyled">
                          <li><a href="#">Standard tool</a></li>
                          <li><a href="#">Partial engine assembly</a></li>
                          <li><a href="#">Short block assembly</a></li>
                          <li><a href="#">Engine overhaul gasket kit</a></li>
                          <li><a href="#">Cylinder head</a></li>
                          <li><a href="#">Cylinder block</a></li>
                          <li><a href="#">Timing gear cover</a></li>
                          <li><a href="#">Mounting</a></li>
                          <li><a href="#">Ventilation hose</a></li>
                          <li><a href="#">Crankshaft & piston</a></li>
                          <li><a href="#">Camshaft & valve</a></li>
                          <li><a href="#">Engine oil pump</a></li>
                          <li><a href="#">Oil filter</a></li>
                          <li><a href="#">Engine oil cooler</a></li>
                          <li><a href="#">Water pump</a></li>
                          <li><a href="#">Radiator & water outlet</a></li>
                          <li><a href="#">V-belt</a></li>
                          <li><a href="#">Manifold</a></li>
                          <li><a href="#">Exhaust pipe</a></li>
                          <li><a href="#">Air cleaner</a></li>
                          <li><a href="#">Vacuum piping</a></li>
                          <li><a href="#">Ignition coil & spark plug</a></li>
                          <li><a href="#">Alternator</a></li>
                          <li><a href="#">Starter</a></li>
                          <li><a href="#">Fuel injection system</a></li>
                        </ul>
                    </div>
                  </div>
                </LargeScreen>
                <div className="col-lg-9">
                  <div className="catalogue-listing">
                    <header>
                      <h2>Tool/Engine/Fuel</h2>
                    </header>
                    <ul className="list-unstyled row">
                      <li className="col-md-4 col-sm-6 sec-child">
                        <a href="#">
                        <div>
                            <img src="http://img.parts-catalogs.com/r/250x250/honda/euro/17S8401/IMGE/B__5701.png"></img>
                            <div className="info">
                              <p>Standard Tool</p>
                              <a id="PopoverFocus"><i className="icon-info"></i></a>
                                <UncontrolledPopover trigger="focus" placement="bottom" target="PopoverFocus">
                                  <PopoverHeader>Focus Trigger</PopoverHeader>
                                  <PopoverBody>Focusing on the trigging element makes this popover appear. Blurring (clicking away) makes it disappear. You cannot select this text as the popover will disappear when you try.</PopoverBody>
                                </UncontrolledPopover>
                            </div>
                        </div>
                      </a>
                      </li>
                      <li className="col-md-4 col-sm-6 sec-child">
                        <a href="#">
                          <div>
                              <img src="https://img.parts-catalogs.com/r/320x220/toyota_2018_06/general/742799A.png"></img>
                              <div className="info">
                                <p>AIR CONDITIONER (CONDENSER)</p>
                                <a href="#"><i className="icon-info"></i></a>
                              </div>
                          </div>
                        </a>
                      </li>
                      <li className="col-md-4 col-sm-6 sec-child">
                        <a href="#">
                          <div>
                              <img src="https://img.parts-catalogs.com/r/250x250/honda/euro/17S8401/IMGE/B__5900.png"></img>
                              <div className="info">
                                <p>AIR CONDITIONER (COOLING UNIT) (LH)</p>
                                <a href="#"><i className="icon-info"></i></a>
                              </div>
                          </div>
                        </a>
                      </li>
                      <li className="col-md-4 col-sm-6">
                        <div>
                          <a href="#">
                            <figure>
                              <img src="/img/catalogue/engine.jpg"></img>
                            </figure>
                            <figcaption>
                              <h3>Tool/Engine/Fuel</h3>
                            </figcaption>
                          </a>
                            <MediumScreen>
                              <ul className="list-unstyled">
                                <li>
                                    <a href="#">standard tool</a>
                                </li>
                                <li><a href="#">Partial engine assembly</a></li>
                              </ul>
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
