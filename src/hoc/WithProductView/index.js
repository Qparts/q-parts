import React, { Component } from 'react';
import { upperCaseFirstChar } from '../../utils'
import * as constant from '../../constants';
import {addQuery} from '../../utils';

const WithProductView = WrappedComponent => {
	return class extends Component {
		constructor(props) {
			super(props);

			this.state = {
				filtration: [],
				filtrationChecked: [],
				params: '',
			}

		}

		static displayName = `WithProductView(${WrappedComponent.displayName ||
			WrappedComponent.name})`;



		addToFilter = (filters, filterObject) => {
			let params = [];

			filters.forEach(data => {
				data.values.forEach(value => {
					const matchValues = filterObject[data.label] ? filterObject[data.label].values.includes(value) : null;
					const keyExists = filterObject[data.label];
					if (matchValues && keyExists) {
						params.push(`${upperCaseFirstChar(data.label).replace('_', ' ')} ${value}`);
					}
				});
			});


			this.setState({ filtration: params })
		}

		filter = (item, event) => {
			const { value, checked } = event.target;
			const index = this.state.filtrationChecked.indexOf(value);
			// const itemValue = item.value.replace(/ /, '_');
			if (checked && index === -1) {
				// const newParams = this.state.params.length === 1 ? this.state.params.concat(`${item.key}=${itemValue}`) : this.state.params.concat(`&${item.key}=${itemValue}`);

				this.setState({ filtration: [...this.state.filtration, item['id']],filtrationChecked: [...this.state.filtrationChecked, value] }, function () {
						this.props.history.push(addQuery(item['id'],item['filterTitle'], ''));
				 })
			} else if (index !== -1) {
				const clone = [...this.state.filtration];
				const removeChecked =[...this.state.filtrationChecked];

				const newParams = this.state.params.slice(1).split(/[&]/);

				const elementRemoved = clone.splice(index, 1);
				removeChecked.splice(index,1)
				newParams.splice(index, 1);
				this.setState({
					filtration: clone,
					filtrationChecked: removeChecked,
					// params: fixParamsFormat(newParams)
				}, function () {
					this.props.history.push(addQuery(this.state.filtration,item['filterTitle'],elementRemoved));
				});
			}
		}

		removeItem = (index, event) => {
			event.preventDefault();
			const clone = [...this.state.filtration];
			const newParams = this.state.params.slice(1).split(/[&]/);

			clone.splice(index, 1);
			newParams.splice(index, 1);

			this.setState({
				filtration: clone,
				params: fixParamsFormat(newParams)
			});
		}

		isChecked = (value) => {
			const check = this.state.filtrationChecked.find(result => result === value);

			return check ? true : false;
		}


		renderSearch = (filtration, Component, handleChange, isChecked, currentLanguage) => {

			return filtration.options.map((data, index) => {
				const key = currentLanguage === constant.EN ? 'filterTitle' : 'filterTitleAr';
				const option = currentLanguage === constant.EN ? 'value' : 'valueAr';
				const value = data[option];
				const id = data['id'];
				const filterTitle = filtration['filterTitle'];
				return <div key={index}>
					<Component
						onChange={handleChange.bind(this, { key,value,id,filterTitle })}
						value={`${filtration[key]} ${value}`}
						checked={isChecked(`${filtration[key]} ${value}`)}
						label={value} />
				</div>
			})
		}

		handleClear = () => {
			this.setState({
				filtration: []
			})
		}

		setParams = (newParams) => {
			this.setState({ params: fixParamsFormat(newParams) });
		}

		render() {
			return <WrappedComponent
				renderSearch={this.renderSearch}
				onAddToFilter={this.addToFilter}
				onFilter={this.filter}
				onRemoveItem={this.removeItem}
				isChecked={this.isChecked}
				onClear={this.handleClear}
				onSetParams={this.setParams}

				{...this.state}
				{...this.props} />
		}
	}
}

const fixParamsFormat = (newParams) => {
	return '?'.concat(newParams.join('&'))
}

export default WithProductView;
