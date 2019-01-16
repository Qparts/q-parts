import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux'

import SelectInput from '../SelectInput/SelectInput';
import RenderField from '../RenderField/RenderField';
import RenderFileInput from '../RenderFileInput/RenderFileInput';
import Button from '../UI/Button';
import Checkbox from '../UI/Checkbox';

import * as validations from '../../utils';

class PaymentPopup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      check: false
    }
  }

  onCancle = () =>{
    this.props.toggle();
  }
  handleSubmit = () =>{

  }

  render() {
    const { translate } = this.props;
    const options = [
      { value: '3', label: "rae" },
      { value: '6', label: "aww" },
      { value: '12', label: "dd" }
    ];
    return (
      <form className="row">
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
        <div className="col-md-12 align-self-end card-radio">
          <Checkbox
            onChange={e => this.setState({
              check: !this.state.check
            })}
            checked={this.state.check}
            label="Set as Default Address"
          />
        </div>
        <div className="footer col-12">
          <div className="row">
          <div className="col-3">
            <Button className="btn btn-light" type="reset" text="Cancel" onClick={this.onCancle} />
          </div>
          <Button className="btn-primary col-9" text="Add Card" icon={"icon-arrow-right"} />
          </div>
        </div>
      </form>
    )
  }
}

PaymentPopup = reduxForm({
  form: 'PaymentPopup'
})(PaymentPopup)

export default PaymentPopup
