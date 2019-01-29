import React, { Component } from 'react';
import { upperCaseFirstChar } from '../../utils'
import * as constant from '../../constants';

const rows = 12;
const recommended = 'recommended';
const lPrice = 'lPrice';
const hPrice = 'hPrice';
const rating = 'rating';

const WithProductView = WrappedComponent => {
	return class extends Component {
		constructor(props) {
			super(props);

			this.state = {
				filtration: [],
				params: '',
				currentProducts: this.getCurrentProducts(0),
				first: 0,
				rows,
				selectedRadio: null
			}
		}

		componentDidUpdate(prevProps, prevState) {
			if (prevProps.products !== this.props.products) {
				this.setState({ currentProducts: this.getCurrentProducts(0) })
			}
		}

		static displayName = `WithProductView(${WrappedComponent.displayName ||
			WrappedComponent.name})`;

		getCurrentProducts = (index) => (
			this.props.products.slice(index, index + rows)
		);

		onPageChange({ first, rows, page }) {
			const offset = page * rows;
			const currentProducts = this.getCurrentProducts(offset)
			this.setState({
				first: first,
				rows: rows,
				currentProducts
			});
		}

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
			const index = this.state.filtration.indexOf(value);
			const itemValue = item.value.replace(/ /, '_');

			if (checked && index === -1) {
				const newParams = this.state.params.length === 1 ? this.state.params.concat(`${item.key}=${itemValue}`) : this.state.params.concat(`&${item.key}=${itemValue}`);

				this.setState({
					filtration: [...this.state.filtration, value],
					params: newParams
				});
			} else if (index !== -1) {
				const clone = [...this.state.filtration];
				const newParams = this.state.params.slice(1).split(/[&]/);

				clone.splice(index, 1);
				newParams.splice(index, 1);
				this.setState({
					filtration: clone,
					params: fixParamsFormat(newParams)
				});
			}
		}

		filterRadio = (item, event) => {
			const { value } = event;
			const clone = [...this.state.filtration];
			const index = this.state.filtration.indexOf(this.state.selectedRadio);
			const itemValue = item.value.replace(/ /, '_');
			const oneFilter = 1;

			if (index !== -1) {

				const cloneParams = this.state.params.slice(1).split(/[&]/);
				clone.splice(index, 1);
				cloneParams.splice(index, 1);

				const newParams = cloneParams.length >= oneFilter ? `${fixParamsFormat(cloneParams)}&${item.key}=${itemValue}` : `${fixParamsFormat(cloneParams)}${item.key}=${itemValue}`;

				this.setState({
					selectedRadio: value,
					filtration: [...clone, value],
					params: newParams
				});
			} else {
				const newParams = this.state.params.length === oneFilter ? this.state.params.concat(`${item.key}=${itemValue}`) : this.state.params.concat(`&${item.key}=${itemValue}`);

				this.setState({
					selectedRadio: value,
					filtration: [...clone, value],
					params: fixParamsFormat(newParams.slice(1).split())
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
			const check = this.state.filtration.find(result => result === value);

			return check ? true : false;
		}

		renderSearch = (filtration, Component, handleChange, isChecked, currentLanguage) => {

			return filtration.options.map((data, index) => {
				const key = currentLanguage === constant.EN ? 'filterTitle' : 'filterTitleAr';
				const option = currentLanguage === constant.EN ? 'value' : 'valueAr';
				const value = data[option];
				
				return <div key={index}>
					<Component
						onChange={handleChange.bind(this, { key, value })}
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

		handleSelectChange = (selectedOption) => {
			switch (selectedOption.value) {
				case recommended:
					this.props.getSortedProducts();
				case lPrice:
				case hPrice:
				case rating:

				default:
					break;
			}
		}

		setParams = (newParams) => {
			this.setState({ params: fixParamsFormat(newParams) });
		}

		setRadioButton = (filter) => {
			filter.map(filterObject => {
				if (filterObject.componentType === 'Radio') {
					const label = upperCaseFirstChar(filterObject.label);
					const value = filterObject.values;

					this.setState({ selectedRadio: `${label} ${value}` });
				}
			})
		}

		render() {
			return <WrappedComponent
				currentProducts={this.state.currentProducts}
				first={this.state.first}
				rows={this.state.rows}
				getCurrentProducts={this.getCurrentProducts}
				onPageChange={this.onPageChange}
				handleSelectChange={this.handleSelectChange}
				renderSearch={this.renderSearch}
				onAddToFilter={this.addToFilter}
				onFilter={this.filter}
				onFilterRadio={this.filterRadio}
				onRemoveItem={this.removeItem}
				isChecked={this.isChecked}
				onClear={this.handleClear}
				onSetParams={this.setParams}
				onSetRadioButton={this.setRadioButton}

				{...this.state}
				{...this.props} />
		}
	}
}

const fixParamsFormat = (newParams) => {
	return '?'.concat(newParams.join('&'))
}

export default WithProductView;