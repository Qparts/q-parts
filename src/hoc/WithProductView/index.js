import React, { Component } from 'react';
import { upperCaseFirstChar } from '../../utils'

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
			const { value, checked } = event;
			const index = this.state.filtration.indexOf(value);
			const itemValue = item.value.replace(/ /, '_');

			if (checked && index === -1) {
				console.log(this.state.params);
				
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

		renderSearch = ({ filtration, key }, Component, handleChange, isChecked) => {
			return filtration.values.map((value, index) => (
				<div key={index}>
					<Component onChange={handleChange.bind(this, { key, value })} value={`${filtration.label} ${value}`} checked={isChecked(`${filtration.label} ${value}`)} />
					<label>{value}</label>
				</div>
			))
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