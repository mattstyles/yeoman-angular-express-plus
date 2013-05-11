'use strict';

/**
 * Module dependencies
 */

var express     = require( 'express' ),
    cons        = require( 'consolidate' ),
    http        = require( 'http' ),
    path        = require( 'path' ),
    appConfig   = require( './../app-config.json' );

var server = module.exports = express();

// Sockets.io - hook to Express
var io = require( 'socket.io' ).listen( server );

// Configure Server
server.configure( function() {
    server.set( 'port', process.env.PORT || appConfig.server.port );
    server.set( 'views', path.join( __dirname, './../app' ) );
    server.engine( 'html', cons.hogan );
    server.set( 'view engine', 'html' );
    server.engine( 'hjs', cons.hogan );
    server.set( 'view engine', 'hjs' );

    server.use( express.bodyParser() );
    server.use( express.methodOverride() );
    server.use( express.static( path.join( __dirname, './../app' ) ) );
    server.use( server.router );
} );

server.configure( 'development', function() {
    server.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );
} );

server.configure( 'production', function() {
    server.use( express.errorHandler() );
} );

// Configure Routes
require( './router' );

// Start socket connection
io.sockets.on( 'connection', require( './socket' ) );

// Start server
http.createServer( server ).listen( server.get( 'port' ), function() {
    console.log( 'Express server listening on ' + server.get( 'port' ) );
} );
