import React, { Fragment } from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { classnames } from './helper';
import { parseGoogleResponse } from '../../utils';

import './LocationSearchInput.css';

class LocationSearchInput extends React.Component {
  handleChange = (address) => {
    this.props.input.onChange(address);
  }

  handleSelected = (address) => {
    geocodeByAddress(address)
      .then(results => {
        getLatLng(results[0])
        .then(latLng => console.log('Success', latLng))
      })
      .catch(error => console.error(error))
    this.props.input.onChange(address);
  }

  render() {
    return (
      <Fragment>
        <PlacesAutocomplete
          {...this.props}
          value={this.props.input.value}
          onChange={this.handleChange}
          onBlur={this.handleChange}
          onSelect={this.handleSelected}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input'
                })}
              />
              <div className="autocomplete-dropdown-container">
                {suggestions.map(suggestion => {
                  const className = classnames('suggestion-item', {
                    'suggestion-item--active': suggestion.active
                  });
                  var options = { types: ['address'], className };
                  return (
                    <div {...getSuggestionItemProps(suggestion, options)}>
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
        <div>{this.props.meta.touched && this.props.meta.error}</div>
      </Fragment>
    );
  }
}

export default LocationSearchInput;