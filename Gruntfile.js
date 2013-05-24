'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    // Include helpers
    var utils   = require( './grunt/utils' ).init( grunt );
    var helpers = require( './grunt/helpers' ).init( grunt );

    // ------------------------------------------------------
    // --
    // --   Meta
    // --
    // ------------------------------------------------------

    // load all grunt tasks
    require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

    // configurable paths
    var appConfig = grunt.file.readJSON( 'app-config.json' ) || {};
    var yeomanConfig = {
        app: appConfig.appPath || 'app',
        dist: appConfig.distPath || 'dist',
        server: appConfig.serverPath || 'server'
    };

    // Run install script if necessary
    if ( !appConfig.installed ) {
        helpers.doInstall();
    }

    // ------------------------------------------------------
    // --
    // --   Task Config
    // --
    // ------------------------------------------------------

    grunt.initConfig({

        yeoman: yeomanConfig,
        appConfig: appConfig,
        banner: '/* <%= appConfig.info.name %> - version <%= appConfig.info.version %> - ' +
                '<%= grunt.template.today("dd-mm-yyyy") %>\n' +
                '<%= appConfig.info.description %>\n ' +
                '© <%= grunt.template.today("yyyy") %> <%= appConfig.info.author.name %> ' +
                '- <%= appConfig.info.author.email %> - <%= appConfig.info.author.twitter %> */\n',

        /*
         * Watch and Reload Tasks
         */

        watch: {
            livereload: {
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['livereload']
            },
            less: {
                files: [
                    '<%= yeoman.app %>/styles/less/*.less'
                ],
                tasks: ['less:dev']
            }
        },

        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0'
            },
            livereload: {
                options: {
                    middleware: function( connect ) {
                        return [
                            lrSnippet,
                            mountFolder( connect, '.tmp' ),
                            mountFolder( connect, yeomanConfig.app )
                        ];
                    }
                }
            },
            production: {
                options: {
                    keepalive: true,
                    middleware: function( connect ) {
                        return [
                            lrSnippet,
                            mountFolder( connect, '.tmp' ),
                            mountFolder( connect, require('path').join( yeomanConfig.dist, yeomanConfig.app ) )
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 5001,
                    middleware: function( connect ) {
                        return [
                            mountFolder( connect, '.tmp' ),
                            mountFolder( connect, 'test' )
                        ];
                    }
                }
            }
        },

        /*
         * Testing Tasks
         */

        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        /*
         * Preparatory Tasks
         */

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            css: {
                files: [{
                    src: [
                        '<%= yeoman.app %>/styles/bootstrap/*',
                        '<%= yeoman.app %>/styles/font-awesome/*',
                        '<%= yeoman.app %>/styles/font/*',
                        '<%= yeoman.app %>/styles/fonts/*',
                        '<%= yeoman.app %>/styles/css/*'
                    ]
                }]
            },
            jshint: '.jshint',
            server: '.tmp'
        },

        jsonmin: {
            dev: {
                options: {
                    stripWhitespace : true,
                    stripComments   : true
                },
                files: {
                    '.jshint' : '.jshintrc'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshint'
            },
            all: [
                'Gruntfile.js',
                'grunt/*',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '<%= yeoman.server %>/{,*/}*.js'
            ],
            app: [
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ],
            server: [
                '<%= yeoman.server %>/{,*/}*.js'
            ]
        },

        concat: {
            options: {
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/<%= yeoman.app %>/scripts/scripts.js': [
                        '.tmp/scripts/{,*/}*.js',
                        '<%= yeoman.app %>/scripts/{,*/}*.js'
                    ]
                }
            }
        },

        booty: {
            dev: {
                options: {
                    componentPath: '<%= yeoman.app %>/components/',
                    dest: '<%= yeoman.app %>/styles/'
                }
            }
        },

        less: {
            dev: {
                options: {
                    paths: ['<%= yeoman.app %>/styles/less/']
                },
                files: {
                    '<%= yeoman.app %>/styles/css/main.css': '<%= yeoman.app %>/styles/less/*.less'
                }
            },
            dist: {
                options: {
                    paths: ['<%= yeoman.app %>/styles/less/'],
                    yuicompress: true
                },
                files: {
                    '<%= yeoman.app %>/styles/css/main.css': '<%= yeoman.app %>/styles/less/*.less'
                }
            }
        },

        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>/<%= yeoman.app %>'
            }
        },

        /*
         * Minification Tasks
         */

        usemin: {
            html: ['<%= yeoman.dist %>/<%= yeoman.app %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/<%= yeoman.app %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>/<%= yeoman.app %>']
            }
        },

        imagemin: {
            options: {

            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/<%= yeoman.app %>/images'
                }]
            }
        },

        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/<%= yeoman.app %>/styles/css/main-min.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                  /*removeCommentsFromCDATA: true,
                  // https://github.com/yeoman/grunt-usemin/issues/44
                  //collapseWhitespace: true,
                  collapseBooleanAttributes: true,
                  removeAttributeQuotes: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: ['*.html', 'views/*.html'],
                    dest: '<%= yeoman.dist %>/<%= yeoman.app %>'
                }]
            }
        },

        // Angular minify
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/<%= yeoman.app %>/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/<%= yeoman.app %>/scripts'
                }]
            }
        },

        uglify: {
            options: {
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/<%= yeoman.app %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/<%= yeoman.app %>/scripts/scripts.js'
                    ]
                }
            }
        },

        /*
         * Misc Tasks
         */

        // Replaces scripts with references to Google CDN
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/<%= yeoman.app %>/*.html']
            }
        },

        // Adds a content hash to bust cache
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/<%= yeoman.app %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/<%= yeoman.app %>/styles/css/*.css',
                        '<%= yeoman.dist %>/<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/<%= yeoman.app %>/styles/font/*',
                        '<%= yeoman.dist %>/<%= yeoman.app %>/styles/fonts/**/*.{eot,svg,ttf,woff}'
                    ]
                }
            }
        },

        // Copy over other stuff
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>/<%= yeoman.app %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'components/**/*',
                        'images/{,*/}*.{gif,webp}',
                        'styles/fonts/**/*',
                        'styles/font/*',
                        'vendor/{,*/}*.js',
                        'scripts/{,*/}*.hjs',
                        'scripts/{,*/}*.html'
                    ]
                }]
            },
            misc: {
                files:[{
                    expand: true,
                    dot: true,
                    cwd: '',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.json'
                    ]
                }]
            },
            server: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.server %>',
                    dest: '<%= yeoman.dist %>/<%= yeoman.server %>',
                    src: [
                        '{,*/}*'
                    ]
                }]
            }
        },

        // Adds a banner to built files
        usebanner: {
            options: {
                position: 'top',
                banner: '<%= banner %>'
            },
            files: {
                src: [
                    '<%= yeoman.dist %>/<%= yeoman.app %>/scripts/*'
                ]
            }
        },

        // Shell execution commands
        shell: {
            install: {
                command: [
                    'rm -r .git',
                    'git init',
                    'git add .',
                    'git commit -m \'Initial commit\'',
                    'bower install'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderror: true,
                    failOnError: true,
                    callback: utils.emit( 'eventEnd:install' )
                }
            },
            server: {
                command: [
                    'open http://localhost:' + appConfig.server.port,
                    'node <%= yeoman.dist %>/server/server.js'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderror: true,
                    failOnError: true
                }
            },
            devServer: {
                command: [
                    'open http://localhost:' + appConfig.server.port,
                    'node <%= yeoman.server %>/server.js'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderror: true,
                    failOnError: true
                }
            },
            startServer: {
                command: [
                    'node <%= yeoman.server %>/server.js'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderror: true,
                    failOnError: true
                }
            },
            jitsuDeploy: {
                command: [
                    'cd <%= yeoman.dist %>',
                    'jitsu deploy'
                ].join('&&'),
                options: {
                    stdout: true,
                    stderror: true,
                    failOnError: true
                }
            }
        }

    });


    // ------------------------------------------------------
    // --
    // --   Tasks
    // --
    // ------------------------------------------------------

    // Prelim task rename
    grunt.renameTask( 'regarde', 'watch' );

    /**
     * Server
     *
     * Performs a clean up and compile for development
     * Starts the development server and watch task
     */
    var tasks = [
        'clean:server',
        'less:dev',
        'livereload-start',
        'connect:livereload',
        'open',
        'watch'
    ];

    helpers.addOption( '!skip-tests', tasks, 0, 'test' );

    if ( grunt.option( 'use-server' ) ) {
        tasks = [
            'clean:server',
            'less:dev',
            'shell:devServer'
        ];
    }

    if ( grunt.option( 'restart-server' ) ) {
        tasks = [
            'clean:server',
            'less:dev',
            'shell:startServer'
        ];
    }

    helpers.registerTask(
        'server',
        'Compiles the project for development and starts\na development server and watch task ',
        tasks,
        { 'skip-tests' : 'skips the tests',
          'use-server' : 'uses project server',
          'restart-server' : 'restarts projects server'
        }
    );

    /**
     * Test
     *
     * Cleans stuff up and runs Karma test suite
     */
    helpers.registerTask(
        'test',
        'Runs Karma tests',
        [   'clean:server',
            'connect:test',
            'karma' ]
    );

    /**
     * Build
     *
     * Builds the project into dist
     */
    tasks = [
        'clean:dist',
        'lint',
        'test',
        'less:dist',
        'useminPrepare',
        'imagemin',
        'cssmin',
        'htmlmin',
        'concat',
        'copy',
        'cdnify',
        'ngmin',
        'uglify',
        'rev',
        'usemin',
        'usebanner'
    ];

    helpers.addOption( 'use', tasks, tasks.length, 'open-client-build' );

    if ( grunt.option( 'open-client' ) ) {
        tasks = 'open-client-build';
    }

    if ( grunt.option( 'open-server' ) ) {
        tasks = 'open-server-build';
    }

    if ( grunt.option( 'deploy' ) ) {
        tasks = 'jitsu-deploy';
    }

    helpers.registerTask(
        'build',
        'Builds the project into ' + yeomanConfig.dist,
        tasks,
        { 'use' : 'serve locally after build',
          'open-client' : 'opens the client-side build',
          'open-server' : 'opens the production build',
          'deploy' : 'deploys to Nodejitsu'
        }
    );

    // Register task list to open the built distribution - serving locally
    // Useful for testing built code
    var openTasks = [
        'clean:server',
        'livereload-start',
        'open:server',
        'connect:production'
    ];

    helpers.registerTask(
        'open-client-build',
        'Opens the production client-side build',
        openTasks
    );

    var openServerTasks = [
        'shell:server'
    ];

    helpers.registerTask(
        'open-server-build',
        'Opens the production build',
        openServerTasks
    );

    var deployTasks = [
        'shell:jitsuDeploy'
    ];

    helpers.registerTask(
        'jitsu-deploy',
        'Deploys to Nodejitsu',
        deployTasks
    );

    /**
     * Bootstrap
     *
     * Cleans the css directory and copies over stuff for bootstrap and font-awesome
     * Note that this currently does not use the extra stuff in font-awesome-more
     */
    helpers.registerTask(
        'bootstrap',
        'Copies bootstrap and font-awesome from bower install to working directory and builds main.less',
        [   'clean:css',
            'booty',
            'less:dev'
        ]
    );

    /**
     * Lint
     *
     * Compiles jshint config file and lints code
     */
    helpers.registerTask(
        'lint',
        'Compiles jshint config file and lints code',
        [   'jsonmin',
            'jshint:all',
            'clean:jshint'
        ]
    );

    /**
     * Default Grunt Task
     *
     * Just runs build for now
     */
    helpers.registerTask(
        'default',
        'Alias for the build task',
        [   'build'  ]
    );

    // Add task aliases
    grunt.registerTask( 'prod', ['build']);
    grunt.registerTask( 'dist', ['build']);
    grunt.registerTask( 'dev', ['server']);

};
