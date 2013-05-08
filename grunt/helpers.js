'use strict';

// Includes
var colors = require( 'colors' );

// Helper functions
var helpers = function( grunt ) {

    var utils = require( './utils').init( grunt );

    // Alias for grunt register task that adds a better usage description
    var registerTask = function( name, description, tasks, opts ) {
        description = description.cyan;

        if ( opts ) {
            for ( var key in opts ) {
                if ( opts.hasOwnProperty( key ) ) {
                    description += '\n  --'.yellow + utils.strFill( key, 12 ).yellow + opts[ key ];
                }
            }
        }

        grunt.registerTask( name, description, tasks );
    };

    // Adds a task if an option is present
    var addOption = function( name, tasks, index, task ) {

        // If the name starts with a ! then look for that option not existing
        // otherwise only add the task when it is present
        if ( name.indexOf( '!' ) !== 0 ? grunt.option( name ) : !grunt.option( name.slice( 1, name.length ) ) ) {
            tasks.insert( index, task );
        }
    };

    // Runs the install task if necessary
    var doInstall = function() {
        // Check that the install has not already been done
        if ( grunt.file.readJSON( 'app-config.json').installed ) {
            return;
        }

        // Register the task
        grunt.registerTask(
            'install',
            'runs ' + 'npm'.green + ' and ' + 'bower'.green + ' install if not already done',
            require( './install').task( grunt )
        );

        // Run the task
        grunt.task.run( 'install' );
    };

    // Expose public
    return {

        // Alias for grunt register task that adds a better usage description
        registerTask : registerTask,

        // Adds a task if an option is present
        addOption : addOption,

        // Does the install task if necessary
        doInstall : doInstall

    };
};

// Expose init to pass in grunt
module.exports = {
    init : helpers
};