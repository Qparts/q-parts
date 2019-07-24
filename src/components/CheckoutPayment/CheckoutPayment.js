import React, { Component, Fragment, createRef } from 'react';
import { reduxForm, Field } from 'redux-form';
import RenderField from '../RenderField/RenderField';
import { withRouter } from 'react-router-dom';
import Button from '../UI/Button';
import * as validations from '../../utils';
import { right } from '../../utils';
import SelectInput from '../SelectInput/SelectInput';
import Checkbox from '../UI/Checkbox';
import './CheckoutPayment.css';
import Table from '../UI/Table';
import { SmallScreen, MediumScreen } from '../Device/index.js';
import {
	years,
	months,
	BANK_TRANSFER,
	CREDIT_CARD,
	RADIX
} from '../../constants';
import { getBanks } from '../../utils/api';

class CheckoutPayment extends Component {
	static defaultProps = {
		paymentTitle: 'Checkout-shipping_address-footer'
	};

	constructor(props) {
		super(props);

		this.state = {
			renderCreditCard: true,
			renderCash: false,
			renderBankTransfer: false,
			hasNewCard: true,
			defaultCreditCard: null,
			hasRadioButton: true,
			canProceed: false,
			active: 'credit',
			check: false,
			banks: []
		};
		getBanks().then(res => {
			this.setState({
				banks: res.data
			});
		});
		this.submitForm = createRef();
		this.props.addPaymentMethod({ type: CREDIT_CARD, creditCard: null });
	}

	// handleSelectCreditCard = e => {
	//   this.setState({ defaultCreditCard: e.value, canProceed: true })
	//   const creditCard = this.state.creditCard[e.value];
	//   this.props.addPaymentMethod({ type: 'Credit Card', creditCard });
	// }

	handleProceed = values => {
		if (Object.keys(this.props.checkout.paymentMethod).length > 0) {
			if (values.ccMonth) {
				const ccMonth = values.ccMonth.value;
				const ccYear = values.ccYear.value;
				const sendValues = { ...values, ccMonth, ccYear };

				this.props.addPaymentMethod({
					type: CREDIT_CARD,
					creditCard: sendValues
				});
				this.props.completePayment(true);
				this.props.history.push('/checkout/confirm');
			} else {
				this.props.completePayment(true);
				this.props.history.push('/checkout/confirm');
			}
		}
	};

	handleSubmit = e => {
		this.submitForm.current.click();
	};

	tabHandler = (paymentType, e) => {
		e.preventDefault();

		switch (paymentType) {
			case BANK_TRANSFER:
				this.activeButton('bank');
				this.handleBankTransferOpt();
				this.props.onChangePaymentMethod('W');
				break;

			case CREDIT_CARD:
				this.activeButton('credit');
				this.handleCreditCardOpt();
				this.props.onChangePaymentMethod('V');
				break;

			default:
				break;
		}
	};

	handleCreditCardOpt = () => {
		const creditCardSelected =
			this.state.defaultCreditCard !== null ? true : false;
		this.props.addPaymentMethod({ type: CREDIT_CARD, creditCard: null });
		this.setState({
			renderCreditCard: true,
			canProceed: creditCardSelected
		});

		// if (creditCardSelected) {
		//   const creditCard = this.state.creditCard[this.state.defaultCreditCard];
		//   this.props.addPaymentMethod({ type: 'Credit Card', creditCard });
		// }
	};

	handleBankTransferOpt = () => {
		this.setState({
			hasNewCard: false,
			renderCash: false,
			renderCreditCard: false,
			renderBankTransfer: true,
			canProceed: true
		});
		this.props.addPaymentMethod({ type: BANK_TRANSFER });
	};

	handleAddNewCard = () => {
		this.setState({ hasNewCard: true });
	};

	handlePaymentClick = values => {
		this.setState({ hasNewCard: false });
	};
	activeButton = value => {
		this.setState({
			active: value
		});
	};
	componentWillMount = () => {
		this.props.completePayment(false);
	};
	onCancel = () => {
		this.setState({ hasNewCard: false });
	};
	renderCCForm = () => {
		const { translate } = this.props;
		const cardNumber = `* ${translate(
			'checkout.payment.creditCard.newCard.cardNo'
		)}`;
		const expirationDate = `* ${translate(
			'checkout.payment.creditCard.newCard.expiration'
		)}`;
		const securityCode = `* ${translate(
			'checkout.payment.creditCard.newCard.securityCode'
		)}`;
		const nameCard = `* ${translate(
			'checkout.payment.creditCard.newCard.name'
		)}`;

		return (
			<form onSubmit={this.props.handleSubmit(this.handleProceed)}>
				<div className='col-12 card-number'>
					<Field
						label={cardNumber}
						name='ccNumber'
						maxLength='16'
						component={RenderField}
						type='text'
						placeholder={translate(
							'checkout.payment.creditCard.newCard.enterCardNo'
						)}
						errorMessage={translate(
							'validation.paymentViaCard.ccNumber'
						)}
						validate={[validations.required, validations.ccNumber]}
					/>
				</div>
				<MediumScreen>
					<div className='card-date col-12'>
						<div className='col-4 months'>
							<Field
								label={expirationDate}
								name='ccMonth'
								component={SelectInput}
								options={months}
								placeholder='MM'
								validate={[validations.required]}
							/>
						</div>
						<div className='col-4 years'>
							<Field
								name='ccYear'
								component={SelectInput}
								options={years}
								placeholder='YYYY'
								errorMessage={translate(
									'validation.paymentViaCard.ccYear'
								)}
								validate={[
									validations.required,
									validations.ccDate
								]}
							/>
						</div>
						<div className='col-4'>
							<Field
								label={securityCode}
								name='ccCvc'
								component={RenderField}
								type='text'
								maxLength='4'
								placeholder='CVV'
								errorMessage={translate(
									'validation.paymentViaCard.ccCvv'
								)}
								validate={[
									validations.required,
									validations.ccCvv
								]}
							/>
						</div>
					</div>
				</MediumScreen>
				<SmallScreen>
					<div className='card-date-mobile col-12'>
						<div className='col-12 months'>
							<Field
								label={expirationDate}
								name='ccMonth'
								component={SelectInput}
								options={months}
								placeholder='MM'
								validate={[validations.required]}
							/>
						</div>
						<div className='col-12 years'>
							<Field
								name='ccYear'
								component={SelectInput}
								options={years}
								placeholder='YYYY'
								errorMessage={translate(
									'validation.paymentViaCard.ccYear'
								)}
								validate={[
									validations.required,
									validations.ccDate
								]}
							/>
						</div>
						<div className='col-12'>
							<Field
								label={securityCode}
								name='ccCvc'
								component={RenderField}
								type='text'
								placeholder='CVV'
								errorMessage={translate(
									'validation.paymentViaCard.ccCvv'
								)}
								validate={[
									validations.required,
									validations.ccCvv
								]}
							/>
						</div>
					</div>
				</SmallScreen>
				<div className='col-12 card-name'>
					<Field
						label={nameCard}
						name='ccName'
						component={RenderField}
						type='text'
						placeholder={translate(
							'checkout.payment.creditCard.newCard.enterCardName'
						)}
						validate={[validations.required]}
					/>
				</div>
				{/* <div className="footer col-12">
            <Button className="btn btn-primary col-3" text={translate("checkout.payment.creditCard.newCard.add")} icon={{`icon-arrow-${right(direction)}`}} />
            <Button className="btn btn-light col-2" type="reset" text={translate("checkout.payment.creditCard.newCard.cancel")} onClick={this.onCancel} />
        </div> */}
				<input
					type='submit'
					ref={this.submitForm}
					style={{ display: 'none' }}
				/>
			</form>
		);
	};
	render() {
		const { translate, direction, hidePaymentButton } = this.props;

		let canSubmit =
			Object.keys(this.props.checkout.paymentMethod).length > 0;
		const styles = {
			grey: {
				backgroundColor: '#f8f9fa'
			},
			disable: {
				opacity: '0.6',
				cursor: 'default'
			}
		};

		let creditClass = 'btn btn-light text-center';
		let bankClass = 'btn btn-primary text-center';
		if (this.state.active === 'credit') {
			creditClass += ' active';
		}
		if (this.state.active === 'bank') {
			bankClass += ' active';
		}
		return (
			<Fragment>
				<div
					className='border rounded card card-body row'
					id='checkout-payment'
				>
					<div
						className='payment_option'
						onClick={this.handlePaymentClick}
					>
						<div className={this.props.paymentTitle}>
							<h3>{translate('checkout.payment.title')}</h3>
						</div>
						<div className='checkout-payment-container'>
							<div className='col-12'>
								<div className='payment-methods row'>
									<div className='col-6 credit-card'>
										<Button
											type='button'
											className={creditClass}
											text={translate(
												'checkout.payment.buttons.creditCard'
											)}
											onClick={this.tabHandler.bind(
												this,
												CREDIT_CARD
											)}
											icon='icon-credit-card'
											isReverseOrder
										/>
									</div>
									<div className='col-6 bank-transfer'>
										<Button
											type='button'
											className={bankClass}
											text={translate(
												'checkout.payment.buttons.bankTransfer'
											)}
											onClick={this.tabHandler.bind(
												this,
												BANK_TRANSFER
											)}
											icon='icon-bank'
											isReverseOrder
										/>
									</div>
								</div>
							</div>
						</div>
						<div>
							{(this.state.renderCreditCard && (
								<Fragment>
									<div className='credit-container'>
										<div className='header-credit justify-content-between'>
											<div>
												<i className='icon-secure' />
												<div>
													<h1>
														{translate(
															'checkout.payment.creditCard.table.card'
														)}
													</h1>
													<p>
														{translate(
															'checkout.payment.creditCard.table.secure'
														)}
													</p>
												</div>
											</div>
											{/* <Button type="button" className="btn btn-primary" text={translate("checkout.payment.buttons.newCard")} onClick={this.handleAddNewCard} icon="icon-add" isReverseOrder /> */}
										</div>

										{(
											// this.state.hasNewCard &&
											<Fragment>
												{this.renderCCForm()}
											</Fragment>
										) ||
											(this.state.canProceed && (
												<Button
													type='button'
													className='btn btn-secondary'
													text={translate(
														'checkout.payment.buttons.continue'
													)}
													onClick={this.handleProceed}
												/>
											))}
										{/* <span className="seperator"/> */}
										{/* {payment} */}
									</div>
								</Fragment>
							)) ||
								(this.state.renderCash && (
									<Fragment>
										<div id='cash-delivery'>
											<i className='icon-cash-payment' />
											<p>
												{translate(
													'checkout.payment.cash.title'
												)}
											</p>
										</div>
									</Fragment>
								)) ||
								(this.state.renderBankTransfer && (
									<Fragment>
										<div id='bank-transfer'>
											<h3>
												{translate(
													'checkout.payment.bankTransfer.title'
												)}
											</h3>
											<p className='dis-payment'>
												{translate(
													'checkout.payment.bankTransfer.transferText'
												)}
											</p>
											{this.state.banks.map(
												(item, idx) => {
													return (
														<Fragment key={idx}>
															<div>
																<div className='d-table product-options'>
																	<div className='d-table-row'>
																		<div className='d-table-cell'>
																			<span>
																				{translate(
																					'checkout.payment.bankTransfer.name'
																				)}
																			</span>
																		</div>
																		<div className='d-table-cell'>
																			{
																				item.name
																			}
																			(
																			{
																				item.nameAr
																			}
																			)
																		</div>
																	</div>
																	<div className='d-table-row'>
																		<div className='d-table-cell'>
																			<span>
																				{translate(
																					'checkout.payment.bankTransfer.number'
																				)}
																			</span>
																		</div>
																		<div className='d-table-cell'>
																			{
																				item.account
																			}
																		</div>
																	</div>
																	<div className='d-table-row'>
																		<div className='d-table-cell'>
																			<span>
																				{translate(
																					'checkout.payment.bankTransfer.iban'
																				)}
																			</span>
																		</div>
																		<div className='d-table-cell'>
																			{
																				item.iban
																			}
																		</div>
																	</div>
																	<div className='d-table-row'>
																		<div className='d-table-cell'>
																			<span>
																				{translate(
																					'checkout.payment.bankTransfer.holderName'
																				)}
																			</span>
																		</div>
																		<div className='d-table-cell'>
																			{
																				item.owner
																			}
																		</div>
																	</div>
																</div>
															</div>
														</Fragment>
													);
												}
											)}
										</div>
									</Fragment>
								))}
						</div>
						{!hidePaymentButton && (
							<div className='justify-content-between footer-payment'>
								<p>{translate('checkout.payment.canReview')}</p>
								{this.state.renderCreditCard ? (
									<Button
										type='button'
										className='btn btn-primary'
										text={translate(
											'orderSummary.placeOrder'
										)}
										icon={`icon-arrow-${right(direction)}`}
										onClick={this.handleSubmit}
									/>
								) : (
									<Button
										type='button'
										style={canSubmit ? {} : styles.disable}
										className='btn btn-primary'
										text={translate(
											'orderSummary.placeOrder'
										)}
										icon={`icon-arrow-${right(direction)}`}
										onClick={this.handleProceed}
									/>
								)}
							</div>
						)}
					</div>
				</div>
			</Fragment>
		);
	}
}

CheckoutPayment = reduxForm({
	form: 'CheckoutPayment'
})(CheckoutPayment);

export default withRouter(CheckoutPayment);
