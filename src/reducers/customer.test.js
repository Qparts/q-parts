import reducer from './customerReducer';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { initialState } from '../initialState/customerInitialState';
import * as actions from '../actions/customerAction';

describe('customer reducer', () => {
 it('should return the initial state', () => {
  expect(reducer(undefined, {})).toEqual(initialState)
 });

 it('should fetch the customer data', () => {
  const data = {
   customer: {
    email: 'ahmed.vuw@gmail.com',
    firstName: 'Ahmed',
    lastName: 'Shaaban',
    password: '123456',
    mobile: '0212116539',
   }
  }

  expect(reducer(initialState, {
   type: actions.LOAD_CURRENT_USER_DEATILS_SUCCEEDED,
   payload: {
      email: 'ahmed.vuw@gmail.com',
      firstName: 'Ahmed',
      lastName: 'Shaaban',
      password: '123456',
      mobile: '0212116539',
   }

  })).toEqual(data)
 });
});