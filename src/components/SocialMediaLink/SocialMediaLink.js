import React, { Component, Fragment } from 'react';
import SocialMedia from '../../containers/Authentication/SocialMedia/SocialMedia';
import { smConnectionStatus } from '../../utils/components';

import './SocialMediaLink.css';

class SocialMediaLink extends Component {
 render() {
  return (
   <Fragment>
    <SocialMedia
     className="SocialMediaLink-container"
     facebook={smConnectionStatus(this.props.connectedPlatforms, 'facebook')}
     google={smConnectionStatus(this.props.connectedPlatforms, 'google')}
     twitter={smConnectionStatus(this.props.connectedPlatforms, 'twitter')}
     handleResponse={this.props.handleResponse}
     handleFailure={this.props.handleFailure}
     facebookIcon={<i className="fab fa-facebook fa-3x"></i>}
     googleIcon={<i className="fab fa-google-plus-square fa-3x"></i>}
     twitterIcon={<i className="fab fa-twitter-square fa-3x"></i>}
    />
   </Fragment>
  )
 }
}

export default SocialMediaLink