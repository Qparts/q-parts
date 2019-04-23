import React, { Component, Fragment } from 'react'
import ListGroupCollapse from '../../UI/ListGroupCollapse';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { PENDING } from '../../../constants';
import { LargeScreen, DownLargeScreen } from '../../Device';
import { getVehicleInfo, getVehicleVin } from '../../../utils/components';

export class PendingRequest extends Component {

    render() {
        const { translate, currentLanguage, pendings, vehicles } = this.props
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
                    {
                        getVehicleInfo(vehicles, pendings.customerVehicleId, currentLanguage) && (
                            <p>{getVehicleInfo(vehicles, pendings.customerVehicleId, currentLanguage)}</p>
                        )
                    }
                    <span className="details-toggle"><i className="icon-"></i></span>
                </div>
                <div className="col-lg-auto r-info">
                    <p className="date"><span>{translate("quotationRequest.sent")}</span> {created}</p>
                    <p>{translate("quotationRequest.itemsQuantity")}:  {pendings.quotationItems.length}</p>
                </div>
            </Link>
            <div className={`collapse ${pendings.id}`} id={pendings.id}>
                <artical className="request-details" >
                    <ul className="list-inline vehicle-info">
                        {
                            getVehicleVin(vehicles, pendings.customerVehicleId) && (
                                <li><i className="icon-vehicle"></i> {translate("general.vin")}: ({getVehicleVin(vehicles, pendings.customerVehicleId)})</li>
                            )
                        }
                        <DownLargeScreen>
                            <li className="r-id-small">
                                <label>{translate("quotationRequest.requestNo")}</label> #{pendings.id}
                            </li>
                        </DownLargeScreen>
                        <li className="ship-info"><i className="icon-location"></i> KSA, Jeddah, Jeddah</li>
                    </ul>
                    <div className="parts-list">
                        <ul className="d-table list-unstyled">
                            <li className="d-table-row">
                                <div className="d-table-cell">{translate("quotationRequest.name")}</div>
                                <div className="d-table-cell">{translate("quotationRequest.quantity")}</div>
                            </li>
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
                        </ul>
                    </div>
                </artical>
            </div>
        </li>
    }
}

export default PendingRequest
