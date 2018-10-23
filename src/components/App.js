import React, { Component } from 'react';
import Home from '../components/Home/Home';

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
