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

import { SmallScreen, MediumScreen } from '../../components/Device/index.js';

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
        <Button key={0} value={0} text={this.props.translate("setting.orders.table.buttons.details")} className="btn btn-light" onClick={this.handleDetails} icon="icon-add" isReverseOrder/>,
      ]
    }, {
      orderNum: '0002',
      date: '1/15/2018',
      quantity: 2,
      price: "200 SR",
      status: "Shipped",
      actions: [
        <Button key={0} value={1} text={this.props.translate("setting.orders.table.buttons.details")} className="btn btn-light" onClick={this.handleDetails} icon="icon-add" isReverseOrder/>,
      ]
    }, {
      orderNum: '0003',
      date: '6/15/2018',
      quantity: 2,
      price: "200 SR",
      status: "Under processing",
      actions: [
        <Button key={0} value={2} text={this.props.translate("setting.orders.table.buttons.details")} className="btn btn-light" onClick={this.handleDetails} icon="icon-add" isReverseOrder/>,
      ]
    }, {
      orderNum: '0003',
      date: '6/15/2018',
      quantity: 2,
      price: "200 SR",
      status: "Under processing",
      actions: [
        <Button key={0} value={2} text={this.props.translate("setting.orders.table.buttons.details")} className="btn btn-light" onClick={this.handleDetails} icon="icon-add" isReverseOrder/>,
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
        <MediumScreen>
          <div id="Orders-container">
            <div className="border rounded card">
              <div className="Orders-search justify-content-between col-12">
                <div style={{display:'flex'}}>
                  <div className="col-12">
                    <Field
                      name="search-option"
                      component={SelectInput}
                      options={options}
                      placeholder="Select Date"
                       onChange={this.handleSelectChange}/>
                  </div>
                  <div id="search" className="col-1">
                  	<input type="search" onChange={this.handleChange} value={this.state.orderNum}/>
                  </div>
                </div>
                <div className="btn-div">
                  <Link to="#" value={"under processing"} text={translate("setting.orders.filter.underPro")} className="btn btn-light" onClick={() => this.handleFilter("under")} icon="icon-time" isReverseOrder/>
                  <span className="seperator"></span>
                  <Link  to="#" value={"shipped"} text={translate("setting.orders.filter.shipped")} className="btn btn-light" onClick={() => this.handleFilter("shipped")} icon="icon-shipping" isReverseOrder/>
                  <span className="seperator"></span>
                  <Link to="#" value={"Canceled"} text={"Canceled"} className="btn btn-light" onClick={() => this.handleFilter("Canceled")} icon="icon-clear" isReverseOrder/>
                  <span className="seperator"></span>
                  <Link to="#" value={"Returned"} text={"Returned"} className="btn btn-light" onClick={() => this.handleFilter("Returned")} icon="icon-return" isReverseOrder/>
                </div>
              </div>
              <span className="seperator"></span>
              <Table
                headers={headers}
                columns={this.state.mockItems}
                search={this.state.search}
                searchByDate={this.state.searchByDate}
              />
            </div>
          </div>
        </MediumScreen>
        <SmallScreen>
          <div className="col-12" id="Orders-container-mobile">
            <div className="border rounded card">
              <div className="Orders-search justify-content-between row">
                <div style={{display:'flex'}} className="col-12">
                  <div className="col-9">
                    <Field
                      name="search-option"
                      component={SelectInput}
                      options={options}
                      placeholder="Select Date"
                       onChange={this.handleSelectChange}/>
                  </div>
                  <div id="search" className="col-3">
                  	<input type="search" onChange={this.handleChange} value={this.state.orderNum}/>
                  </div>
                </div>
                <div className="btn-div col-12">
                  <Link to="#" value={"under processing"} text={translate("setting.orders.filter.underPro")} className="btn btn-light col-6" onClick={() => this.handleFilter("under")} icon="icon-time" isReverseOrder/>
                  <Link  to="#" value={"shipped"} text={translate("setting.orders.filter.shipped")} className="btn btn-light col-6" onClick={() => this.handleFilter("shipped")} icon="icon-shipping" isReverseOrder/>
                </div>
                <div className="btn-div col-12">
                  <Link to="#" value={"Canceled"} text={"Canceled"} className="btn btn-light col-6" onClick={() => this.handleFilter("Canceled")} icon="icon-clear" isReverseOrder/>
                  <Link to="#" value={"Returned"} text={"Returned"} className="btn btn-light col-6" onClick={() => this.handleFilter("Returned")} icon="icon-return" isReverseOrder/>
                </div>
              </div>
              <span className="seperator"></span>
              <Table
                headers={headers}
                columns={this.state.mockItems}
                search={this.state.search}
                searchByDate={this.state.searchByDate}
              />
            </div>
          </div>
        </SmallScreen>
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
