'use strict';

// Sockets - on connection
module.exports = function( socket ) {
    socket.emit( 'send:onConnect', {
        data: 'Sockets Connected'
    } );
};
