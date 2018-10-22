import React, { Component } from 'react';
import Home from './Home';

import './App.css';

class App extends Component {

  getRecentlyViewedProducts = () => {
    this.props.getRecentlyViewedProducts(this.props.recentViewedProducts)
  }

  render() {
    return (
      <Home />
    );
  }
}

export default App;
