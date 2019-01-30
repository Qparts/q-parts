import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import RenderField from '../RenderField/RenderField';
import { withRouter } from 'react-router-dom';
import Button from '../UI/Button';
import * as validations from '../../utils';
import SelectInput from '../SelectInput/SelectInput';
import Checkbox from '../UI/Checkbox';
import './CheckoutPayment.css';
import Table from '../UI/Table';
import { SmallScreen, MediumScreen } from '../Device/index.js'

class CheckoutPayment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderCreditCard: false,
      renderCash: false,
      renderbankTransfer: false,
      hasNewCard: false,
      creditCard: [
        {
          CardType: 'Master Card',
          cardName: 'Ahmed S Shaaban',
          cardNumber: '0000000000',
          cardExpirationMonth: '11',
          cardNacardExpirationYEar: '2018',
        },
        {
          CardType: 'Master Card',
          cardName: 'Ahmed S Shaaban',
          cardNumber: '0000000000',
          cardExpirationMonth: '11',
          cardNacardExpirationYEar: '2018',
        }
      ],
      bankTransferInfo: {
        bankName: 'Qetaa',
        accountName: 'Qetaa.com',
        accountNumber: '00000000',
        swiftCode: '#00000000'
      },
      defaultCreditCard: null,
      hasRadioButton: true,
      canProceed: false,
      active: '',
      check: false
    }
  }

  handleSelectCreditCard = e => {
    this.setState({ defaultCreditCard: e.value, canProceed: true })
    const creditCard = this.state.creditCard[e.value];
    this.props.addPaymentMethod({ type: 'Credit Card', creditCard });
  }

  handleProceed = (e) => {
    e.preventDefault();
    this.props.completePayment(true);
    this.props.history.push('/checkout/confirm')
  }

  handleCreditCardOpt = () => {
    const creditCardSelected = this.state.defaultCreditCard !== null ? true : false;
    this.setState({ renderCreditCard: true, canProceed: creditCardSelected })

    if (creditCardSelected) {
      const creditCard = this.state.creditCard[this.state.defaultCreditCard];
      this.props.addPaymentMethod({ type: 'Credit Card', creditCard });
    }
  }

  handleBankTransferOpt = () => {
    this.setState({ hasNewCard: false, renderCash: false, renderCreditCard: false, renderbankTransfer: true, canProceed: true })
    this.props.addPaymentMethod({ type: 'Bank Transfer' });
  }

  handleCashOpt = () => {
    this.setState({ hasNewCard: false, renderCash: true, renderCreditCard: false, canProceed: true })
    this.props.addPaymentMethod({ type: 'Cash on delivery' });
  }

  handleAddNewCard = () => {
    this.setState({ hasNewCard: true })
  }

  handleSubmit = values => {
    this.setState({ hasNewCard: false })
  }
  activeButton = (value) => {
    this.setState({
      active: value
    })
  }
  componentWillMount = () => {
    this.props.completePayment(false);
  }
  onCancle = () => {
    this.setState({ hasNewCard: false })
  }
  render() {
    const { translate } = this.props;
    const styles = {
      grey: {
        backgroundColor: '#f8f9fa'
      }
    }
    let payment;
    if(true){
      payment = <div className="payment-container">
       <div className="payment-box border rounded row">
        <div className="payment-box_item col-9">
          <Checkbox
            onChange={e => this.setState({
              check: !this.state.check
            })}
            checked={this.state.check}
            label={translate("setting.addressBook.defaultAddress")}
          />
         <div className="payment-box_item-label">
           <img className="main-img" alt="user" src="/img/visa.svg" />
           <p>SHAIMAA AHMED M SOUDY</p>
         </div>
         <div className="visa-num">
           <p className="end-number">{translate("checkout.payment.creditCard.endNo")} <span>4871</span></p>
           <p className="expires-date">{translate("checkout.payment.creditCard.expires")} <span>04/2023</span></p>
         </div>
         <div className="payment-footer">
          <Button type="button" className="btn btn-link" text={translate("checkout.payment.creditCard.edit")} icon="icon-edit" isReverseOrder/>
          <Button type="button" className="btn btn-delete" text={translate("setting.garage.delete")} icon="icon-trash" isReverseOrder/>
         </div>
        </div>
       </div>
      </div>
    }else{
      payment = <div id="payment-no-card">
        </div>
    }

    const creditCardHeaders = [
      "",
      translate("checkout.payment.creditCard.table.card"),
      translate("checkout.payment.creditCard.table.name"),
      translate("checkout.payment.creditCard.table.cardNo"),
      translate("checkout.payment.creditCard.table.expiration"),

    ]
    let creditClass = "btn btn-light";
    let banckClass = "btn btn-primary"
    let cashClass = "btn btn-secondary"
		if(this.state.active === "credit"){
			creditClass += " active";
		}
    if(this.state.active === "banck"){
      banckClass += " active";
    }
    if(this.state.active === "cash"){
      cashClass += " active";
    }
    let cardNumber= `* ${translate("checkout.payment.creditCard.newCard.cardNo")}`;
    let expirationDate= `* ${translate("checkout.payment.creditCard.newCard.expiration")}`;
    let securityCode= `* ${translate("checkout.payment.creditCard.newCard.securityCode")}`;
    let nameCard= `* ${translate("checkout.payment.creditCard.newCard.name")}`;
    return (
      <Fragment>
      <MediumScreen>
        <div className="border rounded card card-body row" id="checkout-payment">
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <div className="Checkout-shipping_address-footer">
              <h4>{translate("checkout.payment.title")}</h4>
            </div>
            <div className="checkout-payment-container">
              <div className="col-12">
                <div className="payment-methods row">
                  <div className="col-4 credit-card">
                    <Button type="button" className={creditClass} text={translate("checkout.payment.buttons.creditCard")} onClick={() => {
                        this.activeButton('credit');
                        this.handleCreditCardOpt();
                      }} icon="icon-credit-card" isReverseOrder/>
                  </div>
                  <div className="col-4">
                    <Button type="button" className={banckClass} text={translate("checkout.payment.buttons.bankTransfer")} onClick={() => {
                        this.activeButton('banck');
                        this.handleBankTransferOpt();
                      }} icon="icon-bank" isReverseOrder/>
                  </div>
                  <div className="col-4 cash">
                    <Button type="button" className={cashClass} text={translate("checkout.payment.buttons.cash")} onClick={() => {
                        this.activeButton('cash');
                        this.handleCashOpt();
                      }} icon="icon-cash" isReverseOrder/>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {(
                this.state.renderCreditCard &&
                <Fragment>
                  <div className="credit-container">
                    <div className="header-credit justify-content-between">
                      <div>
                        <i className="icon-secure"/>
                        <div>
                          <h1>{translate("checkout.payment.creditCard.table.card")}</h1>
                          <p>{translate("checkout.payment.creditCard.table.secure")}</p>
                        </div>
                      </div>
                      <Button type="button" className="btn btn-primary" text={translate("checkout.payment.buttons.newCard")} onClick={this.handleAddNewCard} icon="icon-add" isReverseOrder />
                    </div>

                    {(
                      this.state.hasNewCard && <Fragment>
                          <form>
                          <div className="col-12 card-number">
                            <Field
                              label={cardNumber}
                              name="CardNumber"
                              component={RenderField}
                              type="text"
                              placeholder={translate("checkout.payment.creditCard.newCard.enterCardNo")}
                              validate={[validations.required]} />
                          </div>
                          <div className="card-date col-12">
                            <div className="col-4 months">
                              <Field
                                label={expirationDate}
                                name="months"
                                component={SelectInput}
                                options={[{ label: '1', value: '2' }]}
                                placeholder="MM"
                                validate={[validations.required]} />
                            </div>
                            <div className="col-4 years">
                              <Field
                                name="years"
                                component={SelectInput}
                                options={[{ label: '1', value: '2' }]}
                                placeholder="YY"
                                validate={[validations.required]} />
                            </div>
                            <div className="col-4">
                              <Field
                                label={securityCode}
                                name="SecurityCode"
                                component={RenderField}
                                type="text"
                                placeholder="CVV"
                                validate={[validations.required]} />
                            </div>
                          </div>
                          <div className="col-12 card-name">
                            <Field
                              label={nameCard}
                              name="NameCard"
                              component={RenderField}
                              type="text"
                              placeholder={translate("checkout.payment.creditCard.newCard.enterCardName")}
                              validate={[validations.required]} />
                          </div>
                            <div className="footer col-12">
                                <Button className="btn btn-primary col-3" text={translate("checkout.payment.creditCard.newCard.add")} icon={"icon-arrow-right"} />
                                <Button className="btn btn-light col-2" type="reset" text={translate("checkout.payment.creditCard.newCard.cancel")} onClick={this.onCancle} />
                            </div>
                          </form>
                      </Fragment>) || ((
                      this.state.canProceed) && <Button type="button" className="btn btn-secondary" text={translate("checkout.payment.buttons.continue")} onClick={this.handleProceed} />
                      )
                    }
                    <span className="seperator"/>
                    {payment}
                  </div>
                </Fragment>) || ((
                  this.state.renderCash) && <Fragment>
                    <div id="cash-delivery">
                      <i className="icon-cash-payment" />
                      <p>{translate("checkout.payment.cash.title")}</p>
                    </div>
                  </Fragment>) || ((
                    this.state.renderbankTransfer) && <Fragment>
                      <div id="bank-transfer">
                        <h4>{translate("checkout.payment.bankTransfer.title")}</h4>
                        <p className="dis-payment">{translate("checkout.payment.bankTransfer.transferText")}</p>
                        <div>
                          <div className="d-table product-options">
                            <div className="d-table-row">
                              <div className="d-table-cell"><span>{translate("checkout.payment.bankTransfer.holderName")}</span></div>
                              <div className="d-table-cell">Qetaa.com</div>
                            </div>
                            <div className="d-table-row">
                              <div className="d-table-cell"><span>{translate("checkout.payment.bankTransfer.number")}</span></div>
                              <div className="d-table-cell">01000 000 00</div>
                            </div>
                            <div className="d-table-row">
                              <div className="d-table-cell"><span>{translate("checkout.payment.bankTransfer.code")}</span></div>
                              <div className="d-table-cell">#01000 000 00</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                )}
            </div>
            <div className="justify-content-between footer-payment">
              <p>{translate("checkout.payment.canReview")}</p>
              <Button type="button" className="btn btn-primary" text={translate("form.address.buttons.deliver")} icon="icon-arrow-right" onClick={this.handleProceed}/>
            </div>
          </form>
        </div>
      </MediumScreen>
      <SmallScreen>
        <div className="border rounded card card-body row" id="checkout-payment-mobile">
          <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
            <div className="Checkout-shipping_address-footer">
              <h4>{translate("checkout.payment.title")}</h4>
            </div>
            <div className="checkout-payment-container">
              <div className="col-12">
                <div className="payment-methods row">
                  <div className="col-4 credit-card">
                    <Button type="button" className={creditClass} text={translate("checkout.payment.buttons.creditCard")} onClick={() => {
                        this.activeButton('credit');
                        this.handleCreditCardOpt();
                      }} icon="icon-credit-card" isReverseOrder/>
                  </div>
                  <div className="col-4">
                    <Button type="button" className={banckClass} text={translate("checkout.payment.buttons.bankTransfer")} onClick={() => {
                        this.activeButton('banck');
                        this.handleBankTransferOpt();
                      }} icon="icon-bank" isReverseOrder/>
                  </div>
                  <div className="col-4 cash">
                    <Button type="button" className={cashClass} text={translate("checkout.payment.buttons.cash")} onClick={() => {
                        this.activeButton('cash');
                        this.handleCashOpt();
                      }} icon="icon-cash" isReverseOrder/>
                  </div>
                </div>
              </div>
            </div>
            <div>
              {(
                this.state.renderCreditCard &&
                <Fragment>
                  <div className="credit-container">
                    <div className="header-credit justify-content-between">
                      <div>
                        <i className="icon-secure"/>
                        <div>
                          <h1>{translate("checkout.payment.creditCard.table.card")}</h1>
                          <p>{translate("checkout.payment.creditCard.table.secure")}</p>
                        </div>
                      </div>
                      <Button type="button" className="btn btn-primary" text={translate("checkout.payment.buttons.newCard")} onClick={this.handleAddNewCard} icon="icon-add" isReverseOrder />
                    </div>

                    {(
                      this.state.hasNewCard && <Fragment>
                          <form>
                          <div className="col-12 card-number">
                            <Field
                              label={cardNumber}
                              name="CardNumber"
                              component={RenderField}
                              type="text"
                              placeholder={translate("checkout.payment.creditCard.newCard.enterCardNo")}
                              validate={[validations.required]} />
                          </div>
                          <div className="card-date col-12">
                            <div className="col-4 months">
                              <Field
                                label={expirationDate}
                                name="months"
                                component={SelectInput}
                                options={[{ label: '1', value: '2' }]}
                                placeholder="MM"
                                validate={[validations.required]} />
                            </div>
                            <div className="col-4 years">
                              <Field
                                name="years"
                                component={SelectInput}
                                options={[{ label: '1', value: '2' }]}
                                placeholder="YY"
                                validate={[validations.required]} />
                            </div>
                            <div className="col-4">
                              <Field
                                label={securityCode}
                                name="SecurityCode"
                                component={RenderField}
                                type="text"
                                placeholder="CVV"
                                validate={[validations.required]} />
                            </div>
                          </div>
                          <div className="col-12 card-name">
                            <Field
                              label={nameCard}
                              name="NameCard"
                              component={RenderField}
                              type="text"
                              placeholder={translate("checkout.payment.creditCard.newCard.enterCardName")}
                              validate={[validations.required]} />
                          </div>
                            <div className="footer col-12">
                                <Button className="btn btn-primary col-12" text={translate("checkout.payment.creditCard.newCard.add")} icon={"icon-arrow-right"} />
                                <Button className="btn btn-light col-12" type="reset" text={translate("checkout.payment.creditCard.newCard.cancel")} onClick={this.onCancle} />
                            </div>
                          </form>
                      </Fragment>) || ((
                      this.state.canProceed) && <Button type="button" className="btn btn-secondary" text={translate("checkout.payment.buttons.continue")} onClick={this.handleProceed} />
                      )
                    }
                    <span className="seperator"/>
                    {payment}
                  </div>
                </Fragment>) || ((
                  this.state.renderCash) && <Fragment>
                    <div id="cash-delivery">
                      <i className="icon-cash-payment" />
                      <p>{translate("checkout.payment.cash.title")}</p>
                    </div>
                  </Fragment>) || ((
                    this.state.renderbankTransfer) && <Fragment>
                      <div id="bank-transfer">
                        <h4>{translate("checkout.payment.bankTransfer.title")}</h4>
                        <p className="dis-payment">{translate("checkout.payment.bankTransfer.transferText")}</p>
                        <div>
                          <div className="d-table product-options">
                            <div className="d-table-row">
                              <div className="d-table-cell"><span>{translate("checkout.payment.bankTransfer.holderName")}</span></div>
                              <div className="d-table-cell">Qetaa.com</div>
                            </div>
                            <div className="d-table-row">
                              <div className="d-table-cell"><span>{translate("checkout.payment.bankTransfer.number")}</span></div>
                              <div className="d-table-cell">01000 000 00</div>
                            </div>
                            <div className="d-table-row">
                              <div className="d-table-cell"><span>{translate("checkout.payment.bankTransfer.code")}</span></div>
                              <div className="d-table-cell">#01000 000 00</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Fragment>
                )}
            </div>
            <div className="justify-content-between footer-payment">
              <p>{translate("checkout.payment.canReview")}</p>
              <Button type="button" className="btn btn-primary" text={translate("form.address.buttons.deliver")} icon="icon-arrow-right" onClick={this.handleProceed}/>
            </div>
          </form>
        </div>
      </SmallScreen>
      </Fragment>
    )
  }
}

CheckoutPayment = reduxForm({
  form: 'CheckoutPayment',
})(CheckoutPayment)

export default withRouter(CheckoutPayment);
