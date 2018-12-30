import React, { Component } from 'react';
import { SmallScreen } from '../Device';

export class ScrollToTop extends Component {
    render() {
        return (
            <SmallScreen>
                <a className="scroll-to-top" href="#top" onClick={this.handleClick}>
                    <p><i className="icon-to-up" /></p>
                </a>
            </SmallScreen>
        )
    }
}

export default ScrollToTop;

