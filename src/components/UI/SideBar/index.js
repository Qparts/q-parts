import React, { Component, Fragment } from 'react'

export class index extends Component {

    render() {
        return (
            <Fragment>
                <div className="w3-sidebar w3-bar-block w3-animate-left" style={{ display: 'none', zIndex: '5' }} ref={this.props.setSideBarRef}>
                    {this.props.children}
                </div>
                <div className="w3-overlay w3-animate-opacity" onClick={this.props.onCloseNav} style={{ cursor: 'pointer' }} ref={this.props.setOverLay} />
            </Fragment>
        )
    }
}

export default index
