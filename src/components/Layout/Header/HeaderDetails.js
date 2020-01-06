import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import DropdownItem from '../../UI/Nav/DropdownItem';
import { isEmpty, right } from '../../../utils';
import { withStyles, Menu, MenuItem, Button } from '@material-ui/core';
import { NavLg } from '../../Device';

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
						<Link to='/setting/garage'>
							<img
								alt='garage'
								src='/img/garage.svg'
							/>
							{translate('navBar.garage')}
						</Link>
					</li>
				</NavLg>
				<li>
					<Link
						to='/cart'
						className={cart.length > 0 ? 'not-empty' : ''}
					>
						<i className='icon-cart' />
						{cart.length > 0 && <span>{cart.length}</span>}
					</Link>
				</li>
			</ul>
		);
	}
}

const styles = {
	label: {
		textTransform: 'capitalize'
	},
	btn_social: {
		display: 'flex',
		margin: '0px 0px 10px 0px'
	},
	text: {
		margin: '0px 0px 24px 0px'
	},
	arrow_right: {
		color: 'black'
	}
};

export default withStyles(styles)(HeaderDetails);
