import axios from 'axios';
import { handleNetworkError } from '../utils';

// TODO: Remove unused code related to the manual form (vin number stuff)
export const FIND_SELECTED_PART_SUCCEEDED = 'FIND_SELECTED_PART_SUCCEEDED';
export const ADD_ID_PART = 'ADD_ID_PART';
export const SAVE_FORM_DATA_TO_CACHE = 'SAVE_FORM_DATA_TO_CACHE';
export const CLEAR_FORM_DATA_FROM_CACHE = 'CLEAR_FORM_DATA_FROM_CACHE';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const SET_CURRENT_VEHICLE_SEARCH = 'SET_CURRENT_VEHICLE_SEARCH';


export const findSelectedPart = (partNumbers, makerId) => {
  return (dispatch) => {
    axios.get(`http://localhost:8000/api/v1/partForm/${partNumbers}/${makerId}`)
      .then(res => {
        dispatch({
          type: FIND_SELECTED_PART_SUCCEEDED,
          payload: res.data
        })
        dispatch({
          type: ADD_ID_PART,
          payload: {
            makerId,
            product: partNumbers
          }
        })
      }, error => {
        handleNetworkError(dispatch, error);
      });
  }
}

export const saveFormDataToCache = (values) => {
  return {
    type: SAVE_FORM_DATA_TO_CACHE,
    payload: values
  }
}

export const clearFormDataFromCache = (data) => {
  return {
    type: CLEAR_FORM_DATA_FROM_CACHE,
    payload: data
  }
}

export const setCurrentVehicleSearch = (currentVehicle, itemName) => {
  return {
    type: SET_CURRENT_VEHICLE_SEARCH,
    payload: {
      name: currentVehicle.label,
      make: currentVehicle.maker,
      model: currentVehicle.model,
      year: currentVehicle.year,
      itemName
    }
  }
}