import React, { Component, Fragment } from 'react'
import ListGroupCollapse from '../../UI/ListGroupCollapse';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { PENDING } from '../../../constants';
import { LargeScreen } from '../../Device';

export class PendingRequest extends Component {

    render() {
        const { translate, currentLanguage, pendings } = this.props
        const created = moment(pendings.created).format('MMM Do');
        let ids = [];

        pendings.quotationItems.forEach(quotationItem => ids.push(quotationItem.id));

        return <li key={pendings.id}>
                <Link
                to="#"
                className="collapsed"
                data-toggle="collapse"
                data-target={`.${pendings.id}`}
                aria-expanded="false"
                aria-controls={ids.join(' ')}>
                <LargeScreen>
                    <div className="col-lg-auto">
                        <label>{translate("quotationRequest.requestNo")}</label>
                        <p>#{pendings.id}</p>
                    </div>
                </LargeScreen>
                <div className="col-lg">
                    <p>Ford Focus 2015</p>
                    <span className="details-toggle"><i className="icon-"></i></span>
                </div>
                <div className="col-lg-auto r-info">
                    <p className="date"><span>{translate("quotationRequest.sent")}</span> {created}</p>
                    <p>{translate("quotationRequest.itemsQuantity")}:  {pendings.quotationItems.length}</p>
                </div>
            </Link>
            {
                pendings.quotationItems.map(quotationItem => {
                    return <ListGroupCollapse
                        requestNumber={pendings.id}
                        key={quotationItem.id}
                        type={PENDING}
                        quotationItem={quotationItem}
                        translate={translate}
                        currentLanguage={currentLanguage} />
                })
            }
        </li>
    }
}

export default PendingRequest
