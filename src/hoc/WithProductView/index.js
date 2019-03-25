import React, { Component } from 'react';
import { upperCaseFirstChar } from '../../utils'
import * as constant from '../../constants';
import { addQuery, clearQuery } from '../../utils';
import queryString from 'qs';
import _ from 'lodash';
const WithProductView = WrappedComponent => {
	return class extends Component {
		constructor(props) {
			super(props);

			this.state = {
				filtration: [],
				filtrationChecked: [],
				selectedOptions: [],
				params: [],
			}

		}

		static displayName = `WithProductView(${WrappedComponent.displayName ||
			WrappedComponent.name})`;


		filter = (item, event) => {
			const { id, paramsTitle, label, combinedIds } = item;
			const { value, checked } = event.target;
			let index = -1;
			if (this.state.filtrationChecked !== []) {

				this.state.filtrationChecked.forEach((item, indexx) => {

					if (item['id'] === combinedIds) {
						index = indexx;
					}
				})
			}
			if (checked && index === -1) {

				// const newParams = this.state.params.length === 1 ? this.state.params.concat(`${item.key}=${itemValue}`) : this.state.params.concat(`&${item.key}=${itemValue}`);
				this.state.selectedOptions.forEach(element => {
					if (element.filterTitle === item.filterTitle) {
						element.selectedOptions.push(value);
						this.setState({ selectedOptions: this.state.selectedOptions, element });
					}
				})
				this.setState({
					filtration: [...this.state.filtration, id],
					filtrationChecked: [...this.state.filtrationChecked, { id: combinedIds, title: item.paramsTitle + ' ' + item.paramsValue, titleAr: item.paramsTitleAr + ' ' + item.paramsValueAr }],
					params: [...this.state.params, { id, title: paramsTitle, label }]
				})
			} else if (index !== -1) {
				this.state.selectedOptions.forEach(element => {
					for (var i = 0; i < element.selectedOptions.length; i++) {
						if (element.selectedOptions[i] === value) {

							element.selectedOptions.splice(i, 1);

							this.setState({ selectedOptions: this.state.selectedOptions, element });
						}
					}
				})
				const clone = [...this.state.filtration];
				const removeParams = [...this.state.params];
				const removeChecked = [...this.state.filtrationChecked];


				removeChecked.splice(index, 1)
				removeParams.splice(index, 1);
				this.setState({
					filtration: clone,
					filtrationChecked: removeChecked,
					params: removeParams
				});
			}
		}

		removeItem = (index, item, event) => {
			event.preventDefault();
			const key = this.props.currentLanguage === constant.EN ? 'filterTitle' : 'filterTitleAr';
			this.state.selectedOptions.map((element, index) => {
				for (var i = 0; i < element.selectedOptions.length; i++) {
					if (element.selectedOptions[i] === item) {

						element.selectedOptions.splice(i, 1);

						this.setState({ selectedOptions: this.state.selectedOptions, element });
					}
				}
			})
			const clone = [...this.state.filtration];
			const removeChecked = [...this.state.filtrationChecked];
			const removeParams = [...this.state.params];


			removeChecked.splice(index, 1);
			removeParams.splice(index, 1);

			this.setState({
				filtration: clone,
				filtrationChecked: removeChecked,
				params: removeParams
			});
		}

		isChecked = (id) => {
			const check = this.state.filtrationChecked.find(item => {
				return item['id'] === id;
			})

			return check ? true : false;
		}


		renderSearch = (filtration, handleChange, isChecked, currentLanguage) => {

			return filtration.options.map((option, index) => {
				const key = currentLanguage === constant.EN ? 'filterTitle' : 'filterTitleAr';
				const optionKey = currentLanguage === constant.EN ? 'value' : 'valueAr';
				const value = option[optionKey];
				const id = option['id'];
				const filterId = filtration['id'];
				const filterTitle = filtration[key];
				const paramsTitle = filtration['filterTitle'];
				const paramsTitleAr = filtration['filterTitleAr'];
				const paramsValue = option['value'];
				const paramsValueAr = option['valueAr'];
				const checkLabel = `${filterTitle} ${value}`;
				const combinedIds = `${filterId}${id}`;
				return <ul key={index} className="options-list">
					<li>
						<div className="checkbox">
							<input
								type="checkbox"
								id={combinedIds}
								onChange={handleChange.bind(this, { filterId, value, id, paramsTitle, paramsTitleAr, filterTitle, paramsValue, paramsValueAr, label: checkLabel, combinedIds })}
								value={checkLabel}
								checked={isChecked(combinedIds)}
							/>
							<label for={combinedIds}>{value}</label>
						</div>
					</li>
				</ul>
			})
		}

		handleClear = () => {
			this.props.history.push(clearQuery(this.state.filtrationChecked, this.state.filtration));
			this.setState({
				filtration: [],
				filtrationChecked: [],
				params: [],
			})
		}
		selectedOptions = (dataSelectedOptions, dataProducts) => {
			this.setState({
				selectedOptions: dataSelectedOptions
			})

			let obj = queryString.parse(window.location.search.slice(1));
			for (var key in obj) {
				// eslint-disable-next-line no-loop-func
				dataProducts.forEach(item => {
					if (item.filterTitle === key) {
						item.options.forEach(option => {
							for (var i = 0; i < obj[key].length; i++) {
								if (option.id === Number(obj[key][i])) {
									const label = item.filterTitle + ' ' + option.value;
									const labelAr = item.filterTitleAr + ' ' + option.valueAr;
									const combinedIds = `${item.id}${option.id}`;
									this.setState({
										filtration: [...this.state.filtration, option.id],
										filtrationChecked: [...this.state.filtrationChecked, { id: combinedIds, title: label, titleAr: labelAr }],
										params: [...this.state.params, { id: option.id, title: item.filterTitle }]
									})
								}
							}
						})
					}
				})
			}
		}

		render() {
			return <WrappedComponent
				renderSearch={this.renderSearch}
				onFilter={this.filter}
				onRemoveItem={this.removeItem}
				isChecked={this.isChecked}
				methodSelectedOptions={this.selectedOptions}
				onClear={this.handleClear}

				{...this.state}
				{...this.props} />
		}
	}
}

const fixParamsFormat = (newParams) => {
	return '?'.concat(newParams.join('&'))
}

export default WithProductView;
