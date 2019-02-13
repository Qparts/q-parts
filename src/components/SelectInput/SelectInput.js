import React, { Fragment, Component } from 'react';
import Select from 'react-select';
import { InputGroup, InputGroupAddon } from 'reactstrap'
import { helpers, colors } from '../../constants';
import { StyleSheet, css } from 'aphrodite';

export default class SelectInput extends Component {

    getIconClassName = () => {
        return helpers.isSucceed(this.props.meta.error, this.props.meta.touched) ? 'icon-checked' : '';
    }
    render() {
        const style = StyleSheet.create({
            border: {
                border: helpers.isSucceed(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.success}` :
                    helpers.isInvalid(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.invalid}` :
                        helpers.isRequired(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.error}` : 'none',
                borderRadius: 'inherit'
            },
            icon: {
                color: helpers.isSucceed(this.props.meta.error, this.props.meta.touched) ? '#30d576' : 'none'
            }
        });
        return (
            <div className="select-input">
                <label>{this.props.label}</label> <br />
                <sub>{this.props.sub}</sub>
                <InputGroup>
                    <Select
                        className={`select ${css(style.border)}`}
                        classNamePrefix="select"
                        {...this.props}
                        {...this.props.input}
                        indicatorSeparator={false}
                        isSearchable={false}
                        value={this.props.input.value || this.props.defaultValue}
                        onChange={(value) => this.props.input.onChange(value)}
                        onBlur={() => this.props.input.onBlur(this.props.input.value)}
                        options={this.props.options}
                    />
                    <InputGroupAddon addonType="append">
                        <i className={`input-icon ${this.getIconClassName()} ${css(style.icon)}`} />
                    </InputGroupAddon>
                </InputGroup>
            </div>
        );
    }
}