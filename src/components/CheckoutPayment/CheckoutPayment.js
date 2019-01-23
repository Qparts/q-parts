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
      active: ''
    }
  }

  handleSelectCreditCard = e => {
    this.setState({ defaultCreditCard: e.value, canProceed: true })
    const creditCard = this.state.creditCard[e.value];
    this.props.addPaymentMethod({ type: 'Credit Card', creditCard });
  }

  handleProceed = () => {
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
        <div className="payment-box_item col-6">
          <Checkbox
            onChange={e => this.setState({
              check: !this.state.check
            })}
            checked={this.state.check}
            label="Default Payment"
          />
         <div className="payment-box_item-label">
           <img className="main-img" alt="user" src="/img/visa.svg" />
           <p>SHAIMAA AHMED M SOUDY</p>
         </div>
         <div className="visa-num">
           <p className="end-number">Number Ending <span>4871</span></p>
           <p className="expires-date">Expires<span>04/2023</span></p>
         </div>
         <div className="payment-footer">
          <Button type="button" className="btn btn-link" text="Edit" icon="icon-edit" isReverseOrder/>
         </div>
        </div>
        <div className="col-1">
          <span className="seperator"></span>
        </div>
        <div className="payment-box_item col-5">
          <Checkbox
            onChange={e => this.setState({
              check: !this.state.check
            })}
            checked={this.state.check}
            label="Default Payemnt"
          />
          <div className="payment-box_item-label">
            <img className="main-img" alt="user" src="/img/visa.svg" />
            <p>SHAIMAA AHMED M SOUDY</p>
          </div>
          <div className="visa-num">
            <p className="end-number">Number Ending <span>4871</span></p>
            <p className="expires-date">Expires<span>04/2023</span></p>
          </div>
         <div className="payment-footer">
          <Button type="button" className="btn btn-link" text="Edit" icon="icon-edit" isReverseOrder/>
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
    return (
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
                        <h1>Your credit cards</h1>
                        <p>Secure Credit Card Payment</p>
                      </div>
                    </div>
                    <Button type="button" className="btn btn-primary" text={translate("checkout.payment.buttons.newCard")} onClick={this.handleAddNewCard} icon="icon-add" isReverseOrder />
                  </div>

                  {(
                    this.state.hasNewCard && <Fragment>
                        <form>
                        <div className="col-12 card-number">
                          <Field
                            label="* Card number"
                            name="CardNumber"
                            component={RenderField}
                            type="text"
                            placeholder="Enter Card number"
                            validate={[validations.required]} />
                        </div>
                        <div className="card-date col-12">
                          <div className="col-4 months">
                            <Field
                              label="* Expiration date"
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
                              label="* Security Code"
                              name="SecurityCode"
                              component={RenderField}
                              type="text"
                              placeholder="CVV"
                              validate={[validations.required]} />
                          </div>
                        </div>
                        <div className="col-12 card-name">
                          <Field
                            label="* Name Of Card"
                            name="NameCard"
                            component={RenderField}
                            type="text"
                            placeholder="Enter Name OF Card"
                            validate={[validations.required]} />
                        </div>
                          <div className="footer col-12">
                              <Button className="btn-primary col-3" text="Add Card" icon={"icon-arrow-right"} />
                              <Button className="btn btn-light col-2" type="reset" text="Cancel" onClick={this.onCancle} />
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
                      <p className="dis-payment">Make your payment directly into your bank account. Please use your Order ID as the payment reference. Your order won&apos;t be shipped until the funds have cleared in your account</p>
                      <div>
                        <table>
                          <tbody>
                          <tr>
                            <td>{translate("checkout.payment.bankTransfer.name")}</td>
                            <td>{this.state.bankTransferInfo.bankName}</td>
                          </tr>
                          <tr>
                            <td>{translate("checkout.payment.bankTransfer.holderName")}</td>
                            <td>{this.state.bankTransferInfo.accountName}</td>
                          </tr>
                          <tr>
                            <td>{translate("checkout.payment.bankTransfer.number")} </td>
                            <td>{this.state.bankTransferInfo.accountNumber}</td>
                          </tr>
                          <tr>
                            <td>{translate("checkout.payment.bankTransfer.code")}</td>
                            <td>{this.state.bankTransferInfo.swiftCode}</td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Fragment>
              )}
          </div>
          <div className="justify-content-between footer-payment">
            <p>You can review this order before it's final.</p>
            <Button type="button" className="btn btn-primary" text={translate("form.address.buttons.deliver")} icon="icon-arrow-right"/>
          </div>
        </form>
      </div>
    )
  }
}

CheckoutPayment = reduxForm({
  form: 'CheckoutPayment',
})(CheckoutPayment)

export default withRouter(CheckoutPayment);
