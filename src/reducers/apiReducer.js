import { initialState } from '../initialState/apiInitialState';

import {
  GET_COUNTRY_SUCCEEDED, GET_COUNTRIES_SUCCEEDED, GET_COUNTRIES_REGIONS_SUCCEEDED, GET_VEHICLE_SUCCEEDED,
  FIND_CITY_SUCCEEDED, GET_REGIONS_SUCCEEDED, GET_RECENTLY_VIEWED, GET_SORTED_PRODUCTS,
  GET_COUNTRIES_ONLY_SUCCEEDED, FLAGE
} from '../actions/apiAction';


export default function reducer(state = initialState, action) {
  switch (action.type) {

    case GET_COUNTRY_SUCCEEDED:
      return { ...state, country: action.payload }

    case GET_COUNTRIES_REGIONS_SUCCEEDED:

      return { ...state, countriesRegions: action.payload }

    case GET_COUNTRIES_SUCCEEDED:

      return { ...state, countries: action.payload }

    case GET_COUNTRIES_ONLY_SUCCEEDED:
      return { ...state, countriesOnly: action.payload.data }

    case GET_VEHICLE_SUCCEEDED:
      return { ...state, vehicles: action.payload }

    case FIND_CITY_SUCCEEDED:
      return { ...state, city: action.payload[0] }

    case GET_REGIONS_SUCCEEDED:
      return { ...state, regions: action.payload.sort() }

    case GET_SORTED_PRODUCTS:
      return { ...state }

    case GET_RECENTLY_VIEWED:
      return { ...state, products: action.payload }
    case FLAGE:
    return { ...state, flage: action.payload }
    default:
      return state;
  }

}
