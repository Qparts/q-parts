import React, { Component } from 'react'
import { right } from '../../utils';

export class OrderSteps extends Component {
    static defaultProps = {
        grey: ''
    }

    render() {
        const { grey, translate, direction } = this.props;
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
                            <span><i className={`icon-arrow-${right(direction)}`}></i></span>
                        </div>
                        <figcaption>
                            <h3>{translate("orderSteps.request.title")}</h3>
                            <p>{translate("orderSteps.request.subtitle")} <span>{translate("orderSteps.request.subtitleSpan")}</span></p>
                        </figcaption>
                        <i className="icon-arrow-down"></i>
                    </figure>
                </li>
                <li style={styles.greyImage} className="col-lg-3">
                    <figure>
                        <div className="position-relative">
                            <span></span>
                            <div className="figure price"><img src={`/img/check-price${grey}.svg`} alt="check-price" /></div>
                            <span><i className={`icon-arrow-${right(direction)}`}></i></span>
                        </div>
                        <figcaption>
                            <h3>{translate("orderSteps.price.title")}</h3>
                            <p>{translate("orderSteps.price.subtitle")} <span>{translate("orderSteps.price.subtitleSpan")}</span></p>
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
                            <h3>{translate("orderSteps.cart.title")}</h3>
                            <p>{translate("orderSteps.cart.subtitle")} <span>{translate("orderSteps.cart.subtitleSpan")}</span></p>
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
                            <h3>{translate("orderSteps.receive.title")}</h3>
                            <p>{translate("orderSteps.receive.subtitle")} <span>{translate("orderSteps.receive.subtitleSpan")}</span></p>
                        </figcaption>
                    </figure>
                </li>
            </ul>

        )
    }
}

export default OrderSteps
