import { initialState } from '../../initialState/formInitialState';

import { SAVE_FORM_DATA_TO_CACHE, CLEAR_FORM_DATA_FROM_CACHE } from '../../actions/baseFormAction';


export default function createCommonForm(formName = '') {
  return function reducer(state = initialState, action) {
    switch (action.type) {
      case SAVE_FORM_DATA_TO_CACHE:
        const { maker, model, year, vin } = action.payload
        return { ...state, vehicle: { maker, model, year, vin } }

      case CLEAR_FORM_DATA_FROM_CACHE:
      const object = action.payload;
        return { ...state, [object]: {} }

      default:
        return state;
    }
  }
}