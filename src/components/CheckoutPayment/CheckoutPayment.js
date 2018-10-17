import React, { Component, Fragment } from 'react';
import { reduxForm, Field } from 'redux-form';
import RenderField from '../RenderField/RenderField';
import { withRouter } from 'react-router-dom';
import Button from '../UI/Button';
import * as validations from '../../utils';

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
      canProceed: false
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


  render() {
    const { translate } = this.props;
    const styles = {
      grey: {
        backgroundColor: '#f8f9fa'
      }
    }
    const creditCardHeaders = [
      "",
      translate("checkout.payment.creditCard.table.card"),
      translate("checkout.payment.creditCard.table.name"),
      translate("checkout.payment.creditCard.table.cardNo"),
      translate("checkout.payment.creditCard.table.expiration"),

    ]
    return (
      <div className="border rounded card card-body">
        <form onSubmit={this.props.handleSubmit(this.handleSubmit)}>
          <div className="Checkout-shipping_address-footer">
            <h4>{translate("checkout.payment.title")}</h4>
          </div>
          <label>{translate("checkout.payment.method")} *</label>
          <Button type="button" className="btn btn-light" text={translate("checkout.payment.buttons.creditCard")} onClick={this.handleCreditCardOpt} />
          <Button type="button" className="btn btn-light" text={translate("checkout.payment.buttons.bankTransfer")} onClick={this.handleBankTransferOpt} />
          <Button type="button" className="btn btn-light" text={translate("checkout.payment.buttons.cash")} onClick={this.handleCashOpt} />
          <div>
            {(
              this.state.renderCreditCard &&
              <Fragment>
                <Table
                  headers={creditCardHeaders}
                  columns={this.state.creditCard}
                  onSelecteRadioButton={this.handleSelectCreditCard}
                  radioButton={this.state.defaultCreditCard}
                  radioName="defaultCreditCard"
                  hasRadioButton={this.state.hasRadioButton}
                />
                <Button type="button" className="btn btn-link" text={translate("checkout.payment.buttons.newCard")} onClick={this.handleAddNewCard} />
              </Fragment>) || ((
                this.state.renderCash) && <Fragment>
                  <br />
                  <p style={styles.grey}>{translate("checkout.payment.cash.title")}</p>
                </Fragment>) || ((
                  this.state.renderbankTransfer) && <Fragment>
                    <br />
                    <div style={styles.grey}>
                      <h4>{translate("checkout.payment.bankTransfer.title")}</h4>
                      <div>
                        <pre>{translate("checkout.payment.bankTransfer.name")}                            {this.state.bankTransferInfo.bankName}</pre>
                        <pre>{translate("checkout.payment.bankTransfer.holderName")}                {this.state.bankTransferInfo.accountName}</pre>
                        <pre>{translate("checkout.payment.bankTransfer.number")}                       {this.state.bankTransferInfo.accountNumber}</pre>
                        <pre>{translate("checkout.payment.bankTransfer.code")}                           {this.state.bankTransferInfo.swiftCode}</pre>
                      </div>
                    </div>
                  </Fragment>
              )}
          </div>
          {(
            this.state.hasNewCard && <Fragment>
              <hr />
              <div className="CheckoutPayment_new-card">
                <div>
                  <label>{translate("checkout.payment.creditCard.newCard.name")}</label>
                  <Field
                    name="cardName"
                    component={RenderField}
                    type="text"
                    validate={[validations.required]} />
                </div>
                <div>
                  <label>{translate("checkout.payment.creditCard.newCard.cardNo")}</label>
                  <Field
                    name="cardNumber"
                    component={RenderField}
                    type="text"
                    validate={[validations.required]} />
                </div>
                <div>
                  <label>{translate("checkout.payment.creditCard.newCard.expiration")}</label>
                  <div className="CheckoutPayment_new-card_expiration">
                    <Field
                      name="cardExpirationMonth"
                      component={RenderField}
                      type="text"
                      validate={[validations.required]} />
                    <Field
                      name="cardExpirationYear"
                      component={RenderField}
                      type="text"
                      validate={[validations.required]} />
                  </div>
                </div>
                <div className="CheckoutPayment_new-card_button">
                  <Button type="submit" className="btn btn-light" text={translate("checkout.payment.creditCard.newCard.add")} />
                </div>
              </div>
            </Fragment>) || ((
            this.state.canProceed) && <Button type="button" className="btn btn-secondary" text={translate("checkout.payment.buttons.continue")} onClick={this.handleProceed} />
            )
          }
        </form>
      </div>
    )
  }
}

CheckoutPayment = reduxForm({
  form: 'CheckoutPayment',
})(CheckoutPayment)

export default withRouter(CheckoutPayment);