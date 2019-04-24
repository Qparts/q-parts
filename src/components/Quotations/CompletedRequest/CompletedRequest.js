import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';
import ListGroupCollapse from '../../UI/ListGroupCollapse';
import { REPLIED } from '../../../constants';
import { LargeScreen, DownLargeScreen } from '../../Device';
import { getVehicleVin, getVehicleInfo, getRegion, getCity } from '../../../utils/components';
import { getCountry } from '../../../utils/api';
import { getTranslatedObject } from '../../../utils';

export class CompletedRequest extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shippingInfo: getRegion(props.regions, props.reply.cityId),
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
        let city = getCity(this.state.shippingInfo.cities, this.props.reply.cityId);

        this.setState({
            city: getTranslatedObject(city, this.props.currentLanguage, 'name', 'nameAr')
        });
    }

    getRegion = () => {
        this.setState({
            region: getTranslatedObject(this.state.shippingInfo, this.props.currentLanguage, 'name', 'nameAr')
        })
    }

    addToCart = (item) => {
        this.props.addToCart(item);
    }


    render() {
        const { reply, translate, currentLanguage, incrementQuantity, decrementQuantity, token, direction, vehicles } = this.props;
        const { country, city, region } = this.state;
        const created = moment(reply.created).format('MMM Do');
        let ids = [];
        let hasShippingInfo = (country && region && city);

        reply.quotationItems.forEach(quotationItem => ids.push(quotationItem.id));

        return <li key={reply.id}>
            <Link
                to="#"
                className="collapsed new"
                data-toggle="collapse"
                data-target={`.${reply.id}`}
                aria-expanded="false"
                aria-controls={ids.join(' ')}>
                <LargeScreen>
                    <div className="col-lg-auto">
                        <label>{translate("quotationRequest.requestNo")}</label>
                        <p>#{reply.id}</p>
                    </div>
                </LargeScreen>
                <div className="col-lg">
                    {
                        getVehicleInfo(vehicles, reply.customerVehicleId, currentLanguage) && (
                            <p>{getVehicleInfo(vehicles, reply.customerVehicleId, currentLanguage)}</p>
                        )
                    }
                    <span className="details-toggle"><i className="icon-"></i></span>
                </div>
                <div className="col-lg-auto r-info">
                    <p className="date"><span>{translate("quotationRequest.sent")}</span> {created} </p>
                    <p>{translate("quotationRequest.itemsQuantity")}:  {reply.quotationItems.length}</p>
                </div>
            </Link>
            <div className={`collapse ${reply.id}`} id={reply.id}>
                <artical className="request-details" >
                    <ul className="list-inline vehicle-info">
                        {
                            getVehicleVin(vehicles, reply.customerVehicleId) && (
                                <li><i className="icon-vehicle"></i> {translate("general.vin")}: ({getVehicleVin(vehicles, reply.customerVehicleId)})</li>
                            )
                        }
                        <DownLargeScreen>
                            <li className="r-id-small">
                                <label>{translate("quotationRequest.requestNo")}</label> #{reply.id}
                            </li>
                        </DownLargeScreen>
                        {
                            <li className="ship-info"><i className={hasShippingInfo ? 'icon-location' : ''}></i> {hasShippingInfo ? `${country}, ${region}, ${city}` : ''}</li>
                        }
                    </ul>
                    <ul className="replayed-parts-list ">
                        {
                            reply.quotationItems.map(quotationItem => {
                                return <ListGroupCollapse
                                    requestNumber={reply.id}
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
