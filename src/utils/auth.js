import { NETWORK_FAILURE } from "../actions/constants";

export const isAuth = (token) => {
    return token !== null;
}

export const handleNetworkError = (dispatch, error) => {
    const status = error.response ? error.response.status : error.message
    const hasNoAccessStatus = (status === 500) || (status === 403) || (status === 404);

    if (hasNoAccessStatus) {
        dispatch({
            type: NETWORK_FAILURE,
            payload: error
        })
        throw new Error(error);
    }
}