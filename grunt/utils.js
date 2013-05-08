'use strict';

// Includes
var colors = require( 'colors' );

// Extend basics
// String capitalisation function
String.prototype.cap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
// String separation function
// Breaks a string at a specified separator
String.prototype.sepAfter = function( separator ) {
    return this.substring( this.indexOf( separator ) + 1 );
};
String.prototype.sepBefore = function( separator ) {
    return this.substring( 0, this.indexOf( separator ) );
};
String.prototype.insert = function( index, str ) {
    return this.slice( 0, index ) + str + this.slice( index, this.length );
};

// Inserts an element into an array
Array.prototype.insert = function( i, el ) {
    if ( typeof( i ) !== 'number' ) {
        i = this.indexOf( i ) + 1;
    }
    var arr = [];
    if ( typeof( el ) !== 'object' ) {
        arr.push( el );
    } else {
        arr = el;
    }
    return arr.forEach( function( index ) {
        this.splice( i, 0, index );
        i = i + 1;
    }, this );
};

// Utility functions
var utils = function( grunt ) {

    return {

        // Quick string space fill function
        strFill : function( str, len ) {
            while ( str.length < len ) {
                str += ' ';
            }

            return str;
        },

        // Add installed key to JSON
        addInstallFlag : function( file ) {
            var json = grunt.file.read( file );
            var newJson = json;

            // Check to see if installed already exists
            if ( grunt.file.readJSON( file ).installed !== undefined ) {
                newJson =   json.replace( /\"installed\" +: +false/g,
                            '\"installed\" :\ttrue' );
            } else {
                // If the install flag does not exist then create it and assign it to true
                newJson =   json.slice( 0, json.lastIndexOf( '}' ) - 1 ) +
                            ',\n\t\"installed\" :\ttrue' +
                            json.slice( json.lastIndexOf( '}' ) - 1, json.length );
            }

            // Write the new file
            grunt.file.write( file, newJson );
        },

        // Emits an event when the shell task finishes
        emit : function( event ) {
            return function( err, stdout, stderr, cb) {
                // Handle an error
                if ( err ) {
                    grunt.event.emit( 'error', event.sepAfter(':') );
                    return;
                }

                // Emit the event that signifies the end of the shell task
                grunt.event.emit( event, event.sepAfter(':') );

                // Remember to call the callback
                cb();
            };
        }

    };
};

// Expose an init function to pass in grunt
module.exports = {
    init : utils
};



