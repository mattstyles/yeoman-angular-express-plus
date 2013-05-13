'use strict';

// Dependencies
var io = require( './../server' ).io;

//io.sockets.on( 'connection', require( './socket' ) );
io.sockets.on( 'event:example', function( socket ) {

    socket.emit( 'send:example', {
        data: 'Hurray for sockets'
    } );

} );
