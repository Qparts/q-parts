import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Table from '../UI/Table';
import Button from '../UI/Button';

import './Orders.css'

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mockItems: this.generateMockItems(),
      search: '3',
      orderNum: '',
      searchByDate: true
    }
  }

  generateMockItems = () => (
    [{
      orderNum: '0001',
      date: '9/11/2018',
      quantity: 1,
      price: "200 SR",
      status: "Shipped",
      actions: [
        <Button key={0} value={0} text={this.props.translate("setting.orders.table.buttons.details")} className="btn btn-light" onClick={this.handleDetails} />,
      ]
    }, {
      orderNum: '0002',
      date: '1/15/2018',
      quantity: 2,
      price: "200 SR",
      status: "Shipped",
      actions: [
        <Button key={0} value={1} text={this.props.translate("setting.orders.table.buttons.details")} className="btn btn-light" onClick={this.handleDetails} />,
        <Button key={1} value={1} text={this.props.translate("setting.orders.table.buttons.reorder")} className="btn btn-light" />,
      ]
    }, {
      orderNum: '0003',
      date: '6/15/2018',
      quantity: 2,
      price: "200 SR",
      status: "Under processing",
      actions: [
        <Button key={0} value={2} text={this.props.translate("setting.orders.table.buttons.details")} className="btn btn-light" onClick={this.handleDetails} />,
        <Button key={1} value={2} text={this.props.translate("setting.orders.table.buttons.reorder")} className="btn btn-light" />,
      ]
    },
    ]
  )

  handleDetails = e => {
    const index = e.target.value;
    const item = this.state.mockItems[index];
    this.props.history.push(`/setting/orders/${item.orderNum}`)
  }

  handleFilter = e => {
    this.setState({
      search: e.target.value,
      searchByDate: false
    })
  }

  handleChange = e => {
    this.setState({ orderNum: e.target.value, search: e.target.value, searchByDate: false })
  }

  handleSelectChange = (selectedOption) => {
    this.setState({ search: selectedOption.value, searchByDate: true });
  }

  render() {
    const { translate } = this.props;
    const options = [
      { value: '3', label: translate("setting.orders.filter.date.pastThreeMonths") },
      { value: '6', label: translate("setting.orders.filter.date.pastSixMonths") },
      { value: '12', label: translate("setting.orders.filter.date.pastOneYear") }
    ];
    const headers = [
      translate("setting.orders.table.orderNo"),
      translate("setting.orders.table.date"),
      translate("setting.orders.table.items"),
      translate("setting.orders.table.totalAmount"),
      translate("setting.orders.table.orderStatus"),
      translate("setting.orders.table.actions"),
    ]

    return (
      <div className="Orders-container">
        <h4>{translate("setting.orders.title")}</h4>
        <div className="border rounded card">
          <div className="Orders-search">
            <Button value={"all"} text={translate("setting.orders.filter.all")} className="btn btn-light" onClick={this.handleFilter} />
            <Button value={"shipped"} text={translate("setting.orders.filter.shipped")} className="btn btn-light" onClick={this.handleFilter} />
            <Button value={"under processing"} text={translate("setting.orders.filter.underPro")} className="btn btn-light" onClick={this.handleFilter} />
            <Select defaultValue={options[0]} options={options} onChange={this.handleSelectChange} />
            <input className="form-control" placeholder={translate("setting.orders.filter.input")} value={this.state.orderNum} onChange={this.handleChange} />
          </div>
          <Table
            headers={headers}
            columns={this.state.mockItems}
            search={this.state.search}
            searchByDate={this.state.searchByDate}
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Orders);