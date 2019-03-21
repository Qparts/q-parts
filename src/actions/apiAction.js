import axios from 'axios';
import { API_ROOT, VEHICLE_SERVICE, LOCATION_SERVICE, PRODUCT_SERVICE } from '../actions/constants';
import { handleNetworkError } from '../utils';
import { LOCAL_LANGUAGES } from '../constants';
import { renderToStaticMarkup } from "react-dom/server";
import globalTranslations from "../translations/translations.json";
import { initialize } from 'react-localize-redux';

export const REQUEST_FAILED = 'REQUEST_FAILED';
export const GET_COUNTRY_SUCCEEDED = 'GET_COUNTRY_SUCCEEDED';
export const GET_COUNTRIES_SUCCEEDED = 'GET_COUNTRIES_SUCCEEDED';
export const GET_COUNTRIES_ONLY_SUCCEEDED = 'GET_COUNTRIES_ONLY_SUCCEEDED';
export const GET_COUNTRIES_REGIONS_SUCCEEDED = 'GET_COUNTRIES_REGIONS_SUCCEEDED';
export const GET_VEHICLE_SUCCEEDED = 'GET_VEHICLE_SUCCEEDED';
export const FIND_CITY_SUCCEEDED = 'FIND_CITY_SUCCEEDED';
export const GET_REGIONS_SUCCEEDED = 'GET_REGIONS_SUCCEEDED';
export const GET_RECENTLY_VIEWED = 'GET_RECENTLY_VIEWED';
export const GET_SORTED_PRODUCTS = 'GET_SORTED_PRODUCTS';
export const SET_DEFAULT_LANG = 'SET_DEFAULT_LANG';

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

export const getCountriesOnly = (currentLang) => {
  return (dispatch) => {
    return axios.get(`${API_ROOT}${LOCATION_SERVICE}/countries-only`)
      .then(res => {
        dispatch({
          type: GET_COUNTRIES_ONLY_SUCCEEDED,
          payload: {
            data: res.data,
            currentLang
          }
        });
      }, error => {
        handleNetworkError(dispatch, error);
      });
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

export const getRecentlyViewedProducts = (products) => {
  return {
    type: GET_RECENTLY_VIEWED, payload: products
  }
}

export const getSortedProducts = () => {
  return { type: GET_SORTED_PRODUCTS }
}

export const InitializeDefaultLang = (defaultLanguage = LOCAL_LANGUAGES[0].code) => {
  return (dispatch) => {
    dispatch(initialize({
      languages: LOCAL_LANGUAGES,
      translation: globalTranslations,
      options: { renderToStaticMarkup, defaultLanguage }
    }))
    dispatch({type: SET_DEFAULT_LANG, payload: defaultLanguage})
  }
}
