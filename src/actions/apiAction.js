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
export const FLAGE = 'FLAGE';

export const IS_VEHICLE_SELECTED="IS_VEHICLE_SELECTED";

export const SET_SELECTED_VEHICLE = "SET_SELECTED_VEHICLE"
export const GET_SELECTED_VEHICLE = "GET_SELECTED_VEHICLE"

export const SET_SELECTED_VEHICLE_YEAR = "SET_SELECTED_VEHICLE_YEAR";
export const GET_SELECTED_VEHICLE_YEAR = "GET_SELECTED_VEHICLE_YEAR";

export const GET_SELECTED_VEHICLE_MODEL = "GET_SELECTED_VEHICLE_MODEL"
export const SET_SELECTED_VEHICLE_MODEL = "SET_SELECTED_VEHICLE_MODEL";

export const UNSET_SELECTED_VEHICLES = "UNSET_SELECTED_VEHICLES";
export const UNSET_VEHICLE_FROM_SELECTED_VEHICLES= "UNSET_VEHICLE_FROM_SELECTED_VEHICLES"

export const SET_SELECTED_VEHICLES = "SET_SELECTED_VEHICLES"

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

// export const getVehicleService = () => {
//   return (dispatch) => {
//     axios.get(`${API_ROOT}:8081/service-q-vehicle/rest/api/v2/makes`, {
//     })
//       .then(res => {
//         console.log(res,">>>>>>>>")
//         dispatch({ type: GET_VEHICLE_SUCCEEDED, payload: res.data })
//       }, error => {
//         handleNetworkError(dispatch, error);
//       })
//   }
// }


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

export const getFlage = (flage) => {
  return {
    type: FLAGE, payload: flage
  }
}

  export const checkIsVehicleSelected = (value)=> {
    return {
      type: IS_VEHICLE_SELECTED , payload:value
    }
  }

export const setSelectedVehicleModel = value => {
  return {
    type: SET_SELECTED_VEHICLE_MODEL, payload: value
  }
}
export const setSelectedVehicleYear = value => {
   return {
     type: SET_SELECTED_VEHICLE_YEAR,
     payload: value
   }
}
export const setSelectedVehicle = (value)=>{
   return{
     type: SET_SELECTED_VEHICLE , payload:value 
   }
 }
export const unsetSelectedVehicles = () => {
  return {
    type: UNSET_SELECTED_VEHICLES
  }
}
export const unsetVehcileFromSelectedVehicles = (payload) => {
  return {
    type: UNSET_VEHICLE_FROM_SELECTED_VEHICLES,
    payload
  }
}
export const getSelectedVehicle = () => {
  return {
    type: GET_SELECTED_VEHICLE 
  }
}
export const getSelectedVehicleYear = () => {
  return {
    type: GET_SELECTED_VEHICLE_YEAR
  }
}
export const getSelectedVehicleModel = () => {
  return {
    type: GET_SELECTED_VEHICLE_MODEL
  }
}
export const setSelectedVehicles = payload => {
  return {
    type: SET_SELECTED_VEHICLES,
    payload
  }
}