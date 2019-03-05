import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class RouterScrollToTop extends Component {
    componentDidMount = () => {
        window.onbeforeunload = () => {
            window.scrollTo(0, 0);
        }
    }

    componentDidUpdate(prevProps) {
        const { location: { search } } = this.props;
        if(this.props.location.pathname !== prevProps.location.pathname || search !== prevProps.location.search) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(RouterScrollToTop);