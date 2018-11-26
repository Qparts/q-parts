import React, { Component } from 'react';

const WithSideBar = WrappedComponent => {
    return class extends Component {
        constructor(props) {
            super(props)

            this.state = {
                sideBar: null,
                overLay: null
            }
        }

        static displayName = `WithSideBar(${WrappedComponent.displayName ||
            WrappedComponent.name})`;


        handleOpenNav = () => {
            const { sideBar, overLay } = this.state
            sideBar.style.display = "block";
            overLay.style.display = "block";

            this.setState({ sideBar, overLay });
        }

        handleCloseNav = () => {
            const { sideBar, overLay } = this.state
            sideBar.style.display = "none";
            overLay.style.display = "none";

            this.setState({ sideBar, overLay });
        }

        setSideBarRef = element => {
            this.setState({
                sideBar: element
            })
        }

        setOverLay = element => {
            this.setState({
                overLay: element
            })
        }

        render() {
            return <WrappedComponent
                setSideBarRef={this.setSideBarRef}
                setOverLay={this.setOverLay}
                onOpenNav={this.handleOpenNav}
                onCloseNav={this.handleCloseNav}
                {...this.props} />
        }
    }
}

export default WithSideBar;