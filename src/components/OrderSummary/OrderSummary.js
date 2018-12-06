import React, { Component, Fragment } from 'react';
import Button from '../UI/Button';

// import './OrderSummary.css';

class OrderSummary extends Component {
    render() {
        const { translate } = this.props;
        const renderHeader = !this.props.removeHeader && <div className="order-summary__header">
            <h5 className="card-title">{translate("orderSummary.title")}</h5>
            <span className="card-subtitle mb-2 order-summary__text-muted">3 {translate("orderSummary.itemsAmount")}</span>
            <div className="h-seperator" />
        </div>
        return (
            <section id="order-summary" className={this.props.col}>
                <div className="border card card-body">
                    {renderHeader}
                    <div className="order-summary__details">
                        <span className="item-key">{translate("orderSummary.subtotal")}</span>
                        <span className="item-value">2000 SR</span>
                        <div className="h-seperator" />
                        <span className="item-key">{translate("orderSummary.shippingCost")}</span>
                        <span className="item-value">50 SR</span>
                        <div style={styles.secondSperator} className="h-seperator" />
                        <span className="item-key">{translate("orderSummary.total")}</span>
                        <span className="item-value">2050 SR</span>
                    </div>
                </div>
                {
                    this.props.isDelivery && <Fragment>
                        <Button 
                        type="submit" 
                        className={this.props.className} 
                        text={this.props.submitButton} 
                        icon="icon-arrow-right"/>
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
    className: 'btn-primary'
}

export default OrderSummary;