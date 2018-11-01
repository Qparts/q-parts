import React, { Component } from 'react';
import select2 from 'select2'; // eslint-disable-line 
import $ from 'jquery'

class Select extends Component {
    componentDidMount = () => {
        $(this.select).select2({
            minimumResultsForSearch: -1
          });
    }

    handleChange = (event) => {
        console.log(this.props.onChange);
        
    }
    
    render() {
        const { options } = this.props
        return (
            <select className="select" ref={ref => this.select = ref} onChange={this.handleChange}>
                {
                    options.map(option => {
                        return (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        )
                    })
                }
            </select>
        )
    }
}

export default Select;