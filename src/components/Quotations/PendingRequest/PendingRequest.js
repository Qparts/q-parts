import React, { Component } from 'react'
import ListGroupCollapse from '../../UI/ListGroupCollapse';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { PENDING } from '../../../constants';
import { LargeScreen, DownLargeScreen } from '../../Device';
import { getVehicleInfo, getVehicleVin, getRegion, getCity } from '../../../utils/components';
import { getCountry } from '../../../utils/api';
import { getTranslatedObject } from '../../../utils';

export class PendingRequest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shippingInfo: getRegion(props.regions, props.list.cityId),
            region: null,
            country: null,
            city: null
        }
    }

    componentDidMount = async () => {
        await this.getRegion();
        await this.getCountry().then(res => this.setState({ country: res }));
        await this.getCity();
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevProps.currentLanguage !== this.props.currentLanguage) {
            await this.getRegion();
            await this.getCountry().then(res => this.setState({ country: res }));
            await this.getCity();
        }
    }



    getCountry = async () => {
        let country = await getCountry(this.state.shippingInfo.countryId);

        return getTranslatedObject(country.data, this.props.currentLanguage, 'name', 'nameAr');
    }

    getCity = () => {
        let city = getCity(this.state.shippingInfo.cities, this.props.list.cityId);

        this.setState({
            city: getTranslatedObject(city, this.props.currentLanguage, 'name', 'nameAr')
        });
    }

    getRegion = () => {
        this.setState({
            region: getTranslatedObject(this.state.shippingInfo, this.props.currentLanguage, 'name', 'nameAr')
        })
    }

    render() {
        const { translate, currentLanguage, list, vehicles } = this.props
        const { country, city, region } = this.state;
        const created = moment(list.created).format('MMM Do');
        let ids = [];
        let hasShippingInfo = (country && region && city);

        list.quotationItems.forEach(quotationItem => ids.push(quotationItem.id));

        return <li key={list.id}>
            <Link
                to="#"
                className="collapsed"
                data-toggle="collapse"
                data-target={`.${list.id}`}
                aria-expanded="false"
                aria-controls={ids.join(' ')}>
                <LargeScreen>
                    <div className="col-lg-auto">
                        <label>{translate("quotationRequest.requestNo")}</label>
                        <p>#{list.id}</p>
                    </div>
                </LargeScreen>
                <div className="col-lg">
                    {
                        getVehicleInfo(vehicles, list.customerVehicleId, currentLanguage) && (
                            <p>{getVehicleInfo(vehicles, list.customerVehicleId, currentLanguage)}</p>
                        )
                    }
                    <span className="details-toggle"><i className="icon-"></i></span>
                </div>
                <div className="col-lg-auto r-info">
                    <p className="date"><span>{translate("quotationRequest.sent")}</span> {created}</p>
                    <p>{translate("quotationRequest.itemsQuantity")}:  {list.quotationItems.length}</p>
                </div>
            </Link>
            <div className={`collapse ${list.id}`} id={list.id}>
                <article className="request-details" >
                    <ul className="list-inline vehicle-info">
                        {
                            getVehicleVin(vehicles, list.customerVehicleId) && (
                                <li><i className="icon-vehicle"></i> {translate("general.vin")}: ({getVehicleVin(vehicles, list.customerVehicleId)})</li>
                            )
                        }
                        <DownLargeScreen>
                            <li className="r-id-small">
                                <label>{translate("quotationRequest.requestNo")}</label> #{list.id}
                            </li>
                        </DownLargeScreen>
                        {
                            <li className="ship-info"><i className={hasShippingInfo ? 'icon-location' : ''}></i> {hasShippingInfo ? `${country}, ${region}, ${city}` : ''}</li>
                        }
                    </ul>
                    <div className="parts-list">
                        <ul className="d-table list-unstyled">
                            <li className="d-table-row">
                                <div className="d-table-cell">{translate("quotationRequest.name")}</div>
                                <div className="d-table-cell">{translate("quotationRequest.quantity")}</div>
                            </li>
                            {
                                list.quotationItems.map(quotationItem => {
                                    return <ListGroupCollapse
                                        requestNumber={list.id}
                                        key={quotationItem.id}
                                        type={PENDING}
                                        quotationItem={quotationItem}
                                        translate={translate}
                                        currentLanguage={currentLanguage} />
                                })
                            }
                        </ul>
                    </div>
                </article>
                {
                  list.comments.length !== 0 &&
                  <article className="request-comments">
                      <div className="parts-list">
                          <ul className="d-table list-unstyled">
                              <li className="d-table-row">
                                  <div className="d-table-cell">{translate("quotationRequest.comment")}</div>
                              </li>
                              {
                                list.comments.map((comment,idx) =>(
                                  <li className="d-table-row" key={idx}>
                                      <div className="d-table-cell">{comment.text}</div>
                                  </li>
                                ))
                              }
                          </ul>
                      </div>
                  </article>
                }
            </div>
        </li>
    }
}

export default PendingRequest
