import React, { Component } from 'react';
import propTypes from 'prop-types';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';
import _ from 'lodash';
import moment from 'moment';
import * as constant from '../../../constants';

class Table extends Component {
 render() {
  const { headers, columns } = this.props;
  const keys = columns ? Object.keys(columns[0]) : [];
  const renderRadioButton = (idx) => (
   this.props.hasRadioButton && <td>
    <RadioButton value={idx} name={this.props.radioName} onChange={this.props.onSelecteRadioButton} checked={idx === this.props.radioButton} />
   </td>
  )

  const renderColums = (column, idx) => {
   const dateNow = moment();
   const past = moment(column.date);
   const dateDiff = dateNow.diff(past, 'months');

   if (!_.isEmpty(this.props.search) && this.props.search !== 'all') {
    const findString = this.props.search.toLowerCase();
    let elements = {};
    if ((this.props.searchByDate && dateDiff <= parseInt(findString, constant.RADIX)) ||
     column.orderNum.includes(findString) ||
     column.status.toLowerCase().includes(findString)) elements = column;
    return keys.map((key, keyId) => elements[key] && <td key={keyId}>{elements[key]}</td>
    )
   } else {
    return keys.map((element, keyId) => column[element] && <td key={keyId}>{column[element]}</td>
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