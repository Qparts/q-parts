/* eslint-disable jsx-a11y/href-no-hash */
import React, { Component , Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { MediumScreen} from '../../components/Device';

class ModelList extends Component {
  render() {
    return (
      <Fragment>
        <section className="selected-vechile catalogue">
          <section className="default-header-bg">
            <div className="container-fluid">
              <div className="row">
                <header className="col">
                  <MediumScreen>
                    <label className="header-label">Your selected vehicle:</label>
                  </MediumScreen>
                  <h3>
                    Skoda Octavia 2012 <span className="vin-num"><MediumScreen>,</MediumScreen> VIN(JTHBJ46G9B2420251)</span>
                  </h3>
                </header>
                <div className="col-auto">
                  <a href="#" className="btn btn-primary"><i className="icon-vehicle"></i>Change<MediumScreen> Vehicle</MediumScreen></a>
              </div>
              </div>
            </div>
          </section>
          <section className="gray-bg pb-sec">
            <div className="container-fluid">
              <header className="sec-head">
                <h2>Select Model</h2>
              </header>
              <div class="table-responsive ">
                <table class="table table-borderless">
                  <thead>
                    <th scope="col">Model designation</th>
                    <th scope="col">Engine</th>
                    <th scope="col">Engine code	</th>
                    <th scope="col">Model</th>
                    <th scope="col">Region</th>
                    <th scope="col">Steering</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Es240 / 350 - GSV40L-BETGKV</td>
                      <td>3500CC 24-VALVE DOHC EFI</td>
                      <td>2GRFE</td>
                      <td>GSV40L-BETGKV</td>
                      <td>North East</td>
                      <td>Left hand</td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>


          </section>
        </section>


      </Fragment>
    );
  }
}
export default withRouter(ModelList);
