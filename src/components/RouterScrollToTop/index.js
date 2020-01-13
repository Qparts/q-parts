import React from 'react';
import { withRouter } from 'react-router-dom';

const { Component} = React;

class RouterScrollToTop extends Component {
    constructor(props) {
        super(props)

        this.state = {
            header: ''
        }
    }

    componentDidMount = () => {
        const header = document.getElementById('header-fixed');
        if (header) {
            this.setState({ header });
        }
        window.onbeforeunload = () => {
            window.scrollTo(0, 0);
            this.state.header.classList.remove('slideUp');
        }
    }

    componentDidUpdate(prevProps) {
        const { location: { search } } = this.props;
        if (this.props.location.pathname !== prevProps.location.pathname || search !== prevProps.location.search) {
            window.scrollTo(0, 0);
            this.state.header.classList.remove('slideUp');
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(RouterScrollToTop);