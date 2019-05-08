import openSocket from 'socket.io-client';
import { GET_COMPLETED_REQUESTS } from '../actions/customerAction';

let socket = null;

export const initializeWsConnection = dispatch => {
    socket = openSocket('http://localhost:8000');


    socket.on(GET_COMPLETED_REQUESTS, completed => {
        dispatch({
            type: GET_COMPLETED_REQUESTS,
            payload: completed
        })
    })
}

export const disconnectWs = () => {
    if (socket) {
        socket.close();
    }
}