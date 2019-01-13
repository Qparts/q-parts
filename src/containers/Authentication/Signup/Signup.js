import React, { Component, Fragment } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import { Dialog } from 'primereact/components/dialog/Dialog';

import SignupForm from './SignupForm/SignupForm';
import SocialMedia from '../SocialMedia/SocialMedia';
import { getComponentName } from '../../../utils';
import { getCountries } from '../../../actions/apiAction';
import WithSocialMedia from '../../../hoc/WithSocialMedia';
import Login from '../Login/Login';

import { socialMediaButton, onSubmitSignup, emailSignup, verifyCodeNo } from '../../../actions/customerAction';
import { colors, ON_SOCIAL_MEDIA_AUTH } from '../../../constants';

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
    const countryId = values.countryId.id;

    return this.props.onSubmitSignup({ firstName, lastName, email, password, countryId, platform, socialMediaId }, this.props.currentLanguage)
      .then(() => {
        this.props.history.push('/signup/successful');
      })
  }

  onConfirmDialog = values => {
    return this.props.verifyCodeNo(values, this.props.platform);
  }

  render() {
    const { translate, onShowDialog } = this.props;
    const signup = <SignupForm
      onSubmit={this.handleSubmit}
      countries={this.props.countries} />
    // const dialog =
    //   <Dialog header={translate("dialog.signup.title")} visible={this.props.visible} minWidth={500} modal={true} onHide={this.props.onHide}>
    //     <div className="Signup-verification_number">
    //       <VerificationNumber
    //         label={translate("dialog.signup.label")}
    //         name="code"
    //         placeholder={translate("dialog.signup.placeholder")}
    //         footer={translate("dialog.signup.footer")}
    //         submitButton={translate("general.buttons.confirm")}
    //         onSubmit={this.onConfirmDialog}
    //       />
    //       <p>{translate("dialog.signup.resendCode")}<button type="button" className="btn btn-sm btn-link">{translate("dialog.signup.resendCodeLink")}</button></p>
    //     </div>
    //   </Dialog>
    const dialog = <Dialog
      showHeader={true}
      maximizable={true}
      visible={this.props.visible}
      positionTop={65}
      modal={true}
      onHide={this.props.onHide}
      style={{
        background: colors.lightGray
      }}
    >
      <Login />
    </Dialog>
    return (
      <section id="signup">
        <div className="container-fluid">
          <Title
            header={translate("form.signup.title")}
            subHeader={translate("form.signup.subHeader")}
          />
          <div className="row">
            <div className="col-lg-6 col-sm-12">
              {signup}
            </div>
            <div id="right-half" className="col-lg-6 col-sm-12">
              <span className="seperator"></span>
              <div id="signin-link">
                <span className="user-img">
                  <img class="user" alt="user" src="/img/user.svg" />
                </span>
                <span>{translate("form.signup.haveAccount")}
                <span className="btn-link" onClick={onShowDialog}>{translate("form.signup.signinLink")}</span>
                {translate("form.signup.here")}
                </span>
              </div>
              <SocialMedia
                title={translate("form.signup.socialMedia")}
                handleResponse={this.props.handleResponse}
                handleFailure={this.props.handleFailure} />
              <span id="social-media-info"><p>{translate("form.signup.socialMediaInfo")}</p></span>
              <img src="/img/sign-up-image.png" alt="sign up"/>
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
    countries: state.api.countries,
    platform: state.customer.detail.platform,
    translate: getTranslate(state.localize),
    component: getComponentName(ON_SOCIAL_MEDIA_AUTH),
    currentLanguage: getActiveLanguage(state.localize).code,
    selectedCountry: state.customer.selectedCountry
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    emailSignup,
    socialMediaButton,
    onSubmitSignup,
    verifyCodeNo,
    getCountries
  }, dispatch)
}

const WithSignup = WithSocialMedia(Signup);

export default connect(mapStateToProps, mapDispatchToProps)(WithSignup);