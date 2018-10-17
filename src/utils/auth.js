import { NETWORK_FAILURE } from "../actions/constants";

export const isAuth = (token) => {
 return token !== null;
}

export const handleNetworkError = (dispatch, error) => {
 if (error.response.status === 500) {
  dispatch({
   type: NETWORK_FAILURE,
   payload: error
  })
  throw new Error(error);
 }
}