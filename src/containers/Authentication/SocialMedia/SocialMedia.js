import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import GoogleLogin from 'react-google-login';
import Twitter from './Twitter';
import { DISCONNECT } from '../../../constants';


class SocialMedia extends Component {
  static defaultProps = {
    facebook: <i className="icon-facebook-logo"></i>,
    google: <i className="icon-google-logo"></i>,
    twitter: <i className="icon-twitter"></i>,
  }
  render() {
    return (
      <div id="social-media">
        <div>
          <span className="solid-line" />
          <p>{this.props.title}</p>
        </div>
        <div>
          <div>
            {this.props.facebookIcon}
            <FacebookLogin
              appId="428174590941945"
              autoLoad={false}
              fields="id, first_name, last_name, email"
              callback={this.props.handleResponse('facebook')}
              render={renderProps => (
                <button disabled={this.props.facebook === DISCONNECT} className="btn-facebook" onClick={renderProps.onClick}>{this.props.facebook}</button>
              )} />
          </div>
          <div>
            {this.props.googleIcon}
            <GoogleLogin
              className="btn-google"
              clientId="743672676037-c9ls9ot3qh5rupohh1e15l51ohgl3h3t.apps.googleusercontent.com"
              buttonText={this.props.google}
              onSuccess={this.props.handleResponse('google')}
              onFailure={this.props.handleFailure}
              disabled={this.props.google === DISCONNECT}
            />
          </div>
          <div>
            {this.props.twitterIcon}
            <Twitter
              buttonText={this.props.twitter}
              className="btn-twitter"
              onSuccess={this.props.handleResponse('twitter')}
              onFailure={this.props.handleFailure}
              disabled={this.props.twitter === DISCONNECT}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SocialMedia;