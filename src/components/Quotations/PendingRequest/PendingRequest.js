import React, { Component, Fragment } from 'react'
import ListGroupCollapse from '../../UI/ListGroupCollapse';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { PENDING } from '../../../constants';

export class PendingRequest extends Component {

    render() {
        const { translate, currentLanguage, pendings } = this.props
        const created = moment(pendings.created).format('MMM Do');
        let ids = [];
        
        pendings.quotationItems.forEach(quotationItem => ids.push(quotationItem.id));

        return <Fragment key={pendings.id}>
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
                            <h4>#{pendings.id}</h4>
                        </div>
                        <figcaption className="col-9">
                            <div className="row">
                                <div className="col-md-9 item-dis">
                                </div>
                                <div className="col-md-3">
                                    <p>{translate("quotationRequest.sent")} <span>{created}</span></p>
                                    <p>{translate("quotationRequest.itemsQuantity")}: <span>{pendings.quotationItems.length}</span></p>
                                </div>
                            </div>
                        </figcaption>
                    </figure>
                </li>
            </Link>
            {
                pendings.quotationItems.map(quotationItem => {
                    return <ListGroupCollapse
                        key={quotationItem.id}
                        type={PENDING}
                        quotationItem={quotationItem}
                        translate={translate}
                        currentLanguage={currentLanguage} />
                })
            }
        </Fragment>
    }
}

export default PendingRequest
