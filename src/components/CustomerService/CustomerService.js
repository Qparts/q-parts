import React, { Component } from 'react'

export class CustomerService extends Component {

    render() {
        return (
            <div className="d-flex flex-row" id="customer-service">
                <img className="whatsapp" src="/img/whatsapp-logo.svg" alt="whatsapp" />
                <div>
                    {
                        this.props.messages.map(message => (
                            <span>{message}</span>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default CustomerService
