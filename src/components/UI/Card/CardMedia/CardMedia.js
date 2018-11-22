import React, { Component, Fragment } from 'react'

const img = 'img';


export class CardMedia extends Component {

    renderComponent = () => {
        const { image, alt, className } = this.props
        switch (this.props.component) {
            case img:

                return <img className={this.className} src={image} alt={alt} />

            default:
                break;
        }
    }

    render() {
        return (
            <Fragment>
                {this.renderComponent()}
            </Fragment>
        )
    }
}

export default CardMedia
