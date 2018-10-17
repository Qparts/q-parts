import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { onLogout } from '../../actions/customerAction';
import { clearCart } from '../../actions/cartAction';

class Logout extends Component {
 componentDidMount() {
  this.props.onLogout();
  this.props.clearCart();
 }
 render() {
  return <Redirect to="/" />
 }
}

const mapDispatchToProps = dispatch => {
 return {
  onLogout: () => dispatch(onLogout()),
  clearCart: () => dispatch(clearCart()),
 }
}

export default connect(null, mapDispatchToProps)(Logout);