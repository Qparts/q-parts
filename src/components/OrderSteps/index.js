import React, { Component } from 'react'

export class OrderSteps extends Component {
    static defaultProps = {
        grey: ''
    }

    render() {
        const { grey } = this.props;
        const styles = {
            greyImage: {
                color: grey ? '#a9a9ab' : null
            }
        }
        return (
            <ul className=" order-steps list-unstyled row">
                <li className="col-lg-3">
                    <figure>
                        <div className="position-relative">
                            <div className="figure request"><img src="/img/request.svg" alt="request" /></div>
                            <span><i className="icon-arrow-right"></i></span>
                        </div>
                        <figcaption>
                            <h3>Request</h3>
                            <p>Fill in your vehicle data and the <span>parts you want</span></p>
                        </figcaption>
                        <i className="icon-arrow-down"></i>
                    </figure>
                </li>
                <li style={styles.greyImage} className="col-lg-3">
                    <figure>
                        <div className="position-relative">
                            <span></span>
                            <div className="figure price"><img src={`/img/check-price${grey}.svg`} alt="check-price" /></div>
                            <span><i className="icon-arrow-right"></i></span>
                        </div>
                        <figcaption>
                            <h3>Check Price</h3>
                            <p>The price will deliver to you <span>within 24 hours</span></p>
                        </figcaption>
                    </figure>
                    <i className="icon-arrow-down"></i>
                </li>
                <li style={styles.greyImage} className="col-lg-3">
                    <figure>
                        <div className="position-relative">
                            <span></span>
                            <div className="figure cart"><img src={`/img/add-to-cart${grey}.svg`} alt="add-to-cart" /></div>
                            <span><i className="icon-checked"></i></span>
                        </div>
                        <figcaption>
                            <h3>Add To Cart</h3>
                            <p>choose Sipping Address <span>and payment method</span></p>
                        </figcaption>
                    </figure>
                    <i className="icon-checked done-xs"></i>
                </li>
                <li style={styles.greyImage} className="col-lg-3">
                    <figure>
                        <div className="position-relative">
                            <span></span>
                            <div className="figure delivery"><img src={`/img/delivery-product${grey}.svg`} alt="delivery-product" /></div>
                        </div>
                        <figcaption>
                            <h3>Receive Order</h3>
                            <p>Your order for your workshop or <span>anywher you love</span></p>
                        </figcaption>
                    </figure>
                </li>
            </ul>

        )
    }
}

export default OrderSteps
