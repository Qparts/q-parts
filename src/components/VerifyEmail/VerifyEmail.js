import React, { Component } from 'react';
import { connect } from 'react-redux';
import { onChangeEmailVerify } from '../../actions/customerAction';
import queryString from 'qs';

import './VerifyEmail.css';

class VerifyEmail extends Component {


 componentWillMount() {
  const query = queryString.parse(this.props.location.search.slice(1));
  this.props.onChangeEmailVerify(query);
 }

 render() {
  return (
   <div className="VerifyEmail-container">
    <p>Your email has been successfully changed</p>
   </div>
  )
 }
}

const mapDispatchToProps = dispatch => {
 return {
  onChangeEmailVerify: (query) => dispatch(onChangeEmailVerify(query))
 }
}

export default connect(null, mapDispatchToProps)(VerifyEmail);