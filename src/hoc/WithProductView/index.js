import React, { Component } from 'react';

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

		renderSearch = ({ filtration, key }, Component, handleChange, isChecked) => {
			return filtration.values.map((value, index) => (
				<div key={index}>
					<Component onChange={handleChange.bind(this, { key, value })} value={`${filtration.label} ${value}`} checked={isChecked(`${filtration.label} ${value}`)} />
					<label>{value}</label>
				</div>
			))
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

		render() {
			return <WrappedComponent
				currentProducts={this.state.currentProducts}
				first={this.state.first}
				rows={this.state.rows}
				getCurrentProducts={this.getCurrentProducts}
				onPageChange={this.onPageChange}
				handleSelectChange={this.handleSelectChange}
				renderSearch={this.renderSearch}
				{...this.props} />
		}
	}
}

export default WithProductView;