/* eslint-disable radix */
import { initialState } from '../initialState/baseFormInitialState';
import {
  FIND_SELECTED_PART_SUCCEEDED, ADD_ID_PART, SET_CURRENT_VEHICLE_SEARCH
} from '../actions/baseFormAction';

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case FIND_SELECTED_PART_SUCCEEDED:

      const newPart = action.payload !== "" ? action.payload : initialState.part;
      const clonePart = { ...newPart, cartType: newPart.price ? 'A' : 'B' }

      return { ...state, part: clonePart };

    case ADD_ID_PART:
      const hasNoId = -1
      const makerId = parseInt(action.payload.makerId);
      if (state.part.makerId !== hasNoId) return state;

      const cart = state.cart;
      const findProducts = cart.purchasedItems.filter(item => makerId === item.product.id);
      const matchPartNumber = findProducts.find(serverProduct => serverProduct.selectedPart.partNumber === action.payload.product);
      const id = matchPartNumber ? matchPartNumber.selectedPart.id : state.part.id;

      return {
        ...state, part: {
          ...state.part,
          id,
          partNumber: action.payload.product,
          makerId
        }
      }

    case SET_CURRENT_VEHICLE_SEARCH:
      return {
        ...state,
        currentSearchVehicle: {
          name: action.payload.name,
          make: action.payload.make,
          model: action.payload.model,
          year: action.payload.year,
        },
        itemName: action.payload.itemName
      }

    default:
      return state;
  }
}