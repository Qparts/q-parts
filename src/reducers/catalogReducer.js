import { initialState } from '../initialState/catalogInitialState';

import {
  FETCH_GROUP_SUCCEEDED, REQUEST_FAILED, FETCH_MAKER_DATA_SUCCEEDED, FETCH_SUBGROUP_SUCCEEDED,
  FETCH_PARTS_SUCCEEDED, FIND_SELECTED_PART, CLEAN_SELECTED_PART
} from '../actions/catalogAction';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GROUP_SUCCEEDED:
      const newVinGroup = action.payload.data.map(data => {
        return { ...data, data: action.data }
      })
      return { ...state, vehicleGroups: newVinGroup, carId: action.payload.carId };

    case FETCH_SUBGROUP_SUCCEEDED:
      const newVinSubgroup = action.payload.map(data => {
        return { ...data, data: action.data }
      })
      return { ...state, vehicleSubgroups: newVinSubgroup };

    case FETCH_PARTS_SUCCEEDED:
      return { ...state, parts: action.payload };

    case FETCH_MAKER_DATA_SUCCEEDED:
      return { ...state, makerData: action.payload };

    case REQUEST_FAILED:
      return state;

    case FIND_SELECTED_PART:
      const newSeletedPart = state.parts.partGroups[0]['parts'].filter(part => {
        return part.positionNumber === action.payload;
      });

      return { ...state, selectedPart: newSeletedPart[0] }

    case CLEAN_SELECTED_PART:
      return { ...state, selectedPart: [] }

    default:
      return state;
  }
}