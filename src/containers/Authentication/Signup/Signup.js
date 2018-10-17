import React, { Component, Fragment } from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import { Dialog } from 'primereact/components/dialog/Dialog';

import SignupForm from './SignupForm/SignupForm';
import SocialMedia from '../SocialMedia/SocialMedia';
import TabContainer from '../../../components/UI/TabContainer';
import VerificationNumber from '../../../components/VerificationNumber/VerificationNumber';
import { getComponentName } from '../../../utils';
import { getCountries } from '../../../actions/apiAction';
import WithSocialMedia from '../../../hoc/WithSocialMedia';

import { socialMediaButton, onSubmitSignup, emailSignup, verifyCodeNo } from '../../../actions/customerAction';
import { ON_SOCIAL_MEDIA_SIGNUP } from '../../../constants';

import './Signup.css';


class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginOrSignUp: 0,
    }
  }

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
    const { firstName, lastName, email, password, countryId: { countryCode }, mobile, platform, socialMediaId } = values;
    const countryId = values.countryId.value;

    return this.props.onSubmitSignup({ firstName, lastName, email, password, countryId, countryCode, mobile, platform, socialMediaId }, this.props.currentLanguage)
      .then(() => {
        this.props.onShowDialog();
      })
  }

  onConfirmDialog = values => {
    return this.props.verifyCodeNo(values, this.props.platform);
  }

  render() {
    const { loginOrSignUp } = this.state;
    const { translate } = this.props;
    const signup = <SignupForm
      showPassword={this.props.showPassword}
      onSubmit={this.handleSubmit}
      countries={this.props.countries} />
    const dialog =
      <Dialog header={translate("dialog.signup.title")} visible={this.props.visible} minWidth={500} modal={true} onHide={this.props.onHide}>
        <div className="Signup-verification_number">
          <VerificationNumber
            label={translate("dialog.signup.label")}
            name="code"
            placeholder={translate("dialog.signup.placeholder")}
            footer={translate("dialog.signup.footer")}
            submitButton={translate("general.buttons.confirm")}
            onSubmit={this.onConfirmDialog}
          />
          <p>{translate("dialog.signup.resendCode")}<button type="button" className="btn btn-sm btn-link">{translate("dialog.signup.resendCodeLink")}</button></p>
        </div>
      </Dialog>
    return (
      <Fragment>
        <Paper>
          <Tabs
            value={loginOrSignUp}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}
            fullWidth
            centered >
            <Tab label={translate("form.signin.tabs.tabOne")} />
            <Tab label={translate("form.signin.tabs.tabTwo")} />
          </Tabs>
        </Paper>
        {loginOrSignUp === 0 &&
          <TabContainer>
            <div className="SignupForm-container">
              {signup}
              <hr />
              <SocialMedia
                handleResponse={this.props.handleResponse}
                handleFailure={this.props.handleFailure} />
            </div>
            {dialog}
          </TabContainer>}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showPassword: state.customer.showPassword,
    token: state.customer.token,
    countries: state.api.countries,
    platform: state.customer.detail.platform,
    translate: getTranslate(state.localize),
    component: getComponentName(ON_SOCIAL_MEDIA_SIGNUP),
    currentLanguage: getActiveLanguage(state.localize).code
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