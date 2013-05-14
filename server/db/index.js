'use strict';
/* jshint camelcase: false */

// Dependencies
var mongo       = require( 'mongodb' ),
    appConfig   = require( '../../app-config.json' ),
    createDummyCollection;

// Create mongo server
var server  = new mongo.Server( appConfig.database.host, appConfig.database.port, { auto_reconnect: true } ),
    client  = module.exports = new mongo.MongoClient( server );

// Open a client to mongo
client.open( function( err, client ) {
    if ( err ) {
        console.log( 'Database connection error\nis mongod running?' );
        console.log( err );
        return;
    }

    console.log( 'Database connection to ' + client.db( appConfig.database.name ).databaseName );

    // Always create a new collection
    var db = client.db( appConfig.database.name );
    db.createCollection( appConfig.database.collection, function( err, collection ) {
        if ( err ) {
            console.log( 'Error creating collection' );
            console.log( err );
            return err;
        }

        // If collection is empty then create some dummy data
        collection.find({}).toArray( function( err, items ) {
            if ( err ) {
                console.log( 'Error accessing collection' );
                console.log( err );
                return err;
            }

            if ( items.length <= 0 ) {
                createDummyCollection( collection );
            }
        } );
    } );

} );


// Create dummy data for the collection
createDummyCollection = function( collection ) {
    console.log( 'Creating collection...' );

    var dummy = [{
        name: 'Albert',
        address: '21 Jump St',
        phone: '123 456 789'
    }, {
        name: 'Bert',
        address: '15 Sesame St',
        phone: '987 654 321'
    }, {
        name: 'Cecil',
        address: '7 Rue de la Vio',
        phone: '0101 98 98'
    } ];

    collection.insert( dummy, function( err, res ) {
        if ( err ) {
            console.log( 'Error inserting collection data' );
            console.log( err );
            return err;
        }

        console.log( 'Collection populated' );
    } );
};

