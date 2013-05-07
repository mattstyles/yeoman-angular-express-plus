'use strict';

/**
 * Install Task
 * --
 * Runs npm and bower installs
 * Adds git pre-commit hook
 */

exports.task = function( grunt ) {

    var utils = require( './utils').init( grunt );

    return function() {
        grunt.log.writeln( 'Starting install...'.cyan );

        // Run install script from shell - @todo add shell commands to this task
        grunt.task.run( 'shell:install' );

        // @todo Add git pre-commit hook


        // Fired when the shell script finishes
        grunt.event.on( 'eventEnd:install', function( task ) {
            // User feedback
            grunt.log.writeln( '\n' + task + ' task completed.' );
            grunt.log.writeln( '✔'.magenta + ' seed install completed successfully'.cyan );

            utils.addInstallFlag( 'app-config.json' );
        });

        // Fired if there is an error with the shell script
        grunt.event.on( 'error', function( task ) {
            // User feedback
            grunt.log.writeln( '\nError with task ' + task );
            grunt.log.writeln( '✘'.magenta + ' seed install not successful'.red );
        });
    };
};

