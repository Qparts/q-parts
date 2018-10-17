import React, { Component } from 'react';

class ErrorBoundary extends Component {
 constructor(props) {
  super(props);
  this.state = {
   hasError: false,
   info: '',
   error: ''
  }
 }

 componentDidCatch(error, info) {
  this.setState({ hasError: true, info, error })
 }

 render() {
  if (this.state.hasError) {
   return (
    <div>
     <h1>Something Went Wrong</h1>
    </div>
   )
  }
  return this.props.children;
 }
}

export default ErrorBoundary;