import { NETWORK_FAILURE } from '../actions/constants';
import { initialState } from '../initialState/networkErrorInitialState';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NETWORK_FAILURE:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}