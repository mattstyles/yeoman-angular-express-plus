'use strict';

/**
 * Install Task
 * --
 * Runs npm and bower installs
 * Adds git pre-commit hook
 */

exports.task = function( grunt ) {
    return function() {
        grunt.log.writeln( 'Starting install...'.cyan );

        // Run install script from shell
        grunt.task.run( 'shell:install' );

        // @todo Add git pre-commit hook


        // Fired when the shell script finishes
        grunt.event.on( 'eventEnd:install', function( task ) {
            grunt.log.writeln( '\n' + task + ' completed' );
            grunt.log.writeln( '✔'.magenta + ' seed install completed successfully'.cyan );
        });

        // Fired if there is an error with the shell script
        grunt.event.on( 'error', function( task ) {
            grunt.log.writeln( '\nError with task ' + task );
            grunt.log.writeln( '✘'.magenta + ' seed install not successful'.red );
        });
    };
};

