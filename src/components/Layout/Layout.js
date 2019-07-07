import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Login from "../../containers/Authentication/Login/Login";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Header from "./Header/Header.js";
import Footer from "./Footer/Footer";
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import Title from '../UI/Title';
import EmailVerification from '../../containers/Authentication/ForgotPassword/EmailVerification/EmailVerification';
import { LargeScreen } from '../Device';

class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogType: 'signin',
      modal: false
    };
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
      default:
        break;
    }
  }

  getDialogComponent = () => {
    const { dialogType } = this.state;

    switch (dialogType) {
      case 'signin':
        return <Login toggle={this.togglePopup} />

      default:
        break;
    }
  }

  renderFooter = () => {
    const { location: { pathname }, translate } = this.props;
    if (pathname === '/listing' || pathname.startsWith('/setting')) {
      return <LargeScreen>
        <Footer translate={translate} />
      </LargeScreen>

    } else {
      return (
          <Footer translate={translate} />
      )
    }
  }

  render() {
    const {
      isLoggedIn, fullName, translate, localize, changeDefaultDirection,
      countriesOnly, getCountriesOnly, selectCountry, direction, cart, currentLanguage
    } = this.props;
    const dialog = (
      <Modal dir={direction} contentClassName="container-fluid" className={this.getDialogProps().className} isOpen={this.state.modal} toggle={this.togglePopup} >
        <ModalHeader toggle={this.togglePopup}>
          <p>Welcome</p> Back
        </ModalHeader>
        <ModalBody>
          {this.getDialogComponent()}
        </ModalBody>
      </Modal>
    )
    return (
      <Fragment>
        <Header
          currentLanguage={currentLanguage}
          translate={translate}
          localize={localize}
          vehicles={this.props.vehicles}
          isLoggedIn={isLoggedIn}
          fullName={fullName}
          onAddVechile={this.handleDialog.bind(this, 'vehicle')}
          onSignin={this.handleDialog.bind(this, 'signin')}
          onSearch={this.handleDialog.bind(this, 'search')}
          changeDefaultDirection={changeDefaultDirection}
          countriesOnly={countriesOnly}
          getCountriesOnly={getCountriesOnly}
          selectCountry={selectCountry}
          direction={direction}
          cart={cart} 
          quotations={this.props.quotations}/>
        {dialog}
        {/*<div className="cd-main-content checkout">*/}
        <div className="cd-main-content">
          <div className="main-content">
            {this.props.children}
          </div>
          {this.renderFooter()}
          <div className="cd-overlay"></div>
        </div>
      </Fragment>
    );
  }
}


const mapStateToProps = state => {
  return {
    currentLanguage: getActiveLanguage(state.localize).code,
  }
}

const WithLayout = withRouter(Layout);

export default connect(mapStateToProps, null)(WithLayout);
