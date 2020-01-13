import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import DropdownItem from '../../UI/Nav/DropdownItem';
import { isEmpty, right } from '../../../utils';
import { NavLg } from '../../Device';

import Radio from '../../UI/Radio';

class HeaderDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notification: '',
			newNote: ''
		};
	}

	componentDidMount() {
		this.setReadReplies();
	}

	componentDidUpdate(prevProps, prevState) {
		const { completed } = this.props.quotations;
		const prevCompleted = prevProps.quotations.completed;

		if (completed !== prevCompleted) {
			this.setReadReplies();
		}
	}
	handleClick = event => {
		this.setState({
			anchorEl: event.currentTarget
		});
	};

	handleClose = () => {
		this.setState({
			anchorEl: null
		});
	};

	setReadReplies = () => {
		let hasNoNewReply = this.props.quotations.completed.every(
			reply => reply.read
		);

		this.setState({
			notification: hasNoNewReply ? '' : 'notification',
			newNote: hasNoNewReply ? '' : 'new-note'
		});
	};

	getReplayCounter = () => {
		return this.props.quotations.completed.filter(reply => !reply.read)
			.length;
	};

	render() {
		const {
			translate,
			isLoggedIn,
			fullName,
			onSignin,
			direction,
			cart
		} = this.props;
		const { notification, newNote } = this.state;
		const dropdownHeader = (
			<Fragment>
				{isLoggedIn ? (
					<span>
						<b>{fullName}</b>
						<label className={newNote} />
					</span>
				) : (
					<Fragment>
						<span className='user-img position-relative d-inline-block'>
							<img alt='user' src='/img/user.svg' />
						</span>
						<b>{translate('general.signin')}</b>
						<span className='seperator' />
						{translate('general.join')}
					</Fragment>
				)}
			</Fragment>
		);

		const authOrNotAuthButtons = (
			<NavLg>
				<li className='user-account'>
					<DropdownItem header={dropdownHeader}>
						{!isLoggedIn && (
							<Fragment>
								<h6>{translate('dialog.signin.title')}</h6>
								<ul className='signin-list'>
									<li>
										<Link
											className='btn'
											to='#'
											onClick={onSignin}
										>
											{translate('general.signin')}{' '}
											<i
												className="icon-arrow-right"/>
										</Link>
									</li>
									{/* <li><a href="#"><i className="icon-facebook" /></a></li>
                <li><a href="#"><img src="/img/google-icon.svg"></img></a></li> */}
								</ul>
								<p>
									{translate('dropdown.signup.message')}
									<Link to='/signup'>
										{translate('dropdown.signup.link')}
										<i
											className="icon-arrow-right"
										/>
									</Link>
								</p>
								{/*<ul className="account-actions">
                  <li>
                   <Link to="/" onClick={onSignin}><i className="icon-shopping-bag"></i>{translate("navBar.menu.menuItem.order")}</Link>
                  </li>
                  <li><Link to="/setting/quotations"><i className="icon-send"></i>{translate("navBar.menu.menuItem.quotations")}</Link></li>
                  <li><Link to="/" onClick={onSignin}><img alt="garage" src="/img/garage.svg" />{translate("navBar.garage")}</Link></li>
                </ul>*/}
							</Fragment>
						)}
						{isLoggedIn && (
							<ul className='profile-actions list-unstyled'>
								<li>
									<Link
										to='/setting/quotations'
										className={notification}
									>
										{this.getReplayCounter() > 0 && (
											<span>
												{this.getReplayCounter()}
											</span>
										)}
										<i className='icon-send' />
										{translate(
											'navBar.menu.menuItem.quotations'
										)}
									</Link>
								</li>
								{/* <li>
                  <Link to="/setting/orders"><i className="icon-product"></i>{translate("navBar.menu.menuItem.order")}</Link>
                </li> */}
								<li>
									<Link to='/setting/addresses'>
										<i className='icon-address' />
										{translate(
											'navBar.menu.menuItem.address'
										)}
									</Link>
								</li>
								{/* <li>
                  <Link to="/setting/profile"><img alt="garage" src="/img/user.svg" />{translate("navBar.menu.menuItem.setting")}</Link>
                </li> */}
								<li>
									<Link to='/logout'>
										<i className='icon-sign-out' />
										{translate(
											'navBar.menu.menuItem.logout'
										)}
									</Link>
								</li>
							</ul>
						)}
					</DropdownItem>
				</li>
			</NavLg>
		);
		return (
			<ul>
				{authOrNotAuthButtons}
				<li className='search-sm'>
					<a className='cd-search-trigger' href='#cd-search'>
						<span />
					</a>
				</li>
				<li>
					<span className='seperator' />
				</li>
				<NavLg>
					<li>
						<div className="dropdown">
							<Link to='/setting/garage' className="dropdown-toggle" role="button" id="garage-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<img
									alt='garage'
									src='/img/garage.svg'
								/>
							<span className="notify-num">3</span>
								{translate('navBar.garage')}
							</Link>
							{/*user not loged in and have vehicle in garage
							<div class="dropdown-menu garage-dropdown" aria-labelledby="garage-dropdown">
								<div className="cached">
									<div class="media">
										<i className="icon-vehicle-history"></i>
										<div class="media-body">
											<h5>{translate('dropdown.garage.cached')}</h5>
										</div>
									</div>
									<div className="vehic-list">
										<div  className="radio-custom" key="1">
											<a href="#" className="row">
												<div className="col-auto">
													<Radio
														checked="true"
														type="radio"
														id="1"
														name="radioGroup"
													/>
												</div>
												<p className="col">
												2016 Ford Focus
												<span>VIN(000 000 000 000 11)</span>
											</p>
												<div className="col-auto vec-actions">
												<a href="#" className="btn btn-gray"><i className="icon-catalog"></i>{translate('dropdown.garage.catalog')}</a>
												<a href="#" className="link">{translate('dropdown.garage.save')}</a>
											</div>
											</a>
										</div>
										<div  className="radio-custom" key="2">
											<a href="#" className="row">
												<div className="col-auto">
													<Radio
														checked="true"
														type="radio"
														id="2"
														name="radioGroup"
													/>
												</div>
												<p className="col">
												2016 Ford Focus
											</p>
												<div className="col-auto vec-actions">
												<a href="#" className="btn btn-gray"><i className="icon-catalog"></i>{translate('dropdown.garage.catalog')}</a>
												<a href="#" className="link">{translate('dropdown.garage.save')}</a>
											</div>
											</a>
										</div>
									</div>
								</div>
								<div className="vec-list-actions">
									<div className="main-action">
										<a className="btn btn-gray">
											<i className="icon-add-vehicle"></i>
											{translate('dropdown.garage.addVehicle')}
										</a>
									</div>
									<a href="#" className="link">
										<i className="icon-clear"></i>
										{translate('dropdown.garage.clear')}
									</a>
								</div>
							</div>
							{/*END-- user not loged in and have vehicle in garage*/}

							{/*user loged in and have vehicle in garage and history*/}
							<div class="dropdown-menu garage-dropdown" aria-labelledby="garage-dropdown">
								<div className="saved">
									<div class="media">
										<i className="icon-vehicle"></i>
										<div class="media-body">
											<h5>{translate('dropdown.garage.userGarage')}</h5>
										</div>
										<a href="#">
											<i className="icon-add"></i>
											{translate('dropdown.garage.addVehicle')}
										</a>
									</div>
									<div className="vehic-list">
										<div className="radio-custom" key="3">
											<a href="#" className="row">
												<div className="col-auto">
													<Radio
														checked="true"
														type="radio"
														id="3"
														name="radioGroup"
													/>
												</div>
												<p className="col">
												2016 Ford Focus
												<span>VIN(000 000 000 000 11)</span>
											</p>
												<div className="col-auto vec-actions">
													<a href="#" className="btn btn-gray"><i className="icon-catalog"></i>{translate('dropdown.garage.catalog')}</a>
													<a href="#" className="link"><i className="icon-trash"></i></a>
											</div>
											</a>
										</div>
									</div>
								</div>
								<div className="cached">
									<div class="media">
										<i className="icon-vehicle-history"></i>
										<div class="media-body">
											<h5>{translate('dropdown.garage.cached')}</h5>
										</div>
										<a href="#">
											<i className="icon-clear"></i>
											{translate('dropdown.garage.clear')}
										</a>
									</div>
									<div className="vehic-list">
										<div className="radio-custom" key="1">
											<a href="#" className="row">
												<div className="col-auto">
													<Radio
														checked=""
														type="radio"
														id="1"
														name="radioGroup"
													/>
												</div>
												<p className="col">
												2016 Ford Focus
												<span>VIN(000 000 000 000 11)</span>
											</p>
												<div className="col-auto vec-actions">
												<a href="#" className="btn btn-gray"><i className="icon-catalog"></i>{translate('dropdown.garage.catalog')}</a>
												<a href="#" className="link">{translate('dropdown.garage.save')}</a>
											</div>
											</a>
										</div>
										<div className="radio-custom" key="2">
											<a href="#" className="row">
												<div className="col-auto">
													<Radio
														checked=""
														type="radio"
														id="2"
														name="radioGroup"
													/>
												</div>
												<p className="col">
												2016 Ford Focus
											</p>
												<div className="col-auto vec-actions">
												<a href="#" className="btn btn-gray"><i className="icon-catalog"></i>{translate('dropdown.garage.catalog')}</a>
												<a href="#" className="link">{translate('dropdown.garage.save')}</a>
											</div>
											</a>
										</div>
									</div>
								</div>
							</div>
							{/*END-- user loged inand have vehicle in garage and history*/}
							<div class="dropdown-menu garage-dropdown d-none" aria-labelledby="garage-dropdown">
								<div className="empty-vehic">
									<a className="btn btn-primary" href="#" ><i className="icon-add"> </i> {translate('dropdown.garage.addVehicle')}</a>
									<p>{translate("dialog.vehicle.subTitle")}</p>
								</div>
							</div>
						</div>
					</li>
				</NavLg>
				<li>
					<Link
						to='/cart'
					>
						<i className='icon-cart' />
						{cart.length > 0 && <span className="notify-num">{cart.length}</span>}
					</Link>
				</li>
			</ul>
		);
	}
}
export default (HeaderDetails);
