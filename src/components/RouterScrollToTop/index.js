import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class RouterScrollToTop extends Component {
    componentDidMount = () => {
        window.onbeforeunload = () => {
            window.scrollTo(0, 0);
        }
    }

    componentDidUpdate() {
        window.scrollTo(0, 0);
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(RouterScrollToTop);