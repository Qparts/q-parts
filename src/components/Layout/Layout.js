import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";

import Vehicles from "../Vehicles/Vehicles";
import Search from "../Search/Search";
import Login from "../../containers/Authentication/Login/Login";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer";

import Title from '../UI/Title';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogType: 'signin',
      modal: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.vehicles !== this.props.vehicles && this.state.visible) {
    //   this.onHide();
    // }
    if (this.props.isLoggedIn && prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.togglePopup();
    }
  }

  handleDialog = (dialogType) => {
    this.setState({ dialogType });
    this.togglePopup();
  };
  togglePopup = () => {
    this.setState({
      modal: !this.state.modal
    })
  }
  handleChange = (event, value) => {
    this.setState({
      newOrOldVechile: value
    });
  };

  getDialogProps = () => {
    const { dialogType } = this.state;
    const { translate } = this.props;

    switch (dialogType) {
      case 'vehicle':
        return {
          header: <Title
            header={translate("dialog.vehicle.title")}
            subHeader={translate("dialog.vehicle.subTitle")} />,
          className: "garage-popup"
        }
      case 'signin':
        return {
          header: <Title header={translate("dialog.signin.title")} />
        }
      case 'search':
        return {
          header: <p>All auo parts in one place - choose yours among 1.000.000 of spare parts</p>,
          className: "search-popup"
        }
      default:
        break;
    }
  }

  getDialogComponent = () => {
    const { vehicles } = this.props;
    const { dialogType } = this.state;

    switch (dialogType) {
      case 'vehicle':
        return <Vehicles />
      case 'signin':
        return <Login toggle={this.togglePopup} />
      case 'search':
        return <Search toggle={this.togglePopup} />

      default:
        break;
    }
  }

  render() {
    const {
      isLoggedIn, fullName, translate, localize, changeDefaultDirection,
      vehiclesFormat, selectedVehicle
    } = this.props;
    const dialog = (
      <Modal className={this.getDialogProps().className} isOpen={this.state.modal} toggle={this.togglePopup} >
        <ModalHeader toggle={this.togglePopup}>{this.getDialogProps().header}</ModalHeader>
        <ModalBody>
          {this.getDialogComponent()}
        </ModalBody>
      </Modal>
    )
    return (
      <Fragment>
        <Header
          translate={translate}
          localize={localize}
          vehicles={this.props.vehicles}
          isLoggedIn={isLoggedIn}
          fullName={fullName}
          onAddVechile={this.handleDialog.bind(this, 'vehicle')}
          onSignin={this.handleDialog.bind(this, 'signin')}
          onSearch={this.handleDialog.bind(this, 'search')}
          changeDefaultDirection={changeDefaultDirection} />
        {dialog}
        <div className="cd-main-content">
          {this.props.children}
          <Footer />
          <div class="cd-overlay"></div>
        </div>
      </Fragment>
    );
  }
}

const WithLayout = withRouter(Layout);

export default WithLayout;
