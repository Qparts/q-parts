import reducer from './manualOrderReducer';

import { initialState } from '../initialState/baseFormInitialState';
import * as actions from '../actions/baseFormAction';

describe('manual form reducer', () => {
 it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
 });

 it('should find the correct product', () => {

  const data = {
   "id": 5,
   "partNumber": "11251-06206B",
   "makerId": 5,
   "description": "some description",
   "price": 150.00,
   "priceId": 1
  }

  const expacted = {
   ...initialState,
   part: {
    id: 5,
    partNumber: "11251-06206B",
    makerId: 5,
    description: "some description",
    price: 150.00,
    priceId: 1,
    cartType: "A",
   }
  }


  expect(reducer(initialState, {
   type: actions.FIND_SELECTED_PART_SUCCEEDED,
   payload: data

  })).toEqual(expacted)
 });
});