import axios from 'axios';
import { API_ROOT, VEHICLE_SERVICE, LOCATION_SERVICE, PRODUCT_SERVICE } from '../actions/constants';
import { handleNetworkError } from '../utils';
import { BEST_SELLER, OFFERS } from '../constants';

export const REQUEST_FAILED = 'REQUEST_FAILED';
export const GET_COUNTRY_SUCCEEDED = 'GET_COUNTRY_SUCCEEDED';
export const GET_COUNTRIES_SUCCEEDED = 'GET_COUNTRIES_SUCCEEDED';
export const GET_COUNTRIES_REGIONS_SUCCEEDED = 'GET_COUNTRIES_REGIONS_SUCCEEDED';
export const GET_VEHICLE_SUCCEEDED = 'GET_VEHICLE_SUCCEEDED';
export const FIND_CITY_SUCCEEDED = 'FIND_CITY_SUCCEEDED';
export const GET_REGIONS_SUCCEEDED = 'GET_REGIONS_SUCCEEDED';
export const GET_RECOMMENDATION = 'GET_RECOMMENDATION';
export const GET_PRODUCT = 'GET_PRODUCT';
export const GET_RECENTLY_VIEWED = 'GET_RECENTLY_VIEWED';
export const GET_SORTED_PRODUCTS = 'GET_SORTED_PRODUCTS';
export const UPDATE_APP_VERSION = 'UPDATE_APP_VERSION';

export const getCountry = (countryId) => {
  return (dispatch) => {
    axios.get(`${API_ROOT}${LOCATION_SERVICE}/${countryId}`)
      .then(res => {
        dispatch({
          type: GET_COUNTRY_SUCCEEDED,
          payload: res.data
        })
      }, error => {
        handleNetworkError(dispatch, error);
      })
  }
}

export const getCountries = () => {
  return (dispatch) => {
    axios.get(`${API_ROOT}${LOCATION_SERVICE}`)
      .then(res => {
        dispatch({
          type: GET_COUNTRIES_SUCCEEDED,
          payload: res.data
        })
      }, error => {
        handleNetworkError(dispatch, error);
      })
  }
}

export const getRegions = (countryId) => {
  return (dispatch) => {
    axios.get(`${API_ROOT}${LOCATION_SERVICE}/regions/country-id/${countryId}`)
      .then(res => {
        dispatch({
          type: GET_REGIONS_SUCCEEDED,
          payload: res.data
        })
      }, error => {
        handleNetworkError(dispatch, error);
      })
  }
}

export const getCountriesRegions = () => {
  return (dispatch) => {
    axios.get(`${API_ROOT}${LOCATION_SERVICE}/regions`)
      .then(res => {
        dispatch({
          type: GET_COUNTRIES_REGIONS_SUCCEEDED,
          payload: res.data
        })
      }, error => {
        handleNetworkError(dispatch, error);
      })
  }
}

export const getVehicles = () => {
  return (dispatch) => {

    axios.get(`${API_ROOT}${VEHICLE_SERVICE}/makes`, {
    })
      .then(res => {
        dispatch({ type: GET_VEHICLE_SUCCEEDED, payload: res.data })
      }, error => {
        handleNetworkError(dispatch, error);
      })
  }
}

export const findCity = (city, country) => {
  return (dispatch) => {
    axios.get(`${API_ROOT}${LOCATION_SERVICE}/find-city/name/${city}/country/${country}`)
      .then(res => {
        dispatch({
          type: FIND_CITY_SUCCEEDED,
          payload: res.data
        })
      }, error => {
        handleNetworkError(dispatch, error);
      })
  }
}

export const getOffers = (offerType) => {
  return (dispatch) => {
    if (offerType === BEST_SELLER) {
      return axios.get(`${API_ROOT}${PRODUCT_SERVICE}/best-sellers`)
        .then(res => {
          dispatch({ type: GET_RECOMMENDATION, payload: res.data })
        })

    } else if (offerType === OFFERS) {
      return axios.get(`${API_ROOT}${PRODUCT_SERVICE}/offers`)
        .then(res => {
          dispatch({ type: GET_RECOMMENDATION, payload: res.data })
        })
    }
  }
}

export const getProduct = (productId) => {
  return (dispatch) => {
    return axios.get(`${API_ROOT}${PRODUCT_SERVICE}/product/${productId}`)
      .then(res => {
        dispatch({ type: GET_PRODUCT, payload: res.data })
      })
  }
}

export const getRecentlyViewedProducts = (products) => {
  return {
    type: GET_RECENTLY_VIEWED, payload: products
  }
}

export const getSortedProducts = () => {
  return { type: GET_SORTED_PRODUCTS }
}

export const updateAppVersion = () => {
  return (dispatch) => {
    axios.get(`${API_ROOT}/app-version`)
      .then(res => {
        dispatch({
          type: UPDATE_APP_VERSION ,
          payload: res.data
        })
      }, error => {
        handleNetworkError(dispatch, error);
      })
  }
}