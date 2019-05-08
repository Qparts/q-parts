import openSocket from 'socket.io-client';
import { GET_COMPLETED_REQUESTS } from '../actions/customerAction';
import { proxyHost } from '../config/api';

let socket = null;

export const initializeWsConnection = dispatch => {
    socket = openSocket(proxyHost);


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