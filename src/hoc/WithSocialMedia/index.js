import React, { Component } from 'react';

import { FACEBOOK, GOOGLE, TWITTER } from '../../containers/Authentication/constants';

const WithSocialMedia = WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props)

      this.state = {
        modal: false
      }
    }

    static displayName = `WithSocialMedia(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    onHide = (event) => {
      this.setState({ modal: false });
    }

    togglePopup = () => {
      this.setState({
        modal: !this.state.modal
      })
    }

    handleResponse = (type) => (response) => {
      const { currentLanguage, selectedCountry, toggle } = this.props
      let data = {};
      switch (type) {
        case FACEBOOK:

          data = {
            socialMediaId: response.id,
            firstName: response.first_name,
            lastName: response.last_name,
            email: response.email,
            platform: FACEBOOK,
            countryId: selectedCountry.id,
            defaultLang: currentLanguage

          };
          if (toggle) {
            toggle();
          }
          return this.props.socialMediaButton(data, this.props.component);

        case GOOGLE:
          const { googleId } = response;
          data = {
            socialMediaId: googleId,
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            email: response.profileObj.email,
            platform: GOOGLE,
            countryId: selectedCountry.id,
            defaultLang: currentLanguage
          }
          if (toggle) {
            toggle();
          }
          return this.props.socialMediaButton(data, this.props.component);

        default:
          break;
      }
    }

    handleFailure = (error) => {
      return error;
    }

    render() {
      return <WrappedComponent
        handleResponse={this.handleResponse}
        handleFailure={this.handleFailure}
        onHide={this.onHide}
        togglePopup={this.togglePopup}
        modal={this.state.modal}
        {...this.props} />
    }
  }
}

export default WithSocialMedia;