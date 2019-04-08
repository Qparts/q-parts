import { NETWORK_FAILURE } from "../actions/constants";

export const isAuth = (token) => {
    return token !== null;
}

export const handleNetworkError = (dispatch, error) => {
    const status = error.response ? error.response.status : error.message
    if (status === 500) {
        dispatch({
            type: NETWORK_FAILURE,
            payload: error
        })
        throw new Error(error);
    }
}