import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import ListGroupCollapse from '../../UI/ListGroupCollapse';
import { REPLIED } from '../../../constants';

export class CompletedRequest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedProduct: {}
        }
    }

    addToCart = (item) => {
        this.props.addToCart(item);
    }


    render() {
        const { replies, translate, currentLanguage, incrementQuantity, decrementQuantity, token, direction } = this.props
        const created = moment(replies.created).format('MMM Do');
        let ids = [];

        replies.quotationItems.forEach(quotationItem => ids.push(quotationItem.id));


        return <Fragment>
            <Link
                to="#"
                data-toggle="collapse"
                data-target={".multi-collapse"}
                aria-expanded="false"
                aria-controls={ids.join(' ')}>
                <li className="bg-white">
                    <figure className="row">
                        <div className="col-3">
                            <label>{translate("quotationRequest.requestNo")}</label>
                            <h4>#{replies.id}</h4>
                        </div>
                        <figcaption className="col-9">
                            <div className="row">
                                <div className="col-md-9 item-dis">
                                </div>
                                <div className="col-md-3">
                                    <p>{translate("quotationRequest.sent")} <span>{created}</span></p>
                                    <p>{translate("quotationRequest.itemsQuantity")}: <span>{replies.quotationItems.length}</span></p>
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                </li>
            </Link>
            {
                replies.quotationItems.map(quotationItem => {
                    return <ListGroupCollapse
                        requestNumber={replies.id}
                        key={quotationItem.id}
                        type={REPLIED}
                        quotationItem={quotationItem}
                        translate={translate}
                        currentLanguage={currentLanguage}
                        onSelectedProduct={this.setSelectedProduct}
                        incrementQuantity={incrementQuantity}
                        decrementQuantity={decrementQuantity}
                        onAddtoCart={this.addToCart}
                        direction={direction}
                        token={token}
                    />
                })
            }
        </Fragment>
    }
}


export default CompletedRequest
