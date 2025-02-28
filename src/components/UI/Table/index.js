import React, { Component } from 'react';
import propTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import * as constant from '../../../constants';
import Radio from '../Radio';

class Table extends Component {
 render() {
  const { headers, columns } = this.props;
  const keys = columns ? Object.keys(columns[0]) : [];
  const renderRadioButton = (idx) => (
   this.props.hasRadioButton && <td>
    <Radio value={idx} name={this.props.radioName} onChange={this.props.onSelecteRadioButton} checked={idx === this.props.radioButton} />
   </td>
  )

  const renderColums = (column, idx) => {
   const dateNow = moment();
   const past = moment(column.date, 'MM/DD/YYYY');
   const dateDiff = dateNow.diff(past, 'months');

   if (!_.isEmpty(this.props.search) && this.props.search !== 'all') {
    const findString = this.props.search.toLowerCase();
    let elements = {};
    if ((this.props.searchByDate && dateDiff <= parseInt(findString, constant.RADIX)) ||
     column.orderNum.includes(findString) ||
     column.status.toLowerCase().includes(findString)) elements = column;
    return keys.map((key, keyId) => {
      if(elements[key] === "Shipped"){
        return <td key={keyId} className="icon-shipping icon">{elements[key]}</td>
      }else if(elements[key] === "Canceled"){
        return <td key={keyId} className="icon-clear icon">{elements[key]}</td>
      }else if(elements[key] === "Under processing"){
        return <td key={keyId} className="icon-time icon">{elements[key]}</td>
      }else if(elements[key] === "Returned"){
        return <td key={keyId} className="icon-return icon">{elements[key]}</td>
      }
      return <td key={keyId}>{elements[key]}</td>

    }
    )
   }
  };

  return (
   <table className={this.props.className}>
    <thead>
     <tr>
      {headers.map((header, idx) => {
       return <th key={idx}>{header}</th>
      })}
     </tr>
    </thead>
    <tbody>
     {
      columns && columns.map((column, idx) => {
       return (
        <tr key={idx}>
         {renderRadioButton(idx)}
         {renderColums(column, idx)}
        </tr>
       )
      })
     }
    </tbody>
   </table>
  )
 }
}

Table.propTypes = {
 columns: propTypes.arrayOf(propTypes.shape({
  status: propTypes.string,
  created: propTypes.string,
 })).isRequired
}

Table.defaultProps = {
 className: "table"
}

export default Table;
