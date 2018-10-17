import React, { Component, Fragment } from 'react'; // eslint-disable-line no-unused-vars
import { OAuth } from 'oauthio-web';

class Twitter extends Component {

  storeToken = ({ oauth_token, oauth_token_secret }) => {
    localStorage.setItem('oauth_token', oauth_token);
    localStorage.setItem('oauth_token_secret', oauth_token_secret);
  }

  handleClick = (e) => {
    e.preventDefault();

    OAuth.initialize('kIzK6pFlv6Jv2EQeB2nWyxVDSP8');

    var provider = 'twitter';
    var self = this;

    OAuth.popup(provider)
      .done(function (result) {
        result.me()
          .done(function (response) {
            self.props.onSuccess(response);

          })
          .fail(function (err) {
            //handle error with err
            console.log(err);
            self.props.onFailure(err);

          });
      })
      .fail(function (err) {
        //handle error with err
        console.log(err);
        self.props.onFailure(err);
      });
  };

  render() {
    return (
      <Fragment>
        <button className={this.props.className} onClick={this.handleClick} disabled={this.props.disabled}>{this.props.buttonText}</button>
      </Fragment>
    );
  }
}

export default Twitter;