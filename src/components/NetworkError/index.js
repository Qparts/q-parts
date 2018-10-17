import React, { Component } from 'react';
import _ from 'lodash';
import Logout from '../../containers/Logout/Logout';

class NetworkError extends Component {
 render() {
  if (!_.isEmpty(this.props.error)) {
   return <Logout />
  }
  return null;
 }
}

export default NetworkError;