'use strict';

// Dependencies
var mongo       = require( 'mongodb' ),
    appConfig   = require( '../../app-config.json' );

// Create mongo server
var server  = new mongo.Server( appConfig.database.host, appConfig.database.port, { auto_reconnect: true } ),
    db      = new mongo.Db( appConfig.database.name, server, { safe: true } );

// Open the database connection
db.open( function( err, db ) {
    // Handle error
    if ( err ) {
        console.log( 'Error opening database' );
        return err;
    }

    // Access the test collection - populate with dummy data if necessary
    console.log( 'Database connection made' );
    db.collection( appConfig.database.collection, { safe: true }, function( err, collection ) {
        // Populate with dummy if collection does not exist
        if ( err ) {
            console.log( 'Collection not found... populating with dummy data' );

        } else {
            console.log( 'Database collection connection made' );
//            collection.insert( { name: 'test_name', data: 'test_data' }, { safe: true }, function( err, res ) {
//                console.log( res ) ;
//            } );

            collection.find().toArray(function( err, items ) {
                 console.log(items);
            });
        }
    } );
} );
