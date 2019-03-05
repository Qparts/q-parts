import React, { Component } from 'react'

export class Title extends Component {
    render() {
        const { header, subHeader, caption, number } = this.props;

        const words = header.split(' ');
        const rest = words.slice(1);
        return (
            <header className="sec-header">
                <h1>
                    <p>{number ? `${number} ${words[0]}` : words[0]}</p>
                    {rest.join(' ')}
                </h1>
                <span>{subHeader} <span>{caption}</span></span>
            </header>
        )
    }
}

export default Title
