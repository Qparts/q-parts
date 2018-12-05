import React, { Component } from 'react';
import { change as changeFieldValue } from 'redux-form';
import { connect } from 'react-redux';
import Button from '../Button';
import * as constant from '../../../constants';

const DECREMENT = 'decrement';
const INCREMENT = 'increment';

class NumberPicker extends Component {

    handleClick = (event) => {
        event.preventDefault();

        const { value, onChange } = this.props.input;
        const max = 20;
        const min = 1;
        let newQuanValue = parseInt(value, constant.RADIX);

        if (event.target.value === DECREMENT) {
            const decQuantity = newQuanValue !== min ? newQuanValue -= 1 : newQuanValue;
            onChange(decQuantity);
        } else {
            const incQuantity = newQuanValue !== max ? newQuanValue += 1 : newQuanValue;
            onChange(incQuantity);
        }
    }

    render() {
        return <div id="number-picker">
            <Button
                className="btn-positive margin-right-3"
                text="+"
                value={INCREMENT}
                onClick={(value) => this.handleClick(value)} />
            <input
                className="form-control margin-right-3"
                readOnly
                {...this.props.input}
            />
            <Button
                className="btn-negative"
                text="-"
                value={DECREMENT}
                onClick={(value) => this.handleClick(value)} />
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeFieldValue: (format, field, value) => dispatch(changeFieldValue(format, field, value))
    }
}

export default connect(null, mapDispatchToProps)(NumberPicker);