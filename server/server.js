'use strict';

/**
 * Module dependencies
 */

var express = require( 'express' ),
    cons    = require( 'consolidate' ),
    http    = require( 'http' ),
    path    = require( 'path' );

var server = module.exports = express();

// Configure Server
server.configure( function() {
    server.set( 'port', process.env.PORT || 3001 );
    
    server.use( express.bodyParser() );
    server.use( express.methodOverride() );
    server.use( server.router );
    server.use( express.static( path.join( __dirname, './../app' ) ) );
} );
       
server.configure( 'development', function() {
    server.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );
} );

server.configure( 'production', function() {
    server.use( express.errorHandler() );
} );

// Configure Routes
require( './router' );

// Start server
http.createServer( server ).listen( server.get( 'port' ), function() {
    console.log( 'Express server listening on ' + server.get( 'port' ) );
} );
