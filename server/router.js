'use strict';

// Dependencies
var server = require( './server' );


// Router
server.get( '/route', require( './routes/route' ) );
