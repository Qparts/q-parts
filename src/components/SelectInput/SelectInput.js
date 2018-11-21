import React, { Fragment, Component } from 'react';
import Select from 'react-select';
import { helpers, colors, styles } from '../../constants';
import { StyleSheet, css } from 'aphrodite';

export default class SelectInput extends Component {
    render() {
        const style = StyleSheet.create({
            border: {
                border: helpers.isSucceed(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.success}` :
                    helpers.isInvalid(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.invalid}` :
                        helpers.isRequired(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.error}` : 'none'
            }
        })
        return (
            <div className="select-input">
                <label>{this.props.label}</label> <br />
                <sub>{this.props.sub}</sub>
                <Select
                    className={css(style.border)}
                    styles={styles.selectForm}
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
            </div>
        );
    }
}