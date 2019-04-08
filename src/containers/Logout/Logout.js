import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { onLogout } from '../../actions/customerAction';
import { clearCart } from '../../actions/cartAction';
import { clearNetworkError } from '../../actions/networkError';

class Logout extends Component {
 componentDidMount() {
  this.props.onLogout();
  this.props.clearCart();
  this.props.clearNetworkError();
 }
 render() {
  return <Redirect to="/" />
 }
}

const mapDispatchToProps = dispatch => {
 return {
  onLogout: () => dispatch(onLogout()),
  clearCart: () => dispatch(clearCart()),
  clearNetworkError: () => dispatch(clearNetworkError())
 }
}

export default connect(null, mapDispatchToProps)(Logout);