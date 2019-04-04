import React, {  Component, createRef } from "react";
import Select from "react-select";
import { InputGroup, InputGroupAddon } from "reactstrap"
import { helpers, colors } from "../../constants";
import { StyleSheet, css } from "aphrodite";

export default class SelectInput extends Component {
   constructor(props) {
       super(props)

       this.state = {
           hasFloat: ""
       }
       this.selectRef = createRef();
   }
   componentDidMount = () => {
       if (this.props.input.value) {
           this.setState({
               hasFloat: "on"
           })
       }

   }
   
   getIconClassName = () => {
       return helpers.isSucceed(this.props.meta.error, this.props.meta.touched) ? "icon-checked" : "";
   }
   handleChange = (value) => {
       this.props.input.onChange(value);
       this.handleMenuClose(value);
   }
   handleBlur = (value) => {
       this.selectRef.current.select.blur(value);
       this.props.input.onBlur(value);
   }

   handleMenuOpen = () => {
       this.setState({
           hasFloat: "on"
       })
   }

   handleMenuClose = (value) => {
       const textValue = value || this.props.input.value;
       
       this.handleBlur(textValue);
       if (textValue) {
           this.setState({
               hasFloat: "on"
           })
       } else {
           this.setState({
               hasFloat: ""
           })
       }
   }
   render() {
       const style = StyleSheet.create({
           // border: {
           //     border: helpers.isSucceed(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.success}` :
           //         helpers.isInvalid(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.invalid}` :
           //             helpers.isRequired(this.props.meta.error, this.props.meta.touched) ? `4px solid ${colors.error}` : "none",
           // },
           // icon: {
           //     color: helpers.isSucceed(this.props.meta.error, this.props.meta.touched) ? "#30d576" : "none"
           // }
       });
       return (
               <InputGroup className={`select-input ${this.state.hasFloat}`}>
                   <label>{this.props.label}</label>
                   <Select
                       ref={this.selectRef}
                       className={`select ${css(style.border)}`}
                       classNamePrefix="select"
                       {...this.props}
                       {...this.props.input}
                       indicatorSeparator={false}
                       isSearchable={false}
                       value={this.props.input.value || this.props.defaultValue}
                       onChange={this.handleChange}
                       options={this.props.options}
                       onMenuOpen={this.handleMenuOpen}
                       onMenuClose={this.handleMenuClose}
                       optionClassName="needsclick"
                   />
               </InputGroup>
       );
   }
}
