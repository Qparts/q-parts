import React, { Component } from 'react';
import * as constant from '../../constants';
import { removeQuery, addQuery } from '../../utils';
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
			}

		}

		static displayName = `WithProductView(${WrappedComponent.displayName ||
			WrappedComponent.name})`;


		filter = (item, event) => {
			const { id, combinedIds } = item;
			const { value, checked } = event.target;
			let index = -1;
			if (this.state.filtrationChecked !== []) {

				this.state.filtrationChecked.forEach((item, indexx) => {

					if (item['combinedIds'] === combinedIds) {
						index = indexx;
					}
				})
			}
			if (checked && index === -1) {
				this.state.selectedOptions.forEach(element => {
					if (element.filterTitle === item.paramsTitle) {
						element.selectedOptions.push(id);
						this.setState({ selectedOptions: this.state.selectedOptions, element });
					}
				});

				this.setState({
					filtration: [...this.state.filtration, id],
					filtrationChecked: [
						...this.state.filtrationChecked,
						{
							id,
							combinedIds,
							title: item.paramsTitle + ' ' + item.paramsValue,
							titleAr: item.paramsTitleAr + ' ' + item.paramsValueAr,
							filterTitle: item.paramsTitle
						}
					],
				}, () => {
					this.updateParams(item);
				});
			} else if (index !== -1) {
				this.state.selectedOptions.forEach(element => {
					for (var i = 0; i < element.selectedOptions.length; i++) {
						if (element.selectedOptions[i] === id) {

							element.selectedOptions.splice(i, 1);

							this.setState({ selectedOptions: this.state.selectedOptions, element });
						}
					}
				})
				const clone = [...this.state.filtration];
				const removeChecked = [...this.state.filtrationChecked];


				removeChecked.splice(index, 1)
				this.setState({
					filtration: clone,
					filtrationChecked: removeChecked,
				}, () => {
					this.updateParams(item);
				});
			}
		}

		updateParams = (param) => {

			const filterQuery = `${param.paramsTitle}=${param.id}`;
			this.props.history.push(addQuery(filterQuery));
		}

		removeItem = (index, item, event) => {
			event.preventDefault();
			this.state.selectedOptions.forEach(element => {
				for (var i = 0; i < element.selectedOptions.length; i++) {
					if (element.selectedOptions[i] === item) {

						element.selectedOptions.splice(i, 1);

						this.setState({ selectedOptions: this.state.selectedOptions, element });
					}
				}
			})
			const clone = [...this.state.filtration];
			const removeChecked = [...this.state.filtrationChecked];


			removeChecked.splice(index, 1);

			this.setState({
				filtration: clone,
				filtrationChecked: removeChecked
			}, () => {
				this.updateParams({ id: item.id, paramsTitle: item.filterTitle });
			});
		}

		isChecked = (id) => {
			const check = this.state.filtrationChecked.find(item => {
				return item['combinedIds'] === id;
			})

			return check ? true : false;
		}

		removeSelectedUrl = (itemToRemove) => {
			const newParam = this.state.params.find(param => param.checkId === itemToRemove.id);
			const filterQuery = `${newParam.title}=${newParam.id}`;
			const newUrl = removeQuery(filterQuery);

			return newUrl ? this.props.history.push(newUrl) : newUrl
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
							<label htmlFor={combinedIds}>{value}</label>
						</div>
					</li>
				</ul>
			})
		}

		handleClear = () => {
			this.state.filtrationChecked.forEach(param => {
				const filterQuery = `${param.filterTitle}=${param.id}`;
				const newUrl = removeQuery(filterQuery);
				this.props.history.push(newUrl);
			});

			this.setState({
				filtration: [],
				filtrationChecked: [],
			})
		}
		selectedOptions = (dataSelectedOptions, dataProducts) => {
			this.setState({
				selectedOptions: dataSelectedOptions
			})
			let obj = queryString.parse(window.location.search.slice(1));
			if (this.state.filtrationChecked.length !== 0) {
				this.setState({
					filtrationChecked: []
				})
			}
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
										filtrationChecked: [...this.state.filtrationChecked, { id: option.id, combinedIds, title: label, titleAr: labelAr, filterTitle: item.filterTitle }]
									});
									this.state.selectedOptions.forEach(element => {
										if (element.filterTitle === item.filterTitle) {
											element.selectedOptions.push(option.id);
											this.setState({ selectedOptions: this.state.selectedOptions, element });
										}
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
				onSetInitialSelectedOptions={this.selectedOptions}
				onClear={this.handleClear}
				onUpdateParams={this.updateParams}

				{...this.state}
				{...this.props} />
		}
	}
}

export default WithProductView;
