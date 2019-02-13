import React, { Component } from 'react';
import { change as changeFieldValue } from 'redux-form';
import { connect } from 'react-redux';
import Button from '../Button';
import * as constant from '../../../constants';

class NumberPicker extends Component {
    static defaultProps = {
        btnGray: 'btn-secondary'
    }

    handleClick = (action, event) => {
        event.preventDefault();

        const { value, onChange } = this.props.input;
        const max = 20;
        const min = 1;
        let newQuanValue = parseInt(value, constant.RADIX);

        if (action === constant.DECREMENT) {
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
                className={`btn ${this.props.btnGray} btn-positive`}
                icon="icon-plus"
                onClick={this.handleClick.bind(this, constant.INCREMENT)} />
            <input
                className={`form-control btn ${this.props.btnGray}`}
                readOnly
                disabled
                {...this.props.input}
            />
            <Button
                className={`btn ${this.props.btnGray} btn-negative`}
                icon="icon-minus"
                onClick={this.handleClick.bind(this, constant.DECREMENT)} />
        </div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeFieldValue: (format, field, value) => dispatch(changeFieldValue(format, field, value))
    }
}

export default connect(null, mapDispatchToProps)(NumberPicker);