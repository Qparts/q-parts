
export const message = (socket, cb) => {
    if(socket) socket.on('message', msg => cb(msg));
}