import {
  INITIALIZE_WS_CONNECTION
} from '../actions/customerAction';
import openSocket from 'socket.io-client';

let socket = null;

export default function reducer(state = socket, action) {
  switch (action.type) {

    case INITIALIZE_WS_CONNECTION:
      socket = openSocket('http://localhost:8000');
      return { ...state, socket}


    default:
      return state;
  }
}
