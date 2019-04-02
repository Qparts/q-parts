import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFormSubmitErrors } from 'redux-form';
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';

import SignupForm from './SignupForm/SignupForm';
import SocialMedia from '../SocialMedia/SocialMedia';
import { getComponentName } from '../../../utils';
import { getCountries } from '../../../actions/apiAction';
import WithSocialMedia from '../../../hoc/WithSocialMedia';
import Login from '../Login/Login';

import { socialMediaButton, onSubmitSignup, emailSignup, verifyCodeNo, setPasswordScore } from '../../../actions/customerAction';
import { ON_SOCIAL_MEDIA_AUTH } from '../../../constants';
import { LargeScreen } from '../../../components/Device';

import Title from '../../../components/UI/Title';
class Signup extends Component {

  componentWillMount() {
    this.props.emailSignup();
    this.props.getCountries();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.token !== prevProps.token) {
      this.props.history.goBack();
    }
  }

  handleChange = (event) => {
    this.props.history.push('/login')
  };

  handleSubmit = (values) => {
    const { firstName, lastName, email, password, platform, socialMediaId } = values;
    const countryId = 1;

    return this.props.onSubmitSignup({ firstName, lastName, email, password, countryId, platform, socialMediaId }, this.props.currentLanguage)
      .then(() => {
        this.props.history.push({
          pathname: '/signup/successful',
          state: { isRegistered: false, email }
        });
      });
  }

  onConfirmDialog = values => {
    return this.props.verifyCodeNo(values, this.props.platform);
  }

  render() {
    const { translate, togglePopup, setPasswordScore, passwordScore, direction, currentLanguage } = this.props;
    const signup = <SignupForm
      onSubmit={this.handleSubmit}
      countries={this.props.countries}
      direction={this.props.direction}
      currentLanguage={currentLanguage}
      translate={translate}
      passwordScore={passwordScore}
      setPasswordScore={setPasswordScore} />
    const dialog = <Modal dir={direction} contentClassName="container-fluid" isOpen={this.props.modal} toggle={this.props.togglePopup} >
      <ModalHeader toggle={this.props.togglePopup}><Title header={translate("dialog.signin.title")} /></ModalHeader>
      <ModalBody>
        <Login toggle={this.props.togglePopup} />
      </ModalBody>
    </Modal>
    if (this.props.submitErrors.email) window.scrollTo(0, 0);
    return (
      <section className="signup-page">
        <div className="container-fluid">
          <Title
            header={translate("form.signup.title")}
            subHeader={translate("form.signup.subHeader")}
          />
          <div className="row">
            <div className="col-lg-7">
              {signup}
            </div>
            <div className="col-lg-5 have-account">
              <p>
                <img className="user" alt="user" src="/img/user.svg" />
                {translate("form.signup.haveAccount")} <Link to={"#"} onClick={togglePopup}> {translate("form.signup.signinLink")} </Link> {translate("form.signup.here")}
              </p>
              <SocialMedia
                title={translate("form.signup.socialMedia")}
                handleResponse={this.props.handleResponse}
                handleFailure={this.props.handleFailure} />
              <p>{translate("form.signup.socialMediaInfo")}</p>
              <LargeScreen>
                <aside>
                  <img src="/img/sign-up-image.png" alt="sign up" />
                </aside>
              </LargeScreen>
            </div>
          </div>
        </div>
        {dialog}
      </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.customer.token,
    passwordScore: state.customer.passwordScore,
    countries: state.api.countries,
    platform: state.customer.detail.platform,
    translate: getTranslate(state.localize),
    component: getComponentName(ON_SOCIAL_MEDIA_AUTH),
    currentLanguage: getActiveLanguage(state.localize).code,
    selectedCountry: state.customer.selectedCountry,
    direction: state.customer.direction,
    submitErrors: getFormSubmitErrors('SignupForm')(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    emailSignup,
    socialMediaButton,
    onSubmitSignup,
    verifyCodeNo,
    getCountries,
    setPasswordScore
  }, dispatch)
}

const WithSignup = WithSocialMedia(Signup);

export default connect(mapStateToProps, mapDispatchToProps)(WithSignup);
