import React, { Component, Fragment } from 'react';
import Button from '../UI/Button';
import { right } from '../../utils';

class OrderSummary extends Component {
    render() {
        const { translate } = this.props;
        const renderHeader = !this.props.removeHeader && <div className="order-summary__header">

            <div>
                <h5 className="card-title">{translate("orderSummary.title")}</h5>
            </div>
            <div>
                <span className="card-subtitle mb-2 order-summary__text-muted">3 {translate("orderSummary.itemsAmount")}</span>
            </div>
            <div className="h-seperator" />
        </div>
        return (
            <section id="order-summary" className={this.props.col}>
                <div className="border card card-body">
                    {renderHeader}
                    <div className="order-summary__details">
                        <span className="item-key">{translate("orderSummary.subtotal")}</span>
                        <span className="item-value">
                            2000
                            <span>SR</span>
                        </span>
                        <div className="h-seperator" />
                        <span className="item-key">{translate("orderSummary.shippingCost")}</span>
                        <span className="item-value">
                            50
                            <span>SR</span>
                        </span>
                        <div style={styles.secondSperator} className="h-seperator" />
                        <span className="item-key">{translate("orderSummary.total")}</span>
                        <span className="item-value">
                            2050
                            <span>SR</span>
                        </span>
                    </div>
                </div>
                {
                    this.props.isDelivery && <Fragment>
                        <Button
                            type="submit"
                            className={this.props.className}
                            text={this.props.submitButton}
                            icon={`icon-arrow-${right('rtl')}`} />
                    </Fragment>
                }
            </section>
        )
    }
}

const styles = {
    secondSperator: {
        marginTop: '16px'
    }
}

OrderSummary.defaultProps = {
    className: 'btn btn-primary'
}

export default OrderSummary;
