import { CLEAR_NETWORK_ERROR, NETWORK_FAILURE } from './constants';

export const clearNetworkError = () => {
	return {
		type: CLEAR_NETWORK_ERROR
	};
};

export const throwNetworkError = error => {
	return {
		type: NETWORK_FAILURE,
		payload: error
	};
};
