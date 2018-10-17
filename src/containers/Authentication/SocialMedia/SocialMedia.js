import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import Twitter from './Twitter';
import { DISCONNECT } from '../../../constants';

import './SocialMedia.css';

class SocialMedia extends Component {
  static defaultProps = {
    facebook: 'facebook',
    google: 'google',
    twitter: 'twitter',
    className: 'SignupForm-social_media'
  }
  render() {
    return (
      <div className={this.props.className}>
        <div className="SocialMedia-icons">
          {this.props.facebookIcon}
          <FacebookLogin
            appId="428174590941945"
            autoLoad={false}
            fields="id, first_name, last_name, email"
            callback={this.props.handleResponse('facebook')}
            render={renderProps => (
              <button disabled={this.props.facebook === DISCONNECT} className="btn btn-light" onClick={renderProps.onClick}>{this.props.facebook}</button>
            )} />
        </div>
        <div className="SocialMedia-icons">
          {this.props.googleIcon}
          <GoogleLogin
            className="btn btn-light"
            clientId="743672676037-c9ls9ot3qh5rupohh1e15l51ohgl3h3t.apps.googleusercontent.com"
            buttonText={this.props.google}
            onSuccess={this.props.handleResponse('google')}
            onFailure={this.props.handleFailure}
            disabled={this.props.google === DISCONNECT}
          />
        </div>
        <div className="SocialMedia-icons">
          {this.props.twitterIcon}
          <Twitter
            buttonText={this.props.twitter}
            className="btn btn-light"
            onSuccess={this.props.handleResponse('twitter')}
            onFailure={this.props.handleFailure}
            disabled={this.props.twitter === DISCONNECT}
          />
        </div>
      </div>
    )
  }
}

export default SocialMedia;