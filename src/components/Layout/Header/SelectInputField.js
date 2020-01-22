import React, { Component, createRef } from 'react';
import Select from 'react-select';
import { InputGroup } from 'reactstrap';
import { helpers } from '../../../constants';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

class SelectInput extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hasFloat: ''
        };
		this.selectRef = createRef();
	}
	componentDidMount = () => {
		if (this.props.field.value) {
			this.setState({
				hasFloat: 'on'
			});
		}
	};

	componentDidUpdate = (prevProps, prevState) => {
		if (
			this.props.field.value !== prevProps.field.value &&
			this.props.meta.dirty
		) {
			this.setState({
				hasFloat: 'on'
			});
		}
	};

	getIconClassName = () => {
		return helpers.isSucceed(this.props.meta.error, this.props.meta.touched)
			? 'icon-checked'
			: '';
    };
    
	handleChange =value => {
		this.props.field.onChange(value);
		this.handleMenuClose(value);
    };
    
	handleBlur = value => {
		this.selectRef.current.select.blur(value);
		this.props.field.onBlur(value);
	};

	handleMenuOpen = () => {
		this.setState({
			hasFloat: 'on'
		});
	};

	handleMenuClose = value => {
		const textValue = value || this.props.field.value;

		this.handleBlur(textValue);
		if (textValue) {
			this.setState({
				hasFloat: 'on'
			});
		} else {
			this.setState({
				hasFloat: ''
			});
		}
	};
	
	render() {
		const style = {
			hasError: helpers.isRequired(
				this.props.meta.error,
				this.props.meta.touched
			)
				? 'error'
				: 'none'
		};
        
        console.log(this.props);
        
		return (
			<InputGroup
			className={`select-input ${style.hasError} ${
				this.state.hasFloat
			}`}

			onClick={(e)=>e.stopPropagation()}
		>
			<label>{this.props.label}</label>
			<Select
				ref={this.selectRef}
				className={`select`}
				classNamePrefix='select'
				{...this.props}
				{...this.props.field}
				indicatorSeparator={false}
				isSearchable={false}
				value={this.props.field.value || this.props.defaultValue}
				onChange={e => this.props.onChange(e)}
				options={this.props.options}
				onMenuOpen={this.handleMenuOpen}
				onMenuClose={this.handleMenuClose}
				optionClassName='needsclick'
			/>
			<p className='error-text'>
				{this.props.errorMessage ||
					this.props.translate('general.requiredField')}
			</p>
		</InputGroup>
		);
	}
}

const mapStateToProps = state => ({
	translate: getTranslate(state.localize)
});

export default connect(
	mapStateToProps,
	null
)(SelectInput);
