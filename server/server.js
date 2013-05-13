'use strict';

/**
 * Module dependencies
 */

var express     = require( 'express' ),
    cons        = require( 'consolidate' ),
    http        = require( 'http' ),
    path        = require( 'path' ),
    appConfig   = require( './../app-config.json' );

//var server = module.exports = express();
var server = exports.server = express();

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
require( './routes' );

// Start server - hook in sockets
exports.io = require( 'socket.io' ).listen( http.createServer( server ).listen( server.get( 'port' ), function() {
    console.log( 'Express server listening on ' + server.get( 'port' ) );
} ) );

// Configure sockets
require( './sockets');
