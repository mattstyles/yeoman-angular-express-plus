'use strict';

// Dependencies
var server = require( './server' );


// Router
// Index route - usually served as static via express
server.get( '/', require( './routes/index' ) );

// Example route
server.get( '/route/:route', require( './routes/route' ) );

// Catch all
server.get( '*', require( './routes/index' ) );
