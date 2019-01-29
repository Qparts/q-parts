import React, { Component } from 'react';
import { change as changeFieldValue } from 'redux-form';
import { connect } from 'react-redux';
import Button from '../Button';
import * as constant from '../../../constants';

const DECREMENT = 'decrement';
const INCREMENT = 'increment';

class NumberPicker extends Component {

    handleClick = (action, event) => {
        event.preventDefault();

        const { value, onChange } = this.props.input;
        const max = 20;
        const min = 1;
        let newQuanValue = parseInt(value, constant.RADIX);

        if (action === DECREMENT) {
            const decQuantity = newQuanValue !== min ? newQuanValue -= 1 : newQuanValue;
            onChange(decQuantity);
        } else {
            const incQuantity = newQuanValue !== max ? newQuanValue += 1 : newQuanValue;
            onChange(incQuantity);
        }
    }

    render() {
        return <div id="number-picker" className={this.props.col}>
            <Button
                className="btn btn-secondary btn-positive"
                text="+"
                onClick={this.handleClick.bind(this, INCREMENT)} />
            <input
                className="form-control btn btn-secondary"
                readOnly
                disabled
                {...this.props.input}
            />
            <Button
                className="btn btn-secondary btn-negative"
                text="-"
                onClick={this.handleClick.bind(this, DECREMENT)} />
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeFieldValue: (format, field, value) => dispatch(changeFieldValue(format, field, value))
    }
}

export default connect(null, mapDispatchToProps)(NumberPicker);