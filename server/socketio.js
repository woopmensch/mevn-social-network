const http = require('./index');
const io = require('socket.io')(http);

module.exports = io;

io.on('connection', socket => {
    console.log(
        `Connected to Socket - ${socket.id}. IP - ${socket.handshake.address}`
    );
});