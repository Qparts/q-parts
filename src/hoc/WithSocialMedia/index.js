import React, { Component } from 'react';

import { FACEBOOK, GOOGLE, TWITTER } from '../../containers/Authentication/constants';

const WithSocialMedia = WrappedComponent => {
  return class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        visible: false
      }
    }

    static displayName = `WithSocialMedia(${WrappedComponent.displayName ||
      WrappedComponent.name})`;

    onHide = (event) => {
      this.setState({ visible: false });
    }

    handleShowDialog = () => {
      this.setState({
        visible: true
      })
    }

    handleResponse = (type) => (response) => {
      let data = {};
      switch (type) {
        case FACEBOOK:

          data = {
            socialMediaId: response.id,
            firstName: response.first_name,
            lastName: response.last_name,
            email: response.email,
            platform: FACEBOOK,
          };

          return this.props.socialMediaButton(data, this.props.component);

        case GOOGLE:
          const { googleId } = response;
          data = {
            socialMediaId: googleId,
            firstName: response.profileObj.givenName,
            lastName: response.profileObj.familyName,
            email: response.profileObj.email,
            platform: GOOGLE
          }

          return this.props.socialMediaButton(data, this.props.component);

        case TWITTER:
          data = {
            socialMediaId: response.id,
            firstName: response.name.split(' ')[0],
            lastName: response.name.split(' ')[1],
            email: response.email,
            platform: TWITTER
          };

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
        onShowDialog={this.handleShowDialog}
        visible={this.state.visible}
        {...this.props} />
    }
  }
}

export default WithSocialMedia;