import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import MobileHeaderDetails from './MobileHeaderDetails';
import WithSideBar from '../../../hoc/WithSideBar';

export class MobileHeader extends Component {

	render() {
		const { translate, localize, changeDefaultDirection, onOpenNav, onCloseNav, setSideBarRef, setOverLay, vehicles, onSignin, onSearch, vehiclesFormat, selectedVehicle, direction } = this.props
		return (
			<Fragment>
				<MobileHeaderDetails
					setSideBarRef={setSideBarRef}
					setOverLay={setOverLay}
					onCloseNav={onCloseNav}
					translate={translate}
					vehicles={vehicles}
					localize={localize}
					onSignin={onSignin}
					vehiclesFormat={vehiclesFormat}
					selectedVehicle={selectedVehicle}
					changeDefaultDirection={changeDefaultDirection}
					direction={direction} />
				<div id="top" className="mobile-header w3-hide-large">
					<div className="d-flex justify-content-between container-fluid">
						<div>
							<button className="w3-button w3-white w3-xlarge q-burger-btn" onClick={onOpenNav}>&#9776;</button>
							<Link className="brand nav-icon-pl" to="/">
								<img alt="qParts" src="/img/qParts-logo-ar.svg" />
							</Link>
						</div>
						<div className="list-inline user-actions">
							<li className="search">
								<a onClick={onSearch}>
									<i className="icon-search" />
								</a>
							</li>
							<li>
								<span className="seperator" />
							</li>
							<li className="search">
								<Link to="/cart">
									<i className="icon-cart" />
								</Link>
							</li>
							<li>
								<span className="seperator" />
							</li>
							<li className="search">
								<Link to="/">
									<i className="icon-custom-order" />
								</Link>
							</li>
						</div>
					</div>
				</div>
			</Fragment>
		)
	}
}

export default WithSideBar(MobileHeader)
