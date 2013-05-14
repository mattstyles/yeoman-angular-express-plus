'use strict';

// Dependencies
var mongo       = require( 'mongodb' ),
    appConfig   = require( '../../app-config.json' );

// Create mongo server
var server  = new mongo.Server( appConfig.database.host, appConfig.database.port, { auto_reconnect: true } ),
    client  = module.exports = new mongo.MongoClient( server );

// Open a client to mongo
client.open( function( err, client ) {
    if ( err ) {
        console.log( 'Database connection error' );
        console.log( err );
        return;
    }

    console.log( 'Database connection to ' + client.db( appConfig.database.name ).databaseName );

    // Always create a new collection
    var db = client.db( appConfig.database.name );
    db.createCollection( appConfig.database.collection, function( err, col ) {
        if ( err ) {
            console.log( 'Error creating collection' );
            console.log( err );
            return;
        }

        console.log( 'Collection created' );
    } );

} );



