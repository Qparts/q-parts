import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class CustomerService extends Component {

    render() {
        return (
            <Link to="//wa.me/966508448856/" target="_blank" className="media chat-div">
                <img src="/img/whatsapp-logo.svg" alt="whatsapp" />
                <div className="media-body">
                    <p>
                        <span>{this.props.messages[0]}</span>
                        {this.props.messages[1]}
                    </p>
                </div>
            </Link>
        )
    }
}

export default CustomerService
