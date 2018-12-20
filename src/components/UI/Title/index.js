import React, { Component } from 'react'

export class Title extends Component {
    render() {
        const { header, subHeader } = this.props;

        const words = header.split(' ');
        const rest = words.slice(1);
        return (
            <div id="title">
                <h1>
                    <span>{words[0]} </span>
                    {rest.join(' ')}
                </h1>
                <div className="d-inline-flex align-items-baseline">
                    <span className="red-line" />
                    <p>
                        {subHeader}
                    </p>
                </div>
            </div>
        )
    }
}

export default Title
