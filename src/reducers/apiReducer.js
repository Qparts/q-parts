import { initialState } from '../initialState/apiInitialState';

import {
  GET_COUNTRY_SUCCEEDED, GET_COUNTRIES_SUCCEEDED, GET_COUNTRIES_REGIONS_SUCCEEDED, GET_VEHICLE_SUCCEEDED,
  FIND_CITY_SUCCEEDED, GET_REGIONS_SUCCEEDED, GET_RECENTLY_VIEWED, GET_RECOMMENDATION, GET_SORTED_PRODUCTS, GET_PRODUCT
} from '../actions/apiAction';


export default function reducer(state = initialState, action) {
  switch (action.type) {

    case GET_COUNTRY_SUCCEEDED:
      return { ...state, country: action.payload }

    case GET_COUNTRIES_REGIONS_SUCCEEDED:
      const newCountriesRegions = action.payload.map(country => {
        return { ...country, label: country.nameAr, value: country.id }
      });

      return { ...state, countriesRegions: newCountriesRegions }

    case GET_COUNTRIES_SUCCEEDED:
      const newCountries = action.payload.map(country => {
        return { ...country, label: country.name, value: country.id }
      });

      return { ...state, countries: newCountries }

    case GET_VEHICLE_SUCCEEDED:
      return { ...state, vehicles: action.payload }

    case FIND_CITY_SUCCEEDED:
      return { ...state, city: action.payload[0] }

    case GET_REGIONS_SUCCEEDED:
      return { ...state, regions: action.payload }

    case GET_SORTED_PRODUCTS:
      return { ...state }

    case GET_RECENTLY_VIEWED:
      return { ...state, products: action.payload }

    case GET_RECOMMENDATION:
      return { ...state, products: action.payload }

    case GET_PRODUCT:
      return { ...state, product: action.payload }

    default:
      return state;
  }

}