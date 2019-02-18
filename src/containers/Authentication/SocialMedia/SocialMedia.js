import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import { DISCONNECT } from '../../../constants';

class SocialMedia extends Component {
  static defaultProps = {
    facebook: <i className="icon-facebook"></i>,
    google: <img src="/img/google-icon.svg" alt="google" />,
  }
  render() {
    return (
      <div id="social-media">
        <div>
          <span className="solid-line" />
          <p>{this.props.title}</p>
        </div>
        <div className="btn-social-media">
          <div>
            {this.props.facebookIcon}
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              autoLoad={false}
              fields="id, first_name, last_name, email"
              callback={this.props.handleResponse('facebook')}
              render={renderProps => (
                <button
                  className="btn btn-facebook"
                  disabled={this.props.facebook === DISCONNECT}
                  onClick={renderProps.onClick}>{this.props.facebook}</button>
              )} />
          </div>
          <div>
            {this.props.googleIcon}
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onSuccess={this.props.handleResponse('google')}
              onFailure={this.props.handleFailure}
              disabled={this.props.google === DISCONNECT}
              render={renderProps => (
                <button
                  className="btn btn-google"
                  disabled={this.props.google === DISCONNECT}
                  onClick={renderProps.onClick}>{this.props.google}</button>
              )} />
          </div>
        </div>
      </div>
    )
  }
}

export default SocialMedia;