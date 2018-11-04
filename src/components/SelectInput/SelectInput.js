import React, { Fragment, Component } from 'react';
import Select from 'react-select';
import { styles } from '../../constants';

export default class SelectInput extends Component {
    render() {
        return (
            <div className="select-input">
                <label>{this.props.label}</label> <br />
                <sub>{this.props.sub}</sub>
                <Select
                    classNamePrefix="select"
                    {...this.props}
                    {...this.props.input}
                    indicatorSeparator={false}
                    isSearchable={false}
                    styles={styles.selectForm}
                    value={this.props.input.value || this.props.defaultValue}
                    onChange={(value) => this.props.input.onChange(value)}
                    onBlur={() => this.props.input.onBlur(this.props.input.value)}
                    options={this.props.options}
                    className={this.props.className}
                />
                <div className="SelectInput-required">
                    {this.props.meta.touched &&
                        ((this.props.meta.error && <span><i className="fas fa-exclamation-circle"></i>{this.props.meta.error}</span>) ||
                            (this.props.meta.warning && <span>{this.props.meta.warning}</span>))}
                </div>
            </div>
        );
    }
}