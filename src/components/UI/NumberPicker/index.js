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
        return <div className="input-group quantity">
            <div className="input-group-prepend">
              <button className="btn btn-gray" type="button" onClick={this.handleClick.bind(this, constant.DECREMENT)}><i className="minus"></i></button>
            </div>
            <input className="form-control" readOnly disabled {...this.props.input}/>
            <div className="input-group-append">
              <button className="btn btn-gray" type="button" onClick={this.handleClick.bind(this,  constant.INCREMENT)}><i className="icon-plus"></i></button>
            </div>
          </div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeFieldValue: (format, field, value) => dispatch(changeFieldValue(format, field, value))
    }
}

export default connect(null, mapDispatchToProps)(NumberPicker);
