import React, { Component } from "react";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import * as validations from "../../utils";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import RenderField from "../../components/RenderField/RenderField";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getTranslate } from "react-localize-redux";
import {
    setSelectedVehicleVin
  } from "../../actions/apiAction";



export class BrowseModal extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      modal: false,
      browseCatalogeModal: false,
      vin: "JTHBJ46G9B2420251",

    };
  }

  toggle() {
    this.setState(prevState => ({
      browseCatalogeModal: !prevState.browseCatalogeModal
    }));
  }
  
  render() {
    const { currentLanguage } = this.props;

    return (
      <Modal
        isOpen={this.state.browseCatalogeModal}
        toggle={this.toggle}
        className="modal-lg vin-modal"
      >
        <ModalHeader toggle={this.toggle}>
          {this.props.translate("general.browseCataloge.vehicleVinNumber")}
        </ModalHeader>
        <ModalBody>
          <div className="row veh-main-info">
            <div className="col">
              <p>
                <label className="header-label">
                  {this.props.translate(
                    "general.browseCataloge.vehcileSelectedLabel"
                  )}
                  :
                </label>
                {currentLanguage === "ar"
                  ? this.props.selectedVehicle.nameAr +
                    " " +
                    this.props.selectedVehicleModel.nameAr +
                    " " +
                    this.props.selectedVehicleYear.label
                  : this.props.selectedVehicle.name +
                    " " +
                    this.props.selectedVehicleModel.name +
                    " " +
                    this.props.selectedVehicleYear.label}
              </p>
            </div>
          </div>
          <form
            className="gray-input vin-input"
            onSubmit={this.props.handleSubmit(this.props.handleSubmit)}
          >
            <Field
              onChange={e => this.props.onSelectedVehicleVin(e.target.value)}
              hasFloatLabel
              name="VIN/Frame"
              type="text"
              placeholder={this.props.translate("general.VINInput.placeholder")}
              label={this.props.translate("general.VINInput.label")}
              errorMessage={`${this.props.translate(
                "general.enter"
              )} ${this.props.translate("general.VINInput.label")}`}
              component={props => (
                <RenderField {...props} value={this.props.vinInput} />
              )}
              validate={[validations.required]}
            />
            <div className="VIN-info">
              <p
                onClick={() =>
                  this.setState(prevState => ({
                    vinInput: prevState.vin
                  }))
                }
              >
                {this.props.translate("vehicleInfo.VINNumberEx")}:{" "}
                <Link to="#">{this.state.vin}</Link>
              </p>
              <p className="id-img" id="UncontrolledPopover" type="text">
                <i className="icon-info"></i>{" "}
                {this.props.translate("vehicleInfo.carId")}
              </p>
              <UncontrolledPopover placement="top" target="UncontrolledPopover">
                <PopoverBody>
                  <img alt="" src="/img/vin-ex.jpg" />
                </PopoverBody>
              </UncontrolledPopover>
            </div>
            <div className="actions two-actions">
              <div className="row">
                <div className="col-auto">
                  <button
                    type="submit"
                    className="btn btn-gray"
                    onClick={this.toggle}
                  >
                    {this.props.translate("general.buttons.cancel")}
                  </button>
                </div>
                <div className="col-md-auto col">
                  <button type="submit" className="btn btn-primary">
                    {this.props.translate(
                      "general.browseCataloge.browseButton"
                    )}
                    <i className="icon-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
    return {
      translate: getTranslate(state.localize),
      selectedVehicleVin: state.api.selectedVehicleVin,
    };
  };
  
  BrowseModal = reduxForm({
    form: "ManualForm"
  })(BrowseModal);
  
  const withBrowseModal = withRouter(BrowseModal);
  
  const mapDispatchToProps = dispatch => {
    return {
      onSelectedVehicleVin: value => dispatch(setSelectedVehicleVin(value))
    };
  };
   
export default connect(mapStateToProps, mapDispatchToProps)(withBrowseModal);
