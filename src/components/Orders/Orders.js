import React, { Fragment,Component } from 'react';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';
import Table from '../UI/Table';
import Button from '../UI/Button';

import { Field, reduxForm } from 'redux-form';
import RenderField from '../RenderField/RenderField';
import RenderFileInput from '../RenderFileInput/RenderFileInput';
import SelectInput from '../SelectInput/SelectInput';
import * as validations from '../../utils';
import Link from "../UI/Link";

import { DownLargeScreen, LargeScreen } from '../../components/Device/index.js';

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
      status: "Canceled",
      actions: [
        <Button key={0} value={0} text={this.props.translate("setting.orders.table.buttons.details")} onClick={this.handleDetails} icon="icon-add" isReverseOrder/>,
      ]
    }, {
      orderNum: '0002',
      date: '1/15/2018',
      quantity: 2,
      price: "200 SR",
      status: "Shipped",
      actions: [
        <Button key={0} value={1} text={this.props.translate("setting.orders.table.buttons.details")} onClick={this.handleDetails} icon="icon-add" isReverseOrder/>,
      ]
    }, {
      orderNum: '0003',
      date: '6/15/2018',
      quantity: 2,
      price: "200 SR",
      status: "Under processing",
      actions: [
        <Button key={0} value={2} text={this.props.translate("setting.orders.table.buttons.details")} onClick={this.handleDetails} icon="icon-add" isReverseOrder/>,
      ]
    }, {
      orderNum: '0003',
      date: '6/15/2018',
      quantity: 2,
      price: "200 SR",
      status: "Under processing",
      actions: [
        <Button key={0} value={2} text={this.props.translate("setting.orders.table.buttons.details")} onClick={this.handleDetails} icon="icon-add" isReverseOrder/>,
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
      search: e,
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
    ]

    return (
      <Fragment>
          <div className="orders-main">
            <DownLargeScreen>
              <h2 className="sec-title-sm">Orders</h2>
            </DownLargeScreen>
            <div className="empty">
              <LargeScreen>
                <header>
                  <h5>Track Your Orders</h5>
                </header>
              </LargeScreen>
                      <figure>
                        <img src="/img/no-products.svg" />
                      </figure>
                     <figcaption>
                       <p>No Order Yet </p>
                          <a className="btn btn-primary" href="#" >Start Shopping <i className="icon-arrow-right"></i></a>
                     </figcaption>
             </div>
            <div className="row">
              <div className="col search-order">
                <Field
                  name="search-option"
                  component={SelectInput}
                  options={options}
                  placeholder="Select Date"
                   onChange={this.handleSelectChange}/>
                 <div className="search-input">
                   <input type="search" className="form-control input" onChange={this.handleChange} value={this.state.orderNum} placeholder="Search by order ID"/>
                   <i className="icon-search"></i>
                 </div>
              </div>
              <LargeScreen>
                <ul className="col-auto order-status">
                  <li>
                    <Link to="#" value={"under processing"} text={translate("setting.orders.filter.underPro")} onClick={() => this.handleFilter("under")} icon="icon-time" isReverseOrder/>
                  </li>
                  <li>
                    <Link  to="#" value={"shipped"} text={translate("setting.orders.filter.shipped")} onClick={() => this.handleFilter("shipped")} icon="icon-shipping" isReverseOrder/>
                  </li>
                  <li>
                    <Link to="#" value={"Canceled"} text={"Canceled"} onClick={() => this.handleFilter("Canceled")} icon="icon-clear" isReverseOrder/>
                  </li>
                  <li>
                    <Link to="#" value={"Returned"} text={"Returned"} onClick={() => this.handleFilter("Returned")} icon="icon-return" isReverseOrder/>
                  </li>
                </ul>
              </LargeScreen>
            </div>
            <LargeScreen>
              <div className="row">
                <div className="col">
                  <div className="filter-result">
                    <ul className="list-inline">
                      <li>ID: 0003 <a href="#"><i class="icon-close"></i></a></li>
                      <li>Shipped Orders <a href="#"><i class="icon-close"></i></a></li>
                    </ul>
                    <a class="btn btn-gray">Clear All</a>
                  </div>
                </div>
              </div>
            </LargeScreen>
            <div className="row">
              <div className="col">
                <div className="table-responsive">
                  <Table
                    className="data"
                    headers={headers}
                    columns={this.state.mockItems}
                    search={this.state.search}
                    searchByDate={this.state.searchByDate}
                  />
                </div>

              </div>
            </div>
            <div className="border rounded card">


            </div>
          </div>
      </Fragment>
    )
  }
}

// <input className="form-control" placeholder={translate("setting.orders.filter.input")} value={this.state.orderNum} onChange={this.handleChange} />
// <Select defaultValue={options[0]} options={options} onChange={this.handleSelectChange} />

Orders = reduxForm({
  form: 'Orders'
})(Orders)

export default withRouter(Orders);
