import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import ListGroupCollapse from '../../UI/ListGroupCollapse';
import { REPLIED } from '../../../constants';
import { LargeScreen, DownLargeScreen } from '../../Device';

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

        return <li key={replies.id}>
            <Link
                to="#"
                className="collapsed new"
                data-toggle="collapse"
                data-target={`.${replies.id}`}
                aria-expanded="false"
                aria-controls={ids.join(' ')}>
                <LargeScreen>
                    <div className="col-lg-auto">
                        <label>{translate("quotationRequest.requestNo")}</label>
                        <p>#{replies.id}</p>
                    </div>
                </LargeScreen>
                <div className="col-lg">
                    <p>Ford Focus 2015</p>
                    <span className="details-toggle"><i className="icon-"></i></span>
                </div>
                <div className="col-lg-auto r-info">
                    <p className="date"><span>{translate("quotationRequest.sent")}</span> {created} <span>Replied</span> Jul 30</p>
                    <p>{translate("quotationRequest.itemsQuantity")}:  {replies.quotationItems.length}</p>
                </div>
            </Link>
            <div className={`collapse ${replies.id}`} id={replies.id}>
                <artical className="request-details" >
                    <ul className="list-inline vehicle-info">
                        <li><i className="icon-vehicle"></i> VIN Num: (000 000 000 000 11)</li>
                        <DownLargeScreen>
                            <li className="r-id-small">
                                <label>{translate("quotationRequest.name")}</label> {replies.id}
                            </li>
                        </DownLargeScreen>
                        <li className="ship-info"><i className="icon-location"></i> KSA, Jeddah, Jeddah</li>
                    </ul>
                    <ul className="replayed-parts-list ">
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

                    </ul>
                </artical>
            </div>
        </li>
    }
}


export default CompletedRequest
