'use strict';

/**
 * Install Task
 * --
 * Runs npm and bower installs
 * Adds git pre-commit hook
 * Re-initialises git
 */

exports.task = function( grunt ) {

    var utils = require( './utils').init( grunt );

    var addPrecommitHook = function() {
        // Check that .git stills exists
        if ( grunt.file.exists( './.git/hooks/' ) ) {
            // If a hooks file already exists then leave it alone
            if ( grunt.file.exists( './.git/hooks/pre-commit' ) ) {
                grunt.log.writeln( '✘'.magenta + ' - Precommit already exists'.red );
                return;
            }

            // Otherwise write precommit hook
            grunt.file.write( './.git/hooks/pre-commit',
                '#!/bin/sh\n' +
                '#\n' +
                '# Lints code before commit\n' +
                '\n' +
                'PATH=/usr/local/share/npm/bin/:/usr/local/bin/:$PATH' +
                '\n' +
                'grunt lint\n' +
                '\n' +
                'RETVAL=$?\n' +
                '\n' +
                'if [ $RETVAL != 0 ]\n' +
                '\tthen\n' +
                '\texit 1\n' +
                'fi\n'
            );

            grunt.log.writeln( '✔'.magenta + ' precommit hook written successfully'.cyan );
        }
    };

    return function() {
        grunt.log.writeln( 'Starting install...'.cyan );

        // Run install script from shell
        grunt.task.run( 'shell:install' );

        // Fired when the shell script finishes
        grunt.event.on( 'eventEnd:install', function( task ) {
            // User feedback
            grunt.log.writeln( '\n' + task + ' task completed.' );
            grunt.log.writeln( '✔'.magenta + ' seed install completed successfully'.cyan );

            // Add git pre-commit hook
            addPrecommitHook();

            // Switch install flag
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

