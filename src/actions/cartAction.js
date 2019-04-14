import { API_ROOT, CART_SERVICE } from '../actions/constants';
import { handleNetworkError } from '../utils';
import axios from 'axios';

export const ADD_TO_CART = 'ADD_TO_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const GET_QUOTATION = 'GET_QUOTATION';
export const GET_REPLIED_QUOTATION = 'GET_REPLIED_QUOTATION';
export const INCREMENRT_CART_PRODUCT_QUANTITY = 'INCREMENRT_CART_PRODUCT_QUANTITY';
export const DECREMENRT_CART_PRODUCT_QUANTITY = 'DECREMENRT_CART_PRODUCT_QUANTITY';
export const ADD_DELIVERY_ADDRESS = 'ADD_DELIVERY_ADDRESS';
export const ADD_PAYMENT_METHOD = 'ADD_PAYMENT_METHOD';
export const POST_CREDIT_CARD = 'POST_CREDIT_CARD';
export const DELETE_CART = 'DELETE_CART';
export const ADD_WISHLIST = 'ADD_WISHLIST';

export const addToCart = (item) => {
 return {
  type: ADD_TO_CART,
  payload: item
 }
}

export const clearCart = () => {
 return { type: CLEAR_CART }
}

export const getQuotation = (customerId) => {
 return (dispatch) => {
  return axios.get(`${API_ROOT}/${CART_SERVICE}/quotation-carts/customer/${customerId}`)
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

export const incrementQuantity = (item) => {
  return {
    type: INCREMENRT_CART_PRODUCT_QUANTITY,
    payload: item
   }
}

export const decrementQuantity = (item) => {
  return {
    type: DECREMENRT_CART_PRODUCT_QUANTITY,
    payload: item
   }
}

export const addDeliveryAddress = (address) => {
  return {
    type: ADD_DELIVERY_ADDRESS,
    payload: address
  }
}

export const addPaymentMethod = (args) => {

  return {
    type: ADD_PAYMENT_METHOD,
    payload: {
      type: args.type,
      creditCard: args.creditCard
    }
  }
}

export const deleteCart = (cart) => {
  return {
    type: DELETE_CART,
    payload: cart
  }
}

export const moveCartToWishlist = (product) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_CART,
      payload: product
    })
    dispatch({
      type: ADD_WISHLIST,
      payload: product
    })
  }
}
