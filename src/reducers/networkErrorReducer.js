import { NETWORK_FAILURE, CLEAR_NETWORK_ERROR } from '../actions/constants';
import { initialState } from '../initialState/networkErrorInitialState';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NETWORK_FAILURE:
      return { ...state, error: action.payload };

    case CLEAR_NETWORK_ERROR:
      return { ...state, error: initialState.error }

    default:
      return state;
  }
}