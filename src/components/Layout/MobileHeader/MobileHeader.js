import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import MobileHeaderDetails from './MobileHeaderDetails';

export class MobileHeader extends Component {
	constructor(props) {
		super(props)

		this.state = {
			sideBar: null
		}
	}

	componentDidMount = () => {
		this.setState({
			sideBar: this.mobileHeaderDetails.sideBar
		})
	}


	openNav = () => {
		const { sideBar } = this.state
		sideBar.style.display = "block";
		this.overLay.style.display = "block";

		this.setState({ sideBar });
	}

	closeNav = () => {
		const { sideBar } = this.state
		sideBar.style.display = "none";
		this.overLay.style.display = "none";

		this.setState({ sideBar });
	}

	render() {
		const { translate, localize } = this.props
		return (
			<Fragment>
				<MobileHeaderDetails
					onClose={this.closeNav}
					ref={ref => this.mobileHeaderDetails = ref}
					translate={translate} 
					localize={localize}/>
				<div className="w3-overlay w3-animate-opacity" onClick={this.closeNav} style={{ cursor: 'pointer' }} ref={ref => this.overLay = ref}></div>
				<div className="mobile-header w3-hide-large container-fluid">
					<button className="w3-button w3-white w3-xxlarge" onClick={this.openNav}>&#9776;</button>
					<Link className="brand nav-icon-pl" to="/">
						<img alt="qParts" src="img/qParts-logo.svg" />
					</Link>
					<div className="list-inline user-actions d-flex justify-content-end">
						<li className="search">
							<a href="">
								<i className="icon-search" />
							</a>
						</li>
						<span className="seperator" />
						<li>
							<Link to="/cart">
								<i className="icon-cart" />
							</Link>
						</li>
						<span className="seperator" />
						<li>
							<Link className="custom-order" to="/">
								<i className="icon-custom-order" />
							</Link>
						</li>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default MobileHeader
