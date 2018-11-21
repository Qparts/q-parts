import axios from 'axios';
import { API_ROOT, CUSTOMER_SERVICE } from '../actions/constants';
import { ON_SOCIAL_MEDIA_LOGIN, ON_SOCIAL_MEDIA_SIGNUP, ON_SOCIAL_MEDIA_LINK, LOCAL_LANGUAGES, serverErrorField } from '../constants';
import { renderToStaticMarkup } from "react-dom/server";
import { initialize } from 'react-localize-redux';
import globalTranslations from "../translations/translations.json";
import { handleNetworkError } from '../utils';
import { ADD_TO_CART } from './cartAction';

export const REQUEST_FAILED = 'REQUEST_FAILED';
export const LOAD_CURRENT_USER_DEATILS_SUCCEEDED = 'LOAD_CURRENT_USER_DEATILS_SUCCEEDED';
export const EDIT_USER_NAME_SUCCEDED = 'EDIT_USER_NAME_SUCCEDED';
export const EDIT_USER_PHONE_NO_SUCCEDED = 'EDIT_USER_PHONE_NO_SUCCEDED';
export const EDIT_USER_EMAIL_SUCCEDED = 'EDIT_USER_EMAIL_SUCCEDED';
export const EMAIL_VERIFIED_SUCCEDED = 'EMAIL_VERIFIED_SUCCEDED';
export const EDIT_USER_PASSWORD_SUCCEDED = 'EDIT_USER_PASSWORD_SUCCEDED';
export const REQUEST_VERIFICATION_NO = 'REQUEST_VERIFICATION_NO';
export const CONFIRM_USER_ADDRESS = 'CONFIRM_USER_ADDRESS';
export const LOGOUT = 'LOGOUT';
export const ADD_ADDRESS_SUCCEEDED = 'ADD_ADDRESS_SUCCEEDED';
export const EDIT_ADDRESS_SUCCEEDED = 'EDIT_ADDRESS_SUCCEEDED';
export const DELETE_ADDRESS_SUCCEEDED = 'DELETE_ADDRESS_SUCCEEDED';
export const LOGIN_SUCCEEDED = 'LOGIN_SUCCEEDED';
export const LINK_SOCIAL_MEDIA_SUCCEEDED = 'LINK_SOCIAL_MEDIA_SUCCEEDED';
export const SOCIAL_MEDIA_SIGNUP = 'SOCIAL_MEDIA_SIGNUP';
export const EMAIL_SIGNUP = 'EMAIL_SIGNUP';
export const ADD_VEHICLE_SUCCEEDED = 'ADD_VEHICLE_SUCCEEDED';
export const REGISTER_CUSTOMER_SUCCEEDED = 'REGISTER_CUSTOMER_SUCCEEDED';
export const VERIFY_CODE_NO_SUCCEEDED = 'VERIFY_CODE_NO_SUCCEEDED';
export const VERIFY_MOBILE_NO_SUCCEEDED = 'VERIFY_MOBILE_NO_SUCCEEDED';
export const RESET_PASSWORD_SUCCEEDED = 'RESET_PASSWORD_SUCCEEDED';
export const SELECT_VEHICLE_FROM_GARAGE = 'SELECT_VEHICLE_FROM_GARAGE';
export const CLEAR_ADDRESS = 'CLEAR_ADDRESS';
export const ADD_DELIVERY_ADDRESS = 'ADD_DELIVERY_ADDRESS';
export const ADD_PAYMENT_METHOD = 'ADD_PAYMENT_METHOD';
export const COMPLETE_ORDER = 'COMPLETE_ORDER';
export const DELETE_VEHICLE = 'DELETE_VEHICLE';
export const ADD_RECENT_VIEWED_PRODUCTS = 'ADD_RECENT_VIEWED_PRODUCTS';
export const ADD_WISHLIST = 'ADD_WISHLIST';
export const DELETE_WISHLIST = 'DELETE_WISHLIST';
export const CHANGE_DEFAULT_DIRECTION = 'CHANGE_DEFAULT_DIRECTION';

// This is needed for sending the agent's cookies.
// WithCredentials() makes your browser include cookies and authentication headers in your XHR request. If your service depends on any cookie (including session cookies), it will only work with this option set.
axios.defaults.withCredentials = true

export const loadCurrentUser = () => {
  return (dispatch) => {

    axios.get(`${API_ROOT}${CUSTOMER_SERVICE}`)
      .then(res => {
        dispatch({ type: LOAD_CURRENT_USER_DEATILS_SUCCEEDED, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: REQUEST_FAILED })
      })
  }
}

export const requestVerificationNumber = () => {
  return {
    type: REQUEST_VERIFICATION_NO
  }
}

export const editName = ({ firstName, lastName, defaultLang }) => {
  return (dispatch) => {
    axios.put(`${API_ROOT}${CUSTOMER_SERVICE}`, {
      firstName,
      lastName,
      defaultLang
    })
      .then(
        res => {
          dispatch({
            type: EDIT_USER_NAME_SUCCEDED,
            payload: {
              name: { firstName, lastName }
            }
          })
        }, error => {
          handleNetworkError(dispatch, error);
        }
      )
  }
}
export const editPhoneNo = (type, data) => {
  return (dispatch) => {
    axios.post(`${API_ROOT}${CUSTOMER_SERVICE}/edit/phone`, {
      [type]: data
    })
      .then(res => {
        dispatch({
          type: EDIT_USER_PHONE_NO_SUCCEDED,
          payload: res.data
        })
      })
      .catch(error => {
        dispatch({ type: REQUEST_FAILED })
      })
  }
}
export const editEmail = (data, serverErrorField, currentLanguage) => {
  return (dispatch) => {
    return axios.post(`${API_ROOT}${CUSTOMER_SERVICE}/change-email`, data)
      .then(res => {
        dispatch({ type: EDIT_USER_EMAIL_SUCCEDED })
      },
        error => {
          handleNetworkError(dispatch, error);
          dispatch({
            type: REQUEST_FAILED,
            payload: {
              error: error.response.data,
              field: serverErrorField,
              currentLanguage
            }
          })
        })
  }
}

export const onChangeEmailVerify = (query) => {
  return (dispatch) => {
    return axios.put(`${API_ROOT}${CUSTOMER_SERVICE}/change-email`, query)
      .then(res => {
        dispatch({
          type: EMAIL_VERIFIED_SUCCEDED
        })
      })
      .catch(error => {
        console.log(error);
      })
  }
}

export const editPassword = (data, currentLanguage) => {
  return (dispatch) => {
    return axios.put(`${API_ROOT}${CUSTOMER_SERVICE}/password`, data)
      .then(res => {
        dispatch({ type: EDIT_USER_PASSWORD_SUCCEDED })
      },
        error => {
          handleNetworkError(dispatch, error);
          dispatch({
            type: REQUEST_FAILED,
            payload: {
              error: error.response.data,
              field: serverErrorField.newPassword,
              currentLanguage
            }
          })
        })
  }
}
export const confirmUserAddress = (data) => {
  return {
    type: CONFIRM_USER_ADDRESS,
    payload: data
  }
}

export const addAddress = (values) => {
  return (dispatch) => {
    return axios.post(`${API_ROOT}${CUSTOMER_SERVICE}/address`, values)
      .then(res => {
        dispatch({
          type: ADD_ADDRESS_SUCCEEDED,
          payload: res.data
        })
      }, error => {
        handleNetworkError(dispatch, error)
      });
  }
}

export const editAddress = (values) => {
  return (dispatch) => {
    return axios.put(`${API_ROOT}${CUSTOMER_SERVICE}/address`, values)
      .then(res => {
        dispatch({
          type: EDIT_ADDRESS_SUCCEEDED,
          payload: res.data
        })
      }, error => {
        handleNetworkError(dispatch, error)
      });
  }
}

export const deleteAddress = (values) => {
  return (dispatch) => {
    return axios.delete(`${API_ROOT}${CUSTOMER_SERVICE}/address`, values)
      .then(res => {
        dispatch({
          type: DELETE_ADDRESS_SUCCEEDED,
          payload: res.data
        })
      }, error => {
        handleNetworkError(dispatch, error)
      });
  }
}

export const clearAddress = () => {
  return {
    type: CLEAR_ADDRESS
  }
}

export const login = (email, password, serverErrorField, currentLanguage) => {
  return (dispatch) => {
    let defaultLanguage = null;
    return axios.post(`${API_ROOT}${CUSTOMER_SERVICE}/login/email`, {
      email, password
    })
      .then(res => {
        defaultLanguage = res.data.customer.defaultLang || LOCAL_LANGUAGES[0].code;
        dispatch({
          type: LOGIN_SUCCEEDED,
          payload: {
            data: res.data,
          }
        })
        dispatch(changeDefaultLanguage(defaultLanguage))
      })
      .catch(error => {
        dispatch({
          type: REQUEST_FAILED,
          payload: {
            error: error.response.data,
            field: serverErrorField,
            currentLanguage,
          }
        })
      })
  }
}

export const onSubmitSignup = (customer, currentLanguage) => {
  const SIGNUP_URL = 'signup';
  return (dispatch) => {
    return axios.post(`${API_ROOT}${CUSTOMER_SERVICE}/${SIGNUP_URL}`, {
      customer
    })
      .then(res => {
        dispatch({
          type: REGISTER_CUSTOMER_SUCCEEDED,
          payload: res.data
        })
      })
      .catch(error => {
        dispatch({
          type: REQUEST_FAILED,
          payload: {
            error: error.response.data.error,
            field: error.response.data.field,
            currentLanguage
          }
        })
      })
  }
}

export const emailSignup = () => {
  return {
    type: EMAIL_SIGNUP,
  }
}

export const onLogout = () => {
  return (dispatch) => {
    axios.get(`${API_ROOT}${CUSTOMER_SERVICE}/logout`)
      .then(res => {
        dispatch({
          type: LOGOUT
        })
      });
  }
}

export const addVehcile = (values) => {
  return (dispatch) => {
    axios.post(`${API_ROOT}${CUSTOMER_SERVICE}/vehicle`, values)
      .then(res => {
        dispatch({
          type: ADD_VEHICLE_SUCCEEDED,
          payload: res.data
        })
      }, error => {
        handleNetworkError(dispatch, error)
      });
  }
}

export const verifyCodeNo = (values, platform) => {
  const { code } = values;
  const REGISTER_URL = platform ? '/register/social-media' : '/register/email';
  return (dispatch) => {
    return axios.post(`${API_ROOT}${CUSTOMER_SERVICE}${REGISTER_URL}`, { code })
      .then(res => {
        dispatch({
          type: VERIFY_CODE_NO_SUCCEEDED,
          payload: res.data
        })
      })
      .catch(error => {
        dispatch({
          type: REQUEST_FAILED,
          payload: {
            error: error.response.data,
            field: Object.keys(values)
          }
        })
      })
  }
}

export const sendSmsCode = (values, currentLanguage) => {
  return (dispatch) => {
    return axios.post(`${API_ROOT}${CUSTOMER_SERVICE}/reset-sms/mobile`, values)
      .then(res => {
        dispatch({
          type: VERIFY_MOBILE_NO_SUCCEEDED
        })
      })
      .catch(error => {
        dispatch({
          type: REQUEST_FAILED,
          payload: {
            error: error.response.data,
            field: Object.keys(values),
            currentLanguage
          }
        })
      })
  }
}

export const resetPassword = ({ code, mobile, password }, serverErrorField) => {
  return (dispatch) => {
    return axios.put(`${API_ROOT}${CUSTOMER_SERVICE}/reset-password`, { code, mobile, password })
      .then(res => {
        dispatch({
          type: RESET_PASSWORD_SUCCEEDED
        })
      })
      .catch(error => {
        dispatch({
          type: REQUEST_FAILED,
          payload: {
            error: error.response.data,
            field: serverErrorField
          }
        })
      })
  }
}

export const selectVehicleGarage = (vehcile) => {
  return {
    type: SELECT_VEHICLE_FROM_GARAGE,
    payload: vehcile
  }
}

export const socialMediaButton = (data, type) => {
  switch (type) {
    case ON_SOCIAL_MEDIA_LOGIN:
      return socialMediaLogin(data);

    case ON_SOCIAL_MEDIA_SIGNUP:
      return socialMediaSignup(data);

    case ON_SOCIAL_MEDIA_LINK:
      return socialMediaLink(data);

    default:
      return null;
  }
}


const socialMediaSignup = (data) => {
  return {
    type: SOCIAL_MEDIA_SIGNUP,
    payload: data
  }
}

const socialMediaLogin = (data) => {
  return (dispatch) => {
    axios.post(`${API_ROOT}${CUSTOMER_SERVICE}/login/social-media`, {
      platform: data.platform,
      socialMediaId: data.socialMediaId
    })
      .then(res => {
        dispatch({
          type: LOGIN_SUCCEEDED,
          payload: res.data
        })
      })
      .catch(error => {
        dispatch({ type: REQUEST_FAILED })
      })
  }
}

const socialMediaLink = (data) => {
  return (dispatch) => {
    axios.post(`${API_ROOT}${CUSTOMER_SERVICE}/social-media`, {
      platform: data.platform,
      socialMediaId: data.socialMediaId
    })
      .then(res => {
        dispatch({
          type: LINK_SOCIAL_MEDIA_SUCCEEDED,
        })
      })
      .catch(error => {
        dispatch({ type: REQUEST_FAILED })
      })
  }
}

export const changeDefaultLanguage = (defaultLanguage) => {
  return initialize({
    languages: LOCAL_LANGUAGES,
    translation: globalTranslations,
    options: { renderToStaticMarkup, defaultLanguage }
  });
}

export const addDeliveryAddress = (address) => {
  return {
    type: ADD_DELIVERY_ADDRESS,
    payload: address
  }
}

export const addPaymentMethod = (payment) => {
  return {
    type: ADD_PAYMENT_METHOD,
    payload: payment
  }
}

export const completeOrder = (isCompleted) => {
  return {
    type: COMPLETE_ORDER,
    payload: isCompleted
  }
}

// TODO: Needt to call the server here to to archive the vehicle.
export const deleteVehicle = (vehcile) => {
  return {
    type: DELETE_VEHICLE,
    payload: vehcile
  }
}

export const addRecentViewedProducts = (product) => {
  return {
    type: ADD_RECENT_VIEWED_PRODUCTS,
    payload: product
  }
}

export const moveWishlistToCart = (product) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_WISHLIST,
      payload: product
    })
    dispatch({
      type: ADD_TO_CART,
      payload: product
    })
  }
}

export const addWishlist = (product) => {
  return {
    type: ADD_WISHLIST,
    payload: product
  }
}

export const deleteWishlist = (product) => {
  return {
    type: DELETE_WISHLIST,
    payload: product
  }
}

export const changeDefaultDirection = (lang) => {
  return {
    type: CHANGE_DEFAULT_DIRECTION,
    payload: lang
  }
}
