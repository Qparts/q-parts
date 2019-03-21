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
				params: {
					id: [],
					title: []
				},
			}

		}

		static displayName = `WithProductView(${WrappedComponent.displayName ||
			WrappedComponent.name})`;


		filter = (item, event) => {
			const { id, paramsTitle } = item;
			const { value, checked } = event.target;
			const index = this.state.filtrationChecked.indexOf(value);
			if (checked && index === -1) {
				// const newParams = this.state.params.length === 1 ? this.state.params.concat(`${item.key}=${itemValue}`) : this.state.params.concat(`&${item.key}=${itemValue}`);
				this.state.selectedOptions.map((element, index) => {
					if (element.filterTitle === item.filterTitle) {
						element.selectedOptions.push(value);
						this.setState({ selectedOptions: this.state.selectedOptions, element });
					}
				})
				this.setState({
					filtration: [...this.state.filtration, id],
					filtrationChecked: [...this.state.filtrationChecked, value],
					params: {
						id: [...this.state.filtration, id],
						title: [...this.state.params.title, paramsTitle],
					}
				})
			} else if (index !== -1) {
				this.state.selectedOptions.map((element, index) => {
					for (var i = 0; i < element.selectedOptions.length; i++) {
						if (element.selectedOptions[i] === value) {

							element.selectedOptions.splice(i, 1);

							this.setState({ selectedOptions: this.state.selectedOptions, element });
						}
					}
				})
				const clone = [...this.state.filtration];
				const removeParamsTitle = [...this.state.params.title];
				const removeParamsId = [...this.state.params.id];
				const removeChecked = [...this.state.filtrationChecked];



				removeChecked.splice(index, 1)
				removeParamsId.splice(index, 1);
				removeParamsTitle.splice(index, 1);
				this.setState({
					filtration: clone,
					filtrationChecked: removeChecked,
					params: {
						id: removeParamsId,
						title: removeParamsTitle,
					}
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
			const removeParamsTitle = [...this.state.params.title];
			const removeParamsId = [...this.state.params.id];
			let title;
			for (var i = 0; i < this.state.filtrationChecked.length; i++) {
				if (this.state.filtrationChecked[i] === item) {
					title = this.state.filtrationChecked[i].substring(0, this.state.filtrationChecked[i].indexOf(' '));
				}
			}

			removeChecked.splice(index, 1);
			removeParamsId.splice(index, 1);
			removeParamsTitle.splice(index, 1);

			this.setState({
				filtration: clone,
				filtrationChecked: removeChecked,
				params: {
					id: removeParamsId,
					title: removeParamsTitle,
				}
			});
		}

		isChecked = (value) => {
			const check = this.state.filtrationChecked.find(result => result === value);

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
				const paramsTitle = filtration['filterTitle']
				const checkLabel = `${filterTitle} ${value}`;

				return <ul key={index} className="options-list">
					<li>
						<div className="checkbox">
							<input
								type="checkbox"
								id={`${filterId}${id}`}
								onChange={handleChange.bind(this, { filterId, value, id, paramsTitle })}
								value={checkLabel}
								checked={isChecked(checkLabel)}
							/>
							<label for={`${filterId}${id}`}>{value}</label>
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
				params: {
					id: [],
					title: []
				},
			})
		}
		selectedOptions = (dataSelectedOptions, dataProducts) => {
			this.setState({
				selectedOptions: dataSelectedOptions
			})

			let obj = queryString.parse(window.location.search.slice(1));
			for (var key in obj) {
				// eslint-disable-next-line no-loop-func
				dataProducts.filterObjects.forEach(item => {
					if (item.filterTitle === key) {
						item.options.forEach(option => {
							for (var i = 0; i < obj[key].length; i++) {
								if (option.id === Number(obj[key][i])) {
									this.setState({ filtration: [...this.state.filtration, option.id], filtrationChecked: [...this.state.filtrationChecked, key + ' ' + option.value] }
									)
								}
							}
						})
					}
				})
			}
		}

		render() {
			console.log(this.state.filtrationChecked);

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
