import React, { Component } from 'react';
import { Map, Marker } from 'google-maps-react'
import { parseGoogleResponse } from '../../utils';
import Button from '../../components/UI/Button';

import './Autocomplete.css'

class Autocomplete extends Component {
  constructor(props) {
    super(props);

    const { latitude, longitude } = this.props.country;
    this.state = {
      position: null,
      initialCenter: {
        lat: latitude,
        lng: longitude
      },
      markerPosition: null,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      hasChossenLocation: true
    };
  }

  componentDidMount() {
    this.renderAutoComplete();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps.map) this.renderAutoComplete();
  }

  onSubmit(e) {
    e.preventDefault();
  }

  renderAutoComplete() {
    const { google, map } = this.props;

    if (!google || !map) return;

    const autocomplete = new google.maps.places.Autocomplete(this.autocomplete);
    autocomplete.bindTo('bounds', map);

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) return;

      if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
      else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      const geocoder = new google.maps.Geocoder();
      let newAddress = {};
      geocoder.geocode({ 'location': place.geometry.location }, (result, status) => {
        if (status === 'OK') {
          newAddress = parseGoogleResponse(result[0]);
          this.props.confirmUserAddress(newAddress)
        }
      });

      this.setState({ markerPosition: null, position: place.geometry.location, hasChossenLocation: false });
    });
  }

  onMapClicked = (props, marker, e) => {
    const { google } = this.props;
    const geocoder = new google.maps.Geocoder();
    let newAddress = {};
    geocoder.geocode({ 'location': e.latLng }, (result, status) => {
      if (status === 'OK') {
        newAddress = parseGoogleResponse(result[0]);
        this.props.confirmUserAddress(newAddress)
      }
    });
    this.setState({ markerPosition: e.latLng, hasChossenLocation: false })

  }

  render() {
    const { markerPosition, position, initialCenter, hasChossenLocation } = this.state;

    return (
      <div>
        <div>
          <input
            className="Autocomplete-input"
            placeholder={this.props.translate("autocomplete.buttons.placeholder")}
            ref={ref => (this.autocomplete = ref)}
            type="text"
          />

          <Button
            className="btn btn-secondary"
            type="submit"
            text={this.props.translate("autocomplete.buttons.continue")}
            onClick={this.props.onAddressSelected} disabled={hasChossenLocation} />
        </div>

        <div>
          <Map
            {...this.props}
            zoom={this.props.country.mapZoom}
            initialCenter={initialCenter}
            center={position}
            onClick={this.onMapClicked}
            containerStyle={{
              height: '100vh',
              position: 'relative',
              width: '100%'
            }}>
            {
              (markerPosition || position) && <Marker position={markerPosition || position} />
            }
          </Map>
        </div>
      </div>
    );
  }
}

export default Autocomplete;