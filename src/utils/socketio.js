import openSocket from 'socket.io-client';
import { GET_NOTIFICATION } from '../reducers/websocket/constants';

let socket = {};

export const initializeWsConnection = dispatch => {
    socket = openSocket('http://localhost:8000');

    socket.on('connect', () => {
        console.log('congrats, we are finally connected :D');
    });

    socket.on(GET_NOTIFICATION, notification => {
        dispatch({
            type: GET_NOTIFICATION,
            payload: notification
        })
    })
}

export const disconnectWs = () => {
    socket.disconnect();
}