import React, { Component, createRef } from "react";
import Select from "react-select";
import { InputGroup } from "reactstrap"
import { helpers } from "../../constants";
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

class SelectInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            hasFloat: ""
        }
        this.selectRef = createRef();
    }
    componentDidMount = () => {
        if (this.props.input.value) {
            this.setState({
                hasFloat: "on"
            })
        }

    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.input.value !== prevProps.input.value && this.props.meta.dirty) {
            this.setState({
                hasFloat: "on"
            })
        }

    }


    getIconClassName = () => {
        return helpers.isSucceed(this.props.meta.error, this.props.meta.touched) ? "icon-checked" : "";
    }
    handleChange = (value) => {
        this.props.input.onChange(value);
        this.handleMenuClose(value);
    }
    handleBlur = (value) => {
        this.selectRef.current.select.blur(value);
        this.props.input.onBlur(value);
    }

    handleMenuOpen = () => {
        this.setState({
            hasFloat: "on"
        })
    }

    handleMenuClose = (value) => {
        const textValue = value || this.props.input.value;

        this.handleBlur(textValue);
        if (textValue) {
            this.setState({
                hasFloat: "on"
            })
        } else {
            this.setState({
                hasFloat: ""
            })
        }
    }
    render() {
        const style = {
            hasError: helpers.isRequired(this.props.meta.error, this.props.meta.touched) ? 'error' : "none"
        }
        return (
            <InputGroup className={`select-input ${style.hasError} ${this.state.hasFloat}`}>
                <label>{this.props.label}</label>
                <Select
                    ref={this.selectRef}
                    className={`select`}
                    classNamePrefix="select"
                    {...this.props}
                    {...this.props.input}
                    indicatorSeparator={false}
                    isSearchable={false}
                    value={this.props.input.value || this.props.defaultValue}
                    onChange={this.handleChange}
                    options={this.props.options}
                    onMenuOpen={this.handleMenuOpen}
                    onMenuClose={this.handleMenuClose}
                    optionClassName="needsclick"
                />
                <p className="error-text">{this.props.translate("general.requiredField")}</p>
            </InputGroup>
        );
    }
}

const mapStateToProps = state => ({
    translate: getTranslate(state.localize),
})

export default connect(mapStateToProps, null)(SelectInput);