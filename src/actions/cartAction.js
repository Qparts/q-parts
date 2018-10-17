import { API_ROOT, CART_SERVICE } from '../actions/constants';
import { handleNetworkError } from '../utils';
import axios from 'axios';

export const ADD_TO_CART = 'ADD_TO_CART';
export const ADD_QUOTATION_TO_CART = 'ADD_QUOTATION_TO_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const GET_QUOTATION = 'GET_QUOTATION';
export const GET_REPLIED_QUOTATION = 'GET_REPLIED_QUOTATION';

export const addToCart = (item) => {
 return {
  type: ADD_TO_CART,
  payload: item
 }
}

export const addQuotationToCart = (data) => {
 return (dispatch) => {
  return axios.post(`${API_ROOT}${CART_SERVICE}/quotation-cart`, data)
   .then(res => {
    dispatch({
     type: ADD_QUOTATION_TO_CART,
     payload: res.data
    })
   }, error => {
    handleNetworkError(dispatch, error);
   })
 }
}

export const clearCart = () => {
 return { type: CLEAR_CART }
}

export const getQuotation = (customerId) => {
 return (dispatch) => {
  return axios.get(`${API_ROOT}${CART_SERVICE}/quotation-carts/customer/${customerId}`)
   .then(res => {
    dispatch({
     type: GET_QUOTATION,
     payload: res.data
    })
   }, error => {
    handleNetworkError(dispatch, error);
   })
 }
}

export const getRepliedQuotation = (customerId) => {
  return (dispatch) => {
    return axios.get(`${API_ROOT}/${CART_SERVICE}/quotation-carts/customer/${customerId}/submitted`)
    .then(res => {
      dispatch({
        type: GET_REPLIED_QUOTATION,
        payload: res.data
      })
    }, error => {
      handleNetworkError(dispatch, error)
    });
  }
}