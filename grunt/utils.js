'use strict';

// Includes
var colors = require( 'colors' );

// Extend basics
// String capitalisation function
String.prototype.cap = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// Inserts an element into an array
Array.prototype.insert = function( i, el ) {
    if ( typeof( i ) !== 'number' ) {
        i = this.indexOf( i ) + 1;
    }
    if ( typeof( el ) !== 'object' ) {
        var arr = [];
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

        // Dummy testing function @todo remove
        writeIt : function( str ) {
            if ( str ) {
                grunt.log.writeln( str );
            } else {
                grunt.log.writeln( 'it' );
            }
        },

        // Quick string space fill function
        strFill : function( str, len ) {
            while ( str.length < len ) {
                str += " ";
            }

            return str;
        },

        // Alias for grunt register task that adds a better usage description
        registerTask : function( name, description, tasks, opts ) {
            description = description.cyan;

            if ( opts ) {
                for ( var key in opts ) {
                    description += "\n  --".yellow + this.strFill( key, 12 ).yellow + opts[ key ];
                }
            }

            grunt.registerTask( name, description, tasks );
        }

    }
};

// Expose an init function to pass in grunt
module.exports = {
    init : utils
};



